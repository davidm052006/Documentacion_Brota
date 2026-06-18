const supabase = require('../config/supabase');

const LIMITE_MAX     = 50;
const LIMITE_DEFAULT = 10;

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/usuarios
// Lista paginada de usuarios con su rol. Acepta ?pagina, ?limite, ?busqueda, ?rol
// ─────────────────────────────────────────────────────────────────────────────
const getUsuarios = async (req, res) => {
  try {
    const pagina   = Math.max(1, parseInt(req.query.pagina)  || 1);
    const limite   = Math.min(LIMITE_MAX, parseInt(req.query.limite) || LIMITE_DEFAULT);
    const busqueda = (req.query.busqueda || '').trim();
    const rolFiltro = (req.query.rol || '').trim();

    const desde = (pagina - 1) * limite;
    const hasta  = pagina * limite - 1;

    // Si hay filtro de rol, resolvemos primero los user_ids que lo cumplen
    let filtroUserIds = null;
    if (rolFiltro) {
      const { data: rolesData, error: rolError } = await supabase
        .from('perfiles')
        .select('id')
        .eq('rol', rolFiltro);

      if (rolError) throw rolError;

      filtroUserIds = (rolesData || []).map(r => r.id);
      if (filtroUserIds.length === 0) {
        return res.json({
          success: true,
          data: [],
          meta: { total: 0, pagina, limite, totalPaginas: 0 },
        });
      }
    }

    // Query principal sobre perfiles_usuario con paginación server-side
    let query = supabase
      .from('perfiles_usuario')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(desde, hasta);

    if (busqueda) {
      query = query.or(
        `nombre.ilike.%${busqueda}%,apellido.ilike.%${busqueda}%,ciudad.ilike.%${busqueda}%`
      );
    }

    if (filtroUserIds) {
      query = query.in('user_id', filtroUserIds);
    }

    const { data: usuariosData, count, error: usuariosError } = await query;
    if (usuariosError) throw usuariosError;

    // Segunda query para obtener roles de los usuarios de esta página
    const userIds = (usuariosData || []).map(u => u.user_id);
    const { data: rolesData } = userIds.length > 0
      ? await supabase.from('perfiles').select('id, rol').in('id', userIds)
      : { data: [] };

    const rolesMap = Object.fromEntries((rolesData || []).map(r => [r.id, r.rol]));
    const usuarios = (usuariosData || []).map(u => ({
      ...u,
      rol: rolesMap[u.user_id] || 'estudiante',
    }));

    return res.json({
      success: true,
      data: usuarios,
      meta: {
        total:       count ?? 0,
        pagina,
        limite,
        totalPaginas: Math.ceil((count ?? 0) / limite),
      },
    });
  } catch (err) {
    console.error('adminController.getUsuarios:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/usuarios/:id
// Devuelve un usuario completo con su rol
// ─────────────────────────────────────────────────────────────────────────────
const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('perfiles_usuario')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const { data: perfil } = await supabase
      .from('perfiles')
      .select('rol')
      .eq('id', data.user_id)
      .single();

    return res.json({
      success: true,
      data: { ...data, rol: perfil?.rol || 'estudiante' },
    });
  } catch (err) {
    console.error('adminController.getUsuario:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/admin/usuarios
// Crea un nuevo usuario: auth.users + perfiles_usuario + perfiles (rol)
// Requiere SERVICE_ROLE_KEY para supabase.auth.admin.createUser()
// ─────────────────────────────────────────────────────────────────────────────
const createUsuario = async (req, res) => {
  try {
    const {
      email, password, nombre, apellido,
      ciudad, nivel_educativo, condiciones_socioeconomicas, edad,
      rol = 'estudiante',
    } = req.body;

    if (!email || !password || !nombre || !apellido) {
      return res.status(400).json({
        success: false,
        message: 'Email, contraseña, nombre y apellido son obligatorios',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener mínimo 6 caracteres',
      });
    }

    // 1. Crear usuario en Supabase Auth (solo posible con SERVICE_ROLE_KEY)
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // admin crea usuarios ya confirmados
    });

    if (authError) {
      return res.status(400).json({ success: false, message: authError.message });
    }

    const userId = authData.user.id;

    // 2. Crear registro en perfiles_usuario
    const { error: perfilError } = await supabase
      .from('perfiles_usuario')
      .insert([{ user_id: userId, nombre, apellido, ciudad, nivel_educativo, condiciones_socioeconomicas, edad: edad ? parseInt(edad) : null }]);

    if (perfilError) {
      // Rollback: eliminar el usuario de auth si el perfil no se pudo crear
      await supabase.auth.admin.deleteUser(userId);
      return res.status(500).json({
        success: false,
        message: 'No se pudo crear el perfil: ' + perfilError.message,
      });
    }

    // 3. Asignar rol en perfiles (upsert por si existe un trigger que ya lo creó)
    const { error: rolError } = await supabase
      .from('perfiles')
      .upsert({ id: userId, rol }, { onConflict: 'id' });

    if (rolError) {
      console.warn('adminController.createUsuario — no se pudo asignar rol:', rolError.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Usuario creado correctamente',
      data: { id: userId },
    });
  } catch (err) {
    console.error('adminController.createUsuario:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/admin/usuarios/:id
// Actualiza perfil y/o rol. Las dos operaciones van seguidas dentro del mismo
// request para evitar inconsistencia de datos entre tablas.
// ─────────────────────────────────────────────────────────────────────────────
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, ciudad, nivel_educativo, condiciones_socioeconomicas, edad, rol } = req.body;

    // Obtener user_id del perfil antes de actualizar
    const { data: perfil, error: findError } = await supabase
      .from('perfiles_usuario')
      .select('user_id')
      .eq('id', id)
      .single();

    if (findError || !perfil) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Actualizar datos del perfil en perfiles_usuario
    const { error: updateError } = await supabase
      .from('perfiles_usuario')
      .update({ nombre, apellido, ciudad, nivel_educativo, condiciones_socioeconomicas, edad: edad ? parseInt(edad) : null })
      .eq('id', id);

    if (updateError) {
      return res.status(500).json({ success: false, message: updateError.message });
    }

    // Actualizar rol en perfiles si se proporcionó (upsert por si no existe la fila aún)
    if (rol) {
      const { error: rolError } = await supabase
        .from('perfiles')
        .upsert({ id: perfil.user_id, rol }, { onConflict: 'id' });

      if (rolError) {
        // El perfil se actualizó pero el rol no — informar al cliente
        return res.status(207).json({
          success: true,
          message: 'Perfil actualizado, pero no se pudo cambiar el rol: ' + rolError.message,
        });
      }
    }

    return res.json({ success: true, message: 'Usuario actualizado correctamente' });
  } catch (err) {
    console.error('adminController.updateUsuario:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/admin/usuarios/:id
// Elimina perfiles_usuario y luego el usuario de auth.users
// Requiere SERVICE_ROLE_KEY para supabase.auth.admin.deleteUser()
// ─────────────────────────────────────────────────────────────────────────────
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener user_id antes de eliminar el perfil
    const { data: perfil, error: findError } = await supabase
      .from('perfiles_usuario')
      .select('user_id')
      .eq('id', id)
      .single();

    if (findError || !perfil) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Eliminar perfil de perfiles_usuario
    const { error: deletePerfilError } = await supabase
      .from('perfiles_usuario')
      .delete()
      .eq('id', id);

    if (deletePerfilError) {
      return res.status(500).json({ success: false, message: deletePerfilError.message });
    }

    // Eliminar usuario de Supabase Auth (solo posible con SERVICE_ROLE_KEY)
    const { error: deleteAuthError } = await supabase.auth.admin.deleteUser(perfil.user_id);

    if (deleteAuthError) {
      // Perfil eliminado pero el usuario de auth persiste — estado parcial
      return res.status(207).json({
        success: true,
        message: 'Perfil eliminado. No se pudo eliminar el usuario de autenticación: ' + deleteAuthError.message,
      });
    }

    return res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (err) {
    console.error('adminController.deleteUsuario:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/stats
// Conteo de registros de las tablas principales del sistema
// ─────────────────────────────────────────────────────────────────────────────
const getStats = async (req, res) => {
  try {
    const tablas = ['perfiles_usuario', 'programas', 'instituciones', 'cuestionarios', 'preguntas'];

    const resultados = await Promise.all(
      tablas.map(tabla =>
        supabase
          .from(tabla)
          .select('*', { count: 'exact', head: true })
          .then(({ count }) => [tabla, count ?? 0])
      )
    );

    return res.json({
      success: true,
      data: Object.fromEntries(resultados),
    });
  } catch (err) {
    console.error('adminController.getStats:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// INSTITUCIONES
// ─────────────────────────────────────────────────────────────────────────────
const getInstituciones = async (req, res) => {
  try {
    const pagina   = Math.max(1, parseInt(req.query.pagina)  || 1);
    const limite   = Math.min(50,  parseInt(req.query.limite) || 10);
    const busqueda = (req.query.busqueda || '').trim();
    const desde    = (pagina - 1) * limite;

    let query = supabase
      .from('instituciones')
      .select('*', { count: 'exact' })
      .order('nombre')
      .range(desde, desde + limite - 1);

    if (busqueda) query = query.or(`nombre.ilike.%${busqueda}%,ciudad.ilike.%${busqueda}%`);

    const { data, count, error } = await query;
    if (error) throw error;

    return res.json({ success: true, data, meta: { total: count ?? 0, pagina, limite, totalPaginas: Math.ceil((count ?? 0) / limite) } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createInstitucion = async (req, res) => {
  try {
    const { nombre, tipo, ciudad, departamento, direccion, telefono, email, sitio_web, costo_promedio, activa = true } = req.body;
    if (!nombre) return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });

    const { data, error } = await supabase
      .from('instituciones')
      .insert([{ nombre, tipo, ciudad, departamento, direccion, telefono, email, sitio_web, costo_promedio: costo_promedio || null, activa }])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateInstitucion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, ciudad, departamento, direccion, telefono, email, sitio_web, costo_promedio, activa } = req.body;

    const { error } = await supabase
      .from('instituciones')
      .update({ nombre, tipo, ciudad, departamento, direccion, telefono, email, sitio_web, costo_promedio: costo_promedio || null, activa })
      .eq('id', id);

    if (error) throw error;
    return res.json({ success: true, message: 'Institución actualizada' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteInstitucion = async (req, res) => {
  try {
    const { error } = await supabase.from('instituciones').delete().eq('id', req.params.id);
    if (error) throw error;
    return res.json({ success: true, message: 'Institución eliminada' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMAS
// ─────────────────────────────────────────────────────────────────────────────
const getProgramas = async (req, res) => {
  try {
    const pagina   = Math.max(1, parseInt(req.query.pagina)  || 1);
    const limite   = Math.min(50,  parseInt(req.query.limite) || 10);
    const busqueda = (req.query.busqueda || '').trim();
    const desde    = (pagina - 1) * limite;

    let query = supabase
      .from('programas')
      .select('*, instituciones(nombre)', { count: 'exact' })
      .order('nombre')
      .range(desde, desde + limite - 1);

    if (busqueda) query = query.ilike('nombre', `%${busqueda}%`);

    const { data, count, error } = await query;
    if (error) throw error;

    const programas = (data || []).map(p => ({ ...p, institucion_nombre: p.instituciones?.nombre || '—' }));
    return res.json({ success: true, data: programas, meta: { total: count ?? 0, pagina, limite, totalPaginas: Math.ceil((count ?? 0) / limite) } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createPrograma = async (req, res) => {
  try {
    const { nombre, tipo, area_academica, duracion, modalidad, descripcion, requisitos, costo_matricula, institucion_id, activo = true } = req.body;
    if (!nombre) return res.status(400).json({ success: false, message: 'El nombre es obligatorio' });

    const { data, error } = await supabase
      .from('programas')
      .insert([{ nombre, tipo, area_academica, duracion, modalidad, descripcion, requisitos, costo_matricula: costo_matricula || null, institucion_id: institucion_id || null, activo }])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updatePrograma = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, area_academica, duracion, modalidad, descripcion, requisitos, costo_matricula, institucion_id, activo } = req.body;

    const { error } = await supabase
      .from('programas')
      .update({ nombre, tipo, area_academica, duracion, modalidad, descripcion, requisitos, costo_matricula: costo_matricula || null, institucion_id: institucion_id || null, activo })
      .eq('id', id);

    if (error) throw error;
    return res.json({ success: true, message: 'Programa actualizado' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deletePrograma = async (req, res) => {
  try {
    const { error } = await supabase.from('programas').delete().eq('id', req.params.id);
    if (error) throw error;
    return res.json({ success: true, message: 'Programa eliminado' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// CUESTIONARIOS
// ─────────────────────────────────────────────────────────────────────────────
const getCuestionarios = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cuestionarios')
      .select('*, preguntas(count)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const result = (data || []).map(c => ({ ...c, num_preguntas: c.preguntas?.[0]?.count ?? 0 }));
    return res.json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createCuestionario = async (req, res) => {
  try {
    const { nombre, version, descripcion, activo = false } = req.body;
    if (!nombre || !version) return res.status(400).json({ success: false, message: 'Nombre y versión son obligatorios' });

    const { data, error } = await supabase
      .from('cuestionarios')
      .insert([{ nombre, version, descripcion, activo }])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateCuestionario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, version, descripcion, activo } = req.body;

    // Si se activa este cuestionario, desactivar los demás
    if (activo === true) {
      await supabase.from('cuestionarios').update({ activo: false }).neq('id', id);
    }

    const { error } = await supabase
      .from('cuestionarios')
      .update({ nombre, version, descripcion, activo })
      .eq('id', id);

    if (error) throw error;
    return res.json({ success: true, message: 'Cuestionario actualizado' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteCuestionario = async (req, res) => {
  try {
    const { error } = await supabase.from('cuestionarios').delete().eq('id', req.params.id);
    if (error) throw error;
    return res.json({ success: true, message: 'Cuestionario eliminado' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PREGUNTAS
// ─────────────────────────────────────────────────────────────────────────────
const getPreguntas = async (req, res) => {
  try {
    const cuestionarioId = req.query.cuestionario_id || '';
    const busqueda       = (req.query.busqueda || '').trim();

    let query = supabase
      .from('preguntas')
      .select('*')
      .order('orden');

    if (cuestionarioId) query = query.eq('cuestionario_id', cuestionarioId);
    if (busqueda)       query = query.ilike('texto', `%${busqueda}%`);

    const { data, error } = await query;
    if (error) throw error;
    return res.json({ success: true, data: data || [] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createPregunta = async (req, res) => {
  try {
    const { cuestionario_id, texto, tipo, orden, categoria, peso, opciones } = req.body;
    if (!cuestionario_id || !texto || !tipo) {
      return res.status(400).json({ success: false, message: 'cuestionario_id, texto y tipo son obligatorios' });
    }

    const { data, error } = await supabase
      .from('preguntas')
      .insert([{ cuestionario_id, texto, tipo, orden: orden || 1, categoria, peso: peso || 1.0, opciones: opciones || [] }])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updatePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { texto, tipo, orden, categoria, peso, opciones } = req.body;

    const { error } = await supabase
      .from('preguntas')
      .update({ texto, tipo, orden, categoria, peso, opciones })
      .eq('id', id);

    if (error) throw error;
    return res.json({ success: true, message: 'Pregunta actualizada' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deletePregunta = async (req, res) => {
  try {
    const { error } = await supabase.from('preguntas').delete().eq('id', req.params.id);
    if (error) throw error;
    return res.json({ success: true, message: 'Pregunta eliminada' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/admin/contactos  — lista paginada con filtro por estado
// ─────────────────────────────────────────────────────────────────────────────
const getContactos = async (req, res) => {
  try {
    const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
    const limite = Math.min(50, parseInt(req.query.limite) || 20);
    const estado = (req.query.estado || '').trim();
    const desde  = (pagina - 1) * limite;
    const hasta  = pagina * limite - 1;

    let query = supabase
      .from('contactos')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(desde, hasta);

    if (estado) query = query.eq('estado', estado);

    const { data, count, error } = await query;
    if (error) throw error;

    return res.json({
      success: true,
      data,
      meta: { total: count, pagina, limite, totalPaginas: Math.ceil(count / limite) },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// PATCH /api/admin/contactos/:id  — actualiza estado y/o notas del admin
// ─────────────────────────────────────────────────────────────────────────────
const updateContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notas_admin } = req.body;

    const updates = {};
    if (estado)                    updates.estado      = estado;
    if (notas_admin !== undefined) updates.notas_admin = notas_admin;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'Nada que actualizar.' });
    }

    const { error } = await supabase.from('contactos').update(updates).eq('id', id);
    if (error) throw error;

    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario, getStats,
  getInstituciones, createInstitucion, updateInstitucion, deleteInstitucion,
  getProgramas, createPrograma, updatePrograma, deletePrograma,
  getCuestionarios, createCuestionario, updateCuestionario, deleteCuestionario,
  getPreguntas, createPregunta, updatePregunta, deletePregunta,
  getContactos, updateContacto,
};
