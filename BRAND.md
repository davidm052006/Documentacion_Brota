# Manual de Marca — Brota

> Documento de referencia para diseño, desarrollo y comunicación. Cualquier nuevo componente, pantalla o material debe respetar estas guías.

---

## 1. Identidad

**Nombre:** Brota  
**Dominio conceptual:** "Brotar" — crecer, germinar, surgir. La metáfora del crecimiento personal atraviesa toda la marca: el estudiante llega sin saber quién es y sale con un camino claro.

**Tagline principal:** *"Descubre quién quieres ser."*  
**Tagline alternativo (CTA):** *"Tu futuro empieza con Brota."*  
**Descripción en una línea:** Plataforma colombiana de orientación vocacional gratuita para estudiantes que quieren elegir carrera con confianza, no con miedo.

### Misión
Que ningún estudiante colombiano tome una decisión vocacional sin orientación. Brota democratiza el acceso a herramientas de autoconocimiento y a información real de programas educativos.

### Valores de marca
| Valor | Qué significa en Brota |
|---|---|
| **Accesibilidad** | Gratis para estudiantes. Siempre. |
| **Ciencia** | El test vocacional se basa en teorías de orientación reconocidas internacionalmente |
| **Honestidad** | No hay "carrera perfecta" — hay afinidad real con quién eres hoy |
| **Crecimiento** | La plataforma acompaña, no define. Hay espacio para cambiar y descubrirse |
| **Localidad** | Datos reales del MEN, SENA y universidades colombianas |

---

## 2. Logo

**Archivo:** `frontend/public/logo-brota.png`  
**Uso en código:** `<img src="/logo-brota.png" alt="Brota" className="h-9 w-auto" />`

### Reglas de uso
- Sobre fondo claro: logo en su versión original (verde sobre blanco/crema)
- Sobre fondo oscuro o verde: logo en versión clara (blanco/crema)
- Tamaño mínimo: 28px de alto (`h-7`) en navbar compacto; 36px (`h-9`) en contextos normales
- No distorsionar proporciones — usar siempre `w-auto`
- No agregar efectos (sombra, rotación, filtros) sin aprobación

---

## 3. Paleta de colores

### Colores primarios (definidos en `frontend/src/index.css`)

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#16A34A` | Verde principal — botones CTA, íconos activos, acentos |
| `--color-primary-hover` | `#15803D` | Estado hover del verde principal |
| `--color-text` | `#052e16` | Texto principal en modo claro (verde muy oscuro) |
| `--color-border` | `#bbf7d0` | Bordes y separadores en modo claro |

### Colores de fondo

| Contexto | Hex / Clase Tailwind | Modo |
|---|---|---|
| Fondo app general | `#ffffff` | Claro |
| Fondo app general | `#060d07` | Oscuro |
| Fondo dashboard (gradiente) | `#f0fdf4` → `#dcfce7` (`green-50` → `green-100`) | Claro |
| Fondo dashboard (gradiente) | `#0a1a0a` → `#060d07` | Oscuro |
| Fondo auth (login/registro) | `#f2efea` | Claro (crema/off-white) |
| Fondo auth (login/registro) | `#0d110e` | Oscuro |
| Hero banner | `green-600` → `green-700` | Claro |
| Hero banner | `green-700` → `green-800` | Oscuro |
| Surface oscuro (cards, modales) | `#1a1d24` / `#2c3140` | Oscuro |

### Escala de verde (Tailwind)

```
green-50   → fondos muy sutiles
green-100  → fondos de sección
green-200  → bordes suaves
green-400  → acentos en modo oscuro (#4ade80)
green-600  → color primario acción (#16a34a)
green-700  → hover / hero banner
green-950  → texto principal en claro (#052e16)
```

### Reglas de color
- **Nunca** usar el verde primario como fondo de texto largo — solo para acentos, botones e íconos
- En modo oscuro los verdes shiftan hacia tonos más suaves (`green-400` en lugar de `green-600`)
- El crema `#f2efea` es exclusivo de las pantallas de auth — no usar en el dashboard

---

## 4. Tipografía

