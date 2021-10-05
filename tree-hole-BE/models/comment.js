const commentsCollection = require("../config/mongoDbConnection").getCollection(
  "comments"
);
const { ObjectId } = require("mongodb");
// 发布留言
exports.postComment = async (post) => {
  try {
    const col = await commentsCollection();
    const result = await col.insertOne(post);
    return result.ops && result.ops[0];
  } catch (error) {
    throw "发布新留言失败";
  }
};

// 获取留言列表
exports.findComment = async (query) => {
  try {
    const col = await commentsCollection();
    let type;
    type = query.poster_id
      ? {
          ...query,
          content: new RegExp(query.content),
          poster_id: ObjectId(query.poster_id),
        }
      : { ...query, content: new RegExp(query.content) };
    return col.find(type).sort({ createTime: -1 }).toArray();
  } catch (error) {
    throw "留言列表出错";
  }
};

exports.likeAndDislike = async (change) => {
  try {
    const col = await commentsCollection();
    const { comment_id, user_id, type } = change;
    const originComment = await col
      .find({ _id: ObjectId(comment_id) })
      .toArray();
    let list;
    let result;
    switch (type) {
      case "like":
        list = [...originComment[0].beLiked];
        list.push(user_id);
        result = await col.findOneAndUpdate(
          { _id: ObjectId(comment_id) },
          { $set: { beLiked: list } },
          { returnOriginal: false }
        );
        return result.value;

      case "dislike":
        list = [...originComment[0].beDisLiked];
        list.push(user_id);
        result = await col.findOneAndUpdate(
          { _id: ObjectId(comment_id) },
          { $set: { beDisLiked: list } },
          { returnOriginal: false }
        );
        return result.value;

      case "cancelLike":
        list = [...originComment[0].beLiked];
        list = list.filter((_id) => _id != user_id);
        result = await col.findOneAndUpdate(
          { _id: ObjectId(comment_id) },
          { $set: { beLiked: list } },
          { returnOriginal: false }
        );
        return result.value;

      case "cancelDislike":
        list = [...originComment[0].beDisLiked];
        list = list.filter((_id) => _id != user_id);
        result = await col.findOneAndUpdate(
          { _id: ObjectId(comment_id) },
          { $set: { beDisLiked: list } },
          { returnOriginal: false }
        );
        return result.value;

      default:
        return;
    }
  } catch (error) {
    throw "用户点赞点踩出错";
  }
};

// exports.delete = async (id) => {
//   try {
//     const col = await usersCollection();
//     await col.deleteOne({ _id: ObjectId(id) });
//   } catch (error) {
//     throw "删除文章出错";
//   }
// };

// exports.deleteCommentByUser = async (postId, user) => {
//   try {
//     const col = await usersCollection();
//     await col.updateOne(
//       { _id: ObjectId(postId) },
//       { $pull: { comments: { user } } }
//     );
//   } catch (error) {
//     throw "根据用户名删除评论出错";
//   }
// };
