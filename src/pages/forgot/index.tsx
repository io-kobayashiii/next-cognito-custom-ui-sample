import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import Link from 'next/link';
import * as Auth from '@/features/auth';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export const Forgot = () => {
  const router = useRouter();

  const schema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email('メールアドレスの形式が正しくありません')
          .required('この項目は必須です'),
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

  const onRequestToResetPasswordButtonClick: SubmitHandler<
    FieldValues
  > = async ({ email }) => {
    Auth.requestPasswordReset(email)
      .then(() => {
        router.push(`/reset?resettingEmail=${encodeURIComponent(email)}`);
      })
      .catch(console.log);
  };

  return (
    <>
      <Head>
        <title>Forgot Password | Next + Cognito Custom UI</title>
      </Head>
      <main
        className={
          'min-h-100vh bg-gray-100 flex justify-center items-center p-30'
        }
      >
        <div className={`max-w-sm w-100p bg-white rounded-4 p-50 shadow-lg`}>
          <>
            <h2 className={`text-center text-24`}>Forgot Password</h2>
            <Box
              id={'forgot-password-form'}
              component={'form'}
              onSubmit={handleSubmit(onRequestToResetPasswordButtonClick)}
            >
              <TextField
                label="メールアドレス *"
                variant="outlined"
                className={'w-100p mt-50'}
                error={'email' in errors}
                helperText={errors.email?.message as string}
                {...register('email')}
              />
            </Box>
            <div className={'mt-30'}>
              <Button
                variant={'contained'}
                type={'submit'}
                form={'forgot-password-form'}
                className={'w-100p bg-green-600 hover:bg-green-700'}
              >
                Request To Reset Password
              </Button>
            </div>
            <div className={`mt-30 flex items-center`}>
              <div className={`flex-grow border-t border-gray-300`}></div>
              <p className={`mx-20 text-gray-300`}>or</p>
              <div className={`flex-grow border-t border-gray-300`}></div>
            </div>
            <div className={`mt-30 flex justify-between`}>
              <Link href={'/sign-up'} className={`no-underline`}>
                <Button
                  variant={'contained'}
                  type={'button'}
                  className={'w-220 bg-gray-600 hover:bg-gray-700'}
                >
                  Back To Sign Up Page
                </Button>
              </Link>
              <Link href={'/'} className={`no-underline`}>
                <Button
                  variant={'contained'}
                  type={'button'}
                  className={'w-220 bg-gray-600 hover:bg-gray-700'}
                >
                  Go To Sign In Page
                </Button>
              </Link>
            </div>
          </>
        </div>
      </main>
    </>
  );
};

export default Forgot;
