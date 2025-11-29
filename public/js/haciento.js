const precioPorAsiento = 45.00;
let asientosSeleccionados = [];
let occupiedSeats = JSON.parse(localStorage.getItem('occupiedSeats')) || ['A1', 'A2', 'B5', 'C3'];

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
            // Saltar asientos hidden si existen
            if (seat.classList.contains("hidden")) {
                return;
            }

            const numeroAsiento = seatIndex + 1;
            const idAsiento = `${letraFila}${numeroAsiento}`;
            
            // Asignar datos al asiento
            seat.dataset.id = idAsiento;
            seat.dataset.fila = letraFila;
            seat.dataset.numero = numeroAsiento;

            // Marcar asientos ocupados
            if (occupiedSeats.includes(idAsiento)) {
                seat.classList.add("occupied");
            }

            // Agregar evento de clic
            seat.addEventListener("click", manejarSeleccionAsiento);
        });
    });

    function manejarSeleccionAsiento(event) {
        const seat = event.currentTarget;

        // Evitar click en ocupados
        if (seat.classList.contains("occupied")) {
            return;
        }

        // Toggle selección
        seat.classList.toggle("selected");
        const idAsiento = seat.dataset.id;

        if (seat.classList.contains("selected")) {
            // Agregar a la lista
            asientosSeleccionados.push({
                id: idAsiento,
                fila: seat.dataset.fila,
                numero: seat.dataset.numero,
                elemento: seat
            });
        } else {
            // Remover de la lista
            asientosSeleccionados = asientosSeleccionados.filter(asiento => asiento.id !== idAsiento);
        }

        // Actualizar interfaz
        actualizarInterfaz();
    }

    function actualizarInterfaz() {
        actualizarInformacion();
        actualizarTotal();
        actualizarBotonContinuar();
        guardarSeleccionActual();
    }

    function actualizarInformacion() {
        if (!infoDiv) return;
        
        if (asientosSeleccionados.length === 0) {
            infoDiv.innerHTML = "No hay asientos seleccionados";
            return;
        }

        // Ordenar asientos
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

    function guardarSeleccionActual() {
        const seleccion = {
            asientos: asientosSeleccionados.map(seat => seat.id),
            total: asientosSeleccionados.length * precioPorAsiento,
            cantidad: asientosSeleccionados.length,
            precioPorAsiento: precioPorAsiento,
            timestamp: new Date().getTime()
        };
        
        // Guardar en sessionStorage para el carrito
        sessionStorage.setItem("seleccionAsientos", JSON.stringify(seleccion));
        
        // También guardar en localStorage para persistencia
        localStorage.setItem("ultimaSeleccion", JSON.stringify(seleccion));
    }

    function cargarSeleccionPrevia() {
        const seleccionGuardada = sessionStorage.getItem("seleccionAsientos") || localStorage.getItem("ultimaSeleccion");
        if (seleccionGuardada) {
            const seleccion = JSON.parse(seleccionGuardada);
            
            // Cargar asientos seleccionados
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
        }
    }

    // Configurar evento del botón continuar si existe
    if (continueBtn) {
        continueBtn.addEventListener("click", function(e) {
            if (asientosSeleccionados.length === 0) {
                e.preventDefault();
                alert("Por favor selecciona al menos un asiento");
                return;
            }

            // Guardar selección completa
            const movieSelection = JSON.parse(sessionStorage.getItem('movieSelection') || '{}');
            const seleccionCompleta = {
                ...movieSelection,
                asientos: asientosSeleccionados.map(seat => seat.id),
                totalTickets: asientosSeleccionados.length,
                totalPrice: asientosSeleccionados.length * precioPorAsiento,
                precioPorAsiento: precioPorAsiento,
                fechaSeleccion: new Date().toISOString()
            };
            
            sessionStorage.setItem('movieSelection', JSON.stringify(seleccionCompleta));
            sessionStorage.setItem('seleccionAsientos', JSON.stringify({
                asientos: asientosSeleccionados.map(seat => seat.id),
                total: asientosSeleccionados.length * precioPorAsiento,
                cantidad: asientosSeleccionados.length,
                precioPorAsiento: precioPorAsiento
            }));

            // Redirigir al carrito
            window.location.href = 'carrito.html';
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
            <p><strong>Duración:</strong> ${selection.movie.duration || 'No especificada'} | <strong>Clasificación:</strong> ${selection.movie.rating || 'No especificada'}</p>
            <p><strong>Precio por asiento:</strong> Bs${precioPorAsiento}.00</p>
        `;
        
        // Guardar información de la película para el carrito
        const carritoData = {
            pelicula: selection.movie.title || 'Película no especificada',
            funcion: selection.showtime?.time || 'No especificado',
            formato: selection.showtime?.format || 'Estándar',
            duracion: selection.movie.duration || 'No especificada',
            clasificacion: selection.movie.rating || 'No especificada',
            precioPorAsiento: precioPorAsiento
        };
        sessionStorage.setItem("infoPelicula", JSON.stringify(carritoData));
    } else {
        // Datos por defecto si no hay selección de película
        summaryDiv.innerHTML = `
            <h3>Película no especificada</h3>
            <p><strong>Horario:</strong> No especificado</p>
            <p><strong>Precio por asiento:</strong> Bs${precioPorAsiento}.00</p>
        `;
        
        const carritoData = {
            pelicula: 'Película no especificada',
            funcion: 'No especificado',
            formato: 'Estándar',
            precioPorAsiento: precioPorAsiento
        };
        sessionStorage.setItem("infoPelicula", JSON.stringify(carritoData));
    }
}

// Función global para continuar al carrito (para enlaces HTML)
function continueToCarrito() {
    if (asientosSeleccionados.length === 0) {
        alert("Por favor selecciona al menos un asiento");
        return false;
    }

    // Guardar selección completa
    const movieSelection = JSON.parse(sessionStorage.getItem('movieSelection') || '{}');
    const seleccionCompleta = {
        ...movieSelection,
        asientos: asientosSeleccionados.map(seat => seat.id),
        totalTickets: asientosSeleccionados.length,
        totalPrice: asientosSeleccionados.length * precioPorAsiento,
        precioPorAsiento: precioPorAsiento,
        fechaSeleccion: new Date().toISOString()
    };
    
    sessionStorage.setItem('movieSelection', JSON.stringify(seleccionCompleta));
    sessionStorage.setItem('seleccionAsientos', JSON.stringify({
        asientos: asientosSeleccionados.map(seat => seat.id),
        total: asientosSeleccionados.length * precioPorAsiento,
        cantidad: asientosSeleccionados.length,
        precioPorAsiento: precioPorAsiento
    }));

    return true;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeSeats);