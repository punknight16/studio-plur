"use strict";
const nodemailer = require("nodemailer");


// async..await is not allowed in global scope, must use a wrapper
async function send_email(emailAddr, imageKey){
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.us-east-1.awsapps.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "info@punknight.awsapps.com", // generated ethereal user
      pass: '' // generated ethereal password
    }
  });
  var path = "https://studio-plur-user-photos.s3.us-west-2.amazonaws.com/_data/photos/"+imageKey;
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'info@punknight.awsapps.com', // sender address
    to: emailAddr, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world HERE", // plain text body
    html: "<html>Please work A1</html>", // html body
    attachments: [
        {   // utf-8 string as an attachment
            filename: 'profile_pic.png',
            path: path,
            encoding: 'base64',
            contentType: 'image/png'
        }
    ]
  }


  );

  console.log("Message sent: %s", info.messageId);
 
}

module.exports = send_email;