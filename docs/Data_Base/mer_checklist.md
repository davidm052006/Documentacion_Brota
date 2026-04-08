# ✅ Checklist: Verificación del Diagrama MER

## 📋 Entidades que DEBEN estar en el MER del MVP

### ✅ Entidades Core (8 tablas definitivas)

1. **perfiles_usuario**
   - Campos clave: id (UUID), user_id (FK a auth.users), nombre, apellido, edad, ciudad
   - Relación: 1:1 con auth.users (Supabase)
   - Relación: 1:N con resultados

2. **instituciones**
   - Campos clave: id (UUID), nombre, tipo, ciudad, departamento, activa
   - Relación: 1:N con programas

3. **programas**
   - Campos clave: id (UUID), institucion_id (FK), nombre, area_academica (VARCHAR)
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
   - Campos clave: id (UUID), programa_id (FK), resultado_id (FK), compatibilidad
   - Relación: N:1 con programas
   - Relación: N:1 con resultados
   - **Nota de Redundancia Eliminada:** La Relación directa N:1 con `perfiles_usuario` fue omitida para eliminar dependencias circulares (el usuario se trae implícitamente por medio del `resultado_id`).

---

## ❌ Entidades que NO deben estar (Fuera del MVP)

Estas entidades deben ser removidas o marcadas como "Fase Futura":

- ❌ **MascotaIA** - No es parte del MVP
- ❌ **AreasEstudio** - Removida. Simplificada a simple campo VARCHAR (`area_academica`) para evitar join extra en MVP.
- ❌ **RutaAprendizaje** - Fase futura
- ❌ **ProgresoUsuario** - Fase futura
- ❌ **Favorito** - Funcionalidad secundaria
- ❌ **Carrera** - Reemplazada por "Programa" (más genérico)

---

## 🔄 Cambios Críticos vs Diagramas Anteriores

### 1. Eliminación de Dependencia Circular (Recomendaciones)

- **Antes:** `Recomendaciones` tenía un `perfil_usuario_id` que apuntaba a Perfiles (Circular respecto a Resultados).
- **Ahora:** Se accede al usuario de forma jerárquica: `Recomendaciones -> Resultados -> Perfiles`.
- **Razón:** Limpieza de dependencias y normalización de la estructura.

### 2. Usuario → perfiles_usuario

- **Antes:** Tabla `Usuario` con campos de autenticación
- **Ahora:** `perfiles_usuario` + Supabase Auth (auth.users)

### 3. Programa + Convocatoria (SEPARADOS)

- **Antes:** Posiblemente fechas dentro de Programa
- **Ahora:** Tablas separadas con relación 1:N

---

## 📊 Relaciones Clave que Deben Aparecer

```
auth.users (Supabase Auth)
    ↓ 1:1
perfiles_usuario
    ↓ 1:N
    ├─→ resultados
    │      ↓ 1:N
    │   recomendaciones  (sin acceso directo por perfiles para evadir circularidad)
    │      ↓ N:1
    │   programas
    │      ↓ 1:N
    │   convocatorias
    │      ↓ N:1
    │   instituciones

cuestionarios
    ↓ 1:N
preguntas

cuestionarios
    ↓ 1:N
resultados
```

---

## 🎨 Cómo Verificar tu Diagrama Actual

### Paso 1: Abre el diagrama

Abre `docs/Data_Base/diagrama_mer.md`

### Paso 2: Verifica entidades

Cuenta las entidades y compara con esta lista:

- ✅ ¿Hay 8 entidades del MVP (Perfiles, Cuestionarios, Preguntas, Resultados, Recomendaciones, Instituciones, Programas, Convocatorias)?
- ❌ ¿Asegúrate de que no haya Entidades como `AREAS_ESTUDIO`?

### Paso 3: Verifica la Eliminación Circular

- ✅ Asegúrate de que `PERFILES_USUARIO` ya **NO** apunte ni conecte a `RECOMENDACIONES`. Sólo debe fluir a `RESULTADOS`.

---

## 🛠 Si el Diagrama NO está Alineado

Te recomiendo usar dbdiagram.io e importar directamente el archivo `backend/setup_database.sql` para generar automáticamente los gráficos correspondientes a la estructura base y exportarlo posteriormente a código Mermaid.
