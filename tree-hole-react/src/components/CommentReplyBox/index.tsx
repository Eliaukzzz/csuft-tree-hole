import React, { useState } from "react";
import { CommentBox } from "../CommentBox";

// 回复树洞留言盒子组件
export const CommentReplyBox = () => {
  const [onReply, setOnReply] = useState(false);
  return (
    <div>
      {onReply ? (
        <CommentBox>
          <button
            className="px-4 py-1 bg-white rounded border ml-3"
            onClick={() => {
              setOnReply(!onReply);
            }}
          >
            取消
          </button>
        </CommentBox>
      ) : (
        <button
          onClick={() => {
            setOnReply(!onReply);
          }}
          className="pt-4 text-green-theme-green pb-10"
        >
          {" "}
          回复{" "}
        </button>
      )}
    </div>
  );
};
