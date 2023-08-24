const app = require("./app");
require("./config/db");
const config = require("./config/config");

app.get("/", (req, res) => {
  res.status(201).json({ message: "This is for Job Board API." });
});

app.use("*", (req, res) => {
  res.status(400).json({ message: "Routes not Found!" });
});

app.listen(config.app.port, () => {
  console.log(
    `Job Board server is running at http://localhost:${config.app.port}`
  );
});
