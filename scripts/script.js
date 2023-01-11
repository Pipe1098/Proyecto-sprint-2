//Ejercicio consiste en crear una página que nos permita filtrar personajes de acuerdo a ciertas características. Este filtro lo vamos a realizar con unos botones de filtrado.

import { yt } from "../data/data.js";

//Importar el aaray de personajes de starWar desde data.js

//2. Insertar tarjetas de cada personaje dentro de main
//2.1. Creando una función que nos permita pintar las cards (o tarjentas) dentro del contenedor main

const printVideos = (videosList, contenedor) => {
  //1. Vaciemos el contenido del contenedor
  contenedor.innerHTML = "";

  //2. recorrer el array listPersonajes y por cada elemento nos debe pintar un card.
  videosList.forEach((video) => {
    const article = document.createElement("article");
    article.classList.add("main__card");
    article.innerHTML = `
        <figure class="card__image">
                    <img id=${video.id} src=${video.miniatura} alt="${video.titulo}" class="card__img">
                </figure>
                <button class="card__delete" name='${video.id}'>❌</button>
                <button class="card__edit" name='${video.id}'>✏</button>
                <h4 class="card__name">${video.titulo}</h4>
        `;

    contenedor.appendChild(article);
  });
};

//2.2. Capturar el contenedor donde queremos pintar las cards
//document.querySelector(selctor) recibe como parámetro el selector que posee el elemento que queremos capturar. En caso de: 1. Hacer referencia a una clase (class): .nombreDeLaClase, 2. Hacer referencia a un id: #nombreDelId, 3. Hacer referencia a una tag (o etiqueta): nombreDeLaEtiqueta por ejemplo: document.querySelector(a), document.querySelector(img), document.querySelector(h1)
const main = document.querySelector(".main");

const contenedorCards = document.getElementById("contenedorCards");

//Para obtener los datos de sessionStorage usamos el método getItem(). Este método recibe un parámetro que sería la key (nombre de la propiedad que queremos recuperar desde sessionStorage)

let videos = sessionStorage.getItem("videos")
  ? JSON.parse(sessionStorage.getItem("videos"))
  : [];

//2.3. Escuchamos al evento DOMContentLoaded (Cuando la página recarga o se renderiza) y cuando este evento ocurre se ejecuta el callback (función que es pasada como parámetro a la función o método .addEventListener('nombreDelEvento', callback)).
document.addEventListener("DOMContentLoaded", () => {
  sessionStorage.removeItem("editPersonaje");
  sessionStorage.removeItem("seeDetails");
  if (videos.length === 0) {
    //Guadar el array starWar a sessionStorage con el método setItem(). este método recibe dos parámetros: 1. es la Key (el nombre de la propiedad donde vamos almacenar los datos) 2. Los datos queremos almacenar. Estos datos deben guardarse en el storage como formato JSON.
    sessionStorage.setItem("videos", JSON.stringify(yt));
    videos = JSON.parse(sessionStorage.getItem("videos"));
  }

  //Pintamos las cards de cada personaje
  printVideos(videos, contenedorCards);
});

//Funcionamiento a los botones de filtrado

//1. Capturar los botones
const botonAll = document.getElementById("all");
const botonAndroide = document.getElementById("noticias");
const botonHumano = document.getElementById("deportes");
const lifeHacks = document.getElementById("lifehacks");

//2. Vamos a declarar un array donde cada elemento sea el btn que hemos capturado

const filterButtons = [botonAll, botonAndroide, botonHumano, lifeHacks];

//3. Recorrer el array filterButtons para escuchar el click de ellos.

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log(button);
    console.log(event);
    console.log(event.target.id);
    console.log(button.id);
    let personajesFiltrados = [];

    if (button.id === "all") {
      personajesFiltrados = yt;
    } else {
      personajesFiltrados = yt.filter((video) => video.categoria === button.id);
    }
    console.log(personajesFiltrados);
    printVideos(personajesFiltrados, contenedorCards);
  });
});

//Para que el aplicativo dirija al usuario a la página de detalles de un personaje, debe escruchar primero el click sobre una Card de personaje

document.addEventListener("click", (event) => {
  // console.log('He hecho click sobre algún lugar del documento');
  // console.log(event);
  //Destructuración de un objeto
  const { target } = event;
  console.log(target);

  //-------------Condicional para ir a detalles--------------------------
  if (target.classList.contains("card__img")) {
    console.log("He hecho click sobre una card de personaje");
    console.log(target.id);
    sessionStorage.setItem("seeDetails", JSON.stringify(target.id));
    window.location.href = "./pages/seeDetails.html";
  }

  //----------------Condicional para eliminar un personaje---------------
  if (target.classList.contains("card__delete")) {
    console.log("Queremos eliminar este personaje");
    console.log(target.name);
    console.log(typeof target.name);
    // const confirmDelete = confirm('¿Está usted seguro de eliminar este personaje?');

    Swal.fire({
      title: "¿Está usted seguro de eliminar?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");

        //Encontrar la posición del elemento que queremos borrar dentro del array
        const idPersonajeDelete = parseInt(target.name);
        console.log(idPersonajeDelete);
        console.log(typeof idPersonajeDelete);

        const positionPersonaje = personajes.findIndex(
          (persona) => persona.id === idPersonajeDelete
        );
        console.log(positionPersonaje);

        //Elimina el personaje
        personajes.splice(positionPersonaje, 1);
        console.log(personajes);

        //Actualizar el array personajes en sessionStorage
        sessionStorage.setItem("personajes", JSON.stringify(personajes));

        //Pintar nuevamente las card
        printPersonajes(personajes, contenedorCards);
      }
    });
  }

  //--------------------Condicional para editar--------------------------------
  if (target.classList.contains("card__edit")) {
    console.log(target.name);
    sessionStorage.setItem("editPersonaje", JSON.stringify(target.name));
    window.location.href = "./pages/addNewPersonaje.html";
  }
});
