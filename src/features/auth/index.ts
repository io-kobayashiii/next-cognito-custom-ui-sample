import { Auth } from '@aws-amplify/auth';
import * as Types from './auth.types';

export const getCurrentAuthenticatedUser = async () => {
  return await Auth.currentAuthenticatedUser().catch(console.log);
};

export const signUp = async ({ email, password }: Types.AuthFieldValues) => {
  return await Auth.signUp({
    username: email,
    password,
  }).catch(console.log);
};

export const verifyEmail = async ({ email, code }: Types.AuthFieldValues) => {
  return await Auth.confirmSignUp(email, String(code)).catch(console.log);
};

export const signIn = async ({ email, password }: Types.AuthFieldValues) => {
  try {
    const user: Types.CognitoUser = await Auth.signIn({
      username: email,
      password,
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const requestPasswordReset = async (email: string) => {
  return await Auth.forgotPassword(email).catch((error) => console.log(error));
};

export const resetPassword = async ({
  email,
  code,
  password,
}: Types.AuthFieldValues) => {
  return Auth.forgotPasswordSubmit(email, code, password);
};

export const signOut = async () => {
  await Auth.signOut();
};
