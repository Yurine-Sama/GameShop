const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.post("/api/register", (req, res) => {
  res.json({ status: "ok" });
  console.log(req.body);
});

app.listen(3001, () => {
  console.log("Server started on 3001");
});
