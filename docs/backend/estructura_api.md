# 🔌 Estructura API - Backend Brota

## Endpoints Principales

### Cuestionario

#### POST /api/cuestionario

Enviar respuestas del cuestionario vocacional.

**Request:**

```json
{
  "usuario_id": "string",
  "respuestas": []
}
```

**Response:**

```json
{
  "perfil_vocacional": {},
  "recomendaciones": []
}
```

### Recomendaciones

#### GET /api/recomendaciones/:usuario_id

Obtener recomendaciones para un usuario.

### Programas

#### GET /api/programas

Listar programas disponibles con convocatorias abiertas.

#### GET /api/programas/:id

Obtener detalle de un programa específico.

### Instituciones

#### GET /api/instituciones

Listar instituciones activas.

### Panel Administrativo

#### POST /api/admin/instituciones

Crear nueva institución.

#### POST /api/admin/programas

Crear nuevo programa.

#### POST /api/admin/convocatorias

Crear nueva convocatoria.

---

(Documentación completa por definir durante implementación)

[← Volver a Backend](README.md)
