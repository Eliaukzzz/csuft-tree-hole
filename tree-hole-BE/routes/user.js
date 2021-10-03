const express = require("express");
var route = express.Router();

const userModel = require("../models/user");
// 获取用户列表
route.get("/", async (req, res) => {
  try {
    const posts = await userModel.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(404).send();
  }
});
// 注册
route.post("/register", async (req, res) => {
  try {
    const userInfo = {
      ...req.body,
      createTime: Date.parse(new Date()),
      likes: [],
      disLikes: [],
      publishComments: [],
      publishReplies: [],
    };
    const newUser = await userModel.register(userInfo);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
// 登录
route.post("/login", async (req, res) => {
  try {
    const loginInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    const UserInfo = await userModel.login(loginInfo);
    if (UserInfo[0]) {
      const {
        _id,
        nickname,
        gender,
        email,
        likes,
        disLikes,
        publishComments,
        publishReplies,
      } = UserInfo[0];
      const loginUser = {
        _id,
        nickname,
        gender,
        email,
        likes,
        disLikes,
        publishComments,
        publishReplies,
      };
      res.status(200).json(loginUser);
    } else {
      throw { err: "该邮箱并未注册或密码错误" };
    }
  } catch (error) {
    console.error(error);
    res.status(404).send(error);
  }
});

// route.put("/:id", async (req, res) => {
//   try {
//     const updatedPost = await postModel.update(req.params.id, req.body);
//     res.json(updatedPost);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send();
//   }
// });

// route.delete("/:id", async (req, res) => {
//   try {
//     await postModel.delete(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send();
//   }
// });

// route.delete("/:id/comment", async (req, res) => {
//   try {
//     await postModel.deleteCommentByUser(req.params.id, req.body.user);
//     res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send();
//   }
// });

module.exports = route;
