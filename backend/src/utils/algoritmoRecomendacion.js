/**
 * ALGORITMO DE RECOMENDACIÓN VOCACIONAL
 *
 * Flujo:
 *  1. Cargar preguntas + categorías desde cuestionario
 *  2. Cargar perfiles vocacionales disponibles
 *  3. Construir perfil del usuario desde respuestas + pesos
 *  4. Calcular compatibilidad con cada perfil vocacional
 *  5. Seleccionar mejores programas por categoría
 *  6. Persistir recomendaciones en tabla `recomendaciones`
 *
 * Estructura de datos esperada:
 *   resultados.respuestas: JSONB = [{ pregunta_id, opcion_orden, total_opciones? }, ...]
 *   resultados.perfil_vocacional: JSONB = { categoria: score, ... } [0-1]
 */

// ═════════════════════════════════════════════════════════════════════════════
// 1. CARGAR DATOS DE REFERENCIA
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Carga todas las preguntas del cuestionario con su categoría y peso.
 */
const cargarPreguntas = async (cuestionario_id, supabase) => {
  const { data, error } = await supabase
    .from('preguntas')
    .select('id, categoria, peso, orden, tipo')
    .eq('cuestionario_id', cuestionario_id)
    .order('orden');

  if (error) throw new Error(`[cargarPreguntas] ${error.message}`);
  return data; // [{ id, categoria, peso, orden, tipo }]
};

/**
 * Carga todos los perfiles vocacionales disponibles.
 */
const cargarPerfilesVocacionales = async (supabase) => {
  const { data, error } = await supabase
    .from('perfiles_vocacionales')
    .select('*');

  if (error) throw new Error(`[cargarPerfilesVocacionales] ${error.message}`);
  return data; // [{ id, categoria, emoji, titulo, descripcion, color }]
};

/**
 * Carga programas académicos filtrados por categorías.
 * Usa el campo 'categoria' si existe, si no usa 'area_academica'.
 */
const cargarProgramasPorCategoria = async (categorias, supabase) => {
  const { data, error } = await supabase
    .from('programas')
    .select('id, nombre, descripcion, area_academica, categoria, tipo, duracion, institucion_id, instituciones(nombre, ciudad)')
    .or(
      `categoria.in.(${categorias.map(c => `"${c}"`).join(',')})` +
      `,area_academica.ilike.%${categorias[0]}%` // fallback por similitud
    );

  if (error) throw new Error(`[cargarProgramas] ${error.message}`);
  return data;
};

// ═════════════════════════════════════════════════════════════════════════════
// 2. SCORING Y CÁLCULO DE PERFIL
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Convierte el orden de la opción elegida en una puntuación 0–1.
 * Escala lineal: orden 1 = 0, orden 5 = 1
 */
const ordenAPuntuacion = (orden, totalOpciones = 5) => {
  if (!orden || orden < 1) return 0;
  return (orden - 1) / (totalOpciones - 1); // normaliza a [0, 1]
};

/**
 * Construye el perfil de categorías del usuario desde sus respuestas.
 * Respuestas: [{ pregunta_id, opcion_orden, total_opciones? }, ...]
 * Preguntas: [{ id, categoria, peso }, ...]
 * Retorna: { categoria: scoreNormalizado 0-1, ... }
 */
const construirPerfilCategorias = (respuestas, preguntas) => {
  // Índice rápido: pregunta_id → { categoria, peso }
  const indicePregunta = Object.fromEntries(
    preguntas.map(p => [p.id, { categoria: p.categoria, peso: parseFloat(p.peso) || 1 }])
  );

  const acumulado = {};
  const maxPosible = {};

  respuestas.forEach(({ pregunta_id, opcion_orden, total_opciones }) => {
    const meta = indicePregunta[pregunta_id];
    if (!meta || !meta.categoria) return; // pregunta sin categoría → ignorar

    const puntuacion = ordenAPuntuacion(opcion_orden, total_opciones || 5);
    const contribucion = puntuacion * meta.peso;

    acumulado[meta.categoria] = (acumulado[meta.categoria] || 0) + contribucion;
    maxPosible[meta.categoria] = (maxPosible[meta.categoria] || 0) + meta.peso;
  });

  // Normalizar cada categoría a [0, 1]
  const perfil = {};
  Object.keys(acumulado).forEach(cat => {
    perfil[cat] = maxPosible[cat] > 0
      ? parseFloat((acumulado[cat] / maxPosible[cat]).toFixed(4))
      : 0;
  });

  return perfil; // { "tecnologia": 0.82, "social": 0.45, ... }
};

/**
 * Calcula la compatibilidad entre el perfil del usuario y cada perfil vocacional.
 */
const calcularCompatibilidades = (perfilUsuario, perfilesVocacionales) => {
  return perfilesVocacionales
    .map(perfil => {
      const scoreDirecto = perfilUsuario[perfil.categoria] || 0;
      const compatibilidad = parseFloat(scoreDirecto.toFixed(4));

      return { perfil, compatibilidad };
    })
    .sort((a, b) => b.compatibilidad - a.compatibilidad);
};

// ═════════════════════════════════════════════════════════════════════════════
// 3. GENERAR Y PERSISTIR RECOMENDACIONES
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Selecciona los mejores programas para cada perfil vocacional compatible
 * e inserta en tabla recomendaciones.
 */
