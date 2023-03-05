import { useAuthenticatedUserMutator } from '@/store/global/authenticatedUser';
import { CognitoUser } from '@aws-amplify/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Fade, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import * as Auth from '../../features/auth';

type Props = {
  isNewPasswordRequired: boolean;
  cognitoUser: CognitoUser | undefined;
};

export const NewPasswordRequiredDialog = ({
  isNewPasswordRequired,
  cognitoUser,
}: Props) => {
  const router = useRouter();
  const { setAuthenticatedUser } = useAuthenticatedUserMutator();

  const schema = useMemo(
    () =>
      Yup.object({
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

  const onCompleteNewPasswordButtonClick: SubmitHandler<FieldValues> = async ({
    password,
  }) => {
    const user = await Auth.completeNewPassword({
      user: cognitoUser,
      password,
    });
    setAuthenticatedUser(user);
    router.push('/private');
  };

  return (
    <Fade in={isNewPasswordRequired}>
      <div className={`fixed top-0 left-0 z-100 h-100vh w-100p`}>
        <div
          className={`h-100p z-100p bg-black bg-opacity-30 flex justify-center items-center`}
        >
          <div className={`max-w-sm w-100p bg-white p-30 rounded-4`}>
            <p>
              現在のパスワードは仮パスワードです。
              <br />
              新しいパスワードを設定してください。
            </p>

            <Box
              id={'set-new-password-form'}
              component={'form'}
              onSubmit={handleSubmit(onCompleteNewPasswordButtonClick)}
            >
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
                form={'set-new-password-form'}
                className={'w-100p bg-blue-400 hover:bg-blue-500'}
              >
                Set New Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};
