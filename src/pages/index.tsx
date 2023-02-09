import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useMemo } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import * as Auth from '../features/auth';

const inter = Inter({ subsets: ['latin'] });

export const Index = () => {
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

  const onCreateButtonClick: SubmitHandler<FieldValues> = async (formInput) => {
    console.log('onCreateButtonClick / formInput:', formInput);
    Auth.signIn(formInput);
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
            id={'create-user-form'}
            component={'form'}
            onSubmit={handleSubmit(onCreateButtonClick)}
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
              form={'create-user-form'}
              className={'w-100p bg-orange-600 hover:bg-orange-700'}
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
