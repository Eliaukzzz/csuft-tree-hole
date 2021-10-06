const express = require("express");
const ObjectId = require("mongodb").ObjectId;

var route = express.Router();
const userModel = require("../models/user");
const commentModel = require("../models/comment");
// 发布新留言
route.post("/post", async (req, res) => {
  try {
    const _id = req.user._id;
    const comment = {
      ...req.body,
      createTime: Date.parse(new Date()),
      poster_id: ObjectId(_id),
      beLiked: [],
      beDisLiked: [],
      replies: [],
      hidden: false,
    };
    const newComment = await commentModel.postComment(comment);
    res.status(201).json({ ...newComment });
  } catch (error) {
    console.error(error);
    res.status(500).send({ err: error });
  }
});

// 获取留言列表
route.get("/", async (req, res) => {
  try {
    const list = await commentModel.findComment({
      ...req.query,
    });
    // 用Promise.all取出map结果
    const commentList = await processCommentList(list);
    res.status(200).json(commentList);
  } catch (error) {}
});
// 获取我发布的留言列表
route.get("/my", async (req, res) => {
  try {
    const list = await commentModel.findComment({
      poster_id: req.user._id,
    });
    // 用Promise.all取出map结果
    const commentList = await processCommentList(list);
    res.status(200).json(commentList);
  } catch (error) {}
});
// 获取我喜欢的列表
route.get("/favorite", async (req, res) => {
  try {
    const user = await userModel.findOne(req.user._id);
    const likeList = user[0].likes.reverse();
    let commentList = await Promise.all(
      likeList.map(async (comment_id) => {
        const comment = await commentModel.findComment({
          _id: comment_id,
        });
        return comment[0];
      })
    );
    commentList = await processCommentList(commentList);
    res.status(200).json(commentList);
  } catch (error) {}
});
// 点赞&点踩留言
route.post("/feel", async (req, res) => {
  try {
    await userModel.likeAndDislike({ ...req.body });
    const comment = await commentModel.likeAndDislike({
      ...req.body,
    });
    const posterInfo = await userModel.findOne(comment.poster_id);
    const { _id, nickname, gender, email, likes, disLikes } = posterInfo[0];
    res.status(201).send({
      ...comment,
      posterInfo: { _id, nickname, gender, email, likes, disLikes },
    });
  } catch (error) {}
});
module.exports = route;

const processCommentList = async (commentList) => {
  return await Promise.all(
    commentList.map(async (comment) => {
      const posterInfo = await userModel.findOne(comment.poster_id);
      const { _id, nickname, gender, email, likes, disLikes } = posterInfo[0];
      return {
        ...comment,
        posterInfo: { _id, nickname, gender, email, likes, disLikes },
      };
    })
  );
};
