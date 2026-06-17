import { supabase } from '../config/supabase';

const API_URL = '';

// Obtiene el token de sesión activo para enviarlo al backend
const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
  };
};

// Parsea la respuesta HTTP y normaliza al patrón { success, data, meta, error }
const parseResponse = async (res) => {
  const body = await res.json();
  if (!res.ok) return { success: false, error: body.message || 'Error del servidor' };
  return { success: true, data: body.data, meta: body.meta };
};

// ─── Estadísticas ──────────────────────────────────────────────────────────
export const getStats = async () => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/admin/stats`, { headers });
    return parseResponse(res);
  } catch (err) {
    console.error('adminService.getStats:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};

// ─── Usuarios ──────────────────────────────────────────────────────────────

// Parámetros opcionales: pagina, limite, busqueda, rol
export const getUsuarios = async ({ pagina = 1, limite = 10, busqueda = '', rol = '' } = {}) => {
  try {
    const headers = await getAuthHeaders();
    const params  = new URLSearchParams({
      pagina,
      limite,
      ...(busqueda && { busqueda }),
      ...(rol      && { rol      }),
    });
    const res = await fetch(`${API_URL}/api/admin/usuarios?${params}`, { headers });
    return parseResponse(res);
  } catch (err) {
    console.error('adminService.getUsuarios:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};

// datos: { email, password, nombre, apellido, ciudad, nivel_educativo, grado, edad, telefono, rol }
export const createUsuario = async (datos) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/admin/usuarios`, {
      method:  'POST',
      headers,
      body:    JSON.stringify(datos),
    });
    return parseResponse(res);
  } catch (err) {
    console.error('adminService.createUsuario:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};

// datos: { nombre, apellido, ciudad, nivel_educativo, grado, edad, telefono, rol }
export const updateUsuario = async (id, datos) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/admin/usuarios/${id}`, {
      method:  'PATCH',
      headers,
      body:    JSON.stringify(datos),
    });
    return parseResponse(res);
  } catch (err) {
    console.error('adminService.updateUsuario:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};

export const deleteUsuario = async (id) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/admin/usuarios/${id}`, {
      method:  'DELETE',
      headers,
    });
    return parseResponse(res);
  } catch (err) {
    console.error('adminService.deleteUsuario:', err);
    return { success: false, error: 'Error de conexión con el servidor' };
  }
};
