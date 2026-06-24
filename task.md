# Tareas de Implementación: Dashboard y Descuento en Euros

## Fase 1: Estructura HTML (`index.html`)
- [x] Crear el contenedor de inicio `#dashboard-view` con accesos rápidos y cuadrícula de grupos.
- [x] Envolver el catálogo actual en el contenedor `#catalog-view` e iniciarlo oculto.

## Fase 2: Estilos Visuales (`css/styles.css`)
- [x] Diseñar los estilos visuales premium del Dashboard (tarjetas de cristal, sombras de grupo y botones flotantes).
- [x] Añadir clases para transiciones fluidas de salida (`fade-out`) y entrada (`fade-in`).
- [x] Diseñar el estilo de las columnas y los inputs de `.dtoeur-input` (con placeholder `0 €`).
- [x] Ajustar la media query móvil para la tarjeta de producto para incluir el descuento en euros si es aplicable.

## Fase 3: Lógica de la Aplicación (`js/app.js`)
- [x] Crear la función `hasEuroDiscount(p, cat)` para filtrar solo Sprite, Royal Bliss y Monster 250ml.
- [x] Programar la función `startOrder(groupFilter)` para ocultar el Dashboard e iniciar el catálogo.
- [x] Modificar `renderCategory(cat)` para inyectar dinámicamente la columna "Dto €" solo en categorías elegibles.
- [x] Modificar la función `onInputChange()` para aplicar primero el `% Dto` y luego restar el `Dto €`.
- [x] Adaptar `updateCategoryTotal` and `updateGlobalTotals` para computar correctamente el descuento en euros.
- [x] Adaptar `getState`, `loadState` y `resetAll` para soportar la persistencia del nuevo descuento.
- [x] Configurar el virtual keypad para soportar el foco y control en los campos `.dtoeur-input`.

