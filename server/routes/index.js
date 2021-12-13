const express = require('express'),
    router = express.Router(),
    todoRouter = require('./todos');

router.use('/todos', todoRouter);

// root endpoint
router.get('/', function(req, res) {
    res.redirect('/todos');
    /* Todo.fetchAll(function(err, todos) {
        console.log(todos);
        let amountUnfinished = todos.filter(todo => !Todo.isFinished(todo.id)).length;
        res.render('index', { todos: todos, amountUnfinished: amountUnfinished });
    }) */
})

module.exports = router;