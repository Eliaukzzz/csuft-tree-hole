const express = require("express");
const expressJwt = require("express-jwt");
const routes = require("./routes");
const app = express();
const port = 5000;

app.use(express.json());
app.use(
  expressJwt({ secret: "kite1874", algorithms: ["HS256"] }).unless({
    path: ["/user/login", "/user/register"],
  })
);
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ err: "需要携带token" });
  }
});
routes(app);

app.get("/", (req, res) => {
  res.send({ msg: "林大树洞后端api" });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
