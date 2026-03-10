-- ============================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS - BROTA MVP
-- ============================================
-- Este script crea todas las tablas necesarias para el MVP
-- Ejecutar en Supabase SQL Editor

-- 1. TABLA: perfiles_usuario
CREATE TABLE IF NOT EXISTS perfiles_usuario (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  edad INTEGER CHECK (edad >= 14 AND edad <= 100),
  genero VARCHAR(50),
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  nivel_educativo VARCHAR(100),
  condiciones_socioeconomicas JSONB DEFAULT '{}',
  disponibilidad_tiempo VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. TABLA: instituciones
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

-- 3. TABLA: programas
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

-- 4. TABLA: convocatorias
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

-- 5. TABLA: cuestionarios
CREATE TABLE IF NOT EXISTS cuestionarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(200) NOT NULL,
  version VARCHAR(50) NOT NULL,
  descripcion TEXT,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA: preguntas
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

-- 7. TABLA: resultados
CREATE TABLE IF NOT EXISTS resultados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perfil_usuario_id UUID REFERENCES perfiles_usuario(id) ON DELETE CASCADE,
  cuestionario_id UUID REFERENCES cuestionarios(id) ON DELETE CASCADE,
  respuestas JSONB NOT NULL DEFAULT '{}',
  perfil_vocacional JSONB DEFAULT '{}',
  fecha_realizacion TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLA: recomendaciones
CREATE TABLE IF NOT EXISTS recomendaciones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

CREATE INDEX IF NOT EXISTS idx_perfiles_user_id ON perfiles_usuario(user_id);
CREATE INDEX IF NOT EXISTS idx_programas_institucion ON programas(institucion_id);
CREATE INDEX IF NOT EXISTS idx_programas_area ON programas(area_academica);
CREATE INDEX IF NOT EXISTS idx_convocatorias_programa ON convocatorias(programa_id);
CREATE INDEX IF NOT EXISTS idx_convocatorias_activa ON convocatorias(activa);
CREATE INDEX IF NOT EXISTS idx_preguntas_cuestionario ON preguntas(cuestionario_id);
CREATE INDEX IF NOT EXISTS idx_resultados_perfil ON resultados(perfil_usuario_id);
CREATE INDEX IF NOT EXISTS idx_recomendaciones_perfil ON recomendaciones(perfil_usuario_id);

-- ============================================
-- TRIGGERS PARA UPDATED_AT AUTOMÁTICO
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

-- Políticas básicas (los usuarios solo pueden ver sus propios datos)
CREATE POLICY "Usuarios pueden ver su propio perfil" ON perfiles_usuario
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden actualizar su propio perfil" ON perfiles_usuario
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuarios pueden insertar su propio perfil" ON perfiles_usuario
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para datos públicos (instituciones, programas, convocatorias)
CREATE POLICY "Todos pueden ver instituciones activas" ON instituciones
  FOR SELECT USING (activa = true);

CREATE POLICY "Todos pueden ver programas activos" ON programas
  FOR SELECT USING (activo = true);

CREATE POLICY "Todos pueden ver convocatorias activas" ON convocatorias
  FOR SELECT USING (activa = true);

-- Políticas para cuestionarios y preguntas (públicos)
CREATE POLICY "Todos pueden ver cuestionarios activos" ON cuestionarios
  FOR SELECT USING (activo = true);

CREATE POLICY "Todos pueden ver preguntas" ON preguntas
  FOR SELECT USING (true);

-- Políticas para resultados (privados)
CREATE POLICY "Usuarios pueden ver sus propios resultados" ON resultados
  FOR SELECT USING (
    perfil_usuario_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden insertar sus propios resultados" ON resultados
  FOR INSERT WITH CHECK (
    perfil_usuario_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- Políticas para recomendaciones (privadas)
CREATE POLICY "Usuarios pueden ver sus propias recomendaciones" ON recomendaciones
  FOR SELECT USING (
    perfil_usuario_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Usuarios pueden actualizar sus propias recomendaciones" ON recomendaciones
  FOR UPDATE USING (
    perfil_usuario_id IN (
      SELECT id FROM perfiles_usuario WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar que todas las tablas se crearon correctamente
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as num_columns
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ✅ Si ves 8 tablas, todo está correcto
