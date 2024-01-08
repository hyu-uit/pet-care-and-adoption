import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthLoginRESP } from '../auth/response/auth-login.response';
import { UserInformation } from '../../types/user-information.type';

export type SharedState = {
  isLogined: boolean;
  token: string | null;
  user: UserInformation;
};

export const initialState: SharedState = {
  isLogined: false,
  token: null,
  user: {
    name: '',
    address: '',
    phoneNumber: '',
  },
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setLoginToken: (state, { payload }: PayloadAction<AuthLoginRESP>) => {
      state.isLogined = true;
      state.token = payload.token;
      state.user = payload.user;
    },
    resetState: () => initialState,
  },
});

export const { setLoginToken, resetState } = sharedSlice.actions;

export default sharedSlice.reducer;
