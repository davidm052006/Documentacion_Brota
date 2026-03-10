# 🚀 Setup de Desarrollo - Proyecto Brota

**Objetivo:** Configurar el entorno de desarrollo para iniciar con el login básico  
**Tiempo estimado:** 30-45 minutos  
**Fecha:** Marzo 2026

---

## ✅ Lo que YA tienes instalado

- ✅ Git (2.43.0)
- ✅ Node.js (v22.20.0)
- ✅ npm (10.9.3)
- ✅ Sistema operativo: Linux

---

## 📦 Lo que necesitas instalar/configurar

### 1. Cuenta de Supabase (Gratis)

### 2. Estructura del proyecto

### 3. Dependencias de Node.js

**NO necesitas instalar:**

- ❌ PostgreSQL local (Supabase lo maneja)
- ❌ Docker (no es necesario para MVP)
- ❌ Nginx/Apache (Node.js tiene servidor incluido)

---

## 🎯 PASO 1: Crear Cuenta en Supabase

### 1.1 Registrarse en Supabase

1. Ve a https://supabase.com
2. Click en "Start your project"
3. Regístrate con GitHub (recomendado) o email
4. Verifica tu email

### 1.2 Crear Proyecto

1. Click en "New Project"
2. Configuración:
   - **Name:** brota-dev
   - **Database Password:** [Genera una segura y guárdala]
   - **Region:** South America (São Paulo) - Más cercano a Colombia
   - **Pricing Plan:** Free

3. Click "Create new project"
4. Espera 2-3 minutos mientras se crea

### 1.3 Obtener Credenciales

Una vez creado el proyecto:

1. Ve a **Settings** (⚙️) → **API**
2. Copia y guarda:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (clave pública)
   - **service_role key**: `eyJhbGc...` (clave privada - NUNCA compartir)

**Guárdalas en un lugar seguro** (las usaremos en el paso 3)

---

## 🎯 PASO 2: Estructura del Proyecto

### 2.1 Crear Estructura de Carpetas

Ejecuta estos comandos en tu terminal:

```bash
# Asegúrate de estar en la raíz del proyecto
cd ~/Desarrollo\ BROTA/Documentacion_Brota

# Crear estructura backend
mkdir -p backend/src/{config,modules/{auth,usuarios},shared/{middleware,utils}}
mkdir -p backend/tests

# Crear estructura frontend
mkdir -p frontend/src/{components/{Auth,Layout,Shared},pages,hooks,contexts,utils,styles}
mkdir -p frontend/public

# Crear archivos de configuración
touch backend/.env.example
touch backend/.env
touch frontend/.env.example
touch frontend/.env
```

### 2.2 Verificar Estructura

Tu proyecto debería verse así:

```
Documentacion_Brota/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   └── usuarios/
│   │   └── shared/
│   │       ├── middleware/
│   │       └── utils/
│   ├── tests/
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Layout/
│   │   │   └── Shared/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── styles/
│   ├── public/
│   ├── .env
│   └── .env.example
├── docs/
└── README.md
```

---

## 🎯 PASO 3: Configurar Backend

### 3.1 Inicializar Proyecto Node.js

```bash
cd backend
npm init -y
```

### 3.2 Instalar Dependencias

```bash
# Dependencias principales
npm install express cors dotenv @supabase/supabase-js

# Dependencias de desarrollo
npm install --save-dev nodemon
```

**¿Qué instalamos?**

- `express`: Framework web para crear APIs
- `cors`: Permitir peticiones desde el frontend
- `dotenv`: Cargar variables de entorno
- `@supabase/supabase-js`: Cliente de Supabase
- `nodemon`: Reiniciar servidor automáticamente al hacer cambios

### 3.3 Configurar Variables de Entorno

Edita `backend/.env` con tus credenciales de Supabase:

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...

# Server
PORT=3000
NODE_ENV=development
```

**⚠️ IMPORTANTE:** Reemplaza `xxxxx` con tus valores reales de Supabase

### 3.4 Crear .env.example (para el equipo)

Edita `backend/.env.example`:

```env
# Supabase
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here

