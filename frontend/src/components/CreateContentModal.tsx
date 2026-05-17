import { useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { BACKEND_URL } from "../pages/config";
import { Button } from "./Button";
import { Input } from "./Input";

// Replaced enum with as const to satisfy 'erasableSyntaxOnly'
const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
  Instagram: "instagram",
} as const;

type ContentTypeValues = (typeof ContentType)[keyof typeof ContentType];

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 28 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, y: 10,
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentTypeValues>(ContentType.Youtube);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) return;
    setIsSubmitting(true);

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { link, title, type },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      onClose();
    } catch (err) {
      console.error("Failed to add component entry data", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md bg-[#12131A]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_24px_60px_rgba(0,0,0,0.8)] rounded-3xl p-6 sm:p-8 relative overflow-hidden z-10 text-[#F5F5F7]"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
        >
          <CrossIcon />
        </motion.button>

        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
            Capture Content
          </h2>
          <p className="text-xs text-neutral-400 mt-1">Archiving a new node into your central engine.</p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="space-y-1.5">
            <label className="text-xs font-medium tracking-wide text-neutral-400 uppercase">Title</label>
            <Input reference={titleRef} placeholder="Give your reference entry a name..." />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium tracking-wide text-neutral-400 uppercase">Resource Link</label>
            <Input reference={linkRef} placeholder="Paste your target URL here..." />
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-xs font-medium tracking-wide text-neutral-400 uppercase mb-3">
            Source Platform
          </label>
          <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-full border border-white/[0.04]">
            {(Object.keys(ContentType) as Array<keyof typeof ContentType>).map((key) => {
              const currentVal = ContentType[key];
              const isSelected = type === currentVal;
              return (
                <button
                  key={currentVal}
                  type="button"
                  onClick={() => setType(currentVal)}
                  className={`relative py-2 text-xs font-medium rounded-full transition-all duration-300 select-none cursor-pointer text-center z-10
                    ${isSelected ? "text-[#0B0C10] font-semibold" : "text-neutral-400 hover:text-white"}`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activePlatformPill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                    />
                  )}
                  {key}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-white/[0.05]">
          <Button 
            onClick={addContent} 
            variant="primary" 
            text="Confirm Entry" 
            loading={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 font-semibold shadow-lg shadow-white/5" 
          />
        </div>
      </motion.div>
    </div>
  );
}