# 🎯 Decisiones Técnicas - Frontend Brota

## Stack Tecnológico

### Framework & Librerías Core

- **React** (v18+) - Librería UI
- **React Router** (v6+) - Navegación SPA
- **Vite** - Build tool y dev server (más rápido que Create React App)

### Estilos

- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Componentes accesibles sin estilos

### Manejo de Estado

- **React Query** (TanStack Query) - Estado del servidor
- **Zustand** - Estado global ligero (si es necesario)

### Formularios y Validación

- **React Hook Form** - Manejo de formularios performante
- **Zod** - Validación de esquemas (compartido con backend)

### Visualización de Datos

- **Recharts** - Gráficos para perfil vocacional

### Generación de PDFs

- **jsPDF** + **html2canvas** - Generación de reportes

### HTTP Client

- **Axios** - Cliente HTTP (alternativa: fetch nativo)

### Supabase

- **@supabase/supabase-js** - Cliente oficial de Supabase

### Deploy

- **Vercel** - Hosting y deploy automático

---

## Decisiones de Diseño

### 1. Cuestionario Paso a Paso

**Decisión:** Mostrar una pregunta a la vez con barra de progreso.

**Razón:**

- Reduce sobrecarga cognitiva
- Mejora tasa de completación
- Experiencia más enfocada
- Funciona bien en móviles

**Alternativas consideradas:**

- Todas las preguntas en una página (descartado por ser abrumador)

### 2. Visualización de Perfil

**Decisión:** Gráfico de radar/barras con porcentajes por área.

**Razón:**

- Fácil de entender visualmente
- Muestra fortalezas claramente
- Atractivo para público joven

### 3. Ordenamiento de Recomendaciones

**Decisión:** Ordenar por porcentaje de compatibilidad descendente.

**Razón:**

- Prioriza mejores matches
- Decisión clara y objetiva
- Fácil de entender para usuarios

### 4. Responsive Design

**Decisión:** Mobile-first approach.

**Razón:**

- Público objetivo usa principalmente móviles
- Mejor experiencia en dispositivos pequeños
- Progressive enhancement para desktop

---

(Documentación completa por definir durante implementación)

[← Volver a Frontend](README.md)
