# 📋 Resumen del Setup y Próximos Pasos

## ✅ Lo que ya está configurado

### 1. Backend (Node.js + Express)

- ✅ Servidor corriendo en `http://localhost:3000`
- ✅ Conexión con Supabase configurada
- ✅ Rutas de prueba funcionando:
  - `GET /api/health` → Verifica que el servidor funciona
  - `GET /api/test-supabase` → Verifica conexión con Supabase
- ✅ Archivos creados y comentados:
  - `backend/src/server.js` (servidor principal)
  - `backend/src/config/supabase.js` (configuración de Supabase)
  - `backend/.env` (variables de entorno)
  - `backend/package.json` (dependencias)

### 2. Frontend (React + Vite)

- ✅ Aplicación corriendo en `http://localhost:5173`
- ✅ Conexión con Supabase configurada
- ✅ Componente principal funcionando
- ✅ Archivos creados y comentados:
  - `frontend/src/App.jsx` (componente principal)
  - `frontend/src/main.jsx` (punto de entrada)
  - `frontend/src/config/supabase.js` (configuración de Supabase)
  - `frontend/.env` (variables de entorno)
  - `frontend/package.json` (dependencias)

### 3. Supabase (Base de datos)

- ✅ Proyecto creado en Supabase
- ✅ Llaves de acceso configuradas
- ⏳ Tablas pendientes de crear (siguiente paso)

### 4. Documentación

- ✅ `docs/explicacion_setup_completo.md` → Explicación de todo el setup
- ✅ `docs/explicacion_html_css_conexion.md` → Cómo funcionan HTML y CSS
- ✅ `docs/explicacion_backend_frontend_conexion.md` → Cómo se conectan backend y frontend
- ✅ `backend/setup_database.sql` → Script SQL para crear las tablas

---

## 📚 Archivos Importantes que Debes Conocer

### Backend (solo estos archivos):

```
backend/
├── .env                    ← Llaves secretas (NO tocar)
├── package.json            ← Lista de librerías
├── src/
│   ├── server.js           ← TU CÓDIGO (servidor principal)
│   └── config/
│       └── supabase.js     ← TU CÓDIGO (configuración)
└── node_modules/           ← NO TOCAR (librerías descargadas)
```

### Frontend (solo estos archivos):

```
frontend/
├── .env                    ← Llaves públicas (NO tocar)
├── package.json            ← Lista de librerías
├── src/
│   ├── App.jsx             ← TU CÓDIGO (página principal)
│   ├── App.css             ← TU CÓDIGO (estilos)
│   ├── main.jsx            ← TU CÓDIGO (punto de entrada)
│   └── config/
│       └── supabase.js     ← TU CÓDIGO (configuración)
└── node_modules/           ← NO TOCAR (librerías descargadas)
```

---

## 🎯 Próximos Pasos (en orden)

### PASO 1: Crear las tablas en Supabase ⏳

**Qué hacer:**

1. Abrir Supabase: https://supabase.com/dashboard
2. Ir a "SQL Editor"
3. Copiar el contenido de `backend/setup_database.sql`
4. Pegar en el editor y ejecutar (botón "Run")
5. Verificar que se crearon 8 tablas

**Resultado esperado:**

- 8 tablas creadas: `perfiles_usuario`, `instituciones`, `programas`, `convocatorias`, `cuestionarios`, `preguntas`, `resultados`, `recomendaciones`
- El mensaje en el frontend cambiará a: "✅ Conectado a Supabase correctamente"

### PASO 2: Implementar Login Básico

**Qué hacer:**

1. Crear componente de Login en el frontend
2. Crear componente de Registro en el frontend
3. Probar que funcione el registro de usuarios
4. Probar que funcione el inicio de sesión

**Archivos a crear:**

- `frontend/src/components/Auth/Login.jsx`
- `frontend/src/components/Auth/Register.jsx`
- `frontend/src/contexts/AuthContext.jsx`

### PASO 3: Crear Página de Inicio

**Qué hacer:**

1. Crear página de inicio para usuarios logueados
2. Mostrar información del usuario
3. Agregar navegación básica

**Archivos a crear:**

- `frontend/src/pages/Home.jsx`
- `frontend/src/components/Layout/Navbar.jsx`

### PASO 4: Implementar Cuestionario Vocacional

**Qué hacer:**

1. Crear preguntas en la base de datos
2. Crear componente de cuestionario
3. Guardar respuestas del usuario
4. Calcular perfil vocacional

**Archivos a crear:**

- `frontend/src/pages/Cuestionario.jsx`
- `backend/src/modules/cuestionarios/` (lógica del backend)

### PASO 5: Implementar Recomendaciones

**Qué hacer:**

1. Crear algoritmo de recomendación
2. Mostrar programas recomendados
3. Permitir filtrar y buscar programas

**Archivos a crear:**

- `frontend/src/pages/Recomendaciones.jsx`
- `backend/src/modules/recomendaciones/` (algoritmo)

---

## 🚀 Comandos que Necesitas Saber

### Para iniciar el backend:

```bash
cd backend
npm run dev
```

**Resultado:** Servidor corriendo en http://localhost:3000

### Para iniciar el frontend:

```bash
cd frontend
npm run dev
```

**Resultado:** Aplicación corriendo en http://localhost:5173

### Para detener un servidor:

Presiona `Ctrl + C` en la terminal

