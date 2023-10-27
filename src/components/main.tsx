import OfferedBy from "@/components/offered-by";
import Info from "@/components/info";
import TopBar from "@/components/top-bar";
import Video from "@/components/video";
import Details from "@/components/details";

export default function Main() {
  return (
    <div className="flex-1 grid gap-5">
      <TopBar />
      <section className="flex-1 flex flex-col md:flex-row bg-white">
        <Info />
        <OfferedBy />
      </section>

      <Video />
      <Details />
    </div>
  );
}
