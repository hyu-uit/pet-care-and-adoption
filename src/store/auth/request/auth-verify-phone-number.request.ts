import { AuthSignupREQ } from './auth-signup.request';

export type AuthVerifyPhoneNumberREQ = {
  otp: string;
  signUpModel: AuthSignupREQ;
};
