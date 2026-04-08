# 📊 Modelo de Base de Datos - Backend Brota

**Versión:** MVP 1.1 (Revisión sin relaciones redundantes)
**Base de Datos:** PostgreSQL (Supabase)  
**Última actualización:** Abril 2026

---

## 📘 1. Introducción

El modelo de base de datos de **Brota** está diseñado para soportar el MVP del sistema de orientación vocacional. Este documento describe:

- Todas las 8 tablas core del sistema
- Campos y tipos de datos
- Relaciones entre entidades (Sin dependencias circulares)
- DDL SQL completo para Supabase
- Índices para optimización

**Principios de diseño:**

- Eliminación de dependencias circulares (ej. Recomendaciones enlaza al usuario vía Resultados).
- Separación Programa-Convocatoria para control temporal.
- Uso de UUID para identificadores (mejor para sistemas distribuidos).
- Campos de auditoría (created_at, updated_at).
- JSONB para datos flexibles (perfil vocacional, respuestas).
- Supabase Auth para gestión principal de usuarios.

---

## 📂 2. Tablas del MVP

### 🧍 2.1. `perfiles_usuario`

Almacena información del perfil del estudiante (separado de auth).

| Campo                       | Tipo         | Notas                               |
| --------------------------- | ------------ | ----------------------------------- |
| id                          | UUID         | **PK**                              |
| user_id                     | UUID         | **FK → auth.users** (Supabase Auth) |
| nombre                      | VARCHAR(100) | **NOT NULL**                        |
| apellido                    | VARCHAR(100) | **NOT NULL**                        |
| edad                        | INTEGER      |                                     |
| ciudad                      | VARCHAR(100) |                                     |
| nivel_educativo             | VARCHAR(100) |                                     |
| condiciones_socioeconomicas | JSONB        | Estructura flexible                 |
| created_at                  | TIMESTAMPTZ  | Auto                                |
| updated_at                  | TIMESTAMPTZ  | Auto                                |

---

### 🏫 2.2. `instituciones`

Instituciones educativas curadas manualmente.

| Campo          | Tipo         | Notas                                                |
| -------------- | ------------ | ---------------------------------------------------- |
| id             | UUID         | **PK**                                               |
| nombre         | VARCHAR(200) | **NOT NULL**                                         |
| tipo           | VARCHAR(100) | universidad, tecnica, tecnologica, sena, alternativo |
| ciudad         | VARCHAR(100) |                                                      |
| departamento   | VARCHAR(100) |                                                      |
| direccion      | TEXT         |                                                      |
| telefono       | VARCHAR(50)  |                                                      |
| email          | VARCHAR(100) |                                                      |
| sitio_web      | TEXT         |                                                      |
| costo_promedio | INTEGER      | Estimado en COP                                      |
| activa         | BOOLEAN      | DEFAULT true                                         |
| created_at     | TIMESTAMPTZ  | Auto                                                 |
| updated_at     | TIMESTAMPTZ  | Auto                                                 |

---

### 📘 2.3. `programas`

Programas académicos ofrecidos por instituciones.

| Campo             | Tipo         | Notas                                               |
| ----------------- | ------------ | --------------------------------------------------- |
| id                | UUID         | **PK**                                              |
| institucion_id    | UUID         | **FK → instituciones**                              |
| nombre            | VARCHAR(200) | **NOT NULL**                                        |
| tipo              | VARCHAR(100) | universitario, tecnico, tecnologico, no_tradicional |
| area_academica    | VARCHAR(100) | Ingeniería, Salud, Artes, etc. (En lugar de tabla ref)|
| duracion          | VARCHAR(100) | "4 años", "6 semestres", etc.                       |
| modalidad         | VARCHAR(50)  | presencial, virtual, hibrido                        |
| descripcion       | TEXT         |                                                     |
| requisitos        | TEXT         |                                                     |
| costo_matricula   | INTEGER      | En COP                                              |
| perfil_compatible | JSONB        | Perfil vocacional ideal                             |
| activo            | BOOLEAN      | DEFAULT true                                        |
| created_at        | TIMESTAMPTZ  | Auto                                                |
| updated_at        | TIMESTAMPTZ  | Auto                                                |

---

### 📅 2.4. `convocatorias`

Períodos de inscripción para programas (separado de programas).

| Campo                 | Tipo         | Notas                                  |
| --------------------- | ------------ | -------------------------------------- |
| id                    | UUID         | **PK**                                 |
| programa_id           | UUID         | **FK → programas**                     |
| nombre                | VARCHAR(200) | "Convocatoria 2026-1"                  |
| fecha_apertura        | DATE         | **NOT NULL**                           |
| fecha_cierre          | DATE         | **NOT NULL**                           |
| cupos                 | INTEGER      |                                        |
| informacion_adicional | TEXT         |                                        |
| activa                | BOOLEAN      | Computed: fecha_cierre >= CURRENT_DATE |
| created_at            | TIMESTAMPTZ  | Auto                                   |
| updated_at            | TIMESTAMPTZ  | Auto                                   |

