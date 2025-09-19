# Proyecto MCR - Gestión y Optimización de Archivos MCR

## Descripción

Este proyecto tiene como objetivo mejorar la gestión, manipulación y optimización de archivos MCR, facilitando la edición, limpieza, comparación y visualización de comandos en dichos archivos. Está diseñado para ejecutarse y desarrollarse eficientemente en **Replit Starter**, aprovechando sus capacidades y respetando sus limitaciones de recursos y tiempo de ejecución.

---

## ⚡ Recomendaciones para usar en Replit Starter

- **Trabaja en fases:** Ejecuta y prueba cada fase/funcionalidad de forma independiente.
- **Procesa archivos de uno en uno:** Evita procesar grandes lotes o realizar tareas pesadas en simultáneo.
- **Evita dejar servidores corriendo:** Detén el repl al terminar cada prueba para ahorrar tus horas de ejecución mensuales.
- **Descarga y respalda archivos importantes:** Guarda localmente o sube a GitHub los archivos generados, ya que los repls pueden reiniciarse.
- **Haz commits frecuentes:** Así no pierdes avances.
- **Para procesamiento de imágenes:** Usa muestras pequeñas y pocas imágenes por vez.
- **Si llegas al límite de recursos:** Considera optimizar el código o migrar a un plan superior.

---

## Fases del Proyecto

### 1. Herramientas de Análisis y Limpieza ✅
- Calcular y visualizar la duración total de archivos MCR.
- Alargar archivos a una duración objetivo, repitiendo y humanizando el contenido.
- Eliminar comandos de mouse y/o delays de 0 ms.
- Opción automática para limpiar comandos al subir archivos.

### 2. Comparación y Optimización Inteligente ✅ (con limitación de tiempo real)
- Comparar dos archivos y fusionar los patrones comunes, humanizando delays.
- Generar un archivo MCR optimizado a partir de dos seleccionados.
- **Limitación actual:** La lista de archivos no se actualiza en tiempo real tras "Optimize & Merge" (requiere recarga manual por un problema de WebSocket).

### 3. Editor de Teclado Visual 🚧 (En progreso)
- Interfaz gráfica que representa un teclado para editar comandos de un MCR de forma visual.
- Permite agregar, quitar o marcar teclas para ignorar.
- **Problema actual:** Error `isCommandEqual is not defined` al humanizar archivos.

### 4. Optimización Basada en Imágenes 🌱 (Visión a largo plazo)
- Utilizar imágenes de referencia para optimizar rutas de mouse y acciones.
- Requiere procesamiento ligero de imágenes si se prueba en Replit Starter.

---

## Cómo ejecutar en Replit Starter

1. **Abre el proyecto en Replit.**
2. Ejecuta la fase o script que desees probar.  
   - Por ejemplo: análisis de duración, limpieza, comparación, etc.
3. Sube o descarga archivos MCR según sea necesario.
4. Detén el repl después de cada sesión para ahorrar recursos.
5. Haz commits frecuentes a este repositorio para respaldar tu avance.
6. Si pruebas la fase de imágenes, usa archivos pequeños y pocas pruebas por sesión.

---

## Recursos y Dependencias

- **Lenguajes principales:** MAXScript, TypeScript, JavaScript, HTML, CSS.
- **Librerías:** Solo instala las necesarias para la funcionalidad que estés probando.
- **No se usan dependencias pesadas** (como OpenCV) por defecto; si llegas a necesitarlas, hazlo en pruebas controladas.

---

## Contribuciones y Mejoras

- Si encuentras un error o limitación, documenta el problema en la sección de Issues.
- Sugiére mejoras basadas en la experiencia de uso en Replit Starter.
- Para tareas pesadas, considera migrar a un entorno con más recursos.

---

## Estado Actual

Consulta el archivo `resumen_proyecto_mcr.txt` para ver el estado y progreso detallado de cada fase.

---

**¡Este proyecto está optimizado para Replit Starter! Sigue las recomendaciones y podrás desarrollarlo dentro de sus capacidades.**

---

## Resumen de Progreso y Estado del Proyecto

Resumen del Proyecto MCR
Fecha: 18 de septiembre de 2025
Agente: Gemini CLI
Objetivo General: Mejorar la gestión, manipulación y optimización de archivos MCR.

