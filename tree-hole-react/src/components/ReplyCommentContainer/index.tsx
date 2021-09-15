import React, { ReactNode } from "react";

// 留言的回复容器组件
export const ReplyCommentContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="pl-8 border-l-2 border-gray-200">{children}</div>;
};
