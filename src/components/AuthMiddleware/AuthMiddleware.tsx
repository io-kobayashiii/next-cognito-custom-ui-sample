import { getCurrentAuthenticatedUser } from '@/features/auth';
import { useAuthenticatedUserMutation } from '@/store/global/authenticatedUser';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const AuthMiddleware: FC<Props> = ({ children }) => {
  const { setAuthenticatedUser, setIsInitialized } =
    useAuthenticatedUserMutation();
  getCurrentAuthenticatedUser().then((currentAuthenticatedUser) => {
    if (currentAuthenticatedUser) {
      const { email, emailVerified } = currentAuthenticatedUser.attributes;
      setAuthenticatedUser({
        isInitialized: true,
        isAuthenticated: true,
        email: email,
        emailVerified,
      });
    } else {
      setIsInitialized(true);
    }
  });
  return <>{children}</>;
};

export default AuthMiddleware;
