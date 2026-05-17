import { SearchIcon } from "../icons/SearchIcon";

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function Search({ searchTerm, setSearchTerm }: SearchProps) {
  return (
    <div className="relative w-full flex items-center group">
      {/* Icon Wrapper Layer */}
      <span className="absolute left-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-white transition-colors duration-300 z-10">
        <SearchIcon />
      </span>
      
      <input
        type="text"
        placeholder="Search everything..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full 
          pl-12 
          pr-5 
          py-2.5 
          text-sm
          text-[#F5F5F7] 
          placeholder-neutral-500
          bg-white/[0.02] 
          backdrop-blur-md
          rounded-full 
          border 
          border-white/[0.06] 
          outline-none
          
          /* Premium Mechanical Transitions */
          transition-all 
          duration-400 
          ease-out
          
          /* Interactive Focus States */
          hover:bg-white/[0.04]
          hover:border-white/15
          focus:bg-black/30
          focus:border-white/25
          focus:shadow-[0_0_30px_rgba(255,255,255,0.02)]
        "
      />
    </div>
  );
}