var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

exports.handler = async (event, context, callback) => {
    var emailAddr = event.emailAddr;
    var documentClient = new AWS.DynamoDB.DocumentClient();
    var params = {
     
      TableName : 'studio-plur',
      Key : { 
        emailAddr : emailAddr
      },
      AttributesToGet: [ "registrationStatus" ],
    };

  let getItem = new Promise((res, rej) => {
    documentClient.get(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success", data);
        res(data);
      }
    });
  })
  
    var time = new Date().toISOString();
    var params2 = {
      TableName : 'studio-plur',
      Item: {
        emailAddr: emailAddr,
        registerTime: time,
        lastActionTime: time,
        paymentFails: false,
        paymentPageThenLeaves: false,
        paymentSucceeds: false,
        registrationStatus: "UNCONFIRMED",
        uploadsPicAndUsesTools: false
      }
    };
   let putItem = new Promise((res, rej) => {
        documentClient.put(params2, function(err, data) {
          if (err) {
            console.log("Error", err);
            rej(err);
          } else {
            console.log("Success", data);
            res("Insert data completed");
          }
        }); 
    });
  
  const result = await getItem;
    console.log(JSON.stringify(result));    
    if(!Object.keys(result).length){ //check if object is empty
      const result2 = await putItem;
      console.log("put result: ", result2)
      return 'NEW';
    } else {
      return result.Item.registrationStatus
    }
};