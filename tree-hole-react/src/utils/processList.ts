import { CommentProp, OriginCommentProp } from "../context/CommentsListContext";
// 处理原始数据的方法
export const processList = (
  originCommentsList: OriginCommentProp[],
  originRepliesList: OriginCommentProp[]
): CommentProp[] => {
  const commentsList = originCommentsList.map((originComment) => {
    const replies: CommentProp[] = [];
    if (originComment.replies) {
      originComment.replies.map((replyId) => {
        replies.push(
          originRepliesList[
            originRepliesList.findIndex((originReply) => {
              return originReply.id === replyId;
            })
          ] as CommentProp
        );
      });
      return {
        ...originComment,
        replies,
      };
    } else {
      return {
        ...originComment,
        replies,
      };
    }
  });
  return commentsList;
};
