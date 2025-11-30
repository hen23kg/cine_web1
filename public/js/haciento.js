const precioPorAsiento = 45.00;
let asientosSeleccionados = [];
let occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats')) || ['A1', 'A2', 'B5', 'C3'];

// FUNCIÓN ÚNICA para guardar la selección
function guardarSeleccionCompleta() {
    const movieSelection = JSON.parse(sessionStorage.getItem('movieSelection') || '{}');
    
    const seleccionCarrito = {
        // Información de película
        pelicula: movieSelection.movie?.title || 'Película no especificada',
        funcion: movieSelection.showtime?.time || 'No especificado',
        sala: movieSelection.showtime?.sala || 'Sala 1',
        formato: movieSelection.showtime?.format || '2D',
        
        // Información de asientos
        asientos: asientosSeleccionados.map(seat => seat.id),
        cantidad: asientosSeleccionados.length,
        precioPorAsiento: precioPorAsiento,
        subtotal: asientosSeleccionados.length * precioPorAsiento,
        servicio: (asientosSeleccionados.length * precioPorAsiento) * 0.10,
        total: (asientosSeleccionados.length * precioPorAsiento) * 1.10,
        
        // Metadata
        fechaSeleccion: new Date().toISOString(),
        timestamp: new Date().getTime()
    };
    
    console.log('💾 GUARDANDO EN CARRITO:', seleccionCarrito);
    
    // GUARDAR EN AMBOS STORAGES
    sessionStorage.setItem("seleccionAsientos", JSON.stringify(seleccionCarrito));
    localStorage.setItem("ultimaSeleccion", JSON.stringify(seleccionCarrito));
    
    // ACTUALIZAR CONTADOR INMEDIATAMENTE
    actualizarContadorCarrito(asientosSeleccionados.length);
    
    return seleccionCarrito;
}

// Función para actualizar contador del carrito
function actualizarContadorCarrito(cantidad) {
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(count => {
        count.textContent = cantidad;
        console.log(`🛒 Contador actualizado: ${cantidad}`);
    });
}

function initializeSeats() {
    const rows = document.querySelectorAll(".row");
    const infoDiv = document.getElementById("info");
    const totalDiv = document.getElementById("total");
    const continueBtn = document.getElementById("continueBtn") || document.getElementById("btn-continue");

    // Mostrar resumen de la película
    showMovieSummary();

    // Cargar selección previa si existe
    cargarSeleccionPrevia();

    // Inicializar filas con identificadores
    rows.forEach((row, rowIndex) => {
        const seats = row.querySelectorAll(".seat");
        const letraFila = String.fromCharCode(65 + rowIndex);

        seats.forEach((seat, seatIndex) => {
            if (seat.classList.contains("hidden")) {
                return;
            }
            const numeroAsiento = seatIndex + 1;
            const idAsiento = `${letraFila}${numeroAsiento}`;
            seat.dataset.id = idAsiento;
            seat.dataset.fila = letraFila;
            seat.dataset.numero = numeroAsiento;

            if (occupiedSeats.includes(idAsiento)) {
                seat.classList.add("occupied");
            }

            seat.addEventListener("click", manejarSeleccionAsiento);
        });
    });

    function manejarSeleccionAsiento(event) {
        const seat = event.currentTarget;

        if (seat.classList.contains("occupied")) {
            return;
        }

        seat.classList.toggle("selected");
        const idAsiento = seat.dataset.id;

        if (seat.classList.contains("selected")) {
            asientosSeleccionados.push({
                id: idAsiento,
                fila: seat.dataset.fila,
                numero: seat.dataset.numero,
                elemento: seat
            });
        } else {
            asientosSeleccionados = asientosSeleccionados.filter(asiento => asiento.id !== idAsiento);
        }

        actualizarInterfaz();
    }

    function actualizarInterfaz() {
        actualizarInformacion();
        actualizarTotal();
        actualizarBotonContinuar();
        guardarSeleccionCompleta(); // Usar la función única
    }

    function actualizarInformacion() {
        if (!infoDiv) return;
        
        if (asientosSeleccionados.length === 0) {
            infoDiv.innerHTML = "No hay asientos seleccionados";
            return;
        }

        asientosSeleccionados.sort((a, b) => {
            if (a.fila !== b.fila) return a.fila.localeCompare(b.fila);
            return a.numero - b.numero;
        });

        const listaAsientos = asientosSeleccionados.map(asiento => 
            `<span class="asiento-lista">${asiento.id}</span>`
        ).join(", ");

        infoDiv.innerHTML = `Asientos seleccionados: ${listaAsientos}`;
    }

    function actualizarTotal() {
        if (!totalDiv) return;
        
        const totalSeleccionados = asientosSeleccionados.length;
        const totalPrecio = totalSeleccionados * precioPorAsiento;
        
        totalDiv.innerHTML = `
            <div class="resumen-total">
                <div>Total de asientos: <strong>${totalSeleccionados}</strong></div>
                <div>Precio por asiento: <strong>Bs${precioPorAsiento}.00</strong></div>
                <div>Total a pagar: <strong>Bs${totalPrecio}.00</strong></div>
            </div>
        `;
    }

    function actualizarBotonContinuar() {
        if (!continueBtn) return;
        
        if (asientosSeleccionados.length === 0) {
            continueBtn.style.opacity = "0.6";
            continueBtn.style.pointerEvents = "none";
            if (continueBtn.textContent) {
                continueBtn.textContent = "Selecciona asientos";
            }
        } else {
            continueBtn.style.opacity = "1";
            continueBtn.style.pointerEvents = "auto";
            if (continueBtn.textContent) {
                continueBtn.textContent = `Continuar (${asientosSeleccionados.length} asientos)`;
            }
        }
    }

    function cargarSeleccionPrevia() {
        const seleccionGuardada = sessionStorage.getItem("seleccionAsientos") || localStorage.getItem("ultimaSeleccion");
        
        if (seleccionGuardada) {
            try {
                const seleccion = JSON.parse(seleccionGuardada);
                console.log('📥 Cargando selección previa:', seleccion);
                
                if (seleccion.asientos && seleccion.asientos.length > 0) {
                    seleccion.asientos.forEach(idAsiento => {
                        const seat = document.querySelector(`.seat[data-id="${idAsiento}"]`);
                        if (seat && !seat.classList.contains("occupied")) {
                            seat.classList.add("selected");
                            asientosSeleccionados.push({
                                id: idAsiento,
                                fila: seat.dataset.fila,
                                numero: seat.dataset.numero,
                                elemento: seat
                            });
                        }
                    });
                    
                    actualizarInterfaz();
                    console.log(`✅ ${seleccion.asientos.length} asientos cargados de selección previa`);
                }
            } catch (error) {
                console.error('❌ Error cargando selección previa:', error);
            }
        }
    }

    // Configurar evento del botón continuar
    if (continueBtn) {
        continueBtn.addEventListener("click", function(e) {
            if (asientosSeleccionados.length === 0) {
                e.preventDefault();
                alert("Por favor selecciona al menos un asiento");
                return;
            }

            console.log('🚀 GUARDANDO Y REDIRIGIENDO...');
            
            // 1. Guardar primero
            guardarSeleccionCompleta();
            
            // 2. Pequeña pausa para asegurar el guardado
            setTimeout(() => {
                // 3. Verificar que se guardó
                const verificar = sessionStorage.getItem("seleccionAsientos");
                console.log('✅ Verificación:', verificar ? 'GUARDADO' : 'NO GUARDADO');
                
                // 4. Redirigir
                window.location.href = 'carrito.html';
            }, 200);
        });
    }
}

