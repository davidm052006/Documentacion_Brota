---
title: Restricciones Técnicas y Stack Realista · Slowly
description: Tecnologías 100% gratuitas y accesibles para un estudiante del SENA sin presupuesto
tags: [stack, restricciones, gratuito, sena, low-cost]
aliases: [Tecnologías, Stack, Restricciones técnicas]
category: Arquitectura y Desarrollo
author: David
created: 2025-11-27
updated: 2025-11-27
---

# Restricciones Técnicas y Stack Realista · Slowly

> [!quote] Slowly dice:  
> «No necesitamos plata… solo cariño y código abierto»

## 1. La realidad económica (y está bien decirla)
- Presupuesto del proyecto: **$0 pesos**  
- Equipo: estudiante del SENA + compañeros del curso  
- Tiempo: los 7 trimestres del tecnólogo  
- Internet: el del SENA, la casa o cafés

¡Y con eso nos sobra para hacer un sistema increíble!

## 2. Stack 100% GRATUITO y aprobado por el SENA

| Capa                  | Tecnología elegida                          | Por qué es perfecta para nosotros                    | Alternativa por si falla |
|-----------------------|---------------------------------------------|------------------------------------------------------|--------------------------|
| **Frontend Web**      | React.js + Vite + Tailwind CSS              | Rápido, moderno y 100% gratis                        | Vue.js + Vite           |
| **Mobile (opcional)** | Progressive Web App (PWA)                   | Funciona como app sin publicar en stores             | React Native (solo si donan un celular viejo) |
| **Backend**           | Node.js + Express                           | Fácil de aprender, corre en cualquier máquina       | Spring Boot (Java) si el profe lo exige |
| **Base de datos**     | PostgreSQL                                  | Gratuita, potente y la usan en el SENA               | MySQL o SQLite          |
| **Autenticación**     | Firebase Authentication (plan gratuito)     | Login con Google/correo sin configurar servidor      | JWT propio con Node     |
| **Hosting web**       | Vercel o Netlify                            | Despliegue automático con GitHub, dominio gratis     | Render.com (plan free)  |
| **Base de datos en la nube** | Supabase (PostgreSQL gratis) o Railway   | 500 MB gratis + autenticación incluida               | Neon.tech               |
| **Almacenamiento archivos** | Firebase Storage (5 GB gratis)          | Para fotos de instituciones, logos, etc.             | Cloudinary free         |
| **Animaciones Slowly**| LottieFiles (archivos JSON gratuitos)       | Slowly se mueve lindo sin pagar nada                 | Rive (plan free)        |
| **Dominio**           | .vercel.app o .netlify.app                  | Gratis y profesional                                 | .tk o .ml (si queremos dominio propio) |

## 3. Herramientas de desarrollo (todo gratis)

| Herramienta             | Uso                                    | Enlace directo |
|-------------------------|----------------------------------------|----------------|
| Visual Studio Code      | Editor principal                       | code.visualstudio.com |
| Git + GitHub            | Control de versiones                   | github.com (cuenta estudiante gratis ilimitado) |
| Figma                   | Diseño de pantallas y Slowly           | figma.com (plan educación gratis) |
| Draw.io / Excalidraw    | Diagramas y wireframes                 | app.diagrams.net |
| Postman o Thunder Client| Probar APIs                            | Gratis |
| Canva                   | Banners y presentaciones al jurado    | Plan educación gratis |
| Trello o Notion         | Organización del equipo                | Gratis |

## 4. Límites reales (y cómo los manejamos)

| Limitación                        | Límite gratuito           | Nuestra solución realista |
|-----------------------------------|---------------------------|---------------------------|
| Supabase                          | 500 MB DB + 1 GB storage  | Suficiente para miles de usuarios en etapa de proyecto |
| Vercel                            | 100 GB bandwidth/mes      | Más que suficiente para entregas y pruebas |
| Firebase Auth + Storage           | 10k usuarios + 5 GB       | Perfecto para todo el tecnólogo |
| Correos electrónicos              | Resend o EmailJS          | Enviamos notificaciones gratis |
| Certificado SSL                   | Let’s Encrypt (automático en Vercel/Netlify) | Siempre HTTPS |

## 5. Plan B si algo falla (porque siempre pasa)

| Problema posible                    | Solución inmediata |
|-------------------------------------|--------------------|
| Se cae Supabase                     | Migrar a Railway o Neon en 1 hora |
| Vercel pone límites                 | Cambiar a Netlify o Render |
| Necesitamos más almacenamiento     | Usar Google Drive compartido del equipo (temporal) |
| El profe exige todo en local        | Docker Compose con PostgreSQL + Node (corre en cualquier PC del SENA) |

