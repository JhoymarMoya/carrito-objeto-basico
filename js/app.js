//que se debe seleccionar
const carrito = document.querySelector("#carrito");
const template = document.querySelector("#template");
const footer =document.getElementById('footerC');
const templateFooter =document.getElementById('templateFooter')
const fragment = document.createDocumentFragment();

document.addEventListener('click', (e) =>{//seleccionamos todo el documento
    //console.log(e.target.matches('.card .btn-outline-primary'));
    if (e.target.matches('.card .btn-outline-primary')) {
        agregar(e);
    }
    //console.log(e.target,matches('.list-group-item .btn-success'));//saber si existe el boton aunmentar en la pantalla
    
    if(e.target.matches('.list-group-item .btn-success')){
        btnAumentar(e);//capture de forma dinamica 
    };

    if(e.target.matches('.list-group-item .btn-danger')){
        btnQuitar(e);//capture de forma dinamica 
    };
}); 

//donde se almacenan los productos
let carritoObjeto = []; //let porque vamos a sobre escribir

//funcion agregar
const agregar = (e) => {
    //console.log(e.target.dataset.vehiculo); //mostrar que boton se preciono

    const producto = { // se asigna informacion del boton presionado 
        id: e.target.dataset.vehiculo,
        titulo: e.target.dataset.vehiculo,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
    };
    console.log(producto);
    
    const indice = carritoObjeto.findIndex( (item) => item.id === producto.id);//saber si hay una compra en el array
    //console.log(indice);

    if( indice === -1){// entonces ahora si esta vacia ese array agregamos esa compra al array
        carritoObjeto.push(producto);
    }else { // si ya heciste elemento en el array ahora sumamos la comprar al contador=(cantidad)
        carritoObjeto[indice].cantidad ++;
        //carritoObjeto[indice].precio = carritoObjeto[indice].cantidad * producto.precio;
    }
    
     console.log(carritoObjeto);
    
    pintarCarrito();// lo vamos a utilizar como parametros para los botenes de agregar y quitar
};

const pintarCarrito = (e) => {
    
    carrito.textContent= "";

    carritoObjeto.forEach(item => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.text-white .lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad;
        clone.querySelector('.btn-danger').dataset.id = item.id;
        clone.querySelector('.btn-success').dataset.id = item.id;

        fragment.appendChild(clone);

    })

    carrito.appendChild(fragment);//carrirto donde se pinta la informacion 
    pintarFooter();
};

const pintarFooter = () => {
    footer.textContent = "";//lo pintamos en cero

    const total = carritoObjeto.reduce((acc,current ) => acc + current.cantidad * current.precio, 0 //agregamos el 0 para devolver un numero
    );
    const clone = templateFooter.content.cloneNode(true);
    
    if(total === 0){
        return
    }else
    {
        clone.querySelector('span').textContent = total;
    footer.appendChild(clone);// como no hay siclo no utilizamos fragment
    }
}

const btnAumentar = (e) => {
    carritoObjeto = carritoObjeto.map(item => {
        if(item.id === e.target.dataset.id){
            item.cantidad ++;
        }
        return item;
    });
    pintarCarrito();
};

const btnQuitar = (e) => {
    carritoObjeto = carritoObjeto.filter(item => {
        if(item.id === e.target.dataset.id ){
            if(item.cantidad >0){
            item.cantidad --;
                if(item.cantidad === 0){
                    return
                }
                return item;
            }
        }
        return item;
    });
    pintarCarrito();
};

