import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type TSetUserAction = {
  email: string;
  id: string;
}

const initialState = {
  email: '',
  id: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, {payload}: PayloadAction<TSetUserAction>) => {
      state.email = payload.email;
      state.id = payload.id;
    },
    removeUser: (state) => {
      state.email = '';
      state.id = '';
    }
  }
})

export const userReducer = userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;