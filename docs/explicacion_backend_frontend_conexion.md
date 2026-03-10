# 🔄 Cómo se Conectan Backend y Frontend

## 📋 Índice

1. [Visión general](#visión-general)
2. [Rutas del backend (Getters)](#rutas-del-backend-getters)
3. [Cómo el frontend llama al backend](#cómo-el-frontend-llama-al-backend)
4. [Ejemplo completo paso a paso](#ejemplo-completo-paso-a-paso)
5. [Métodos HTTP explicados](#métodos-http-explicados)
6. [Ejemplo práctico: Login](#ejemplo-práctico-login)

---

## 1. Visión General

### Arquitectura de Brota:

```
┌─────────────────┐
│   NAVEGADOR     │  ← Usuario ve la página
│  (localhost:    │
│     5173)       │
└────────┬────────┘
         │
         │ HTTP Request (petición)
         │ fetch('http://localhost:3000/api/health')
         │
┌────────▼────────┐
│   FRONTEND      │  ← React + Vite
│   (React)       │  ← Archivos: App.jsx, main.jsx
└────────┬────────┘
         │
         │ HTTP Request
         │ GET /api/health
         │
┌────────▼────────┐
│   BACKEND       │  ← Node.js + Express
│   (Express)     │  ← Archivo: server.js
└────────┬────────┘
         │
         │ SQL Query
         │ SELECT * FROM programas
         │
┌────────▼────────┐
│   SUPABASE      │  ← Base de datos PostgreSQL
│  (PostgreSQL)   │  ← Tablas: programas, usuarios, etc.
└─────────────────┘
```

---

## 2. Rutas del Backend (Getters)

### ¿Qué es una ruta?

Una ruta es como una "dirección" en tu servidor. Cuando alguien visita esa dirección, se ejecuta una función.

### Anatomía de una ruta:

```javascript
app.MÉTODO("/ruta", (req, res) => {
  // Código que se ejecuta
  res.json({ mensaje: "Hola" });
});
```

**Partes:**

- `app` = Tu aplicación Express
- `MÉTODO` = Tipo de operación (GET, POST, PUT, DELETE)
- `'/ruta'` = URL que el cliente visita
- `(req, res)` = Función que se ejecuta
  - `req` = Request (petición que llega)
  - `res` = Response (respuesta que envías)

### Ejemplo real del backend:

```javascript
// RUTA 1: Verificar que el servidor funciona
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend funcionando",
  });
});

// RUTA 2: Obtener todos los programas
app.get("/api/programas", async (req, res) => {
  const { data, error } = await supabase.from("programas").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// RUTA 3: Obtener un programa específico
app.get("/api/programas/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID de la URL

  const { data, error } = await supabase
    .from("programas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(404).json({ error: "Programa no encontrado" });
  }

  res.json(data);
});

// RUTA 4: Crear un nuevo programa
app.post("/api/programas", async (req, res) => {
  const { nombre, tipo, area_academica } = req.body; // Datos del frontend

  const { data, error } = await supabase
    .from("programas")
    .insert({ nombre, tipo, area_academica })
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data);
});
```

### Explicación de cada ruta:

#### RUTA 1: GET /api/health

- **Propósito:** Verificar que el servidor funciona
- **URL completa:** `http://localhost:3000/api/health`
- **Método:** GET (solo lectura)
- **Respuesta:** `{ status: 'ok', message: 'Backend funcionando' }`

#### RUTA 2: GET /api/programas

- **Propósito:** Obtener todos los programas
- **URL completa:** `http://localhost:3000/api/programas`
- **Método:** GET (solo lectura)
- **Respuesta:** Array de programas `[{ id: 1, nombre: '...' }, ...]`

#### RUTA 3: GET /api/programas/:id

- **Propósito:** Obtener un programa específico
- **URL completa:** `http://localhost:3000/api/programas/123`
- **Método:** GET (solo lectura)
- **`:id`** es un parámetro dinámico (puede ser cualquier ID)
- **Respuesta:** Un programa `{ id: 123, nombre: '...' }`

#### RUTA 4: POST /api/programas

- **Propósito:** Crear un nuevo programa
- **URL completa:** `http://localhost:3000/api/programas`
- **Método:** POST (crear datos)
- **Body:** `{ nombre: 'Ingeniería', tipo: 'Pregrado', area_academica: 'Tecnología' }`
- **Respuesta:** El programa creado `{ id: 124, nombre: 'Ingeniería', ... }`

---

## 3. Cómo el Frontend Llama al Backend

### Método 1: fetch() (JavaScript nativo)

```javascript
// En el frontend (App.jsx)

// GET: Obtener datos
const obtenerProgramas = async () => {
  try {
    // 1. Hacer la petición al backend
    const response = await fetch("http://localhost:3000/api/programas");

    // 2. Convertir la respuesta a JSON
    const data = await response.json();

    // 3. Usar los datos
    console.log(data); // [{ id: 1, nombre: '...' }, ...]
  } catch (error) {
    console.error("Error:", error);
  }
};

// POST: Crear datos
const crearPrograma = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/programas", {
      method: "POST", // Especificar el método
      headers: {
        "Content-Type": "application/json", // Tipo de datos
      },
      body: JSON.stringify({
        // Convertir objeto a JSON
        nombre: "Ingeniería de Sistemas",
        tipo: "Pregrado",
        area_academica: "Tecnología",
      }),
    });

    const data = await response.json();
    console.log("Programa creado:", data);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### Método 2: Supabase directo (sin backend)

```javascript
// En el frontend (App.jsx)
import { supabase } from "./config/supabase";

// Obtener datos
const obtenerProgramas = async () => {
  const { data, error } = await supabase.from("programas").select("*");

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log(data);
};

// Crear datos
const crearPrograma = async () => {
  const { data, error } = await supabase.from("programas").insert({
    nombre: "Ingeniería de Sistemas",
    tipo: "Pregrado",
    area_academica: "Tecnología",
  });

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("Programa creado:", data);
};
```

---

## 4. Ejemplo Completo Paso a Paso

### Escenario: Mostrar lista de programas en el frontend

#### PASO 1: Crear la ruta en el backend

**Archivo: backend/src/server.js**

```javascript
// Ruta para obtener todos los programas
app.get("/api/programas", async (req, res) => {
  try {
    // Consultar Supabase
    const { data, error } = await supabase
      .from("programas")
      .select("*")
      .eq("activo", true); // Solo programas activos

    if (error) throw error;

    // Enviar respuesta exitosa
    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    // Enviar respuesta de error
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
```

#### PASO 2: Llamar la ruta desde el frontend

**Archivo: frontend/src/App.jsx**

```javascript
import { useState, useEffect } from "react";

function App() {
  // Estado para guardar los programas
  const [programas, setProgramas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta al cargar el componente
  useEffect(() => {
    const cargarProgramas = async () => {
      try {
        // 1. Hacer petición al backend
        const response = await fetch("http://localhost:3000/api/programas");

        // 2. Convertir respuesta a JSON
        const resultado = await response.json();

        // 3. Verificar si hubo error
        if (resultado.status === "error") {
          throw new Error(resultado.message);
        }

        // 4. Guardar programas en el estado
        setProgramas(resultado.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Ejecutar la función
    cargarProgramas();
  }, []); // [] = solo se ejecuta una vez

  // Mostrar loading
  if (loading) {
    return <div>Cargando programas...</div>;
  }

  // Mostrar error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Mostrar programas
  return (
    <div>
      <h1>Programas Disponibles</h1>
      <ul>
        {programas.map((programa) => (
          <li key={programa.id}>
            {programa.nombre} - {programa.tipo}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

#### PASO 3: Flujo completo

```
1. Usuario abre el navegador
   ↓
2. React carga App.jsx
   ↓
3. useEffect se ejecuta automáticamente
   ↓
4. cargarProgramas() hace fetch al backend
   ↓
5. Backend recibe GET /api/programas
   ↓
6. Backend consulta Supabase
   ↓
7. Supabase devuelve los datos
   ↓
8. Backend envía respuesta al frontend
   ↓
9. Frontend recibe los datos
   ↓
10. setProgramas actualiza el estado
   ↓
11. React re-renderiza el componente
   ↓
12. Usuario ve la lista de programas
```

---

## 5. Métodos HTTP Explicados

### GET (Obtener datos)

```javascript
// Backend
app.get("/api/programas", (req, res) => {
  res.json({ mensaje: "Obtener programas" });
});

// Frontend
fetch("http://localhost:3000/api/programas");
```

**Uso:** Leer datos, no modifica nada.

### POST (Crear datos)

```javascript
// Backend
app.post("/api/programas", (req, res) => {
  const { nombre } = req.body;
  res.json({ mensaje: `Crear programa: ${nombre}` });
});

// Frontend
fetch("http://localhost:3000/api/programas", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre: "Ingeniería" }),
});
```

**Uso:** Crear nuevos registros.

### PUT (Actualizar datos)

```javascript
// Backend
app.put("/api/programas/:id", (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  res.json({ mensaje: `Actualizar programa ${id}` });
});

// Frontend
fetch("http://localhost:3000/api/programas/123", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre: "Nuevo nombre" }),
});
```

**Uso:** Actualizar registros existentes.

### DELETE (Eliminar datos)

```javascript
// Backend
app.delete("/api/programas/:id", (req, res) => {
  const { id } = req.params;
  res.json({ mensaje: `Eliminar programa ${id}` });
});

// Frontend
fetch("http://localhost:3000/api/programas/123", {
  method: "DELETE",
});
```

**Uso:** Eliminar registros.

---

## 6. Ejemplo Práctico: Login

### Backend (server.js):

```javascript
app.post("/api/auth/login", async (req, res) => {
  try {
    // 1. Obtener email y password del body
    const { email, password } = req.body;

    // 2. Validar que existan
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email y contraseña son requeridos",
      });
    }

    // 3. Autenticar con Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // 4. Verificar si hubo error
    if (error) {
      return res.status(401).json({
        status: "error",
        message: "Credenciales inválidas",
      });
    }

    // 5. Enviar respuesta exitosa
    res.json({
      status: "success",
      data: {
        user: data.user,
        session: data.session,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});
```

### Frontend (Login.jsx):

```javascript
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página
    setLoading(true);
    setError(null);

    try {
      // 1. Hacer petición al backend
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // 2. Convertir respuesta a JSON
      const resultado = await response.json();

      // 3. Verificar si hubo error
      if (resultado.status === "error") {
        throw new Error(resultado.message);
      }

      // 4. Login exitoso
      console.log("Usuario logueado:", resultado.data.user);
      // Aquí redirigirías al usuario a la página principal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
```

---

## ✅ Resumen

### Backend (server.js):

- Define rutas con `app.get()`, `app.post()`, etc.
- Cada ruta es una función que recibe `req` y `res`
- `req` contiene los datos que envía el frontend
- `res` envía la respuesta al frontend

### Frontend (App.jsx):

- Usa `fetch()` para hacer peticiones al backend
- Especifica el método HTTP (GET, POST, etc.)
- Envía datos en el `body` (para POST, PUT)
- Recibe la respuesta y la muestra en la página

### Flujo completo:

1. Frontend hace petición → `fetch('http://localhost:3000/api/...')`
2. Backend recibe petición → `app.get('/api/...', ...)`
3. Backend procesa → Consulta Supabase, hace cálculos, etc.
4. Backend envía respuesta → `res.json({ ... })`
5. Frontend recibe respuesta → `const data = await response.json()`
6. Frontend muestra datos → `setProgramas(data)`

---

¿Tienes alguna pregunta sobre cómo se conectan el backend y el frontend?
