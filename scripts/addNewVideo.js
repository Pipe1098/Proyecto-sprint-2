//1. Capturar el formulario

const form = document.querySelector(".form");
// const inputName = document.getElementById('name');
// inputName.value = "";

//Nos entrega un ARRAY con todos los elementos hijos de form
const valuesForm = Object.values(form);
console.log(valuesForm);

//-------Reutilizar el mismo formulario para editar la información de un personaje---

const editFormStr = sessionStorage.getItem("editPersonaje")
  ? JSON.parse(sessionStorage.getItem("editPersonaje"))
  : "";

const editForm = editFormStr ? parseInt(editFormStr) : null;
console.log(editForm);
//Para obtener los datos de sessionStorage usamos el método getItem(). Este método recibe un parámetro que sería la key (nombre de la propiedad que queremos recuperar desde sessionStorage)

let videos = sessionStorage.getItem("videos")
  ? JSON.parse(sessionStorage.getItem("videos"))
  : [];

console.log(videos);

const editVideo = editForm
  ? videos.find((video) => video.id === editForm)
  : null;

console.log(editVideo);

//---Necesitamos cambiar el título y texto del botón de la página
const title = document.querySelector(".title");
//--- Primera manera de cambiar el texto dentro de la etiqueta h1---
title.innerText = editForm
  ? `Actualiza los datos de ${editVideo.titulo}`
  : "Agregar nuevo video";

// NO FUNCIONÓ//--- Segunda manera de cambiar el texto dentro de la etiqueta h1---
// title.innerText = editForm && `Actualiza los datos de ${editPersonaje.name}`;

const botonSubmit = document.querySelector("button");
botonSubmit.innerHTML = editForm ? "Guardar cambios" : "Guardar video";

if (editForm && !editVideo) {
  Swal.fire("¡No hayamos datos!", "Por favor regrese al home", "info").then(
    () => {
      window.location.href = "../index.html";
    }
  );
}

if (editForm && editVideo) {
  //Queremos obtener un objeto con toda la información ingresada en el input
  console.log("VALUES FORM", valuesForm);
  valuesForm.forEach((valueInput) => {
    if (valueInput.id) {
      valueInput.value = editVideo[valueInput.id];
    }
  });
}

//----función que cuenta cantidad de veces que se repite un caracter en  una cadena de texto

const cantidadCaracter = (caracter, string) => {
  const textString = string.split(caracter);
  const arrayCaracters = textString.filter((str) => str !== " ");
  console.log(arrayCaracters);
  return arrayCaracters.length;
};

//------Escuchador del Submit del form para crear un nuevo personaje------------
form.addEventListener("submit", (event) => {
  // if ()

  //.preventDefault() evita que ocurra la acción que viene asociada al submit por defecto (la recarga de la página)
  event.preventDefault();
  console.log("Esto es un submit");

  //Queremos obtener un objeto con toda la información ingresada en el input
  const newVideo = {};

  //Crear una propiedad id
  newVideo.id = editForm ? newVideo.id : videos.length + 1;
  console.log(newVideo.id);

  valuesForm.forEach((valueInput) => {
    if (valueInput.id) {
      newVideo[valueInput.id] = valueInput.value;
    }
  });

  console.log(newVideo);

  videos.push({
    miniatura: "images/mqdefault.jpg",
    ...newVideo,
  });

  console.log(videos);

  //Actualizar la información de personajes que tenemos en sessionStorage
  sessionStorage.setItem("videos", JSON.stringify(videos));

  // //Limpiar cada campo del formulaio
  // valuesForm.forEach((input) => {
  //   if (input.id) {
  //     input.value = "";
  //   }
  // });

  Swal.fire(
    "¡Excelente!",
    "Se ha guardado exitosamente el video",
    "success"
  ).then(() => {
    window.location.href = "../index.html";
  });
});

const pageTitle = document.querySelector(".title");
if (pageTitle.innerHTML.startsWith("Actualiza")) {
  console.log("Actualizando");
}
