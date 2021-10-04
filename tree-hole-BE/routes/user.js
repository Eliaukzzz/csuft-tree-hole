const express = require("express");
const jwt = require("jsonwebtoken");
var route = express.Router();

const userModel = require("../models/user");
// 获取当前token用户信息
route.get("/me", async (req, res) => {
  if (!req.user._id) {
    return res.status(401).send({ err: "登录状态已过期，请重新登录" });
  } else {
    try {
      const loginInfo = {
        email: req.user.email,
      };
      const UserInfo = await userModel.login(loginInfo);
      if (UserInfo[0]) {
        const {
          _id,
          nickname,
          gender,
          email,
          password,
          likes,
          disLikes,
          publishComments,
          publishReplies,
        } = UserInfo[0];

        const authToken = req.headers.authorization;
        const loginUser = {
          _id,
          nickname,
          gender,
          email,
          likes,
          disLikes,
          publishComments,
          publishReplies,
          token: authToken,
        };
        res.status(200).json(loginUser);
      } else {
        throw { err: "错误的token格式" };
      }
    } catch (error) {
      console.error(error);
      res.status(404).send(error);
    }
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
    };
    const newUser = await userModel.register(userInfo);
    const { _id, email } = newUser;
    const authToken =
      "Bearer " +
      jwt.sign(
        {
          _id,
          email,
        },
        "kite1874",
        {
          expiresIn: "24h",
          algorithm: "HS256",
        }
      );
    res.status(201).json({ ...newUser, token: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).send({ err: error });
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
        password,
        likes,
        disLikes,
        publishComments,
        publishReplies,
      } = UserInfo[0];

      const authToken =
        "Bearer " +
        jwt.sign(
          {
            _id,
            email,
          },
          "kite1874",
          {
            expiresIn: "24h",
            algorithm: "HS256",
          }
        );
      const loginUser = {
        _id,
        nickname,
        gender,
        email,
        likes,
        disLikes,
        publishComments,
        publishReplies,
        token: authToken,
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

module.exports = route;
