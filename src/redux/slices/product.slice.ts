import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { hydrate } from "@/utils";
import { formatProductData } from "@/utils";
import { AppDispatch, ProductData, ProductState, RootState } from "@/types";
import axios from "axios";

const productSlice = createSlice({
  name: "product",
  initialState: {} as ProductState,
  reducers: {
    productSet(state, action: PayloadAction<ProductState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productFetch.fulfilled, productSlice.caseReducers.productSet)
      .addCase(productUpdate.fulfilled, productSlice.caseReducers.productSet)
      .addCase(hydrate, (state, action) => ({
        ...state,
        ...action.payload.product,
      }));
  },
});

export const productFetch = createAsyncThunk<
  ProductState,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("product/fetch", () =>
  axios
    .get<ProductData>("/api/product/get")
    .then(({ data }) => formatProductData(data))
    .catch((error) => {
      throw error;
    })
);

export const productUpdate = createAsyncThunk<
  ProductState,
  ProductState | undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("product/update", (stateProduct, thunkApi) => {
  const updateData = stateProduct ?? thunkApi.getState().product;

  return axios
    .put<ProductData>("/api/product/put", updateData)
    .then(({ data }) => ({ ...formatProductData(data), ...updateData }))
    .catch((error) => {
      throw error;
    });
});

export const selectProduct = ({ product }: RootState) => product;

export const selectProductUser = createSelector(
  [selectProduct],
  (product) => product.user || {}
);

export const selectProductCompany = createSelector(
  [selectProduct],
  (product) => product.company || {}
);

export default productSlice;
