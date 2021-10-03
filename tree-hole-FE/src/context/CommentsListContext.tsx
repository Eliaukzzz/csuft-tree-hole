import React, { ReactNode, useContext, useState } from "react";
// import { apiUrl } from "../utils/apiUrl";
import { useLoad } from "./Load";
import { UserProps } from "./UserContext";

// 留言类型的类型定义
export type CommentType =
  | "life"
  | "relationship"
  | "emotion"
  | "seekHelp"
  | "all";
// 留言的类型定义
export interface CommentProp {
  id?: number;
  poster: UserProps;
  content: string;
  type: CommentType;
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
      commentListType: CommentType;
      getCommentsList: (type?: CommentType) => Promise<CommentProp[]>;
      createNewComment: (comment: CommentProp) => Promise<string>;
      setCommentsList: React.Dispatch<
        React.SetStateAction<CommentProp[] | null>
      >;
      setCommentListType: React.Dispatch<React.SetStateAction<CommentType>>;
    }
  | undefined
>(undefined);

// 设置context名
CommentsListContext.displayName = "CommentsListContext";

// 定义提供留言和获取留言函数的provider
export const CommentListProvider = ({ children }: { children: ReactNode }) => {
  // 定义一个state属性用于存评论列表
  const [commentsList, setCommentsList] = useState<null | CommentProp[]>(null);
  // 定义一个属性用于存储当前列表的类型
  const [commentListType, setCommentListType] = useState<CommentType>("all");

  // 从LoadProvider中取出isLoading判断是否在加载
  const { setIsLoading } = useLoad();
  // 获取指定树洞留言列表
  const getCommentsList = (type: CommentType = "all") => {
    setIsLoading(true);
    return fetch(type === "all" ? "/api/" : `/api?type=${type}/`).then(
      async (response) => {
        // 请求成功
        if (response.ok) {
          // 获取树洞留言列表
          const list: CommentProp[] = await response.json();
          setIsLoading(false);
          return Promise.resolve(list);
        } else {
          setIsLoading(false);
          return Promise.reject(await response.json());
        }
      }
    );
  };
  // 发布新的树洞留言
  const createNewComment = (newComment: CommentProp) => {
    setIsLoading(true);
    return fetch("/api/", {
      method: "POST",
      headers: {
        // 类型为json
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    }).then(async (response) => {
      // 请求成功
      if (response.ok) {
        // 重新请求一次留言列表
        getCommentsList().then((list) => {
          setCommentsList(list);
          setCommentListType("all");
        });
        return Promise.resolve(response.statusText);
      } else {
        return Promise.reject(response.status);
      }
    });
  };
  return (
    <CommentsListContext.Provider
      children={children}
      value={{
        commentsList,
        commentListType,
        getCommentsList,
        createNewComment,
        setCommentsList,
        setCommentListType,
      }}
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
