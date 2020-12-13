import BookService from './services/BookService';
const bookService = new BookService;
import BooksCards from './components/BooksCards';
const booksCards = new BooksCards;

class UI {
    async addANewBook(book){
        await bookService.postBook(book);
        this.clearBookForm();
        booksCards.renderBooks();
    }

    clearBookForm(){
        document.querySelector('#book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#formulario');

        container.insertBefore(div, bookForm);
        setTimeout(()=>{
            document.querySelector('.message').remove();
        }, secondsToRemove)
    }

    async editBook(bookId, book){
        await bookService.putBook(bookId,book);
        booksCards.renderBooks();
    }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        booksCards.renderBooks();
    }

}

export default UI;
