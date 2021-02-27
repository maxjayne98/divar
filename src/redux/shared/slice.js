import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  counter: 0,
  loading: false,
  users: [],
  error: {},
};

const sharedSlice = createSlice({
  name: "shared",
  initialState: initialState,
  reducers: {
    increment: (state, action) => {
      state.counter += action.payload;
    },
    decrement: (state, action) => {
      state.counter -= action.payload;
    },
  },
});

export const sharedActions = sharedSlice.actions;

export default sharedSlice.reducer;
