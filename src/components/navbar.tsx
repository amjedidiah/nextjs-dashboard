import Image from "next/image";
import logo from "../../public/images/logo.webp";
import Link from "next/link";
import {
  InnoCaretDownIcon,
  InnoMessengerIcon,
  InnoNotificationIcon,
  InnoSearchIcon,
} from "@/icons";
import UserImage from "@/components/user-image";
import useMainColor from "@/hooks/use-main-color";

export default function Navbar() {
  // Apply config mainColor to header
  const headerRef = useMainColor<HTMLDivElement>(["backgroundColor"]);
  return (
    <nav
      className="fixed bg-blue-100 w-full left-0 top-0 py-4 z-10"
      ref={headerRef}
    >
      <div className="container grid grid-cols-[auto,1fr] md:grid-cols-[auto,1fr,auto] items-center justify-between gap-4 md:gap-10 lg:gap-0">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>

        <form className="col-span-3 md:col-span-1 lg:pl-[170px] lg:pr-10">
          <div className="flex-1 flex items-center lg:max-w-[500px] rounded-[0.25rem] py-1 pl-2 pr-4 bg-white">
            <input
              type="search"
              aria-label="search"
              placeholder="Enter interests, keyword, company name, etc."
              className="outline-0 border-none flex-1"
            />
            <span>
              <InnoSearchIcon />
            </span>
          </div>
        </form>

        <ul className="col-start-3 col-span-1 row-start-1 flex items-center gap-3 md:gap-4 list-none">
          <li className="flex gap-1 md:gap-2 items-center">
            <span>
              <InnoMessengerIcon />
            </span>
          </li>
          <li className="flex gap-1 md:gap-2 items-center text-white">
            <span>EN</span>
            <span>
              <InnoCaretDownIcon />
            </span>
          </li>
          <li className="flex gap-1 md:gap-2 items-center">
            <span>
              <InnoNotificationIcon />
            </span>
          </li>
          <li className="flex gap-1 md:gap-2 items-center text-white">
            <UserImage size={25} className="border border-white" />
            <span>
              <InnoCaretDownIcon />
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
