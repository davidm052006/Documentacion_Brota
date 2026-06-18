const API_URL = import.meta.env.VITE_API_URL ?? '';

export const obtenerProgramas = async ({ area, search, page = 1, limit = 24 } = {}) => {
  const params = new URLSearchParams({ page, limit });
  if (area && area !== 'todos') params.set('area', area);
  if (search?.trim()) params.set('search', search.trim());

  try {
    const res  = await fetch(`${API_URL}/api/programas?${params}`);
    const json = await res.json();
    return json;
  } catch (e) {
    return { success: false, error: e.message, data: [], total: 0 };
  }
};

export const obtenerEstadisticas = async () => {
  try {
    const res  = await fetch(`${API_URL}/api/programas/stats`);
    const json = await res.json();
    return json;
  } catch (e) {
    return { success: false, error: e.message, total: 0, areas: [] };
  }
};