**Lógica crítica:** Campo `activa` se calcula automáticamente para ocultar convocatorias vencidas.

---

### 📝 2.5. `cuestionarios`

Versiones del cuestionario vocacional.

| Campo       | Tipo         | Notas                        |
| ----------- | ------------ | ---------------------------- |
| id          | UUID         | **PK**                       |
| nombre      | VARCHAR(200) | "Cuestionario Vocacional v1" |
| version     | VARCHAR(50)  | "1.0"                        |
| descripcion | TEXT         |                              |
| activo      | BOOLEAN      | DEFAULT true                 |
| created_at  | TIMESTAMPTZ  | Auto                         |
| updated_at  | TIMESTAMPTZ  | Auto                         |

---

### ❓ 2.6. `preguntas`

Preguntas del cuestionario.

| Campo           | Tipo         | Notas                                      |
| --------------- | ------------ | ------------------------------------------ |
| id              | UUID         | **PK**                                     |
| cuestionario_id | UUID         | **FK → cuestionarios**                     |
| texto           | TEXT         | **NOT NULL**                               |
| tipo            | VARCHAR(50)  | likert, opcion_multiple                    |
| orden           | INTEGER      | Para ordenar preguntas                     |
| categoria       | VARCHAR(100) | habilidades, intereses, vocacion, contexto |
| peso            | DECIMAL(3,2) | Para cálculo de perfil                     |
| opciones        | JSONB        | Array de opciones si aplica                |
| created_at      | TIMESTAMPTZ  | Auto                                       |

---

### 📊 2.7. `resultados`

Resultados de cuestionarios completados.

| Campo             | Tipo        | Notas                               |
| ----------------- | ----------- | ----------------------------------- |
| id                | UUID        | **PK**                              |
| perfil_usuario_id | UUID        | **FK → perfiles_usuario**           |
| cuestionario_id   | UUID        | **FK → cuestionarios**              |
| respuestas        | JSONB       | Array de {pregunta_id, valor}       |
| perfil_vocacional | JSONB       | Resultado procesado con porcentajes |
| fecha_realizacion | TIMESTAMPTZ | Auto                                |

**Estructura perfil_vocacional:**

```json
{
  "habilidades": {
    "analitica": 85,
    "creatividad": 70,
    "social": 60,
    "practica": 75
  },
  "intereses": ["tecnologia", "ciencias"],
  "vocacion_principal": "Ingeniería"
}
```

---

### 🎯 2.8. `recomendaciones`

Recomendaciones generadas para usuarios basándose en un resultado obtenido.

| Campo             | Tipo         | Notas                           |
| ----------------- | ------------ | ------------------------------- |
| id                | UUID         | **PK**                          |
| programa_id       | UUID         | **FK → programas**              |
| resultado_id      | UUID         | **FK → resultados**             |
| compatibilidad    | DECIMAL(5,2) | Porcentaje 0-100                |
| razones           | TEXT         | Explicación de la recomendación |
| vista             | BOOLEAN      | DEFAULT false                   |
| created_at        | TIMESTAMPTZ  | Auto                            |

*Nota Histórica: Se eliminó la relación redundante (FK) `perfil_usuario_id` que existía en versiones previas porque para saber a qué usuario pertenece la recomendación simplemente se pasa por el enlace `resultado_id → resultados.perfil_usuario_id`. Así se eliminan ciclos en el modelo DB.*

---

## 🔮 2.9. Tablas Futuras (Fuera del MVP)

Estas tablas se implementarán en fases posteriores:

- `areas_estudio` - Se tratará en fase posterior (por ahora se usa una variable simple).
- `rutas_aprendizaje` - Rutas de preparación
- `contenido_ruta` - Contenidos educativos
- `progreso_usuario` - Seguimiento de progreso
- `favoritos` - Programas favoritos

---

## 🛠️ 3. DDL SQL Completo (Supabase/PostgreSQL)

