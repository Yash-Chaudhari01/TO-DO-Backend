const express = require('express');
const router = express.Router();
const { autherization } = require('../middlewares/autherization');

const {getTodos,createTodo,updateTodo,deleteTodo}= require('../controllers/todoController');

router.get('/gettodo',autherization,getTodos);

router.post('/create', autherization, createTodo);


router.put('/update/:id', autherization, updateTodo)

router.delete('/delete/:id', autherization, deleteTodo);

module.exports = router;