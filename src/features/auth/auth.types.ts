export type AuthFieldValues = {
  [x: string]: any;
};

export interface CognitoUserAttributes {
  email: string;
  email_verified: boolean;
}

export interface CognitoUser {
  username: string | null;
  attributes: CognitoUserAttributes;
}
