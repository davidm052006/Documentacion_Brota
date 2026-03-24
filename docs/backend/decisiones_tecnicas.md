# 🎯 Decisiones Técnicas - Backend Brota

## Stack Tecnológico

### Runtime & Framework

- **Node.js** (v18+) - Runtime de JavaScript
- **Express.js** (v4+) - Framework web minimalista y flexible

### Base de Datos

- **Supabase** - PostgreSQL como servicio
  - PostgreSQL 15+
  - APIs REST automáticas
  - Auth integrado
  - Real-time subscriptions
  - Storage para archivos

### Validación y Seguridad

- **Zod** - Validación de esquemas TypeScript-first
- **Helmet** - Headers de seguridad HTTP
- **CORS** - Control de acceso entre orígenes

### Testing

- **Jest** - Framework de testing
- **Supertest** - Testing de APIs HTTP

### Utilidades

- **dotenv** - Variables de entorno
- **@supabase/supabase-js** - Cliente oficial de Supabase

---

## Decisiones Arquitectónicas

### 1. Arquitectura Híbrida: Supabase + Node.js

**Decisión:** Usar Supabase para operaciones CRUD básicas y Node.js para lógica compleja.

**Razón:**

- Supabase maneja Auth, CRUD básico y storage automáticamente
- Node.js maneja algoritmo de recomendación (lógica compleja)
- Reduce código boilerplate
- Acelera desarrollo del MVP
- Mantiene flexibilidad para lógica personalizada

**Arquitectura:**

```
Frontend React
    ↓
    ├→ Supabase (directo) → Auth, CRUD básico, Storage
    └→ Node.js/Express → Algoritmo de recomendación, lógica compleja
           ↓
       Supabase (PostgreSQL)
```

**Alternativas consideradas:**

- Todo a través de Node.js (descartado: más código, más lento)
- Solo Supabase sin backend (descartado: algoritmo complejo necesita backend)

### 1. Separación Programa-Convocatoria

**Decisión:** Crear entidades separadas para Programa y Convocatoria.

**Razón:**

- Control temporal independiente
- Múltiples convocatorias por programa
- Ocultamiento automático de convocatorias vencidas
- Historial de convocatorias

**Alternativas consideradas:**

- Campo de fechas dentro de Programa (descartado por falta de flexibilidad)

### 2. Curación Manual vs Scraping

**Decisión:** Curación manual de instituciones y programas.

**Razón:**

- Calidad sobre cantidad
- Control de información crítica
- Evitar datos incorrectos o desactualizados
- MVP más simple y confiable

**Futuro:** Considerar scraping asistido con validación manual.

### 3. Algoritmo de Recomendación

**Decisión:** Algoritmo basado en matching de perfiles.

**Razón:**

- Simplicidad para MVP
- Resultados predecibles
- Fácil de ajustar y mejorar

**Futuro:** Considerar machine learning cuando haya suficientes datos.

---

(Documentación completa por definir durante implementación)

[← Volver a Backend](README.md)

### 2. Separación Programa-Convocatoria

**Decisión:** Crear entidades separadas para Programa y Convocatoria.

**Razón:**

- Control temporal independiente
- Múltiples convocatorias por programa
- Ocultamiento automático de convocatorias vencidas
- Historial de convocatorias
- Notificaciones internas al equipo

**Implementación:**

```sql
-- Tabla programas (permanente)
CREATE TABLE programas (
  id UUID PRIMARY KEY,
  nombre TEXT,
  institucion_id UUID REFERENCES instituciones(id)
);

-- Tabla convocatorias (temporal)
CREATE TABLE convocatorias (
  id UUID PRIMARY KEY,
  programa_id UUID REFERENCES programas(id),
  fecha_apertura DATE,
  fecha_cierre DATE,
  activa BOOLEAN GENERATED ALWAYS AS (
    fecha_cierre >= CURRENT_DATE
  ) STORED
);
```

**Alternativas consideradas:**

- Campo de fechas dentro de Programa (descartado: falta de flexibilidad)
- Soft delete de programas vencidos (descartado: pérdida de historial)

---

### 3. Curación Manual vs Scraping

**Decisión:** Curación manual de instituciones y programas en fase MVP.

**Razón:**

- Calidad sobre cantidad
- Control de información crítica
- Evitar datos incorrectos o desactualizados
- MVP más simple y confiable
- Equipo pequeño (4 personas)

**Proceso de curación:**

1. Investigación manual de instituciones
2. Validación de información oficial
3. Ingreso a través de panel administrativo
4. Revisión por líder técnico

**Futuro:** Considerar scraping asistido con validación manual en Fase 2.

---

