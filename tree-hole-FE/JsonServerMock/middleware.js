module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/users") {
    if (
      req.body.email === "2421398452@qq.com" &&
      req.body.password === "123456"
    ) {
      return res.status(200).json({
        users: {
          id: 1,
          nickname: "苍术",
          email: "2421398452@qq.com",
          gender: "男",
          password: "123456",
          favorite: [1, 2],
          hate: [3, 4],
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjI0MjEzOTg0NTJAcXEuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYifQ.WOqAshEJnXX7clWA8HU0EAhOHCfVqSL15SbYHGYIycA",
        },
      });
    } else {
      return res.status(400).json({ message: "邮箱或者密码错误" });
    }
  }
  next();
};
