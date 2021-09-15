import React from "react";
import { CommentBox } from "./components/CommentBox";
import { CommentItem } from "./components/CommentItem";
import { CommentReplyBox } from "./components/CommentReplyBox";
import { Header } from "./components/Header";
import { Loading } from "./components/Loading";
import { ReplyCommentContainer } from "./components/ReplyCommentContainer";
import { useCommentsList } from "./context/CommentsListContext";
import { useLoad } from "./context/Load";

function App() {
  // 从CommentsListProvider中获得留言列表
  const { commentsList } = useCommentsList();
  // 从LoadProvider中获取isLoading
  const { isLoading } = useLoad();
  return (
    <div className="App">
      {/* loading组件 */}
      {isLoading ? <Loading /> : null}
      <main className="p-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto min-h-main-h bg-white rounded-lg shadow-2xl">
          {/* 导航栏 */}
          <Header />
          {/* 输入框 */}
          <CommentBox children="" isTopCommentBox={true} />
          {/* 分割线 */}
          <div className="custom-shape-divider-top-1631711424">
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
                  <CommentItem comment={comment} />
                  {comment?.replies ? (
                    <ReplyCommentContainer>
                      {comment.replies.map((reply) => {
                        return <CommentItem key={reply.id} comment={reply} />;
                      })}
                    </ReplyCommentContainer>
                  ) : null}
                  <CommentReplyBox />
                </div>
              );
            })}
          </div>
          <svg
            className="animate-bounce w-6 h-6 text-amber-900 mx-auto"
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
      </main>
    </div>
  );
}

export default App;
