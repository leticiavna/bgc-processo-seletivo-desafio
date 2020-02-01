import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

// atualizar uma reserva
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,

    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      purchaseId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated (query com as chaves)
    // 'ExpressionAttributeValues' defines the value in the update expression (valores)
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": data.attachment || null,
      ":content": data.content || null
      // ou seja: aqui, atualiza o anexo e conteudo, que podia ser nome, endereço, etc
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}