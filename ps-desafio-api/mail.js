import { success, failure } from "./libs/response-lib";

var aws = require('aws-sdk');
// Simple Email Service by AWS
var ses = new aws.SES({region: 'us-east-1'});

const FROM_MAIL = process.env.FROM_MAIL;
const TO_MAIL = process.env.TO_MAIL;
const DOMAIN = process.env.DOMAIN;

// o que tem que ter:
// 1. funçao pra ser exportada do lambda
// 2. funcao para passar os parametros do formulario frontend

// Funcao pra passar o formulario
function generateEmailParams (body) {
  const { clientMail, clientName, content } = JSON.parse(body);
  console.log(clientMail, clientName, content);
  if (!(clientMail && clientName && content)) {
    throw new Error('Parâmetros faltando! Confira os parâmetros \'clientMail\', \'clientName\', \'content\'.');
  }

return {
        Source: FROM_MAIL,
        Destination: { ToAddresses: [TO_MAIL] },
        ReplyToAddresses: [clientMail],
        Message: {
            Body: {
                Text: {
                Charset: 'UTF-8',
                Data: `Mensagem enviada de email ${clientMail} por ${clientName}. \Conteúdo: ${content}`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Nova reserva de ${DOMAIN}!`
            }
        }
    };
}

module.exports.mail = async (event) => {
  try {
    const emailParams = generateEmailParams(event.body);
    const data = await ses.sendEmail(emailParams).promise();
    return success(200, data);
  } catch (err) {
    return failure(500, err);
  }
}