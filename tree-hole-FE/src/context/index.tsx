import React, { ReactNode } from "react";
import { CommentListProvider } from "./CommentsListContext";
import { LoadProvider } from "./Load";
import { ShowNavProvider } from "./ShowNav";
import { UserContextProvider } from "./UserContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LoadProvider>
      <ShowNavProvider>
        <UserContextProvider>
          <CommentListProvider>{children}</CommentListProvider>
        </UserContextProvider>
      </ShowNavProvider>
    </LoadProvider>
  );
};
