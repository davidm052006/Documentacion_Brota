# 📚 Explicación Completa del Setup - Proyecto Brota

## 🎯 ¿Qué hemos configurado?

Hemos configurado 3 componentes principales:

1. **Backend** (servidor que maneja la lógica)
2. **Frontend** (lo que ves en el navegador)
3. **Supabase** (base de datos en la nube)

---

## 1️⃣ BACKEND (Carpeta `backend/`)

### ¿Qué es el backend?

Es un servidor que corre en tu computadora y maneja:

- La lógica de negocio (cálculos, validaciones)
- La comunicación con la base de datos
- Las APIs (rutas para que el frontend pida datos)

### Archivos importantes del backend:

#### 📄 `backend/.env` (Variables de entorno - SECRETO)

```
SUPABASE_URL=https://mebwuyegutwgimqhvjlv.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_KEY=eyJhbGci...
PORT=3000
NODE_ENV=development
```

**¿Qué es esto?**

- Son las "llaves" para conectarse a Supabase
- Es como el usuario y contraseña de tu base de datos
- **NUNCA se sube a GitHub** (está en .gitignore)
- Solo tú lo tienes en tu computadora

**¿Para qué sirve cada variable?**

- `SUPABASE_URL`: La dirección de tu base de datos en Supabase
- `SUPABASE_ANON_KEY`: Llave pública (para operaciones básicas)
- `SUPABASE_SERVICE_KEY`: Llave privada (para operaciones de administrador)
- `PORT`: El puerto donde corre el backend (3000)
- `NODE_ENV`: Modo de desarrollo

#### 📄 `backend/.env.example` (Plantilla pública)

```
SUPABASE_URL=tu_url_aqui
SUPABASE_ANON_KEY=tu_anon_key_aqui
...
```

**¿Qué es esto?**

- Es una plantilla SIN las llaves reales
- SÍ se sube a GitHub
- Sirve para que tu equipo sepa qué variables necesitan configurar
- Cada persona copia este archivo, lo renombra a `.env` y pone sus propias llaves

#### 📄 `backend/src/server.js` (Servidor principal)

```javascript
const express = require("express");
const app = express();

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000);
```

**¿Qué hace?**

- Crea un servidor web con Express
- Define "rutas" (URLs) que el frontend puede llamar
- Ejemplo: `http://localhost:3000/api/health` devuelve `{ status: 'ok' }`

**Rutas actuales:**

- `GET /api/health` → Verifica que el servidor funciona
- `GET /api/test-supabase` → Verifica conexión con Supabase

#### 📄 `backend/src/config/supabase.js` (Configuración de Supabase)

```javascript
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

module.exports = { supabase };
```

**¿Qué hace?**

- Lee las variables del archivo `.env`
- Crea una conexión con Supabase
- Exporta el cliente para usarlo en otros archivos

#### 📄 `backend/package.json` (Configuración del proyecto)

```json
{
  "name": "brota-backend",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

**¿Qué es esto?**

- Define el nombre del proyecto
- Define comandos que puedes ejecutar:
  - `npm start` → Inicia el servidor (modo producción)
  - `npm run dev` → Inicia el servidor con auto-recarga (modo desarrollo)
- Lista las dependencias (librerías) que necesita el proyecto

---

## 2️⃣ FRONTEND (Carpeta `frontend/`)

### ¿Qué es el frontend?

Es la interfaz visual que ves en el navegador:

- Páginas web
- Botones, formularios, textos
- Interacción con el usuario

### Archivos importantes del frontend:

#### 📄 `frontend/.env` (Variables de entorno - PÚBLICO)

```
VITE_SUPABASE_URL=https://mebwuyegutwgimqhvjlv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**¿Qué es esto?**

- Las llaves para que el frontend se conecte a Supabase
- Solo usa la llave ANON (pública), NO la SERVICE_KEY (privada)
- El prefijo `VITE_` es obligatorio para que Vite las reconozca

**¿Por qué ANON y no SERVICE?**

- El frontend corre en el navegador del usuario
- Cualquiera puede ver el código del navegador
- Por eso solo usamos la llave pública (ANON)
- La llave privada (SERVICE) solo está en el backend

#### 📄 `frontend/src/config/supabase.js` (Configuración de Supabase)

```javascript
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export { supabase };
```

**¿Qué hace?**

- Lee las variables del archivo `.env`
- Crea una conexión con Supabase desde el frontend
- Exporta el cliente para usarlo en componentes React

#### 📄 `frontend/src/App.jsx` (Componente principal)

```javascript
import { supabase } from "./config/supabase";

function App() {
  return (
    <div>
      <h1>🌱 Brota - Frontend</h1>
      <p>Estado de Conexión</p>
    </div>
  );
}
```

**¿Qué es esto?**

- Es el componente principal de React
- Define lo que ves en el navegador
- Aquí es donde cambias los textos, botones, etc.

