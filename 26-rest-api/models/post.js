const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    creator: {
        type: Object,
        require: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);