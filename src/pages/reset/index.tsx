import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { Box, TextField, Button, Skeleton, Link } from '@mui/material';
import * as Auth from '../../features/auth';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export const Reset = () => {
  const router = useRouter();

  const schema = useMemo(
    () =>
      Yup.object({
        email: Yup.string(),
        code: Yup.string().required('この項目は必須です'),
        password: Yup.string().required('この項目は必須です'),
      }),
    []
  );
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (router.isReady) {
      const { resettingEmail } = router.query;
      !resettingEmail && router.push('/');
      setValue('email', resettingEmail);
    }
  }, [router, setValue]);

  const onResetPasswordButtonClick: SubmitHandler<FieldValues> = async (
    formInput
  ) => {
    const response = await Auth.resetPassword(formInput);
    if (response === 'SUCCESS') {
      alert(
        '新しいパスワードの設定に成功しました。\nサインインページからサインインしてください。'
      );
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | Next + Cognito Custom UI</title>
      </Head>
      <main
        className={
          'min-h-100vh bg-gray-100 flex justify-center items-center p-30'
        }
      >
        <div className={`max-w-sm w-100p bg-white rounded-4 p-50 shadow-lg`}>
          {router.isReady ? (
            <>
              <h2 className={`text-center text-24`}>Reset Password</h2>
              <Box
                id={'reset-password-form'}
                component={'form'}
                onSubmit={handleSubmit(onResetPasswordButtonClick)}
              >
                <p className={`mt-30 text-14`}>
                  入力したメールアドレスに認証コードを送信しました。
                  <br />
                  認証コードと新しいパスワードを入力してください。
                </p>
                <TextField
                  label="メールアドレス *"
                  variant="outlined"
                  className={'w-100p mt-50'}
                  disabled
                  InputLabelProps={{ shrink: true }}
                  {...register('email')}
                />
                <TextField
                  label="認証コード *"
                  variant="outlined"
                  className={'w-100p mt-30'}
                  autoComplete={'new-password'}
                  error={'code' in errors}
                  helperText={errors.code?.message as string}
                  {...register('code')}
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
                  form={'reset-password-form'}
                  className={'w-100p bg-green-600 hover:bg-green-700'}
                >
                  Reset Password
                </Button>
              </div>
              <div className={`mt-30 flex items-center`}>
                <div className={`flex-grow border-t border-gray-300`}></div>
                <p className={`mx-20 text-gray-300`}>or</p>
                <div className={`flex-grow border-t border-gray-300`}></div>
              </div>
              <div className={`mt-30 flex justify-between`}>
                <Link href={'/forgot'} className={`no-underline`}>
                  <Button
                    variant={'contained'}
                    type={'button'}
                    className={'w-220 bg-gray-600 hover:bg-gray-700'}
                  >
                    Back To Forgot Password Page
                  </Button>
                </Link>
                <Link href={'/'} className={`no-underline`}>
                  <Button
                    variant={'contained'}
                    type={'button'}
                    className={'w-220 bg-gray-600 hover:bg-gray-700'}
                  >
                    Go To Top Page
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Skeleton className={`w-50p`} />
              <Skeleton variant="rounded" height={24} className={`mt-30`} />
              <Skeleton variant="rounded" height={24} className={`mt-30`} />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Reset;