### Para instalar dependencias (si clonas el proyecto):

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Para subir cambios a GitHub:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 📖 Documentos de Referencia

### Para entender el setup:

- `docs/explicacion_setup_completo.md`

### Para entender HTML y CSS:

- `docs/explicacion_html_css_conexion.md`

### Para entender backend y frontend:

- `docs/explicacion_backend_frontend_conexion.md`

### Para ver el modelo de datos:

- `backend/modelo_datos.md`
- `docs/diagrama_mer.md`

### Para ver las decisiones técnicas:

- `backend/decisiones_tecnicas.md`
- `frontend/decisiones_tecnicas.md`

---

## 🔍 Cómo Hacer Cambios

### Para cambiar textos en el frontend:

1. Abre `frontend/src/App.jsx`
2. Busca el texto que quieres cambiar
3. Modifícalo
4. Guarda el archivo
5. El navegador se actualiza automáticamente

### Para cambiar estilos (colores, tamaños):

1. Abre `frontend/src/App.css`
2. Busca la clase CSS que quieres modificar
3. Cambia las propiedades
4. Guarda el archivo
5. El navegador se actualiza automáticamente

### Para agregar una nueva ruta en el backend:

1. Abre `backend/src/server.js`
2. Agrega una nueva ruta:

```javascript
app.get("/api/mi-ruta", (req, res) => {
  res.json({ mensaje: "Hola" });
});
```

3. Guarda el archivo
4. El servidor se reinicia automáticamente (si usas `npm run dev`)

### Para llamar esa ruta desde el frontend:

1. Abre `frontend/src/App.jsx`
2. Agrega una función:

```javascript
const llamarRuta = async () => {
  const response = await fetch("http://localhost:3000/api/mi-ruta");
  const data = await response.json();
  console.log(data);
};
```

3. Llama la función cuando necesites

---

## ⚠️ Cosas que NO Debes Tocar

### NO toques estos archivos/carpetas:

- `node_modules/` (backend y frontend)
- `package-lock.json` (backend y frontend)
- `.git/` (control de versiones)

### NO subas estos archivos a GitHub:

- `backend/.env` (llaves secretas)
- `frontend/.env` (llaves públicas)
- `node_modules/` (librerías)

Estos archivos ya están en `.gitignore`, así que Git los ignora automáticamente.

---

## 🆘 Solución de Problemas

### El backend no inicia:

1. Verifica que estás en la carpeta `backend`
2. Ejecuta `npm install` por si falta alguna dependencia
3. Verifica que el archivo `.env` existe y tiene las llaves correctas
4. Verifica que el puerto 3000 no esté ocupado

### El frontend no inicia:

1. Verifica que estás en la carpeta `frontend`
2. Ejecuta `npm install` por si falta alguna dependencia
3. Verifica que el archivo `.env` existe y tiene las llaves correctas
4. Verifica que el puerto 5173 no esté ocupado

### Error de conexión con Supabase:

1. Verifica que las llaves en `.env` son correctas
2. Verifica que el proyecto de Supabase está activo
3. Verifica tu conexión a internet

### Los cambios no se reflejan:

1. Guarda el archivo (Ctrl + S)
2. Verifica que el servidor está corriendo
3. Refresca el navegador (F5)
4. Si no funciona, detén el servidor (Ctrl + C) y vuelve a iniciarlo

---

## 📞 Preguntas Frecuentes

### ¿Qué es npm?

Es un "instalador de programas" para JavaScript. Descarga y gestiona librerías.

### ¿Qué es node_modules?

Es una carpeta con todas las librerías que tu proyecto necesita. No la toques.

### ¿Por qué hay dos archivos .env?

Uno para el backend (con llave privada) y otro para el frontend (con llave pública).

### ¿Qué es Supabase?

Es una plataforma que te da una base de datos PostgreSQL en la nube. No necesitas instalar nada.

### ¿Qué es Express?

Es una librería para crear servidores web con Node.js. Simplifica la creación de APIs.

### ¿Qué es React?

Es una librería para crear interfaces de usuario. Permite crear componentes reutilizables.

### ¿Qué es Vite?

Es una herramienta para desarrollo frontend. Recarga automática cuando guardas cambios.

---

## ✅ Checklist de Verificación

Antes de continuar con el desarrollo, verifica que:

- [ ] El backend está corriendo en http://localhost:3000
- [ ] El frontend está corriendo en http://localhost:5173
- [ ] Puedes ver la página en el navegador
- [ ] El mensaje dice "⚠️ Error: Could not find the table..." (es normal, aún no creamos las tablas)
- [ ] Entiendes cómo cambiar textos en `App.jsx`
- [ ] Entiendes cómo cambiar estilos en `App.css`
- [ ] Entiendes cómo funcionan las rutas del backend
- [ ] Entiendes cómo el frontend llama al backend

---

## 🎯 Siguiente Paso Inmediato

**Ahora vamos a crear las tablas en Supabase.**

1. Abre Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto "Brota"
3. Ve a "SQL Editor" en el menú lateral
4. Haz clic en "+ New query"
5. Copia TODO el contenido de `backend/setup_database.sql`
6. Pégalo en el editor
7. Haz clic en "Run" (o presiona Ctrl + Enter)
8. Espera unos segundos
9. Refresca tu navegador en http://localhost:5173
10. El mensaje debería cambiar a "✅ Conectado a Supabase correctamente"

**¿Listo para crear las tablas?**
