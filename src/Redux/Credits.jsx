import { createSlice } from "@reduxjs/toolkit";

const Credits = createSlice({
  name: "credits",
  initialState: {
    creditsCounts: 0,
    sessionsCount: 0,
  },
  reducers: {
    updateCredits(state, action) {
      state.creditsCounts = action.payload.credits;
      state.sessionsCount = action.payload.session;
      return state;
    },
  },
});

export const { updateCredits } = Credits.actions;
export default Credits.reducer;
