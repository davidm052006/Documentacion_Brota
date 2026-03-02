---
title: Paleta de colores y estilos · Slowly
description: Identidad visual oficial del sistema – juvenil, cálida, súper amigable y relajante para los ojos
tags: [ui, ux, diseño, colores, tipografía, slowly]
aliases: [Paleta, Colores, Design System]
category: UI/UX
author: David
created: 2025-11-27
updated: 2025-11-27
---

# Paleta de colores y estilos · Slowly 🦥

> [!quote] Slowly dice:  
> «Colores que abrazan… sin apurar»

Todo el diseño está pensado para que el usuario se sienta en casa:  
juvenil pero no infantil · fresco pero nunca agresivo · cálido y extremadamente descansado para la vista.

## Paleta oficial “Perezoso Primavera 2025” (sin neones · sin colores chillones)

| Nombre                | Uso principal                              | Hex       | RGB            | Muestra                                 |
|-----------------------|--------------------------------------------|-----------|----------------|-----------------------------------------|
| **Musgo Principal**   | Botones, links, Slowly, acentos principales| `#5D9C59` | 93, 156, 89   | <span style="background:#5D9C59;padding:8px 16px;border-radius:8px;color:white;font-weight:bold;">#5D9C59</span> |
| **Musgo Claro**       | Hover, fondos de tarjetas, estado éxito    | `#C7E8CA` | 199, 232, 202 | <span style="background:#C7E8CA;padding:8px 16px;border-radius:8px;color:#2d6a4f;font-weight:bold;">#C7E8CA</span> |
| **Crema Calma**       | Fondo principal (light mode)               | `#F5F5F0` | 245, 245, 240 | <span style="background:#F5F5F0;padding:8px 16px;border-radius:8px;color:#333;">#F5F5F0</span> |
| **Café con Leche**    | Tarjetas, sombras suaves, separadores      | `#E8D9C9` | 232, 217, 201 | <span style="background:#E8D9C9;padding:8px 16px;border-radius:8px;color:#333;">#E8D9C9</span> |
| **Amarillo Mantequilla Suave**| Estrellas, badges, highlights sutiles     | `#F9E4B7` | 249, 228, 183 | <span style="background:#F9E4B7;padding:8px 16px;border-radius:8px;color:#333;">#F9E4B7</span> |
| **Gris Musgo**        | Texto secundario, bordes                   | `#6B7B6E` | 107, 123, 110 | <span style="background:#6B7B6E;padding:8px 16px;border-radius:8px;color:white;">#6B7B6E</span> |
| **Rosa Rubor**        | Alertas suaves, errores (nada agresivo)    | `#F8C8DC` | 248, 200, 220 | <span style="background:#F8C8DC;padding:8px 16px;border-radius:8px;color:#333;">#F8C8DC</span> |

### Dark mode (automático o manual)

| Nombre               | Hex       | Uso                                  |
|----------------------|-----------|--------------------------------------|
| Fondo oscuro         | `#2F3F32` | Fondo general                        |
| Tarjetas oscuras     | `#3F4F42` | Elevación sutil                      |
| Texto principal      | `#E8E8E3` | Legibilidad perfecta                 |
| Slowly (mantiene)    | `#5D9C59` | El mismo verde musgo (funciona genial en oscuro) |

## Tipografía oficial

| Uso                  | Fuente                | Peso     | Comentario                              |
|----------------------|-----------------------|----------|-----------------------------------------|
| Títulos y headings   | **Poppins** o **Inter** | 600–700  | Redondita y súper juvenil               |
| Cuerpo de texto      | **Inter** o **Satoshi**| 400–500  | Legible en pantallas largas             |
| Slowly hablando      | **Comic Neue** o cursiva de Poppins | 400 | Le da ese toque tierno y manuscrito     |

## Estilos globales (redondeos, sombras, espaciado)

css
/* Ejemplo rápido para que copien los devs */
:root {
  --radius: 16px;           /* Todo bien redondito y amigable */
  --shadow: 0 8px 24px rgba(93,156,89,0.12);
  --transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
}

