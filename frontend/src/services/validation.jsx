// validation.js
// Utilidades de validación reutilizables para formularios.


export const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isValidPassword = (value) => value.length >= 6;

export const validateFields = (fields, mode) => {
  const { email, password, nombre, apellido, confirmPassword,
          nivelEducativo, grado, edad, ciudad, telefono } = fields;
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
    if (!nombre)          errors.nombre          = 'El nombre es requerido';
    if (!apellido)        errors.apellido        = 'El apellido es requerido';
    if (!confirmPassword) errors.confirmPassword = 'Confirma tu contraseña';
    else if (password !== confirmPassword)
      errors.confirmPassword = 'Las contraseñas no coinciden';

    if (!nivelEducativo)  errors.nivelEducativo  = 'El nivel educativo es requerido';
    if (!grado)           errors.grado           = 'El grado es requerido';
    if (!edad)            errors.edad            = 'La fecha de nacimiento es requerida';
    if (!ciudad)          errors.ciudad          = 'La ciudad es requerida';
    if (!telefono)        errors.telefono        = 'El número de teléfono es requerido';
  }

  return errors;
};