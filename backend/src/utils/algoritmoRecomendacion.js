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
// src/services/algoritmoRecomendacion.js

const AREA_CATEGORIA = {
  'Ingeniería de Sistemas': 'tecnologia',
  'Ingeniería de Software': 'tecnologia',
  'Desarrollo de Software': 'tecnologia',
  'Análisis y Desarrollo de Software': 'tecnologia',

  'Diseño Gráfico': 'arte',
  'Artes Visuales': 'arte',
  'Música': 'arte',

  'Medicina': 'salud',
  'Enfermería': 'salud',
  'Fisioterapia': 'salud',

  'Administración': 'negocios',
  'Contaduría': 'negocios',
  'Marketing': 'negocios',

  'Biología': 'ciencias',
  'Química': 'ciencias',
  'Física': 'ciencias',

  'Psicología': 'social',
  'Trabajo Social': 'social',
  'Derecho': 'social'
};

function obtenerPorcentajeCategoria(scores, categoria) {
  const encontrado = scores.find(
    (s) => s.categoria.toLowerCase() === categoria.toLowerCase()
  );

  return encontrado?.porcentaje || 0;
}

function calcularCompatibilidad(programa, perfilVocacional) {
  const categoria =
    AREA_CATEGORIA[programa.area_academica] ||
    perfilVocacional.categoriaPrincipal;

  const porcentaje = obtenerPorcentajeCategoria(
    perfilVocacional.scores,
    categoria
  );

  let compatibilidad = porcentaje;
  const razones = [];

  if (porcentaje > 0) {
    razones.push(
      `Tu perfil en ${categoria} (${porcentaje}%) tiene alta afinidad con este programa`
    );
  }

  if (
    categoria.toLowerCase() ===
    perfilVocacional.categoriaPrincipal.toLowerCase()
  ) {
    compatibilidad += 10;
    razones.push(
      `Coincide con tu categoría principal: ${perfilVocacional.categoriaPrincipal}`
    );
  }

  if (
    categoria.toLowerCase() ===
    perfilVocacional.categoriaSecundaria?.toLowerCase()
  ) {
    compatibilidad += 5;
    razones.push(
      `También coincide con tu categoría secundaria`
    );
  }

  return {
    compatibilidad: Math.min(100, compatibilidad),
    razones
  };
}

const generarRecomendaciones = async (
  resultadoId,
  perfilVocacional,
  supabase
) => {
  try {
    console.log(
      '[algoritmoRecomendacion] Generando recomendaciones...'
    );

    const { data: programas, error } = await supabase
      .from('programas')
      .select(`
        *,
        instituciones (
          nombre,
          ciudad
        )
      `);

    if (error) {
      console.error(
        '[algoritmoRecomendacion] Error cargando programas:',
        error
      );
      return;
    }

    const recomendacionesCalculadas = programas.map((programa) => {
      const resultado = calcularCompatibilidad(
        programa,
        perfilVocacional
      );

      return {
        programa,
        compatibilidad: resultado.compatibilidad,
        razones: resultado.razones
      };
    });

    const topProgramas = recomendacionesCalculadas
      .sort((a, b) => b.compatibilidad - a.compatibilidad)
      .slice(0, 5);

    const recomendacionesInsert = topProgramas.map((item) => ({
      resultado_id: resultadoId,
      programa_id: item.programa.id,
      compatibilidad: item.compatibilidad,
      razones: item.razones
    }));

    const { error: insertError } = await supabase
      .from('recomendaciones')
      .insert(recomendacionesInsert);

    if (insertError) {
      console.error(
        '[algoritmoRecomendacion] Error guardando recomendaciones:',
        insertError
      );
      return;
    }

    console.log(
      `[algoritmoRecomendacion] ${recomendacionesInsert.length} recomendaciones guardadas`
    );
  } catch (err) {
    console.error(
      '[algoritmoRecomendacion] Error inesperado:',
      err
    );
  }
};

module.exports = {generarRecomendaciones };

