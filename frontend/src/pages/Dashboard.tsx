import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import axios from "axios";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { ShareIcon } from "../icons/ShareIcon";
import { BACKEND_URL } from "./config";
import { Search } from "../components/Search";

const PREMIUM_MOCK_DATA = [
  {
    _id: "mock-1",
    type: "youtube",
    title: "Quantum Mechanics",
    link: "https://www.youtube.com/watch?v=t06aTX9jM34",
  },
  {
    _id: "mock-2",
    type: "twitter",
    title: "How Linear engineered its ultra-fast client-side caching engine architecture",
    link: "https://x.com/Rainmaker1973/status/2054909872026619938",
  },
  {
    _id: "mock-3",
    type: "instagram",
    title: "Visualizing Creative Direction & Modern Typography Hierarchy Rules",
    link: "https://www.instagram.com/reel/DXkH5VLIMM6/?igsh=MXVieXBpMHNwcGVhNA==",
  },
];

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 130, 
      damping: 22 
    },
  },
};

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [shareLink, setShareLink] = useState<string | null>(null);

  useEffect(() => {
    refresh();
  }, [modalOpen, refresh]);

  const activeContents = contents && contents.length > 0 ? contents : PREMIUM_MOCK_DATA;

  const filteredContents = activeContents.filter(
    (item: any) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShareBrain = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
      setShareLink(shareUrl);
      setTimeout(() => setShareLink(null), 4000);
    } catch (err) {
      console.error("Brain sync share operation dropped", err);
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (id.startsWith("mock-")) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { id },
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#EBECEF] text-[#1A1D20] font-sans overflow-x-hidden antialiased p-4 sm:p-5 selection:bg-black/10">
      
      {/* Real Organic Environment Shadow Projection */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden mix-blend-multiply opacity-[0.32]">
        <svg className="w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <filter id="natural-blur">
            <feGaussianBlur stdDeviation="45" />
          </filter>
          <path d="M 850,0 Q 700,250 520,120 T 150,450 Q 380,650 720,280 Z" fill="#9295A2" filter="url(#natural-blur)" />
          <path d="M 50,180 Q 280,120 400,380 T 950,750 Q 550,950 150,650 Z" fill="#9295A2" filter="url(#natural-blur)" />
        </svg>
      </div>

      {/* Global Synchronized Navigation Structure */}
      <Sidebar />

      {/* Main Grid Viewport Layout Canvas */}
      <div className="w-full lg:pl-72 min-h-screen flex flex-col transition-all duration-500 ease-out pb-24 lg:pb-0">
        
        <AnimatePresence>
          {modalOpen && (
            <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {shareLink && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed bottom-8 right-8 z-50 bg-[#1A1D20] text-white px-6 py-4 rounded-[24px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] flex flex-col gap-1.5 border border-white/10 max-w-sm"
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Synapse Link Generated</span>
              <p className="text-xs font-mono bg-white/5 p-2.5 rounded-xl border border-white/5 truncate">
                {shareLink}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sync Header Box */}
        <div className="px-4 sm:px-8 pt-6 pb-6">
          <motion.header 
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between w-full"
          >
            <div>
              <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase block mb-1"> Workspace Node </span>
              <h1 className="text-4xl font-medium tracking-tight text-[#1A1D20]">
                Management
              </h1>
            </div>

            {/* Micro-Pill Controls and Search Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full xl:w-auto">
              <div className="w-full sm:w-80 bg-white border border-[#DCDDE1] shadow-[0_8px_30px_rgba(0,0,0,0.01)] rounded-full px-1 py-0.5 flex items-center">
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
              
              <div className="flex gap-2 items-center w-full sm:w-auto">
                <Button
                  onClick={() => setModalOpen(true)}
                  variant="primary"
                  text="Add Content"
                  startIcon={<PlusIcon />}
                  className="flex-1 sm:flex-initial py-3 px-6 bg-black text-white hover:bg-neutral-800 font-medium text-xs rounded-full shadow-[0_12px_24px_-6px_rgba(0,0,0,0.12)] transition-all duration-300"
                />
                <Button
                  onClick={handleShareBrain}
                  variant="secondary"
                  text="Share Brain"
                  startIcon={<ShareIcon />}
                  className="flex-1 sm:flex-initial py-3 px-6 bg-white text-[#1A1D20] border border-[#DCDDE1] hover:bg-neutral-50 font-medium text-xs rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300"
                />
              </div>
            </div>
          </motion.header>
        </div>

        {/* Structural Main Cards Content Deck Area */}
        <div className="px-4 sm:px-8 py-2 flex-1 w-full">
          <motion.main
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredContents.map((props: any) => (
                <motion.div
                  layout
                  key={props._id}
                  variants={cardItemVariants}
                  exit={{ opacity: 0, scale: 0.96, y: 10 }}
                  className="group relative flex flex-col justify-between bg-white border border-[#DCDDE1] rounded-[32px] p-6 shadow-[0_16px_40px_-12px_rgba(149,152,161,0.14)] hover:shadow-[0_24px_50px_-10px_rgba(149,152,161,0.24)] transition-all duration-400 ease-out"
                >
                  <Card
                    id={props._id}
                    type={props.type}
                    link={props.link}
                    title={props.title}
                    onDelete={() => handleDeleteContent(props._id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.main>

          {filteredContents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-44 text-center"
            >
              <p className="text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                No Synaptic Nodes Found
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}