const express = require('express');
const shortid = require('shortid');

const db = require('../utils/db');
const entities = require('../utils/entities');
const controller = require('../controller/controller');
const { getId } = require('../utils/utils');

const router = express.Router();

router.get('/', (req, res) => {
    const html = `
        <style>
            body {
                font-family: sans-serif;
                max-width: 480px;
                margin: 2rem auto;
            }
            a, a:link, a:visited {
                color: blue;
            }
        </style>
        <h1>DFS Datenbank</h1>
        <p>Unter der Route <a href="/db">/db</a> können alle Daten abgerufen werden</p>
        <p>Für folgende Entitäten existieren separate Routen, die jeweils mit den Befehlen \
        GET, POST, PUT und DELETE bearbeitet werden können:</p>
        <ul>
            ${entities.map(entity => (
                `<li><a href="/${entity}">/${entity}</a></li>`
            )).join('')}
        </ul>
    `;

    res.send(html);
});

router.get('/db', (req, res) => {
    res.json(db.getState());
});

entities.forEach(entity => {
    // GET ALL
    router.get(`/${entity}`, (req, res) => {
        const allResults = db.get(entity).value();
        const { search } = req.query;
        if (search) {
            const searchResults = controller.search(allResults, search);
            res.json(searchResults);
        } else {
            res.json(allResults);
        }
    });

    // GET BY SEARCH
    router.get(`/${entity}`, (req, res) => {

    })

    // GET BY ID
    router.get(`/${entity}/:id`, (req, res) => {
        const id = getId(req.params.id);
        const result = db.get(entity).find({ id }).value();
        res.json(result);
    });

    // GET BY KEY
    router.get(`/${entity}/:key/:value`, (req, res) => {
        const { key, value } = req.params;
        const results = db.get(entity).filter({ [key]: getId(value) }).value();
        res.json(results);
    })

    // POST
    router.post(`/${entity}`, (req, res) => {
        const id = shortid.generate();
        db.get(entity).push({ id, ...req.body }).write();

        const result = db.get(entity).find({ id }).value();
        res.json(result);
    });

    // PUT
    router.put(`/${entity}/:id`, (req, res) => {
        const id = getId(req.params.id);
        const data = req.body;
        db.get(entity)
            .find({ id })
            .assign(data)
            .write();

        const result = db.get(entity).find({ id }).value();
        res.json(result);
    });

    // DELETE
    router.delete(`/${entity}/:id`, (req, res) => {
        const id = getId(req.params.id);
        if (controller.delete[entity]) {
            controller.delete[entity](id);
        } else {
            db.get(entity).remove({ id }).write();
        }
        res.sendStatus(200);
    });
});

module.exports = router;
