import type { ReactElement } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
}

const variantStyles = {
  primary: 
    "bg-[#F5F5F7] text-[#0B0C10] font-medium shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:bg-white border border-transparent",
  secondary: 
    "bg-white/[0.03] backdrop-blur-md text-[#F5F5F7] font-normal border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06]",
};

const defaultStyles = 
  "relative overflow-hidden px-5 py-2.5 rounded-full text-sm tracking-wide flex items-center justify-center transition-all duration-300 ease-out select-none cursor-pointer disabled:cursor-not-allowed";

export function Button({ 
  variant, 
  text, 
  startIcon, 
  onClick, 
  fullWidth = false, 
  loading = false,
  className = "" 
}: ButtonProps) {
  
  return (
    <motion.button
      whileHover={loading ? {} : { scale: 1.02, y: -1 }}
      whileTap={loading ? {} : { scale: 0.98, y: 0 }}
      onClick={onClick}
      disabled={loading}
      className={`
        ${defaultStyles} 
        ${variantStyles[variant]} 
        ${fullWidth ? "w-full" : "w-auto"} 
        ${className}
      `}
    >
      {/* Background Loading Pulse Overlay */}
      {loading && (
        <motion.div 
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
        />
      )}

      {/* Content Layout */}
      <div className={`flex items-center justify-center gap-2 ${loading ? "opacity-40" : "opacity-100"} transition-opacity duration-300`}>
        {startIcon && (
          <span className="flex items-center justify-center text-base transition-transform duration-300 group-hover:scale-105">
            {startIcon}
          </span>
        )}
        <span className="font-sans antialiased">{text}</span>
      </div>

      {/* Loading Indicator Circle */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-current opacity-80" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}
    </motion.button>
  );
}