// ============================================
// PERFIL SERVICE — FRONTEND (actualizado)
// ============================================
import { supabase } from '../config/supabase';
 
const API_URL = import.meta.env.VITE_API_URL ?? '';
 
// --------------------------------------------
// OBTENER PREGUNTAS DEL CUESTIONARIO ACTIVO
// --------------------------------------------
export const obtenerCuestionario = async () => {
  try {
    const { data: cuestionario, error: errC } = await supabase
      .from('cuestionarios')
      .select('id, nombre, version')
      .eq('activo', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
 
    if (errC) return { success: false, error: 'No hay cuestionario activo.' };
 
    const { data: preguntas, error: errP } = await supabase
      .from('preguntas')
      .select(`
        id, texto, tipo, orden, categoria, peso,
        opciones (
          id, label, icon, orden,
          pesos_opciones ( categoria, puntos )
        )
      `)
      .eq('cuestionario_id', cuestionario.id)
      .order('orden', { ascending: true });
 
    if (errP) return { success: false, error: errP.message };
 
    const preguntasFormateadas = preguntas.map((p) => ({
      ...p,
      opciones: (p.opciones ?? [])
        .sort((a, b) => a.orden - b.orden)
        .map((o) => ({
          ...o,
          pesos: Object.fromEntries(
            (o.pesos_opciones ?? []).map(({ categoria, puntos }) => [categoria, puntos])
          ),
        })),
    }));
 
    return {
      success: true,
      data: { id: cuestionario.id, cuestionario, preguntas: preguntasFormateadas },
    };
  } catch (err) {
    console.error('perfilService.obtenerCuestionario:', err);
    return { success: false, error: 'Error de conexión.' };
  }
};
 
// --------------------------------------------
// GUARDAR RESULTADO DEL TEST
// --------------------------------------------
export const guardarResultado = async (perfilUsuarioId, cuestionarioId, respuestas, perfilVocacional) => {
  try {
    const response = await fetch(`${API_URL}/api/perfil/resultado`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        perfil_usuario_id: perfilUsuarioId,
        cuestionario_id: cuestionarioId,
        respuestas,
        perfil_vocacional: perfilVocacional,
      }),
    });
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };
    return { success: true, data: data.data };
  } catch (err) {
    console.error('perfilService.guardarResultado:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};
 
// --------------------------------------------
// OBTENER ÚLTIMO RESULTADO DE UN USUARIO
// --------------------------------------------
export const obtenerResultado = async (perfilUsuarioId) => {
  try {
    const response = await fetch(`${API_URL}/api/perfil/resultado/${perfilUsuarioId}`);
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };
    return { success: true, data: data.data };
  } catch (err) {
    console.error('perfilService.obtenerResultado:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};
 
// --------------------------------------------
// OBTENER RECOMENDACIONES DE UN RESULTADO
// Columnas reales confirmadas:
//   recomendaciones : id, programa_id, resultado_id, compatibilidad, razones, vista
//   programas       : id, institucion_id, nombre, tipo, area_academica, duracion,
//                     modalidad, descripcion, perfil_compatible, categoria
//   instituciones   : id, nombre, ciudad, departamento, tipo
// --------------------------------------------
export const obtenerRecomendaciones = async (resultadoId) => {
  try {
    const { data, error } = await supabase
      .from('recomendaciones')
      .select(`
        id,
        compatibilidad,
        razones,
        vista,
        programas (
          id,
          nombre,
          tipo,
          area_academica,
          duracion,
          modalidad,
          descripcion,
          categoria,
          instituciones (
            nombre,
            ciudad,
            departamento
          )
        )
      `)
      .eq('resultado_id', resultadoId)
      .order('compatibilidad', { ascending: false })
      .limit(6);
 
    if (error) {
      console.error('obtenerRecomendaciones error:', error);
      return { success: false, error: error.message };
    }
 
    const recomendaciones = (data ?? []).map((r) => ({
      id:           r.id,
      nombre:       r.programas?.nombre        ?? '—',
      institucion:  r.programas?.instituciones?.nombre      ?? '—',
      ciudad:       r.programas?.instituciones?.ciudad      ?? '',
      departamento: r.programas?.instituciones?.departamento ?? '',
      area:         r.programas?.area_academica ?? r.programas?.categoria ?? '',
      tipo:         r.programas?.tipo           ?? '',
      duracion:     r.programas?.duracion       ?? '',
      modalidad:    r.programas?.modalidad      ?? '',
      compatibilidad: Math.round((r.compatibilidad ?? 0) * 100),
      razones:      r.razones  ?? '',
      vista:        r.vista    ?? false,
    }));
 
    return { success: true, data: recomendaciones };
  } catch (err) {
    console.error('perfilService.obtenerRecomendaciones:', err);
    return { success: false, error: 'Error al cargar recomendaciones.' };
  }
};
 
// --------------------------------------------
// MARCAR RECOMENDACIÓN COMO VISTA
// --------------------------------------------
export const marcarRecomendacionVista = async (recomendacionId) => {
  try {
    const { error } = await supabase
      .from('recomendaciones')
      .update({ vista: true })
      .eq('id', recomendacionId);
 
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err) {
    console.error('perfilService.marcarRecomendacionVista:', err);
    return { success: false, error: 'Error al actualizar.' };
  }
};
 
// --------------------------------------------
// ELIMINAR TODOS LOS RESULTADOS DEL USUARIO
// --------------------------------------------
export const eliminarResultado = async (perfilUsuarioId) => {
  try {
    const response = await fetch(`${API_URL}/api/perfil/resultado/${perfilUsuarioId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };
    return { success: true };
  } catch (err) {
    console.error('perfilService.eliminarResultado:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};
 
// --------------------------------------------
// OBTENER PERFIL COMPLETO DEL USUARIO
// --------------------------------------------
export const obtenerPerfil = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/api/perfil/${userId}`);
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };
    return { success: true, data: data.data };
  } catch (err) {
    console.error('perfilService.obtenerPerfil:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};
