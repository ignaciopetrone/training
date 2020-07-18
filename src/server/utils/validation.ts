import Ajv, { ErrorObject } from 'ajv';
import { ValidationError } from 'apollo-server-express';
import { capitalizeFirstLetter, getLabel } from '../utils/strings';
import { JSONSchema7 } from 'json-schema';
import { SignUpInput, SignInInput } from '../models/user';

const formatAjvErrors = (errors?: ErrorObject[] | null) =>
  errors
    ?.map(error => [...error.dataPath.split('.').map(getLabel), error.message].join(' '))
    .map(capitalizeFirstLetter)
    .map(error => error + '.')
    .join(' ') ?? 'Invalid input';

const ajv = new Ajv({ allErrors: true });
ajv.addFormat('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/);

const validateInput = (schema: JSONSchema7, args: SignUpInput | SignInInput) => {
  const compiledSchema = ajv.compile(schema);  
  const valid = compiledSchema(args);

  if (!valid) {
    throw new ValidationError(formatAjvErrors(compiledSchema.errors));
  }
};
export default validateInput;
