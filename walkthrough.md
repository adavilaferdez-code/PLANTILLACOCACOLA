# Documentación de la Aplicación Coca-Cola Plantillas

He configurado la **apertura directa del Catálogo Oficial 2025** a pantalla completa en una nueva pestaña al pulsar el botón flotante (`#fab-catalog`), eliminando la ventana modal interna y asegurando la máxima nitidez y el uso 100% offline en tu iPad.

---

## 📖 Apertura del Catálogo en Nueva Pestaña (¡NUEVO!)

Se ha rediseñado la consulta del catálogo oficial en formato PDF para que sea directa y de máxima calidad:

*   **Apertura Directa "En Grande"**: Al pulsar el botón flotante azul del catálogo (`#fab-catalog`), la aplicación ya no abre ninguna ventana modal interna. En su lugar, abre directamente el PDF oficial (`assets/catalogo_2025.pdf`) en una nueva pestaña independiente de Safari a pantalla completa. Esto activa el lector nativo de iOS con el zoom táctil más fluido, máxima resolución y todas las herramientas de búsqueda del sistema.
*   **Eliminación del Modal Interno**: Se ha eliminado todo el código e interfaces del modal anterior (`#catalog-modal`) para agilizar la aplicación y liberar recursos de memoria en tu iPad.
*   **Eliminación del Buscador de la Plantilla**: Para optimizar el espacio en la pantalla de pedidos, se ha ocultado el cuadro de búsqueda principal ("Buscar producto o formato..."). La navegación por la plantilla se realiza de forma limpia mediante las pestañas superiores y los desplegables de las categorías.
*   **Funcionamiento 100% Offline (Sin Cobertura)**: El archivo del catálogo sigue registrado en la base de recursos del Service Worker. Por lo tanto, aunque no tengas cobertura de internet durante tu ruta comercial, al pulsar el botón azul el PDF se abrirá de inmediato desde la memoria local de tu iPad.
*   **Service Worker v49**: Se ha incrementado la versión de caché a `cocacola-plantillas-v49` para forzar la actualización en todos los iPads.

---

## ✉️ Restauración del Envío por Correo (¡NUEVO!)

Se ha corregido el comportamiento del botón de correo (`#fab-email`):

*   **Selector de Destinos de Correo (¡NUEVO!)**: Al pulsar el botón de correo, se abre una ventana modal con tres opciones claras y directas:
    *   💼 **Outlook Corporativo (M365)**: Abre una pestaña en Safari con la composición en `outlook.office.com`.
    *   🔥 **Hotmail / Outlook Personal**: Abre una pestaña con la composición en `outlook.live.com`.
    *   📱 **App del Sistema**: Abre la aplicación predeterminada del iPad (Apple Mail).
*   **Copiado Automático en Portapapeles**: El sistema copia en segundo plano la propuesta en tu portapapeles por seguridad. Si tu cuenta no está iniciada en Safari, puedes crear un nuevo correo y **pegar** el texto directamente.
*   **Service Worker v44**: Se ha incrementado la versión a `cocacola-plantillas-v44` para aplicar esta mejora.

---

## 📄 Marca de Agua Oficial de Coca-Cola en el PDF (¡NUEVO!)

Se ha añadido un efecto premium de papel timbrado para las plantillas impresas o guardadas en PDF:

