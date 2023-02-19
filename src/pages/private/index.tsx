import AuthGuard from '@/components/AuthGuard/AuthGuard';
import { useAuthenticatedUserState } from '@/store/global/authenticatedUser';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import * as Auth from '../../features/auth';

export const Private = () => {
  const router = useRouter();
  const { email, emailVerified } = useAuthenticatedUserState();
  return (
    <AuthGuard>
      <main
        className={
          'min-h-100vh bg-gray-100 flex justify-center items-center p-30'
        }
      >
        <div className={`max-w-sm w-100p bg-white rounded-4 p-50 shadow-lg`}>
          <h2 className={`text-center text-24`}>
            Profile of the Signed In User
          </h2>
          <div className={`mt-30`}>
            <dl className={`flex`}>
              <dt className={`w-150 font-bold`}>Email</dt>
              <dd className={`flex-grow text-gray-600`}>{email}</dd>
            </dl>
            <dl className={`flex mt-10`}>
              <dt className={`w-150 font-bold`}>Email Verified</dt>
              <dd className={`flex-grow text-gray-600`}>
                {emailVerified ? 'true' : 'false'}
              </dd>
            </dl>
          </div>
          <div className={'mt-30'}>
            <Button
              variant={'contained'}
              type={'button'}
              className={'w-100p bg-orange-600 hover:bg-orange-700'}
              onClick={async () => {
                await Auth.signOut();
                router.push('/');
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default Private;
