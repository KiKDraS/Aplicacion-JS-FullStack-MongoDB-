import UI from '../UI'
const ui = new UI();

class Peticiones{
    //POST
    post(){
        //Declaración de namespace (reemplaza variable global)
        const image = {
            image: []
        }

        $('#formulario').on('change', '#image', function(){
            image.image = $(this)[0].files[0];
        })

        $('#formulario').on('click', '#send', function(e){
            e.preventDefault();
            
            const title = $('#title').val();
            const author = $('#author').val();
            const genero = $('#genero').val();

            const book = new FormData();
            book.append('title', title);
            book.append('author', author);
            book.append('genero', genero);
            book.append('image', image.image);
            book.append('imageDefault', '/img/unnamed.png');

            ui.addANewBook(book);
            ui.renderMessage('Libro agregado', 'success', 2000);

            image.image = [];
        })
    }
    //PUT
    put(){
        //Declaración de namespace (reemplaza variables globales)
        const image = {
            image: []
        }
        const id = {
            id: '',
            modal: ''
        }

        //Delegación de función click para tomar el atributo del botón #editButton
        $('#books-cards').on('click', '#editButton', function(){
            id.id = $(this).attr('_id');  
            id.modal = `#editModal-${id.id}`;
        })

        //Delegación de función change combinando el id obtenido del botón #editButton para el armado del selector
        $('#books-cards').on('change', id.modal+' #edit-image', function(){
            image.image = $(this)[0].files[0];
            console.log(image.image)
        })        

        $('#books-cards').on('click', id.modal+' #edit', function(e){
            e.preventDefault();            
            
            const bookId = $(this).attr('_id');
            const title = $(id.modal+' #edit-title').val();
            const author = $(id.modal+' #edit-author').val();
            const genero = $(id.modal+' #edit-genero').val();
            const thumbnail = $(id.modal+' #thumbnail').attr('src')

            const book = new FormData();
            book.append('title', title);
            book.append('author', author);
            book.append('genero', genero);
            book.append('image', image.image);
            book.append('thumbnail', thumbnail);
            book.append('created_at', Date.now());

            ui.editBook(bookId, book);
            ui.renderMessage('Libro editado', 'success', 2000);

            //Limpieza de los namespace
            image.image = [];
            id.id = '';
            id.modal = '';
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