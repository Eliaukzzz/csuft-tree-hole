import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  CommentProp,
  CommentType,
  ReplyProp,
} from "../../../context/CommentsListContext";
import { useUser } from "../../../context/UserContext";
import { CaptureItem } from "../CaptureItem";

// 树洞留言和留言回复内容组件
export const CommentItem = ({
  comment,
  isReply = false,
  commentType,
}: {
  isReply: boolean;
  comment: CommentProp | ReplyProp;
  commentType?: CommentType; // 留言类型
}) => {
  const { currentUser } = useUser();
  const [type, setType] = useState<string>("");
  const [onCapture, setOnCapture] = useState<boolean>(false);
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
      <div className="float-right mb-2 mt-3">
        {comment.posterInfo._id === currentUser._id ? (
          <button className="iconfont text-xl text-red-500">&#xe665;</button>
        ) : null}
        <button
          onClick={() => {
            setOnCapture(true);
          }}
          className="iconfont pl-3 text-base hover:text-red-500"
        >
          &#xe66a;
        </button>
      </div>
      <div className="flex">
        <div>
          <NavLink to={`/account/${comment.posterInfo._id}`}>
            <p className="text-green-theme-green text-xl mb-2 mt-3">
              {comment.posterInfo.nickname}
            </p>
          </NavLink>
          <p className="text-gray-600 text-sm">
            {comment.createTime}
            {isReply ? null : (
              <span className="text-sm float-right ml-4">#{type}#</span>
            )}
          </p>
        </div>
      </div>

      <p className="text-gray-600 pt-2">{comment.content}</p>
      {isReply ? null : (
        <div className="flex items-center pb-4">
          <div
            className={`${
              currentUser.likes?.find((likeId) => {
                return likeId === comment._id;
              })
                ? "text-red-500"
                : ""
            }`}
          >
            <button className="pl-3 text-lg hover:text-red-500">
              <span className="iconfont">&#xe673;</span>
              <span className="px-1">{comment.beLiked}</span>
            </button>
          </div>
          <div
            className={`${
              currentUser.disLikes?.find((hateId) => {
                return hateId === comment._id;
              })
                ? "text-red-500"
                : ""
            }`}
          >
            <button className="pl-3 text-lg hover:text-red-500">
              <span className="iconfont">&#xe666;</span>
              <span className="px-1">{comment.beDisLiked}</span>
            </button>
          </div>
          <div></div>
          {onCapture ? (
            <CaptureItem
              comment={comment as CommentProp}
              setOnCapture={setOnCapture}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
