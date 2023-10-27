import { configFetch, selectConfig } from "@/redux/slices/config.slice";
import { productFetch, selectProduct } from "@/redux/slices/product.slice";
import { useAppDispatch, useAppSelector } from "@/utils";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const config = useAppSelector(selectConfig);

  useEffect(() => {
    if (!product.id) dispatch(productFetch());
    if (!config.id) dispatch(configFetch());
  }, []);

  return <>{children}</>;
}
