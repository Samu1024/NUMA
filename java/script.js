document.querySelectorAll('.categoria-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Cerrar todas las demás categorías
        document.querySelectorAll('.categoria-content').forEach(content => {
            if (content !== button.nextElementSibling) {
                content.classList.remove('open');
                content.style.height = '0'; // Reseteamos la altura cuando se cierra
            }
        });

        // Alternar visibilidad de la categoría clicada
        const content = button.nextElementSibling;
        
        if (!content.classList.contains('open')) {
            // Establecer la altura del contenido a su altura real
            content.classList.add('open');
            content.style.height = content.scrollHeight + 'px'; // Calcula la altura real
        } else {
            content.classList.remove('open');
            content.style.height = '0'; // Cerrar el contenido
        }
    });
});

// Obtener el modal y la imagen del modal
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("modalCaption");

// Obtener todas las imágenes con la clase "producto-img"
var images = document.querySelectorAll('.producto-img');

// Añadir un event listener a cada imagen para abrir el modal
images.forEach(function(image) {
    image.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.getAttribute('data-caption'); // Texto de la imagen

        // Esperar un poco antes de empezar la animación
        setTimeout(function() {
            modal.style.opacity = 1; // Hacer que el modal sea completamente visible
            modalImg.style.opacity = 1; // Hacer que la imagen sea completamente visible
            modalImg.style.transform = "scale(1)"; // Escalar la imagen a su tamaño original
        }, 10); // Espera breve para que el modal se cargue y luego aplique la transición
    }
});

// Obtener el botón de cierre (X)
var span = document.getElementById("closeModal");

// Cuando el usuario haga clic en el botón de cierre, cerrar el modal
span.onclick = function() {
    modal.style.opacity = 0; // Bajar la opacidad del modal
    modalImg.style.opacity = 0; // Bajar la opacidad de la imagen
    modalImg.style.transform = "scale(0.8)"; // Reducir la escala de la imagen

    // Cerrar el modal después de la animación
    setTimeout(function() {
        modal.style.display = "none";
    }, 500); // Espera el tiempo de la animación para cerrar el modal
}

// Cuando el usuario haga clic fuera de la imagen, cerrar el modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.opacity = 0; // Bajar la opacidad del modal
        modalImg.style.opacity = 0; // Bajar la opacidad de la imagen
        modalImg.style.transform = "scale(0.8)"; // Reducir la escala de la imagen

        // Cerrar el modal después de la animación
        setTimeout(function() {
            modal.style.display = "none";
        }, 500); // Espera el tiempo de la animación para cerrar el modal
    }
}

// Obtener todos los botones de "Añadir al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Obtener el contenedor de la notificación
const notification = document.getElementById('notification');

// Función para mostrar la notificación
function showNotification() {
    // Agregar la clase 'show' para hacer visible la notificación
    notification.classList.add('show');
    
    // Eliminar la clase 'show' después de 3 segundos (para ocultar la notificación)
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // 3000ms = 3 segundos
}

// Añadir el evento de click a cada botón de "Añadir al carrito"
addToCartButtons.forEach(button => {
    button.addEventListener('click', showNotification);
});


document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.add-to-cart-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const producto = button.closest('.producto-item');
            const nombre = producto.querySelector('h3').textContent;
            let precioTexto = producto.querySelector('.price').textContent.replace('€', '').trim();
            precioTexto = precioTexto.replace(/\./g, '').replace(',', '.'); // Elimina puntos y cambia coma por punto
            const precio = parseFloat(precioTexto);
                        const imagen = producto.querySelector('img').src;

            // Obtener productos actuales del carrito
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            // Verificar si ya está en el carrito
            const existente = carrito.find(p => p.nombre === nombre);
            if (existente) {
                existente.cantidad += 1;
            } else {
                carrito.push({ nombre, precio: parseFloat(precio), imagen, cantidad: 1 });
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Mostrar notificación
            const notification = document.getElementById('notification');
            notification.classList.add('visible');
            setTimeout(() => notification.classList.remove('visible'), 2000);
        });
    });
    
});

// Función para mostrar recomendaciones basadas en el historial de compras
function mostrarRecomendaciones() {
    // Aquí podemos usar productos del historial de compras o los que más se han comprado
    const productosRecomendados = [
        { nombre: "Anillo de Topacio", imagen: "https://imgur.com/UQ8u8Rm.png", precio: "1.500 €" },
        { nombre: "Anillo de Zafiro", imagen: "https://imgur.com/JiRrnyI.png", precio: "3.000 €" }
    ];

    const contenedorRecomendaciones = document.getElementById('productos-recomendados');
    contenedorRecomendaciones.innerHTML = '';

    productosRecomendados.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto-recomendado');
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <div class="producto-info">
                <h4>${producto.nombre}</h4>
                <p>Precio: ${producto.precio}</p>
                <button class="add-to-cart-btn">Añadir al carrito</button>
            </div>
        `;
        contenedorRecomendaciones.appendChild(div);
    });

    // Mostrar el área de recomendaciones
    document.getElementById('recomendaciones-pago').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  const wishlistButtons = document.querySelectorAll('.wishlist-btn');

 wishlistButtons.forEach(button => {
  button.addEventListener('click', () => {
    const producto = button.closest('.producto-item');
    const nombre = producto.querySelector('h3').textContent;
    const precioTexto = producto.querySelector('.price').textContent.replace('€', '').trim();
    const precio = parseFloat(precioTexto.replace(/\./g, '').replace(',', '.'));
    const imagen = producto.querySelector('img').src;
    const descripcion = producto.querySelector('p').textContent;

    let deseos = JSON.parse(localStorage.getItem('deseos')) || [];

    if (!deseos.some(p => p.nombre === nombre)) {
      deseos.push({ nombre, precio, imagen, descripcion });
      localStorage.setItem('deseos', JSON.stringify(deseos));

      // ✅ Notificación visual
      const wishlistNotification = document.getElementById('wishlist-notification');
      wishlistNotification.classList.add('show');
      setTimeout(() => wishlistNotification.classList.remove('show'), 3000);
    }
  });
});
});

  window.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash;

    if (hash) {
      // Si existe un ancla en la URL
      const objetivo = document.querySelector(hash);
      
      if (objetivo) {
        // Si la sección está dentro de un desplegable, abrimos ese desplegable
        const desplegable = objetivo.closest('.contenido-desplegable');
        if (desplegable && desplegable.classList.contains('cerrado')) {
          desplegable.classList.remove('cerrado');
          desplegable.classList.add('abierto');
        }

        // Luego hacemos scroll a la sección (después de abrir)
        setTimeout(() => {
          objetivo.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Espera un poco para asegurarse de que esté visible
      }
    }
  });

 document.addEventListener('DOMContentLoaded', () => {
  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';
  const consentGiven = localStorage.getItem('cookiesAccepted');

  // Mostrar solo si no es index.html y no se ha aceptado
  if (!isIndex && !consentGiven) {
    document.getElementById('cookie-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Bloquear scroll
  }

  document.getElementById('accept-cookies-btn').addEventListener('click', () => {
    const email = document.getElementById('email-input').value;

    if (!email || !validateEmail(email)) {
      alert("Por favor, introduce un email válido.");
      return;
    }

    // Aquí puedes conectar con tu backend si quieres guardar el email
    console.log("Email recogido:", email);

    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-overlay').style.display = 'none';
    document.body.style.overflow = ''; // Restaurar scroll
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});








