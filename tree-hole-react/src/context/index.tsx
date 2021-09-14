import React, { ReactNode } from "react";
import { CommentListProvider } from "./CommentsListContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <CommentListProvider>{children}</CommentListProvider>;
};
