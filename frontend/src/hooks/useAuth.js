// ============================================================
// useAuth.js
// Custom hook que centraliza toda la lógica del formulario
// de autenticación (login, registro, recuperación de contraseña).
//
// RESPONSABILIDAD: maneja el estado del formulario (campos,
// errores, loading) y los handlers de submit. No sabe nada
// de cómo se ve la UI — eso es responsabilidad de PreLogin.jsx.
//
// FLUJO DE DATOS:
//   Usuario escribe → fieldHandlers actualizan estado
//   Usuario envía   → handleLogin / handleSignup / handlePasswordRecovery
//                      → validateFields (utils/validation.js)
//                      → authService (services/authService.js)
//                      → navigate('/dashboard') o setError()
//
// USADO EN: PreLogin.jsx
//   const { email, handleLogin, ... } = useAuth()
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFields } from '../utils/validation';
import { loginWithEmail, signUpWithEmail, sendPasswordReset } from '../services/authService';

export const useAuth = () => {
  // useNavigate reemplaza window.location.href:
  // navega sin recargar la página (SPA) y es la forma
  // correcta en aplicaciones con React Router.
  const navigate = useNavigate();

  // ── Estado del formulario ────────────────────────────────────
  const [mode, setMode]                       = useState('login'); // 'login' | 'signup' | 'forgotPassword'
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre]                   = useState('');
  const [apellido, setApellido]               = useState('');

  // ── Estado de UI ─────────────────────────────────────────────
  const [loading, setLoading]                   = useState(false);
  const [error, setError]                       = useState(null);   // error del servidor
  const [successMessage, setSuccessMessage]     = useState(null);   // ej: "correo enviado"
  const [validationErrors, setValidationErrors] = useState({});     // errores por campo

  // ── Helpers internos ─────────────────────────────────────────

  // Limpia todos los mensajes al cambiar de modo o reintentar
  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
    setValidationErrors({});
  };

  // Limpia el error de un campo específico mientras el usuario escribe,
  // sin esperar al submit
  const clearFieldError = (field) =>
    setValidationErrors((prev) => ({ ...prev, [field]: '' }));

  const changeMode = (nextMode) => {
    clearMessages();
    setMode(nextMode);
  };

  // ── Handlers de campos ───────────────────────────────────────
  // Se pasan como props a los componentes hijos de PreLogin.jsx

  const fieldHandlers = {
    onNombreChange:          (e) => { setNombre(e.target.value);          clearFieldError('nombre'); },
    onApellidoChange:        (e) => { setApellido(e.target.value);        clearFieldError('apellido'); },
    onEmailChange:           (e) => { setEmail(e.target.value);           clearFieldError('email'); },
    onPasswordChange:        (e) => { setPassword(e.target.value);        clearFieldError('password'); },
    onConfirmPasswordChange: (e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); },
  };

  // ── Handler: Login ───────────────────────────────────────────

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();

    const errors = validateFields({ email, password }, mode);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const { success, error: authError } = await loginWithEmail(email, password);
      if (!success) setError(authError);
      else navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // ── Handler: Registro ────────────────────────────────────────

  const handleSignup = async (e) => {
    e.preventDefault();
    clearMessages();

    const errors = validateFields({ email, password, nombre, apellido, confirmPassword }, mode);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      // signUpWithEmail hace dos operaciones encadenadas:
      //   1. supabase.auth.signUp       → crea usuario en auth.users
      //   2. INSERT en perfiles_usuario → guarda nombre y apellido
      // Si la segunda falla, hace rollback de la primera.
      // Ver authService.js para el detalle.
      const { success, error: authError } = await signUpWithEmail(
        email, password, nombre, apellido
      );
      if (!success) setError(authError);
      else navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // ── Handler: Recuperación de contraseña ──────────────────────

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    clearMessages();

    // Solo valida el email — forgotPassword no necesita contraseña
    const errors = validateFields({ email }, 'forgotPassword');
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      const { success, error: authError } = await sendPasswordReset(email);
      if (!success) setError(authError);
      else setSuccessMessage('Revisa tu correo para restablecer tu contraseña.');
    } finally {
      setLoading(false);
    }
  };

  // ── Valor expuesto por el hook ────────────────────────────────

  return {
    mode, email, password, confirmPassword, nombre, apellido,
    loading, error, successMessage, validationErrors,
    ...fieldHandlers,
    handleLogin, handleSignup, handlePasswordRecovery,
    changeMode,
  };
};