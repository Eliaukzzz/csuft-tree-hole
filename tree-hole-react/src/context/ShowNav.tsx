import React, { ReactNode, useContext, useState } from "react";

// 建立ShowNav context
const ShowNav = React.createContext<{
  showNav: boolean;
  setShowNav: (value: React.SetStateAction<boolean>) => void;
} | null>(null);

ShowNav.displayName = "ShowNav";

export const ShowNavProvider = ({ children }: { children: ReactNode }) => {
  //
  const [showNav, setShowNav] = useState<boolean>(false);
  return (
    <ShowNav.Provider children={children} value={{ showNav, setShowNav }} />
  );
};

export const useShowNav = () => {
  const context = useContext(ShowNav);
  if (!context) {
    throw new Error("ShowNavContext必须在ShowNavContextProvider中使用");
  }
  return context;
};
