# 🎯 Decisiones Técnicas - Backend Brota

## Stack Tecnológico

(Por definir durante implementación)

## Decisiones Arquitectónicas

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
