import React, { ReactNode, useContext, useEffect, useState } from "react";

// 建立load context
const Load = React.createContext<{
  isLoading: boolean;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
} | null>(null);

Load.displayName = "Load";

export const LoadProvider = ({ children }: { children: ReactNode }) => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // 加载时禁止滚动
  const handleScroll = (event: TouchEvent | WheelEvent) => {
    event.preventDefault();
  };
  // 加载时禁止，未加载时允许
  useEffect(() => {
    if (isLoading) {
      document.body.addEventListener("touchmove", handleScroll, {
        passive: false,
      });
      document.body.addEventListener("wheel", handleScroll, {
        passive: false,
      });
    }
    return () => {
      // @ts-ignore
      document.body.removeEventListener("touchmove", handleScroll, {
        passive: true,
      });
      // @ts-ignore
      document.body.removeEventListener("wheel", handleScroll, {
        passive: true,
      });
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
