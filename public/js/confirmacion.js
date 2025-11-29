document.addEventListener("DOMContentLoaded", function() {
            const datosPago = JSON.parse(sessionStorage.getItem('datosPago') || '{}');
            mostrarResumen(datosPago);
        });

        function mostrarResumen(datos) {
            const resumenDiv = document.getElementById('resumenCompra');
            const servicio = datos.total * 0.10;
            const totalFinal = datos.total + servicio;

            resumenDiv.innerHTML = `
                <h3>Resumen de Compra</h3>
                <div class="resumen-item">
                    <span>Película:</span>
                    <span>${datos.pelicula || 'Duna: Parte Dos'}</span>
                </div>
                <div class="resumen-item">
                    <span>Función:</span>
                    <span>${datos.funcion || '21:00'}</span>
                </div>
                <div class="resumen-item">
                    <span>Asientos:</span>
                    <span>${datos.asientos.join(', ')}</span>
                </div>
                <div class="resumen-item">
                    <span>Subtotal:</span>
                    <span>Bs. ${datos.total}.00</span>
                </div>
                <div class="resumen-item">
                    <span>Servicio (10%):</span>
                    <span>Bs. ${servicio.toFixed(2)}</span>
                </div>
                <div class="resumen-item resumen-total">
                    <span>Total:</span>
                    <span>Bs. ${totalFinal.toFixed(2)}</span>
                </div>
            `;
        }

        function confirmarCompra() {
            const form = document.getElementById('formPago');
            if (form.checkValidity()) {
                // Simular procesamiento de pago
                alert('¡Pago procesado exitosamente!');
                sessionStorage.removeItem('seleccionAsientos');
                sessionStorage.removeItem('datosPago');
                window.location.href = 'index.html';
            } else {
                alert('Por favor completa todos los campos requeridos');
            }
        }