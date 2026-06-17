// ============================================
// PERFIL SERVICE — FRONTEND
// ============================================
// obtenerCuestionario consulta Supabase directo (datos públicos, sin backend).
// guardarResultado / obtenerResultado / obtenerPerfil siguen usando el backend
// Express para operaciones que requieren autenticación.

import { supabase } from '../config/supabase';

const API_URL = '';

// --------------------------------------------
// OBTENER PREGUNTAS DEL CUESTIONARIO ACTIVO
// Consulta Supabase directo — no necesita el backend Express.
// Las preguntas son datos públicos (RLS: FOR SELECT USING (true)).
// --------------------------------------------
export const obtenerCuestionario = async () => {
  try {
    // 1. Cuestionario activo más reciente
    const { data: cuestionario, error: errC } = await supabase
      .from('cuestionarios')
      .select('id, nombre, version')
      .eq('activo', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (errC) return { success: false, error: 'No hay cuestionario activo.' };

    // 2. Preguntas con opciones y pesos en una sola query
    const { data: preguntas, error: errP } = await supabase
      .from('preguntas')
      .select(`
        id,
        texto,
        tipo,
        orden,
        opciones (
          id,
          label,
          icon,
          orden,
          pesos_opciones (
            categoria,
            puntos
          )
        )
      `)
      .eq('cuestionario_id', cuestionario.id)
      .order('orden', { ascending: true });

    if (errP) return { success: false, error: errP.message };

    // 3. Transformar pesos de array a objeto: { tecnologia: 3, diseño: 1 }
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
// Llamar cuando el usuario termina el cuestionario
//
// Parámetros:
//   perfilUsuarioId — id de la tabla perfiles_usuario (NO el auth user id)
//   cuestionarioId  — id del cuestionario respondido
//   respuestas      — objeto { [preguntaId]: string[] }
//   perfilVocacional — objeto con el perfil calculado
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
        perfil_vocacional: perfilVocacional
      })
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
// Devuelve null si aún no ha hecho el test
// --------------------------------------------
export const obtenerResultado = async (perfilUsuarioId) => {
  try {
    const response = await fetch(`${API_URL}/api/perfil/resultado/${perfilUsuarioId}`);
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };
    return { success: true, data: data.data }; // null si no ha hecho el test
  } catch (err) {
    console.error('perfilService.obtenerResultado:', err);
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
