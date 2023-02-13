export type SignUpFieldValues = {
  [x: string]: any;
};

export interface CognitoUserAttributes {
  email: string;
  emailVerified: boolean;
}

export interface CognitoUser {
  username: string | null;
  attributes: CognitoUserAttributes;
}
