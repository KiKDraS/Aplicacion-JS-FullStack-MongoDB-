const {Schema, model} = require('mongoose');

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    genero: {type: String, required: true}, 
    imagePath: {type: String, default: '/uploads/unnamed.jpg'},
    created_at: {type: Date, default: Date.now}
}); 

module.exports = model('Book', BookSchema);