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
    let results = posts.filter(p => !p.deleted);

    if (req.query.category) {
        results = results.filter(p => p.category === req.query.category);
    }

    if (req.query.tag) {
        results = results.filter(p => p.tags.includes(req.query.tag));
    }

    res.status(200).json(results);
}


export function show(req, res) {
    res.json(req.post);
}



export function showBySlug(req, res) {
    const { slug } = req.params;
    const post = posts.find(p => p.slug === slug && !p.deleted);

    if (!post) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    res.status(200).json(post);
}


export function update(req, res) {
    const { title, content, image, tags } = req.body;

    req.post.title = title;
    req.post.content = content;
    req.post.image = image;
    req.post.tags = tags;

    res.json({
        message: "Post aggiornato con successo",
        results: req.post
    });
}

export function destroy(req, res) {
    req.post.deleted = true;

    res.json({
        message: "Post eliminato",
        results: req.post
    });
}



export function create(req, res) {
    const { title, content, image, tags } = req.body;

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        image,
        tags,
        deleted: false
    };

    posts.push(newPost);

    res.status(201).json({
        message: "Post creato con successo",
        results: newPost
    });
}

