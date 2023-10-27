import { configFetch, selectConfig } from "@/redux/slices/config.slice";
import { productFetch, selectProduct } from "@/redux/slices/product.slice";
import { useAppDispatch, useAppSelector } from "@/utils";
import { Fragment, PropsWithChildren, useEffect } from "react";
import Navbar from "@/components/navbar";
import Aside from "@/components/aside";

export default function Layout({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const { id: productId } = useAppSelector(selectProduct);
  const config = useAppSelector(selectConfig);

  useEffect(() => {
    if (!productId) dispatch(productFetch());
    if (!config.id) dispatch(configFetch());
  }, [config.id, dispatch, productId]);

  return (
    <Fragment>
      <Navbar />
      <main className="min-h-full pt-[126px] md:pt-[77px]">
        <div className="container relative lg:flex lg:gap-x-16">
          <Aside />
          {children}
        </div>
      </main>
    </Fragment>
  );
}
