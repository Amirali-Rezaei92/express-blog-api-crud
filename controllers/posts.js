import { posts } from "../data/posts.js";

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}


export function index(req, res) {
    let results = posts;

    if (req.query.category) {
        results = results.filter(p => p.category === req.query.category);
    }

    if (req.query.tag) {
        results = results.filter(p => p.tags.includes(req.query.tag));
    }

    res.status(200).json(results);
}

export function show(req, res) {
    const id = req.params.id;
    const post = posts.find(p => p.id == id);

    if (!post) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    res.status(200).json(post);
}
export function showBySlug(req, res) {
    const { slug } = req.params;
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    res.status(200).json(post);
}



export function update(req, res) {
    const { id } = req.params;
    const realId = Number(id);

    if (isNaN(realId) || realId <= 0) {
        return res.status(400).json({
            error: 'ID non valido',
            results: null
        });
    }

    const postIndex = posts.findIndex(post => post.id === realId);

    if (postIndex === -1) {
        return res.status(404).json({
            error: 'Post non trovato',
            results: null
        });
    }

    const { title, content, image, tags } = req.body || {};

    if (!title || title.trim() === '') {
        return res.status(400).json({
            error: 'Il campo "title" è obbligatorio',
            results: null
        });
    }

    if (!content || content.trim() === '') {
        return res.status(400).json({
            error: 'Il campo "content" è obbligatorio',
            results: null
        });
    }

    if (!Array.isArray(tags)) {
        return res.status(400).json({
            error: 'Il campo "tags" deve essere un array',
            results: null
        });
    }

    const updatedPost = {
        ...posts[postIndex],
        title,
        content,
        image,
        tags
    };

    posts[postIndex] = updatedPost;

    res.json({
        message: 'Post aggiornato con successo',
        results: updatedPost
    });
}

export function destroy(req, res) {
    const id = req.params.id;
    const index = posts.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    posts.splice(index, 1);

    console.log("Lista aggiornata:", posts);

    res.status(200).json({ message: `Post ${id} eliminato` });
}

export function create(req, res) {
    const { title, content, image, tags, category } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title e content obbligatori" });
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        image,
        tags,
        category,
        slug: slugify(title)
    };

    posts.push(newPost);

    res.status(201).json({
        message: "Post creato con successo",
        results: newPost
    });
}

