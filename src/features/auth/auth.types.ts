export type SignUpFieldValues = {
  [x: string]: any;
};

export interface CognitoAttributes {
  email: string | null;
  emailVerified: boolean;
}

export interface CognitoUserAmplify {
  username: string | null;
  attributes: CognitoAttributes;
}
