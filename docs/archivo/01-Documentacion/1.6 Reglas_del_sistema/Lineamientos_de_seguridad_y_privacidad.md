---
title: Lineamientos de Seguridad y Privacidad · Slowly
description: Cómo protegemos los datos de los estudiantes y cumplimos con la ley
tags: [seguridad, privacidad, legal, gdpr, ley-1581]
aliases: [Seguridad, Privacidad, Protección de datos]
category: Gobernanza y Legal
author: David
created: 2025-11-27
updated: 2025-11-27
---

# Seguridad y Privacidad · Slowly

> [!quote] Slowly dice:  
> «Tus datos están más seguros conmigo que una hojita en mi pancita»

## 1. Principio básico (lo más importante)
Los datos personales de los estudiantes (nombre, correo, colegio, intereses, resultados de tests) son **sagrados**.  
Nunca los vendemos, nunca los compartimos con terceros sin permiso explícito y siempre los protegemos como si fueran nuestros.

## 2. Leyes que cumplimos al 100%
| País / Norma                     | Qué dice básicamente                          | Cómo lo cumplimos en Slowly                     |
|----------------------------------|-----------------------------------------------|-------------------------------------------------|
| Colombia – Ley 1581 de 2012 + Decreto 1377 | Regula protección de datos personales         | Tenemos política clara + consentimiento activo |
| Colombia – Ley 1266 de 2008      | Datos financieros y crediticios               | Nunca pedimos datos financieros                 |
| Europa – GDPR (buena práctica)  | Derechos ARCO + minimización de datos         | Copiamos lo mejor para estar preparados         |

## 3. Datos que recolectamos (y por qué)

| Dato                          | ¿Obligatorio? | Finalidad                                 | Tiempo que lo guardamos |
|-------------------------------|---------------|-------------------------------------------|-------------------------|
| Nombre y apellido             | Sí            | Identificar al usuario                    | Hasta que elimine cuenta |
| Correo electrónico            | Sí            | Login + notificaciones importantes        | Hasta que elimine cuenta |
| Edad / grado escolar          | Sí            | Recomendaciones adecuadas                 | Hasta que elimine cuenta |
| Resultados de cuestionarios   | Sí            | Recomendaciones de carreras               | 2 años o hasta eliminación |
| Instituciones favoritas       | Opcional      | Guardar progreso del usuario              | Hasta que elimine cuenta |
| Dirección IP y datos de sesión| Automático    | Seguridad y prevención de fraude          | 90 días                 |

→ Nunca pedimos cédula, teléfono, dirección o datos sensibles.

## 4. Medidas técnicas de seguridad (lo que hacen los devs)

| Medida                              | Detalle simple                                          |
|-------------------------------------|----------------------------------------------------------|
| Encriptación en tránsito            | Todo via HTTPS (TLS 1.3)                                 |
| Encriptación en reposo              | Base de datos encriptada (AES-256)                       |
| Hash de contraseñas                 | bcrypt con salt (nunca guardamos contraseñas en texto)   |
| Autenticación segura                | JWT con expiración corta + refresh token seguro          |
| Protección contra ataques comunes   | Rate limiting, CORS, CSP, validación estricta de inputs  |
| Backups seguros                     | Backups diarios en servidor separado y encriptados       |

## 5. Derechos del usuario (los famosos derechos ARCO)

El estudiante puede, en cualquier momento:
- **Acceder** → ver todos sus datos
- **Rectificar** → corregir algo que esté mal
- **Cancelar** → eliminar sus datos
- **Oponerse** → decir “no quiero que usen mis datos para recomendaciones”

→ Botón directo en el perfil: “Descargar mis datos” y “Eliminar mi cuenta para siempre”

## 6. Política de cookies y rastreo
- Solo cookies técnicas y de sesión (necesarias para que funcione la web)
- Cookie de analíticas → solo si el usuario dice “Sí, está bien”
- Nunca publicidad ni rastreo de terceros

## 7. Qué pasa si hay una fuga de datos 
1. Notificamos a los afectados en menos de 72 horas
2. Notificamos a la Superintendencia de Industria y Comercio
3. Publicamos un aviso claro en la página

## 8. Frases oficiales que puedes usar en la web

> [!note] Aviso de privacidad (pie de página y registro)
> Tus datos solo se usan para ayudarte a elegir carrera.  
> Nunca los compartimos ni vendemos.  
> Puedes borrarlos cuando quieras con un solo clic.

> [!tip] Cuando el usuario elimina su cuenta
> Slowly dice:  
> «¡Listo! Tus datos ya están borrados para siempre.  
> Si algún día vuelves… aquí estaré con una hojita fresca»
