
# **Documento de Requerimientos del Sistema Synapse**

Sistema de guía y perfilamiento estudiantil.

---

# **1. Requerimientos Funcionales (RF)**

A continuación se listan **70 requerimientos funcionales**, organizados por módulos, cada uno con **criterios de aceptación** y **restricciones**.

---

## **1.1. Módulo de Autenticación y Usuarios**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF01|El sistema debe permitir el registro de nuevos usuarios mediante correo y contraseña.|El usuario registra correo único y contraseña válida.|No se permiten correos duplicados.|
|RF02|El sistema debe validar que el correo no exista previamente.|Si existe, muestra error inmediato.|Comparación estricta contra base de datos.|
|RF03|El sistema debe permitir inicio de sesión.|Ingreso correcto dirige al dashboard.|Máx. 5 intentos fallidos.|
|RF04|El sistema debe permitir recuperación de contraseña.|Envío de enlace funcional al correo registrado.|El correo debe estar registrado.|
|RF05|El sistema debe validar la fortaleza de la contraseña.|Mensajes dinámicos según nivel de seguridad.|Longitud mínima 8 caracteres.|
|RF06|El sistema debe cerrar sesión de forma segura.|Token invalidado al cerrar sesión.|Tiempo máximo de sesión: 24h.|
|RF07|El sistema debe permitir editar datos del perfil.|Cambios reflejados inmediatamente.|No se puede editar correo sin verificación.|
|RF08|El sistema debe permitir eliminar la cuenta.|Se envía advertencia y confirmación final.|Eliminación irreversible.|
|RF09|El sistema debe generar tokens seguros.|Tokens tienen expiración y renovación.|JWT obligatorio.|
|RF10|El sistema debe alertar intentos fallidos de login.|Al llegar a 3 intentos muestra advertencia.|Bloqueo temporal a los 5 intentos.|

---

## **1.2. Módulo de Cuestionario y Perfil**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF11|Mostrar cuestionario inicial obligatorio.|Se activa en primer ingreso.|No se puede omitir.|
|RF12|Guardar avances del cuestionario.|Retoma donde quedó.|Avances se guardan cada cambio.|
|RF13|Evaluar respuestas para identificar habilidades.|Algoritmo genera puntajes replicables.|Preguntas no editables por usuario.|
|RF14|Generar un perfil de habilidades.|Se muestran habilidades con porcentajes.|Solo una versión final activa.|
|RF15|Visualizar perfil en cualquier momento.|Acceso desde menú principal.|Requiere sesión activa.|
|RF16|Actualizar o repetir cuestionario.|Nuevo perfil reemplaza el anterior.|Solo 1 vez por día.|
|RF17|Almacenar historial de perfiles.|Historial ordenado por fecha.|Máx. 10 versiones antiguas.|
|RF18|Mostrar descripción de habilidades.|Cada habilidad tiene su texto explicativo.|Descripciones no editables.|
|RF19|Validar coherencia del cuestionario.|Preguntas dependientes visibles según respuestas.|Reglas de validación internas.|
|RF20|Generar puntaje por habilidad.|Puntajes consistentes en cada usuario.|Rango entre 0–100.|
|RF21|Permitir cuestionarios adicionales opcionales.|Se pueden activar desde ajustes.|No afectan el perfil base.|

---

## **1.3. Módulo de Carreras Recomendadas**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF22|Listar carreras recomendadas.|Mín. 5 recomendaciones basadas en perfil.|Solo carreras con coincidencia ≥60%.|
|RF23|Filtrar carreras por categoría.|Filtros aplican dinámicamente.|Categorías predefinidas.|
|RF24|Mostrar descripción de cada carrera.|Incluye resumen, funciones y actividades.|Texto no editable por usuarios.|
|RF25|Mostrar materias comunes.|Lista clara de materias introductorias.|Basadas en fuentes oficiales.|
|RF26|Mostrar estimaciones salariales.|Datos expresados por rango.|Se debe indicar país/región.|
|RF27|Mostrar problemas comunes de estudiantes.|Lista de desafíos típicos.|No incluir contenido ofensivo.|
|RF28|Justificar por qué la carrera fue recomendada.|Mostrar habilidades relacionadas.|Explicación basada en modelo de afinidad.|
|RF29|Permitir comparar dos carreras.|Vista comparativa con 5 criterios.|Máx. 2 simultáneas.|
|RF30|Permitir guardar carreras favoritas.|Se almacenan en sección “Favoritos”.|Máx. 20.|

---

## **1.4. Módulo de Rutas Previas / Mini Guías**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF31|Mostrar rutas de aprendizaje recomendadas.|Cada carrera debe tener al menos 1 ruta.|Rutas preconfiguradas.|
|RF32|Mostrar contenidos previos necesarios.|Contenidos ordenados por nivel.|No se permite edición de contenidos.|
|RF33|Acceso a recursos externos.|Enlaces funcionales.|No se permite contenido pirata.|
|RF34|Marcar contenido como completado.|Progreso cambia automáticamente.|Requiere usuario registrado.|
|RF35|Mostrar progreso de rutas.|Barra visual del porcentaje.|No editable manualmente.|
|RF36|Guardar rutas como favoritas.|Se listan en sección dedicada.|Máx. 10 rutas.|
|RF37|Recomendar rutas según habilidades.|Recomendación automática visible.|Base en puntaje ≥50%.|

---