**¿Cómo cambiar los textos?**

- Abre `frontend/src/App.jsx`
- Cambia el contenido dentro de los `<h1>`, `<p>`, etc.
- Guarda el archivo
- El navegador se actualiza automáticamente

#### 📄 `frontend/src/main.jsx` (Punto de entrada)

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

**¿Qué hace?**

- Es el primer archivo que se ejecuta
- Monta el componente `App` en el HTML
- No necesitas modificar este archivo normalmente

#### 📄 `frontend/package.json` (Configuración del proyecto)

```json
{
  "name": "frontend",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

**¿Qué es esto?**

- Define comandos:
  - `npm run dev` → Inicia el servidor de desarrollo (http://localhost:5173)
  - `npm run build` → Crea la versión para producción
- Lista las dependencias del frontend

---

## 3️⃣ SUPABASE (Base de datos en la nube)

### ¿Qué es Supabase?

- Es una plataforma que te da una base de datos PostgreSQL en la nube
- No necesitas instalar PostgreSQL en tu computadora
- Incluye autenticación de usuarios automática
- Tiene una interfaz web para administrar la base de datos

### ¿Cómo funciona?

1. Creaste una cuenta en Supabase
2. Creaste un proyecto llamado "Brota"
3. Supabase te dio:
   - Una URL (dirección de tu base de datos)
   - Llaves de acceso (ANON_KEY y SERVICE_KEY)
4. Configuraste esas llaves en los archivos `.env`

### ¿Qué falta hacer?

- Crear las tablas en Supabase (ejecutar el SQL)
- Eso lo haremos después de esta explicación

---

## 🔄 ¿CÓMO SE CONECTA TODO?

```
┌─────────────────┐
│   NAVEGADOR     │
│  (localhost:    │
│     5173)       │
└────────┬────────┘
         │
         │ 1. Usuario ve la página
         │
┌────────▼────────┐
│   FRONTEND      │
│   (React +      │
│    Vite)        │
└────────┬────────┘
         │
         │ 2. Frontend pide datos
         │
┌────────▼────────┐
│   SUPABASE      │
│  (Base de       │
│   Datos)        │
└────────┬────────┘
         │
         │ 3. Supabase devuelve datos
         │
┌────────▼────────┐
│   BACKEND       │
│  (Node.js +     │
│   Express)      │
└─────────────────┘
         │
         │ 4. Backend procesa y devuelve
         │
         └──────► FRONTEND muestra datos
```

### Flujo de ejemplo: Login de usuario

1. **Usuario escribe email y contraseña** en el frontend
2. **Frontend llama a Supabase** con `supabase.auth.signIn()`
3. **Supabase verifica** las credenciales
4. **Supabase devuelve** un token de sesión
5. **Frontend guarda** el token y muestra la página de inicio

---

## 📁 ESTRUCTURA DE CARPETAS

```
Documentacion_Brota/
│
├── backend/                    # Servidor Node.js
│   ├── .env                    # Variables secretas (NO subir a GitHub)
│   ├── .env.example            # Plantilla pública
│   ├── package.json            # Configuración del proyecto
│   ├── src/
│   │   ├── server.js           # Servidor principal
│   │   ├── config/
│   │   │   └── supabase.js     # Conexión a Supabase
│   │   └── modules/            # Módulos de la aplicación
│   │       ├── auth/           # Autenticación
│   │       └── usuarios/       # Gestión de usuarios
│   └── tests/                  # Pruebas
│
├── frontend/                   # Aplicación React
│   ├── .env                    # Variables públicas
│   ├── .env.example            # Plantilla pública
│   ├── package.json            # Configuración del proyecto
│   ├── index.html              # HTML principal
│   ├── src/
│   │   ├── main.jsx            # Punto de entrada
│   │   ├── App.jsx             # Componente principal
│   │   ├── config/
│   │   │   └── supabase.js     # Conexión a Supabase
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── Auth/           # Componentes de autenticación
│   │   │   ├── Layout/         # Componentes de layout
│   │   │   └── Shared/         # Componentes compartidos
│   │   ├── pages/              # Páginas de la aplicación
│   │   ├── hooks/              # Custom hooks
│   │   ├── contexts/           # Contextos de React
│   │   ├── utils/              # Utilidades
│   │   └── styles/             # Estilos CSS
│   └── public/                 # Archivos estáticos
│
└── docs/                       # Documentación
    ├── 00_START_HERE.md        # Inicio rápido
    ├── mvp_actual.md           # Alcance del MVP
    └── ...
