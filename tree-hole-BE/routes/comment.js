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
      poster_id: _id,
      beLiked: [],
      beDisLiked: [],
      replies: [],
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
    const commentList = await Promise.all(
      list.map(async (comment) => {
        const posterInfo = await userModel.findOne({
          _id: ObjectId(comment.poster_id),
        });
        return {
          ...comment,
          posterInfo: posterInfo[0],
        };
      })
    );
    res.status(200).json(commentList);
  } catch (error) {}
});

module.exports = route;
