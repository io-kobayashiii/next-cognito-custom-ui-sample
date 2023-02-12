import { Auth } from '@aws-amplify/auth';
import * as Types from './auth.types';

export const getCurrentAuthenticatedUser = async () => {
  try {
    const authenticatedUser: Types.CognitoUser =
      await Auth.currentAuthenticatedUser();
    return authenticatedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signUp = async ({ email, password }: Types.SignUpFieldValues) => {
  try {
    await Auth.signUp({
      username: email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

export const verifyEmail = async ({ email, code }: Types.SignUpFieldValues) => {
  try {
    return await Auth.confirmSignUp(email, String(code));
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async ({ email, password }: Types.SignUpFieldValues) => {
  try {
    const user: Types.CognitoUser = await Auth.signIn({
      username: email,
      password,
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const requestPasswordReset = async ({
  email,
}: Types.SignUpFieldValues) => {
  try {
    await Auth.forgotPassword(email);
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  await Auth.signOut();
};
