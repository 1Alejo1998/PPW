

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

   
    const btnSv = document.getElementById('btn-save-snack');
    if (btnSv) {
        btnSv.addEventListener('click', async () => {
            const nuevo = {
                nombre: document.getElementById('add-nom').value,
                precio: parseFloat(document.getElementById('add-pre').value),
                descripcion: document.getElementById('add-desc').value,
                img: document.getElementById('add-img').value || "img/default.png",
                stock: 10
            };
            
            if (!nuevo.nombre || isNaN(nuevo.precio)) return alert("Completa los campos obligatorios");

            let response = await fetch(`${API_URL}/productos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevo)
            });

            if (response.ok) {
                alert("¡Guardado exitosamente!");
                window.location.href = "producto.html";
            }
        });
    }
};
