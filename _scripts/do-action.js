var AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});
var documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event) => {
    var emailAddr = event.emailAddr;
    var time = new Date().toISOString();
    var trueAction = event.trueAction;
    var isValid = trueAction.match(/paymentSucceeds|paymentFails|paymentPageThenLeaves|uploadsPicAndUsesTools/)
    if(isValid){
        var UpdateExpression = "set entryVisit = entryVisit + :val, lastActionTime=:a";
        UpdateExpression +=`, ${trueAction}=:t`;
        var params = {
            TableName:'studio-plur',
            Key:{
                emailAddr : emailAddr
            },
            UpdateExpression: UpdateExpression,
            ExpressionAttributeValues:{
                ":val": 1,
                ":a": time,
                ":t": true
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        updateItem(params, function(err, result){
            if(err) return err;
            else return result;
        });
    } else {
        return 'No param to update';
    }
};

function updateItem(params, cb){
  documentClient.update(params, function(err, data) {
    if (err) {
      console.log("updateItem Error", err);
      return cb(err);
    } else {
      console.log("updateItem Success", data);
      return cb(null, data);
    }
  });
};