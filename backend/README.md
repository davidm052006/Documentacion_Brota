# 🔧 Backend - Sistema Brota

## Visión General

El backend de Brota es una API RESTful construida con Node.js y Express que gestiona la lógica de negocio del sistema de orientación vocacional.

## Responsabilidades

- Procesamiento de cuestionarios vocacionales
- Algoritmo de recomendación personalizada
- Gestión de instituciones, programas y convocatorias
- Control de fechas y ocultamiento automático
- Autenticación y autorización (vía Supabase)
- Validación de datos

## Stack Tecnológico

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (v4+)
- **Base de Datos:** Supabase (PostgreSQL)
- **Validación:** Zod
- **Testing:** Jest + Supertest
- **Deploy:** Vercel (Serverless Functions)

## Estructura del Proyecto

```
backend/
├── src/
│   ├── modules/
│   │   ├── cuestionario/      # Brayan Moreno
│   │   ├── recomendaciones/   # David Mateo
│   │   ├── instituciones/     # Brayan Moreno
│   │   ├── programas/         # Brayan Moreno
│   │   └── convocatorias/     # Brayan Moreno
│   ├── shared/
│   │   ├── middleware/
│   │   └── utils/
│   ├── config/
│   │   ├── supabase.js
│   │   └── env.js
│   └── app.js
├── tests/
├── package.json
└── vercel.json
```

## Documentación Técnica

- [Estructura API](estructura_api.md) - Endpoints y contratos
- [Modelo de Datos](modelo_datos.md) - Esquema de base de datos
- [Decisiones Técnicas](decisiones_tecnicas.md) - Arquitectura y tecnologías

## Tecnologías

### Core

- Node.js + Express
- Supabase (PostgreSQL + Auth)

### Validación y Seguridad

- Zod (validación de esquemas)
- Helmet (headers HTTP seguros)
- CORS

### Testing

- Jest (framework de testing)
- Supertest (testing de APIs)

## Instalación y Configuración

### Prerrequisitos

- Node.js v18 o superior
- npm o yarn
- Cuenta de Supabase

### Variables de Entorno

Crear archivo `.env`:

```
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_KEY=eyJxxx...
NODE_ENV=development
PORT=3000
```

### Instalación

```bash
cd backend
npm install
```

### Desarrollo

```bash
npm run dev
```

### Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

---

[← Volver a documentación principal](../docs/00_START_HERE.md)
