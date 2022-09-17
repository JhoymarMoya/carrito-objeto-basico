//que se debe seleccionar
const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();
const botenes = document.querySelectorAll(".card .btn");

/* console.log(carrito);
console.log(fragment);
console.log(botenes); */

//donde se almacenan los productos
const carritoObjeto = {};

//funcion agregar
const agregar = (e) => {
    console.log(e.target.dataset.vehiculo); //mostrar que boton se preciono

    const producto = { // se asigna informacion del boton presionado 
        titulo: e.target.dataset.vehiculo,
        id: e.target.dataset.vehiculo,
        cantidad: 1
    };

    if (carritoObjeto.hasOwnProperty(producto.titulo)) { //saber si ya heciste el objeto producto titulo
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1 //para aumentar la cantidad del producto
    }

    carritoObjeto[producto.titulo] = producto;

    pintarCarrito(producto);
};

const pintarCarrito = (producto) => {
    //console.log("pintar carrito", producto);
    carrito.textContent= "";

    Object.values(carritoObjeto).forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector('.lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;

        fragment.appendChild(clone);

    })

    carrito.appendChild(fragment);//carrirto donde se pinta la informacion 
}


//otra funcion que hace el recorirdo de los botones
botenes.forEach((btn) => btn.addEventListener("click", agregar)); //agregamos a cada boton el evento