import React, { ReactNode } from "react";
import { CommentListProvider } from "./CommentsListContext";
import { LoadProvider } from "./Load";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LoadProvider>
      <CommentListProvider>{children}</CommentListProvider>
    </LoadProvider>
  );
};
