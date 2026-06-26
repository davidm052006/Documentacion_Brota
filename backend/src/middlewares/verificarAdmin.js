const supabase = require('../config/supabase');

// Middleware que protege todas las rutas del panel admin.
// Verifica el JWT de Supabase y confirma que el usuario tiene rol 'admin'.
async function verificarAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Token de autenticación requerido' });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }

    const { data: perfil, error: rolError } = await supabase
      .from('perfiles_usuario')
      .select('rol')
      .eq('user_id', user.id)
      .single();

    if (rolError || perfil?.rol !== 'admin') {
      return res.status(403).json({ success: false, message: 'Acceso denegado: se requiere rol admin' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('verificarAdmin:', err);
    return res.status(500).json({ success: false, message: 'Error al verificar permisos' });
  }
}

module.exports = verificarAdmin;
