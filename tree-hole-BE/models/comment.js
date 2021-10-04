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

// exports.update = async (id, post) => {
//   try {
//     const col = await usersCollection();
//     const result = await col.findOneAndUpdate(
//       { _id: ObjectId(id) },
//       { $set: post },
//       { returnOriginal: false }
//     );
//     return result.value;
//   } catch (error) {
//     throw "更新文章出错";
//   }
// };

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
