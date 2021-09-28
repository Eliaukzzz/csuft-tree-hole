import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useBanScroll, useCancelBanScroll } from "../utils/useScroll";

// 建立load context
const Load = React.createContext<{
  isLoading: boolean;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
} | null>(null);

Load.displayName = "Load";

export const LoadProvider = ({ children }: { children: ReactNode }) => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 加载时禁止，未加载时允许
  useEffect(() => {
    if (isLoading) {
      useBanScroll();
    }
    return () => {
      useCancelBanScroll();
    };
  }, [isLoading]);
  return (
    <Load.Provider children={children} value={{ isLoading, setIsLoading }} />
  );
};

export const useLoad = () => {
  const context = useContext(Load);
  if (!context) {
    throw new Error("useLoad必须在useLoad中使用");
  }
  return context;
};
