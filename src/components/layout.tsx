import { configFetch, selectConfig } from "@/redux/slices/config.slice";
import { productFetch, selectProduct } from "@/redux/slices/product.slice";
import { useAppDispatch, useAppSelector } from "@/utils";
import { PropsWithChildren, useEffect } from "react";
import Navbar from "@/components/navbar";

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const { id: productId } = useAppSelector(selectProduct);
  const config = useAppSelector(selectConfig);

  useEffect(() => {
    if (!productId) dispatch(productFetch());
    if (!config.id) dispatch(configFetch());
  }, []);

  return (
    <main>
      <Navbar />
      <aside className=""></aside>
      {children}
    </main>
  );
}