### 4. Algoritmo de Recomendación

**Decisión:** Algoritmo basado en matching de perfiles con ponderación.

**Razón:**

- Simplicidad para MVP
- Resultados predecibles y explicables
- Fácil de ajustar y mejorar
- No requiere datos históricos (cold start)

**Enfoque:**

```javascript
// Pseudocódigo
function calcularCompatibilidad(perfilUsuario, programa) {
  const pesos = {
    habilidades: 0.4,
    intereses: 0.3,
    vocacion: 0.2,
    contexto: 0.1,
  };

  let score = 0;
  score += compararHabilidades(perfilUsuario, programa) * pesos.habilidades;
  score += compararIntereses(perfilUsuario, programa) * pesos.intereses;
  score += compararVocacion(perfilUsuario, programa) * pesos.vocacion;
  score += compararContexto(perfilUsuario, programa) * pesos.contexto;

  return score; // 0-100
}
```

**Futuro:** Considerar machine learning cuando haya suficientes datos (500+ usuarios).

---

### 5. Estructura Modular

**Decisión:** Organizar código en módulos independientes por dominio.

**Razón:**

- Equipo de 4 personas trabajando en paralelo
- Reduce conflictos de merge
- Facilita testing aislado
- Escalabilidad futura
- Separación de responsabilidades clara

**Estructura:**

```
backend/
├── src/
│   ├── modules/
│   │   ├── cuestionario/
│   │   │   ├── routes.js
│   │   │   ├── controller.js
│   │   │   ├── service.js
│   │   │   └── validation.js
│   │   ├── recomendaciones/
│   │   ├── instituciones/
│   │   ├── programas/
│   │   └── convocatorias/
│   ├── shared/
│   │   ├── middleware/
│   │   └── utils/
│   ├── config/
│   │   ├── supabase.js
│   │   └── env.js
│   └── app.js
└── tests/
```

---

### 6. Validación con Zod

**Decisión:** Usar Zod para validación de datos en lugar de validación manual.

**Razón:**

- Type-safe (TypeScript-first)
- Validación declarativa y legible
- Mensajes de error claros
- Reutilizable en frontend y backend
- Reduce bugs de validación

**Ejemplo:**

```javascript
const ProgramaSchema = z.object({
  nombre: z.string().min(3).max(200),
  tipo: z.enum(["universitario", "tecnico", "no_tradicional"]),
  duracion: z.string(),
  modalidad: z.enum(["presencial", "virtual", "hibrida"]),
});
```

---

### 7. Deploy en Vercel

**Decisión:** Desplegar backend en Vercel como Serverless Functions.

**Razón:**

- Integración perfecta con GitHub
- Deploy automático en cada push
- Tier gratuito generoso
- SSL automático
- Escalado automático
- Misma plataforma que frontend (simplicidad)

**Configuración:**

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "src/app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "src/app.js"
    }
  ]
}
```

**Alternativas consideradas:**

- Railway (descartado: menos familiar para el equipo)
- Heroku (descartado: tier gratuito limitado)
- AWS (descartado: complejidad para MVP)

---

## Mejores Prácticas Adoptadas

### 1. Separación de Responsabilidades

- **Routes:** Solo definición de rutas
- **Controllers:** Manejo de request/response
- **Services:** Lógica de negocio
- **Validation:** Esquemas de validación

### 2. Manejo de Errores

```javascript
// Middleware de error centralizado
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});
```

### 3. Logging

- Console.log en desarrollo
- Structured logging en producción (futuro: Winston o Pino)

### 4. Testing

- Tests unitarios para servicios
- Tests de integración para APIs
- Cobertura mínima: 70%

---

## Consideraciones de Seguridad

1. **Helmet** para headers HTTP seguros
2. **CORS** configurado solo para dominios permitidos
3. **Rate limiting** en endpoints públicos (futuro)
4. **Validación** de todos los inputs con Zod
5. **Service Key** de Supabase solo en backend (nunca en frontend)
6. **Sanitización** de datos antes de queries

---

## Roadmap Técnico

### MVP (Actual)

- ✅ Node.js + Express
- ✅ Supabase para BD y Auth
- ✅ Arquitectura modular
- ✅ Algoritmo básico de recomendación

### Fase 2 (Futuro)

- [ ] Caching con Redis
- [ ] Rate limiting
- [ ] Logging estructurado
- [ ] Monitoring (Sentry)
- [ ] CI/CD automatizado

### Fase 3 (Futuro)

- [ ] Machine Learning para recomendaciones
- [ ] Scraping asistido
- [ ] Microservicios (si es necesario)
- [ ] GraphQL (si es necesario)

---

[← Volver a Backend](README.md)
