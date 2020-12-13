import 'bootstrap';
import './styles/app.css';
import './styles/bootstrap.min.css';

//Renderizado de elementos
import BooksCards from './components/BooksCards';
const booksCards = new BooksCards;
import Form from './components/Form';
const formulario = new Form;
//Peticiones
import Peticiones from './services/Peticiones';
const petiociones = new Peticiones;

$(function(){
    formulario.renderForm();
    //GET
    booksCards.renderBooks(); 
    //POST
    petiociones.post();
    //PUT
    petiociones.put();
    //DELETE
    petiociones.delete();
})

