const supabase = require('../config/supabase');

// Middleware que protege todas las rutas del panel admin.
// Verifica el JWT de Supabase y confirma que el usuario tiene rol 'admin'.
async function verificarAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token de autenticación requerido' });
  }

  // getUser con SERVICE_ROLE_KEY valida el JWT de Supabase sin tocar RLS
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
  }

  // Verifica que el usuario autenticado tenga rol admin en la tabla perfiles
  const { data: perfil, error: rolError } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('id', user.id)
    .single();

  if (rolError || perfil?.rol !== 'admin') {
    return res.status(403).json({ success: false, message: 'Acceso denegado: se requiere rol admin' });
  }

  req.user = user;
  next();
}

module.exports = verificarAdmin;
