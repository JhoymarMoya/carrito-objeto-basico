//que se debe seleccionar
const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const fragment = document.createDocumentFragment();
const botenes = document.querySelectorAll(".card .btn");

/* console.log(carrito);
console.log(fragment);
console.log(botenes); */

//donde se almacenan los productos
const carritoObjeto = [];

//funcion agregar
const agregar = (e) => {
    console.log(e.target.dataset.vehiculo); //mostrar que boton se preciono

    const producto = { // se asigna informacion del boton presionado 
        titulo: e.target.dataset.vehiculo,
        id: e.target.dataset.vehiculo,
        cantidad: 1
    };

    const indice = carritoObjeto.findIndex( //saber si hay una compra en el array
        (item) => item.id === producto.id
    );
    console.log(indice);

    if( indice === -1){// entonces ahora si esta vacia ese array agregamos esa compra al array
        carritoObjeto.push(producto);
    }else { // si ya heciste elemento en el array ahora sumamos la comprar al contador=(cantidad)
        carritoObjeto[indice].cantidad ++;
    }
    
    console.log(carritoObjeto);
    
    pintarCarrito(carritoObjeto);// lo vamos a utilizar como parametros para los botenes de agregar y quitar
};

const pintarCarrito = (nuevoArray) => {
    
    carrito.textContent= "";

    nuevoArray.forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector('.lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;

        fragment.appendChild(clone);

    })

    carrito.appendChild(fragment);//carrirto donde se pinta la informacion 
}


//otra funcion que hace el recorirdo de los botones
botenes.forEach((btn) => btn.addEventListener("click", agregar)); //agregamos a cada boton el evento