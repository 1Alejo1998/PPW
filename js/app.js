const API_URL = "https://ppw-production-65be.up.railway.app";

window.onload = async function () {
    let dbSnks = [];
    try {
        const res = await fetch(`${API_URL}/productos`);
        dbSnks = await res.json();
    } catch (err) {
    }
    const _galeria = document.getElementById('gridProductos');
    if (_galeria && dbSnks.length > 0) {
        _galeria.innerHTML = dbSnks.map(prod => `
            <div class="tarjeta">
                <img src="${prod.img}" onerror="this.src='https://via.placeholder.com/200'">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <span class="precio-txt">L. ${Number(prod.precio).toFixed(2)}</span>
                <a href="detalle.html?id=${prod.id}" class="formulario__btn">Ver Detalle</a>
            </div>`).join('');
    }
    const tbObj = document.getElementById('tabla-inventario');
    if (tbObj && dbSnks.length > 0) {
        tbObj.innerHTML = dbSnks.map(q => `
            <tr>
                <td>${q.id}</td>
                <td>${q.nombre}</td>
                <td>L. ${Number(q.precio).toFixed(2)}</td>
                <td style="color:#00A69C;font-weight:bold;">Activo</td>
                <td>
                    <a href="editarProducto.html?id=${q.id}" style="color:orange; text-decoration:none; margin-right:10px;">Editar</a>
                    <button onclick="eliminarProducto(${q.id})" style="color:red; background:none; border:none; cursor:pointer; font-weight:bold;">Eliminar</button>
                </td>
            </tr>`).join('');
    }
};

async function eliminarProducto(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este snack?")) {
        try {
            const res = await fetch(`${API_URL}/productos/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            if (data.exito) {
                alert("Snack eliminado con éxito.");
                location.reload(); 
            } else {
                alert("Error al eliminar: " + data.error);
            }
        } catch (error) {
            alert("No se pudo conectar con el servidor.");
        }
    }
}