- **Familia:** Tailwind CSS default system stack (Inter, SF Pro, Segoe UI, sans-serif)
- **Escala aplicada en la app:**

| Uso | Clase Tailwind | Peso |
|---|---|---|
| Headline principal (landing H1) | `text-5xl` / `text-7xl` | `font-bold` |
| Títulos de sección (H2) | `text-3xl` / `text-4xl` | `font-bold` |
| Subtítulos de card | `text-lg` / `text-xl` | `font-semibold` |
| Cuerpo | `text-base` | `font-normal` |
| Labels / meta | `text-sm` / `text-xs` | `font-medium` |
| Nombre "BROTA" en navbar | `text-xl` | `font-bold tracking-wide` |

### Énfasis
El headline usa `<em className="not-italic text-green-600">` para destacar palabras clave sin cursiva — patrón a mantener en titles grandes.

---

## 5. Voz y tono

| Dimensión | Guía |
|---|---|
| **Persona** | Segunda persona singular: "tú", "tu camino", "tus intereses" |
| **Tono** | Cercano, honesto, alentador — nunca condescendiente ni corporativo |
| **Verbos de acción** | Descubre, Explora, Encuentra, Empieza, Crece |
| **Evitar** | Jerga técnica, frases genéricas ("la mejor plataforma"), presión o urgencia falsa |
| **Mensaje central** | No hay respuesta incorrecta. No hay camino equivocado. Hay el tuyo. |

### Ejemplos de copy por pantalla
- **Dashboard saludo:** *"¡Hola, {nombre}! 🌱"*
- **Login (volver):** *"Tu camino sigue justo donde lo dejaste."*
- **Registro (nuevo):** *"Crea tu cuenta y empieza a crecer."*
- **CTA principal:** *"Empezar gratis"*
- **CTA secundario:** *"Saber más"*

---

## 6. Iconografía y emojis

- **Emoji de marca:** 🌱 (brote verde) — aparece en saludo del dashboard y en comunicaciones informales
- **Íconos UI:** Heroicons o similares (trazo limpio, sin relleno en estado normal)
- Los emojis solo en contextos conversacionales/informales (saludo, notificaciones); **no** en botones de acción ni en labels de formulario

---

## 7. Componentes clave de UI

### Botón primario
```jsx
className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
```

### Botón secundario
```jsx
className="border border-green-600 text-green-600 hover:bg-green-50 font-semibold px-6 py-2.5 rounded-lg transition-colors"
```

### Card estándar (modo claro)
```jsx
className="bg-white border border-green-100 rounded-xl shadow-sm p-5"
```

### Card estándar (modo oscuro)
```jsx
className="bg-[#1a1d24] border border-[#2c3140] rounded-xl p-5"
```

### Badge de rol admin
```jsx
className="text-[10px] font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full"
```

---

## 8. Contexto del producto

### Usuarios objetivo
- Estudiantes colombianos de bachillerato (grados 9°–11°) y recién egresados
- Rango de edad: 14–20 años
- Contexto: sin acceso a orientadores vocacionales profesionales (especialmente fuera de Bogotá)

### Flujo principal
1. **Registro** → datos básicos, edad, ciudad, nivel educativo
2. **Test vocacional** → preguntas sobre intereses, habilidades y pasiones
3. **Perfil vocacional** → resultado con áreas de mayor afinidad
4. **Recomendaciones** → programas reales de universidades y SENA según perfil
5. **Exploración** → navegar programas, filtrar por área, ciudad, institución

### Datos educativos
- Fuente: API MEN (datos.gov.co) — ~14.644 programas activos de todo el país
- Licencia: CC-BY-SA 4.0 (Ministerio de Educación Nacional)
- Instituciones: universidades públicas/privadas + SENA

### Restricciones de diseño importantes
- **TailwindCSS v4**: el oxide scanner requiere `@source` explícitos en `frontend/src/index.css` — no eliminarlos
- **Dark mode**: implementado con clase `.dark` en `<html>` — todos los componentes deben tener variante `dark:`
- **Sin sidebar**: el dashboard usa TopNavbar horizontal (no sidebar vertical)
