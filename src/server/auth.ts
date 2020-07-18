/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthenticationError } from "apollo-server-express"
import { User } from "./models";
import { SignInInput } from "./models/user";
import { SESSION_NAME } from "../../config";


export const attemptSignIn = async ({email, password}: SignInInput) => {
  const user = await User.findOne({email});

  if (!user) {
    throw new AuthenticationError('Incorrect Email.')
  }

  if(!await user.matchesPassword(password)) {
    throw new AuthenticationError('Incorrect Password.')
  }

  return user;
}

const signedIn = (req: any) => req.session.userId;

export const checkSignedIn = (req: any) => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.');
  }
}

export const checkSignedOut = (req: any) => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.');
  }
}

export const signOut = ({req, res}: any) => new Promise((resolve, reject) => {
  req.session.destroy((error: any) => {
    if (error) {
      reject(error);
    }
    res.clearCookie(SESSION_NAME)
    resolve(true);
  })
})