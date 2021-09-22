import React, { ReactNode, useState } from "react";
import {
  CommentProp,
  CommentType,
  useCommentsList,
} from "../../../context/CommentsListContext";

// 发布留言与回复 文本框组件
export const CommentBox = ({
  children,
  isTopCommentBox = false,
}: {
  children: ReactNode;
  isTopCommentBox?: boolean;
}) => {
  // 输入框受控组件
  const [newComment, setNewComment] = useState("");

  // select受控组件
  const [newCommentType, setNewCommentType] = useState<CommentType>("life");

  const { createNewComment } = useCommentsList();
  // ! 没有后端暂时前端模拟数据发送请求
  const pushNewComment = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const mockData: CommentProp = {
      poster: {
        id: 1,
        nickname: "苍术",
      },
      content: newComment,
      time: "刚刚",
      dislikes: 0,
      likes: 0,
      replies: null,
      type: newCommentType,
    };
    createNewComment(mockData);
    setNewComment("");
  };
  return (
    <div>
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
          placeholder="那些现实中不能发出的声音，请把它留在这里"
          className="bg-gray-50 mt-3 p-2 rounded border-2 border-gary-theme-gary"
        ></textarea>
        {isTopCommentBox ? (
          <select
            value={newCommentType}
            name="type-select"
            id="type-select"
            className="px-1 my-3 ml-1 w-24 rounded"
            onChange={(event) => {
              setNewCommentType(event.target.value as CommentType);
            }}
          >
            <option value="life">生活琐事</option>
            <option value="relationship">寝室关系</option>
            <option value="emotion">情感</option>
            <option value="seekHelp">求助</option>
          </select>
        ) : null}
        <fieldset className="pb-3">
          <button
            type="submit"
            className="px-4 py-1 my-2 bg-green-theme-green rounded text-white"
          >
            发布
          </button>
          {children}
        </fieldset>
      </form>
    </div>
  );
};
