var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
var poolData = {
  UserPoolId : 'us-west-2_Vd4MBnDl5', // your user pool id here
  ClientId : 'lh7n88jo1bvf80mgp0tl8vrs2' // your app client id here
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function doRegister(emailInput, passwordInput, usernameInput, cb){
	var cognitoUser;
	var dataUsername = {
    Name : 'preferred_username',
    Value : usernameInput
  };
  var attributeUsername = new AmazonCognitoIdentity.CognitoUserAttribute(dataUsername);
	userPool.signUp(emailInput, passwordInput, [attributeUsername], null, function(err, result){
	    if (err) {
	        console.log(err);
	        return cb(err.message);
	    }
	    cognitoUser = result.user;
	    console.log('user name is ' + cognitoUser.getUsername());
	    return cb(null, cognitoUser);
	});
};


function doLogin(emailInput, passwordInput, cb){
	var userData = {
      Username : emailInput,
      Pool : userPool
  };
	var authenticationData = {
      Username : emailInput, // your username here
      Password : passwordInput, // your password here
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
      		console.log('success: ', result)
          var accessToken = result.getAccessToken().getJwtToken();
          return cb(null, accessToken);
      },

      onFailure: function(err) {
          console.log('error: ', err);
          return cb(err.message);
      },
      mfaRequired: function(codeDeliveryDetails) {
          console.log('this should not happen');
          var verificationCode = prompt('Please input verification code' ,'');
          cognitoUser.sendMFACode(verificationCode, this);
      }
  });
}

function doReset(resetUsernameInput, cb){
	var userData = {
      Username : resetUsernameInput,
      Pool : userPool
  };
	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.forgotPassword({
    onSuccess: function (data) {
       return cb(null, data);
    },
    onFailure: function(err) {
      console.log(err)
      return cb(err.message);
    }
	})
}


function doForgot(forgotUsernameInput, forgotCodeInput, forgotPasswordInput, cb){
	
	var userData = {
      Username : forgotUsernameInput,
      Pool : userPool
  };
	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	cognitoUser.confirmPassword(forgotCodeInput, forgotPasswordInput, {
      onSuccess() {
        return cb(null, 'Password change confirmed!');
      },
      onFailure(err) {
      	console.log(err);

        return cb(err.message);
      }
    })
}

function doRefresh(cb){
	var cognitoUser = userPool.getCurrentUser();

	if (cognitoUser === null) {
			return cb('unauthenticated');
	} else {
		cognitoUser.getSession(function(err, session) {
			console.log('session ', session);
      if (err) {
        alert(JSON.stringify(err.message) || JSON.stringify(err));
        return;
      }
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId : "us-west-2:56f2a023-cdbc-4fd9-932a-4841647e1904", // your identity pool id here 
				Logins : {
				      'cognito-idp.us-west-2.amazonaws.com/us-west-2_Vd4MBnDl5' :   
				      session.getIdToken().getJwtToken()
				}
				       }, {
				region: "us-west-2"
			});
		});
	}	
	AWS.config.credentials.refresh(function(err){
    if(err) console.log(err);
    else {
    	console.log("creds: ", AWS.config.credentials);
    	return cb(null, cognitoUser);
    }
	});
}