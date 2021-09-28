import React from "react";
import { CommentType } from "../../../context/CommentsListContext";

// 切换展示的留言类型组件
export const CommentTypeBox = ({
  listType = "all",
  setListType,
}: {
  listType: CommentType;
  setListType: React.Dispatch<React.SetStateAction<CommentType>>;
}) => {
  return (
    <div className="w-full h-10">
      <select
        value={listType}
        onChange={(event) => {
          setListType(event.target.value as CommentType);
        }}
        className="float-right grid grid-cols-5 text-center"
      >
        <option value="all">全部</option>
        <option value="life">生活琐事</option>
        <option value="relationship">寝室关系</option>
        <option value="emotion">情感</option>
        <option value="seekHelp">求助</option>
      </select>
    </div>
  );
};
