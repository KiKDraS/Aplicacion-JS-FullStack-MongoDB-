const {Router, response} = require('express');//Middleware de rutas API
const router = Router();
const Book = require('../models/Book');
const {unlink} = require('fs-extra');
const path = require('path');

//Creación de rutas de la API

    //GET
    router.get('/', async (req, res) => {
        const books = await Book.find();
        res.json(books);
    }); 

    //POST
    router.post('/', async (req, res) =>{ 
        const {title, author, genero} = req.body;
        const imagePath = `/uploads/${req.file.filename}` || '/uploads/unnamed.jpg' ;
        const newBook = new Book({title, author, genero, imagePath});
        await newBook.save();
        res.json({mensaje: 'Libro guardado'})
    })

    //PUT
    router.put('/:id', async (req, res) =>{
        const {title, author, genero} = req.body;
        const imagePath = `/uploads/${req.file.filename}`;
        await Book.findByIdAndUpdate(req.params.id, {$set: {title, author, genero, imagePath}}, {new: true});
        res.json({mensaje: 'Libro actualizado'})
    })


    //DELETE
    router.delete('/:id', async(req, res)=>{
        const book = await Book.findByIdAndDelete(req.params.id);
        unlink(path.resolve('./backend/public' + book.imagePath));
        res.json({mensaje: 'Libro eliminado'});
    })

module.exports = router;
