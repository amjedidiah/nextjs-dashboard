import { InnoLocation } from "@/icons";
import NameCard from "@/components/name-card";
import { useAppSelector } from "@/utils";
import { selectProductCompany } from "@/redux/slices/product.slice";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import cx from "classnames";
import useEditing from "@/hooks/use-editing";

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN as string,
});

export default function OfferedBy() {
  const {
    address: companyAddress,
    coords: companyCoords,
    logo: companyLogo,
  } = useAppSelector(selectProductCompany);
  const editing = useEditing();

  return (
    <article className="max-w-sm py-5 px-[0.625rem] lg:p-5 lg:border-l lg:border-slate-100 rounded-b-[0.25rem] lg:rounded-b-none lg:rounded-r-[0.25rem]">
      <div className="grid gap-5 lg:gap-[0.625rem]">
        <p className="font-semibold">Offered By</p>
        <div
          className={cx(
            {
              loading: !companyLogo,
            },
            "relative company-logo"
          )}
        >
          <Image
            src={companyLogo || "/images/logo.web"}
            alt="logo"
            fill
            sizes="100%"
          />
        </div>
        <NameCard textColor="text-blue-300" />
        <p className="py-[0.625rem] flex items-start gap-1 text-blue-300">
          <span>
            <InnoLocation />
          </span>
          <span
            dangerouslySetInnerHTML={{
              __html: companyAddress,
            }}
          />
        </p>
        {!editing && (
          <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "200px",
              maxWidth: "342px",
              width: "100%",
            }}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "marker-15" }}
            >
              <Feature coordinates={companyCoords} />
            </Layer>
          </Map>
        )}
      </div>
    </article>
  );
}
