const supabase = require('../config/supabase');

const ASUNTOS_VALIDOS = [
  'Información general',
  'Soporte técnico',
  'Consulta sobre resultados',
  'Alianzas institucionales',
  'Otro',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const crearContacto = async (req, res) => {
  try {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    if (!nombre?.trim() || !email?.trim() || !asunto?.trim() || !mensaje?.trim()) {
      return res.status(400).json({ success: false, message: 'Campos requeridos incompletos.' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ success: false, message: 'Correo electrónico inválido.' });
    }

    if (!ASUNTOS_VALIDOS.includes(asunto)) {
      return res.status(400).json({ success: false, message: 'Asunto inválido.' });
    }

    const { error } = await supabase.from('contactos').insert({
      nombre:   nombre.trim().substring(0, 200),
      email:    email.trim().toLowerCase().substring(0, 200),
      telefono: telefono?.trim().substring(0, 50) || null,
      asunto:   asunto.trim(),
      mensaje:  mensaje.trim().substring(0, 2000),
    });

    if (error) throw error;

    return res.json({ success: true, message: 'Solicitud enviada correctamente.' });
  } catch (err) {
    console.error('contactoController.crearContacto:', err);
    return res.status(500).json({ success: false, message: 'Error al procesar la solicitud.' });
  }
};

module.exports = { crearContacto };
