/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { User } from "../models";
import { signUpSchema, signInSchema } from '../schemas';
import validateInput from '../utils/validation';
import { SignUpInput, SignInInput } from '../models/user';
import * as Auth from '../auth';

export default {
  Query: {
    me: (root: any, args: any, ctx: any, info: any) => {
      // TODO: projection
      Auth.checkSignedIn(ctx.req);
      return User.findById(ctx.req.session.userId);
    },
    users: (root: any, args: any, ctx: any, info: any) => {
      // TODO: auth, projection, pagination
 
      Auth.checkSignedIn(ctx.req);

      return User.find({});
    },
    user: (root: any, args: any, ctx: any, info: any) => {
      // TODO: auth, projection, sanitization

      Auth.checkSignedIn(ctx.req);

      if(!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valir user ID.`)
      }

      return User.findById(args.id);
    },
  },
  Mutation: {
    signUp: async (root: any, args: SignUpInput, ctx: any, info: any) => {
      // TODO: not auth
      await Auth.checkSignedOut(ctx.req);
      // Validation
      await validateInput(signUpSchema, args);
      return User.create(args);
    },
    signIn:  async (root: any, args: SignInInput, ctx: any, info: any) => {
      const { userId } = ctx.req.session;
      if (userId) {
        return User.findById(userId)
      }
      
      // Validation
      await validateInput(signInSchema, args)
      const user = await Auth.attemptSignIn(args);
      // Once the request is done, the session middleware will set a cookie on the response object
      // allowing the user to access the resources on the server with that sessionId cookie
      ctx.req.session.userId = user.id

      return user;
    },
    signOut: (root: any, args: SignUpInput, ctx: any, info: any) => {
      Auth.checkSignedIn(ctx.req);
      return Auth.signOut(ctx)
    }
  }
}