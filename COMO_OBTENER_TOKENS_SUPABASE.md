# 🔑 Cómo Obtener los Tokens de Supabase

## Paso a Paso (con capturas de pantalla mentales)

### 1. Ve a tu Proyecto en Supabase

1. Abre https://supabase.com
2. Haz login
3. Verás tu proyecto "brota-dev" (o el nombre que le pusiste)
4. Click en el proyecto

### 2. Ve a Settings → API

1. En el sidebar izquierdo, busca el ícono de engranaje ⚙️ **Settings**
2. Click en **Settings**
3. En el menú que aparece, click en **API**

### 3. Copia los Tokens

Verás una página con varias secciones. Necesitas copiar 3 cosas:

#### A) Project URL

```
Sección: "Project URL"
Ejemplo: https://xxxxxxxxxxxxx.supabase.co
```

#### B) API Keys → anon public

```
Sección: "Project API keys"
Subsección: "anon public"
Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im...
(Es un texto MUY largo, como 200+ caracteres)
```

#### C) API Keys → service_role

```
Sección: "Project API keys"
Subsección: "service_role"
⚠️ Está oculta por defecto
Click en el botón "Reveal" o el ícono de ojo 👁️
Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im...
(También es un texto MUY largo)
```

### 4. Formato para Enviarme

Copia y pega esto, reemplazando con tus valores:

```
URL: https://xxxxxxxxxxxxx.supabase.co
ANON: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im...
SERVICE: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im...
```

## ⚠️ IMPORTANTE

- Los tokens son MUY largos (200-300 caracteres cada uno)
- Empiezan con `eyJ`
- Tienen puntos `.` en el medio
- NO incluyas espacios ni saltos de línea
- Copia TODO el token completo

## 🔍 Cómo Verificar que Copiaste Bien

Un token válido se ve así:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lYnd1eWVndXR3Z2ltcWh2amx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzI4NzAsImV4cCI6MjA1NzA0ODg3MH0.eiwQGetRTMnNksJjoI7GRg_RMpNc6fepostgresql
```

Tiene 3 partes separadas por puntos:

1. `eyJhbGc...` (header)
2. `eyJpc3M...` (payload)
3. `eiwQGet...` (signature)

---

Una vez que tengas los 3 tokens completos, envíamelos y yo configuro todo. 👍
