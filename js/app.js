const API_URL = "https://ppw-production-65be.up.railway.app";

window.onload = async function () {
    console.log("Iniciando SugarRush...");

    let dbSnks = [];
    try {
        const res = await fetch(`${API_URL}/productos`);
        dbSnks = await res.json();
    } catch (err) {
        console.error("Error al conectar con la API:", err);
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
                <td><a href="editarProducto.html?id=${q.id}" style="color:orange;">Editar</a></td>
            </tr>`).join('');
    }
};