import React, { ReactNode, useEffect, useState } from "react";
import { UserProps } from "./UserContext";

const apiUrl = "http://localhost:3001/comment";
// 留言和留言评论的类型定义
export interface CommentProp {
  id: number;
  user: UserProps;
  content: string;
  replyTo: null | number;
  time: string;
  replies: null | CommentProp[];
}
// 新留言和新留言评论类型定义
export interface NewCommentProp {
  user: UserProps;
  content: string;
  replyTo: null | number;
  time: string;
}

// 创建留言和获取留言评论函数的context
const CommentsListContext = React.createContext<
  | {
      commentsList: CommentProp[] | null;
      getCommentsList: () => void;
      createNewComment: (comment: NewCommentProp) => void;
    }
  | undefined
>(undefined);

// 设置context名
CommentsListContext.displayName = "CommentsListContext";

// 定义提供留言和获取留言函数的provider
export const CommentListProvider = ({ children }: { children: ReactNode }) => {
  // 定义一个state属性用于存评论列表
  const [commentsList, setCommentsList] = useState<null | CommentProp[]>(null);
  // 获取树洞留言列表
  const getCommentsList = () => {
    fetch(apiUrl)
      .then(async (response) => {
        // 请求成功
        if (response.ok) {
          // 获取树洞留言列表
          setCommentsList(await response.json());
          return Promise.resolve(response.statusText);
        } else {
          return Promise.reject(response.status);
        }
      })
      .catch((err) => {
        console.error(`GET请求链接${apiUrl} 发生${err}错误`);
      });
  };
  // 发布新的树洞留言
  const createNewComment = (newComment: NewCommentProp) => {
    fetch(apiUrl, {
      method: "POST",
      headers: {
        // 类型为json
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then(async (response) => {
        // 请求成功
        if (response.ok) {
          // 重新请求一次留言列表
          getCommentsList();
          return Promise.resolve(response.statusText);
        } else {
          return Promise.reject(response.status);
        }
      })
      .catch((err) => {
        console.log(`POST请求链接${apiUrl} 发生${err}错误`);
      });
  };
  // 挂载时自动获取commentList
  useEffect(() => {
    getCommentsList();
  }, []);
  return (
    <CommentsListContext.Provider
      children={children}
      value={{ commentsList, getCommentsList, createNewComment }}
    />
  );
};

export const useCommentsList = () => {
  const context = React.useContext(CommentsListContext);
  if (!context) {
    throw new Error("useAuth必须在CommentsListProvider中使用");
  }
  return context;
};
