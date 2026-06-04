# 📱 MODO DEMO - GUÍA PARA EL EQUIPO

## ¿Qué es el Modo Demo?

El frontend ahora funciona **sin necesidad de Supabase** mientras tu equipo trabaja en desarrollo.

Si **no hay variables de entorno** configuradas (`.env.local`), la app entra automáticamente en:
- ✅ Modo Demo
- ✅ Todos los botones funcionan
- ✅ Los formularios validan correctamente
- ✅ Se ve exactamente igual que el modo real

---

## 🚀 Cómo comenzar

### **Opción 1: Trabajar en MODO DEMO (sin Supabase)**

1. Abre la terminal en `frontend/`
2. Ejecuta:
   ```bash
   npm run dev
   ```
3. Abre el navegador en: `http://localhost:5173`
4. ¡Listo! Ya está en modo demo

**¿Qué ves?**
- ✅ Formulario de login/registro funcionando
- ✅ Validación en tiempo real
- ✅ Dashboard con datos ficticios
- ✅ Badge amarillo que dice "MODO DEMO"

### **Opción 2: Conectar con Supabase REAL**

Si quieres usar datos reales:

1. Obtén las keys de Supabase (ver abajo)
2. Crea archivo: `frontend/.env.local`
3. Pega:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
   ```
4. Guarda y recarga (F5)

---

## 🎯 Cómo obtener las keys de Supabase

### **Paso 1: Ir a Supabase**
https://supabase.com

### **Paso 2: Iniciar sesión o crear cuenta**
(Si no tienes cuenta)

### **Paso 3: Crear un proyecto**
- Click en "New Project"
- Nombre: `brota-dev` (o el que prefieras)
- Contraseña de BD: crea una fuerte
- Región: selecciona la más cercana

### **Paso 4: Copiar las keys**
- Ve a: **Settings → API** (lateral izquierdo)
- Busca:
  - **Project URL** → `VITE_SUPABASE_URL`
  - **anon public** → `VITE_SUPABASE_ANON_KEY`

### **Paso 5: Guardar en `.env.local`**
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
```

### **Paso 6: Recargar el navegador**
F5 o Cmd+R

---

## ✅ Checklist de desarrollo

**Trabajando en MODO DEMO:**
- ✅ Diseñador → Puede diseñar el Dashboard sin preocupaciones
- ✅ Frontend Dev → Puede agregar componentes sin Supabase
- ✅ Backend Dev → Puede trabajar en validación en paralelo

**Cuando tengas Supabase configurado:**
- ✅ Cambiar a modo real
- ✅ Las transacciones auténticas funcionan
- ✅ Los datos se guardan en la BD

---

## 🔄 Diferencias: Modo Demo vs Modo Real

| Feature | Demo | Real |
|---------|------|------|
| Validación | ✅ | ✅ |
| Formularios | ✅ | ✅ |
| Rutas | ✅ | ✅ |
| Datos persistentes | ❌ (ficticios) | ✅ (BD real) |
| Autenticación | 🎭 (simulada) | 🔐 (segura) |
| Badge "MODO DEMO" | ✅ (visible) | ❌ (no visible) |

---

## 🛠️ Troubleshooting

### "No veo nada"
→ Ejecuta `npm run dev` en `frontend/`

### "Veo errores en la consola"
→ Abre: F12 → Console (pestaña azul)
→ Comparte el error completo

### "Quiero volver a modo demo después de configurar Supabase"
→ Elimina o comenta las líneas en `.env.local`
→ Recarga: F5

### "¿Los cambios en .env.local requieren reiniciar el servidor?"
→ Sí, después de cambiar `.env.local`:
```bash
# Termina el servidor (Ctrl+C)
# Reinicia:
npm run dev
```

---

## 📌 Resumen

**Ahora el equipo puede:**
1. ✅ Clonar el repo
2. ✅ Ejecutar `npm run dev`
3. ✅ **¡Comenzar a trabajar inmediatamente!**
4. ✅ Sin esperar a que alguien configure Supabase
5. ✅ Sin errores de "falta .env.local"

**Cuando estén listos:**
- Obtienen keys de Supabase
- Configuran `.env.local`
- Cambian a modo real
- ¡Todo sigue funcionando igual!

---

¡Ahora todos pueden trabajar desde el primer día! 🚀
