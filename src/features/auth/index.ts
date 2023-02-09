import { Auth } from '@aws-amplify/auth';
import * as Types from './auth.types';

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

export const signIn = async ({ email, password }: Types.SignUpFieldValues) => {
  try {
    const user = await Auth.signIn({
      username: email,
      password,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
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

export const signOut = Auth.signOut;
