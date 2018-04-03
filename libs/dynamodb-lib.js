import AWS from "aws-sdk";

AWS.config.update({ region: "us-west-2" });

// Using the promise form of DynamoDB methods for easier to read code for async code
export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
