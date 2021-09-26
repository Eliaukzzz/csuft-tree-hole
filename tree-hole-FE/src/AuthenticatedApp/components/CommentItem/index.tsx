import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CommentProp,
  CommentType,
  ReplyProp,
} from "../../../context/CommentsListContext";
import { useUser } from "../../../context/UserContext";

// 树洞留言和留言回复内容组件
export const CommentItem = ({
  comment,
  isReply = false,
  commentType,
}: {
  comment: CommentProp | ReplyProp;
  isReply: boolean;
  commentType?: CommentType; // 留言类型
}) => {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const { currentUser } = useUser();
  const [type, setType] = useState<string>("");
  useEffect(() => {
    // 将留言类型转化为
    switch (commentType) {
      case "life":
        setType("生活琐事");
        return;
      case "relationship":
        setType("寝室关系");
        return;
      case "emotion":
        setType("情感");
        return;
      case "seekHelp":
        setType("求助");
        return;
      default:
        return;
    }
  }, []);
  // todo 点赞
  // todo 删除
  return (
    <div className="mb-2">
      {comment.poster.id === currentUser.id ? (
        <div
          className={`${
            openSelect ? "h-14" : "h-5"
          } w-20 mt-1 flex flex-col items-center float-right overflow-hidden`}
        >
          {openSelect ? (
            <div
              className="fixed top-0 left-0 blur-0 right-0 w-full h-full z-"
              onClick={() => {
                setOpenSelect(false);
              }}
            ></div>
          ) : null}
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
          <button
            className=" border-2 rounded px-5 shadow-sm z-50 mt-1"
            onClick={() => {
              console.log("删除");
            }}
          >
            删除
          </button>
        </div>
      ) : null}
      <div className="flex">
        <div>
          <NavLink to={`/account/${comment.poster.id}`}>
            <p className="text-green-theme-green text-xl mb-2 mt-3">
              {comment.poster.nickname}
            </p>
          </NavLink>
          <p className="text-gray-600 text-sm">
            {comment.time}
            {isReply ? null : (
              <span className="text-sm float-right ml-4">#{type}#</span>
            )}
          </p>
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
              <span className="px-1">{comment.likes}</span>
            </button>
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
              <span className="px-1">{comment.dislikes}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