*   **Logotipo en el Fondo (Estilo Relieve)**: En el centro del fondo de cada página del PDF, se incrusta el logotipo clásico de Coca-Cola girado y centrado de forma sutil.
*   **Contraste y Opacidad Calibrados**: Configurada una opacidad óptima del 10% que da un aspecto de papel de carta corporativo oficial visible pero sin entorpecer ni restar legibilidad al texto de las tablas del pedido.
*   **Multi-página Inteligente**: Se repite y centra automáticamente en el fondo de cada página si el pedido es largo y se divide en varias hojas.
*   **Compatibilidad Total con Capas de Fondo**: Se utiliza una capa superpuesta con `z-index: 10000` (encima de los contenedores pero debajo de las interacciones gracias a `pointer-events: none`). De este modo, no se oculta por el fondo blanco de las tablas ni de los contenedores de datos.
*   **Uso de Imagen Directa (Sin Bloqueos)**: Se implementa mediante una etiqueta de imagen directa `<img>` en lugar de una imagen de fondo CSS, asegurando que se imprima siempre en todos los iPads sin importar la configuración de "Imprimir gráficos de fondo" del navegador.
*   **Service Worker v40**: Se ha incrementado la versión a `cocacola-plantillas-v40` para aplicar esta mejora.

---

## 📍 Geolocalización en Tiempo Real en Cabecera (¡NUEVO!)

Se ha añadido detección dinámica de ubicación en la barra superior:

*   **Identificación Automática**: En lugar de mostrar un "Badajoz" fijo, el sistema consulta al navegador tus coordenadas GPS en segundo plano cuando abres la aplicación.
*   **Geocodificación Inversa**: Convierte la latitud y longitud a la localidad correspondiente en español a través de una API de geocodificación rápida y gratuita, cambiando el texto del distintivo de cabecera de forma automática (ej. si estás en Mérida, Almendralejo, o cualquier otro municipio, aparecerá el nombre del lugar).
*   **Aislamiento y Tolerancia a Fallos**: Si la localización está desactivada o no hay conexión de datos, la cabecera se mantendrá por defecto en "Badajoz" para no entorpecer el funcionamiento del pedido.
*   **Service Worker v37**: Se ha incrementado la versión a `cocacola-plantillas-v37` para asegurar la recarga del módulo.

---

## 🏢 Simplificación del Campo de Cliente (¡NUEVO!)

Se han revertido por completo los cambios relacionados con el autocompletado y los iconos del cliente:

*   **Sin Desplegables**: El campo "Nombre del cliente..." funciona ahora como una caja de texto estándar. Al hacer foco o escribir, no se despliega ninguna lista de sugerencias.
*   **Sin Iconos / Emoticonos**: Se ha eliminado el icono SVG que se ubicaba a la izquierda del campo de texto, recuperando todo el ancho de la caja para la escritura cómoda.
*   **Service Worker v36**: Se ha incrementado la versión a `cocacola-plantillas-v36` para forzar la actualización instantánea en el iPad y otros dispositivos.

---

## 🛒 Modo de "Revisión Rápida" (¡NUEVO!)

Se ha incorporado la pestaña de **Revisión** en el menú de categorías del catálogo para agilizar el proceso de repaso de pedidos:

*   **Filtro Inteligente de Cantidades**: Al hacer clic en la pestaña roja **"Revisión"** (ubicada justo al lado de la opción "Todos"), la aplicación ocultará automáticamente cualquier producto del catálogo que tenga cantidad `0` o esté vacío.
*   **Auto-expansión de Categorías**: En esta vista, todas las secciones que contengan al menos un producto seleccionado se expandirán automáticamente para que puedas ver y repasar el pedido con el cliente al instante sin tener que desplegar las familias de forma manual.
*   **Tarjeta de Pedido Vacío**: Si no has ingresado cantidades todavía y pulsas en *"Revisión"*, se mostrará una elegante tarjeta indicando que el pedido está vacío, con un botón rápido para volver a la pestaña de "Todos los Productos".
*   **Service Worker v34**: Se ha incrementado la versión a `cocacola-plantillas-v34` para asegurar que el navegador actualice de inmediato la estructura y los scripts.

---

## 🔒 Notas del Pedido como Información Interna (¡NUEVO!)

Se ha actualizado el comportamiento de la caja de anotaciones:

