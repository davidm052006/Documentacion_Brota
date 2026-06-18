import { supabase } from '../config/supabase';

const API_URL = import.meta.env.VITE_API_URL ?? '';

const getAuthHeaders = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
  };
};

export const enviarContacto = async ({ nombre, email, telefono, asunto, mensaje }) => {
  try {
    const res = await fetch(`${API_URL}/api/contacto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, telefono, asunto, mensaje }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, error: data.message || 'Error del servidor.' };
    return { success: true };
  } catch {
    return { success: false, error: 'Error de conexión. Intenta de nuevo.' };
  }
};

export const getContactos = async ({ estado = '', pagina = 1, limite = 20 } = {}) => {
  try {
    const headers = await getAuthHeaders();
    const params  = new URLSearchParams({ pagina, limite, ...(estado && { estado }) });
    const res     = await fetch(`${API_URL}/api/admin/contactos?${params}`, { headers });
    const body    = await res.json();
    if (!res.ok) return { success: false, error: body.message };
    return { success: true, data: body.data, meta: body.meta };
  } catch {
    return { success: false, error: 'Error de conexión.' };
  }
};

export const actualizarContacto = async (id, updates) => {
  try {
    const headers = await getAuthHeaders();
    const res     = await fetch(`${API_URL}/api/admin/contactos/${id}`, {
      method:  'PATCH',
      headers,
      body:    JSON.stringify(updates),
    });
    const body = await res.json();
    if (!res.ok) return { success: false, error: body.message };
    return { success: true };
  } catch {
    return { success: false, error: 'Error de conexión.' };
  }
};
