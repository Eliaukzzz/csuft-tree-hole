import React, { ReactNode, useContext, useState } from "react";
import { apiUrl } from "../utils/apiUrl";
import { useLoad } from "./Load";
import { UserProps } from "./UserContext";

// 留言的类型定义
export interface CommentProp {
  id?: number;
  poster: UserProps;
  content: string;
  time: string;
  likes: number;
  dislikes: number;
  replies: null | ReplyProp[];
}

// 留言评论的类型定义
export interface ReplyProp {
  id?: number;
  replyTo: number;
  poster: UserProps;
  content: string;
  time: string;
  likes: number;
  dislikes: number;
}

// 创建留言和获取留言评论函数的context
const CommentsListContext = React.createContext<
  | {
      commentsList: CommentProp[] | null;
      getCommentsList: () => void;
      createNewComment: (comment: CommentProp) => void;
    }
  | undefined
>(undefined);

// 设置context名
CommentsListContext.displayName = "CommentsListContext";

// 定义提供留言和获取留言函数的provider
export const CommentListProvider = ({ children }: { children: ReactNode }) => {
  // 定义一个state属性用于存评论列表
  const [commentsList, setCommentsList] = useState<null | CommentProp[]>(null);

  // 从LoadProvider中取出isLoading判断是否在加载
  const { setIsLoading } = useLoad();
  // 获取树洞留言列表
  const getCommentsList = () => {
    setIsLoading(true);
    fetch(`${apiUrl}comment`)
      .then(async (response) => {
        // 请求成功
        if (response.ok) {
          // 获取树洞留言列表
          const list: CommentProp[] = await response.json();
          setIsLoading(false);
          setCommentsList(list);
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
  const createNewComment = (newComment: CommentProp) => {
    setIsLoading(true);
    fetch(`${apiUrl}comment`, {
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
  return (
    <CommentsListContext.Provider
      children={children}
      value={{ commentsList, getCommentsList, createNewComment }}
    />
  );
};

export const useCommentsList = () => {
  const context = useContext(CommentsListContext);
  if (!context) {
    throw new Error("useCommentsList必须在CommentsListProvider中使用");
  }
  return context;
};
