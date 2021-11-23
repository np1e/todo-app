const express = require('express'),
    router = express.Router(),
    Todo = require('../models/todo');

router.post('/', function(req, res) {
    console.log(req.body);
    console.log(req.get('Content-Type'));
    if (req.body !== undefined) {
        let body = req.body;
        Todo.create(body.title, body.description, body.date ?? new Date(), (err, apiResponse) => {
            console.log(apiResponse);
            res.redirect('.');
        });
    } else {
        res.sendStatus(400);
    }
})

router.post('/:id/delete', function(req, res) {
    const id = new Number(req.params.id);
    console.log(id);
    if(isNaN(id)) {
       res.status(400).send("ID must be a number"); 
    } else {
        Todo.delete(id, function(err, apiResponse) {
            console.log(apiResponse);
            console.log(`Deleted todo ${id}`);
            res.redirect('/todos');
        });
    }
});

router.post('/:id/finish', function(req, res) {
    const id = req.params.id;
    Todo.finish(req.params.id, function(err, apiResponse) {
        console.log(`Finished todo ${id}`);
        res.redirect('/todos');
    });
});

router.get('/', function(req, res) {
    Todo.fetchAll(function(error, todos) {
        console.log(todos);
        res.render('index', { todos: todos});
    })
})

router.get('/:id', function(req, res) {
    Todo.get(id, function (error, todo) {
        res.render('todos/todo', { todo: todo});
    })
})

module.exports = router;