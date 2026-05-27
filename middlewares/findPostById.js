import { posts } from "../data/posts.js";

export function findPostById(req, res, next) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return next(new Error("ID non valido"));
    }

    const post = posts.find(p => p.id === id && !p.deleted);

    if (!post) {
        return next(new Error("Post non trovato"));
    }

    req.post = post;
    next();
}
