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
  const { commentsList, getCommentsList } = useCommentsList();
  useEffect(() => {
    if (currentUser.id === +id) {
      // 如果是当前登录获取留言列表
      getCommentsList();
    }
  }, []);

  return (
    <div className="px-5 mt-5">
      {commentsList
        ?.filter((comment) => {
          return comment.poster.id === currentUser.id;
        })
        .map((comment) => {
          return (
            <div key={comment.id}>
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
                        key={reply.id}
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
