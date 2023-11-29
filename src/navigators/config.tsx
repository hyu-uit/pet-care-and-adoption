import { SCREEN } from './AppRoute';

export type AuthStackParamList = {
  [SCREEN.LOGIN]: undefined;
  [SCREEN.SIGN_UP]: undefined;
  [SCREEN.VERIFY]: undefined;
  [SCREEN.FORGOT_PASSWORD]: undefined;
  [SCREEN.NEW_PASSWORD]: undefined;
};

export type HomeStackParamList = {
  [SCREEN.HOME]: undefined;
  [SCREEN.SEARCH]: undefined;
  [SCREEN.PET_CARE_VIDEOS]: undefined;
  [SCREEN.NEARBY_CLINIC]: undefined;
  [SCREEN.LOST_PETS]: undefined;
  [SCREEN.NOTIFICATION]: undefined;
  [SCREEN.MENU]: undefined;
};

export type AdoptionStackParamList = {
  [SCREEN.ADD_POST]: undefined;
};
