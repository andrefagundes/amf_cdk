import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"
import * as apiGateway from "aws-cdk-lib/aws-apigateway"
import * as cwLogs from "aws-cdk-lib/aws-logs"
import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"

interface UsersApiStackProps extends cdk.StackProps {
    usersFetchHandler: lambdaNodeJS.NodejsFunction
}

export class UsersApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: UsersApiStackProps) {
        super(scope, id, props);

        const logGroup = new cwLogs.LogGroup(this, "UsersApiLogs");
        const api = new apiGateway.RestApi(this, "UsersApi", {
            restApiName: "UsersApi",
            deployOptions: {
                accessLogDestination: new apiGateway.LogGroupLogDestination(logGroup),
                accessLogFormat: apiGateway.AccessLogFormat.jsonWithStandardFields({
                    httpMethod: true,
                    ip: true,
                    protocol: true,
                    requestTime: true,
                    resourcePath: true,
                    responseLength: true,
                    status: true,
                    caller: true,
                    user: true
                })
            }
        });

        const usersFetchIntegration = new apiGateway.LambdaIntegration(props.usersFetchHandler);
        const usersResource = api.root.addResource("users");
        usersResource.addMethod("GET", usersFetchIntegration);
    }
}