## **1.5. Módulo de Instituciones**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF38|Listar instituciones recomendadas.|Coincidencia basada en carrera y ubicación.|Datos verificados.|
|RF39|Mostrar enlaces directos.|Enlace externo abre en nueva pestaña.|Enlaces deben ser oficiales.|
|RF40|Filtrar instituciones por ubicación.|Búsqueda por ciudad o región.|Ubicaciones predefinidas.|
|RF41|Mostrar guía de acceso académico.|Explica pasos básicos.|Textos no editables.|
|RF42|Comparar instituciones.|Comparación en al menos 3 criterios.|Máx. 2 instituciones.|
|RF43|Mostrar requisitos básicos de ingreso.|Información clara y actual.|Sujeto a disponibilidad oficial.|
|RF44|Permitir guardar instituciones favoritas.|Acceso rápido a información futura.|Máx. 10.|

---

## **1.6. Módulo Mascota IA / Asistente Inteligente**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF45|Incluir asistente virtual.|Mascota siempre disponible en interfaz.|No puede realizar acciones administrativas.|
|RF46|Responder preguntas del usuario.|Respuestas contextualizadas.|No puede emitir información falsa deliberadamente.|
|RF47|Explicar conceptos complejos.|Explicación en lenguaje claro.|No usar jerga confusa.|
|RF48|Mostrar mensajes contextuales.|Basados en la sección actual.|No intrusivos.|
|RF49|Sugerir acciones si el usuario se estanca.|Acciones relevantes detectadas tras 2 min de inactividad.|No puede bloquear navegación.|
|RF50|Permitir feedback del usuario.|Formulario disponible al final del chat.|Máx. 1 feedback por sesión.|
|RF51|Guardar historial de interacción.|Consultable por el usuario.|Máx. 30 días.|

---

## **1.7. Módulo de Interfaz, Navegación y Experiencia**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF52|Navegación basada en menús.|Accesible en todo momento.|No más de 6 opciones principales.|
|RF53|Modo claro/oscuro.|Cambio visible inmediato.|Preferencia guardada por usuario.|
|RF54|Notificaciones relevantes.|Deben ser visibles pero no invasivas.|No más de 3 notificaciones simultáneas.|
|RF55|Búsqueda global.|Resultados en menos de 2 segundos.|Indexa solo contenido permitido.|
|RF56|Configuración de preferencias.|Cambios persistentes tras guardar.|Algunas opciones requieren reiniciar sesión.|
|RF57|Historial de navegación mínima.|Permite volver a vistas recientes.|Máx. 10 elementos.|
|RF58|Validación visual de formularios.|Colores y mensajes claros.|No usar colores que afecten accesibilidad.|

---

## **1.8. Módulo de Gamificación (Nuevo)**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF59|Asignar insignias según avance.|Insignias visibles en perfil.|Máx. 20 insignias.|
|RF60|Mostrar nivel de usuario.|Nivel basado en actividades completadas.|Nivel máx.: 50.|
|RF61|Registrar puntos por interacción.|Se suman al instante.|No puede editarse manualmente.|
|RF62|Mostrar tablero de logros.|Ordenado por categorías.|Logros predefinidos.|

---

## **1.9. Módulo de Notificaciones y Comunicación**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF63|Enviar recordatorios de progreso.|Debe recibirse 1 vez al día.|Se puede desactivar.|
|RF64|Informar nuevas rutas recomendadas.|Notificación automática tras actualización de perfil.|Solo 1 notificación por actualización.|
|RF65|Enviar mensajes del asistente.|Mensajes relevantes y oportunos.|No enviar spam.|

---

## **1.10. Módulo Administrativo (Nuevo)**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RF66|Administrar contenido de carreras.|Panel permite CRUD de carreras.|Solo para admins.|
|RF67|Administrar rutas académicas.|CRUD de rutas y recursos.|Validación de enlaces obligatoria.|
|RF68|Administrar instituciones.|CRUD completo.|Datos deben ser verificados.|
|RF69|Consulta de métricas del sistema.|Vista con gráficos.|Solo lectura.|
|RF70|Administrar usuarios.|Bloqueo, activación o eliminación.|No se pueden editar contraseñas.|

---

# **2. Requerimientos No Funcionales (RNF)**

|Código|Requerimiento|Criterios de Aceptación|Restricciones|
|---|---|---|---|
|RNF01|Respuesta en <3s.|Pruebas de carga exitosas.|Excepto consultas pesadas.|
|RNF02|Disponibilidad 99%.|Logs deben demostrar uptime.|Excepto mantenimientos.|
|RNF03|Encriptar contraseñas (hashing).|Uso de hashing seguro.|No almacenar en plaintext.|
|RNF04|Protección contra ataques.|Pruebas OWASP aprobadas.|Revisiones trimestrales.|
|RNF05|Escalabilidad horizontal.|Soporta cargas simultáneas.|Arquitectura basada en microservicios.|
|RNF06|Cumplir WCAG AA.|Validaciones de contraste.|No usar fuentes ilegibles.|
|RNF07|Diseño responsive.|Ajuste correcto en móvil y PC.|Máx. 2 breakpoints adicionales.|
|RNF08|Logging de uso y errores.|Registro diario automático.|No almacenar datos sensibles.|
|RNF09|Manejo adecuado de errores.|Mensajes claros y no técnicos.|No revelar detalles del sistema.|
|RNF10|Compatibilidad multi navega|||