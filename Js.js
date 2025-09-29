// ** CONFIGURACIÓN CLAVE **
const WHATSAPP_NUMBERS = [
    { nombre: "Celeste", numero: "5493492221005" }, // REEMPLAZA CON TU PRIMER NÚMERO
    { nombre: "Nahuel", numero: "5493492601524" } // REEMPLAZA CON TU SEGUNDO NÚMERO
];

// ** DEFINICIÓN DE TUS POSTRES **
const postres = [
    {
        nombre: "Frutilla con Crema",
        descripcion: "Delicioso postre de frutilla con crema suave. Perfecto para cualquier ocasión.",
        precio: "$4.000",
        imagen: "imagenes/frutilla.jpg", 
        id: "frutilla-crema"
    },
    {
        nombre: "Turron de Quaker",
        descripcion: "Turrón echo con chocolate . Irresistible.",
        precio: "$6.500",
        imagen: "imagenes/turron.jpg",
        id: "turron-chocolate"
    },
    {
        nombre: "Chocolina",
        descripcion: "Chocolina. Un postre clásico que nunca falla.",
        precio: "$5.500",
        imagen: "imagenes/chocolina.jpg",
        id: "chocolina"
    },
    {
        nombre: "Chocooreo",
        descripcion: "Chocooreo. Una combinación de lo rico de la chocolina y masitas oreo que no falla.",
        precio: "$7.000",
        imagen: "imagenes/chocooreo.jpg",
        id: "chocooreo"
    },
    // Puedes agregar más postres aquí
];

// ** FUNCIÓN GLOBAL PARA ARMAR EL MODAL (VENTANA) **
window.generarLinksModal = function(postreNombre) {
    // 1. Arma el mensaje automático con el nombre del postre
    const mensaje = `¡Hola! Me encantaría ordenar el postre: *${postreNombre}*. ¿Me podrías indicar la disponibilidad y como es el tema del envío?`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // 2. Genera los botones de los dos contactos
    let botonesHTML = '';
    WHATSAPP_NUMBERS.forEach(contacto => {
        const link = `https://wa.me/${contacto.numero}?text=${mensajeCodificado}`;
        botonesHTML += `
            <a href="${link}" target="_blank" class="btn whatsapp-btn-custom w-100 mb-3 fs-5">
                <i class="bi bi-whatsapp"></i> ${contacto.nombre}
            </a>
        `;
    });
    
    // 3. Inyecta el contenido en el modal y lo muestra
    document.getElementById('modalBodyContent').innerHTML = botonesHTML;
    document.getElementById('modalTitlePostre').textContent = postreNombre;

    const myModal = new bootstrap.Modal(document.getElementById('whatsappModal'));
    myModal.show();
}


// ** CARGA EL CATÁLOGO EN EL HTML AL CARGAR LA PÁGINA **
document.addEventListener('DOMContentLoaded', () => {
    const catalogo = document.getElementById('catalogo-postres');
    
    postres.forEach(postre => {
        // En lugar de un link directo, el botón llama a la función JS
        const cardHTML = `
            <div class="col">
                <div class="card card-postre shadow-sm">
                    <img src="${postre.imagen}" class="card-img-top" alt="${postre.nombre}">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${postre.nombre}</h5>
                        <p class="card-text text-muted">${postre.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="text-success fw-bold">${postre.precio}</h4>
                            <button onclick="generarLinksModal('${postre.nombre}')" class="btn whatsapp-btn-custom">
                                <i class="bi bi-whatsapp"></i> Lo Quiero
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        catalogo.insertAdjacentHTML('beforeend', cardHTML);
    });
    
    // Configuración para el botón de pedido general (en el navbar/footer)
    // El modal se abre con el título genérico (sin nombre de postre específico)
    document.querySelectorAll('[data-bs-target="#whatsappModal"]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modalTitlePostre').textContent = "Consulta General";
            
            let botonesHTML = '';
            WHATSAPP_NUMBERS.forEach(contacto => {
                const mensaje = `¡Hola! Tengo una consulta general sobre un pedido.`;
                const link = `https://wa.me/${contacto.numero}?text=${encodeURIComponent(mensaje)}`;
                botonesHTML += `
                    <a href="${link}" target="_blank" class="btn whatsapp-btn-custom w-100 mb-3 fs-5">
                        <i class="bi bi-whatsapp"></i> ${contacto.nombre}
                    </a>
                `;
            });
            document.getElementById('modalBodyContent').innerHTML = botonesHTML;
        });
    });
});