"use client";

import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SidepanelContent = ReactNode | null;

interface SidepanelContextType {
  content: SidepanelContent;
  setContent: (content: SidepanelContent) => void;
  clear: () => void;
}

const SidepanelContext = createContext<SidepanelContextType | undefined>(
  undefined
);

export function SidepanelProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SidepanelContent>(null);
  const pathname = usePathname();

  useEffect(() => {
    setContent(null);
  }, [pathname]);

  return (
    <SidepanelContext.Provider
      value={{
        content,
        setContent,
        clear: () => setContent(null),
      }}
    >
      {children}
    </SidepanelContext.Provider>
  );
}

export function useSidepanel() {
  const context = useContext(SidepanelContext);
  if (!context) {
    throw new Error("useSidepanel must be used within a SidepanelProvider");
  }
  return context;
}
