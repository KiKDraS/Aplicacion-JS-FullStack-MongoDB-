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
        const {title, author, genero, imageDefault} = req.body;
        //Seteo de imagen por defecto
        let imagePath = '';
        if(req.body.image == undefined){
            imagePath = `/uploads/${req.file.filename}`;
        }else{
            imagePath = imageDefault;
        }
        const newBook = new Book({title, author, genero, imagePath});
        await newBook.save();
        res.json({mensaje: 'Libro guardado'})
    })

    //PUT
    router.put('/:id', async (req, res) =>{
        const {title, author, genero, created_at, thumbnail} = req.body;
        //Seteo de imagen por defecto
        let imagePath;
        if(req.file.filename == undefined){
            imagePath = thumbnail;
        }else{
            imagePath = `/uploads/${req.file.filename}`;
        }  
        await Book.findByIdAndUpdate(req.params.id, {$set: {title, author, genero, imagePath, created_at}}, {new: true});
        res.json({mensaje: 'Libro actualizado'})
    })


    //DELETE
    router.delete('/:id', async(req, res)=>{
        const book = await Book.findByIdAndDelete(req.params.id);
        unlink(path.resolve('./backend/public' + book.imagePath));
        res.json({mensaje: 'Libro eliminado'});
    })

module.exports = router;