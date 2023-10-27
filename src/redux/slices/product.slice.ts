import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { getKeyFromTitle, hydrate } from "@/utils";
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

const productRequestUpdate = (updateData: ProductState) => {
  console.log({ updateData });
  return axios
    .put<ProductData>("/api/product/put", updateData)
    .then(({ data }) => ({ ...formatProductData(data), ...updateData }))
    .catch((error) => {
      console.log("error");
      throw error;
    });
};

export const productUpdate = createAsyncThunk<
  ProductState,
  any,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("product/update_part", (part, thunkApi) => {
  console.log({ part });
  return productRequestUpdate({ ...thunkApi.getState().product, ...part });
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

export const selectProductTRLValue = createSelector(
  [selectProduct],
  (product) => product.trl?.name
);

const getProductDetailOptions = (product: ProductState, title: string) => {
  const key = getKeyFromTitle(title);
  switch (key) {
    case "technologies":
    case "businessModels": {
      const value = (product[key] || []) as ProductState["businessModels"];
      return value.map((item) => item.name);
    }
    case "trl": {
      const value = product[key] as ProductState["trl"];
      return [value?.name];
    }
    case "costs": {
      const value = product[key] as string;
      return [value];
    }
    default:
      return [];
  }
};

export const selectProductDetailOptions = (title: string) =>
  createSelector([selectProduct], (product) =>
    getProductDetailOptions(product, title)
  );

export const selectProductDetailValue = (title: string) =>
  createSelector([selectProduct], (product) =>
    getProductDetailOptions(product, title).join(",")
  );

export default productSlice;
