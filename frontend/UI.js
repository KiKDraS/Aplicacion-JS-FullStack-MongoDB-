import BookService from './services/BookService';
const bookService = new BookService;
import {format} from 'timeago.js';

class UI {
    async renderBooks(){
        const books = await bookService.getBooks();
        const booksCardContainer = document.querySelector('#books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className= '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="http://localhost:3000${book.imagePath}" class="img-fluid"/>
                            </div>
                            <div clas="col-md-8">
                                <div class="card-block px-2">
                                    <h4 class="card-title">${book.title}</h4>
                                    <p class="card-text">Autor: ${book.author}</p>
                                    <p class="card-text">Genero: ${book.genero}</p>
                                    <div class="row">
                                        <button type="button" class="btn btn-primary mx-2" data-toggle="modal" data-target="#editModal" >Editar</button>
                                        <a href="#" class="btn btn-danger delete" _id="${book._id}">Eliminar</a>
                                    </div>
                                    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <form action="" id="edit-book-form" class="card card-body" name="edit-book-form">
                                                    <div class="modal-body">
                                                        <div class="form-group">
                                                            <input type="text" class="form-control title" id="edit-title" value="${book.title}">
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control author" id="edit-author" value="${book.author}">
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="text" class="form-control genero" id="edit-genero" value="${book.genero}">
                                                        </div>
                                                        <div class="input-group mb-3">
                                                            <div class="custom-file">
                                                                <label for="image" class="custom-file-label">Sube una imagen</label>
                                                                <input type="file" id="edit-image" class="custom-file-input">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                        <button type="submit" class="btn btn-primary" _id="${book._id}" data-dismiss="modal" form="edit-book-form" id="edit">Guardar</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardContainer.appendChild(div);
        })
    }

    async addANewBook(book){
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBooks();
    }

    clearBookForm(){
        document.querySelector('#book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        container.insertBefore(div, bookForm);
        setTimeout(()=>{
            document.querySelector('.message').remove();
        }, secondsToRemove)
    }

    async editBook(bookId, book){
        console.log(book)
        await bookService.putBook(bookId,book);
        this.renderBooks();
    }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }

}

export default UI;