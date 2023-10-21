const Todo = require('../models/Todo')


exports.getTodos = async (req, res) => {
    
    try {
        console.log("Get All Todos Section");
    
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
    
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const todos = await Todo.find({ user: req.user })
            .skip(startIndex)
            .limit(limit);
    
        const totalItems = await Todo.countDocuments({ user: req.user });
    
        const pagination = {};
    
        if (endIndex < totalItems) {
            pagination.next = {
                page: page + 1,
                limit: limit
            };
        }
    
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            };
        }
    
        res.status(200).json({
            success: true,
            todos,
            pagination
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
    
}

exports.createTodo = async (req, res) => {
    console.log("At create Section");
    const { title, description } = req.body;
    try {
        const todo = await Todo.create({
            title,
            description,
            completed: false,
            user: req.user
        })
        res.status(201).json(
            {
            message: "Todo created Succesfully",
            todo
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}


exports.deleteTodo = async (req, res) => {

    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({
                message: "Todo Is Not Found"
            })
        }

        if (todo.user.toString() !== req.user) {
            return res.status(401).json({
                message: "Not Autherized"
            })
        }

        await todo.deleteOne({_id:id});
        
        res.status(200).json({
            message: "To-do deleted"
        })

    } catch (err) {

        res.status(500).json({
            message: "Internal Server Error"
        })

    }
}


exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, desciption, completed } = req.body;
    try {
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({
                message: "todo is not found"
            })
        }

        if (todo.user.toString() !== req.user) {
            return res.status(401).json({
                message: "Not Autherized"
            })
        }
        todo.title = title;
        todo.description = desciption;
        todo.completed = completed;
        await todo.save();

        return res.status(200).json({
            message: "Todo Updated"
        })

    } catch (err) {

        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}