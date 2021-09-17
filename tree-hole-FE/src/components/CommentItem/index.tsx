import React from "react";
import { NavLink } from "react-router-dom";
import { CommentProp } from "../../context/CommentsListContext";

// 树洞留言和留言回复内容组件
export const CommentItem = ({ comment }: { comment: CommentProp }) => {
  return (
    <div>
      <div className="flex">
        <NavLink to={`/account/${comment.poster.id}`}>
          <img
            src={comment.poster.avatar}
            alt=""
            className="w-12 h-12 mr-4 rounded-full"
          />
        </NavLink>

        <div>
          <p>{comment.poster.nickname}</p>
          <p className="text-gray-600 text-sm">{comment.time}</p>
        </div>
        <span className="ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
          </svg>
        </span>
      </div>
      <p className="text-gray-600 py-4">{comment.content}</p>
    </div>
  );
};
