import {
  InitializedStatus,
  useAuthenticatedUserState,
} from '@/store/global/authenticatedUser';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

export const AuthGuard: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { status, isAuthenticated } = useAuthenticatedUserState();

  useEffect(() => {
    if (status === InitializedStatus.Complete && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router, status]);

  return status === InitializedStatus.Complete && isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      <main
        className={
          'min-h-100vh bg-gray-100 flex justify-center items-center p-30'
        }
      >
        <CircularProgress />
      </main>
    </>
  );
};

export default AuthGuard;
