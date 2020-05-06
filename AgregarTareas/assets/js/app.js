//permite guardar cierta informacion en el navegador
localStorage.setItem('name','harold');

//session storage
sessionStorage.setItem('age','22');

//la diferencia principal entre estos es que el session se borrara todo
//cuando cierre el navegador mientras que local si limpio la cache

//---eliminar---

localStorage.removeItem('name');
//localStorage.clear(); //limpiar completamente

//-----------------inicio parte logica----------------

const listaTareas = document.querySelector('#lista-tareas');

//events

eventListeners();

function eventListeners() {
    //al enviar el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTarea);

    //borrar tareas
    listaTareas.addEventListener('click', borrarTarea);

    //Cargar desde localStorage cuando se entra a la web
    document.addEventListener('DOMContentLoaded', cargarLocalStorage);
}

//funciones

function agregarTarea(e){
    e.preventDefault();// para que evite lo que tenga en el accion
    console.log('Añadida tarea');

    //leer el formulario
    const tarea = document.querySelector('#tarea').value;//tomo lo ingresado por html

    //boton borrar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //agregandp tareas
    const div = document.createElement('div');
    div.className = "alert alert-primary";
    const li = document.createElement('ol');
    div.appendChild(li);
    li.className = "text-center text-dark";
    
    li.innerHTML = tarea;
    li.appendChild(botonBorrar); //añado el boton a cada tarea
    listaTareas.appendChild(div); //voy formando la lista de las tareas ingresadas

    //añadir a localStorage
    agregarLocalStorage(tarea);
}

function agregarLocalStorage(tarea) {
    let tareas;
    //cada que se agreage una tarea se llamara la funcion para verificar
    tareas = obtenerLocalStorage();

    //añado la nueva tarea con push para que sea al final de la lista o arrehlo
    tareas.push(tarea);

    //convierto de string a arreglo para local storage
    //recordar que solo se puede almacenar strings en local
    //es por eso que lo convierto
    localStorage.setItem('tareas', JSON.stringify(tareas));

}

//comprueba si existen o no tareas
function obtenerLocalStorage() {
    let tareas;

    if(localStorage.getItem('tareas') === null){//se inicia en vacio
        tareas = [];
    }else{
        //obtengo las tareas convertidas en json
        tareas = JSON.parse(localStorage.getItem('tareas'));
    }

    return tareas;
}

//elimino tarea en la parte del DOM
function borrarTarea(e) {
    e.preventDefault();
    //delegation para determinar que se hace click en la lista
    if(e.target.className === 'borrar-tweet'){

        if(document.querySelector('.alert'))
            document.querySelector('.alert').remove();
        
        e.target.parentElement.remove();
        borrarLocalStorage(e.target.parentElement.innerText);

        alert('Se ha eliminado tu tarea.');
    }

}

//muestro los datos almacenados en local y los pinto en el dom
function cargarLocalStorage() {

    let tareas = obtenerLocalStorage();

    //vuelvo a crear lista para el dom al iniciar la pagina
    tareas.forEach(function(tarea){
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        const div = document.createElement('div');
        div.className = "alert alert-primary";
        const li = document.createElement('ol');
        div.appendChild(li);
        li.className = "text-center text-dark";

        li.innerHTML = tarea;
        li.appendChild(botonBorrar);
        listaTareas.appendChild(div);
    });
}

function borrarLocalStorage(tarea) {
    //elimino la X de la cdena
    let tareas, tareaBorrar;

    //elimino la ultima posicion que es perteneciente a la X
    tareaBorrar = tarea.substring(0, tarea.length - 1);

    tareas = obtenerLocalStorage();
    //recorro el array de taeas almacenadas
    tareas.forEach(function(tare, index){
        //si encuentro una tarea con el mismo nombre
        //que la tarea a borrar con la que se encuentra en local elimino
        if(tareaBorrar === tare){
            tareas.splice(index, 1);
        }

    });

    localStorage.setItem('tareas', JSON.stringify(tareas));
}





