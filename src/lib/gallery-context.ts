import { createContext, useContext } from "react";

export interface GalleryContextValue {
  openGallery: () => void;
  closeGallery: () => void;
  isOpen: boolean;
}

export const GalleryContext = createContext<GalleryContextValue | null>(null);

export function useGallery(): GalleryContextValue {
  const context = useContext(GalleryContext);
  if (!context)
    throw new Error("useGallery must be used within GalleryProvider");
  return context;
}
