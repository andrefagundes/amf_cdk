import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJS from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamoDb from 'aws-cdk-lib/aws-dynamodb';

export class UsersAppStack extends cdk.Stack {
  readonly usersFetchHandler: lambdaNodeJS.NodejsFunction;
  readonly usersDdb: dynamoDb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.usersDdb = new dynamoDb.Table(this, 'usersDdb', {
      tableName: 'users',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'id',
        type: dynamoDb.AttributeType.STRING,
      },
    });

    this.usersFetchHandler = new lambdaNodeJS.NodejsFunction(
      this,
      'UsersFetchFunction',
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        functionName: 'UsersFetchFunction',
        entry: 'lambda/users/usersFetchFunction.ts',
        handler: 'handler',
        memorySize: 128,
        timeout: cdk.Duration.seconds(5),
        bundling: {
          minify: true,
          sourceMap: false,
        },
        environment: {
          USERS_DDB: this.usersDdb.tableName,
        },
      },
    );
    this.usersDdb.grantReadData(this.usersFetchHandler);
  }
}
