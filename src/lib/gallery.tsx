import { useCallback, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { GalleryView } from "../components/GalleryView";
import { GalleryContext } from "./gallery-context";

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openGallery = useCallback(() => setOpen(true), []);
  const closeGallery = useCallback(() => setOpen(false), []);

  return (
    <GalleryContext.Provider
      value={{ openGallery, closeGallery, isOpen: open }}
    >
      {children}

      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="portal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none fixed inset-0 z-[90] bg-[#07080d]"
              />
              <motion.img
                key="portal-heart"
                src="/love.svg"
                alt=""
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none fixed inset-0 z-[95] m-auto h-[160vmax] w-auto"
              />
              <GalleryView key="gallery" delay={0.35} onClose={closeGallery} />
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </GalleryContext.Provider>
  );
}
