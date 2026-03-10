# 🎨 Cómo se Conectan HTML, CSS y JavaScript

## 📋 Índice

1. [Estructura básica](#estructura-básica)
2. [Cómo funciona el HTML](#cómo-funciona-el-html)
3. [Cómo funciona el CSS](#cómo-funciona-el-css)
4. [Cómo se conectan](#cómo-se-conectan)
5. [Ejemplo práctico](#ejemplo-práctico)
6. [Cómo funciona en React](#cómo-funciona-en-react)

---

## 1. Estructura Básica

### Analogía simple:

- **HTML** = Estructura de una casa (paredes, puertas, ventanas)
- **CSS** = Decoración de la casa (colores, muebles, estilo)
- **JavaScript** = Funcionalidad de la casa (luz que se enciende, puertas que se abren)

---

## 2. Cómo Funciona el HTML

### ¿Qué es HTML?

HTML (HyperText Markup Language) es el lenguaje que define la estructura de una página web.

### Ejemplo básico:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <h1>Título Principal</h1>
    <p>Este es un párrafo</p>
    <button>Haz clic</button>
  </body>
</html>
```

### Elementos HTML:

- `<h1>` = Título principal
- `<p>` = Párrafo
- `<div>` = Contenedor genérico
- `<button>` = Botón
- `<img>` = Imagen
- `<a>` = Enlace

### Atributos HTML:

```html
<div class="contenedor" id="principal">
  <p class="texto">Hola</p>
</div>
```

- `class` = Clase CSS (puede repetirse en varios elementos)
- `id` = Identificador único (solo un elemento puede tenerlo)

---

## 3. Cómo Funciona el CSS

### ¿Qué es CSS?

CSS (Cascading Style Sheets) es el lenguaje que define el estilo visual de una página web.

### Ejemplo básico:

```css
/* Selector de etiqueta */
h1 {
  color: blue;
  font-size: 32px;
}

/* Selector de clase */
.contenedor {
  background-color: white;
  padding: 20px;
}

/* Selector de ID */
#principal {
  width: 100%;
  max-width: 1200px;
}
```

### Tipos de selectores:

#### 1. Selector de etiqueta (aplica a todas las etiquetas)

```css
p {
  color: black;
}
```

Afecta a todos los `<p>` de la página.

#### 2. Selector de clase (aplica a elementos con esa clase)

```css
.texto {
  font-size: 16px;
}
```

Afecta a todos los elementos con `class="texto"`.

#### 3. Selector de ID (aplica a un elemento específico)

```css
#principal {
  margin: 0 auto;
}
```

Afecta solo al elemento con `id="principal"`.

---

## 4. Cómo se Conectan

### Método 1: CSS en archivo separado (RECOMENDADO)

**HTML:**

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Enlazar archivo CSS -->
    <link rel="stylesheet" href="estilos.css" />
  </head>
  <body>
    <h1 class="titulo">Hola Mundo</h1>
  </body>
</html>
```

**CSS (estilos.css):**

```css
.titulo {
  color: blue;
  font-size: 32px;
}
```

**Cómo funciona:**

1. El navegador lee el HTML
2. Encuentra la etiqueta `<link>` que apunta a `estilos.css`
3. Descarga y lee el archivo CSS
4. Aplica los estilos a los elementos que coincidan con los selectores

### Método 2: CSS inline (NO RECOMENDADO)

```html
<h1 style="color: blue; font-size: 32px;">Hola Mundo</h1>
```

**Problema:** Difícil de mantener, no se puede reutilizar.

### Método 3: CSS en el `<head>` (para estilos pequeños)

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .titulo {
        color: blue;
      }
    </style>
  </head>
  <body>
    <h1 class="titulo">Hola Mundo</h1>
  </body>
</html>
```

---

## 5. Ejemplo Práctico

### HTML (index.html):

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Brota</title>
    <link rel="stylesheet" href="estilos.css" />
  </head>
  <body>
    <div class="contenedor">
      <h1 class="titulo">🌱 Brota</h1>
      <p class="descripcion">Plataforma educativa</p>
      <button class="boton-principal">Comenzar</button>
    </div>
  </body>
</html>
```

### CSS (estilos.css):

```css
/* Estilos del contenedor */
.contenedor {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

/* Estilos del título */
.titulo {
  color: #2ecc71;
  font-size: 48px;
  margin-bottom: 10px;
}

/* Estilos de la descripción */
.descripcion {
  color: #7f8c8d;
  font-size: 18px;
  margin-bottom: 30px;
}

/* Estilos del botón */
.boton-principal {
  background-color: #2ecc71;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

/* Estilos del botón al pasar el mouse */
.boton-principal:hover {
  background-color: #27ae60;
}
```

### Resultado:

```
┌─────────────────────────────────┐
│                                 │
│        🌱 Brota                 │  ← Título verde, 48px
│                                 │
│    Plataforma educativa         │  ← Texto gris, 18px
│                                 │
│    ┌─────────────┐              │
│    │  Comenzar   │              │  ← Botón verde
│    └─────────────┘              │
│                                 │
└─────────────────────────────────┘
```

---

## 6. Cómo Funciona en React

### En React, usamos JSX (HTML + JavaScript)

**Componente React (App.jsx):**

```javascript
import "./App.css"; // Importar CSS

function App() {
  return (
    <div className="contenedor">
      {/* className en lugar de class */}
      <h1 className="titulo">🌱 Brota</h1>
      <p className="descripcion">Plataforma educativa</p>
      <button className="boton-principal">Comenzar</button>
    </div>
  );
}

export default App;
```

**CSS (App.css):**

```css
.contenedor {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.titulo {
  color: #2ecc71;
  font-size: 48px;
}

.boton-principal {
  background-color: #2ecc71;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
}
```

### Diferencias con HTML tradicional:

| HTML Tradicional     | React (JSX)                |
| -------------------- | -------------------------- |
| `class="titulo"`     | `className="titulo"`       |
| `for="input"`        | `htmlFor="input"`          |
| `style="color: red"` | `style={{ color: 'red' }}` |

---

## 7. Flujo Completo en Brota

### Estructura de archivos:

```
frontend/
├── index.html              ← HTML principal
├── src/
│   ├── main.jsx            ← Punto de entrada
│   ├── App.jsx             ← Componente principal
│   ├── App.css             ← Estilos de App
│   └── index.css           ← Estilos globales
```

### 1. index.html (HTML principal):

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Brota</title>
  </head>
  <body>
    <div id="root"></div>
    <!-- React se monta aquí -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 2. main.jsx (Punto de entrada):

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Estilos globales

// Monta el componente App en el div con id="root"
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

### 3. App.jsx (Componente principal):

```javascript
import "./App.css"; // Estilos específicos de App

function App() {
  return (
    <div className="App">
      <h1>🌱 Brota</h1>
    </div>
  );
}

export default App;
```

### 4. App.css (Estilos de App):

```css
.App {
  text-align: center;
  padding: 20px;
}

h1 {
  color: #2ecc71;
}
```

### 5. index.css (Estilos globales):

```css
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}
```

---

## 8. Cómo Cambiar Estilos

### Para cambiar el color del título:

**Opción 1: Modificar App.css**

```css
h1 {
  color: #3498db; /* Cambiar de verde a azul */
}
```

**Opción 2: Agregar clase específica**

**App.jsx:**

```javascript
<h1 className="titulo-principal">🌱 Brota</h1>
```

**App.css:**

```css
.titulo-principal {
  color: #3498db;
  font-size: 48px;
  font-weight: bold;
}
```

---

## 9. Selectores CSS Comunes

### Selector de hijo directo:

```css
.contenedor > p {
  /* Solo afecta a <p> que son hijos directos de .contenedor */
  color: blue;
}
```

### Selector de descendiente:

```css
.contenedor p {
  /* Afecta a todos los <p> dentro de .contenedor (cualquier nivel) */
  color: blue;
}
```

### Selector de hover (al pasar el mouse):

```css
.boton:hover {
  background-color: #27ae60;
}
```

### Selector de múltiples clases:

```css
.boton.activo {
  /* Afecta a elementos que tienen AMBAS clases */
  background-color: green;
}
```

---

## 10. Propiedades CSS Más Usadas

### Colores:

```css
.elemento {
  color: #2ecc71; /* Color del texto */
  background-color: white; /* Color de fondo */
}
```

### Tamaños:

```css
.elemento {
  width: 100%; /* Ancho */
  height: 200px; /* Alto */
  max-width: 800px; /* Ancho máximo */
  padding: 20px; /* Espacio interno */
  margin: 10px; /* Espacio externo */
}
```

### Texto:

```css
.elemento {
  font-size: 16px; /* Tamaño de fuente */
  font-weight: bold; /* Grosor de fuente */
  text-align: center; /* Alineación */
  line-height: 1.5; /* Altura de línea */
}
```

### Bordes:

```css
.elemento {
  border: 1px solid black; /* Borde */
  border-radius: 5px; /* Esquinas redondeadas */
}
```

### Flexbox (para alinear elementos):

```css
.contenedor {
  display: flex; /* Activar flexbox */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  gap: 10px; /* Espacio entre elementos */
}
```

---

## ✅ Resumen

**Flujo completo:**

1. El navegador carga `index.html`
2. `index.html` carga `main.jsx`
3. `main.jsx` importa `App.jsx` y `index.css`
4. `App.jsx` importa `App.css`
5. React renderiza el componente `App`
6. El navegador aplica los estilos de `index.css` y `App.css`
7. El usuario ve la página con estilos aplicados

**Para cambiar textos:** Modifica `App.jsx`
**Para cambiar estilos:** Modifica `App.css` o `index.css`
**Para cambiar estructura:** Modifica `App.jsx`

---

¿Tienes alguna pregunta sobre HTML, CSS o cómo se conectan?
