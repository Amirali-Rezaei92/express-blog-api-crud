import express from "express";
import { index, show, update, destroy, create, showBySlug } from "../controllers/posts.js";
import { findPostById } from "../middlewares/findPostById.js";   

const router = express.Router();

router.get("/slug/:slug", showBySlug);
router.get("/", index);
router.get("/:id", findPostById, show);
router.put("/:id", findPostById, update);
router.delete("/:id", findPostById, destroy);

router.post("/", create);

export default router;
