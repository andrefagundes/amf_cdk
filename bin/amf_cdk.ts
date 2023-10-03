#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { UsersAppStack } from '../lib/usersApp-stack';
import { UsersApiStack } from '../lib/usersApi-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: '440878696545',
  region: 'us-east-1',
};

const tags = {
  cost: 'AmfCdk',
  team: 'Amf',
};

const usersAppStack = new UsersAppStack(app, 'UsersApp', {
  tags: tags,
  env: env,
});

const userApiStack = new UsersApiStack(app, 'UsersApi', {
  usersFetchHandler: usersAppStack.usersFetchHandler,
  tags: tags,
  env: env,
});

userApiStack.addDependency(usersAppStack);
