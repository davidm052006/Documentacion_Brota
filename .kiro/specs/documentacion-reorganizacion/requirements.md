# Requirements Document

## Introduction

Este documento define los requisitos para reorganizar la documentación del proyecto Brota en una estructura de tres niveles que separa documentación activa, histórica y técnica por módulo. El objetivo es mejorar la navegabilidad, mantener el foco en el MVP actual, y facilitar el acceso a información relevante según el contexto de trabajo.

## Glossary

- **Sistema_Reorganizacion**: El proceso y conjunto de operaciones para reestructurar la documentación existente
- **Documentacion_Activa**: Documentación operativa del MVP actual ubicada en `/docs/`
- **Documentacion_Historica**: Documentación conceptual, visiones iniciales e ideas descartadas ubicada en `/docs/archivo/`
- **Documentacion_Tecnica_Modular**: Documentación técnica específica de cada módulo (backend/frontend) ubicada en sus respectivos directorios
- **Archivo_Fuente**: Documento existente en la estructura actual (`/01-Documentacion/` o `/02-Desarrollo/`)
- **Archivo_Destino**: Ubicación final del documento en la nueva estructura
- **Indice_Principal**: Archivo `/docs/00_START_HERE.md` que sirve como punto de entrada a toda la documentación
- **README_Modular**: Archivo README.md específico de cada módulo (backend/frontend)
- **Estructura_Antigua**: Directorios `/01-Documentacion/` y `/02-Desarrollo/` que contienen la documentación actual
- **MVP**: Producto Mínimo Viable del sistema Brota enfocado en cuestionario, recomendación básica y base curada

## Requirements

### Requirement 1: Crear Estructura de Documentación Activa

**User Story:** Como desarrollador del proyecto, quiero tener una estructura clara de documentación activa, para poder acceder rápidamente a la información del MVP actual.

#### Acceptance Criteria

1. THE Sistema_Reorganizacion SHALL create the directory `/docs/` if it does not exist
2. THE Sistema_Reorganizacion SHALL create the file `/docs/00_START_HERE.md` as the main entry point
3. THE Indice_Principal SHALL contain links to all active documentation files
4. THE Indice_Principal SHALL contain a section describing the three-level documentation structure
5. THE Indice_Principal SHALL contain links to backend and frontend technical documentation
6. THE Indice_Principal SHALL contain a link to historical documentation in `/docs/archivo/`

### Requirement 2: Crear Estructura de Documentación Histórica

**User Story:** Como desarrollador del proyecto, quiero preservar la documentación conceptual e histórica en un archivo separado, para mantener el contexto sin interferir con la documentación operativa.

#### Acceptance Criteria

1. THE Sistema_Reorganizacion SHALL create the directory `/docs/archivo/`
2. THE Sistema_Reorganizacion SHALL move all conceptual and vision documents from `/01-Documentacion/` to `/docs/archivo/`
3. THE Sistema_Reorganizacion SHALL preserve the original subdirectory structure within `/docs/archivo/`
4. THE Sistema_Reorganizacion SHALL create a file `/docs/archivo/README.md` explaining the archived content
5. WHEN all files are moved, THE Sistema_Reorganizacion SHALL remove the empty `/01-Documentacion/` directory

### Requirement 3: Crear Estructura de Documentación Técnica Backend

**User Story:** Como desarrollador backend, quiero tener toda la documentación técnica del backend en su propio directorio, para acceder fácilmente a información relevante mientras trabajo en el módulo.

#### Acceptance Criteria

1. WHERE the `/backend/` directory exists, THE Sistema_Reorganizacion SHALL create a `/backend/README.md` file
2. THE README_Modular SHALL contain an overview of the backend architecture
3. THE Sistema_Reorganizacion SHALL create `/backend/estructura_api.md` documenting API endpoints and structure
4. THE Sistema_Reorganizacion SHALL create `/backend/modelo_datos.md` documenting the data model with entities: Institucion, Programa, Convocatoria, PerfilUsuario, Resultado, Recomendacion
5. THE Sistema_Reorganizacion SHALL create `/backend/decisiones_tecnicas.md` documenting technical decisions and rationale
6. THE Sistema_Reorganizacion SHALL move relevant technical content from `/02-Desarrollo/2.2 Backend/` to the appropriate backend documentation files

