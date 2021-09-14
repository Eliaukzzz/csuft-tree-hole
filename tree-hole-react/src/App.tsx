import React from "react";
import { CommentBox } from "./components/CommentBox";
import { CommentItem } from "./components/CommentItem";
import { CommentReplyBox } from "./components/CommentReplyBox";
import { ReplyCommentContainer } from "./components/ReplyCommentContainer";
import { useCommentsList } from "./context/CommentsListContext";

function App() {
  // 从CommentsListProvider中获得留言列表
  const { commentsList } = useCommentsList();
  return (
    <div className="App">
      <main className="p-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl my-6">林科大树洞</h2>
          <CommentBox children="" />
          {/* 分割线 */}
          <div className="border-b border-gray-300 my-2 mb-4"></div>
          {/* 树洞留言区 */}
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
          {/* 顶级留言1 */}
        </div>
      </main>
    </div>
  );
}

export default App;
