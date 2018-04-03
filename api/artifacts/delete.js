import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

// Delete a user's artifact
// Usage: /artifacts/:artifactId
export async function main(event, context, callback) {
  const params = {
    TableName: "Artifacts",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'artifactId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      artifactId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}