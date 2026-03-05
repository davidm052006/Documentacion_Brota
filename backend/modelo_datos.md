# 📊 Modelo de Base de Datos - Backend Brota

**Versión:** MVP 1.0  
**Base de Datos:** PostgreSQL (Supabase)  
**Última actualización:** Marzo 2026

---

## 📘 1. Introducción

El modelo de base de datos de **Brota** está diseñado para soportar el MVP del sistema de orientación vocacional. Este documento describe:

- Todas las tablas del sistema
- Campos y tipos de datos
- Relaciones entre entidades
- DDL SQL completo para Supabase
- Índices para optimización

**Principios de diseño:**

- Separación Programa-Convocatoria para control temporal
- Uso de UUID para identificadores (mejor para sistemas distribuidos)
- Campos de auditoría (created_at, updated_at)
- JSONB para datos flexibles (perfil vocacional, respuestas)
- Supabase Auth para gestión de usuarios

---

## 📂 2. Tablas del MVP

### 🧍 2.1. `perfiles_usuario`

Almacena información del perfil del estudiante (separado de auth).

| Campo                       | Tipo         | Notas                               |
| --------------------------- | ------------ | ----------------------------------- |
| id                          | UUID         | **PK**                              |
| user_id                     | UUID         | **FK → auth.users** (Supabase Auth) |
| nombre                      | VARCHAR(100) |                                     |
| apellido                    | VARCHAR(100) |                                     |
| edad                        | INTEGER      |                                     |
| genero                      | VARCHAR(20)  |                                     |
| ciudad                      | VARCHAR(100) |                                     |
| departamento                | VARCHAR(100) |                                     |
| nivel_educativo             | VARCHAR(100) |                                     |
| condiciones_socioeconomicas | JSONB        | Estructura flexible                 |
| disponibilidad_tiempo       | VARCHAR(50)  |                                     |
| created_at                  | TIMESTAMPTZ  | Auto                                |
| updated_at                  | TIMESTAMPTZ  | Auto                                |

---

### 🏫 2.2. `instituciones`

Instituciones educativas curadas manualmente.

| Campo          | Tipo         | Notas                                                |
| -------------- | ------------ | ---------------------------------------------------- |
| id             | UUID         | **PK**                                               |
| nombre         | VARCHAR(255) | **NOT NULL**                                         |
| tipo           | VARCHAR(50)  | universidad, tecnica, tecnologica, sena, alternativo |
| ciudad         | VARCHAR(100) |                                                      |
| departamento   | VARCHAR(100) |                                                      |
| direccion      | TEXT         |                                                      |
| telefono       | VARCHAR(50)  |                                                      |
| email          | VARCHAR(150) |                                                      |
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
| nombre            | VARCHAR(255) | **NOT NULL**                                        |
| tipo              | VARCHAR(50)  | universitario, tecnico, tecnologico, no_tradicional |
| area_academica    | VARCHAR(100) | Ingeniería, Salud, Artes, etc.                      |
| duracion          | VARCHAR(50)  | "4 años", "6 semestres", etc.                       |
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
| nombre                | VARCHAR(255) | "Convocatoria 2026-1"                  |
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
| nombre      | VARCHAR(150) | "Cuestionario Vocacional v1" |
| version     | VARCHAR(20)  | "1.0"                        |
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
| categoria       | VARCHAR(50)  | habilidades, intereses, vocacion, contexto |
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

Recomendaciones generadas para usuarios.

| Campo             | Tipo         | Notas                           |
| ----------------- | ------------ | ------------------------------- |
| id                | UUID         | **PK**                          |
| perfil_usuario_id | UUID         | **FK → perfiles_usuario**       |
| programa_id       | UUID         | **FK → programas**              |
| resultado_id      | UUID         | **FK → resultados**             |
| compatibilidad    | DECIMAL(5,2) | Porcentaje 0-100                |
| razones           | TEXT         | Explicación de la recomendación |
| vista             | BOOLEAN      | DEFAULT false                   |
| created_at        | TIMESTAMPTZ  | Auto                            |

---

## 🔮 2.9. Tablas Futuras (Fuera del MVP)

Estas tablas se implementarán en fases posteriores:

- `rutas_aprendizaje` - Rutas de preparación
- `contenido_ruta` - Contenidos educativos
- `progreso_usuario` - Seguimiento de progreso
- `favoritos` - Programas favoritos
- `comparaciones` - Comparaciones guardadas
- `notificaciones` - Sistema de notificaciones

---

## 🛠️ 3. DDL SQL Completo (Supabase/PostgreSQL)

