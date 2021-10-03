const express = require("express");
const app = express();
const routes = require("./routes");
const port = 5000;

app.use(express.json());

routes(app);

app.get("/", (req, res) => {
  res.send("林大树洞后端api");
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
