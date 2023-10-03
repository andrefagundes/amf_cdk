import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  const lambdaRequestId = context.awsRequestId;
  const apiRequestId = event.requestContext.requestId;

  console.log(
    `API Gateway RequestId: ${apiRequestId} - Lambda RequestId: ${lambdaRequestId}`,
  );

  if (event.resource === '/users') {
    if (event.httpMethod === 'GET') {
      console.log('REQUISITION GET');

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'GET PRODUCTS OK',
        }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'GET PRODUCTS ERROR',
    }),
  };
}
