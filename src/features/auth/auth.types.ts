export type SignUpFieldValues = {
  [x: string]: any;
};

export interface CognitoUserAttributes {
  email: string | null;
  emailVerified: boolean;
}

export interface CognitoUser {
  username: string | null;
  attributes: CognitoUserAttributes;
}
