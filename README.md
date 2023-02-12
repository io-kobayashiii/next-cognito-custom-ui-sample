# next-cognito-custom-ui-sample

This is a sample repository that does not use a Hosted UI, but uses Amplify's Auth class to control the prepared UI.

## Usage

Please set the Node version to "16.13.2".
Copy `.env.local.sample` and rename to `.env.local`.
Edit `.env.local` to your cognito user pool's value.
Then, execute the following commands.

```bash
$ yarn
$ yarn dev
```

## Representative packages

- Next.js
- @aws-amplify/auth
- MUI
- React Hook Form
- Yup
- TailwindCSS
