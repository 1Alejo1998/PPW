const API_URL = "https://ppw-production-65be.up.railway.app";

async function iniciarSesion(e) {
    if(e) e.preventDefault(); 
    
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, contrasena })
        });

        const data = await res.json();
        
        if (data.exito) {
            window.location.href = 'producto.html';
        } else {
            alert("Credenciales incorrectas: " + data.mensaje);
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Ocurrió un error al intentar conectarse al servidor.");
    }
}