# 📦 Migración de Documentación

**Fecha de migración:** Marzo 2026

**Razón:** Reorganizar la documentación en una estructura de tres niveles que separa documentación activa, histórica y técnica por módulo para mejorar navegabilidad y mantener foco en el MVP actual.

## Mapeo de Rutas

### Documentación Movida a Archivo Histórico

| Ruta Antigua         | Ruta Nueva                        |
| -------------------- | --------------------------------- |
| `/01-Documentacion/` | `/docs/archivo/01-Documentacion/` |
| `/02-Desarrollo/`    | `/docs/archivo/02-Desarrollo/`    |

### Nueva Documentación Activa Creada

| Archivo                         | Ubicación | Descripción                |
| ------------------------------- | --------- | -------------------------- |
| `00_START_HERE.md`              | `/docs/`  | Punto de entrada principal |
| `mvp_actual.md`                 | `/docs/`  | Alcance del MVP            |
| `arquitectura_actual.md`        | `/docs/`  | Arquitectura vigente       |
| `modelo_datos_vigente.md`       | `/docs/`  | Modelo de datos actual     |
| `requerimientos_funcionales.md` | `/docs/`  | Requisitos activos         |
| `estrategia_pruebas.md`         | `/docs/`  | Plan de testing            |
| `guia_deploy.md`                | `/docs/`  | Guía de despliegue         |
| `gestion_proyecto.md`           | `/docs/`  | Workflow y Kanban          |

### Nueva Documentación Técnica por Módulo

#### Backend (`/backend/`)

| Archivo                  | Descripción                |
| ------------------------ | -------------------------- |
| `README.md`              | Visión general del backend |
| `estructura_api.md`      | Endpoints y contratos      |
| `modelo_datos.md`        | Esquema de base de datos   |
| `decisiones_tecnicas.md` | Decisiones arquitectónicas |

#### Frontend (`/frontend/`)

| Archivo                  | Descripción                 |
| ------------------------ | --------------------------- |
| `README.md`              | Visión general del frontend |
| `estructura_ui.md`       | Componentes UI              |
| `flujo_usuario.md`       | Flujos de navegación        |
| `decisiones_tecnicas.md` | Decisiones de diseño        |

## Estructura Final

```
/
├── README.md (documento académico - sin cambios)
├── docs/
│   ├── 00_START_HERE.md (punto de entrada)
│   ├── mvp_actual.md
│   ├── arquitectura_actual.md
│   ├── modelo_datos_vigente.md
│   ├── requerimientos_funcionales.md
│   ├── estrategia_pruebas.md
│   ├── guia_deploy.md
│   ├── gestion_proyecto.md
│   ├── diagrama-de-arquitectura.png
│   ├── modelo-entidad-relacion-(MER).png
│   └── archivo/
│       ├── README.md
│       ├── MIGRACION.md (este archivo)
│       ├── 01-Documentacion/
│       └── 02-Desarrollo/
├── backend/
│   ├── README.md
│   ├── estructura_api.md
│   ├── modelo_datos.md
│   └── decisiones_tecnicas.md
└── frontend/
    ├── README.md
    ├── estructura_ui.md
    ├── flujo_usuario.md
    └── decisiones_tecnicas.md
```

## Beneficios de la Nueva Estructura

1. **Claridad**: Separación clara entre documentación activa e histórica
2. **Navegabilidad**: Punto de entrada único (`00_START_HERE.md`)
3. **Modularidad**: Documentación técnica junto al código correspondiente
4. **Mantenibilidad**: Más fácil mantener documentación actualizada
5. **Escalabilidad**: Estructura preparada para crecimiento del proyecto

## Notas

- Los diagramas permanecen en `/docs/` para fácil acceso
- El `README.md` principal se mantiene como documento académico
- La documentación histórica se preserva para referencia futura
- Enlaces internos actualizados para reflejar nuevas rutas

---

[← Volver a archivo](README.md)
