import React, { ReactNode, useContext, useState } from "react";
import { conversionTimestamp } from "../utils/conversionTimestamp";
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
  _id: string;
  content: string;
  type: CommentType;
  createTime: number | string;
  beLiked: UserProps[];
  beDisLiked: UserProps[];
  replies: ReplyProp[];
  posterInfo: UserProps;
}

// 留言评论的类型定义
export interface ReplyProp {
  _id: string;
  content: string;
  type: CommentType;
  createTime: number | string;
  posterInfo: UserProps;
  beLiked: UserProps[];
  beDisLiked: UserProps[];
}

// 创建留言和获取留言评论函数的context
const CommentsListContext = React.createContext<
  | {
      commentsList: CommentProp[] | null;
      commentListType: CommentType;
      getCommentsList: (type: CommentType) => Promise<CommentProp[]>;
      getCurrentUserCommentsList: () => Promise<CommentProp[]>;
      getFavoriteCommentsList: () => Promise<CommentProp[]>;
      removeComment: (commentId: string) => Promise<string>;
      likeAndDislike: (
        comment_id: string,
        user_id: string,
        type: "like" | "dislike" | "cancelLike" | "cancelDislike"
      ) => Promise<CommentProp>;
      createNewComment: (comment: {
        content: string;
        type: string;
      }) => Promise<string>;
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
  const getCommentsList = (type: CommentType) => {
    const token = localStorage.getItem("__CSUFTTreeHoleToken__");
    if (!token) return Promise.reject("本地没有token");
    setIsLoading(true);
    return fetch(
      type === "all" ? `/api/comment/` : `/api/comment/?type=${type}`,
      {
        headers: {
          // 如果有token 携带token
          Authorization: token,
        },
      }
    ).then(async (response) => {
      // 请求成功
      if (response.ok) {
        // 获取树洞留言列表
        const list: CommentProp[] = await response.json();
        setIsLoading(false);
        const commentList: CommentProp[] = list.map((comment) => {
          return {
            ...comment,
            createTime: conversionTimestamp(comment.createTime as number),
          };
        });
        return Promise.resolve(commentList);
      } else {
        setIsLoading(false);
        return Promise.reject(await response.json());
      }
    });
  };
  // 获取当前用户发布的留言列表
  const getCurrentUserCommentsList = () => {
    const token = localStorage.getItem("__CSUFTTreeHoleToken__");
    if (!token) return Promise.reject("本地没有token");
    setIsLoading(true);
    return fetch(`/api/comment/my`, {
      headers: {
        // 如果有token 携带token
        Authorization: token,
      },
    }).then(async (response) => {
      // 请求成功
      if (response.ok) {
        // 获取树洞留言列表
        const list: CommentProp[] = await response.json();
        setIsLoading(false);
        const commentList: CommentProp[] = list.map((comment) => {
          return {
            ...comment,
            createTime: conversionTimestamp(comment.createTime as number),
          };
        });
        return Promise.resolve(commentList);
      } else {
        setIsLoading(false);
        return Promise.reject(await response.json());
      }
    });
  };

  // 获取当前用户点赞的留言列表
  const getFavoriteCommentsList = () => {
    const token = localStorage.getItem("__CSUFTTreeHoleToken__");
    if (!token) return Promise.reject("本地没有token");
    setIsLoading(true);
    return fetch(`/api/comment/favorite`, {
      headers: {
        // 如果有token 携带token
        Authorization: token,
      },
    }).then(async (response) => {
      // 请求成功
      if (response.ok) {
        // 获取树洞留言列表
        const list: CommentProp[] = await response.json();
        setIsLoading(false);
        const commentList: CommentProp[] = list.map((comment) => {
          return {
            ...comment,
            createTime: conversionTimestamp(comment.createTime as number),
          };
        });
        return Promise.resolve(commentList);
      } else {
        setIsLoading(false);
        return Promise.reject(await response.json());
      }
    });
  };
  // 发布新的树洞留言
  const createNewComment = (newComment: { content: string; type: string }) => {
    setIsLoading(true);
    const token = localStorage.getItem("__CSUFTTreeHoleToken__");
    if (!token) return Promise.reject("本地没有token");
    return fetch("/api/comment/post", {
      method: "POST",
      headers: {
        // 类型为json
        "Content-Type": "application/json",
        // 如果有token 携带token
        Authorization: token,
      },
      body: JSON.stringify(newComment),
    }).then(async (response) => {
      // 请求成功
      if (response.ok) {
        // 重新请求一次留言列表
        getCommentsList("all").then((list) => {
          setCommentsList(list);
          setCommentListType("all");
        });
        return Promise.resolve(response.statusText);
      } else {
        return Promise.reject(response.status);
      }
    });
  };
  // 删除树洞留言
  const removeComment = async (commentId: string) => {
    setIsLoading(true);
    const token = localStorage.getItem("__CSUFTTreeHoleToken__");
    if (!token) return Promise.reject("本地没有token");
    const response = await fetch("/api/comment/remove", {
      method: "PATCH",
      headers: {
        // 类型为json
        "Content-Type": "application/json",
        // 如果有token 携带token
        Authorization: token,
      },
      body: JSON.stringify({ comment_id: commentId }),
    });
    if (response.ok) {
      setIsLoading(false);
      return Promise.resolve("成功删除留言");
    } else {
      setIsLoading(true);
      return Promise.reject("删除留言出错 请再试一次");
    }
  };
  // 点赞点踩
  const likeAndDislike = (
    comment_id: string,
    user_id: string,
    type: "like" | "dislike" | "cancelLike" | "cancelDislike"
  ) => {
    const token = localStorage.getItem("__CSUFTTreeHoleToken__");
    if (!token) return Promise.reject("本地没有token");
    setIsLoading(true);
    return fetch(`/api/comment/feel`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment_id, user_id, type }),
    }).then(async (response) => {
      // 请求成功
      if (response.ok) {
        // 获取修改后留言
        const result: CommentProp = await response.json();
        setIsLoading(false);
        const comment: CommentProp = {
          ...result,
          createTime: conversionTimestamp(result.createTime as number),
        };
        return Promise.resolve(comment);
      } else {
        setIsLoading(false);
        return Promise.reject(await response.json());
      }
    });
  };
  return (
    <CommentsListContext.Provider
      children={children}
      value={{
        removeComment,
        commentsList,
        commentListType,
        getCommentsList,
        createNewComment,
        likeAndDislike,
        setCommentsList,
        setCommentListType,
        getCurrentUserCommentsList,
        getFavoriteCommentsList,
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
