document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const totalPago = document.getElementById('total-pago');
    const formPago = document.getElementById('form-pago');

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
        window.location.href = 'index.html';
        return;
    }

    let total = 0;
    carrito.forEach(prod => {
        total += parseFloat(prod.precio);
    });
    
    totalPago.textContent = `L. ${total.toFixed(2)}`;

    formPago.addEventListener('submit', (e) => {
        e.preventDefault();
        
        alert("✅ ¡Pago procesado con éxito! Gracias por tu compra en SugarRush.");
        localStorage.removeItem('carrito');
        window.location.href = 'index.html';
    });
});