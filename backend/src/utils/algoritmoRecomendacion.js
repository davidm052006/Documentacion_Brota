// ============================================================
// ALGORITMO DE RECOMENDACIÓN VOCACIONAL
// ============================================================
// Propósito: dado el perfil_vocacional de un usuario (categorías
// con puntajes), busca los programas académicos más compatibles
// y guarda las recomendaciones en la tabla `recomendaciones`.
//
// CUÁNDO SE LLAMA:
//   → En perfilController.js → guardarResultado(), justo después
//     de insertar el resultado en la tabla `resultados`.
//
// TABLAS QUE UTILIZA:
//   → programas         (id, nombre, tipo, area_academica, duracion, institucion_id)
//   → instituciones     (id, nombre, ciudad)
//   → recomendaciones   (resultado_id, programa_id, compatibilidad, razones)
//
// FIRMA ESPERADA:
//   generarRecomendaciones(resultadoId, perfilVocacional, supabase)
//     → Promise<void>
//
// PARÁMETROS:
//   resultadoId      — UUID del registro recién insertado en `resultados`
//   perfilVocacional — objeto con:
//       categoriaPrincipal:  string   ("tecnologia", "arte", ...)
//       categoriaSecundaria: string   ("ciencias", ...)
//       scores: [{ categoria, puntos, porcentaje }]
//   supabase         — cliente de Supabase con SERVICE_KEY (ya disponible)
//
// ============================================================
// TODO (para el equipo de backend — Brayan / Julian):
//
// 1. Cargar programas con su institución desde Supabase:
//       supabase.from('programas').select('*, instituciones(nombre, ciudad)')
//
// 2. Para cada programa, calcular compatibilidad:
//    - Mapear area_academica → categoría vocacional
//      (ej: "Ingeniería de Sistemas" → "tecnologia")
//    - Fórmula base: compatibilidad = porcentaje de la categoría mapeada
//    - Bonificación si el tipo (universidad/SENA/técnico) coincide con
//      preferencias del estudiante (nivel_educativo en perfiles_usuario)
//
// 3. Filtrar los top N (ej. 5–8) programas con mayor compatibilidad
//
// 4. Construir razones legibles:
//    - "Tu perfil en tecnología (92%) es ideal para este programa"
//    - "Duración corta compatible con tu nivel educativo actual"
//
// 5. Insertar en tabla `recomendaciones`:
//       supabase.from('recomendaciones').insert(recomendaciones)
//
// 6. Manejar errores sin bloquear: si falla, solo logear (el resultado
//    ya fue guardado, las recomendaciones son un plus)
// ============================================================

const generarRecomendaciones = async (resultadoId, perfilVocacional, supabase) => {
  // TODO: implementar algoritmo de matching
  console.log('[algoritmoRecomendacion] pendiente de implementación', { resultadoId });
};

module.exports = { generarRecomendaciones };
