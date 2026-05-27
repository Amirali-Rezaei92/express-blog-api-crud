import express from "express";
import postsRouter from "./routers/posts.js";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
