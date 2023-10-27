import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { hydrate } from "@/utils";
import { AppDispatch, ConfigState, RootState } from "@/types";
import axios from "axios";

const configSlice = createSlice({
  name: "config",
  initialState: {} as ConfigState,
  reducers: {
    configSet(state, action: PayloadAction<ConfigState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(configFetch.fulfilled, configSlice.caseReducers.configSet)
      .addCase(hydrate, (state, action) => ({
        ...state,
        ...action.payload.config,
      }));
  },
});

export const configFetch = createAsyncThunk<
  ConfigState,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("config/fetch", () =>
  axios
    .get<ConfigState>("/api/config")
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    })
);

export const selectConfig = ({ config }: RootState) => config;

export default configSlice;
