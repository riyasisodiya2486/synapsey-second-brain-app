import { motion } from "framer-motion";
import { useState } from "react";
import { SidebarItems } from "./SidebarItems";
import { Logo } from "../icons/Logo";

// Minimalist, monochromatic structural inline vector path replacements
const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" h="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export function Sidebar() {
  // Track active menu items to trigger the premium pill animation frames
  const [activeTab, setActiveTab] = useState("Twitter");

  return (
    <>
      {/* Reference-Perfect Glassmorphic Sidebar Frame Container */}
      <aside className="hidden lg:flex h-[calc(100vh-2rem)] w-64 fixed left-4 top-4 bg-white/75 backdrop-blur-xl border border-[#DCDDE1] rounded-[32px] p-5 text-[#1A1D20] flex-col justify-between z-40 select-none shadow-[0_24px_50px_-15px_rgba(149,152,161,0.16)]">
        
        {/* Top Segment: Brand and Nav Links */}
        <div className="flex flex-col gap-9">
          
          {/* Brand Logo Alignment */}
          <div className="flex items-center text-lg font-bold tracking-tight text-[#1A1D20] px-3 mt-3">
            <div className="mr-3 p-2 bg-[#1A1D20] text-white rounded-xl shadow-md shadow-black/10">
              <Logo />
            </div>
            <span className="font-sans font-semibold text-[17px] tracking-tight text-[#1A1D20]">Synapsey</span>
          </div>
          
          {/* Vertical Menu Navigation Stack */}
          <nav className="flex flex-col gap-1 relative">
            <SidebarItems 
              text="Twitter" 
              icon={<TwitterIcon />} 
              active={activeTab === "Twitter"} 
              onClick={() => setActiveTab("Twitter")} 
            />
            <SidebarItems 
              text="Youtube" 
              icon={<YoutubeIcon />} 
              active={activeTab === "Youtube"} 
              onClick={() => setActiveTab("Youtube")} 
            />
            <SidebarItems 
              text="Instagram" 
              icon={<InstagramIcon />} 
              active={activeTab === "Instagram"} 
              onClick={() => setActiveTab("Instagram")} 
            />
          </nav>
        </div>

        {/* Bottom Segment: Profile Layout & Engine Monitoring Panel */}
        <div className="border-t border-[#EBECEF] pt-4 flex flex-col gap-3.5">
          {/* User Meta Frame */}
          <div className="flex items-center gap-3 px-2">
            <div className="relative w-9 h-9 rounded-full bg-[#E2E4E9] overflow-hidden border border-[#DCDDE1] flex items-center justify-center text-xs font-bold text-neutral-600 shadow-inner">
              AK
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold text-[#1A1D20] leading-tight">Ann Kowalski</span>
              <span className="text-[10px] text-neutral-400 font-medium mt-0.5">Admin Profile</span>
            </div>
          </div>

          {/* Core System Status Badge */}
          <div className="flex items-center gap-2.5 bg-[#F4F5F6] border border-[#E2E4E9] rounded-2xl px-3.5 py-2.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-30"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
            </div>
            <span className="text-[9.5px] font-bold tracking-wider text-neutral-500 uppercase">Engine Sync Online</span>
          </div>
        </div>
      </aside>

      {/* Mobile Component Interface Dock */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl border border-[#DCDDE1] px-4 py-2 flex items-center justify-around z-40 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-full">
        <SidebarItems text="Twitter" icon={<TwitterIcon />} active={activeTab === "Twitter"} onClick={() => setActiveTab("Twitter")} />
        <SidebarItems text="Youtube" icon={<YoutubeIcon />} active={activeTab === "Youtube"} onClick={() => setActiveTab("Youtube")} />
        <SidebarItems text="Instagram" icon={<InstagramIcon />} active={activeTab === "Instagram"} onClick={() => setActiveTab("Instagram")} />
      </div>
    </>
  );
}