AOS.init({
    duration: 700,
  delay: 80,
});


let Tarjetas = undefined
let TarjetasMostrar = undefined

await fetch("http://localhost:3000/api/tienda/stock",{
    method: "GET",
}).then(response => response.json())
.then(data => {
    Tarjetas = data
    TarjetasMostrar = Tarjetas
    console.log(data);
})



function ImprimirTarjetas(){

    let Tarjetas= document.getElementById('Tarjetas-Home');
    Tarjetas.innerHTML = '';
    TarjetasMostrar.forEach(element => {
        //Fechas totales
        if (Tarjetas!=null){
            Tarjetas.insertAdjacentHTML("beforeend", `
            <div class="elementoCard col ${element.categoria} g-2">
                <div class="ContenidoTarjetas card shadow-sm">
                    <img src="${element.imagen}" loading="lazy" class="card-img-top ImgTarjetas" alt="${element.name}">
                    <div class="card-body CuerpoTarjetasProductos">
                        <h6 class="mb-0 TituloTarjetasProductos">
                            <b>${element.nombre}</b>
                            <span class="ms-2 badge bg-secondary">${element.nuevo ? "Nuevo": ""}</span>
                        </h6>
                        <p class="mb-1 text-secondary CategoriaTarjetasProductos mb-2">${element.categoria}</p>
                        <p class="card-text TextoTarjetasProductos">${element.descripcion}</p>
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
                        <p>${element.descripcion_extendida}</p>
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

    TarjetasMostrar.length==0 &&
     Tarjetas.insertAdjacentHTML("beforeend",`
        <div class="m-auto tarjetaError" id="error">
            <div class="card shadow-sm">
                <div class="card-body">
                    <h6 class="mb-0"><b>Ups!<br>No fue encontrado ningun elemento con ese filtro</b></h6>
                    <p class="card-text">Desmarque los filtros y pruebe nuevamente, gracias.</p>
                </div> 
            </div>
        </div>
    `);
}

ImprimirTarjetas();

//Filtrado
const filtros = document.querySelectorAll('.filtro');

function filtrar() {
    let FiltrosActivos=[];
    filtros.forEach(filtro => {
        const valorFiltro = filtro.dataset.valor;
        if (filtro.checked){
            FiltrosActivos.push(valorFiltro)
        }
    });

    if(FiltrosActivos.length!=0){
        TarjetasMostrar = Tarjetas.filter(elemento => elemento.categoria.includes(FiltrosActivos))
    }else{
        TarjetasMostrar = Tarjetas
    }

    ImprimirTarjetas();
};

filtros.forEach(filtro => {
    filtro.addEventListener('change', filtrar);
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

const dropdownPurificadores = document.querySelectorAll(".dropdown-productos");

dropdownPurificadores.forEach(function(dropdown) {
  // Agregar evento mouseenter
  dropdown.addEventListener("mouseenter", showDropdownMenu);
  
  // Agregar evento mouseleave
  dropdown.addEventListener("mouseleave", hideDropdownMenu);
});

let productosHogar = Array.from(document.getElementsByClassName('productos-hogar'))
let productosIndustria = Array.from(document.getElementsByClassName('productos-industria'))

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

let filtroIndustrial=document.getElementById('Industrial');
productosIndustria.forEach((botonNav)=>{
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
            filtroIndustrial.checked=true;
            filtroSeleccionado[0].checked=true
            }
        }
        filtrar()
    });
})