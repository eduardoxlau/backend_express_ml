import express from "express";
import routes from "./routes";

const app = express();

app.use("/api", routes);

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(3000, () => console.log("works"));
