import uuid from "uuid"; // gera IDs unicos
import AWS from "aws-sdk"; // comunica com os outros servicos

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName, // environment variable
    Item: { // contains the attributes of the item to be created
      userId: event.requestContext.identity.cognitoIdentityId, // cognito
      purchaseId: uuid.v1(),
      content: data.content, //parsed from request body
      attachment: data.attachment, // parsed from request body
      createdAt: Date.now()
    }
  };

  dynamoDb.put(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}
