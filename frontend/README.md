# 🎨 Frontend - Sistema Brota

## Visión General

El frontend de Brota es una aplicación React que permite a estudiantes completar el cuestionario vocacional y recibir recomendaciones personalizadas.

## Responsabilidades

- Cuestionario vocacional interactivo
- Visualización de perfil vocacional
- Presentación de recomendaciones
- Comparación de programas
- Panel administrativo básico
- Generación de reportes PDF

## Stack Tecnológico

- **Framework:** React (v18+)
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS
- **Estado del Servidor:** React Query (TanStack Query)
- **Formularios:** React Hook Form
- **Validación:** Zod
- **Gráficos:** Recharts
- **PDF:** jsPDF + html2canvas
- **HTTP:** Axios
- **Routing:** React Router (v6+)
- **Deploy:** Vercel

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Cuestionario/      # Brayan Arias
│   │   ├── PerfilVocacional/  # Brayan Arias
│   │   ├── Recomendaciones/   # Julian Machado
│   │   ├── Comparador/        # Julian Machado
│   │   ├── DetallePrograma/   # Julian Machado
│   │   └── Admin/             # Julian Machado
│   ├── pages/
│   │   ├── cuestionario.jsx
│   │   ├── perfil.jsx
│   │   ├── recomendaciones.jsx
│   │   └── admin/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── App.jsx
├── public/
├── package.json
└── vite.config.js
```

## Documentación Técnica

- [Estructura UI](estructura_ui.md) - Componentes y organización
- [Flujo de Usuario](flujo_usuario.md) - Navegación y experiencia
- [Decisiones Técnicas](decisiones_tecnicas.md) - Tecnologías y arquitectura

## Tecnologías

### Core

- React + Vite
- React Router

### Estilos

- Tailwind CSS
- Headless UI

### Estado y Datos

- React Query (TanStack Query)
- Zustand (si es necesario)

### Formularios

- React Hook Form
- Zod (validación)

### Visualización

- Recharts (gráficos)
- jsPDF (reportes PDF)

## Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- npm o yarn

### Variables de Entorno

Crear archivo `.env`:

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
VITE_API_URL=http://localhost:3000/api
```

### Instalación

```bash
cd frontend
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Testing

```bash
npm test
```

---

[← Volver a documentación principal](../docs/00_START_HERE.md)
