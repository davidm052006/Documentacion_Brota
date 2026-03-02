# 📊 Modelo de Datos Técnico - Backend Brota

## Esquema de Base de Datos

### Tabla: instituciones

```sql
CREATE TABLE instituciones (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(100),
  ciudad VARCHAR(100),
  departamento VARCHAR(100),
  contacto TEXT,
  activa BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: programas

```sql
CREATE TABLE programas (
  id SERIAL PRIMARY KEY,
  institucion_id INTEGER REFERENCES instituciones(id),
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(100),
  duracion VARCHAR(50),
  modalidad VARCHAR(50),
  descripcion TEXT,
  requisitos TEXT,
  perfil_compatible JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: convocatorias

```sql
CREATE TABLE convocatorias (
  id SERIAL PRIMARY KEY,
  programa_id INTEGER REFERENCES programas(id),
  fecha_apertura DATE NOT NULL,
  fecha_cierre DATE NOT NULL,
  estado VARCHAR(50),
  cupos INTEGER,
  informacion_adicional TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: perfiles_usuario

```sql
CREATE TABLE perfiles_usuario (
  id SERIAL PRIMARY KEY,
  edad INTEGER,
  ciudad VARCHAR(100),
  nivel_educativo VARCHAR(100),
  condiciones_socioeconomicas JSONB,
  disponibilidad_tiempo VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabla: resultados

```sql
CREATE TABLE resultados (
  id SERIAL PRIMARY KEY,
  perfil_usuario_id INTEGER REFERENCES perfiles_usuario(id),
  respuestas JSONB NOT NULL,
  perfil_vocacional JSONB,
  fecha_realizacion TIMESTAMP DEFAULT NOW()
);
```

### Tabla: recomendaciones

```sql
CREATE TABLE recomendaciones (
  id SERIAL PRIMARY KEY,
  perfil_usuario_id INTEGER REFERENCES perfiles_usuario(id),
  programa_id INTEGER REFERENCES programas(id),
  resultado_id INTEGER REFERENCES resultados(id),
  compatibilidad DECIMAL(5,2),
  razones TEXT,
  vista BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Índices

```sql
CREATE INDEX idx_convocatorias_fechas ON convocatorias(fecha_apertura, fecha_cierre);
CREATE INDEX idx_programas_institucion ON programas(institucion_id);
CREATE INDEX idx_recomendaciones_usuario ON recomendaciones(perfil_usuario_id);
```

---

(Esquema completo por definir durante implementación)

[← Volver a Backend](README.md)
