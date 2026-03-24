const API_URL = "https://ppw-production-65be.up.railway.app";
let idProductoEditar = null;
let imagenActual = "";

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    idProductoEditar = urlParams.get('id');
    if (idProductoEditar) {
        try {
            const res = await fetch(`${API_URL}/productos`);
            const productos = await res.json();
            const producto = productos.find(p => p.id == idProductoEditar);
            if (producto) {
                document.getElementById('edit-nom').value = producto.nombre;
                document.getElementById('edit-desc').value = producto.descripcion;
                document.getElementById('edit-pre').value = producto.precio;
                imagenActual = producto.img;
            } else {
                alert("No se encontró el producto.");
                window.location.href = "producto.html";
            }
        } catch (error) {
            alert("Error al cargar datos.");
        }
    }
});

async function actualizarProducto(e) {
    e.preventDefault();
    const nombre = document.getElementById('edit-nom').value;
    const descripcion = document.getElementById('edit-desc').value;
    const precio = document.getElementById('edit-pre').value;
    const inputImg = document.getElementById('edit-img');
    let imgPath = imagenActual;
    
    if (inputImg.files.length > 0) {
        imgPath = "img/" + inputImg.files[0].name;
    }
    const productoActualizado = {
        nombre: nombre,
        descripcion: descripcion,
        precio: parseFloat(precio),
        img: imgPath,
        stock: 10 
    };
    try {
        const response = await fetch(`${API_URL}/productos/${idProductoEditar}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizado)
        });
        const resultado = await response.json();
        if (resultado.exito) {
            alert("✅ Producto actualizado exitosamente");
            window.location.href = 'producto.html';
        } else {
            alert("❌ Error: " + resultado.error);
        }
    } catch (error) {
        alert("No se pudo conectar con el servidor.");
    }
}