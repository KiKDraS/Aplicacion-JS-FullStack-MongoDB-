import 'bootstrap';
import './styles/app.css';
import './styles/bootstrap.min.css';
import UI from './UI'
const ui = new UI();

//GET
$(function(){
    ui.renderBooks(); 
})

//POST
const formulario = document.querySelector('#book-form');
formulario.addEventListener('submit', e =>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const genero = document.querySelector('#genero').value;
    const image = document.querySelector('#image').files;
    console.log(image)

    const book = new FormData();
    book.append('title', title);
    book.append('author', author);
    book.append('genero', genero);
    book.append('image', image[0]);

    ui.addANewBook(book);
    ui.renderMessage('Libro agregado', 'success', 2000);
})

//PUT
    //$(function(){
        $('#books-cards').on('click', '#editModal #edit', function(e){
            e.preventDefault();          
        
            var image;
            $('#books-cards').off('click', '#editModal #edit-image')    
            $('#books-cards').on('change', '#editModal #edit-image', function(){
                image = $(this).files;
                return image
            })
            
            console.log(image)

            const bookId = e.target.getAttribute('_id');
            console.log(bookId)
            const title = $('#editModal #edit-title').val();
            console.log(title)
            const author = $('#editModal #edit-author').val();
            const genero = $('#editModal #edit-genero').val();

            const book = new FormData();
            book.append('title', title);
            book.append('author', author);
            book.append('genero', genero);
            book.append('image', image);
    
            ui.editBook(bookId, book);
            ui.renderMessage('Libro editado', 'success', 2000);
        })
    //})
//DELETE
document.querySelector('#books-cards').addEventListener('click', e => {
    if(e.target.classList.contains('delete')){
        e.preventDefault();
        const bookId = e.target.getAttribute('_id');

        ui.deleteBook(bookId);
        ui.renderMessage('Libro eliminado', 'danger', 2000);
    }
})