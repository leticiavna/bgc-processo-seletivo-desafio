import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      purchaseId: event.pathParameters.id
    }
  };

  try {
    // aqui é o que define a ação em si; em cima é só definição de parâmetros
    await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}