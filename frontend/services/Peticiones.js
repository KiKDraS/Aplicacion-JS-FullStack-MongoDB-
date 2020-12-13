import UI from '../UI'
const ui = new UI();

class Peticiones{
    //POST
    post(){
        //Declaración de namespace (reemplaza variable global)
        const image ={
            image: []
        }

        $('#formulario').on('change', '#image', function(){
            image.image = $(this)[0].files[0];
            console.log(image.image);
        })

        $('#formulario').on('click', '#send', function(e){
            e.preventDefault();
            if(image.image == undefined){
                image.image = 'localhost:8080/styles/img/unnamed.jpg'
            }
            
            const title = $('#title').val();
            const author = $('#author').val();
            const genero = $('#genero').val();

            const book = new FormData();
            book.append('title', title);
            book.append('author', author);
            book.append('genero', genero);
            book.append('image', image.image);

            ui.addANewBook(book);
            ui.renderMessage('Libro agregado', 'success', 2000);
        })
    }
    //PUT
    put(){
        //Declaración de namespace (reemplaza variable global)
        const image ={
            image: []
        }
        $('#books-cards').on('change', '#editModal #edit-image', function(){
            image.image = $(this)[0].files[0];
            console.log(image.image)
        }) 

        $('#books-cards').on('click', '#editModal #edit', function(e){
            e.preventDefault();              

            const bookId = e.target.getAttribute('_id');
            const title = $('#editModal #edit-title').val();
            const author = $('#editModal #edit-author').val();
            const genero = $('#editModal #edit-genero').val();

            const book = new FormData();
            book.append('title', title);
            book.append('author', author);
            book.append('genero', genero);
            book.append('image', image.image);

            ui.editBook(bookId, book);
            ui.renderMessage('Libro editado', 'success', 2000);
        })
    }    
    //DELETE
    delete(){
        $('#books-cards').on('click', '#delete', function(e){
            e.preventDefault();
            const bookId = $(this).attr('_id');

            ui.deleteBook(bookId);
            ui.renderMessage('Libro eliminado', 'danger', 2000);
        })
    }
}

export default Peticiones;