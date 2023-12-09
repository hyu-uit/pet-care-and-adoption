import { AuthSignupREQ } from '../store/auth/request/auth-signup.request';
import { SCREEN } from './AppRoute';

export type AuthStackParamList = {
  [SCREEN.LOGIN]: undefined;
  [SCREEN.SIGN_UP]: undefined;
  [SCREEN.VERIFY]:
    | undefined
    | { signupInfo?: AuthSignupREQ }
    | { name: SCREEN; phoneNumber?: string };
  [SCREEN.FORGOT_PASSWORD]: undefined;
  [SCREEN.NEW_PASSWORD]: undefined | { phoneNumber: string };

  //tam
  [SCREEN.CHAT_HISTORY]: undefined;
  [SCREEN.CHAT_DETAIL]: undefined;
};

export type HomeStackParamList = {
  [SCREEN.HOME]: undefined;
  [SCREEN.SEARCH]: undefined;
  [SCREEN.PET_CARE_VIDEOS]: undefined;
  [SCREEN.NEARBY_CLINIC]: undefined;
  [SCREEN.LOST_PETS]: undefined;
  [SCREEN.NOTIFICATION]: undefined;
  [SCREEN.MENU]: undefined;
  [SCREEN.AUTH_STACK]: undefined;
};

export type AdoptionStackParamList = {
  [SCREEN.ADD_POST]: undefined;
  [SCREEN.LOCATION]: undefined;
};