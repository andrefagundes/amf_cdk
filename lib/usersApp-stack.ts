import * as lambda from "aws-cdk-lib/aws-lambda"
import * as lambdaNodeJS from "aws-cdk-lib/aws-lambda-nodejs"
import * as cdk from "aws-cdk-lib"
import { Construct } from "constructs"

export class UsersAppStack extends cdk.Stack {
    readonly usersFetchHandler: lambdaNodeJS.NodejsFunction;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.usersFetchHandler = new lambdaNodeJS.NodejsFunction(this, "UsersFetchFunction", {
            runtime: lambda.Runtime.NODEJS_16_X,
            functionName: "UsersFetchFunction",
            entry: "lambda/users/usersFetchFunction.ts",
            handler: "handler",
            memorySize: 128,
            timeout: cdk.Duration.seconds(5),
            bundling: {
                minify: true,
                sourceMap: false,
            }
        })
    }
}
