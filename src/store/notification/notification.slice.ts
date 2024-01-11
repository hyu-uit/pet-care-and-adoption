import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type NotificationState = {
  deviceToken: string | null;
};

export const initialState: NotificationState = {
  deviceToken: null,
};

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setPushToken: (state, { payload }: PayloadAction<string>) => {
      state.deviceToken = payload;
    },
    resetStateNotification: () => initialState,
  },
});

export const { setPushToken, resetStateNotification } =
  NotificationSlice.actions;

export default NotificationSlice.reducer;
