import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { CommentItem } from "../../AuthenticatedApp/components/CommentItem";
import { CommentReplyBox } from "../../AuthenticatedApp/components/CommentReplyBox";
import { ReplyCommentContainer } from "../../AuthenticatedApp/components/ReplyCommentContainer";
import {
  CommentProp,
  useCommentsList,
} from "../../context/CommentsListContext";
export const Comments = () => {
  // 获取当前登录的用户信息
  const { currentUser } = useUser();
  const history = useHistory();
  // 接收对应的用户id
  const { id }: { id: string } = useParams();
  const { getCurrentUserCommentsList } = useCommentsList();
  const [myCommentList, setMyCommentList] = useState<CommentProp[]>([]);
  useEffect(() => {
    if (currentUser._id === id) {
      // 当前登录用户只能获取自己的留言列表
      getCurrentUserCommentsList()
        .then((list) => setMyCommentList(list))
        .catch((err) => {
          console.error(err);
        });
    } else {
      history.push("/");
    }
  }, []);

  return (
    <div className="px-5 mt-5">
      {myCommentList
        ? myCommentList.map((comment) => {
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
          })
        : null}
    </div>
  );
};