```sql
-- ============================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS - BROTA MVP
-- ============================================
-- Este script crea todas las tablas necesarias para el MVP
-- Ejecutar en Supabase SQL Editor

-- ============================================
-- EXTENSIONES NECESARIAS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. TABLA: perfiles_usuario
-- ============================================
CREATE TABLE IF NOT EXISTS perfiles_usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  edad INTEGER CHECK (edad >= 14 AND edad <= 100),
  ciudad VARCHAR(100),
  nivel_educativo VARCHAR(100),
  condiciones_socioeconomicas JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================
-- 2. TABLA: cuestionarios
-- ============================================
CREATE TABLE IF NOT EXISTS cuestionarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(200) NOT NULL,
  version VARCHAR(50) NOT NULL,
  descripcion TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. TABLA: preguntas
-- ============================================
CREATE TABLE IF NOT EXISTS preguntas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cuestionario_id UUID REFERENCES cuestionarios(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  orden INTEGER NOT NULL,
  categoria VARCHAR(100),
  peso DECIMAL(3,2) DEFAULT 1.0,
  opciones JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. TABLA: resultados
-- ============================================
CREATE TABLE IF NOT EXISTS resultados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perfil_usuario_id UUID REFERENCES perfiles_usuario(id) ON DELETE CASCADE,
  cuestionario_id UUID REFERENCES cuestionarios(id) ON DELETE CASCADE,
  respuestas JSONB NOT NULL DEFAULT '{}',
  perfil_vocacional JSONB DEFAULT '{}',
  fecha_realizacion TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. TABLA: instituciones
-- ============================================
CREATE TABLE IF NOT EXISTS instituciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(200) NOT NULL,
  tipo VARCHAR(100),
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  direccion TEXT,
  telefono VARCHAR(50),
  email VARCHAR(100),
  sitio_web TEXT,
  costo_promedio INTEGER,
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. TABLA: programas
-- ============================================
CREATE TABLE IF NOT EXISTS programas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institucion_id UUID REFERENCES instituciones(id) ON DELETE CASCADE,
  nombre VARCHAR(200) NOT NULL,
  tipo VARCHAR(100),
  area_academica VARCHAR(100),
  duracion VARCHAR(100),
  modalidad VARCHAR(50),
  descripcion TEXT,
  requisitos TEXT,
  costo_matricula INTEGER,
  perfil_compatible JSONB DEFAULT '{}',
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. TABLA: convocatorias
-- ============================================
CREATE TABLE IF NOT EXISTS convocatorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programa_id UUID REFERENCES programas(id) ON DELETE CASCADE,
  nombre VARCHAR(200) NOT NULL,
  fecha_apertura DATE NOT NULL,
  fecha_cierre DATE NOT NULL,
  cupos INTEGER,
  informacion_adicional TEXT,
  activa BOOLEAN GENERATED ALWAYS AS (fecha_cierre >= CURRENT_DATE) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. TABLA: recomendaciones
-- ============================================
CREATE TABLE IF NOT EXISTS recomendaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  programa_id UUID REFERENCES programas(id) ON DELETE CASCADE,
  resultado_id UUID REFERENCES resultados(id) ON DELETE CASCADE,
  compatibilidad DECIMAL(5,2) CHECK (compatibilidad >= 0 AND compatibilidad <= 100),
  razones TEXT,
  vista BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================

CREATE INDEX IF NOT EXISTS idx_perfiles_user_id ON perfiles_usuario(user_id);
CREATE INDEX IF NOT EXISTS idx_programas_institucion ON programas(institucion_id);
CREATE INDEX IF NOT EXISTS idx_convocatorias_programa ON convocatorias(programa_id);
CREATE INDEX IF NOT EXISTS idx_convocatorias_activa ON convocatorias(activa);
CREATE INDEX IF NOT EXISTS idx_preguntas_cuestionario ON preguntas(cuestionario_id);
CREATE INDEX IF NOT EXISTS idx_resultados_perfil ON resultados(perfil_usuario_id);
CREATE INDEX IF NOT EXISTS idx_recomendaciones_resultado ON recomendaciones(resultado_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) Y POLITICAS
-- ============================================

ALTER TABLE perfiles_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE instituciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE programas ENABLE ROW LEVEL SECURITY;
ALTER TABLE convocatorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuestionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados ENABLE ROW LEVEL SECURITY;
ALTER TABLE recomendaciones ENABLE ROW LEVEL SECURITY;
```

---

## 📈 4. Relaciones del Modelo

```
auth.users (Supabase)
    ↓ 1:1
perfiles_usuario
    ↓ 1:N
resultados ←→ recomendaciones
    ↓           ↓
cuestionarios   programas
    ↓           ↓
preguntas   convocatorias
                ↓
            instituciones
```

### Relaciones Clave:

1. **Usuario → Perfil** (1:1): Supabase Auth + datos adicionales.
2. **Perfil → Resultados** (1:N): Un usuario puede hacer múltiples cuestionarios.
3. **Resultado → Recomendaciones** (1:N): Un resultado genera múltiples recomendaciones. (Sin dependencia circular desde Perfil).
4. **Programa → Convocatorias** (1:N): Un programa tiene múltiples convocatorias en el tiempo.
5. **Institución → Programas** (1:N): Una institución ofrece múltiples programas.

---

## 🔒 5. Seguridad (Row Level Security)

Supabase RLS está habilitado en todas las tablas:

- **Perfiles:** Usuarios solo acceden a su propio perfil
- **Instituciones/Programas:** Lectura pública, escritura admin
- **Convocatorias:** Solo activas visibles públicamente
- **Resultados/Recomendaciones:** Usuarios solo ven los suyos

---

## 📝 8. Notas de Implementación

### Para Supabase:

1. Ejecutar DDL en SQL Editor de Supabase
2. Configurar Storage buckets para archivos (PDFs, imágenes)
3. Configurar Auth providers (email, Google, etc.)
4. Ajustar políticas RLS según roles

---

[← Volver a Backend](README.md) | [Ver Decisiones Técnicas](decisiones_tecnicas.md)
