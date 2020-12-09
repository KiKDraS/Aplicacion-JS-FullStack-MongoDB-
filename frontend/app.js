import './styles/app.css';
import './styles/bootstrap.min.css';
import UI from './UI'
const ui = new UI();

const formulario = document.querySelector('#book-form');

const mostrar = document.addEventListener('DOMContentLoaded', ()=>{
    ui.renderBooks(); 
})

const agregar = formulario.addEventListener('submit', e =>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genero = document.querySelector('#genero').value;
    const image = document.querySelector('#image').files;

    const book = new FormData();
    book.append('title', title);
    book.append('author', author);
    book.append('genero', genero);
    book.append('image', image[0]);

    ui.addANewBook(book);
    ui.renderMessage('Libro agregado', 'success', 2000);
})

/* const editar = document.querySelector('#books-cards').addEventListener('click', e=>{
    if(e.target.classList.contains('edit')){
        e.preventDefault();
        
        const bookId = e.target.getAttribute('_id');
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const genero = document.querySelector('#genero').value;
        const image = document.querySelector('#image').files;

        const book = new FormData();
        book.append('title', title);
        book.append('author', author);
        book.append('genero', genero);
        book.append('image', image[0]);

        document.addEventListener('DOMContentLoaded', ()=>{
            ui.renderEdit(book); 
        })
        ui.editBook(bookId, book);
        ui.renderMessage('Libro editado', 'success', 2000);
    }
}) */

const eliminar = document.querySelector('#books-cards').addEventListener('click', e=>{
    if(e.target.classList.contains('delete')){
        e.preventDefault();
        const bookId = e.target.getAttribute('_id');

        ui.deleteBook(bookId);
        ui.renderMessage('Libro eliminado', 'danger', 2000);
    }
})