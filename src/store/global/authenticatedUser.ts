import { useCallback } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

export enum InitializedStatus {
  Uninitialized = 'Uninitialized',
  Complete = 'Complete',
}

type AuthenticatedUserState = {
  status: InitializedStatus;
  isAuthenticated: boolean;
  email: string;
  emailVerified: boolean;
};

const authenticatedUserRecoilState = atom<AuthenticatedUserState>({
  key: 'authenticatedUserState',
  default: {
    status: InitializedStatus.Uninitialized,
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

  const setAuthenticatedUser = useCallback(
    (newState: AuthenticatedUserState) => setState(newState),
    [setState]
  );

  const setInitializedStatus = useCallback(
    (newInitializedStatus: InitializedStatus) =>
      setState((state) => ({
        ...state,
        status: newInitializedStatus,
      })),
    [setState]
  );

  return { setAuthenticatedUser, setInitializedStatus };
};