```

---

## 🚀 ¿POR DÓNDE SEGUIMOS?

### Próximos pasos en orden:

1. **Crear las tablas en Supabase** (ejecutar el SQL)
   - Archivo: `backend/setup_database.sql`
   - Acción: Copiar y pegar en Supabase SQL Editor

2. **Implementar el login básico**
   - Archivos a crear:
     - `frontend/src/components/Auth/Login.jsx` (formulario de login)
     - `frontend/src/components/Auth/Register.jsx` (formulario de registro)
     - `frontend/src/contexts/AuthContext.jsx` (manejo de sesión)

3. **Crear la página de inicio**
   - Archivo: `frontend/src/pages/Home.jsx`
   - Mostrar información del usuario logueado

4. **Probar todo el flujo**
   - Registrar un usuario
   - Iniciar sesión
   - Ver la página de inicio

---

## 🎨 ¿DÓNDE SE ALTERAN LOS TEXTOS?

### Para cambiar textos en el frontend:

1. **Textos de la página principal**: `frontend/src/App.jsx`
2. **Textos del login**: `frontend/src/components/Auth/Login.jsx` (aún no existe)
3. **Textos del registro**: `frontend/src/components/Auth/Register.jsx` (aún no existe)
4. **Estilos (colores, tamaños)**: `frontend/src/App.css` o `frontend/src/index.css`

### Ejemplo de cómo cambiar un texto:

**Antes:**

```javascript
<h1>🌱 Brota - Frontend</h1>
```

**Después:**

```javascript
<h1>🌱 Bienvenido a Brota</h1>
```

Guarda el archivo y el navegador se actualiza automáticamente.

---

## 🔐 ¿CÓMO SE CONECTA EL FRONTEND CON EL BACKEND?

### Opción 1: Frontend → Supabase (Directo)

```javascript
// En el frontend
import { supabase } from "./config/supabase";

// Obtener datos directamente de Supabase
const { data, error } = await supabase.from("programas").select("*");
```

**Cuándo usar:**

- Operaciones simples (leer, crear, actualizar)
- No requiere lógica compleja
- Supabase maneja la seguridad con RLS (Row Level Security)

### Opción 2: Frontend → Backend → Supabase

```javascript
// En el frontend
const response = await fetch("http://localhost:3000/api/recomendaciones");
const data = await response.json();
```

```javascript
// En el backend (server.js)
app.get("/api/recomendaciones", async (req, res) => {
  // Lógica compleja aquí
  const recomendaciones = calcularRecomendaciones(usuario);
  res.json(recomendaciones);
});
```

**Cuándo usar:**

- Operaciones complejas (algoritmo de recomendación)
- Necesitas hacer cálculos o validaciones
- Necesitas combinar datos de múltiples tablas

---

## 📝 COMANDOS IMPORTANTES

### Backend:

```bash
cd backend                  # Entrar a la carpeta backend
npm install                 # Instalar dependencias
npm run dev                 # Iniciar servidor (modo desarrollo)
npm start                   # Iniciar servidor (modo producción)
```

### Frontend:

```bash
cd frontend                 # Entrar a la carpeta frontend
npm install                 # Instalar dependencias
npm run dev                 # Iniciar servidor (modo desarrollo)
npm run build               # Crear versión para producción
```

### Git:

```bash
git status                  # Ver cambios
git add .                   # Agregar todos los cambios
git commit -m "mensaje"     # Guardar cambios
git push                    # Subir cambios a GitHub
```

---

## ❓ PREGUNTAS FRECUENTES

### ¿Por qué hay dos archivos .env?

- `backend/.env` → Para el servidor (con llave privada)
- `frontend/.env` → Para el navegador (solo llave pública)

### ¿Por qué no se sube .env a GitHub?

- Contiene llaves secretas
- Si alguien las ve, puede acceder a tu base de datos
- Cada persona del equipo tiene su propio `.env`

### ¿Qué es npm?

- Node Package Manager
- Instala y gestiona librerías de JavaScript
- Como un "instalador de programas" para desarrollo web

### ¿Qué es Vite?

- Herramienta para desarrollo frontend
- Recarga automática cuando guardas cambios
- Muy rápido y moderno

### ¿Qué es Express?

- Framework para crear servidores web con Node.js
- Simplifica la creación de APIs
- Muy popular y fácil de usar

---

## ✅ RESUMEN

**Lo que hemos hecho:**

1. ✅ Instalado Node.js y npm
2. ✅ Creado estructura de carpetas (backend y frontend)
3. ✅ Configurado Supabase (base de datos)
4. ✅ Creado archivos `.env` con las llaves
5. ✅ Instalado dependencias (Express, React, Supabase)
6. ✅ Creado servidor backend (http://localhost:3000)
7. ✅ Creado aplicación frontend (http://localhost:5173)
8. ✅ Verificado conexión con Supabase

**Lo que falta:**

1. ⏳ Crear tablas en Supabase (ejecutar SQL)
2. ⏳ Implementar login y registro
3. ⏳ Crear páginas del frontend
4. ⏳ Implementar algoritmo de recomendación

---

¿Tienes alguna pregunta sobre algo específico? ¿Quieres que profundice en algún tema?
