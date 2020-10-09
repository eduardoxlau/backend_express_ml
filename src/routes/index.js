import express from "express";
import Api from "./../api";

const router = express.Router();
const api = new Api();

router.get("/items", async ({ query }, res) => {
  const { search } = query;
  const items = await api.items(search);
  res.status(200).json(items);
});

router.get("/items/:id", async ({ params }, res) => {
  const { id } = params;
  const item = await api.item(id);
  res.status(200).json(item);
});

export default router;
