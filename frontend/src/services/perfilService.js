// ============================================
// PERFIL SERVICE — FRONTEND
// ============================================
// Conecta el test vocacional con el backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// --------------------------------------------
// OBTENER PREGUNTAS DEL CUESTIONARIO ACTIVO
// --------------------------------------------
export const obtenerCuestionario = async () => {
  try {
    const response = await fetch(`${API_URL}/api/perfil/cuestionario`);
    const data = await response.json();
    if (!response.ok) return { success: false, error: data.message };
    return { success: true, data: data.data };
  } catch (err) {
    console.error('perfilService.obtenerCuestionario:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
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
