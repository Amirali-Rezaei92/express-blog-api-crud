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


module.exports = { index, show, destroy };
