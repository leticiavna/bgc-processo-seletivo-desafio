import { success, failure } from "./libs/response-lib";
var aws = require('aws-sdk');

// Simple Email Service by AWS
var ses = new aws.SES({region: 'us-east-1'});
const FROM_MAIL = process.env.EMAIL;
// const CC_MAIL = process.env.CC_EMAIL;

// Funcao pra passar o formulario
function generateEmailParams (body) {
  const { clientMail, clientName, content } = JSON.parse(body);
  if (!(clientMail && clientName && content)) {
    throw new Error('Parâmetros faltando! Confira os parâmetros \'Email\', \'Nome\' e \'Minions escolhidos\'.');
  }
  return {
    Source: FROM_MAIL,
    Destination: {
     CcAddresses: [],  
     ToAddresses: [FROM_MAIL] // FIXME Aqui não vai o email do cliente porque o SES está no modo Sandbox
   },
    ReplyToAddresses: FROM_MAIL,
    Message: {
        Body: {
            Text: {
            Charset: 'UTF-8',
            Data: `Olá! \n
            Foi feita uma nova reserva por ${clientName}, com o email ${clientMail}. \n
            Minions reservados: ${content}`
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
