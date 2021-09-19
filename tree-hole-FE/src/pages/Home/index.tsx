import React, { useEffect } from "react";
import { CommentBox } from "../../components/CommentBox";
import { CommentItem } from "../../components/CommentItem";
import { CommentReplyBox } from "../../components/CommentReplyBox";
import { ReplyCommentContainer } from "../../components/ReplyCommentContainer";
import { useCommentsList } from "../../context/CommentsListContext";
import { useShowNav } from "../../context/ShowNav";

export const Home = () => {
  const { showNav } = useShowNav();
  // 从CommentsListProvider中获得留言列表
  const { commentsList, getCommentsList } = useCommentsList();
  // 主页挂载时 请求获取列表
  useEffect(() => {
    getCommentsList();
  }, []);
  return (
    <div>
      {/* 留言回复输入框 */}
      <CommentBox children="" isTopCommentBox={true} />
      {/* 分割线 */}
      <div
        className={`custom-shape-divider-top-1631711424 sticky ${
          showNav ? "top-nav-shade lg:top-pc-shade" : "top-no-nav-shade"
        } transition-top duration-500`}
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      {/* 树洞留言区 */}
      <div className="px-5">
        {commentsList?.map((comment) => {
          return (
            <div key={comment.id}>
              <CommentItem isReply={false} comment={comment} />
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