function showMovieSummary() {
    const summaryDiv = document.getElementById('movieSummary');
    if (!summaryDiv) return;
    
    const selection = JSON.parse(sessionStorage.getItem('movieSelection') || '{}');
    
    if (selection && selection.movie) {
        summaryDiv.innerHTML = `
            <h3>${selection.movie.title || 'Película no especificada'}</h3>
            <p><strong>Horario:</strong> ${selection.showtime?.time || 'No especificado'} - ${selection.showtime?.format || 'Estándar'}</p>
            <p><strong>Sala:</strong> ${selection.showtime?.sala || 'No especificada'}</p>
            <p><strong>Duración:</strong> ${selection.movie.duration || 'No especificada'} | <strong>Clasificación:</strong> ${selection.movie.rating || 'No especificada'}</p>
            <p><strong>Precio por asiento:</strong> Bs${precioPorAsiento}.00</p>
        `;
    } else {
        summaryDiv.innerHTML = `
            <h3>Película no especificada</h3>
            <p><strong>Horario:</strong> No especificado</p>
            <p><strong>Precio por asiento:</strong> Bs${precioPorAsiento}.00</p>
        `;
    }
}

// Función global para continuar al carrito
function continueToCarrito() {
    if (asientosSeleccionados.length === 0) {
        alert("Por favor selecciona al menos un asiento");
        return false;
    }

    // Guardar selección final
    guardarSeleccionCompleta();
    
    console.log('🚀 Continuando al carrito con', asientosSeleccionados.length, 'asientos');
    
    // Pequeño delay para asegurar que se guarde
    setTimeout(() => {
        window.location.href = 'carrito.html';
    }, 100);
    
    return true;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Inicializando página de asientos...');
    initializeSeats();
    
    // Verificar si hay datos de película
    const movieSelection = sessionStorage.getItem('movieSelection');
    if (!movieSelection) {
        console.warn('⚠️ No hay selección de película. Redirigiendo a cartelera...');
        setTimeout(() => {
            window.location.href = 'pelicula.html';
        }, 2000);
    }
});

// Función de debug para verificar datos
window.mostrarDatosAsientos = function() {
    console.log('🔍 DEBUG - Datos actuales:');
    console.log('Asientos seleccionados:', asientosSeleccionados);
    console.log('SessionStorage:', sessionStorage.getItem("seleccionAsientos"));
    console.log('LocalStorage:', localStorage.getItem("ultimaSeleccion"));
    console.log('MovieSelection:', sessionStorage.getItem("movieSelection"));
};