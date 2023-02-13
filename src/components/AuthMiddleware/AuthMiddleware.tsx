import { getCurrentAuthenticatedUser } from '@/features/auth';
import { useAuthenticatedUserMutator } from '@/store/global/authenticatedUser';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const AuthMiddleware: FC<Props> = ({ children }) => {
  const { setAuthenticatedUser } = useAuthenticatedUserMutator();
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
      setAuthenticatedUser((state) => ({ ...state, isInitialized: true }));
    }
  });
  return <>{children}</>;
};

export default AuthMiddleware;
