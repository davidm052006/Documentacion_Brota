# ✅ Checklist: Verificación del Diagrama MER

## 📋 Entidades que DEBEN estar en el MER del MVP

### ✅ Entidades Core (8 tablas)

1. **perfiles_usuario**
   - Campos clave: id (UUID), user_id (FK a auth.users), nombre, apellido, edad, ciudad
   - Relación: 1:1 con auth.users (Supabase)
   - Relación: 1:N con resultados
   - Relación: 1:N con recomendaciones

2. **instituciones**
   - Campos clave: id (UUID), nombre, tipo, ciudad, activa
   - Relación: 1:N con programas

3. **programas**
   - Campos clave: id (UUID), institucion_id (FK), nombre, tipo, modalidad
   - Relación: N:1 con instituciones
   - Relación: 1:N con convocatorias
   - Relación: 1:N con recomendaciones

4. **convocatorias** ⚠️ CRÍTICO - Debe estar separada
   - Campos clave: id (UUID), programa_id (FK), fecha_apertura, fecha_cierre, activa
   - Relación: N:1 con programas
   - Campo computado: activa (basado en fechas)

5. **cuestionarios**
   - Campos clave: id (UUID), nombre, version, activo
   - Relación: 1:N con preguntas
   - Relación: 1:N con resultados

6. **preguntas**
   - Campos clave: id (UUID), cuestionario_id (FK), texto, tipo, orden
   - Relación: N:1 con cuestionarios

7. **resultados**
   - Campos clave: id (UUID), perfil_usuario_id (FK), cuestionario_id (FK), respuestas (JSONB)
   - Relación: N:1 con perfiles_usuario
   - Relación: N:1 con cuestionarios
   - Relación: 1:N con recomendaciones

8. **recomendaciones**
   - Campos clave: id (UUID), perfil_usuario_id (FK), programa_id (FK), resultado_id (FK), compatibilidad
   - Relación: N:1 con perfiles_usuario
   - Relación: N:1 con programas
   - Relación: N:1 con resultados

---

## ❌ Entidades que NO deben estar (Fuera del MVP)

Estas entidades deben ser removidas o marcadas como "Fase Futura":

- ❌ **MascotaIA** - No es parte del MVP
- ❌ **RutaAprendizaje** - Fase futura
- ❌ **ContenidoRuta** - Fase futura
- ❌ **ProgresoUsuario** - Fase futura
- ❌ **Favorito** - Funcionalidad secundaria
- ❌ **Comparacion** - Funcionalidad secundaria
- ❌ **Carrera** - Reemplazada por "Programa" (más genérico)

---

## 🔄 Cambios Críticos vs Diagrama Anterior

### 1. Usuario → perfiles_usuario

- **Antes:** Tabla `Usuario` con campos de autenticación
- **Ahora:** `perfiles_usuario` + Supabase Auth (auth.users)
- **Razón:** Supabase maneja autenticación

### 2. Carrera → Programa

- **Antes:** Tabla `Carrera`
- **Ahora:** Tabla `programas` (más genérico)
- **Razón:** Incluye carreras, técnicos, tecnológicos, no tradicionales

### 3. Programa + Convocatoria (SEPARADOS)

- **Antes:** Posiblemente fechas dentro de Programa
- **Ahora:** Tablas separadas con relación 1:N
- **Razón:** Control temporal, múltiples convocatorias, ocultamiento automático

### 4. Tipos de Datos

- **Antes:** INT para IDs
- **Ahora:** UUID para IDs
- **Razón:** Mejor para sistemas distribuidos (Supabase)

---

## 📊 Relaciones Clave que Deben Aparecer

```
auth.users (Supabase Auth)
    ↓ 1:1
perfiles_usuario
    ↓ 1:N
    ├─→ resultados
    │      ↓ 1:N
    │   recomendaciones
    │      ↓ N:1
    │   programas
    │      ↓ 1:N
    │   convocatorias
    │      ↓ N:1
    │   instituciones
    │
    └─→ recomendaciones (directo también)

cuestionarios
    ↓ 1:N
preguntas

cuestionarios
    ↓ 1:N
resultados
```

### Cardinalidades Importantes:

1. **perfiles_usuario → resultados**: 1:N (un usuario puede hacer múltiples cuestionarios)
2. **resultados → recomendaciones**: 1:N (un resultado genera múltiples recomendaciones)
3. **programas → convocatorias**: 1:N ⚠️ CRÍTICO (un programa tiene múltiples convocatorias)
4. **instituciones → programas**: 1:N (una institución ofrece múltiples programas)
5. **cuestionarios → preguntas**: 1:N (un cuestionario tiene múltiples preguntas)

---

## 🎨 Cómo Verificar tu Diagrama Actual

### Paso 1: Abre el diagrama

Abre `docs/modelo-entidad-relacion-(MER).png`

### Paso 2: Verifica entidades

Cuenta las entidades y compara con esta lista:

- ✅ ¿Hay 8 entidades del MVP?
- ❌ ¿Hay entidades que no deberían estar?

### Paso 3: Verifica la separación Programa-Convocatoria

- ✅ ¿Programa y Convocatoria son tablas separadas?
- ✅ ¿Hay una línea de relación 1:N entre ellas?

### Paso 4: Verifica nombres

- ✅ ¿Dice "programas" en lugar de "Carrera"?
- ✅ ¿Dice "perfiles_usuario" en lugar de "Usuario"?

### Paso 5: Verifica relaciones críticas

- ✅ ¿instituciones → programas (1:N)?
- ✅ ¿programas → convocatorias (1:N)?
- ✅ ¿perfiles_usuario → resultados (1:N)?
- ✅ ¿resultados → recomendaciones (1:N)?

---

## 🛠️ Si el Diagrama NO está Alineado

### Opción 1: Actualizar el diagrama existente

Usa una herramienta como:

- Draw.io / diagrams.net
- Lucidchart
- dbdiagram.io
- PlantUML

### Opción 2: Generar desde código

Usa herramientas que generan diagramas desde SQL:

- SchemaSpy
- dbdocs.io
- Supabase Studio (tiene visualización automática)

### Opción 3: Usar Supabase Studio

Supabase tiene un visualizador de esquema integrado:

1. Ve a tu proyecto en Supabase
2. Database → Schema Visualizer
3. Exporta el diagrama

---

## 📝 Recomendación

**Para verificar:** Abre el archivo `docs/modelo-entidad-relacion-(MER).png` y compara visualmente con este checklist.

**Si no coincide:** Te recomiendo usar **dbdiagram.io** o **Supabase Studio** para generar un nuevo diagrama que refleje exactamente el DDL que creamos en `backend/modelo_datos.md`.

---

¿Quieres que te ayude a crear el código para generar un nuevo diagrama con una herramienta específica?
