import { AuthForgotPasswordREQ } from './request/auth-forgot-password.request';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { BaseResponse } from '../response.type';
import { AuthLoginREQ } from './request/auth-login.request';
import { AuthLoginRESP } from './response/auth-login.response';
import { AuthSignupREQ } from './request/auth-signup.request';
import { AuthVerifyPhoneNumberREQ } from './request/auth-verify-phone-number.request';
import { CheckOTPResetPasswordREQ } from './request/auth-check-otp-reset-password.request';
import { NewPasswordREQ } from './request/auth-new-password.request';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/Account`,
    headers: {
      'Content-type': 'application/json',
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<AuthLoginRESP, AuthLoginREQ>({
      query: (body) => ({
        url: '/SignIn',
        method: HTTP_METHOD.POST,
        body,
      }),
      transformResponse: (response: AuthLoginRESP) => {
        return response;
      },
    }),
    signup: build.mutation<void, AuthSignupREQ>({
      query: (body) => ({
        url: '/SignUp',
        method: HTTP_METHOD.POST,
        body,
      }),
    }),
    verifySignup: build.mutation<void, AuthVerifyPhoneNumberREQ>({
      query: (body) => ({
        url: '/VerifyPhoneNumber',
        method: HTTP_METHOD.POST,
        body,
      }),
    }),
    forgotPassword: build.mutation<void, AuthForgotPasswordREQ>({
      query: (request: AuthForgotPasswordREQ) => ({
        url: `/ForgetPasswordCheckExist?phoneNumber=${request.phoneNumber}`,
        method: HTTP_METHOD.POST,
      }),
    }),
    checkOtpResetPassword: build.mutation<void, CheckOTPResetPasswordREQ>({
      query: (request: CheckOTPResetPasswordREQ) => ({
        url: `/CheckOTPResetPassword?phoneNumber=${request.phoneNumber}&otp=${request.otp}`,
        method: HTTP_METHOD.POST,
      }),
    }),
    setNewPassword: build.mutation<void, NewPasswordREQ>({
      query: (request: NewPasswordREQ) => ({
        url: `/ResetPassword?phoneNumber=${request.phoneNumber}&newPassword=${request.newPassword}`,
        method: HTTP_METHOD.POST,
      }),
    }),
    testApi: build.query<{}, void>({
      query: () => ({
        url: 'https://api.publicapis.org/entries',
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifySignupMutation,
  useForgotPasswordMutation,
  useCheckOtpResetPasswordMutation,
  useSetNewPasswordMutation,
  useTestApiQuery,
} = authApi;