```sql
-- ============================================
-- BROTA - MVP Database Schema
-- PostgreSQL (Supabase)
-- ============================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PERFILES DE USUARIO
-- ============================================

CREATE TABLE perfiles_usuario (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre VARCHAR(100),
  apellido VARCHAR(100),
  edad INTEGER CHECK (edad >= 14 AND edad <= 100),
  genero VARCHAR(20),
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  nivel_educativo VARCHAR(100),
  condiciones_socioeconomicas JSONB,
  disponibilidad_tiempo VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================
-- 2. INSTITUCIONES
-- ============================================

CREATE TABLE instituciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) CHECK (tipo IN ('universidad', 'tecnica', 'tecnologica', 'sena', 'alternativo')),
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  direccion TEXT,
  telefono VARCHAR(50),
  email VARCHAR(150),
  sitio_web TEXT,
  costo_promedio INTEGER CHECK (costo_promedio >= 0),
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. PROGRAMAS
-- ============================================

CREATE TABLE programas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institucion_id UUID REFERENCES instituciones(id) ON DELETE CASCADE,
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) CHECK (tipo IN ('universitario', 'tecnico', 'tecnologico', 'no_tradicional')),
  area_academica VARCHAR(100),
  duracion VARCHAR(50),
  modalidad VARCHAR(50) CHECK (modalidad IN ('presencial', 'virtual', 'hibrido')),
  descripcion TEXT,
  requisitos TEXT,
  costo_matricula INTEGER CHECK (costo_matricula >= 0),
  perfil_compatible JSONB,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. CONVOCATORIAS
-- ============================================

CREATE TABLE convocatorias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  programa_id UUID REFERENCES programas(id) ON DELETE CASCADE,
  nombre VARCHAR(255),
  fecha_apertura DATE NOT NULL,
  fecha_cierre DATE NOT NULL,
  cupos INTEGER CHECK (cupos > 0),
  informacion_adicional TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (fecha_cierre >= fecha_apertura)
);

-- Columna computada para estado activo
ALTER TABLE convocatorias
ADD COLUMN activa BOOLEAN GENERATED ALWAYS AS (fecha_cierre >= CURRENT_DATE) STORED;

-- ============================================
-- 5. CUESTIONARIOS
-- ============================================

CREATE TABLE cuestionarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre VARCHAR(150) NOT NULL,
  version VARCHAR(20),
  descripcion TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 6. PREGUNTAS
-- ============================================

CREATE TABLE preguntas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cuestionario_id UUID REFERENCES cuestionarios(id) ON DELETE CASCADE,
  texto TEXT NOT NULL,
  tipo VARCHAR(50) CHECK (tipo IN ('likert', 'opcion_multiple')),
  orden INTEGER NOT NULL,
  categoria VARCHAR(50) CHECK (categoria IN ('habilidades', 'intereses', 'vocacion', 'contexto')),
  peso DECIMAL(3,2) DEFAULT 1.0,
  opciones JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. RESULTADOS
-- ============================================

CREATE TABLE resultados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  perfil_usuario_id UUID REFERENCES perfiles_usuario(id) ON DELETE CASCADE,
  cuestionario_id UUID REFERENCES cuestionarios(id),
  respuestas JSONB NOT NULL,
  perfil_vocacional JSONB,
  fecha_realizacion TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. RECOMENDACIONES
-- ============================================

CREATE TABLE recomendaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  perfil_usuario_id UUID REFERENCES perfiles_usuario(id) ON DELETE CASCADE,
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

-- Perfiles
CREATE INDEX idx_perfiles_user_id ON perfiles_usuario(user_id);

-- Programas
CREATE INDEX idx_programas_institucion ON programas(institucion_id);
CREATE INDEX idx_programas_tipo ON programas(tipo);
CREATE INDEX idx_programas_activo ON programas(activo);

-- Convocatorias
CREATE INDEX idx_convocatorias_programa ON convocatorias(programa_id);
CREATE INDEX idx_convocatorias_fechas ON convocatorias(fecha_apertura, fecha_cierre);
CREATE INDEX idx_convocatorias_activa ON convocatorias(activa);

-- Preguntas
CREATE INDEX idx_preguntas_cuestionario ON preguntas(cuestionario_id);
CREATE INDEX idx_preguntas_orden ON preguntas(orden);

-- Resultados
CREATE INDEX idx_resultados_perfil ON resultados(perfil_usuario_id);
CREATE INDEX idx_resultados_fecha ON resultados(fecha_realizacion DESC);

-- Recomendaciones
CREATE INDEX idx_recomendaciones_perfil ON recomendaciones(perfil_usuario_id);
CREATE INDEX idx_recomendaciones_programa ON recomendaciones(programa_id);
CREATE INDEX idx_recomendaciones_compatibilidad ON recomendaciones(compatibilidad DESC);

-- ============================================
-- TRIGGERS PARA UPDATED_AT
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_perfiles_usuario_updated_at BEFORE UPDATE ON perfiles_usuario
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instituciones_updated_at BEFORE UPDATE ON instituciones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_programas_updated_at BEFORE UPDATE ON programas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_convocatorias_updated_at BEFORE UPDATE ON convocatorias
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cuestionarios_updated_at BEFORE UPDATE ON cuestionarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE perfiles_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE instituciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE programas ENABLE ROW LEVEL SECURITY;
ALTER TABLE convocatorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE cuestionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE preguntas ENABLE ROW LEVEL SECURITY;
ALTER TABLE resultados ENABLE ROW LEVEL SECURITY;
ALTER TABLE recomendaciones ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (ajustar según necesidades)

-- Perfiles: usuarios pueden ver/editar su propio perfil
CREATE POLICY "Users can view own profile" ON perfiles_usuario
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON perfiles_usuario
  FOR UPDATE USING (auth.uid() = user_id);

-- Instituciones y Programas: lectura pública, escritura admin
CREATE POLICY "Public can view active instituciones" ON instituciones
  FOR SELECT USING (activa = true);

CREATE POLICY "Public can view active programas" ON programas
  FOR SELECT USING (activo = true);

-- Convocatorias: solo activas visibles públicamente
CREATE POLICY "Public can view active convocatorias" ON convocatorias
  FOR SELECT USING (activa = true);

-- Cuestionarios y Preguntas: lectura pública de activos
CREATE POLICY "Public can view active cuestionarios" ON cuestionarios
  FOR SELECT USING (activo = true);

CREATE POLICY "Public can view preguntas" ON preguntas
  FOR SELECT USING (true);

-- Resultados: usuarios solo ven sus propios resultados
CREATE POLICY "Users can view own resultados" ON resultados
  FOR SELECT USING (
    perfil_usuario_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- Recomendaciones: usuarios solo ven sus propias recomendaciones
CREATE POLICY "Users can view own recomendaciones" ON recomendaciones
  FOR SELECT USING (
    perfil_usuario_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );
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

1. **Usuario → Perfil** (1:1): Supabase Auth + datos adicionales
2. **Perfil → Resultados** (1:N): Un usuario puede hacer múltiples cuestionarios
3. **Resultado → Recomendaciones** (1:N): Un resultado genera múltiples recomendaciones
4. **Programa → Convocatorias** (1:N): Un programa tiene múltiples convocatorias en el tiempo
5. **Institución → Programas** (1:N): Una institución ofrece múltiples programas

---

## 🔒 5. Seguridad (Row Level Security)

Supabase RLS está habilitado en todas las tablas:

- **Perfiles:** Usuarios solo acceden a su propio perfil
- **Instituciones/Programas:** Lectura pública, escritura admin
- **Convocatorias:** Solo activas visibles públicamente
- **Resultados/Recomendaciones:** Usuarios solo ven los suyos

---

## 📊 6. Diagrama MER

![Modelo Entidad-Relación](<../docs/modelo-entidad-relacion-(MER).png>)

---

## 🚀 7. Datos de Ejemplo

### Insertar institución de ejemplo:

```sql
INSERT INTO instituciones (nombre, tipo, ciudad, departamento, sitio_web, activa)
VALUES ('Universidad Nacional de Colombia', 'universidad', 'Bogotá', 'Cundinamarca', 'https://unal.edu.co', true);
```

### Insertar programa de ejemplo:

```sql
INSERT INTO programas (institucion_id, nombre, tipo, area_academica, duracion, modalidad, activo)
VALUES (
  '...uuid-institucion...',
  'Ingeniería de Sistemas',
  'universitario',
  'Ingeniería',
  '10 semestres',
  'presencial',
  true
);
```

---

## 📝 8. Notas de Implementación

### Para Supabase:

1. Ejecutar DDL en SQL Editor de Supabase
2. Configurar Storage buckets para archivos (PDFs, imágenes)
3. Configurar Auth providers (email, Google, etc.)
4. Ajustar políticas RLS según roles

### Para el Equipo:

- **David & Brayan Moreno:** Implementar este esquema en Supabase
- **Todos:** Revisar y validar estructura antes de implementar
- **Testing:** Poblar con datos de prueba antes de producción

---

[← Volver a Backend](README.md) | [Ver Decisiones Técnicas](decisiones_tecnicas.md)
