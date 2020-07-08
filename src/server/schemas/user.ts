import { JSONSchema7 } from 'json-schema';

const signUpSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email', maxLength: 100 },
    name: { type: 'string', minLength: 2, maxLength: 25 },
    username: { type: 'string', minLength: 6, maxLength: 25 },
    password: { type: 'string', minLength: 7, maxLength: 100, format: 'password' },
  },
  required: ['email', 'name', 'username', 'password'],
  additionalProperties: false,
}

export default signUpSchema;