AOS.init({
  duration: 700,
  delay: 80,
});

import { cards } from './cards.js';

cards.events.forEach(element => {
    //Fechas totales
    let Tarjetas= document.getElementById('Tarjetas-Home');
    if (Tarjetas!=null){
        Tarjetas.insertAdjacentHTML("beforeend", `
        <div class="elementoCard col ${element.categoria} g-2">
            <div class="card shadow-sm">
                <img src="${element.imagen}" class="card-img-top Tarjetas" alt="${element.name}">
                <div class="card-body">
                <h6 class="mb-0"><b>${element.nombre}</b><span class="ms-2 badge bg-secondary">${element.nuevo ? "Nuevo": ""}</span></h6>
                    <p class="mb-1 text-secondary">${element.categoria}</p>
                    <p class="card-text">${element.descripcionBreve}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#${element.id}">Detalles</button>
                            <button type="button" class="btn btn-sm btn-outline-success" onclick="location.href='https://api.whatsapp.com/send?phone=5492954522620&text=Hola,%20me%20gustaría%20obtener%20mayor%20información%20sobre%20${element.nombre}'">Enviar mensaje</button>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
 
        <!-- Modal -->
        <div class="modal fade" id="${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered"> 
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body d-flex flex-column">
                <section>
                    <h2 class="modal-title fs-1 text-dark text-center fw-semibold" id="exampleModalLabel">${element.nombre}<span class="ms-3 badge bg-secondary fs-6 position-absolute top-3 right-1">${element.nuevo ? "Nuevo": ""}</span></h2>
                    <p class="Gris text-center">${element.categoria}</p>
                </section>
                <hr> 
                <section>
                    <p>${element.descripcion}</p>
                </section>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-success" onclick="location.href='https://api.whatsapp.com/send?phone=5492954522620&text=Hola,%20me%20gustaría%20obtener%20mayor%20información%20sobre%20${element.nombre}'">Enviar mensaje</button>
            </div>
            </div>
        </div>
        </div>
        `
        );
    }

});

//Filtrado
const elementos = document.querySelectorAll('.elementoCard');
const filtros = document.querySelectorAll('.filtro');

function filtrar() {
elementos.forEach(elemento => {
    let mostrar = true;
    filtros.forEach(filtro => {
        const valorFiltro = filtro.dataset.valor;
        if (filtro.checked){
            if (!elemento.classList.contains(valorFiltro)) {
                mostrar = false;
            }
        }
    });
    elemento.style.display = mostrar ? elemento.style.setProperty('display', 'block', 'important') : elemento.style.setProperty('display', 'none', 'important');
});
}

filtros.forEach(filtro => {
  filtro.addEventListener('change', filtrar);
});


//Mostrar elementos en el hover
var dropdownPurificadores = document.getElementById("dropdown-productos");
var dropdownMenu = dropdownPurificadores.querySelector(".dropdown-menu");

dropdownPurificadores.addEventListener("mouseenter", function () {
  dropdownMenu.classList.add("show");
  dropdownMenu.setAttribute("data-bs-popper","static");
});

dropdownPurificadores.addEventListener("mouseleave", function () {
    dropdownMenu.classList.remove("show");
    dropdownMenu.removeAttribute("data-bs-popper");
});

let i = 1;

for(let key in cards.events[i]){
    console.log(`${key}: ${cards.events[i][key]}`);
}

//cards } from './cards.js';

//cards.events.forEach(element => {
    //Fechas totales