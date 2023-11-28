import { createSlice } from "@reduxjs/toolkit";

const ShowFilterData = createSlice({
  name: "showfilterdata",
  initialState: 0,
  reducers: {
    showData(state, action) {
      return action.payload;
    },
    removeData(state, action) {
      state = [];
      return state;
    },
  },
});

export const { showData, removeData } = ShowFilterData.actions;
export default ShowFilterData.reducer;
