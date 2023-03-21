AOS.init({
  duration: 700,
  delay: 80,
});

import { cards } from './cards.js';

function crearTarjetas(cards){
    let Tarjetas= document.getElementById('Tarjetas-Home');
    Tarjetas.innerHTML=''
    cards.forEach(element => {
        if (Tarjetas!=null){
            Tarjetas.insertAdjacentHTML("beforeend", `
            <div class="elementoCard col ${element.categoria} g-2">
                <div class="card shadow-sm">
                    <img src="${element.imagen}" class="card-img-top Tarjetas" alt="${element.name}">
                    <div class="card-body">
                        <span class="mb-2 badge btn-aqua">${element.nuevo ? "Nuevo": ""}</span>
                        <h6 class="mb-0"><b>${element.nombre}</b></h6>
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
    
            <div class="modal fade" id="${element.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered"> 
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body d-flex flex-column">
                    <section>
                        <h2 class="modal-title fs-1 text-dark text-center fw-semibold" id="exampleModalLabel">${element.nombre}</h2>
                        <span class="mx-auto btn-aqua w-25 rounded d-block text-center">${element.nuevo ? "Nuevo": ""}</span>
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
}

crearTarjetas(cards.events)

//Filtrado
const elementos = document.querySelectorAll('.elementoCard');
const filtros = Array.from(document.querySelectorAll('.filtro'));
function filtrar() {
    let filtro1=filtrarCheckBox(cards.events)
    imprimirDOM(filtro1)
}

filtros.forEach(filtro => {
    filtro.addEventListener('change', filtrar);
});
function filtrarCheckBox(arrayTarjetas){
    let filtrosActivos=filtros.filter(filtro=>filtro.checked==true).map((filtro)=>{return filtro.id});
    let arregloTarjetas=[]
    arrayTarjetas.forEach((tarjeta)=>{
        if(filtrosActivos.every(filtro => tarjeta.categoria.includes(filtro))){
            arregloTarjetas.push(tarjeta)
        }
    })
    return arregloTarjetas;
}



function imprimirDOM(arrayTarjetasValidas){
    if(arrayTarjetasValidas.length==0){
        let Tarjetas= document.getElementById('Tarjetas-Home');
        Tarjetas.innerHTML=''
        Tarjetas.insertAdjacentHTML("beforeend", `
            <div class="m-auto">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h6 class="mb-0"><b>Ups!<br>No fue encontrado ningun elemento con ese filtro</b></h6>
                    <p class="card-text">Desmarque los filtros y pruebe nuevamente, gracias.</p>
                </div> 
            </div>
        </div>`)
    }else{
        crearTarjetas(arrayTarjetasValidas)
    }
}

// --------- Funciones botones nav ---------------
let productosHogar = Array.from(document.getElementsByClassName('productos-hogar'))
productosHogar.forEach((botonNav)=>{
    let checkboxs= Array.from(filtros);
    botonNav.addEventListener("click", function() {
        window.location.href=("#Productos")
        let nombreBoton= botonNav.getAttribute("data-valor")
        let filtroSeleccionado= checkboxs.filter(filtro=>{
            filtro.checked=false
            let nombreFiltro= filtro.getAttribute("data-valor")
            return nombreFiltro==nombreBoton
        })
        if(filtroSeleccionado.length!=0){
            if(!filtroSeleccionado[0].checked==true){
                filtroSeleccionado[0].checked=true
            }
        }
        filtrar()
    });
})

let productosIndustria = Array.from(document.getElementsByClassName('productos-industria'))
let filtroIndustrial=document.getElementById('Industrial');
productosIndustria.forEach((botonNav)=>{
    let checkboxs= Array.from(filtros);
    botonNav.addEventListener("click", function() {
        window.location.href=("#Productos")
        let nombreBoton= botonNav.getAttribute("data-valor")
        let filtroSeleccionado= checkboxs.filter(filtro=>{
            filtro.checked=false
            let nombreFiltro= filtro.getAttribute("data-valor")
            return(nombreFiltro==nombreBoton)
        })
        if(filtroSeleccionado.length!=0){
            if(!filtroSeleccionado[0].checked==true){
                filtroIndustrial.checked=true;
                filtroSeleccionado[0].checked=true
            }
        }
        filtrar()
    });
})

// --------- Funciones hover nav ---------------
const dropdownPurificadores = document.querySelectorAll(".dropdown-productos");
dropdownPurificadores.forEach(function(dropdown) {
  dropdown.addEventListener("mouseenter", showDropdownMenu);
  dropdown.addEventListener("mouseleave", hideDropdownMenu);
});
function showDropdownMenu() {
    const dropdownMenu = this.querySelector(".dropdown-menu");
    dropdownMenu.classList.add("show");
    dropdownMenu.setAttribute("data-bs-popper", "static");
}
function hideDropdownMenu() {
    const dropdownMenu = this.querySelector(".dropdown-menu");
    dropdownMenu.classList.remove("show");
    dropdownMenu.removeAttribute("data-bs-popper");
}