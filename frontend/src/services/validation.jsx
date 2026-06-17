// ============================================================
// validation.js
// Utilidades de validación reutilizables para formularios.
//
// RESPONSABILIDAD: Solo valida datos. No sabe nada de React,
// Supabase ni de la UI. Funciones puras: mismo input → mismo output.
//
// USADO EN: useAuth.js (hook del formulario de autenticación)
// EQUIPO: si agregan nuevos formularios (perfil, convocatorias, etc.)
//         importen estas funciones en lugar de duplicarlas.
// ============================================================

/**
 * Verifica que una cadena tenga formato de correo válido.
 * Ejemplo válido:   "juan@gmail.com"
 * Ejemplo inválido: "juan@", "juan.com", ""
 *
 * @param {string} value - El correo a validar
 * @returns {boolean}
 */
export const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Verifica que la contraseña tenga al menos 6 caracteres.
 * Supabase Auth rechaza contraseñas más cortas por defecto.
 *
 * @param {string} value - La contraseña a validar
 * @returns {boolean}
 */
export const isValidPassword = (value) => value.length >= 6;

/**
 * Valida todos los campos del formulario según el modo activo.
 *
 * IMPORTANTE: recibe `mode` como parámetro en lugar de tomarlo
 * del closure del componente. Esto la hace independiente del
 * estado de React y fácil de testear de forma aislada.
 *
 * Modos posibles:
 *   'login'          → valida email + password
 *   'signup'         → valida email + password + nombre + apellido + confirmPassword
 *   'forgotPassword' → valida solo email
 *
 * @param {Object} fields             - Valores actuales del formulario
 * @param {string} fields.email
 * @param {string} [fields.password]
 * @param {string} [fields.nombre]
 * @param {string} [fields.apellido]
 * @param {string} [fields.confirmPassword]
 * @param {'login'|'signup'|'forgotPassword'} mode
 * @returns {Object} Objeto con errores { campo: 'mensaje' }.
 *                   Vacío si todo está bien.
 */
export const validateFields = (fields, mode) => {
  const { email, password, nombre, apellido, confirmPassword } = fields;
  const errors = {};

  // -- Validaciones comunes a login y signup --
  if (mode !== 'forgotPassword') {
    if (!email) errors.email = 'El correo es requerido';
    else if (!isValidEmail(email)) errors.email = 'Correo inválido';

    if (!password) errors.password = 'La contraseña es requerida';
    else if (!isValidPassword(password)) errors.password = 'Mínimo 6 caracteres';
  }

  // -- Validaciones exclusivas de recuperación de contraseña --
  if (mode === 'forgotPassword') {
    if (!email) errors.email = 'El correo es requerido';
    else if (!isValidEmail(email)) errors.email = 'Correo inválido';
  }

  // -- Validaciones exclusivas de registro --
  if (mode === 'signup') {
    if (!nombre) errors.nombre = 'El nombre es requerido';
    if (!apellido) errors.apellido = 'El apellido es requerido';
    if (!confirmPassword) errors.confirmPassword = 'Confirma tu contraseña';
    else if (password !== confirmPassword)
      errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};