.card       { border-radius: var(--radius); box-shadow: var(--shadow); background: white; }
.btn        { border-radius: 12px; padding: 12px 24px; background: #5D9C59; transition: var(--transition); }
.btn:hover  { background: #6BAF65; transform: translateY(-2px); }

- **Radios**: 12–20 px → todo se siente suave y abrazable
- **Sombras**: Muy sutiles y verdes transparentes → sensación de flotar (como Slowly trepando)
- **Transiciones**: 0.3–0.4 s con ease-out → lentas y perezosas, como nuestro amigo

## Slowly en la paleta

- Cuerpo: #5D9C59
- Pancita y cara: #F5F5F0
- Lentes: #4A5E4A con brillo blanco
- Hojita que come: #C7E8CA

> [!heart] Regla de oro Si algo se siente “chillón” o cansa la vista → no entra. Queremos que el usuario pueda estar 40 minutos explorando carreras y salga con una sonrisa, no con los ojos cansados.



---
title: Paleta de colores y estilos · Slowly
description: Identidad visual oficial del sistema – juvenil, cálida, súper amigable y relajante para los ojos
tags: [ui, ux, diseño, colores, tipografía, slowly]
aliases: [Paleta, Colores, Design System]
category: UI/UX
author: David
created: 2025-11-27
updated: 2025-11-27
---

# Paleta de colores y estilos · Slowly

> [!quote] Slowly dice:  
> «Colores que abrazan… sin apurar»

Todo el diseño está pensado para que el usuario se sienta en casa:  
juvenil pero no infantil · fresco pero nunca agresivo · cálido y extremadamente descansado para la vista.

## Paleta oficial “Perezoso Primavera 2025” (sin neones · sin colores chillones)

| Nombre                | Uso principal                              | Hex       | Muestra                                      |
|-----------------------|--------------------------------------------|-----------|----------------------------------------------|
| **Musgo Principal**   | Botones, links, Slowly, acentos principales| `#5D9C59` | <span style="background:#5D9C59;padding:8px 16px;border-radius:8px;color:white;font-weight:bold;">#5D9C59</span> |
| **Musgo Claro**       | Hover, fondos de tarjetas, éxito           | `#C7E8CA` | <span style="background:#C7E8CA;padding:8px 16px;border-radius:8px;color:#2d6a4f;font-weight:bold;">#C7E8CA</span> |
| **Crema Calma**       | Fondo principal (light mode)               | `#F5F5F0` | <span style="background:#F5F5F0;padding:8px 16px;border-radius:8px;color:#333;">#F5F5F0</span> |
| **Café con Leche**    | Tarjetas, separadores                      | `#E8D9C9` | <span style="background:#E8D9C9;padding:8px 16px;border-radius:8px;color:#333;">#E8D9C9</span> |
| **Amarillo Mantequilla Suave**| Estrellas, badges, highlights           | `#F9E4B7` | <span style="background:#F9E4B7;padding:8px 16px;border-radius:8px;color:#333;">#F9E4B7</span> |
| **Gris Musgo**        | Texto secundario, bordes                   | `#6B7B6E` | <span style="background:#6B7B6E;padding:8px 16px;border-radius:8px;color:white;">#6B7B6E</span> |
| **Rosa Rubor**        | Alertas suaves, errores                    | `#F8C8DC` | <span style="background:#F8C8DC;padding:8px 16px;border-radius:8px;color:#333;">#F8C8DC</span> |

### Dark mode

| Nombre             | Hex       | Uso                     |
|--------------------|-----------|-------------------------|
| Fondo oscuro       | `#2F3F32` | Fondo general           |
| Tarjetas oscuras   | `#3F4F42` | Elevación               |
| Texto principal    | `#E8E8E3` | Legibilidad máxima      |

## Tipografía oficial

- **Títulos**: Poppins SemiBold (600–700) – redondita y juvenil  
- **Cuerpo**: Inter Regular/Medium – súper legible  
- **Voz de Slowly**: Comic Neue o cursiva de Poppins – manuscrita y tierna

## Estilos globales (valores clave)

| Propiedad      | Valor recomendado                 | Por qué                                  |
|----------------|-----------------------------------|------------------------------------------|
| Border radius  | `16px` (tarjetas) / `12px` (botones) | Todo abrazable y perezoso              |
| Sombras        | `0 8px 24px rgba(93,156,89,0.12)` | Suave elevación, como Slowly flotando   |
| Transiciones   | `all 0.35s cubic-bezier(0.4,0,0.2,1)` | Lentitas y relajadas                   |
| Espaciado      | Múltiplos de 8px (8, 16, 24, 32…) | Sistema limpio y respirable             |

---
title: Paleta de colores y estilos · Slowly
description: Identidad visual oficial del sistema – juvenil, cálida, súper amigable y relajante para los ojos
tags: [ui, ux, diseño, colores, tipografía, slowly]
aliases: [Paleta, Colores, Design System]
category: UI/UX
author: David
created: 2025-11-27
updated: 2025-11-27
---

# Paleta de colores y estilos · Slowly

> [!quote] Slowly dice:  
> «Colores que abrazan… sin apurar»

Todo el diseño está pensado para que el usuario se sienta en casa:  
juvenil pero no infantil · fresco pero nunca agresivo · cálido y extremadamente descansado para la vista.

## Paleta oficial “Perezoso Primavera 2025” (sin neones · sin colores chillones)

| Nombre                | Uso principal                              | Hex       | Muestra                                      |
|-----------------------|--------------------------------------------|-----------|----------------------------------------------|
| **Musgo Principal**   | Botones, links, Slowly, acentos principales| `#5D9C59` | <span style="background:#5D9C59;padding:8px 16px;border-radius:8px;color:white;font-weight:bold;">#5D9C59</span> |
| **Musgo Claro**       | Hover, fondos de tarjetas, éxito           | `#C7E8CA` | <span style="background:#C7E8CA;padding:8px 16px;border-radius:8px;color:#2d6a4f;font-weight:bold;">#C7E8CA</span> |
| **Crema Calma**       | Fondo principal (light mode)               | `#F5F5F0` | <span style="background:#F5F5F0;padding:8px 16px;border-radius:8px;color:#333;">#F5F5F0</span> |
| **Café con Leche**    | Tarjetas, separadores                      | `#E8D9C9` | <span style="background:#E8D9C9;padding:8px 16px;border-radius:8px;color:#333;">#E8D9C9</span> |
| **Amarillo Mantequilla Suave**| Estrellas, badges, highlights           | `#F9E4B7` | <span style="background:#F9E4B7;padding:8px 16px;border-radius:8px;color:#333;">#F9E4B7</span> |
| **Gris Musgo**        | Texto secundario, bordes                   | `#6B7B6E` | <span style="background:#6B7B6E;padding:8px 16px;border-radius:8px;color:white;">#6B7B6E</span> |
| **Rosa Rubor**        | Alertas suaves, errores                    | `#F8C8DC` | <span style="background:#F8C8DC;padding:8px 16px;border-radius:8px;color:#333;">#F8C8DC</span> |

### Dark mode

| Nombre             | Hex       | Uso                     |
|--------------------|-----------|-------------------------|
| Fondo oscuro       | `#2F3F32` | Fondo general           |
| Tarjetas oscuras   | `#3F4F42` | Elevación               |
| Texto principal    | `#E8E8E3` | Legibilidad máxima      |

## Tipografía oficial

- **Títulos**: Poppins SemiBold (600–700) – redondita y juvenil  
- **Cuerpo**: Inter Regular/Medium – súper legible  
- **Voz de Slowly**: Comic Neue o cursiva de Poppins – manuscrita y tierna

## Estilos globales (valores clave)

| Propiedad      | Valor recomendado                 | Por qué                                  |
|----------------|-----------------------------------|------------------------------------------|
| Border radius  | `16px` (tarjetas) / `12px` (botones) | Todo abrazable y perezoso              |
| Sombras        | `0 8px 24px rgba(93,156,89,0.12)` | Suave elevación, como Slowly flotando   |
| Transiciones   | `all 0.35s cubic-bezier(0.4,0,0.2,1)` | Lentitas y relajadas                   |
| Espaciado      | Múltiplos de 8px (8, 16, 24, 32…) | Sistema limpio y respirable             |

---
title: Paleta de colores y estilos · Slowly
description: Identidad visual oficial del sistema – juvenil, cálida, súper amigable y relajante para los ojos
tags: [ui, ux, diseño, colores, tipografía, slowly]
aliases: [Paleta, Colores, Design System]
category: UI/UX
author: David
created: 2025-11-27
updated: 2025-11-27
---

# Paleta de colores y estilos · Slowly

> [!quote] Slowly dice:  
> «Colores que abrazan… sin apurar»

Todo el diseño está pensado para que el usuario se sienta en casa:  
juvenil pero no infantil · fresco pero nunca agresivo · cálido y extremadamente descansado para la vista.

## Paleta oficial “Perezoso Primavera 2025” (sin neones · sin colores chillones)

| Nombre                | Uso principal                              | Hex       | Muestra                                      |
|-----------------------|--------------------------------------------|-----------|----------------------------------------------|
| **Musgo Principal**   | Botones, links, Slowly, acentos principales| `#5D9C59` | <span style="background:#5D9C59;padding:8px 16px;border-radius:8px;color:white;font-weight:bold;">#5D9C59</span> |
| **Musgo Claro**       | Hover, fondos de tarjetas, éxito           | `#C7E8CA` | <span style="background:#C7E8CA;padding:8px 16px;border-radius:8px;color:#2d6a4f;font-weight:bold;">#C7E8CA</span> |
| **Crema Calma**       | Fondo principal (light mode)               | `#F5F5F0` | <span style="background:#F5F5F0;padding:8px 16px;border-radius:8px;color:#333;">#F5F5F0</span> |
| **Café con Leche**    | Tarjetas, separadores                      | `#E8D9C9` | <span style="background:#E8D9C9;padding:8px 16px;border-radius:8px;color:#333;">#E8D9C9</span> |
| **Amarillo Mantequilla Suave**| Estrellas, badges, highlights           | `#F9E4B7` | <span style="background:#F9E4B7;padding:8px 16px;border-radius:8px;color:#333;">#F9E4B7</span> |
| **Gris Musgo**        | Texto secundario, bordes                   | `#6B7B6E` | <span style="background:#6B7B6E;padding:8px 16px;border-radius:8px;color:white;">#6B7B6E</span> |
| **Rosa Rubor**        | Alertas suaves, errores                    | `#F8C8DC` | <span style="background:#F8C8DC;padding:8px 16px;border-radius:8px;color:#333;">#F8C8DC</span> |

### Dark mode

| Nombre             | Hex       | Uso                     |
|--------------------|-----------|-------------------------|
| Fondo oscuro       | `#2F3F32` | Fondo general           |
| Tarjetas oscuras   | `#3F4F42` | Elevación               |
| Texto principal    | `#E8E8E3` | Legibilidad máxima      |

## Tipografía oficial

- **Títulos**: Poppins SemiBold (600–700) – redondita y juvenil  
- **Cuerpo**: Inter Regular/Medium – súper legible  
- **Voz de Slowly**: Comic Neue o cursiva de Poppins – manuscrita y tierna

## Estilos globales (valores clave)

| Propiedad      | Valor recomendado                 | Por qué                                  |
|----------------|-----------------------------------|------------------------------------------|
| Border radius  | `16px` (tarjetas) / `12px` (botones) | Todo abrazable y perezoso              |
| Sombras        | `0 8px 24px rgba(93,156,89,0.12)` | Suave elevación, como Slowly flotando   |
| Transiciones   | `all 0.35s cubic-bezier(0.4,0,0.2,1)` | Lentitas y relajadas                   |
| Espaciado      | Múltiplos de 8px (8, 16, 24, 32…) | Sistema limpio y respirable             |


