const posts = require("../data/posts");

function index(req, res) {
    let results = posts;

    if (req.query.category) {
        results = results.filter(p => p.category === req.query.category);
    }

    if (req.query.tag) {
        results = results.filter(p => p.tags.includes(req.query.tag));
    }

    res.status(200).json(results);
}

function show(req, res) {
    const id = req.params.id;
    const post = posts.find(p => p.id == id);

    if (!post) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    res.status(200).json(post);
}

function update(req, res) {
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

function destroy(req, res) {
    const id = req.params.id;
    const index = posts.findIndex(p => p.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Post non trovato" });
    }

    posts.splice(index, 1);

    console.log("Lista aggiornata:", posts);

    res.status(200).json({ message: `Post ${id} eliminato` });
}

function create(req, res) {
    console.log("Dati ricevuti:", req.body);

    res.status(201).json({
        messaggio: "Stai provando a creare dei dati",
        dati: req.body
    });
}

module.exports = { index, show, destroy, update, create };
