const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            text: true
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true,
            text: true,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('todos', todoSchema);