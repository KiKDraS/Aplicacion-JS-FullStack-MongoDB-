class Buscador{
    render(){
        const buscador = document.querySelector('#buscador');
        buscador.innerHTML= '';
        const div = document.createElement('div');
        div.className = ''
        div.innerHTML = `
                        <form name="buscador">
                            <h4>Busca tu libro</h4>
                            <div class="form-group">
                                <input type="text" name="q" placeholder="Título del libro...">
                                    <button type="submit" form="buscador">
                                        <i class="glyphicon glyphicon-search"></i>
                                    </button>
                                </input>
                            </div>
                        </form>
                        <div class="form-group">
                            <div id="categoria">
                                <label for="juveniles">Juveniles: </label>
                                <input type="radio" name="categoria" value="juveniles">
                                <label for="programacion">Programación: </label>
                                <input type="radio" name="categoria" value="programacion">
                            </div>
                        </div> 
                        `
        buscador.appendChild(div);                
    }
}

export default Buscador;