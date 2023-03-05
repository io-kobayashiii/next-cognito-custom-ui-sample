import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useMemo, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { Box, TextField, Button, Dialog, Fade } from '@mui/material';
import * as Auth from '../features/auth';
import { useAuthenticatedUserMutator } from '@/store/global/authenticatedUser';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NewPasswordRequiredDialog } from '@/components/NewPasswordRequiredDialog';
import { CognitoUser } from '@aws-amplify/auth';

const inter = Inter({ subsets: ['latin'] });

export const Index = () => {
  const router = useRouter();
  const { setAuthenticatedUser } = useAuthenticatedUserMutator();
  const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | undefined>(
    undefined
  );

  const schema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email('メールアドレスの形式が正しくありません')
          .required('この項目は必須です'),
        password: Yup.string().required('この項目は必須です'),
      }),
    []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSignInButtonClick: SubmitHandler<FieldValues> = async (formInput) => {
    console.log('onSignInButtonClick');
    const user = await Auth.signIn(formInput);
    setCognitoUser(user);

    if (!user) {
      alert('Email or password is incorrect.');
      return;
    }

    if (user.challengeName !== 'NEW_PASSWORD_REQUIRED') {
      await setAuthenticatedUser(user);
      router.push('/private');
      return;
    }

    setIsNewPasswordRequired(true);
  };

  return (
    <>
      <Head>
        <title>Sign In | Next + Cognito Custom UI</title>
      </Head>
      <main
        className={
          'min-h-100vh bg-gray-100 flex justify-center items-center p-30'
        }
      >
        <div className={`max-w-sm w-100p bg-white rounded-4 p-50 shadow-lg`}>
          <h2 className={`text-center text-24`}>Sign In</h2>
          <Box
            id={'sign-in-form'}
            component={'form'}
            onSubmit={handleSubmit(onSignInButtonClick)}
          >
            <TextField
              label="メールアドレス *"
              variant="outlined"
              className={'w-100p mt-50'}
              error={'email' in errors}
              helperText={errors.email?.message as string}
              {...register('email')}
            />
            <TextField
              label="パスワード *"
              variant="outlined"
              className={'w-100p mt-30'}
              type={'password'}
              autoComplete={'new-password'}
              error={'password' in errors}
              helperText={errors.password?.message as string}
              {...register('password')}
            />
          </Box>
          <div className={'mt-30'}>
            <Button
              variant={'contained'}
              type={'submit'}
              form={'sign-in-form'}
              className={'w-100p bg-orange-600 hover:bg-orange-700'}
            >
              Sign In
            </Button>
          </div>
          <div className={`mt-15`}>
            <p className={`text-14`}>
              <span>パスワードを忘れた方は</span>
              <Link href={`/forgot`} className={`ml-5 underline text-blue-400`}>
                こちら
              </Link>
            </p>
          </div>
          <div className={`mt-30 flex items-center`}>
            <div className={`flex-grow border-t border-gray-300`}></div>
            <p className={`mx-20 text-gray-300`}>or</p>
            <div className={`flex-grow border-t border-gray-300`}></div>
          </div>
          <div className={'mt-30'}>
            <Link href={'/sign-up'} className={`no-underline`}>
              <Button
                variant={'contained'}
                type={'button'}
                className={'w-100p bg-gray-600 hover:bg-gray-700'}
              >
                Go To Sign Up Page
              </Button>
            </Link>
          </div>
        </div>
        <NewPasswordRequiredDialog
          {...{ cognitoUser, isNewPasswordRequired }}
        />
      </main>
    </>
  );
};

export default Index;
