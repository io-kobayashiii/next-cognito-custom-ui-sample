import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { Box, TextField, Button, Link } from '@mui/material';
import * as Auth from '../../features/auth';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export const SignUp = () => {
  const router = useRouter();

  const schema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email('メールアドレスの形式が正しくありません')
          .required('この項目は必須です'),
        password: Yup.string()
          .required('この項目は必須です')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'\(\)\-=^~¥\|@`\[;+:*\]},<.>])[a-zA-Z0-9!"#$%&'\(\)\-=^~¥\|@`\[;+:*\]},<.>]{8,}$/,
            {
              message:
                '小文字、大文字、数字、記号を含めた8文字以上で入力してください。',
            }
          ),
        passwordConfirmation: Yup.string()
          .required('この項目は必須です')
          .oneOf([Yup.ref('password')], 'パスワードが一致しません。'),
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

  const onSignUpButtonClick: SubmitHandler<FieldValues> = async (formInput) => {
    await Auth.signUp(formInput);
    router.push(
      `/verify?verifyingEmail=${encodeURIComponent(formInput.email)}`
    );
  };

  return (
    <>
      <Head>
        <title>Sign Up | Next + Cognito Custom UI</title>
      </Head>
      <main
        className={
          'min-h-100vh bg-gray-100 flex justify-center items-center p-30'
        }
      >
        <div className={`max-w-sm w-100p bg-white rounded-4 p-50 shadow-lg`}>
          <h2 className={`text-center text-24`}>Sign Up</h2>
          <Box
            id={'sign-up-form'}
            component={'form'}
            onSubmit={handleSubmit(onSignUpButtonClick)}
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
            <TextField
              label="パスワード確認 *"
              variant="outlined"
              className={'w-100p mt-30'}
              type={'password'}
              autoComplete={'new-password'}
              error={'passwordConfirmation' in errors}
              helperText={errors.passwordConfirmation?.message as string}
              {...register('passwordConfirmation')}
            />
          </Box>
          <div className={'mt-30'}>
            <Button
              variant={'contained'}
              type={'submit'}
              form={'sign-up-form'}
              className={'w-100p bg-blue-400 hover:bg-blue-500'}
            >
              Sign Up
            </Button>
          </div>
          <div className={`mt-30 flex items-center`}>
            <div className={`flex-grow border-t border-gray-300`}></div>
            <p className={`mx-20 text-gray-300`}>or</p>
            <div className={`flex-grow border-t border-gray-300`}></div>
          </div>
          <div className={'mt-30'}>
            <Link href={'/'} className={`no-underline`}>
              <Button
                variant={'contained'}
                type={'button'}
                className={'w-100p bg-gray-600 hover:bg-gray-700'}
              >
                Back To Sign In Page
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
