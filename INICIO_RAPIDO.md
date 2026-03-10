# 🚀 INICIO RÁPIDO - Desarrollo Brota

## 📋 Resumen

Ya tienes:

- ✅ Node.js v22.20.0
- ✅ npm 10.9.3
- ✅ Git 2.43.0
- ✅ Estructura de carpetas creada
- ✅ Archivos `.env.example` creados

## 🎯 Pasos para Empezar (30 minutos)

### 1. Crear Cuenta en Supabase (10 min)

1. Ve a https://supabase.com
2. Regístrate con GitHub o email
3. Crea un nuevo proyecto:
   - Name: `brota-dev`
   - Password: [genera una segura]
   - Region: South America (São Paulo)
   - Plan: Free
4. Espera 2-3 minutos
5. Ve a Settings → API y copia:
   - Project URL
   - anon public key
   - service_role key

### 2. Configurar Backend (10 min)

```bash
# Ir a carpeta backend
cd backend

# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install express cors dotenv @supabase/supabase-js
npm install --save-dev nodemon

# Crear archivo .env (copia de .env.example)
cp .env.example .env

# Editar .env con tus credenciales de Supabase
nano .env  # o usa tu editor favorito
```

Pega tus credenciales en `.env`:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
PORT=3000
NODE_ENV=development
```

### 3. Configurar Frontend (10 min)

```bash
# Ir a carpeta frontend
cd ../frontend

# Crear proyecto React con Vite
npm create vite@latest . -- --template react

# Instalar dependencias
npm install
npm install @supabase/supabase-js react-router-dom

# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
nano .env
```

Pega en `.env`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4. Probar que Funciona

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Abre: http://localhost:3000/api/health

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Abre: http://localhost:5173/

## ✅ Si Todo Funciona

Deberías ver:

- ✅ Backend: JSON con `{"status": "ok"}`
- ✅ Frontend: Página de Vite/React

## 📚 Documentación Completa

Ver: [docs/setup_desarrollo.md](docs/setup_desarrollo.md)

## 🆘 Ayuda

Si algo falla, revisa:

1. ¿Copiaste bien las credenciales de Supabase?
2. ¿Ejecutaste `npm install` en ambas carpetas?
3. ¿Los archivos `.env` existen?

## 🎯 Próximo Paso

Una vez que todo funcione, avísame y te ayudo a crear el login.
