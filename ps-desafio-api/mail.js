import { success, failure } from "./libs/response-lib";
var aws = require('aws-sdk');
// Simple Email Service by AWS
var ses = new aws.SES({region: 'us-east-1'});
const FROM_MAIL = process.env.EMAIL;
// const CC_MAIL = process.env.CC_EMAIL;
// const DOMAIN = process.env.DOMAIN;

// Funcao pra passar o formulario
function generateEmailParams (body) {
  const { clientMail, clientName, content } = JSON.parse(body);
  console.log(clientMail, clientName, content);
  if (!(clientMail && clientName && content)) {
    throw new Error('Parâmetros faltando! Confira os parâmetros \'clientMail\', \'clientName\', \'content\'.');
  }
  console.log(clientMail, clientName, content);
  return {
    Source: FROM_MAIL,
    Destination: { ToAddresses: [FROM_MAIL] }, // FIXME: o TO tem q ser o cliente e o CC tem q ser BGC
    ReplyToAddresses: [clientMail],
    Message: {
        Body: {
            Text: {
            Charset: 'UTF-8',
            Data: `Mensagem enviada de email ${clientMail} por ${clientName}. \nConteúdo: ${content}`
            }
        },
        Subject: {
            Charset: 'UTF-8',
            Data: `Nova reserva de ${clientName}!`
        }
      }
    };
}

export async function main(event, context) {
  try {
    const emailParams = generateEmailParams(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return success(200, data);
  } catch (err) {
    return failure(500, err);
  }
}
