#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { UsersAppStack } from '../lib/usersApp-stack';
import { UsersApiStack } from '../lib/usersApi-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: '440878696545',
};