import { AuthSignupREQ } from '../store/auth/request/auth-signup.request';
import { PetDetailType } from '../types/pet/pet-detail.type';
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
  [SCREEN.CHAT_HISTORY]: undefined;
  [SCREEN.PET_DETAIL]: undefined | { petData: PetDetailType };
};

export type AdoptionStackParamList = {
  [SCREEN.ADD_POST]: undefined;
  [SCREEN.LOCATION]: undefined;
};

export type ProfileStackParamList = {
  [SCREEN.PROFILE]: undefined;
  [SCREEN.EDIT_PROFILE]: undefined;
  [SCREEN.MY_PET_DETAIL]: undefined;
};

export type PetCareStackParamList ={
  [SCREEN.BOT_CHAT]:undefined;
}