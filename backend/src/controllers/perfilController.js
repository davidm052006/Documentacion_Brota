// ============================================
// PERFIL CONTROLLER
// ============================================
// Maneja el cuestionario vocacional:
// - Traer preguntas desde la DB
// - Guardar resultados
// - Obtener recomendaciones

const supabase = require('../config/supabase');
const { calcularPorcentajes }      = require('../utils/perfilvocacional');
const { generarRecomendaciones }   = require('../utils/algoritmoRecomendacion');

// --------------------------------------------
// OBTENER PREGUNTAS DEL CUESTIONARIO ACTIVO
// GET /api/perfil/cuestionario
// --------------------------------------------
const obtenerCuestionario = async (req, res) => {
  try {
    // Traer el cuestionario activo
    const { data: cuestionario, error: errorCuestionario } = await supabase
      .from('cuestionarios')
      .select('*')
      .eq('activo', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (errorCuestionario) {
      return res.status(404).json({
        success: false,
        message: 'No hay cuestionario activo'
      });
    }

    // Traer las preguntas de ese cuestionario ordenadas
    const { data: preguntas, error: errorPreguntas } = await supabase
      .from('preguntas')
      .select('*')
      .eq('cuestionario_id', cuestionario.id)
      .order('orden', { ascending: true });

    if (errorPreguntas) {
      return res.status(500).json({
        success: false,
        message: errorPreguntas.message
      });
    }

    return res.json({
      success: true,
      data: {
        cuestionario,
        preguntas
      }
    });

  } catch (error) {
    console.error('perfilController.obtenerCuestionario:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// --------------------------------------------
// GUARDAR RESULTADO DEL TEST
// POST /api/perfil/resultado
// Body: { perfil_usuario_id, cuestionario_id, respuestas, perfil_vocacional }
// --------------------------------------------
const guardarResultado = async (req, res) => {
  try {
    const {
      perfil_usuario_id,
      cuestionario_id,
      respuestas,
      perfil_vocacional
    } = req.body;

    if (!perfil_usuario_id || !cuestionario_id || !respuestas) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos: perfil_usuario_id, cuestionario_id, respuestas'
      });
    }

    const perfilCalculado = calcularPorcentajes(perfil_vocacional);
    const perfilNormalizado = perfil_vocacional?.perfil || perfil_vocacional;

    const { data, error } = await supabase
      .from('resultados')
      .insert([{
        perfil_usuario_id,
        cuestionario_id,
        respuestas,
        perfil_vocacional: {
          ...perfil_vocacional,
          perfil: perfilNormalizado,
          porcentajes: perfilCalculado
        },
        fecha_realizacion: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('perfilController.guardarResultado:', error);
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    // Lanzar recomendaciones en paralelo — no bloquea la respuesta HTTP
    generarRecomendaciones(
      data.id,
      {
        categoriaPrincipal:  perfil_vocacional?.categoriaPrincipal,
        categoriaSecundaria: perfil_vocacional?.categoriaSecundaria,
        scores:              perfil_vocacional?.scores ?? [],
      },
      supabase
    ).catch(err => console.error('[perfilController] generarRecomendaciones:', err));

    return res.status(201).json({
      success: true,
      message: 'Resultado guardado',
      data
    });

  } catch (error) {
    console.error('perfilController.guardarResultado:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// --------------------------------------------
// OBTENER ÚLTIMO RESULTADO DE UN USUARIO
// GET /api/perfil/resultado/:perfilUsuarioId
// --------------------------------------------
const obtenerResultado = async (req, res) => {
  try {
    const { perfilUsuarioId } = req.params;

    const { data, error } = await supabase
      .from('resultados')
      .select(`
        *,
        cuestionarios (nombre, version),
        recomendaciones (
          compatibilidad,
          razones,
          programas (
            nombre,
            tipo,
            area_academica,
            duracion,
            instituciones (nombre, ciudad)
          )
        )
      `)
      .eq('perfil_usuario_id', perfilUsuarioId)
      .order('fecha_realizacion', { ascending: false })
      .limit(1)
      .single();

    // PGRST116 = no rows found, el usuario aún no ha hecho el test
    if (error && error.code === 'PGRST116') {
      return res.json({ success: true, data: null });
    }

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }

    return res.json({ success: true, data });

  } catch (error) {
    console.error('perfilController.obtenerResultado:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// --------------------------------------------
// OBTENER PERFIL COMPLETO DEL USUARIO
// GET /api/perfil/:userId
// --------------------------------------------
const obtenerPerfil = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('perfiles_usuario')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    return res.json({ success: true, data });

  } catch (error) {
    console.error('perfilController.obtenerPerfil:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// --------------------------------------------
// ELIMINAR TODOS LOS RESULTADOS DE UN USUARIO
// DELETE /api/perfil/resultado/:perfilUsuarioId
// --------------------------------------------
const eliminarResultado = async (req, res) => {
  try {
    const { perfilUsuarioId } = req.params;

    // Primero obtener los IDs de resultados para borrar sus recomendaciones
    const { data: resultados } = await supabase
      .from('resultados')
      .select('id')
      .eq('perfil_usuario_id', perfilUsuarioId);

    if (resultados?.length) {
      const ids = resultados.map(r => r.id);
      await supabase.from('recomendaciones').delete().in('resultado_id', ids);
    }

    const { error } = await supabase
      .from('resultados')
      .delete()
      .eq('perfil_usuario_id', perfilUsuarioId);

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.json({ success: true, message: 'Resultados eliminados' });
  } catch (error) {
    console.error('perfilController.eliminarResultado:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  obtenerCuestionario,
  guardarResultado,
  obtenerResultado,
  eliminarResultado,
  obtenerPerfil
};