*   **Exclusión en el PDF**: Se ha eliminado la fila de "Notas" del bloque de información del cliente en el PDF generado. Ahora las observaciones son 100% de uso interno dentro de la aplicación y no se mostrarán en el documento impreso o guardado en PDF.
*   **Service Worker v33**: Se ha incrementado la versión a `cocacola-plantillas-v33` para aplicar esta mejora.

---

## 📄 Personalización del Título de Impresión PDF (¡NUEVO!)

Se ha actualizado el diseño del reporte en PDF / vista de impresión:

*   **Título Principal del Reporte**: Se ha modificado el título del documento impreso de "Resumen de Pedido" a **"PLANTILLA COCACOLA"** en letras grandes, tal como has solicitado.
*   **Service Worker v32**: Se ha incrementado la versión a `cocacola-plantillas-v32` para aplicar esta mejora.

---

## 💾 Copia de Seguridad y Respaldo de Plantillas (¡NUEVO!)

Se ha incorporado un sistema de **Copia de Seguridad (Backup & Restore)** para asegurar que tus plantillas guardadas nunca se pierdan y puedan ser recuperadas en cualquier momento.

*   **Exportar Copia**: Dentro de la ventana de plantillas guardadas, ahora verás un botón llamado **"Exportar Copia"**. Al pulsarlo, se generará y descargará automáticamente un archivo de copia de seguridad con formato `.json` (ej: `coca_cola_plantillas_backup_2026-06-14.json`). Puedes guardar este archivo en la aplicación "Archivos" de tu iPad, enviarlo por WhatsApp o guardarlo en iCloud.
*   **Importar Copia**: Si cambias de iPad, borras el historial o reinstalas la PWA por completo, puedes pulsar el botón **"Importar Copia"** para subir tu archivo de respaldo anterior. El sistema leerá el archivo e importará y fusionará todas tus plantillas guardadas al instante.
*   **Seguridad de Datos**: Tus plantillas locales **no se borran al actualizar la aplicación** (los archivos en el servidor de hosting), ya que la memoria local (`localStorage`) está asociada de forma permanente a la dirección URL de tu web. Este sistema te da total tranquilidad en caso de borrar el icono de acceso directo del iPad por error o formatear el dispositivo.
*   **Service Worker v31**: Se ha incrementado la versión a `cocacola-plantillas-v31` para aplicar esta mejora.

---

## ⚡ Corrección de Parpadeo de Cabecera en iPad Safari (¡NUEVO!)

Se han solucionado los parpadeos visuales (flickering) que sufría la barra superior (`#app-header`) al transicionar entre el Dashboard y la Plantilla, o al hacer scroll en iPads. Las correcciones aplicadas son:

*   **Histéresis Estructurada**: El evento de scroll ahora requiere superar `120px` para contraer la cabecera, pero no volverá a expandirse hasta subir por encima de `80px`. Este margen de amortiguación de `40px` previene los bucles continuos causados por el cambio de tamaño del layout (de `60px` a `48px`), el cual hacía saltar el scroll de forma repetitiva.
*   **Auto-expansión Inteligente**: Al hacer focus en cualquier input (de forma automática por `startOrder` o mediante la navegación de la botonera "Sig. ➡️"), la categoría correspondiente se expande automáticamente en el DOM antes del desplazamiento. Esto evita que el navegador intente hacer scroll a celdas ocultas o de altura cero.
*   **Scroll Directo e Instantáneo**: En el teclado virtual, se ha configurado el posicionamiento a `behavior: 'auto'` para evitar conflictos entre las animaciones de scroll suave del navegador y el teclado o los reajustes de tamaño de la cabecera.
*   **Reinicio Limpio**: Tanto `startOrder` como `resetAll` ahora fuerzan el estado de cabecera no-contraída (`isScrolled = false`) de manera explícita para evitar que estados previos interfieran en las transiciones de pantalla.
*   **Limpieza de Código CSS**: Se han eliminado definiciones de reglas duplicadas e idénticas en `styles.css`.
*   **Mejora de Contraste y Visibilidad**: Se ha modificado el estilo de los campos de entrada de la cabecera (Nombre de cliente, Fecha y Notas del pedido). Ahora tienen un fondo blanco opaco (`#FFFFFF`), un borde más grueso y oscuro (`1.5px solid rgba(0,0,0,0.15)`) y una sutil sombra en lugar de la anterior caja translúcida grisácea que apenas se distinguía en pantallas de iPad con brillo elevado.
*   **Saludo Personalizado**: Se ha cambiado el título de bienvenida en el Dashboard a *"¡Hola, Antonio Dávila!"* para ajustarse al nombre completo del usuario.
*   **Service Worker v30**: Se ha incrementado la versión a `cocacola-plantillas-v30` para que los navegadores recarguen los nuevos scripts y estilos automáticamente.

