import { InnoCaretDownIcon, InnoHomeIcon, InnoOrganizations } from "@/icons";
import NameCard from "@/components/name-card";

export default function Aside() {
  return (
    <aside className="sticky top-[77px] md:max-w-[280px] grid gap-[0.625rem]">
      <NameCard size={70} textColor="text-blue-200" nameClassName="text-lg" />
      <ul className="list-none grid">
        <li className="inline-flex items-center py-3 px-2 gap-3">
          <span>
            <InnoHomeIcon />
          </span>
          <span className="text-blue-200">Main Page</span>
        </li>
        <li className="inline-flex items-center py-3 px-2 gap-3">
          <span>
            <InnoOrganizations />
          </span>
          <span className="text-blue-200">Members</span>
          <span className="flex-1">
            <InnoCaretDownIcon />
          </span>
        </li>
      </ul>
    </aside>
  );
}
