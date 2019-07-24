const express = require('express');
const db = require('./data/hubs-model.js')
//import express 

const server = express();

server.use(express.json());

server.get('/', (request, response) => {
    response.send("hello world from express!!");
});

server.get('/now', (req, res) => {
    const now = new Date().toISOString();
    res.send(now);
})

server.get('/hubs', (req,res) => {
    db.find()
    .then(hubs => {
        res.status(200).json(hubs);
    })
    .catch(err => {
        res.status(500).json({success:false, err});
    });
});

//GET /hubs
//POST /hubs

server.post('/hubs', (req, res) => {``
    // POST /hubs {name: somename}
    const hubInfo = req.body;
    console.log(hubInfo);

    db.add(hubInfo)
    .then(hub => {
        res.status(201).json({success: true, hub});
    })
    .catch(err => {
        res.status(500).json({success: false, err});
    });
});

server.put('/hubs/:id', (req, res)=> {
    const {id} = req.params;
    const hubInfo = req.body;
    console.log(hubInfo);

    db.update(id, hubInfo)
    .then(updated => {
        if(updated) {
            res.status(200).json({success:true, updated});
        } else {
            res.status(404).json({success:false, message: "I cannot find the hub you are looking for"})
        }
    })
    .catch(err => {
        res.status(500).json({success: false, err})
    });
});

server.delete('/hubs/:id', (req, res) => {
    //DELETE /hubs/<id>
    const {id} = req.params;

    db.remove(id)
    .then(deleted => {
        if(deleted) {
            res.status(204).end();
        } else{
            res.status(404).json({success:false, message: 'I cannot find the hub you are looking for'})
        }
    })
    .catch(err => {
        res.status(500).json({success:false, err});
    });
})

server.listen(4000, () => {
    console.log('server listening on port 4000');
})
