import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { CommentItem } from "../../AuthenticatedApp/components/CommentItem";
import { CommentReplyBox } from "../../AuthenticatedApp/components/CommentReplyBox";
import { ReplyCommentContainer } from "../../AuthenticatedApp/components/ReplyCommentContainer";
import { useCommentsList } from "../../context/CommentsListContext";
export const Comments = () => {
  // 获取当前登录的用户信息
  const { currentUser } = useUser();
  // 接收对应的用户id
  const { id }: { id: string } = useParams();
  const { commentsList, setCommentsList, getCurrentUserCommentsList } =
    useCommentsList();
  useEffect(() => {
    if (currentUser._id === id) {
      //清空当前列表
      setCommentsList([]);
      // 当前登录用户只能获取自己的留言列表
      getCurrentUserCommentsList(id)
        .then((list) => setCommentsList(list))
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <div className="px-5 mt-5">
      {commentsList
        ?.filter((comment) => {
          return comment.posterInfo._id === currentUser._id;
        })
        .map((comment) => {
          return (
            <div key={comment._id}>
              <CommentItem
                isReply={false}
                comment={comment}
                commentType={comment.type}
              />
              {comment?.replies ? (
                <ReplyCommentContainer>
                  {comment.replies.map((reply) => {
                    return (
                      <CommentItem
                        isReply={true}
                        key={reply._id}
                        comment={reply}
                      />
                    );
                  })}
                </ReplyCommentContainer>
              ) : null}
              <CommentReplyBox />
            </div>
          );
        })}
    </div>
  );
};
