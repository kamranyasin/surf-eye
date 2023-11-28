import { configureStore } from "@reduxjs/toolkit";
import Credits from "./Credits";
import FilterSlice from "./FilterSlice";
import Loading from "./Loading";
import SelectedData, { selectData } from "./SelectedData";
import ShowFilterData from "./ShowFilterData";
const store = configureStore({
  reducer: {
    filter: FilterSlice,
    showfilterdata: ShowFilterData,
    selectData: SelectedData,
    Loading: Loading,
    credits: Credits,
  },
});

export default store;
