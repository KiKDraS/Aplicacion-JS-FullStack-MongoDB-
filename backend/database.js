const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true, 
    useNewUrlParser: true //Evita que muestre los errores en pantalla
}) //Si la BD no está creada, la conexión la crea
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err))