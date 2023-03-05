import { Auth, CognitoUser } from '@aws-amplify/auth';
import * as Types from './auth.types';

export const getCurrentAuthenticatedUser = async (): Promise<
  CognitoUser | undefined
> => {
  return await Auth.currentAuthenticatedUser().catch((error) => {
    console.log(error);
    return undefined;
  });
};

export const signUp = async ({ email, password }: Types.AuthFieldValues) => {
  return await Auth.signUp({
    username: email,
    password,
  }).catch((error) => {
    console.log(error);
    return undefined;
  });
};

export const verifyEmail = async ({ email, code }: Types.AuthFieldValues) => {
  return await Auth.confirmSignUp(email, String(code)).catch(console.log);
};

export const signIn = async ({ email, password }: Types.AuthFieldValues) => {
  try {
    const user: CognitoUser | undefined = await Auth.signIn({
      username: email,
      password,
    });
    return user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const resendSignUp = async (email: string) => {
  return await Auth.resendSignUp(email).catch((error) => console.log(error));
};

export const completeNewPassword = async ({
  user,
  password,
}: Types.AuthFieldValues) => {
  return await Auth.completeNewPassword(user, password).catch((error) =>
    console.log(error)
  );
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
