/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { UserInputError, ValidationError } from 'apollo-server-express';
import { User } from "../models";
import { signUpSchema } from '../schemas';
import validateInput from '../utils/validation';
import { SignUpInput } from '../models/user';

export default {
  Query: {
    users: (root: any, args: any, ctx: any, info: any) => {
      // TODO: auth, projection, pagination

      return User.find({});
    },
    user: (root: any, args: any, ctx: any, info: any) => {
      // TODO: auth, projection, sanitization
      if(!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valir user ID.`)
      }

      return User.findById(args.id);
    },
  },
  Mutation: {
    addUser: (root: any, args: SignUpInput, ctx: any, info: any) => {
      // TODO: not auth
      
      // Validation
      validateInput(signUpSchema, args);
      
      return User.create(args);
    }
  }
}