### Requirement 4: Crear Estructura de Documentación Técnica Frontend

**User Story:** Como desarrollador frontend, quiero tener toda la documentación técnica del frontend en su propio directorio, para acceder fácilmente a información relevante mientras trabajo en el módulo.

#### Acceptance Criteria

1. WHERE the `/frontend/` directory exists, THE Sistema_Reorganizacion SHALL create a `/frontend/README.md` file
2. THE README_Modular SHALL contain an overview of the frontend architecture
3. THE Sistema_Reorganizacion SHALL create `/frontend/estructura_ui.md` documenting UI component structure
4. THE Sistema_Reorganizacion SHALL create `/frontend/flujo_usuario.md` documenting user flows for the MVP
5. THE Sistema_Reorganizacion SHALL create `/frontend/decisiones_tecnicas.md` documenting technical decisions and rationale
6. THE Sistema_Reorganizacion SHALL move relevant technical content from `/02-Desarrollo/2.3 Frontend/` to the appropriate frontend documentation files

### Requirement 5: Consolidar Documentación del MVP Actual

**User Story:** Como miembro del equipo, quiero tener documentación clara del MVP actual en la documentación activa, para entender el alcance y prioridades del desarrollo.

#### Acceptance Criteria

1. THE Sistema_Reorganizacion SHALL create `/docs/mvp_actual.md` describing the current MVP scope
2. THE mvp_actual.md SHALL document the five core features: cuestionario funcional, algoritmo básico, base curada, filtro por fecha, panel interno
3. THE Sistema_Reorganizacion SHALL create `/docs/arquitectura_actual.md` documenting the current architecture
4. THE arquitectura_actual.md SHALL reference the existing diagrams in `/docs/`
5. THE Sistema_Reorganizacion SHALL create `/docs/modelo_datos_vigente.md` documenting the active data model
6. THE modelo_datos_vigente.md SHALL document the separation between Programa and Convocatoria entities
7. THE Sistema_Reorganizacion SHALL create `/docs/requerimientos_funcionales.md` documenting active functional requirements

### Requirement 6: Migrar Contenido Técnico de Arquitectura

**User Story:** Como arquitecto del sistema, quiero que la documentación de arquitectura esté consolidada en la documentación activa, para tener una visión clara de la estructura actual del sistema.

#### Acceptance Criteria

1. THE Sistema_Reorganizacion SHALL extract relevant architecture content from `/02-Desarrollo/2.1 Arquitectura/`
2. WHEN architecture content is MVP-related, THE Sistema_Reorganizacion SHALL move it to `/docs/arquitectura_actual.md`
3. WHEN architecture content is exploratory or outdated, THE Sistema_Reorganizacion SHALL move it to `/docs/archivo/`
4. THE arquitectura_actual.md SHALL include references to both existing diagram files in `/docs/`
5. WHEN all content is migrated, THE Sistema_Reorganizacion SHALL remove the empty `/02-Desarrollo/2.1 Arquitectura/` directory

### Requirement 7: Preservar Diagramas Existentes

**User Story:** Como miembro del equipo, quiero que los diagramas existentes permanezcan accesibles en la documentación activa, para visualizar la arquitectura y el modelo de datos.

#### Acceptance Criteria

1. THE Sistema_Reorganizacion SHALL keep `/docs/diagrama-de-arquitectura.png` in its current location
2. THE Sistema_Reorganizacion SHALL keep `/docs/modelo-entidad-relacion-(MER).png` in its current location
3. THE Indice_Principal SHALL contain direct links to both diagram files
4. THE arquitectura_actual.md SHALL embed or reference both diagram files
5. THE modelo_datos_vigente.md SHALL embed or reference the MER diagram

### Requirement 8: Gestionar Documentación de Módulos Especializados

**User Story:** Como desarrollador, quiero que la documentación de módulos especializados (IA, integraciones, pruebas, deploy) esté organizada según su relevancia para el MVP, para evitar distracciones con funcionalidad futura.

