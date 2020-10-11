import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const port = process.env.PORT ? process.env.PORT : 4000;

app.use(cors());

app.use("/api", routes);

app.get("/", function (req, res) {
  res.send("hello world");
});

app.listen(port, () => console.log("works in port ", port));
