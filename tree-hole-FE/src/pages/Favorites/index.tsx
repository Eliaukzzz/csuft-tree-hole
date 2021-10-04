import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { CommentItem } from "../../AuthenticatedApp/components/CommentItem";
import { CommentReplyBox } from "../../AuthenticatedApp/components/CommentReplyBox";
import { ReplyCommentContainer } from "../../AuthenticatedApp/components/ReplyCommentContainer";
import {
  CommentProp,
  useCommentsList,
} from "../../context/CommentsListContext";
export const Favorites = () => {
  const { currentUser } = useUser();
  // 接收对应的用户id
  const { id }: { id: string } = useParams();
  const [favoriteList, setFavoriteList] = useState<CommentProp[]>();
  const { getCommentsList } = useCommentsList();
  useEffect(() => {
    getCommentsList().then((response) => {
      setFavoriteList(response);
    });
  }, []);
  return (
    <div className="px-5 mt-5">
      {favoriteList
        ?.filter((comment) => {
          return currentUser.likes?.includes(comment._id);
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
