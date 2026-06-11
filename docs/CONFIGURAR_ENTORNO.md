# 🔧 Guía: Conectarse a la Base de Datos (Supabase)

> Cada miembro del equipo debe hacer esto UNA SOLA VEZ para poder trabajar con la base de datos real.

---

## ¿Por qué necesito esto?

El proyecto usa **Supabase** como base de datos. Para conectarte, necesitas unas "llaves" (API keys) que están en el panel de Supabase.

Estas llaves **NO están en el repositorio de Git** por seguridad — cada desarrollador las configura en su propia máquina en archivos `.env` que son locales y nunca se suben.

---

## Paso 1: Pedir las llaves al líder del proyecto

Pídele a **David** que te comparta los valores de:

| Variable | Descripción |
|----------|-------------|
| `SUPABASE_URL` | URL del proyecto (igual para todos) |
| `SUPABASE_SERVICE_KEY` | Llave privada del backend |
| `VITE_SUPABASE_ANON_KEY` | Llave pública del frontend |
| `JWT_SECRET` | Clave para tokens de email |
| `SMTP_USER` | Email de Gmail para envíos |
| `SMTP_PASS` | Contraseña de app de Gmail |

> O si tienes acceso al proyecto en Supabase, ve a **Settings → API** para ver la URL y las keys.

---

## Paso 2: Crear el archivo `.env` del Backend

1. Abre una terminal y ve a la carpeta `backend/`:
   ```bash
   cd backend
   ```

2. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

3. Abre el archivo `.env` que se acaba de crear y rellena los valores reales:
   ```
   SUPABASE_URL=https://XXXXXXXXXXXXXXXX.supabase.co
   SUPABASE_SERVICE_KEY=eyJ...  (la llave larga que te dio David)
   JWT_SECRET=un_string_largo_aleatorio
   SMTP_USER=correo@gmail.com
   SMTP_PASS=contraseña_de_app
   SMTP_FROM=Brota App <correo@gmail.com>
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

---

## Paso 3: Crear el archivo `.env.local` del Frontend

1. Ve a la carpeta `frontend/`:
   ```bash
   cd frontend
   ```

2. Copia el archivo de ejemplo:
   ```bash
   cp .env.local.example .env.local
   ```

3. Abre `.env.local` y rellena los valores:
   ```
   VITE_SUPABASE_URL=https://XXXXXXXXXXXXXXXX.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...  (la llave pública que te dio David)
   ```

---

## Paso 4: Verificar que todo funciona

Inicia el backend:
```bash
cd backend
npm run dev
```

Deberías ver en la consola:
```
✅ Supabase configurado correctamente
Servidor iniciado en puerto 3000
```

Luego inicia el frontend (en otra terminal):
```bash
cd frontend
npm run dev
```

Abre el navegador y ve a `http://localhost:5173`. Ahora deberías poder hacer login con una cuenta real de Supabase.

---

## ⚠️ Reglas importantes

- **NUNCA subas `.env` o `.env.local` a Git.** Ya están en el `.gitignore`, así que Git los ignora automáticamente.
- La `SERVICE_KEY` del backend es privada y tiene permisos de administrador — no la compartas por canales públicos (usa un canal privado de WhatsApp o Discord).
- La `ANON_KEY` del frontend es pública, no pasa nada si alguien la ve.
- Si el servidor arranca sin el `.env`, lanzará el error `❌ Faltan variables de entorno de Supabase`.

---

## 🗂️ Estructura de llaves: ¿cuál va dónde?

```
Supabase tiene 2 llaves:

  anon key (pública)  →  Solo va en: frontend/.env.local
  service_role key    →  Solo va en: backend/.env
  (privada)
```

**¿Por qué dos llaves distintas?**
- El código del **frontend** corre en el navegador del usuario. Cualquiera puede abrirlo con F12 y ver las variables. Por eso solo usamos la llave pública (`anon`).
- El código del **backend** corre en el servidor, nadie lo ve. Ahí sí podemos usar la llave privada (`service_role`) que tiene permisos de administrador.

---

## ¿Problemas?

| Error | Causa | Solución |
|-------|-------|----------|
| `❌ Faltan variables de entorno de Supabase` | No existe el `.env` del backend | Ejecuta el Paso 2 |
| El frontend muestra "MODO DEMO" | No existe el `.env.local` del frontend | Ejecuta el Paso 3 |
| `Invalid API key` en Supabase | Copiaste mal la key | Cópiala de nuevo desde Supabase → Settings → API |
| `Error connecting to database` | URL de Supabase incorrecta | Verifica `SUPABASE_URL` sin slash al final |
