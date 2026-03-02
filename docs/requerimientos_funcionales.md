# 📋 Requerimientos Funcionales Activos - Sistema Brota

## Requisitos Funcionales del MVP

### RF1: Cuestionario Vocacional

**Prioridad:** Alta

El sistema debe permitir al estudiante completar un cuestionario vocacional que evalúe:

- Habilidades técnicas y blandas
- Intereses académicos y profesionales
- Vocación y motivaciones personales
- Condiciones socioeconómicas
- Disponibilidad de tiempo

**Criterios de aceptación:**

- Cuestionario completable de inicio a fin
- Preguntas claras y comprensibles
- Posibilidad de guardar progreso
- Validación de respuestas obligatorias

---

### RF2: Generación de Perfil Vocacional

**Prioridad:** Alta

El sistema debe generar un perfil de habilidades con porcentajes basado en las respuestas del cuestionario.

**Criterios de aceptación:**

- Perfil generado automáticamente al completar cuestionario
- Porcentajes por área vocacional
- Visualización clara del perfil
- Almacenamiento del perfil en base de datos

---

### RF3: Recomendación de Programas

**Prioridad:** Alta

El sistema debe recomendar programas educativos según el perfil del usuario.

**Criterios de aceptación:**

- Algoritmo de matching funcional
- Recomendaciones ordenadas por compatibilidad
- Mínimo 3 recomendaciones por usuario
- Filtrado automático de convocatorias vencidas

---

### RF4: Información Detallada de Programas

**Prioridad:** Media

El sistema debe mostrar información detallada de cada programa recomendado.

**Criterios de aceptación:**

- Nombre del programa e institución
- Duración y modalidad
- Requisitos de ingreso
- Descripción completa
- Información de contacto de la institución

---

### RF5: Comparación de Programas

**Prioridad:** Media

El sistema debe permitir comparar múltiples programas lado a lado.

**Criterios de aceptación:**

- Selección de hasta 3 programas para comparar
- Vista comparativa con atributos clave
- Fácil navegación entre programas

---

### RF6: Rutas de Aprendizaje Previas

**Prioridad:** Media

El sistema debe mostrar rutas de aprendizaje recomendadas antes de iniciar el programa.

**Criterios de aceptación:**

- Sugerencias de cursos preparatorios
- Recursos de aprendizaje relevantes
- Orden lógico de preparación

---

### RF7: Reporte Descargable

**Prioridad:** Media

El sistema debe generar un reporte descargable en PDF con los resultados.

**Criterios de aceptación:**

- Generación de PDF funcional
- Incluye perfil vocacional
- Incluye recomendaciones principales
- Diseño profesional y legible

---

### RF8: Filtro por Fecha de Convocatoria

**Prioridad:** Alta

El sistema debe filtrar automáticamente programas según fechas de convocatoria.

**Criterios de aceptación:**

- Ocultamiento automático de convocatorias vencidas
- Solo mostrar programas con convocatorias abiertas o próximas
- Actualización automática diaria

---

### RF9: Panel Administrativo - Gestión de Instituciones

**Prioridad:** Alta

El sistema debe permitir al administrador gestionar instituciones educativas.

**Criterios de aceptación:**

- Crear, editar y eliminar instituciones
- Activar/desactivar instituciones
- Búsqueda y filtrado de instituciones

---

### RF10: Panel Administrativo - Gestión de Programas

**Prioridad:** Alta

El sistema debe permitir al administrador gestionar programas académicos.

**Criterios de aceptación:**

- Crear, editar y eliminar programas
- Asociar programas a instituciones
- Definir perfil vocacional compatible

---

### RF11: Panel Administrativo - Gestión de Convocatorias

**Prioridad:** Alta

El sistema debe permitir al administrador gestionar convocatorias.

**Criterios de aceptación:**

- Crear, editar y eliminar convocatorias
- Definir fechas de apertura y cierre
- Asociar convocatorias a programas
- Notificación interna de convocatorias próximas

---

### RF12: Panel Administrativo - Visualización de Estadísticas

**Prioridad:** Media

El sistema debe mostrar estadísticas básicas de uso.

**Criterios de aceptación:**

- Número de cuestionarios completados
- Programas más recomendados
- Instituciones más populares
- Gráficos básicos de visualización

---

## Requisitos No Funcionales

### RNF1: Disponibilidad

El sistema debe estar disponible el 98% del tiempo.

### RNF2: Rendimiento

Las respuestas del sistema deben mostrarse en menos de 2 segundos.

### RNF3: Usabilidad

La interfaz debe ser clara, intuitiva y accesible para jóvenes entre 14 y 25 años.

### RNF4: Seguridad

Los datos de los estudiantes deben almacenarse de forma segura cumpliendo normativas de protección de datos.

### RNF5: Escalabilidad

El sistema debe permitir crecimiento futuro sin necesidad de reescritura completa.

---

## Fuera del Alcance (MVP)

❌ Scraping automático de información
❌ IA navegando internet en producción
❌ Notificaciones automáticas a usuarios
❌ Integración con sistemas de instituciones
❌ Aplicación móvil nativa
❌ Sistema de pagos
❌ Gamificación avanzada

---

[← Volver al inicio](00_START_HERE.md)
