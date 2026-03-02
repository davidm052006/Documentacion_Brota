---
title: Sección Instituciones
description: Listado interactivo de todas las instituciones educativas registradas en el sistema
tags: [instituciones, ui, ux, listado, tarjetas]
aliases: [Instituciones, instituciones, universidades]
category: Módulos del sistema
author: David
created: 2025-11-27
updated: 2025-11-27
---

# Sección Instituciones 🏫

> [!quote] Slowly dice:  
> «Aquí viven toooodas las casas de estudio… hay para todos los gustos, no te preocupes»

Esta es la pantalla principal donde los usuarios descubren y exploran todas las **instituciones educativas** registradas en la plataforma.

## Objetivo de la sección
- Mostrar de forma clara y atractiva todas las instituciones disponibles
- Permitir búsqueda y filtros rápidos
- Dar acceso inmediato a los detalles completos de cada institución
- Generar confianza y emoción al usuario al ver la variedad de opciones

## Diseño general (vista de grid)

+---------------------------------+ 
| 🔍 Buscador + Filtros | 
+---------------------------------+ 
| ┌───┐ ┌───┐ ┌───┐ ┌───┐ 
| │   T     │ │   U    │ │   V    │ │   W   │ | ← Grid de tarjetas 
| └───┘ └───┘ └───┘ └───┘ 
|                                              |
| 🦥 Slowly                          | 
| trepando o durmiendo | 
+-----------------------------------+

- **Layout**: Grid responsivo (1-2-3-4 columnas según tamaño de pantalla)
- **Espaciado**: 24 px entre tarjetas
- **Máximo por página**: Paginación infinita (scroll) o clásica según rendimiento
- **Comportamiento de Slowly**:
- Se cuelga del buscador cuando el usuario escribe
- Cada ~20 segundos se mueve a otra tarjeta y “lee” el nombre en voz alta (burbuja opcional)

## Tarjeta de institución (diseño final)

Cada institución se muestra como una tarjeta rectangular con los siguientes elementos:
+------------------------------------------------------------------+
|                                                    ★ 4.8                      |  ← Estrellas de valoración promedio
|  Instituto Nacional de Formación Técnica      |  ← Nombre oficial
|  (INFT)                                                                        |
|                                                                                      |
|  🏛️ Público  ·  Santiago Centro  ·  8 carreras  |  ← Tags rápidos
|                                                                                      |
|  [ Ver detalles ]                                   👁️                |  ← Botón principal 
+-------------------------------------------------------------------+

### Elementos de la tarjeta

| Elemento               | Detalle                                                      | ¿Obligatorio? |
| ---------------------- | ------------------------------------------------------------ | ------------- |
| Logo de la institución | 80×80 px, fondo blanco o transparente, centrado arriba       | Sí            |
| Nombre completo        | Máx. 2 líneas, tipografía bold                               | Sí            |
| Sigla                  | Entre paréntesis debajo del nombre                           | Sí            |
| Valoración promedio    | Estrellas + número (ej: ★ 4.8) en esquina superior derecha   | Sí            |
| Tipo                   | 🏛️ Público / 🏢 Privado / 🌍 Internacional                  | Sí            |
| Ubicación principal    | Ciudad o región                                              | Sí            |
| Cantidad de carreras   | “12 carreras” / “8 carreras”                                 | Sí            |
| Botón “Ver detalles”   | Fondo verde musgo (#5D9C59), texto blanco, ícono 👁️ o ➜     | Sí            |
| Sombra suave + hover   | Al pasar el mouse: leve elevación + Slowly señala la tarjeta | Sí            |
|                        |                                                              |               |

## Pantalla de detalles de institución (al hacer clic en “Ver detalles”)

Se abre un **modal full-screen** o una **página dedicada** (según preferencia móvil/web) con toda la información completa:

### Pestañas dentro del detalle

1. **Inicio** → Resumen + foto grande + descripción
2. **Carreras** → Listado completo de carreras ofrecidas
3. **Recomendaciones** → Opiniones reales de alumnos (estrellas + comentarios)
4. **Admisión** → Fechas, requisitos, aranceles
5. **Contacto y ubicación** → Mapa + correo + teléfono + redes

> [!tip] Comportamiento de Slowly en el modal Se sienta en la esquina inferior izquierda, hojea un librito imaginario y de vez en cuando levanta la vista y dice cosas como: «Mira, esta carrera de Diseño tiene súper buenas reseñas… ¿te tinca?»

## Estados especiales de la sección

|Situación|Qué pasa con Slowly|Feedback visual|
|---|---|---|
|No hay resultados (búsqueda)|Se rasca la cabeza y muestra cartelito “¿Nada? 😢”|Tarjetas desaparecen + ilustración|
|Primera visita del usuario|Baja desde arriba cargando un cartel de “¡Bienvenid@!”|Animación especial de bienvenida|
|Carga inicial|Come una hojita mientras gira un pequeño loading|Spinner personalizado con Slowly|

## Filtros y búsqueda (parte superior)

- Buscador en tiempo real (por nombre o sigla)
- Filtros rápidos:
- Tipo: Público / Privado / Técnico
- Región
- Valoración mínima
- Gratuita / Arancel
- Modalidad (presencial, online, híbrida)