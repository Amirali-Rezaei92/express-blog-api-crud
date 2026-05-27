import express from "express";
import { index, show, update, destroy, create } from "../controllers/posts.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);
router.post("/", create);

export default router;
