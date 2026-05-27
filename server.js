import express from "express";
import postsRouter from "./routers/posts.js";

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.use((req, res, next) => {
    res.status(404).json({
        error: "Endpoint non trovato",
        path: req.originalUrl
    });
});
app.use((err, req, res, next) => {
    console.error("🔥 ERRORE:", err);

    res.status(err.status || 500).json({
        error: err.message || "Errore interno del server"
    });
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
