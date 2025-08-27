/* === FUNCIONES JAVASCRIPT === */

/* Función que muestra la lista de servicios disponibles */
/* PARA EDITAR: Cambiar el texto dentro de alert() por tus servicios */
function mostrarServicios() {
  alert("Ofrecemos coaching y talleres:\n\n• Grupal\n• Individualizado\n• Organizacional\n• Atletas");
}

/* Función para agregar contacto - Compatible con móviles */
function agregarContacto() {
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Myrna Ayala
N:Ayala;Myrna;;;
ORG:Metas Coaching Group;
TEL;TYPE=CELL:787-903-4242
EMAIL:metascoaching.group@gmail.com
URL:https://metas-coaching-group.vercel.app/
ADR:;;Caguas;Puerto Rico;;;
NOTE:Nuestro enfoque es dirigido a personas, equipos y organizaciones en sus procesos de transformación y crecimiento, a través de programas de coaching profesional y talleres especializados.
END:VCARD`;

  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Para dispositivos móviles, crear un enlace temporal y hacer click
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Myrna_Ayala_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    
    // Limpiar después de un breve delay
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  } else {
    // Para desktop, usar el método tradicional
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Myrna_Ayala_Contacto.vcf';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

/* Función para compartir la Business Card Page */
function compartirCard() {
  // URL de la página actual
  const url = window.location.href;
  const title = "Metas Coaching Group - Business Card";

  // Verificar si el navegador soporta la API Web Share (principalmente móviles)
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).then(() => {
      console.log('Compartido exitosamente');
    }).catch((error) => {
      console.log('Error al compartir:', error);
      // Fallback si falla el share nativo
      fallbackShare(url, title, text);
    });
  } else {
    // Fallback para navegadores que no soportan Web Share API
    fallbackShare(url, title, text);
  }
}

/* Función de respaldo para compartir en navegadores sin Web Share API */
function fallbackShare(url, title, text) {
  // Copiar URL al portapapeles
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      alert('¡Link copiado al portapapeles!\n\nAhora puedes pegarlo en cualquier app para compartir.');
    }).catch(() => {
      // Método alternativo si falla clipboard
      copyToClipboardFallback(url);
    });
  } else {
    // Método alternativo para navegadores más antiguos
    copyToClipboardFallback(url);
  }
}

/* Método alternativo para copiar al portapapeles */
function copyToClipboardFallback(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    alert('¡Link copiado al portapapeles!\n\nAhora puedes pegarlo en cualquier app para compartir.');
  } catch (err) {
    // Si todo falla, mostrar el URL para que lo copien manualmente
    prompt('Copia este link para compartir:', text);
  }
  
  document.body.removeChild(textArea);
}
