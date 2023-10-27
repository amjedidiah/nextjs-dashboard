import { useEffect } from "react";
import { useAnimate } from "framer-motion";

export default function Loading() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span.dot-1",
      { y: ["0em", "-1em", "0em"], opacity: [1, 0, 1] },
      { ease: "easeInOut", duration: 0.75, repeat: Infinity }
    );
    animate(
      "span.dot-2",
      { y: ["0em", "-1em", "0em"], opacity: [1, 0, 1] },
      { ease: "easeInOut", duration: 0.75, repeat: Infinity, delay: 0.5 }
    );
    animate(
      "span.dot-3",
      { y: ["0em", "-1em", "0em"], opacity: [1, 0, 1] },
      { ease: "easeInOut", duration: 0.75, repeat: Infinity, delay: 1 }
    );
  }, [scope, animate]);

  return (
    <div
      className="flex items-center justify-center gap-x-1 relative top-2"
      ref={scope}
    >
      <span className="dot dot-1 w-1 h-1 rounded-full bg-slate-100 inline-flex border border-white" />
      <span className="dot dot-2 w-1 h-1 rounded-full bg-slate-100 inline-flex border border-white" />
      <span className="dot dot-3 w-1 h-1 rounded-full bg-slate-100 inline-flex border border-white" />
    </div>
  );
}