#### Acceptance Criteria

1. WHEN content in `/02-Desarrollo/2.4 IA_y_automatización/` is MVP-related, THE Sistema_Reorganizacion SHALL move it to `/docs/`
2. WHEN content in `/02-Desarrollo/2.4 IA_y_automatización/` is exploratory, THE Sistema_Reorganizacion SHALL move it to `/docs/archivo/`
3. THE Sistema_Reorganizacion SHALL move content from `/02-Desarrollo/2.5 Integraciones_externas/` to `/docs/archivo/`
4. THE Sistema_Reorganizacion SHALL extract relevant testing documentation from `/02-Desarrollo/2.6 Pruebas/` to `/docs/estrategia_pruebas.md`
5. THE Sistema_Reorganizacion SHALL extract relevant deployment documentation from `/02-Desarrollo/2.7 Deploy/` to `/docs/guia_deploy.md`
6. WHEN all content is migrated, THE Sistema_Reorganizacion SHALL remove empty directories from `/02-Desarrollo/`

### Requirement 9: Mantener README Principal

**User Story:** Como visitante del repositorio, quiero que el README principal se mantenga como documento de requisitos académico, para cumplir con los requisitos del proyecto académico.

#### Acceptance Criteria

1. THE Sistema_Reorganizacion SHALL preserve `/README.md` in its current location
2. THE Sistema_Reorganizacion SHALL add a section to `/README.md` linking to `/docs/00_START_HERE.md`
3. THE new section SHALL be titled "Documentación del Proyecto"
4. THE new section SHALL contain a brief description of the three-level documentation structure
5. THE Sistema_Reorganizacion SHALL maintain the existing APA 7 format of `/README.md`

### Requirement 10: Limpiar Estructura Antigua

**User Story:** Como desarrollador, quiero que la estructura antigua de documentación sea removida después de la migración, para evitar confusión sobre cuál documentación es la vigente.

#### Acceptance Criteria

1. WHEN all files from `/01-Documentacion/` are migrated, THE Sistema_Reorganizacion SHALL remove the `/01-Documentacion/` directory
2. WHEN all files from `/02-Desarrollo/` are migrated, THE Sistema_Reorganizacion SHALL remove the `/02-Desarrollo/` directory
3. THE Sistema_Reorganizacion SHALL create a file `/docs/archivo/MIGRACION.md` documenting the migration process
4. THE MIGRACION.md SHALL contain a mapping table showing old paths to new paths
5. THE MIGRACION.md SHALL contain the date of migration and the reason for reorganization

### Requirement 11: Validar Integridad de Enlaces

**User Story:** Como usuario de la documentación, quiero que todos los enlaces internos funcionen correctamente después de la reorganización, para navegar sin encontrar enlaces rotos.

#### Acceptance Criteria

1. WHEN a document contains internal links, THE Sistema_Reorganizacion SHALL update the links to reflect new paths
2. THE Sistema_Reorganizacion SHALL validate that all links in `/docs/00_START_HERE.md` point to existing files
3. THE Sistema_Reorganizacion SHALL validate that all links in backend README_Modular point to existing files
4. THE Sistema_Reorganizacion SHALL validate that all links in frontend README_Modular point to existing files
5. IF a link points to a non-existent file, THEN THE Sistema_Reorganizacion SHALL log a warning with the file path and broken link

### Requirement 12: Documentar Gestión del Proyecto

**User Story:** Como miembro del equipo, quiero tener documentación sobre la gestión del proyecto con GitHub Projects, para entender el flujo de trabajo y las columnas del Kanban.

#### Acceptance Criteria

1. THE Sistema_Reorganizacion SHALL create `/docs/gestion_proyecto.md` documenting project management practices
2. THE gestion_proyecto.md SHALL document the GitHub Projects Kanban board structure
3. THE gestion_proyecto.md SHALL document the four columns: Backlog, In Progress, In Review, Done
4. THE gestion_proyecto.md SHALL document the workflow for moving tasks between columns
5. THE Indice_Principal SHALL contain a link to `/docs/gestion_proyecto.md`
