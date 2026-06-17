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
      ciudad, nivel_educativo, grado, edad, telefono,
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
      .insert([{ user_id: userId, nombre, apellido, ciudad, nivel_educativo, grado, edad, telefono }]);

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
    const { nombre, apellido, ciudad, nivel_educativo, grado, edad, telefono, rol } = req.body;

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
      .update({ nombre, apellido, ciudad, nivel_educativo, grado, edad, telefono })
      .eq('id', id);

    if (updateError) {
      return res.status(500).json({ success: false, message: updateError.message });
    }

    // Actualizar rol en perfiles si se proporcionó
    if (rol) {
      const { error: rolError } = await supabase
        .from('perfiles')
        .update({ rol })
        .eq('id', perfil.user_id);

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

module.exports = {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getStats,
};
