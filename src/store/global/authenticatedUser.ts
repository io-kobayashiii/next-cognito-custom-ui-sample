import { CognitoUser } from '@aws-amplify/auth';
import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type AuthenticatedUserState = {
  isInitialized: boolean;
  isAuthenticated: boolean;
  email: string;
  emailVerified: boolean;
};

const authenticatedUserRecoilState = atom<AuthenticatedUserState>({
  key: 'authenticatedUserState',
  default: {
    isInitialized: false,
    isAuthenticated: false,
    email: '',
    emailVerified: false,
  },
});

export const useAuthenticatedUserState = () => {
  return useRecoilValue(authenticatedUserRecoilState);
};

export const useAuthenticatedUserMutator = () => {
  const setState = useSetRecoilState(authenticatedUserRecoilState);
  const setAuthenticatedUser = useCallback(
    async (cognitoUser: CognitoUser | undefined) => {
      console.log('setAuthenticatedUser / cognitoUser:', cognitoUser);
      if (!cognitoUser)
        return setState((state) => ({
          ...state,
          isInitialized: true,
          isAuthenticated: false,
        }));

      const attributes: { email: string; emailVerified: boolean } =
        await new Promise((resolve) =>
          cognitoUser.getUserAttributes((_, attributes) => {
            console.log('getUserAttributes / attributes:', attributes);
            const { email, email_verified } = Object.fromEntries(
              attributes!.map(({ Name, Value }) => [Name, Value])
            );
            resolve({
              email,
              emailVerified: Boolean(email_verified),
            });
          })
        );

      setState({
        isInitialized: true,
        isAuthenticated: true,
        ...attributes,
      });
    },
    [setState]
  );
  return { setAuthenticatedUser };
};
