# 🧪 Prueba de Conexión a Supabase

Sigue estos pasos para verificar que tus llaves de Supabase funcionan correctamente.

---

## 📋 Requisitos previos

✅ Tienes una cuenta en [Supabase](https://supabase.com)  
✅ Ya creaste el proyecto  
✅ Ya ejecutaste el script `setup_database.sql` para crear las tablas  
✅ Tienes las keys de acceso (URL y Anon Key) - **DEBEN SER REALES, NO FICTICIAS**

⚠️ **IMPORTANTE:** El frontend está en MODO DEMO porque las keys están comentadas. Para probar la conexión, DEBES tener keys REALES de Supabase.

---

## 🚀 Pasos para probar la conexión

### Paso 1: Descomenta las variables de entorno

Abre `frontend/.env.local`:

```bash
# Cambia esto:
# VITE_SUPABASE_URL=https://proyecto.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...

# A esto (sin los #):
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anonkey-aqui
```

**¿De dónde obtengo las keys?**

1. Ve a https://supabase.com y **entra a tu proyecto existente**
2. En el menú lateral → **Settings** → **API**
3. Copia:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` → `VITE_SUPABASE_ANON_KEY`

⚠️ **CUIDADO:** Si las keys son ficticias o inválidas, causará pantalla blanca. Solo usa keys REALES de tu proyecto en Supabase.

### Paso 2: Inicia el servidor de desarrollo

```bash
cd frontend
npm run dev
```

Accede a `http://localhost:5173`

### Paso 3: Abre la consola del navegador

Presiona `F12` → Pestaña **Console**

### Paso 4: Copia y ejecuta el test

Copia todo el código de este archivo en la consola:

📄 `frontend/TEST_SUPABASE.js`

O simplemente pega esto en la consola:

```javascript
(async () => {
  const { supabase } = await import('./src/config/supabase.js');
  
  console.log('🚀 Probando conexión...\n');
  
  const { data: profiles, error } = await supabase
    .from('perfiles_usuario')
    .select('*')
    .limit(1);
  
  if (error) {
    console.error('❌ Error:', error.message);
  } else {
    console.log('✅ Conexión exitosa! Registros:', profiles?.length || 0);
  }
})();
```

---

## ✅ Resultados esperados

### Si funciona correctamente:
```
✅ Conexión exitosa! Registros: 0
```

(0 registros es normal si es la primera vez, la tabla está vacía)

### Si hay error:
```
❌ Error: Invalid API key

Posibles causas:
- Keys incorrectas o expiradas
- No hay conexión a internet
- Las tablas no existen
```

---

## 🔧 Solución de problemas

| Error | Causa | Solución |
|-------|-------|----------|| **Pantalla blanca** | Keys inválidas/ficticias descomenadas | Comenta las keys en `.env.local` o usa keys REALES de Supabase || `Invalid API key` | Keys incorrectas | Verifica en Settings → API que copiaste bien |
| `relation "perfiles_usuario" does not exist` | No creaste las tablas | Ejecuta `backend/setup_database.sql` en Supabase |
| `Permission denied` | Problemas de RLS | Ve a Auth → Policies y revisa la configuración |
| `Cannot fetch data` | Sin conexión internet | Verifica tu conexión a internet |

---

## 📊 Tablas esperadas

El script verifica estas 4 tablas:

- `perfiles_usuario` - Perfiles de usuarios registrados
- `convocatorias` - Convocatorias disponibles
- `instituciones` - Instituciones educativas
- `estudio_recomendado` - Estudios recomendados para usuarios

Si todas aparecen ✅ **¡Estás listo para usar la aplicación con Supabase real!**

---

## 🎯 Próximos pasos

Una vez que confirmes que la conexión funciona:

1. El frontend detectará automáticamente los cambios
2. Se desactivará **MODO DEMO** automáticamente
3. Podrás hacer login con un usuario real

### Cambiar entre MODO DEMO y MODO REAL:

**MODO DEMO** (actual - keys comentadas):
```bash
# Las keys están comentadas en .env.local
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...
```

**MODO REAL** (con Supabase):
```bash
# Descomenta y usa keys REALES de tu proyecto
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anonkey-real
```

⚠️ **ATENCIÓN:** Solo descomenta si tienes keys REALES. Keys ficticias causan pantalla blanca.

---

## 💡 Tips

- **Para volver a MODO DEMO:** Comenta nuevamente las variables en `.env.local`
- **Para cambiar de proyecto:** Actualiza las keys en `.env.local` y recarga la página
- **Problemas de cache:** Presiona `Ctrl+Shift+R` o vacía cache del navegador

---

¿Algo no funciona? Revisa:
1. ¿Las keys están sin el símbolo `#`?
2. ¿El servidor está corriendo (`npm run dev`)?
3. ¿Recargaste la página después de cambiar `.env.local`?
