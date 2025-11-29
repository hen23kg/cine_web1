document.addEventListener("DOMContentLoaded", function() {
    const cartEmpty = document.getElementById("cart-empty");
    const cartItems = document.getElementById("cart-items");
    const cartSummary = document.getElementById("cart-summary");
    const cartActions = document.getElementById("cart-actions");
    const btnPagar = document.getElementById("btn-pagar");
    const cartCount = document.querySelector('.cart-count');
    const successMessage = document.getElementById('successMessage');

    // Cargar datos del carrito
    const carrito = cargarCarrito();
    const infoPelicula = cargarInfoPelicula();

    console.log("Carrito cargado:", carrito);
    console.log("Info película:", infoPelicula);

    if (carrito && carrito.asientos && carrito.asientos.length > 0) {
        mostrarCarrito(carrito, infoPelicula);
    } else {
        mostrarCarritoVacio();
    }

    // Configurar botón de pago
    if (btnPagar) {
        btnPagar.addEventListener("click", function() {
            if (!carrito || carrito.asientos.length === 0) {
                alert("No hay asientos seleccionados para pagar");
                return;
            }

            // Mostrar animación de carga
            const originalText = btnPagar.innerHTML;
            btnPagar.innerHTML = '<div class="loading"></div> Procesando...';
            btnPagar.disabled = true;

            // Simular procesamiento
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'block';
                }
                btnPagar.innerHTML = originalText;
                btnPagar.disabled = false;
                
                // Guardar datos para la confirmación
                const datosPago = {
                    ...carrito,
                    ...infoPelicula,
                    fechaCompra: new Date().toISOString(),
                    numeroOrden: generarNumeroOrden()
                };
                
                sessionStorage.setItem('datosPago', JSON.stringify(datosPago));
                
                // Redirigir después de 2 segundos
                setTimeout(() => {
                    window.location.href = 'confirmacion.html';
                }, 2000);
            }, 1500);
        });
    }

    function cargarCarrito() {
        try {
            const seleccionGuardada = sessionStorage.getItem("seleccionAsientos");
            console.log("Datos de sessionStorage:", seleccionGuardada);
            
            if (seleccionGuardada) {
                const datos = JSON.parse(seleccionGuardada);
                // Asegurarse de que los datos tengan la estructura correcta
                if (!datos.asientos) {
                    datos.asientos = [];
                }
                if (!datos.precioPorAsiento) {
                    datos.precioPorAsiento = 45.00;
                }
                return datos;
            }
        } catch (error) {
            console.error("Error al cargar carrito:", error);
        }
        return null;
    }

    function cargarInfoPelicula() {
        try {
            const infoGuardada = sessionStorage.getItem("infoPelicula");
            if (infoGuardada) {
                return JSON.parse(infoGuardada);
            }
        } catch (error) {
            console.error("Error al cargar info película:", error);
        }
        
        return {
            pelicula: "Película no especificada",
            funcion: "Horario no especificado",
            formato: "Formato estándar",
            precioPorAsiento: 45.00
        };
    }

    function mostrarCarritoVacio() {
        if (cartEmpty) cartEmpty.style.display = 'block';
        if (cartItems) cartItems.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (cartActions) cartActions.style.display = 'none';
        if (cartCount) cartCount.textContent = '0';
    }

    function mostrarCarrito(datos, infoPeli) {
        if (cartEmpty) cartEmpty.style.display = 'none';
        if (cartItems) cartItems.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'block';
        if (cartActions) cartActions.style.display = 'grid';
        if (cartCount) cartCount.textContent = datos.asientos.length;

        mostrarItemsCarrito(datos, infoPeli);
        calcularTotales(datos);
    }

    function mostrarItemsCarrito(datos, infoPeli) {
        const cartItemsContainer = document.getElementById("cart-items");
        if (!cartItemsContainer) return;
        
        if (!datos.asientos || datos.asientos.length === 0) {
            cartItemsContainer.innerHTML = '<p>No hay asientos en el carrito</p>';
            return;
        }

        const itemsHTML = datos.asientos.map(asientoId => {
            const precioAsiento = datos.precioPorAsiento || infoPeli.precioPorAsiento || 45.00;
            return `
                <div class="cart-item" data-asiento="${asientoId}">
                    <div class="item-info">
                        <h3>Asiento ${asientoId}</h3>
                        <div class="item-details">
                            <strong>${infoPeli.pelicula}</strong><br>
                            ${infoPeli.funcion} • ${infoPeli.formato}
                        </div>
                    </div>
                    <div class="item-price">Bs. ${precioAsiento}.00</div>
                    <button class="remove-btn" onclick="removerAsiento('${asientoId}')">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            `;
        }).join('');

        cartItemsContainer.innerHTML = itemsHTML;
    }

    function calcularTotales(datos) {
        if (!cartSummary) return;
        
        const precioAsiento = datos.precioPorAsiento || 45.00;
        const subtotal = datos.asientos.length * precioAsiento;
        const servicio = subtotal * 0.10;
        const total = subtotal + servicio;

        const subtotalElement = document.getElementById("subtotal");
        const servicioElement = document.getElementById("servicio");
        const totalElement = document.getElementById("total");

        if (subtotalElement) subtotalElement.textContent = `Bs. ${subtotal}.00`;
        if (servicioElement) servicioElement.textContent = `Bs. ${servicio.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `Bs. ${total.toFixed(2)}`;

        // Actualizar datos en sessionStorage
        datos.subtotal = subtotal;
        datos.servicio = servicio;
        datos.total = total;
        sessionStorage.setItem("seleccionAsientos", JSON.stringify(datos));
    }

    function generarNumeroOrden() {
        return 'CINE-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }

    // Función global para remover asiento
    window.removerAsiento = function(asientoId) {
        if (confirm(`¿Estás seguro de que quieres eliminar el asiento ${asientoId}?`)) {
            const seleccionGuardada = sessionStorage.getItem("seleccionAsientos");
            if (seleccionGuardada) {
                const datos = JSON.parse(seleccionGuardada);
                
                // Filtrar el asiento a remover
                datos.asientos = datos.asientos.filter(id => id !== asientoId);
                
                // Actualizar sessionStorage
                sessionStorage.setItem("seleccionAsientos", JSON.stringify(datos));
                
                // También actualizar localStorage para persistencia
                localStorage.setItem("ultimaSeleccion", JSON.stringify(datos));
                
                // Actualizar la vista
                location.reload();
            }
        }
    }

    // Función para vaciar todo el carrito
    window.vaciarCarrito = function() {
        if (confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
            sessionStorage.removeItem("seleccionAsientos");
            localStorage.removeItem("ultimaSeleccion");
            location.reload();
        }
    }
});