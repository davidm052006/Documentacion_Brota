# 🚀 Comandos para Iniciar el Proyecto

## ✅ Configuración Completada

Ya están configurados:

- ✅ Archivos `.env` con tus credenciales de Supabase
- ✅ Estructura de carpetas
- ✅ Archivos base del proyecto
- ✅ Configuración de Supabase

## 📝 Comandos a Ejecutar

### PASO 1: Instalar Dependencias del Backend

```bash
cd backend
npm install
```

Esto instalará:

- express
- cors
- dotenv
- @supabase/supabase-js
- nodemon (dev)

### PASO 2: Iniciar el Backend

```bash
npm run dev
```

Deberías ver:

```
🚀 ================================
🌱 Brota Backend iniciado
📡 Servidor: http://localhost:3000
📊 Ambiente: development
✅ Health check: http://localhost:3000/api/health
🔗 Test Supabase: http://localhost:3000/api/test-supabase
🚀 ================================
```

### PASO 3: Probar el Backend

Abre tu navegador en:

- http://localhost:3000/api/health
- http://localhost:3000/api/test-supabase

Deberías ver respuestas JSON.

### PASO 4: Configurar Frontend (Nueva Terminal)

```bash
# Abre una NUEVA terminal
cd frontend

# Crear proyecto React con Vite
npm create vite@latest . -- --template react

# Cuando pregunte si quieres continuar, escribe: y

# Instalar dependencias
npm install

# Instalar Supabase client
npm install @supabase/supabase-js react-router-dom
```

### PASO 5: Iniciar el Frontend

```bash
npm run dev
```

Deberías ver:

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### PASO 6: Probar el Frontend

Abre tu navegador en: http://localhost:5173/

Deberías ver la página de inicio de Vite/React.

---

## ✅ Checklist

Verifica que:

- [ ] Backend corriendo en http://localhost:3000
- [ ] Frontend corriendo en http://localhost:5173
- [ ] http://localhost:3000/api/health responde con JSON
- [ ] http://localhost:3000/api/test-supabase responde con JSON
- [ ] No hay errores en las terminales

---

## 🎯 Próximo Paso

Una vez que todo esté funcionando, avísame y te ayudo a:

1. Crear las tablas en Supabase
2. Implementar el sistema de login
3. Crear el formulario de registro

---

## 🆘 Si Algo Falla

### Error: "Cannot find module 'express'"

```bash
cd backend
npm install
```

### Error: "Port 3000 already in use"

Edita `backend/.env` y cambia:

```
PORT=3001
```

### Error en frontend

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## 📋 Resumen de Comandos

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm create vite@latest . -- --template react
npm install
npm install @supabase/supabase-js react-router-dom
npm run dev
```

¡Listo! Ejecuta estos comandos y avísame cuando esté todo corriendo. 🚀
