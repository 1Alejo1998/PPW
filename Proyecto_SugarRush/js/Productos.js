
document.addEventListener('DOMContentLoaded', () => {
    const btnGuardar = document.getElementById('btn-save-snack');

    if (btnGuardar) {
        btnGuardar.addEventListener('click', async () => {
          
            const nombre = document.getElementById('add-nom').value;
            const descripcion = document.getElementById('add-desc').value;
            const precio = document.getElementById('add-pre').value;
            const inputImg = document.getElementById('add-img');
            
           
            const imgPath = inputImg.files.length > 0 ? "img/" + inputImg.files[0].name : "img/default.png";

            
            const nuevoProducto = {
                nombre: nombre,
                descripcion: descripcion,
                precio: parseFloat(precio),
                img: imgPath,
                stock: 10 
            };

            
            try {
                const response = await fetch('http://127.0.0.1:5000/productos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevoProducto)
                });

                const resultado = await response.json();

                if (resultado.exito) {
                    alert("✅ " + resultado.mensaje);
                    window.location.href = 'producto.html'; 
                } else {
                    alert("❌ Error: " + resultado.error);
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                alert("No se pudo conectar con el servidor (app.py)");
            }
        });
    }
});