---

## 📝 Nueva Función de Anotaciones: Opción A (¡NUEVO!)

Se ha incorporado un cuadro de texto general de observaciones con las siguientes especificaciones:

*   **Entrada de Datos en Pantalla**: En el panel superior de datos del cliente, debajo del nombre y de la fecha, ahora se muestra una caja de texto con fondo blanco y bordes contrastados con el placeholder *"Notas y observaciones del pedido (ej: Entregar por la tarde)..."*.
*   **Guardado Automático y Plantillas**: Las notas escritas se guardan en tiempo real en LocalStorage (autoguardado). Al guardar el pedido como una plantilla con nombre y cargarla posteriormente, las anotaciones se recuperan intactas.
*   **Limpieza de Pedido**: El botón de limpiar cantidades a cero o iniciar un nuevo pedido limpia el cuadro de texto para evitar arrastrar anotaciones anteriores.
*   **Mensaje de WhatsApp**: Si escribes alguna nota, se añadirá de forma clara y limpia al final del texto estructurado que se envía por WhatsApp:
    `📝 Notas: Entregar antes de las 14:00`
*   **Impresión en PDF**: El informe impreso en papel o PDF incluye una nueva línea de observaciones en la cuadrícula de información superior. Si no hay notas, no se imprime nada, manteniendo el documento compacto.

### ⚙️ Service Worker v26
*   Se ha incrementado la versión de caché del Service Worker a `cocacola-plantillas-v26` para asegurar que las PWAs carguen el nuevo código modificado instantáneamente.

---

## 🛠️ Historial de Mejoras Previas

*   **📱 Icono con Botella Coca-Cola (v25)**: Acceso directo premium con fondo rojo y silueta minimalista de la botella contorno.
*   **💧 Cambio de Agua VR 305 a VR 365 (v23)**: Categoría y producto actualizados en aguas.
*   **✍️ Tipografía Outfit (v22)**: Reemplazo de la tipografía Inter por Outfit en toda la aplicación.
*   **🎨 Diseño de Cabecera: Opción C (v21)**: Logotipo circular, insignia de Badajoz con punto verde de estado y botonera unificada.
*   **🚫 Eliminación de Emojis en la Interfaz (v19)**: Eliminación de emoticonos de las pestañas y dashboard.

---

## 🧪 Instrucciones para Pruebas en iPad / iPhone

1.  **Subir los archivos actualizados**:
    *   Copia los archivos actualizados desde la carpeta `cocacola-plantillas` en tu **Escritorio** a tu hosting habitual (como Netlify Drop).
2.  **Actualizar la Aplicación**:
    *   Abre la PWA en tu dispositivo.
    *   El Service Worker detectará la versión `v26` y actualizará la aplicación.
3.  **Verificación**:
    *   Prueba a escribir una nota en el nuevo cuadro (ej: *"Entregar el lunes"*).
    *   Guarda la plantilla, vacía las cantidades para confirmar que se limpia, y vuelve a cargar tu plantilla para comprobar que la nota se recupera.
    *   Genera un PDF o comparte por WhatsApp para validar que las observaciones se adjuntan correctamente.
