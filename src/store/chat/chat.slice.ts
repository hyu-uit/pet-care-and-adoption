import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ChatState = {
  otherUser: {
    displayName: string;
    id: string;
  };
};

type ChangeOtherUserType = {
  displayName: string;
  id: string;
};

export const initialState: ChatState = {
  otherUser: {
    displayName: '',
    id: '',
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    changeOtherUser: (
      state,
      { payload }: PayloadAction<ChangeOtherUserType>
    ) => {
      (state.otherUser.displayName = payload.displayName),
        (state.otherUser.id = payload.id);
    },
  },
});

export const { changeOtherUser } = chatSlice.actions;

export default chatSlice.reducer;
