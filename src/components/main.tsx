import OfferedBy from "@/components/offered-by";
import Info from "@/components/info";
import TopBar from "@/components/top-bar";

export default function Main() {
  return (
    <div className="flex-1">
      <TopBar />
      <section className="flex-1 flex flex-col md:flex-row bg-white">
        <Info />
        <OfferedBy />
      </section>
    </div>
  );
}
