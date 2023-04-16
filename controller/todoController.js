const Todos = require('../models/Todos');

exports.getData = async (req, res) => {
    try {
        const getTodos = await Todos.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            message: 'success get data todos',
            data: getTodos
        })
    } catch (error) {
        res.send(400, error);
    }
}

exports.postTodo = async (req, res) => {
    try {
        const newTodo = new Todos({
            title: req.body.title,
            content: req.body.content
        });

        const error = newTodo.validateSync();

        if (error) {
            return res.status(400).json({
                message: error.message
            });
        }

        const result = await newTodo.save();

        res.status(200).json({
            message: 'success create new todo',
            data: result
        })
    } catch (error) {
        res.send(400, error);
    }
}

exports.getDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const getTodo = await Todos.findOne({ _id: id })

        res.status(200).json({
            message: 'success get data ' + getTodo.title,
            data: getTodo
        })
    } catch (error) {
        res.send(400, error);
    }
}


exports.updateTodo = async (req, res) => {
    try {

        await Todos.updateOne({ _id: req.params.id }, {
            title: req.body.title,
            content: req.body.content
        });

        const data = await Todos.findOne({ _id: req.params.id });

        res.status(200).json({
            message: 'success update data ' + data.title,
            data: data
        })
    } catch (error) {
        res.send(400, error);
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const id = req.params.id;

        await Todos.deleteOne({ _id: id });
        res.status(200).json({
            message: 'success delete data'
        });
    } catch (error) {
        res.send(400, error);
    }

}