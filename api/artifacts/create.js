import uuid from "uuid";
import * as dynamoDbLib from "../../libs/dynamodb-lib";
import { success, failure } from "../../libs/response-lib";

export async function create(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  const params = {
    TableName: "Artifacts",
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'artifactId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'dateCreated': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      artifactId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      dateCreated: new Date().getTime().toString()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.log(e); 
    callback(null, failure({ status: false }));
  }
}