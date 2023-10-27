import config from "@/lib/config.json";
import product from "@/lib/product.json";
import trl from "@/lib/trl.json";
import { formatProductData } from "@/utils";
import { makeStore } from "@/redux/store";

export type Data<T> = {
  data?: T;
  message: string;
  error: boolean;
};

export type ConfigState = typeof config;

export type ProductData = typeof product;
export type ProductState = ReturnType<typeof formatProductData>;

export type TRL = (typeof trl)[0];

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
