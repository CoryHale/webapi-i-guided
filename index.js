const express = require('express');
const db = require('./data/hubs-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => { // req === request, res === response
    res.send('hello world from express!!');
}); 

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
})

server.get('/hubs', (req, res) => {
    db.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            res.status(500).json({ success: false, err })
        })
});

server.get('/hubs/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
        .then(hub => {
            res.status(200).json(hub);
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.post('/hubs', (req, res) => {
    const hubInfo = req.body;

    db.add(hubInfo)
        .then(hub => {
            res.status(201).json({ success: true, hub });
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.delete('/hubs/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).end();
            } else {
                res.status(404).json({ success: false, message: 'The hub you are looking for does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.put('/hubs/:id', (req, res) => {
    const {id} = req.params;
    const hubInfo = req.body;

    db.update(id, hubInfo)
        .then(updated => {
            if (updated) {
                res.status(200).json({ success: true, updated });
            } else {
                res.status(404).json({ success: false, message: 'The hub you are looking for does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json({ success: false, err });
        });
});

server.listen(4000, () => {
    console.log('server listening on port 4000');
});