## Fase 4: Botón para Poner Cantidades a Cero
- [x] Añadir el botón `#btnClearQty` en la cabecera de `index.html`.
- [x] Implementar la función `clearAllQuantities()` en `js/app.js` para reiniciar cantidades respetando cliente y descuentos.
- [x] Registrar el evento de clic en `setupEventListeners()`.
- [x] Incrementar el Service Worker a la versión `v8` (`sw.js`).
- [x] Sincronizar los archivos al Escritorio (`C:\Users\Adfgd\Desktop\cocacola-plantillas\`).

## Fase 5: Ajuste de Animación (Efecto Pulso)
- [x] Modificar la animación `.pulse` en `css/styles.css` para utilizar `display: inline-block` y `will-change`.
- [x] Reducir la escala a `1.02` y añadir un destello de sombra (`text-shadow`) para evitar el jitter/zoom de pantalla en dispositivos móviles.
- [x] Remover la definición duplicada de la animación en `css/styles.css`.
- [x] Incrementar el Service Worker a la versión `v9` (`sw.js`).
- [x] Sincronizar todos los archivos actualizados al Escritorio.

## Fase 6: Integración del Logo Oficial de Coca-Cola
- [x] Copiar la imagen del logo oficial `logo.jpg` a la carpeta `assets/` en desarrollo y Escritorio.
- [x] Reemplazar los logos SVG circulares con etiquetas `img` que apuntan al logo oficial en la pantalla del Dashboard y en la cabecera.
- [x] Crear estilos CSS específicos para el banner del Dashboard (`.dashboard-brand-banner`, `.brand-logo-img`) y el mini distintivo de la cabecera (`.header-logo-img`).
- [x] Incrementar el Service Worker a la versión `v10` (`sw.js`).
- [x] Sincronizar todos los archivos actualizados al Escritorio.

## Fase 7: Enviar Propuesta por Correo Electrónico
- [x] Añadir el botón flotante `#fab-email` en `index.html` con el icono de un sobre de carta.
- [x] Implementar la función `shareEmail()` en `js/app.js` para redactar una propuesta de pedido formal.
- [x] Diseñar el formato de tabla de texto utilizando caracteres de caja Unicode (┌ ─ ┬ ┐ │ ├ ┼ ┤ └ ┴ ┘) y funciones de padding para centrar/alinear las columnas.
- [x] Configurar la posición de `.fab-email` en `css/styles.css` (apilado verticalmente sobre el botón de WhatsApp) con soporte para safe-area.
- [x] Incrementar el Service Worker a la versión `v12` (`sw.js`).
- [x] Sincronizar todos los archivos actualizados al Escritorio.

## Fase 8: Generación de PDF / Impresión de Pedido (Estilo de la Foto)
- [x] Añadir el botón `#btnPrint` en la cabecera de `index.html`.
- [x] Añadir el contenedor `#print-area` al final de `index.html`.
- [x] Crear los estilos `@media print` y clases asociadas en `css/styles.css`.
- [x] Implementar la función `generatePDF()` en `js/app.js` para renderizar y abrir el diálogo de impresión.
- [x] Registrar el evento de clic en `setupEventListeners()` de `js/app.js`.
- [x] Añadir el logo de Coca-Cola a la lista de recursos del Service Worker y subir versión a `v13`.
- [x] Sincronizar todos los archivos al Escritorio.

## Fase 9: Descuento en Euros Global para todos los productos
- [x] Eliminar las restricciones de productos elegibles de la función `hasEuroDiscount` en `js/app.js`.
- [x] Mostrar la columna y casillas de "Dto €" en todas las categorías y productos de forma uniforme.
- [x] Incrementar la versión del Service Worker a `v15` para incluir el desglose en el PDF e imprimir, y sincronizar al Escritorio.

## Fase 10: Eliminación de la Fecha de Envío en PDF
- [x] Eliminar la "Fecha envío" y renombrar "Fecha pedido" a "Fecha" en la cabecera de información del PDF.
- [x] Incrementar la versión del Service Worker a `v18` y sincronizar al Escritorio.

## Fase 11: Corrección de Parpadeo de Cabecera (¡NUEVO!)
- [x] Implementar histéresis en `handleHeaderScroll()` en `js/app.js` (despliegue 120px, repliegue 80px).
- [x] Auto-expandir la sección de la categoría al enfocar un input.
- [x] Cambiar scroll de `smooth` a `auto` en el posicionamiento de la fila del teclado virtual.
- [x] Limpiar estado de cabecera contraída en `startOrder()` y `resetAll()`.
- [x] Auto-expandir categorías con productos cargados en `loadState()`.
- [x] Eliminar estilos de cabecera duplicados en `css/styles.css`.
- [x] Incrementar el Service Worker a `v28` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.
- [x] Mejorar visibilidad y contraste de los inputs superiores (Nombre, Fecha, Notas) usando fondo blanco, bordes más oscuros y sombras para que no pasen desapercibidos en pantallas con brillo alto en iPad.
- [x] Cambiar el saludo de bienvenida en el Dashboard a "¡Hola, Antonio Dávila!".
- [x] Incrementar el Service Worker a `v30` y sincronizar al Escritorio.

## Fase 12: Copia de Seguridad y Respaldo de Plantillas (¡NUEVO!)
- [x] Añadir botones de Exportar copia e Importar copia en la ventana modal de plantillas en `index.html`.
- [x] Diseñar los estilos visuales del pie del modal (`.modal-footer`) y botones en `css/styles.css`.
- [x] Implementar la función `exportBackup()` en `js/app.js` para generar y descargar un archivo `.json`.
- [x] Implementar la función `importBackup()` en `js/app.js` para leer y fusionar plantillas importadas.
- [x] Incrementar el Service Worker a `v31` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.

## Fase 13: Actualización del Título del PDF (¡NUEVO!)
- [x] Cambiar el título principal en el PDF generado de "Resumen de Pedido" a "PLANTILLA COCACOLA" en `js/app.js`.
- [x] Incrementar el Service Worker a `v32` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.

## Fase 14: Notas de Pedido Internas (¡NUEVO!)
- [x] Ocultar las notas del bloque de información en el PDF generado para que sea de uso exclusivo interno del comercial en `js/app.js`.
- [x] Incrementar el Service Worker a `v33` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.

## Fase 15: Modo "Revisión Rápida" (¡NUEVO!)
- [x] Añadir el botón de pestaña "Revisión" en `index.html`.
- [x] Diseñar los estilos CSS para la pestaña de revisión y el panel de estado vacío en `css/styles.css`.
- [x] Modificar la función `applyFilters()` en `js/app.js` para ocultar filas vacías, auto-expandir categorías activas e inyectar el mensaje de "Pedido Vacío".
- [x] Incrementar el Service Worker a `v34` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.
## Fase 16: Simplificación del Campo de Cliente (Reversión) (¡NUEVO!)
- [x] Eliminar el contenedor de iconos y el desplegable de autocompletado en `index.html`.
- [x] Eliminar los estilos CSS del wrapper del cliente, posicionamiento de icono y sugerencias del desplegable en `css/styles.css`.
- [x] Eliminar la base de datos de clientes, diccionario de iconos y funciones de autocompletado en `js/app.js`.
- [x] Limpiar hooks de actualización y reseteo de iconos en `js/app.js`.
- [x] Incrementar el Service Worker a `v36` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.

## Fase 17: Geolocalización en Tiempo Real (¡NUEVO!)
- [x] Envolver el texto de Badajoz en un span con ID `currentLocationText` en `index.html`.
- [x] Implementar la función `updateLocation()` en `js/app.js` para consultar el GPS del navegador.
- [x] Realizar llamada a geocodificación inversa con soporte multi-idioma (español) y manejo de errores.
- [x] Registrar la llamada de actualización de ubicación en `init()` en `js/app.js`.
- [x] Incrementar el Service Worker a `v37` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.

## Fase 18: Marca de Agua Oficial en el PDF (¡NUEVO!)
- [x] Inyectar dinámicamente un elemento `.print-watermark` con una etiqueta `<img>` en `js/app.js` dentro de `generatePDF()`.
- [x] Diseñar los estilos CSS de `.print-watermark` y `.print-watermark img` en `css/styles.css` con opacidad del 4% e inclinación de -15 grados.
- [x] Ajustar el z-index a 10000 y usar `pointer-events: none` para evitar que las capas de fondo blanco u otros elementos tapen la marca de agua.
- [x] Incrementar el Service Worker a `v39` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.

## Fase 19: Corrección del Botón de Correo (¡NUEVO!)
- [x] Eliminar llamada incorrecta a `generatePDF()` en `shareEmail()` en `js/app.js`.
- [x] Re-implementar la función `shareEmail()` para compilar los productos del pedido actual en un formato de texto estructurado con tabla Unicode.
- [x] Implementar ventana modal interactiva con selección de destino de correo (Outlook Corporativo M365, Hotmail/Outlook Personal, App nativa Mailto).
- [x] Mantener el copiado al portapapeles automático en segundo plano como plan de respaldo para cuentas corporativas.
- [x] Incrementar el Service Worker a `v44` en `sw.js`.
- [x] Sincronizar todos los archivos modificados en la carpeta del Escritorio.

## Fase 20: Visor de Catálogo Oficial 2025 Integrado (¡NUEVO!)
- [x] Copiar el archivo PDF del catálogo oficial 2025 a `assets/catalogo_2025.pdf`.
- [x] Añadir el botón flotante `#fab-catalog` y el modal `#catalog-modal` con `iframe` en `index.html`.
- [x] Crear estilos CSS específicos para `.fab-catalog`, `.catalog-modal` y su comportamiento responsivo en `css/styles.css`.
- [x] Implementar la lógica de control del modal `openCatalogModal()` y `closeCatalogModal()` en `js/app.js`.
- [x] Implementar la barra `.catalog-modal-nav` con los botones de accesos rápidos por familias y la función `jumpToCatalogPage(pageNumber)` en `js/app.js`.
- [x] Registrar el archivo PDF en `sw.js` para almacenamiento offline y actualizar versión a `v46`.
- [x] Sincronizar todos los archivos modificados a la carpeta del Escritorio.
