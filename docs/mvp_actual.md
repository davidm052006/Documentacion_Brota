# 🎯 MVP Actual - Sistema Brota

## Objetivo del MVP

Construir un producto mínimo viable funcional que permita a estudiantes colombianos entre 14 y 25 años recibir orientación vocacional personalizada.

## Alcance del MVP

### Funcionalidades Core

#### 1. Cuestionario Funcional

- Cuestionario vocacional interactivo
- Preguntas sobre habilidades, intereses y vocación
- Consideración de condiciones socioeconómicas
- Evaluación de disponibilidad de tiempo
- Interfaz intuitiva y accesible

#### 2. Algoritmo Básico de Recomendación

- Procesamiento de respuestas del cuestionario
- Generación de perfil vocacional del estudiante
- Matching con programas educativos disponibles
- Recomendaciones personalizadas basadas en:
  - Habilidades identificadas
  - Intereses vocacionales
  - Contexto socioeconómico
  - Disponibilidad de tiempo

#### 3. Base Curada Inicial de Instituciones

- Catálogo curado de instituciones educativas colombianas
- Información verificada manualmente
- Programas académicos: universitarios, técnicos y no tradicionales
- Datos de contacto y ubicación
- Control de calidad sobre cantidad

#### 4. Filtro por Fecha de Convocatoria

- Sistema de convocatorias con fechas de apertura/cierre
- Ocultamiento automático de programas vencidos
- Notificaciones internas al equipo sobre convocatorias próximas
- Separación clara entre Programa y Convocatoria

#### 5. Panel Básico Interno para Control

- Panel administrativo para el equipo
- Gestión de instituciones y programas
- Control de convocatorias
- Visualización de resultados y estadísticas básicas

## Entidades Principales

### Institucion

Representa instituciones educativas colombianas.

### Programa

Representa programas académicos ofrecidos (carreras, técnicos, cursos).

### Convocatoria

Representa períodos de inscripción con fechas específicas.

- Separada de Programa para permitir control temporal
- Permite ocultamiento automático al vencer

### PerfilUsuario

Representa el perfil vocacional del estudiante generado por el cuestionario.

### Resultado

Almacena las respuestas del cuestionario del estudiante.

### Recomendacion

Representa las recomendaciones generadas para cada estudiante.

## Fuera del Alcance del MVP

❌ Scraping automático de información
❌ IA navegando internet en producción
❌ Sistema de notificaciones a usuarios
❌ Integración con sistemas externos de instituciones
❌ Aplicación móvil nativa
❌ Sistema de pagos
❌ Gamificación avanzada

## Principios del MVP

1. **Calidad sobre Cantidad**: Mejor tener 50 instituciones bien curadas que 500 con información incompleta
2. **Control Manual**: Información crítica verificada por el equipo
3. **Escalabilidad Futura**: Arquitectura preparada para crecer sin reescribir
4. **Funcionalidad Completa**: Cada feature del MVP debe estar 100% funcional

## Métricas de Éxito

- ✅ Cuestionario completable de inicio a fin
- ✅ Recomendaciones generadas correctamente
- ✅ Al menos 20 instituciones curadas en la base de datos
- ✅ Filtro de convocatorias funcionando automáticamente
- ✅ Panel administrativo operativo

---

[← Volver al inicio](00_START_HERE.md)