const persistirRecomendaciones = async (
  resultado_id,
  compatibilidades,
  programas,
  topPerfiles = 3,
  programasPorPerfil = 5,
  supabase
) => {
  const topCategorias = compatibilidades
    .slice(0, topPerfiles)
    .filter(c => c.compatibilidad > 0)
    .map(c => c.perfil.categoria);

  const scoresPorCategoria = Object.fromEntries(
    compatibilidades.map(c => [c.perfil.categoria, c.compatibilidad])
  );

  const filas = [];

  topCategorias.forEach(categoria => {
    const programasDeCategoria = programas
      .filter(p => {
        const cat = p.categoria || p.area_academica || '';
        return cat.toLowerCase().includes(categoria.toLowerCase());
      })
      .slice(0, programasPorPerfil);

    const perfil = compatibilidades.find(c => c.perfil.categoria === categoria)?.perfil;
    const score = scoresPorCategoria[categoria] || 0;

    programasDeCategoria.forEach(programa => {
      filas.push({
        programa_id: programa.id,
        resultado_id,
        compatibilidad: Math.round(score * 100),
        razones: generarRazon(perfil, score),
        vista: false,
      });
    });
  });

  if (filas.length === 0) {
    console.warn('[persistirRecomendaciones] No se encontraron programas para las categorías:', topCategorias);
    return [];
  }

  // Insertar recomendaciones
  const { data, error } = await supabase
    .from('recomendaciones')
    .insert(filas)
    .select();

  if (error) throw new Error(`[persistirRecomendaciones] ${error.message}`);

  console.log(`[algoritmoRecomendacion] ${data.length} recomendaciones insertadas para resultado ${resultado_id}`);
  return data;
};

/**
 * Genera una razón legible para mostrar al usuario.
 */
const generarRazon = (perfil, score) => {
  if (!perfil) return 'Compatible con tu perfil vocacional.';
  const porcentaje = Math.round(score * 100);
  return `Tu perfil muestra ${porcentaje}% de afinidad con ${perfil.titulo}.`;
};

/**
 * Actualiza resultados.perfil_vocacional con el snapshot calculado.
 */
const actualizarPerfilEnResultado = async (resultado_id, perfilCategorias, supabase) => {
  const { error } = await supabase
    .from('resultados')
    .update({ perfil_vocacional: perfilCategorias })
    .eq('id', resultado_id);

  if (error) throw new Error(`[actualizarPerfilEnResultado] ${error.message}`);
};

// ═════════════════════════════════════════════════════════════════════════════
// 4. FUNCIÓN PRINCIPAL EXPORTADA
// ═════════════════════════════════════════════════════════════════════════════

/**
 * generarRecomendaciones
 *
 * @param {string} resultadoId      - UUID del row en tabla resultados
 * @param {Object} perfilVocacional - { cuestionario_id, respuestas: [...] }
 * @param {Object} supabase         - cliente de Supabase con SERVICE_KEY
 *
 * Estructura de respuestas esperada (JSONB en resultados.respuestas):
 * [ 
 *   { pregunta_id: "uuid", opcion_orden: 3, total_opciones: 5 },
 *   { pregunta_id: "uuid", opcion_orden: 5, total_opciones: 5 },
 *   ...
 * ]
 */
const generarRecomendaciones = async (resultadoId, perfilVocacional, supabase) => {
  try {
    const { cuestionario_id, respuestas } = perfilVocacional;

    if (!respuestas || respuestas.length === 0) {
      throw new Error('No hay respuestas para procesar.');
    }
    if (!cuestionario_id) {
      throw new Error('Se requiere cuestionario_id para cargar los pesos de las preguntas.');
    }

    console.log(`[algoritmoRecomendacion] Procesando resultado ${resultadoId}...`);

    // Paso 1: Cargar datos de referencia en paralelo
    const [preguntas, perfilesVocacionales, programas] = await Promise.all([
      cargarPreguntas(cuestionario_id, supabase),
      cargarPerfilesVocacionales(supabase),
      cargarProgramasPorCategoria([], supabase), // cargamos todos, filtramos luego
    ]);

    // Paso 2: Construir perfil de categorías del usuario
    const perfilCategorias = construirPerfilCategorias(respuestas, preguntas);
    console.log('[algoritmoRecomendacion] Perfil calculado:', perfilCategorias);

    // Paso 3: Calcular compatibilidad con cada perfil vocacional
    const compatibilidades = calcularCompatibilidades(perfilCategorias, perfilesVocacionales);
    const top3 = compatibilidades.slice(0, 3).map(c => ({
      area: c.perfil.titulo,
      porcentaje: Math.round(c.compatibilidad * 100),
    }));
    console.log('[algoritmoRecomendacion] Top 3:', top3);

    // Paso 4: Guardar perfil_vocacional calculado en resultados
    await actualizarPerfilEnResultado(resultadoId, perfilCategorias, supabase);

    // Paso 5: Insertar recomendaciones de programas
    const recomendaciones = await persistirRecomendaciones(
      resultadoId,
      compatibilidades,
      programas,
      3, // top 3 perfiles
      5, // 5 programas por perfil
      supabase
    );

    return {
      resultadoId,
      perfilCategorias,
      compatibilidades: compatibilidades.map(c => ({
        categoria: c.perfil.categoria,
        titulo: c.perfil.titulo,
        compatibilidad: c.compatibilidad,
        porcentaje: Math.round(c.compatibilidad * 100),
        emoji: c.perfil.emoji,
        color: c.perfil.color,
      })),
      totalRecomendaciones: recomendaciones.length,
      generadoEn: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[algoritmoRecomendacion] Error:', error.message);
    throw error;
  }
};

module.exports = { generarRecomendaciones };
