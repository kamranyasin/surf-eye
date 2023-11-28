import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice({
  name: "filter",
  initialState: null,
  reducers: {
    addDate(state, action) {
      return action.payload;
    },
    removeDate(state, action) {
      state = null;
      return state;
    },
  },
});

export const { addDate, removeDate } = FilterSlice.actions;
export default FilterSlice.reducer;
