import React, { ReactNode, useState } from "react";
import {
  NewCommentProp,
  useCommentsList,
} from "../../context/CommentsListContext";

// 发布留言与回复 文本框组件
export const CommentBox = ({
  children,
  isTopCommentBox = false,
}: {
  children: ReactNode;
  isTopCommentBox?: boolean;
}) => {
  // 留言与回复框受控组件
  const [newComment, setNewComment] = useState("");
  const { createNewComment } = useCommentsList();
  // ! 没有后端暂时前端模拟数据发送请求
  const pushNewComment = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const mockData: NewCommentProp = {
      poster: {
        nickname: "苍术",
        avatar: "https://z3.ax1x.com/2021/09/05/hReKSA.jpg",
      },
      content: newComment,
      replyTo: null,
      time: "刚刚",
    };
    createNewComment(mockData);
    setNewComment("");
  };
  return (
    <form
      action=""
      className={
        isTopCommentBox ? "grid px-3 bg-gary-theme-gary" : "grid px-3 "
      }
      onSubmit={(event) => pushNewComment(event)}
    >
      <textarea
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            pushNewComment(event);
          }
        }}
        onChange={(event) => {
          setNewComment(event.target.value);
        }}
        value={newComment}
        name="comment"
        id=""
        placeholder="在树洞里宣泄你的情感，留下你的吐槽吧"
        className="bg-gray-50 mt-3 p-2 rounded border-2 border-gary-theme-gary"
      ></textarea>
      <fieldset className="py-4">
        <button
          type="submit"
          className="px-4 py-1 bg-green-theme-green rounded text-white"
        >
          发布
        </button>
        {children}
      </fieldset>
    </form>
  );
};
