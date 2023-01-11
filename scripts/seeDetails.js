//Obtener la información del personaje al cual queremos ver su detalle

const idVideoStr = sessionStorage.getItem("seeDetails") //
  ? JSON.parse(sessionStorage.getItem("seeDetails"))
  : null;

const idVideo = idVideoStr ? parseInt(idVideoStr) : null;

console.log(idVideo);

//Traer el array personajes desde el sessionStorage
const videos = sessionStorage.getItem("videos")
  ? JSON.parse(sessionStorage.getItem("videos"))
  : [];

console.log(videos);

//Encontrar el objeto personaje con el id que se obtuvo en idVideo

const video = idVideo ? videos.find((video) => video.id === idVideo) : {};
console.log(video);

//Agregar la información en el DOM
//1. Capturando el elemento en el cual queremos mostrar esa información

const container = document.querySelector(".main");
const title = document.querySelector(".title");
console.log(title);

title.innerText = `Página de detalles de ${video.titulo}`;

//2. Insertar la información
container.innerHTML = `
        <figure class="main__figure">
            <iframe src="${video.link}" alt="${video.titulo}">
        </figure>
        <ol>              
            <li>Nombre:  ${video.titulo}</li>
        </ol>
`;
