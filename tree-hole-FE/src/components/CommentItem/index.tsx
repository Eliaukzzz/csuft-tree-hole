import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CommentProp } from "../../context/CommentsListContext";
import { useUser } from "../../context/UserContext";

// 树洞留言和留言回复内容组件
export const CommentItem = ({
  comment,
  isReply = false,
}: {
  comment: CommentProp;
  isReply: boolean;
}) => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const { currentUser } = useUser();
  return (
    <div>
      {comment.poster.id === currentUser.id ? (
        <div
          className={`${
            openSelect ? "h-12" : "h-5"
          } w-20 mt-1 flex flex-col items-center float-right overflow-hidden`}
        >
          <div
            className="w-full h-5"
            onClick={() => setOpenSelect(!openSelect)}
          >
            <button className="float-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
            </button>
          </div>
          <button className="border rounded px-5 shadow-sm">删除</button>
        </div>
      ) : null}
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
      </div>

      <p className="text-gray-600 pt-2">{comment.content}</p>
      {isReply ? null : (
        <div className="iconfont flex items-center pb-4">
          <div
            className={`${
              currentUser.favorite?.find((likeId) => {
                return likeId === comment.id;
              })
                ? "text-red-500"
                : ""
            }`}
          >
            <button className="pl-3 text-lg hover:text-red-500">
              &#xe670;
            </button>
            <span className="px-1">{comment.likes}</span>
          </div>
          <div
            className={`${
              currentUser.hate?.find((hateId) => {
                return hateId === comment.id;
              })
                ? "text-red-500"
                : ""
            }`}
          >
            <button className="pl-3 text-lg hover:text-red-500">
              &#xe666;
            </button>
            <span className="px-1">{comment.dislikes}</span>
          </div>
        </div>
      )}
    </div>
  );
};
