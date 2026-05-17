import { useEffect, useRef } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { InstagramIcon } from "../icons/InstagramIcon";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram";
  onDelete?: () => void;
}

export function Card(props: CardProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  
  const TypeIcon =
    props.type === "youtube" ? (
      <YoutubeIcon />
    ) : props.type === "instagram" ? (
      <InstagramIcon />
    ) : (
      <TwitterIcon />
    );

  useEffect(() => {
    if (props.type === "twitter" && (window as any).twttr?.widgets && mediaRef.current) {
      (window as any).twttr.widgets.load(mediaRef.current);
    }

    if (props.type === "instagram" && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [props.link, props.type]);

  return (
    <div className="w-full h-[400px] flex flex-col justify-between p-5 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.06] shadow-2xl hover:bg-white/[0.04] hover:border-white/15 transition-all duration-500 ease-out group relative overflow-hidden">
      
      {/* Decorative top illumination line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Card Header */}
      <div className="flex justify-between items-center mb-4 z-10">
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-neutral-400 group-hover:text-white transition-colors duration-300 shrink-0">
            {TypeIcon}
          </div>
          <span className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors duration-300 truncate tracking-wide">
            {props.title}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-neutral-400 opacity-80 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 ease-out z-20">
          <a 
            href={props.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <ShareIcon />
          </a>
          <button 
            onClick={props.onDelete}
            className="p-1.5 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>

      {/* Media Window Container */}
      <div className="relative flex-grow w-full h-full overflow-hidden rounded-xl bg-black/20 border border-white/[0.04]">
        
        {props.type === "youtube" && (
          <div className="w-full h-full flex items-center justify-center p-1">
            <iframe
              className="w-full aspect-video rounded-lg shadow-lg"
              src={props.link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {props.type === "instagram" && (
          <div 
            ref={mediaRef}
            className="w-full h-full overflow-y-auto overflow-x-hidden p-2 dark-scrollbar"
          >
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={props.link}
              data-instgrm-version="14"
              style={{
                background: "transparent",
                border: 0,
                borderRadius: 8,
                margin: "0 auto",
                maxWidth: "100%",
                minWidth: "100%",
                padding: 0,
                width: "100%",
              }}
            ></blockquote>
          </div>
        )}

        {props.type === "twitter" && (
          <div
            ref={mediaRef}
            className="w-full h-full overflow-y-auto overflow-x-hidden p-3 dark-scrollbar"
          >
            {/* Dark Theme Force for Twitter Widgets */}
            <blockquote className="twitter-tweet" data-theme="dark">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}