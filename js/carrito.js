function agregarAlCarrito(id, nombre, precio, img) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ id, nombre, precio, img });
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
function mostrarCarrito() {
    const lista = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const contenedor = document.getElementById('carrito-list');
    const elementTotal = document.getElementById('carrito-total'); 
    let total = 0;

    if (lista.length === 0) {
        if (contenedor) contenedor.innerHTML = "<p style='text-align:center; padding: 20px; background: white; border-radius: 10px;'>Tu carrito está vacío 🛒</p>";
        if (elementTotal) elementTotal.innerText = "L. 0.00";
    } else {
        if (contenedor) {
            contenedor.innerHTML = lista.map((p, index) => {
                total += parseFloat(p.precio);
                return `
                    <div style="display: flex; align-items: center; justify-content: space-between; background: white; padding: 15px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <img src="${p.img}" width="70" style="object-fit: contain; border-radius: 5px;" onerror="this.src='img/default.png'">
                        
                        <div style="flex-grow: 1; margin-left: 20px;">
                            <p style="margin: 0 0 5px 0; font-family: var(--fuente-titulos);"><strong>${p.nombre}</strong></p>
                            <p style="margin: 0; color: var(--naranja); font-weight: bold;">L. ${Number(p.precio).toFixed(2)}</p>
                        </div>
                        
                        <button onclick="eliminarDelCarrito(${index})" style="color: #ff4d4d; border: 1px solid #ff4d4d; background: transparent; padding: 8px 12px; border-radius: 5px; cursor: pointer; font-weight: bold; transition: 0.3s;">
                            Eliminar
                        </button>
                    </div>
                `;
            }).join("");
        }
        if (elementTotal) elementTotal.innerText = `L. ${total.toFixed(2)}`;
    }
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('carrito-list')) {
        mostrarCarrito();
    }
});