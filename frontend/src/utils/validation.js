export const isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isValidPassword = (value) => value.length >= 6;

export const validateFields = (fields, mode) => {
  const { email, password, nombre, apellido, confirmPassword } = fields;
  const errors = {};

  if (mode !== 'forgotPassword') {
    if (!email) errors.email = 'El correo es requerido';
    else if (!isValidEmail(email)) errors.email = 'Correo inválido';

    if (!password) errors.password = 'La contraseña es requerida';
    else if (!isValidPassword(password)) errors.password = 'Mínimo 6 caracteres';
  }

  if (mode === 'forgotPassword') {
    if (!email) errors.email = 'El correo es requerido';
    else if (!isValidEmail(email)) errors.email = 'Correo inválido';
  }

  if (mode === 'signup') {
    if (!nombre) errors.nombre = 'El nombre es requerido';
    if (!apellido) errors.apellido = 'El apellido es requerido';
    if (!confirmPassword) errors.confirmPassword = 'Confirma tu contraseña';
    else if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};