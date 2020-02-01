import AWS from "aws-sdk";

export function call(action, params) {
  AWS.config.update({ region: "us-east-2" });
  const dynamoDb = new AWS.DynamoDB.DocumentClient();
  // usa promise para lidar com assincrono
  return dynamoDb[action](params).promise();
}