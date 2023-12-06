import { UserInformation } from '../../../types/user-information.type';

export type AuthLoginRESP = {
  user: UserInformation;
  token: string;
};
