import { InnoBusinessModel, InnoCosts, InnoTRL, InnoTechnology } from "@/icons";
import Detail from "@/components/detail";

export default function Details() {
  return (
    <section className="lg:col-span-3 flex flex-col gap-5 bg-white rounded-md border border-slate-100">
      <h4 className="text-base font-semibold px-5 pt-5">Offer details</h4>
      <div className="px-5 pb-[1.875rem] grid sm:grid-cols-2 gap-5">
        <Detail Icon={InnoTechnology} title="Technology" editor="input" />
        <Detail
          Icon={InnoBusinessModel}
          title="Business Model"
          editor="input"
        />
        <Detail Icon={InnoTRL} title="TRL" editor="select" />
        <Detail Icon={InnoCosts} title="Costs" />
      </div>
    </section>
  );
}
