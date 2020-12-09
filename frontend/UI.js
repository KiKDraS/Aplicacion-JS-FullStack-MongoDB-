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
                <div class="card m-2>
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
                                        <button type="button" class="btn btn-primary edit mx-2" data-toggle="modal" data-target="#exampleModal" _id="${book._id}">Editar</button>
                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                    <div class="modal-body">
                                                    ...
                                                    </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary">Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        <a href="#" class="btn btn-danger delete" _id="${book._id}">Eliminar</a>
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
        console.log(book)
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