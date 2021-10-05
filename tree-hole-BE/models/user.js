const usersCollection = require("../config/mongoDbConnection").getCollection(
  "users"
);
const { ObjectId } = require("mongodb");
// 注册
exports.register = async (user) => {
  try {
    const col = await usersCollection();
    const result = await col.insertOne(user);
    return result.ops && result.ops[0];
  } catch (error) {
    throw "该邮箱已经注册";
  }
};

// 登录
exports.login = async (data) => {
  try {
    const col = await usersCollection();

    return col.find(data).toArray();
  } catch (error) {
    throw "错误的邮箱或密码";
  }
};

exports.findOne = async (_id) => {
  try {
    const col = await usersCollection();
    return col.find(ObjectId(_id)).toArray();
  } catch (error) {
    throw "查询指定用户出错";
  }
};

exports.likeAndDislike = async (change) => {
  try {
    const col = await usersCollection();
    const { comment_id, user_id, type } = change;
    const originUser = await col.find({ _id: ObjectId(user_id) }).toArray();
    let list;
    let result;
    switch (type) {
      case "like":
        list = [...originUser[0].likes];
        list.push(comment_id);
        result = await col.updateOne(
          { _id: ObjectId(user_id) },
          { $set: { likes: list } }
        );
        return result.value;

      case "dislike":
        list = [...originUser[0].disLikes];
        list.push(comment_id);
        result = await col.updateOne(
          { _id: ObjectId(user_id) },
          { $set: { disLikes: list } }
        );
        return result.value;

      case "cancelLike":
        list = [...originUser[0].likes];
        list = list.filter((_id) => _id != comment_id);
        result = await col.updateOne(
          { _id: ObjectId(user_id) },
          { $set: { likes: list } }
        );
        return result.value;

      case "cancelDislike":
        list = [...originUser[0].disLikes];
        list = list.filter((_id) => _id != comment_id);
        result = await col.updateOne(
          { _id: ObjectId(user_id) },
          { $set: { disLikes: list } }
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
