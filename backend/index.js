if(process.env.NODE_ENV === 'development'){
    require('dotenv').config(); //Carga de variables de entorno
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//Creación del servidor
    const app = express();

//Inicializaciones
    app.set('port', process.env.PORT || 3000); //Definición de la variable port del servidor
    require('./database'); //Conexión a la BD

//Middlewares
    app.use(morgan('dev'));//Cada ruta/petición al servidor pasa por el módulo morgan

    const storage = multer.diskStorage({ //Configuración del almacenamiento de la imagen subida
        destination: path.join(__dirname, 'public/uploads'),
        filename(req, file, cb){
            cb(null, new Date().getTime() + path.extname(file.originalname)); //Creación del nombre de la imagen
        },
    })
    app.use(multer({storage}).single('image')); //Escucha del parámetro que trae los datos de la imagen || .single() impide la subida múltiple

    app.use(express.urlencoded({extended: false})); //Interpreta los datos del formulario como json

    app.use(express.json()); //Interpreta las peticiones AJAX

    app.use(cors());
//Routes
    app.use('/api/books',require('./routes/books')); //Manejo de rutas API

//Static files
    app.use(express.static(path.join(__dirname, 'public'))); //Ruteo a la carpeta public para renderizarla
    //Bootstrap
    app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
    app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
    app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

//Ejecución del servidor
    app.listen(app.get('port')/*Inicialización de la variable*/, ()=>{
        console.log('Server en puerto', app.get('port'))
    })
