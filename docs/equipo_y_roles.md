# 👥 Equipo y Roles - Proyecto Brota

## Composición del Equipo

**Total:** 4 desarrolladores

- 2 Backend Developers
- 2 Frontend Developers

## Roles y Responsabilidades

### 🎯 David Mateo - Líder Técnico & Arquitecto Backend

**Responsabilidades principales:**

- Arquitectura general del sistema
- Integración con Supabase (base de datos)
- Algoritmo de recomendación vocacional
- Revisión de código (code review)
- Coordinación del equipo
- Decisiones técnicas críticas
- Integración entre módulos

**Tecnologías a dominar:**

- Node.js + Express (backend)
- Supabase (PostgreSQL + APIs)
- Git/GitHub (flujo de trabajo)
- Arquitectura modular
- APIs RESTful
- Algoritmos de matching

**Módulos asignados:**

- `/backend/modules/recomendaciones/` - Algoritmo de matching
- `/backend/config/` - Configuración de Supabase
- Integración general del sistema
- Code review de todos los módulos

---

### 🔧 Brayan Moreno - Backend Developer (APIs & Lógica de Negocio)

**Responsabilidades principales:**

- Endpoints de API REST
- Módulo de cuestionarios (backend)
- Procesamiento de respuestas
- Validación de datos
- Gestión de convocatorias y filtros por fecha
- CRUD de instituciones y programas
- Testing de backend

**Tecnologías a dominar:**

- Node.js + Express (backend)
- Supabase (PostgreSQL + APIs)
- Validación de datos (Zod)
- APIs RESTful
- Git/GitHub
- Testing con Jest

**Módulos asignados:**

- `/backend/modules/cuestionario/`
- `/backend/modules/convocatorias/`
- `/backend/modules/instituciones/`
- `/backend/modules/programas/`
- `/backend/middleware/` (validaciones)

**Ruta de aprendizaje:**

1. Node.js y Express básico
2. Supabase JavaScript Client
3. Diseño de APIs RESTful
4. Validación de datos con Zod
5. Testing con Jest

---

### 🎨 Brayan Arias - Frontend Developer (Cuestionario & Visualización)

**Responsabilidades principales:**

- Cuestionario vocacional interactivo
- Visualización del perfil vocacional
- Experiencia de usuario del cuestionario
- Gráficos y visualización de datos
- Diseño responsive
- Validación de formularios (frontend)

**Tecnologías a dominar:**

- React (componentes, hooks, estado)
- Tailwind CSS o CSS modules
- React Hook Form (formularios)
- Recharts o similar (gráficos del perfil)
- Git/GitHub
- Consumo básico de APIs

**Módulos asignados:**

- `/frontend/components/Cuestionario/`
- `/frontend/components/PerfilVocacional/`
- `/frontend/pages/cuestionario.jsx`
- `/frontend/pages/perfil.jsx`

**Ruta de aprendizaje:**

1. Fundamentos de React (componentes, props, state)
2. Manejo de formularios en React
3. Visualización de datos (gráficos)
4. Diseño responsive
5. Consumo básico de APIs con fetch

---

### 🔍 Julian Machado - Frontend Developer (Recomendaciones & Panel Admin)

**Responsabilidades principales:**

- Lista de recomendaciones
- Detalle de programas
- Comparador de programas
- Panel administrativo (frontend)
- Generación de PDF de reportes
- Filtros y búsqueda

**Tecnologías a dominar:**

- React (componentes, hooks, estado)
- React Query (manejo de datos del servidor)
- Tailwind CSS o CSS modules
- jsPDF o react-pdf (generación de PDFs)
- Git/GitHub
- Tablas y formularios

**Módulos asignados:**

- `/frontend/components/Recomendaciones/`
- `/frontend/components/Comparador/`
- `/frontend/components/DetallePrograma/`
- `/frontend/components/Admin/`
- `/frontend/pages/recomendaciones.jsx`
- `/frontend/pages/admin/`

**Ruta de aprendizaje:**

1. Fundamentos de React
2. Consumo de APIs (fetch, axios)
3. React Query para estado del servidor
4. Tablas y formularios en React
5. Generación de PDFs en React

---

## Distribución de Trabajo por Fase

### Fase 1: Setup Inicial (Semana 1-2)

- **David:** Configurar Supabase, estructura de BD, repositorio, arquitectura
- **Brayan Moreno:** Setup backend Node.js, estructura de módulos
- **Brayan Arias:** Setup de React, estructura de componentes
- **Julian:** Setup de React, routing y páginas

### Fase 2: Funcionalidades Core (Semana 3-6)

- **David:** Algoritmo de recomendación, integración Supabase
- **Brayan Moreno:** APIs de cuestionario, endpoints CRUD instituciones/programas
- **Brayan Arias:** Cuestionario completo funcional (frontend)
- **Julian:** Lista de recomendaciones y detalle de programas

### Fase 3: Integración (Semana 7-8)

- **David:** Integración de todos los módulos, testing backend
- **Brayan Moreno:** API de convocatorias, filtro por fechas, validaciones
- **Brayan Arias:** Visualización de perfil vocacional con gráficos
- **Julian:** Comparador de programas, panel admin (frontend)

### Fase 4: Refinamiento (Semana 9-10)

- **David:** Code review, optimizaciones, documentación técnica
- **Brayan Moreno:** Testing backend, corrección de bugs en APIs
- **Brayan Arias:** Diseño responsive, UX improvements
- **Julian:** Generación de PDF, estadísticas básicas

---

## Comunicación y Coordinación

### Reuniones

- **Daily standup:** Lunes, Miércoles, Viernes (15 min)
- **Planning semanal:** Lunes (30 min)
- **Retrospectiva:** Viernes cada 2 semanas (30 min)

### Canales

- **GitHub Issues:** Tareas y bugs
- **GitHub Projects:** Seguimiento de progreso
- **Pull Requests:** Code review obligatorio por David

### Reglas de Trabajo

1. Nadie hace push directo a `main`
2. Todo cambio va por Pull Request
3. Revisión obligatoria de todos los miembros del equipo
4. David hace el merge final después de las revisiones
5. Tests deben pasar antes de merge
6. Commits descriptivos en español

---

## Recursos de Aprendizaje

### Para Todos

- [Documentación oficial de React](https://react.dev)
- [Documentación de Supabase](https://supabase.com/docs)
- [Git y GitHub](https://docs.github.com)

### Para Backend (David y Brayan Moreno)

- [Node.js](https://nodejs.org/docs)
- [Express.js](https://expressjs.com)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Zod - Validación](https://zod.dev)
- [Jest - Testing](https://jestjs.io)

### Para Frontend (Brayan Arias y Julian)

- [React Tutorial oficial](https://react.dev/learn)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com)
- [Recharts](https://recharts.org)

---

## Contacto y Escalación

**Líder Técnico:** David Mateo

- Consultas técnicas complejas
- Decisiones de arquitectura
- Resolución de conflictos técnicos
- Aprobación de Pull Requests

**Proceso de escalación:**

1. Intentar resolver por cuenta propia (30 min)
2. Buscar en documentación oficial (30 min)
3. Consultar con compañero del mismo rol
4. Escalar a David si es bloqueante

---

[← Volver al inicio](00_START_HERE.md)
