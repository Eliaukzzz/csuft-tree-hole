import React, { useEffect } from "react";
import { CommentBox } from "../../AuthenticatedApp/components/CommentBox";
import { CommentItem } from "../../AuthenticatedApp/components/CommentItem";
import { CommentReplyBox } from "../../AuthenticatedApp/components/CommentReplyBox";
import { CommentTypeBox } from "../../AuthenticatedApp/components/CommentTypeBox";
import { ReplyCommentContainer } from "../../AuthenticatedApp/components/ReplyCommentContainer";
import { useCommentsList } from "../../context/CommentsListContext";

export const Home = () => {
  // 从CommentsListProvider中获得留言列表
  const {
    commentsList,
    commentListType,
    getCommentsList,
    setCommentsList,
    setCommentListType,
  } = useCommentsList();
  // 切换页面类型时 请求获取列表
  useEffect(() => {
    getCommentsList(commentListType).then((list) => {
      setCommentsList(list);
    });
  }, [commentListType]);
  return (
    <div className="wrapper">
      {/* 留言回复输入框 */}
      <CommentBox children="" isTopCommentBox={true} />
      {/* 树洞留言区 */}
      <div className="px-5 my-2">
        <CommentTypeBox
          listType={commentListType}
          setListType={setCommentListType}
        />
        {commentsList?.map((comment) => {
          return (
            <div key={comment.id} className="bg-white">
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
      {/* 页面底部小箭头 */}
      <svg
        className="animate-bounce h-6 text-amber-900 mx-auto absolute bottom-0 w-full"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  );
};
