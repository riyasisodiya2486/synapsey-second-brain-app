interface InputProps {
  placeholder: string;
  reference?: any; // Kept as any to match your existing form ref bindings smoothly
}

export function Input({ placeholder, reference }: InputProps) {
  return (
    <div className="relative w-full group">
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className="
          w-full 
          px-5 
          py-3 
          text-sm
          text-[#F5F5F7] 
          placeholder-neutral-500
          bg-black/20 
          backdrop-blur-md
          rounded-xl 
          border 
          border-white/[0.06] 
          outline-none
          
          /* Premium Transitions */
          transition-all 
          duration-300 
          ease-out
          
          /* Interactive States */
          hover:bg-white/[0.02]
          hover:border-white/15
          focus:bg-black/40
          focus:border-white/30
          focus:shadow-[0_0_20px_rgba(255,255,255,0.02)]
          
          /* Resetting system defaults gracefully */
          appearance-none
          autofill:bg-transparent
        "
      />
      
      {/* Micro-border glow accent that brightens on focus */}
      <div className="
        absolute 
        inset-0 
        -z-10 
        rounded-xl 
        opacity-0 
        group-focus-within:opacity-100 
        bg-gradient-to-r 
        from-white/[0.02] 
        to-transparent 
        pointer-events-none 
        transition-opacity 
        duration-500
      " />
    </div>
  );
}