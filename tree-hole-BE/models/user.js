const usersCollection = require("../config/mongoDbConnection").getCollection(
  "users"
);
const { ObjectId } = require("mongodb");
// 注册
exports.register = async (post) => {
  try {
    const col = await usersCollection();
    const result = await col.insertOne(post);
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

exports.findAll = async () => {
  try {
    const col = await usersCollection();
    return col.find({}).toArray();
  } catch (error) {
    throw "查询用户列表出错";
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
