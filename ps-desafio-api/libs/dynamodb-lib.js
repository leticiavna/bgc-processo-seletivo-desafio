import AWS from "aws-sdk";

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // usa promise para lidar com assincrono
  return dynamoDb[action](params).promise();
}