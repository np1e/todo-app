const express = require('express'),
    router = express.Router(),
    Todo = require('../models/todo');

router.post('/', function(req, res) {
    console.log(req.body);
    console.log(req.get('Content-Type'));
    if (req.body !== undefined) {
        let body = req.body;
        Todo.create(body.title, body.description, body.date ?? new Date(), (item, error) => {
            if (!error) {
                console.log(item);
                res.status(201).send(item);
            } else {
                res.status(500);
            }
        });
    } else {
        res.sendStatus(400);
    }
})

router.delete('/:id', function(req, res) {
    console.log(req.params.id);
    Todo.delete(req.params.id, function(err, apiResponse) {
        console.log(apiResponse);
        console.log(`Deleted todo ${req.params.id}`);
        res.status(200).send();
    });
});

router.post('/:id/finish', function(req, res) {
    const id = req.params.id;
    Todo.finish(req.params.id, function(err, apiResponse) {
        res.status(200);
    });
});

router.get('/', function(req, res) {
    Todo.fetchAll(function(error, todos) {
        res.send(todos);
    })
})

router.get('/:id', function(req, res) {
    Todo.get(id, function (error, todo) {
        res.send(todo);
    })
})

module.exports = router;