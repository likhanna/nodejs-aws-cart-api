import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Code, Function, HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'CartApi', {
      restApiName: 'CartApi',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowHeaders: Cors.DEFAULT_HEADERS,
        allowMethods: Cors.ALL_METHODS,
      },
    });

    const cartApiLambda = new Function(this, 'CartApiLambda', {
      code: Code.fromAsset('dist'),
      runtime: Runtime.NODEJS_20_X,
      handler: 'main.handler',
      environment: {
        DB_HOST: process.env.DB_HOST!,
        DB_NAME: process.env.DB_NAME!,
        DB_PORT: process.env.DB_PORT!,
        DB_USER: process.env.DB_USER!,
        DB_PASSWORD: process.env.DB_PASSWORD!,
      },
      timeout: Duration.seconds(5),
    });

    const cartResource = api.root.addResource('cart');
    const cartApiIntegration = new LambdaIntegration(cartApiLambda);
    cartResource.addMethod('GET', cartApiIntegration);
    cartResource.addMethod('PUT', cartApiIntegration);
    cartResource.addMethod('DELETE', cartApiIntegration);

    const checkoutResource = cartResource.addResource('checkout');
    checkoutResource.addMethod('POST', cartApiIntegration);

    api.root.addProxy({
      defaultIntegration: cartApiIntegration,
    });
    api.root.addMethod(HttpMethod.GET, cartApiIntegration);
  }
}
