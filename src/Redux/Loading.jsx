import { createSlice } from "@reduxjs/toolkit";

const Loading = createSlice({
  name: "Loading",
  initialState: false,
  reducers: {
    isLoading(state, action) {
      return action.payload;
    },
  },
});

export const { isLoading } = Loading.actions;
export default Loading.reducer;
