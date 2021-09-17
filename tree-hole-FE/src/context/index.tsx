import React, { ReactNode } from "react";
import { CommentListProvider } from "./CommentsListContext";
import { LoadProvider } from "./Load";
import { ShowNavProvider } from "./ShowNav";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LoadProvider>
      <CommentListProvider>
        <ShowNavProvider>{children}</ShowNavProvider>
      </CommentListProvider>
    </LoadProvider>
  );
};
