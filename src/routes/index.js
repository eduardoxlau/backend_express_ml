import express from "express";
import Api from "./../api";

const router = express.Router();
const api = new Api();

router.get("/items", async ({ query }, res) => {
  const { q } = query;
  const items = await api.items(q);
  res.status(200).json(items);
});

router.get("/items/:id", async ({ params }, res) => {
  const { id } = params;
  try {
    const item = await api.item(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
