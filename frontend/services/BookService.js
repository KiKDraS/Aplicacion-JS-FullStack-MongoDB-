class BookService {
    constructor(){
        this.URI = 'http://localhost:3000/api/books';
    }

    async getBooks(){
       const response = await fetch(this.URI)
       const books = await response.json()
       return books
    }   

    async postBook(book){
       const response = await fetch(this.URI, {
            method: 'POST',
            body: book
        })
        const data = await response.json()
    }

    async putBook(bookId, book){
        const response = await fetch(`${this.URI}/${bookId}`,{
            method: 'PUT',
            body: book
        })
        const data = await response.json()
    }

    async deleteBook(bookId){   
        const response = await fetch(`${this.URI}/${bookId}`,{
            headers:{
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
        })
        const data = await response.json()
    }
}

module.exports = BookService;