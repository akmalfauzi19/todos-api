var express = require('express');
const { getData, getDetail, postTodo, updateTodo, deleteTodo } = require('../controller/todoController')
var router = express.Router();

router.get('/', getData);
router.get('/todos/:id', getDetail);
router.post('/todos/create', postTodo);
router.patch('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;
