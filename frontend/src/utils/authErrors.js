const AUTH_ERRORS = {
  'invalid login credentials': 'Correo o contraseña incorrectos.',
  'invalid credential': 'Correo o contraseña incorrectos.',
  'email not confirmed': 'Debes confirmar tu correo antes de iniciar sesión.',
  'user already registered': 'Este correo ya está registrado. Intenta iniciar sesión.',
  'user not found': 'No encontramos una cuenta con ese correo.',
  'password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
  'weak password': 'La contraseña es demasiado débil. Usa al menos 6 caracteres.',
  'email address is invalid': 'El correo ingresado no es válido.',
  'email already in use': 'Este correo ya está en uso.',
  'too many requests': 'Demasiados intentos. Espera unos minutos antes de intentarlo de nuevo.',
  'rate limit': 'Demasiados intentos. Espera unos minutos.',
  'network error': 'Error de conexión. Revisa tu internet e intenta de nuevo.',
  'fetch failed': 'No se pudo conectar al servidor. Revisa tu internet.',
  'jwt expired': 'Tu sesión expiró. Inicia sesión de nuevo.',
  'token expired': 'Tu sesión expiró. Inicia sesión de nuevo.',
};

export const translateAuthError = (originalMessage) => {
  if (!originalMessage) return 'Ocurrió un error. Intenta nuevamente.';
  const lower = originalMessage.toLowerCase();
  for (const [key, translation] of Object.entries(AUTH_ERRORS)) {
    if (lower.includes(key)) return translation;
  }
  return 'Ocurrió un error. Intenta nuevamente.';
};
