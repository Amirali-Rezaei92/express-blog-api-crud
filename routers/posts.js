import express from "express";
import { index, show, update, destroy, create,showBySlug } from "../controllers/posts.js";

const router = express.Router();
router.get("/slug/:slug", showBySlug);
router.get("/", index);
router.get("/:id", show);
router.put("/:id", update);
router.delete("/:id", destroy);
router.post("/", create);



export default router;
