import BookService from '../services/BookService';
const bookService = new BookService;
import {format} from 'timeago.js';

class BooksCards {
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
                                    <p class="card-text">Categoría: ${book.genero}</p>
                                    <div class="row">
                                        <button type="button" class="btn btn-primary mx-2" data-toggle="modal" data-target="#editModal-${book._id}" _id="${book._id}" id="editButton">Editar</button>
                                        <button type="submit" class="btn btn-danger delete" _id="${book._id}" id="delete">Eliminar</button>
                                    </div>
                                    <div class="modal fade" id="editModal-${book._id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                                            <div class="col-md-4">
                                                                <img src="http://localhost:3000${book.imagePath}" class="img-fluid img-thumbnail w-75 _${book._id}" id="thumbnail"/>
                                                            </div>
                                                            <div class="custom-file align-middle">
                                                                <label for="image" class="custom-file-label">Subir imagen</label>
                                                                <input type="file" id="edit-image" class="custom-file-input">
                                                                <div class="modal-footer">
                                                            </div>
                                                        </div>
                                                    </div>
                                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                        <button type="submit" class="btn btn-primary" data-dismiss="modal" form="edit-book-form" id="edit" _id="${book._id}">Guardar</button>
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
}

export default BooksCards;