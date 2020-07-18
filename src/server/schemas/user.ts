import { JSONSchema7 } from 'json-schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SchemaProperty = { [key: string]: any }

const email: SchemaProperty = { "type": 'string', "format": 'email', "maxLength": 100 };
const name: SchemaProperty = { "type": 'string', "minLength": 2, "maxLength": 25 };
const username: SchemaProperty['properties'] = { "type": 'string', "minLength": 6, "maxLength": 25 };
const password: SchemaProperty['properties'] = { "type": 'string', "minLength": 7, "maxLength": 100, "format": 'password' };

export const signUpSchema: JSONSchema7 = {
  type: 'object',
  properties: { email, name, username, password, },
  required: ['email', 'name', 'username', 'password'],
  additionalProperties: false,
}

export const signInSchema: JSONSchema7 = {
  type: 'object',
  properties: { email, password },
  required: ['email', 'password'],
  additionalProperties: false,
}
