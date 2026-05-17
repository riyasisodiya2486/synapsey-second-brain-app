import type { ReactElement } from "react";
import { motion } from "framer-motion";

interface SidebarItemsProps {
  text: string;
  icon: ReactElement;
  isActive?: boolean; // Added an optional flag to highlight the currently viewed stream
}

export function SidebarItems({ text, icon, isActive = false }: SidebarItemsProps) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`
        relative 
        flex 
        items-center 
        w-full 
        px-4 
        py-3 
        rounded-xl 
        cursor-pointer 
        select-none 
        group
        transition-colors 
        duration-300
        ${isActive ? "text-white" : "text-neutral-400 hover:text-white"}
      `}
    >
      {/* 
        Premium Hover and Active Indicator Backdrop
        Uses layoutId to animate between states smoothly if you expand this into a menu
      */}
      {isActive && (
        <motion.div
          layoutId="activeSidebarPill"
          className="absolute inset-0 bg-white/[0.04] border border-white/[0.06] backdrop-blur-md rounded-xl -z-10"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}

      {/* Subtle hover background accent for non-active items */}
      {!isActive && (
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.02] border border-transparent group-hover:border-white/[0.04] rounded-xl transition-all duration-300 -z-10" />
      )}

      {/* Icon Frame */}
      <div className="
        mr-3.5 
        text-lg 
        transition-transform 
        duration-300 
        group-hover:scale-110 
        text-neutral-400 
        group-hover:text-white
        flex 
        items-center 
        justify-center
      ">
        {icon}
      </div>

      {/* Label Text */}
      <span className="text-sm font-medium tracking-wide antialiased">
        {text}
      </span>
    </motion.div>
  );
}