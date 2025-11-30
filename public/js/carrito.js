document.addEventListener("DOMContentLoaded", function() {
    console.log("Inicializando carrito...");
    mostrarCarrito();
});

function mostrarCarrito() {
    const carrito = cargarCarrito();
    console.log("Datos del carrito:", carrito);

    if (carrito.asientos && carrito.asientos.length > 0) {
        mostrarCarritoLleno(carrito);
    } else {
        mostrarCarritoVacio();
    }
}

function cargarCarrito() {
    try {
        // 1. Intentar desde sessionStorage primero
        let datos = sessionStorage.getItem("seleccionAsientos");
        if (datos) {
            console.log("Datos encontrados en sessionStorage");
            return JSON.parse(datos);
        }
        
        // 2. Intentar desde localStorage como respaldo
        datos = localStorage.getItem("ultimaSeleccion");
        if (datos) {
            console.log("Datos encontrados en localStorage");
            return JSON.parse(datos);
        }
        
    } catch (error) {
        console.error("Error cargando carrito:", error);
    }
    
    console.log("No hay datos del carrito");
    return { asientos: [], precioPorAsiento: 45.00 };
}

function mostrarCarritoVacio() {
    console.log("Mostrando carrito vacío");
    
    document.getElementById("cart-empty").style.display = 'block';
    document.getElementById("cart-items").style.display = 'none';
    document.getElementById("cart-summary").style.display = 'none';
    document.getElementById("cart-actions").style.display = 'none';
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = '0';
}

function mostrarCarritoLleno(carrito) {
    console.log("Mostrando carrito con", carrito.asientos.length, "asientos");
    
    document.getElementById("cart-empty").style.display = 'none';
    document.getElementById("cart-items").style.display = 'block';
    document.getElementById("cart-summary").style.display = 'block';
    document.getElementById("cart-actions").style.display = 'grid';
    
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = carrito.asientos.length;

    mostrarItemsCarrito(carrito);
    
    calcularTotales(carrito);
}

function mostrarItemsCarrito(carrito) {
    const cartItemsContainer = document.getElementById("cart-items");
    
    const itemsHTML = carrito.asientos.map(asientoId => {
        return `
            <div class="cart-item" data-asiento="${asientoId}">
                <div class="item-info">
                    <h3>Asiento ${asientoId}</h3>
                    <div class="item-details">
                        <strong>${carrito.pelicula || 'Película'}</strong><br>
                        ${carrito.funcion || 'Horario'} • ${carrito.sala || 'Sala'} • ${carrito.formato || 'Formato'}
                    </div>
                </div>
                <div class="item-price">Bs. ${carrito.precioPorAsiento || 45}.00</div>
                <button class="remove-btn" onclick="removerAsiento('${asientoId}')">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        `;
    }).join('');

    cartItemsContainer.innerHTML = itemsHTML;
}

function calcularTotales(carrito) {
    const precio = carrito.precioPorAsiento || 45;
    const subtotal = carrito.asientos.length * precio;
    const servicio = subtotal * 0.10;
    const total = subtotal + servicio;

    document.getElementById("subtotal").textContent = `Bs. ${subtotal.toFixed(2)}`;
    document.getElementById("servicio").textContent = `Bs. ${servicio.toFixed(2)}`;
    document.getElementById("total").textContent = `Bs. ${total.toFixed(2)}`;
}

// Funciones globales
window.removerAsiento = function(asientoId) {
    if (confirm(`¿Eliminar asiento ${asientoId}?`)) {
        const carrito = cargarCarrito();
        carrito.asientos = carrito.asientos.filter(id => id !== asientoId);
        
        sessionStorage.setItem("seleccionAsientos", JSON.stringify(carrito));
        localStorage.setItem("ultimaSeleccion", JSON.stringify(carrito));
        
        mostrarCarrito();
    }
}

window.vaciarCarrito = function() {
    if (confirm("¿Vaciar todo el carrito?")) {
        sessionStorage.removeItem("seleccionAsientos");
        localStorage.removeItem("ultimaSeleccion");
        mostrarCarrito();
    }
}

// Debug
window.mostrarDebug = function() {
    console.log("=== DEBUG ===");
    console.log("SessionStorage:", sessionStorage.getItem("seleccionAsientos"));
    console.log("LocalStorage:", localStorage.getItem("ultimaSeleccion"));
}