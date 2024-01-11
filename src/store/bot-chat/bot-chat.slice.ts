import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SEX } from '../../types/enum/sex.enum';

export type BotChatState = {
  type: string;
  age: number;
  gender: SEX;
  conversationId: string;
};

export const initialState: BotChatState = {
  type: 'Dog',
  age: 1,
  gender: SEX.MALE,
  conversationId: 'uit',
};

export const BotChatSlice = createSlice({
  name: 'botChat',
  initialState,
  reducers: {
    changeType: (state, { payload }: PayloadAction<string>) => {
      state.type = payload;
    },
    changeAge: (state, { payload }: PayloadAction<number>) => {
      state.age = payload;
    },
    changeGender: (state, { payload }: PayloadAction<SEX>) => {
      state.gender = payload;
    },
    changeConversationId: (state, { payload }: PayloadAction<string>) => {
      state.conversationId = payload;
    },
  },
});

export const { changeGender, changeAge, changeType, changeConversationId } =
  BotChatSlice.actions;

export default BotChatSlice.reducer;
