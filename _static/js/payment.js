var stripe = Stripe('pk_live_DffQkT3xVlmpMbxy9VO9PZ2f00ivkKMoJI');

function mountStripe(stripe, cb){
	var elements = stripe.elements();
	var cardElement = elements.create('card');
	return cb(null, cardElement);
}

function doPayment(stripe, cardElement, cardholderName, emailAddr, imageKey, cb){
  stripe.createPaymentMethod('card', cardElement, {
    billing_details: {name: cardholderName.value}
  }).then(function(result) {
    if (result.error) {
    	console.log('result.error: ', result.error);
      return cb('err');
      // Show error in payment form
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 2)
      //fetch('/ajax/confirm_payment', {
      fetch('https://h5wbrtegwh.execute-api.us-west-2.amazonaws.com/prod/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        	payment_method_id: result.paymentMethod.id,
        	emailAddr: emailAddr,
        	imageKey: imageKey
        })
      }).then(function(result) {
        // Handle server response (see Step 3)
        result.json().then(function(json) {
          console.log('received: ', json);
          return handleServerResponse(json, cb);
        })
      });
    }
  });
};
	
function handleServerResponse(response, cb){
  if (response.error) {
    alert('response.error: ', response.error);
    // Show error from server on payment form
    return cb(response.error);
  } else if (response.requires_action) {
    alert('response requires action, trying again');
    // Use Stripe.js to handle required card action
    stripe.handleCardAction(
      response.payment_intent_client_secret
    ).then(function(result) {
      
      console.log('here result: ', result);
      if (result.error) {
        // Show error in payment form
        return cb(result.error.code);
      } else {
        alert('sending again');
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        fetch('https://h5wbrtegwh.execute-api.us-west-2.amazonaws.com/prod/confirm-payment', {
        //fetch('/ajax/confirm_payment', {	
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
	        	payment_method_id: result.paymentMethod.id,
	        	emailAddr: emailAddr,
	        	imageKey: imageKey
	        })
        }).then(function(confirmResult) {
          alert('confirmResult: ', confirmResult);
          console.log('confirmResult: ', confirmResult);
          return cb(confirmResult.json());
        }).then(handleServerResponse);
      }
    });
  } else {
    if(response.requires_action){
      cb('requires action');
    } else {
      cb(null, response);
    }
  }
}