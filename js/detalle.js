const API_URL = "https://ppw-production-65be.up.railway.app";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idProducto = urlParams.get('id');
    const tituloDetalle = document.getElementById('det-nombre');

    if (idProducto && tituloDetalle) {
        try {
            const res = await fetch(`${API_URL}/productos`);
            const dbSnks = await res.json();

            const producto = dbSnks.find(p => p.id == idProducto);

            if (producto) {
                document.getElementById('det-img').src = producto.img;
                document.getElementById('det-img').alt = producto.nombre;
                
                tituloDetalle.textContent = producto.nombre;
                document.getElementById('det-desc').textContent = producto.descripcion;
                document.getElementById('det-precio').textContent = `L. ${Number(producto.precio).toFixed(2)}`;

                const btnAgregar = document.getElementById('btn-agregar');
                const inputCantidad = document.getElementById('input-cantidad');

                btnAgregar.onclick = () => {
                    const cantidad = parseInt(inputCantidad.value) || 1;
                    
                    for (let i = 0; i < cantidad; i++) {
                        agregarAlCarrito(producto.id, producto.nombre, producto.precio, producto.img);
                    }
                    
                    alert(`¡Agregaste ${cantidad} ${producto.nombre} al carrito! 🛒`);
                };

            } else {
                mostrarError();
            }
        } catch (error) {
            console.error("Error al cargar los datos desde la API:", error);
            mostrarError();
        }
    }
});

function mostrarError() {
    const tituloDetalle = document.getElementById('det-nombre');
    tituloDetalle.textContent = "Producto no encontrado";
    document.getElementById('det-desc').textContent = "Lo sentimos, el snack que buscas no existe en Veldum.";
    document.getElementById('det-precio').textContent = "";
    document.getElementById('det-img').src = "img/default.png";
    document.getElementById('btn-agregar').style.display = "none";
    document.getElementById('input-cantidad').style.display = "none";
}