---

Fase 1: Herramientas de Análisis y Limpieza (Completada)

*   **Cálculo y Visualización de Duración:** Se añadió la capacidad de ver la duración total de cada archivo MCR en la interfaz.
*   **Extensión a Duración Específica:** Se implementó la función para alargar un MCR a un tiempo objetivo, repitiendo y humanizando su contenido.
*   **Limpieza de Comandos:** Se añadió una herramienta para eliminar comandos de mouse y/o delays de 0 milisegundos de los archivos MCR existentes.
*   **Eliminación de Mouse al Subir:** Se agregó una opción para eliminar automáticamente los comandos de mouse de un archivo MCR al momento de subirlo.

---

Fase 2: Comparación y Optimización Inteligente (Completada - con limitación en tiempo real)

*   **Objetivo:** Generar un único archivo MCR optimizado a partir de dos archivos comparados, sin mostrar fragmentos intermedios.
*   **Detección de Patrones:** El sistema identifica secuencias de teclas comunes entre dos archivos MCR.
*   **Regla de Optimización:** Para los patrones comunes, se crea una nueva versión con delays aleatorios (humanizada), en lugar de elegir la más rápida o una existente.
*   **Fusión Automática:** Al seleccionar dos archivos y usar "Optimize & Merge", el sistema toma uno como base, reemplaza los patrones comunes con sus versiones optimizadas y genera un nuevo archivo MCR fusionado y optimizado.
*   **Limitación Conocida:** La actualización de la lista de archivos en tiempo real después de la operación "Optimize & Merge" no funciona debido a un problema persistente con la conexión WebSocket (`ws://localhost:undefined`). El archivo se crea correctamente y aparece en la lista tras una recarga manual de la página.

---

Fase 3: Editor de Teclado Visual (Completada - funcionalidad básica)

*   **Objetivo:** Crear una interfaz gráfica de usuario que represente un teclado, permitiendo al usuario seleccionar teclas para excluir de un MCR de forma visual e interactiva.
*   **Estado:** Completada (funcionalidad básica).
*   **Progreso:** Se ha implementado el diseño básico del teclado y la selección de archivos MCR. Se ha añadido la funcionalidad de marcar teclas para ignorar y guardarlas en la configuración del archivo.
*   **Mejoras:** Se ha corregido un problema de interfaz de usuario donde la visualización del MCR cubría el botón de guardar en el editor de teclado. La funcionalidad de exclusión de teclas ahora se aplica correctamente durante el procesamiento del archivo.
*   **Nota:** La funcionalidad de "humanización" avanzada que causaba errores ha sido deshabilitada temporalmente en esta fase para asegurar la estabilidad. Las teclas excluidas se guardan en la configuración del archivo para su uso en futuras implementaciones de procesamiento.

---

Fase 4: Optimización Basada en Imágenes (En Progreso)

*   **Objetivo:** Utilizar imágenes (capturas de pantalla) como referencia para optimizar rutas de mouse y otras acciones en los MCR.
*   **Concepto:** Implicaría visión por computadora para identificar elementos en la imagen y relacionarlos con los comandos MCR.
*   **Estado:** En Progreso.
*   **Progreso:**
    *   **Gestión de Imágenes:** Implementada la carga y visualización de imágenes.
    *   **Asociación MCR-Imagen:** Implementada la funcionalidad para asociar archivos MCR con imágenes.
    *   **Generación Interactiva de MCR:** Implementada la capacidad de generar comandos de ratón haciendo clic en la imagen asociada dentro del editor de teclado.
*   **Problemas Actuales:**
    *   **Error 500 en cálculo de duración:** Persiste un error 500 al calcular la duración de algunos archivos MCR, posiblemente debido a contenido malformado.
    *   **Error "potential loop detected":** Un error interno del agente que impide la ejecución de comandos.

---

**Copia de Seguridad del Proyecto**

*   **Copia de Código:** Se ha creado un archivo ZIP con el código del proyecto en: `C:\Users\Maq4\Desktop\repo-master\repo-master_backup.zip`
*   **Copia de Base de Datos:** Para la base de datos, se recomienda usar `pg_dump`. Consulta las instrucciones proporcionadas por Gemini CLI para más detalles.