import { getCurrentAuthenticatedUser } from '@/features/auth';
import { useAuthenticatedUserMutator } from '@/store/global/authenticatedUser';
import { CognitoUser } from '@aws-amplify/auth';
import { FC, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export const AuthMiddleware: FC<Props> = ({ children }) => {
  const { setAuthenticatedUser } = useAuthenticatedUserMutator();
  useEffect(() => {
    getCurrentAuthenticatedUser().then(
      (cognitoUser: CognitoUser | undefined) => {
        setAuthenticatedUser(cognitoUser);
      }
    );
  }, [setAuthenticatedUser]);
  return <>{children}</>;
};

export default AuthMiddleware;
