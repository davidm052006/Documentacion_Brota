---
status: HISTORICAL
title: Concepto Estructural - Árbol de Conocimientos
description: Concepto de navegación obsoleto (basado en ramas)
---

> **[ESTADO: HISTÓRICO]**
> *Nota: Este concepto fue reemplazado por el "Sistema Planetario" (ver `concept-02-planetary-system.md`) debido a limitaciones de escalabilidad y para mejorar la experiencia de navegación.*

# 📊 (Histórico) Modelo de Datos Vigente - Sistema Brota

## Diagrama Entidad-Relación

![Modelo Entidad-Relación](<modelo-entidad-relacion-(MER).png>)

## Entidades Principales

### Institucion

Representa instituciones educativas colombianas que ofrecen programas académicos.

**Atributos clave:**

- Nombre de la institución
- Tipo (universidad, instituto técnico, etc.)
- Ubicación (ciudad, departamento)
- Información de contacto
- Estado (activa/inactiva)

**Relaciones:**

- Una Institución puede ofrecer múltiples Programas

---

### Programa

Representa programas académicos específicos (carreras, técnicos, cursos).

**Atributos clave:**

- Nombre del programa
- Tipo (universitario, técnico, no tradicional)
- Duración
- Modalidad (presencial, virtual, híbrida)
- Descripción
- Requisitos de ingreso
- Perfil vocacional compatible

**Relaciones:**

- Un Programa pertenece a una Institución
- Un Programa puede tener múltiples Convocatorias
- Un Programa puede aparecer en múltiples Recomendaciones

---

### Convocatoria

Representa períodos específicos de inscripción para programas.

**Atributos clave:**

- Fecha de apertura
- Fecha de cierre
- Estado (abierta/cerrada/próxima)
- Cupos disponibles
- Información adicional

**Relaciones:**

- Una Convocatoria pertenece a un Programa
- Separación de Programa permite control temporal independiente

**Lógica de negocio:**

- Ocultamiento automático cuando fecha de cierre < fecha actual
- Notificaciones internas cuando fecha de apertura está próxima

---

### PerfilUsuario

Representa el perfil del estudiante en el sistema.

**Atributos clave:**

- Datos demográficos (edad, ubicación)
- Nivel educativo actual
- Condiciones socioeconómicas
- Disponibilidad de tiempo
- Preferencias generales

**Relaciones:**

- Un PerfilUsuario tiene múltiples Resultados (respuestas de cuestionarios)
- Un PerfilUsuario recibe múltiples Recomendaciones

---

### Resultado

Almacena las respuestas del cuestionario vocacional.

**Atributos clave:**

- Respuestas a preguntas de habilidades
- Respuestas a preguntas de intereses
- Respuestas a preguntas de vocación
- Fecha de realización
- Perfil vocacional generado (porcentajes por área)

**Relaciones:**

- Un Resultado pertenece a un PerfilUsuario
- Un Resultado genera múltiples Recomendaciones

---

### Recomendacion

Representa las recomendaciones generadas para un estudiante.

**Atributos clave:**

- Programa recomendado
- Porcentaje de compatibilidad
- Razones de la recomendación
- Fecha de generación
- Estado (vista/no vista)

**Relaciones:**

- Una Recomendación pertenece a un PerfilUsuario
- Una Recomendación referencia un Programa
- Una Recomendación se basa en un Resultado

---

## Relaciones Clave

### Programa ↔ Convocatoria (1:N)

**Decisión arquitectónica crítica:**

Se separaron estas entidades para permitir:

1. Control temporal independiente
2. Múltiples convocatorias por programa
3. Ocultamiento automático de convocatorias vencidas
4. Historial de convocatorias pasadas

```
Programa (1) ----< (N) Convocatoria
```

### PerfilUsuario → Resultado → Recomendacion

**Flujo de datos:**

```
PerfilUsuario → completa → Resultado → genera → Recomendacion → referencia → Programa
```

## Consideraciones de Diseño

### Curación Manual

- Instituciones y Programas son ingresados manualmente
- Control de calidad sobre cada entrada
- No hay scraping automático en esta fase

### Escalabilidad Futura

- Modelo preparado para agregar:
  - Rutas de aprendizaje
  - Sistema de notificaciones
  - Historial de decisiones del estudiante
  - Feedback sobre recomendaciones

### Integridad Referencial

- Eliminación en cascada controlada
- Preservación de datos históricos
- Auditoría de cambios en datos críticos

---

[← Volver al inicio](00_START_HERE.md)
