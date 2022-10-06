const aws = require("aws-sdk");

/* create SES instance where verified email */
const ses = new aws.SES({ region: "eu-central-1" }); 

exports.handler = async function (event) {
  console.log('EVENT: ', event)
  
  // Extract the properties from the event body
  // const { senderEmail, senderName, senderMessage, senderPhone } = JSON.parse(event.body)
  
  const params = {
    Destination: {
      ToAddresses: ["sjm.guzman@gmail.com"],
    },
    Message: {
      Body: {
        Text: { 
            Data: `Hello from Lambda!` 
        },
      },
      Subject: { Data: `Message from SendContactEmail Lambda` },
    },
    Source: "sjm.guzman@gmail.com",
  };

  return ses.sendEmail(params).promise()
};