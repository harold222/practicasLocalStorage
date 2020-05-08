//-----------variables-----------
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
//lista de cursos seleccioando, en el tbody para ingresar los cursos
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');

//-----------eventos-----------

ControlDeLosEventos();

function ControlDeLosEventos(){
    //delegation, se ejecuta al pular boton agregar carro
    cursos.addEventListener('click', comprarCursos);    
    //cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //evento para eliminar todos los cursos o vaciar carrito
    vaciarCarrito.addEventListener('click', vaciarCarro);
    //al cargar el documentos, se debe mostrar el clocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//-----------funciones-----------

//Funcion que añade cursos al carrito
function comprarCursos(e) {
    e.preventDefault();
    
    //busco la clase especifica para centrarme unicamente en el boton
    //si no lo hago el click se habilitara en toda la card
    if(e.target.classList.contains('agregar-carrito')){
        //llego al card, para tomar todos los valores o atriibutos
        //que componen ese curso seleccionado
        const curso = e.target.parentElement.parentElement;
        //envio el curso seleccionado
        leerDatosCursos(curso);
    }
}

//lee los datos del curso seleccionado
function leerDatosCursos(curso) {
    
    const infoCurso = { //descompongo cada elemento seleccionandolo
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);

    console.log(infoCurso);
}

//muestro el curso seleccionado pero ya en el carrito de compras
function insertarCarrito(infoCurso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${infoCurso.imagen}" width=100>
        </td>
        <td>
            ${infoCurso.titulo}
        </td>
        <td>
            ${infoCurso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCurso.id}">
            X</a>
        </td>
    `;

    listaCursos.appendChild(row);

    guardarLocalStorage(infoCurso);

}

//elimina el curso agregado al carrito del dom
function eliminarCurso(e) {
    e.preventDefault();

    let curso, cursoId;
    //delego para asignar solo click si se da en la x por eso la clase
    //de otra manera se tomara todo
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();//voy hasya el tr
        //para eliminar esa fila osea el curso completo
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarLocalStorage(cursoId);

    console.log('curso eliminado');
}

//esya funcion eliminara todos los cursos existentes en el carrito en el DOM
function vaciarCarro() {
    //mientras siga habiendo elementos se eliminaran
    while(listaCursos.firstChild){
        //elimino uno a uno
        listaCursos.removeChild(listaCursos.firstChild);
    }

    vaciarLocalStorage();

    return false;
}

//almacena los cursos del carito al localStorage
function guardarLocalStorage(infoCurso) {
    let cursos = obtenerLocalStorage();
    //el curso se agrega al arrehlo obtenido por la funcion
    cursos.push(infoCurso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function obtenerLocalStorage() {
    let cursos;

    //compruebo si hay elementos ya guardados
    if(localStorage.getItem('cursos') === null){
        cursos = [];
    }else{ //si hay ya elemenyos guardados
        cursos = JSON.parse(localStorage.getItem('cursos'));
        //lo que viene como string se convertira como eb array
    }

    return cursos;
}

//muestra los cursos ya almacenados en localstorage en el carrito
//al ingresasr a la pagina o recarga
function leerLocalStorage() {
    let cursos = obtenerLocalStorage();
    
    cursos.forEach(function(infoCurso){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${infoCurso.imagen}" width=100>
            </td>
            <td>
                ${infoCurso.titulo}
            </td>
            <td>
                ${infoCurso.precio}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${infoCurso.id}">
                X</a>
            </td>
        `;

        listaCursos.appendChild(row);
    });
}

//elimino el curso del localStorage mediante el id de ese curso
function eliminarLocalStorage(cursoId) {
    let cursos = obtenerLocalStorage();

    //comparo los id, del seleccionado con el del localstorage
    cursos.forEach(function(id, index) {
        if(id.id === cursoId){ //elimino ese curso
            cursos.splice(index, 1);
        }
    });    
    //agrego el nuevo arreglo
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

function vaciarLocalStorage() {
    localStorage.clear(); //limpio todo
}


