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

export const useAuthenticatedUserMutation = () => {
  const setState = useSetRecoilState(authenticatedUserRecoilState);

  const setAuthenticatedUser = (newState: AuthenticatedUserState) => {
    setState((state) => ({
      ...state,
      ...newState,
    }));
  };

  const setIsInitialized = useCallback(
    (newIsInitialized: boolean) =>
      setState((state) => ({
        ...state,
        isInitialized: newIsInitialized,
      })),
    [setState]
  );

  return { setAuthenticatedUser, setIsInitialized };
};