# Server
PORT=3000
NODE_ENV=development
```

### 3.5 Actualizar package.json

Edita `backend/package.json` y agrega los scripts:

```json
{
  "name": "brota-backend",
  "version": "1.0.0",
  "description": "Backend para sistema Brota",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["brota", "orientacion-vocacional"],
  "author": "Equipo Brota",
  "license": "ISC"
}
```

---

## 🎯 PASO 4: Configurar Frontend

### 4.1 Crear Proyecto React con Vite

```bash
cd ../frontend
npm create vite@latest . -- --template react
```

Cuando pregunte si quieres continuar, escribe: `y`

### 4.2 Instalar Dependencias

```bash
# Instalar dependencias base
npm install

# Instalar dependencias adicionales
npm install @supabase/supabase-js react-router-dom
```

**¿Qué instalamos?**

- `@supabase/supabase-js`: Cliente de Supabase
- `react-router-dom`: Navegación entre páginas

### 4.3 Configurar Variables de Entorno

Edita `frontend/.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**⚠️ IMPORTANTE:**

- En Vite, las variables DEBEN empezar con `VITE_`
- Solo usa la `ANON_KEY` (nunca la SERVICE_KEY en frontend)

### 4.4 Crear .env.example

Edita `frontend/.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

---

## 🎯 PASO 5: Crear Archivos Base

### 5.1 Backend - Configuración de Supabase

Crea `backend/src/config/supabase.js`:

```javascript
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan variables de entorno de Supabase");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
```

### 5.2 Backend - Servidor Principal

Crea `backend/src/server.js`:

```javascript
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Brota API funcionando",
    timestamp: new Date().toISOString(),
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
});
```

### 5.3 Frontend - Cliente de Supabase

Crea `frontend/src/config/supabase.js`:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan variables de entorno de Supabase");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 🎯 PASO 6: Actualizar .gitignore

Asegúrate de que tu `.gitignore` incluya:

```
# Variables de entorno
.env
.env.local
.env.*.local

# Node modules
node_modules/
backend/node_modules/
frontend/node_modules/

# Build
backend/dist/
frontend/dist/
frontend/build/

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db
```

---

## 🎯 PASO 7: Probar que Todo Funciona

### 7.1 Probar Backend

```bash
# Terminal 1 - Backend
cd backend
npm run dev
```

Deberías ver:

```
🚀 Servidor corriendo en http://localhost:3000
📊 Ambiente: development
```

Abre tu navegador en: http://localhost:3000/api/health

Deberías ver:

```json
{
  "status": "ok",
  "message": "Brota API funcionando",
  "timestamp": "2026-03-06T..."
}
```

### 7.2 Probar Frontend

```bash
# Terminal 2 - Frontend (nueva terminal)
cd frontend
npm run dev
```

Deberías ver:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Abre tu navegador en: http://localhost:5173/

Deberías ver la página de inicio de Vite/React.

---

## ✅ Checklist Final

Antes de continuar, verifica que:

- [ ] Tienes cuenta en Supabase
- [ ] Proyecto de Supabase creado
- [ ] Credenciales guardadas
- [ ] Estructura de carpetas creada
- [ ] Backend inicializado (`npm init`)
- [ ] Dependencias de backend instaladas
- [ ] Variables de entorno configuradas (backend)
- [ ] Frontend creado con Vite
- [ ] Dependencias de frontend instaladas
- [ ] Variables de entorno configuradas (frontend)
- [ ] Archivos base creados
- [ ] Backend corriendo en http://localhost:3000
- [ ] Frontend corriendo en http://localhost:5173
- [ ] `.gitignore` actualizado

---

## 🎯 Próximos Pasos

Una vez que todo esté funcionando:

1. **Crear tabla de usuarios en Supabase**
2. **Implementar registro (signup)**
3. **Implementar login**
4. **Crear componente de formulario de login**

---

## 🆘 Problemas Comunes

### Error: "Cannot find module 'express'"

**Solución:** Ejecuta `npm install` en la carpeta backend

### Error: "SUPABASE_URL is not defined"

**Solución:** Verifica que el archivo `.env` existe y tiene las variables correctas

### Puerto 3000 ya en uso

**Solución:** Cambia el puerto en `.env` a otro (ej: 3001)

### Frontend no carga

**Solución:** Verifica que estás en la carpeta `frontend` y ejecutaste `npm install`

---

## 📝 Comandos Útiles

```bash
# Ver procesos de Node.js corriendo
ps aux | grep node

# Matar proceso en puerto 3000
lsof -ti:3000 | xargs kill -9

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Ver logs en tiempo real
npm run dev
```

---

**¿Listo para empezar?** Sigue los pasos en orden y avísame si tienes algún problema. 🚀

[← Volver a Documentación](00_START_HERE.md)
