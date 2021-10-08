import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  CommentProp,
  CommentType,
  ReplyProp,
  useCommentsList,
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
  const history = useHistory();
  const { likeAndDislike, removeComment } = useCommentsList();
  const { currentUser } = useUser();
  // 留言类型
  const [type, setType] = useState<string>("");
  // 判断是否在截取卡片
  const [onCapture, setOnCapture] = useState<boolean>(false);
  // 留言信息
  const [itemDetail, setItemDetail] = useState(comment);
  // 留言是否被当前用户点赞或点踩
  const [liking, setLiking] = useState(false);
  const [disliking, setDisliking] = useState(false);
  // 将留言类型由英文转化为中文
  useEffect(() => {
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
  // 每当点赞点踩后更新点赞点踩的状态
  useEffect(() => {
    itemDetail.beLiked?.find((likerId) => {
      return likerId === currentUser._id;
    })
      ? setLiking(true)
      : setLiking(false);
    itemDetail.beDisLiked?.find((haterId) => {
      return haterId === currentUser._id;
    })
      ? setDisliking(true)
      : setDisliking(false);
  }, [itemDetail]);
  // 点赞或取消点赞
  const handleLike = async () => {
    if (disliking && !liking) {
      // 当前已经点踩 先取消踩再赞
      try {
        await likeAndDislike(
          itemDetail._id,
          currentUser._id as string,
          "cancelDislike"
        );
        setItemDetail(
          await likeAndDislike(
            itemDetail._id,
            currentUser._id as string,
            "like"
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else if (!liking) {
      // 点赞
      try {
        setItemDetail(
          await likeAndDislike(
            itemDetail._id,
            currentUser._id as string,
            "like"
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      // 取消点赞
      try {
        setItemDetail(
          await likeAndDislike(
            itemDetail._id,
            currentUser._id as string,
            "cancelLike"
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
  // 点踩或取消点踩
  const handleDislike = async () => {
    if (liking && !disliking) {
      // 当前已经点赞，取消赞再踩
      try {
        await likeAndDislike(
          itemDetail._id,
          currentUser._id as string,
          "cancelLike"
        );
        setItemDetail(
          await likeAndDislike(
            itemDetail._id,
            currentUser._id as string,
            "dislike"
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else if (!disliking) {
      // 点踩
      try {
        setItemDetail(
          await likeAndDislike(
            itemDetail._id,
            currentUser._id as string,
            "dislike"
          )
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      // 取消踩
      try {
        setItemDetail(
          await likeAndDislike(
            itemDetail._id,
            currentUser._id as string,
            "cancelDislike"
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };
  // 删除
  const remove = async () => {
    removeComment(comment._id)
      .then(() => {
        history.go(0);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="mb-2">
      <div className="float-right mb-2 mt-3">
        {itemDetail.posterInfo._id === currentUser._id ? (
          <button onClick={remove} className="iconfont text-xl text-red-500">
            &#xe665;
          </button>
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
          <NavLink to={`/account/${itemDetail.posterInfo._id}`}>
            <p className="text-green-theme-green text-xl mb-2 mt-3">
              {itemDetail.posterInfo.nickname}
            </p>
          </NavLink>
          <p className="text-gray-600 text-sm">
            {itemDetail.createTime}
            {isReply ? null : (
              <span className="text-sm float-right ml-4">#{type}#</span>
            )}
          </p>
        </div>
      </div>

      <p className="text-gray-600 pt-2">{itemDetail.content}</p>
      {isReply ? null : (
        <div className="flex items-center pb-4">
          <div className={`${liking ? "text-red-500" : ""}`}>
            <button
              onClick={handleLike}
              className="pl-3 text-lg hover:text-red-500"
            >
              <span className="iconfont">&#xe673;</span>
              <span className="px-1">{itemDetail.beLiked.length}</span>
            </button>
          </div>
          <div className={`${disliking ? "text-red-500" : ""}`}>
            <button
              onClick={handleDislike}
              className="pl-3 text-lg hover:text-red-500"
            >
              <span className="iconfont">&#xe666;</span>
              <span className="px-1">{itemDetail.beDisLiked.length}</span>
            </button>
          </div>
          <div></div>
          {onCapture ? (
            <CaptureItem
              comment={itemDetail as CommentProp}
              setOnCapture={setOnCapture}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
