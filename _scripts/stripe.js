var stripe = require('stripe')('pk_live_DffQkT3xVlmpMbxy9VO9PZ2f00ivkKMoJI');
var send_email = require('../_scripts/email.js');

async function payment(request, response){
  console.log('received ajax request');
  try {
    let intent;
    console.log('request.body: ', request.body);
    if (request.body.payment_method_id) {
    	console.log('request.body.payment_method_id: ', request.body.payment_method_id);
      // Create the PaymentIntent
      intent = await stripe.paymentIntents.create({
        payment_method: request.body.payment_method_id,
        amount: 100,
        currency: 'usd',
        confirmation_method: 'manual',
        confirm: true
      });
    } else if (request.body.payment_intent_id) {
    	console.log('request.body.payment_intent_id: ', request.body.payment_intent_id);
      intent = await stripe.paymentIntents.confirm(
        request.body.payment_intent_id
      );
    }
    // Send the response to the client
    response.send(generate_payment_response(intent, request.body.emailAddr, request.body.imageKey));
  } catch (e) {
    // Display error on client
    return response.send({ error: e.message });
  }
};

function generate_payment_response(intent, emailAddr, imageKey){
  // Note that if your API version is before 2019-02-11, 'requires_action'
  // appears as 'requires_source_action'.
  console.log('intent status: ', intent.status);
  if (
    intent.status === 'requires_action' &&
    intent.next_action.type === 'use_stripe_sdk'
  ) {
    // Tell the client to handle the action
    return {
      requires_action: true,
      payment_intent_client_secret: intent.client_secret
    };
  } else if (intent.status === 'succeeded') {
    // The payment didn’t need any additional actions and completed!
    // Handle post-payment fulfillment
    console.log('send_email executed');
    send_email(emailAddr, imageKey);
    return {
      success: true
    };
  } else {
    // Invalid status
    
    return {
      error: 'Invalid PaymentIntent status'
    }
  }
};

module.exports = payment;