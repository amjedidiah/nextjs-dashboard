import { InnoCaretDownIcon, InnoHomeIcon, InnoOrganizations } from "@/icons";
import NameCard from "@/components/name-card";
import Link from "next/link";

export default function Aside() {
  return (
    <aside className="sticky top-[104px] md:top-[77px] flex-[1,0,280px] flex flex-col gap-[0.625rem] z-[2] bg-slate-200">
      <NameCard size={70} nameClassName="text-lg" />
      <ul className="list-none grid">
        <li>
          <Link
            href="/"
            className="inline-flex items-center py-3 lg:px-[0.625rem] gap-3 w-full text-blue-200"
          >
            <span>
              <InnoHomeIcon />
            </span>
            <span>Main Page</span>
          </Link>
        </li>
        <li>
          <Link
            href="/product"
            className="inline-flex items-center py-3 lg:px-[0.625rem] gap-3 w-full text-blue-200"
          >
            <span>
              <InnoOrganizations />
            </span>
            <span>Product</span>
            <span className="ml-auto [&_path]:fill-blue-200 ">
              <InnoCaretDownIcon />
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
