---
status: PENDING
title: Concepto Visual Planetario
description: Nuevo sistema de navegación y visualización de conocimientos para Brota, basado en una temática galáctica
---

# Concepto Visual: Sistema Planetario

> **Estado:** PENDIENTE (Borrador estructural para futura documentación)

## Visión General

El entorno de aprendizaje de Brota se representará como un universo interactivo. Hemos evolucionado desde el concepto anterior (Árbol de Conocimientos) hacia un **Sistema de Navegación Planetario** inspirado en un mapa galáctico para mejorar la escalabilidad visual, la gamificación y la experiencia de usuario.

## Estructura del Universo

La jerarquía de conocimiento se mapea a cuerpos celestes de la siguiente manera:

* **Estrella Central:** Representa el *Hub Principal* o núcleo de la plataforma.
* **Planetas:** Representan los *Dominios de Conocimiento* (áreas de estudio o carreras).
* **Lunas:** Representan las *Lecciones o Módulos* específicos alrededor de un dominio.
* **Rutas Orbitales (Órbitas):** Representan los *Niveles de Progresión* del usuario.

## Objetivos de Diseño

1. **Exploración Visual:** Fomentar el descubrimiento intuitivo del conocimiento.
2. **Escalabilidad:** Permitir el crecimiento ilimitado de áreas de aprendizaje sin saturar la interfaz (algo que limitaba al modelo de árbol).
3. **Gamificación:** Crear un sentido de viaje y progresión épica para el estudiante.

## Dirección Técnica y de UI

* **Formato Base:** Todos los recursos visuales y assets del mapa galáctico serán creados en formato `SVG`.
* **Implementación:** Los SVGs serán convertidos y manejados como componentes interactivos de React.
* **Interactividad y Animación:** Los planetas y lunas deben ser diseñados de manera modular para permitir animaciones individuales (rotación, traslación, efectos de hover, etc).

## Referencias y Estilo

* *Pendiente: Insertar imágenes de referencia de estilo galáctico/planetario proporcionadas, esquemas de color y moodboard.*

## Tareas Pendientes para Desarrollo

- [ ] Crear componentes base en React para SVG (`Planet`, `Star`, `Moon`, `Orbit`).
- [ ] Definir el modelo de datos exacto que alimentará la posición y estados de los nodos planetarios.
- [ ] Desarrollar sistema de navegación/zoom tipo *pan-and-zoom* para el mapa estelar.

---
*Este documento es un template base y debe ser expandido a medida que se defina la implementación visual y técnica.*
