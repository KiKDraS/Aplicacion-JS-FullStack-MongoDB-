import 'bootstrap';
import './styles/app.css';
import './styles/bootstrap.min.css';
require('webpack-icons-installer'); 

//Renderizado de elementos
import Form from './components/Form';
const formulario = new Form;
import Buscador from './components/Buscador';
const buscador = new Buscador;

//Peticiones
import BooksCards from './components/BooksCards';
const booksCards = new BooksCards;
import Peticiones from './services/Peticiones';
const petiociones = new Peticiones;

$(function(){
    //Formulario
    formulario.renderForm();
    //Buscador
    buscador.render();
    //GET
    booksCards.renderBooks(); 
    //POST
    petiociones.post();
    //PUT
    petiociones.put();
    //DELETE
    petiociones.delete();
})

