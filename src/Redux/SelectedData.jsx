import { createSlice } from "@reduxjs/toolkit";

const SelectedData = createSlice({
  name: "SelectedData",
  initialState: 0,
  reducers: {
    selectData(state, action) {
      return action.payload;
    },
    removeSelectedData(state, action) {
      state = 0;
      return state;
    },
  },
});

export const { selectData, removeSelectedData } = SelectedData.actions;
export default SelectedData.reducer;
