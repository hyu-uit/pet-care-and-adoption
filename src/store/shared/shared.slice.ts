import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ImageSourcePropType } from 'react-native';
import { IMAGES } from '../../config';

export type SharedState = {
  isLogined: boolean;
  token: string | null;
};

export const initialState: SharedState = {
  isLogined: false,
  token: null,
};

export const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {},
});

export const {} = sharedSlice.actions;

export default sharedSlice.reducer;
