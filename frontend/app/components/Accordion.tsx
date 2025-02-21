import clsx from "clsx";
import ChevronDown from "../icons/ChevronDown";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  label: string;
  labelPosition?: "left" | "right";
  maxW?: string;
  children: React.ReactNode;
};

function Accordion({ children, label, labelPosition, maxW }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [overflow, setOverflow] = useState<"hidden" | "visible">("hidden");

  return (
    <div style={{ maxWidth: maxW }} className="mx-auto mb-6 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "px-2 gap-1.5 mb-2 mr-2 flex text-gray-300",
          labelPosition === "right" && "ml-auto mr-0"
        )}
      >
        {label}
        <div className={clsx("transition-transform", isOpen && "-rotate-90")}>
          <ChevronDown />
        </div>
      </button>
      <motion.div
        onAnimationStart={() => !isOpen && setOverflow("hidden")}
        onAnimationComplete={() => isOpen && setOverflow("visible")}
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { height: "auto" },
          collapsed: { height: 0 },
        }}
        transition={{ duration: 0.2 }}
        style={{ overflow }}
      >
        {children}
      </motion.div>
    </div>
  );
}
export default Accordion;
