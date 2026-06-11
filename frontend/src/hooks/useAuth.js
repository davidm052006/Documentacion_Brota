import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFields } from '../utils/validation';
import * as realAuth from '../services/authService';
import * as demoAuth from '../services/authServiceDemo';

export const useAuth = (isDemoMode = false) => {
  const navigate = useNavigate();
  const auth = isDemoMode ? demoAuth : realAuth;

  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
    setValidationErrors({});
  };

  const clearFieldError = (field) =>
    setValidationErrors((prev) => ({ ...prev, [field]: '' }));

  const changeMode = (nextMode) => {
    clearMessages();
    setMode(nextMode);
  };

  const fieldHandlers = {
    onNombreChange:          (e) => { setNombre(e.target.value);          clearFieldError('nombre'); },
    onApellidoChange:        (e) => { setApellido(e.target.value);        clearFieldError('apellido'); },
    onEmailChange:           (e) => { setEmail(e.target.value);           clearFieldError('email'); },
    onPasswordChange:        (e) => { setPassword(e.target.value);        clearFieldError('password'); },
    onConfirmPasswordChange: (e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); },
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();
    const errors = validateFields({ email, password }, mode);
    if (Object.keys(errors).length > 0) { setValidationErrors(errors); return; }
    setLoading(true);
    try {
      const { success, error: authError } = await auth.loginWithEmail(email, password);
      if (!success) setError(authError);
      else navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    clearMessages();
    const errors = validateFields({ email, password, nombre, apellido, confirmPassword }, mode);
    if (Object.keys(errors).length > 0) { setValidationErrors(errors); return; }
    setLoading(true);
    try {
      const { success, error: authError } = await auth.signUpWithEmail(email, password, nombre, apellido);
      if (!success) setError(authError);
      else navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    clearMessages();
    const errors = validateFields({ email }, 'forgotPassword');
    if (Object.keys(errors).length > 0) { setValidationErrors(errors); return; }
    setLoading(true);
    try {
      const { success, error: authError } = await auth.sendPasswordReset(email);
      if (!success) setError(authError);
      else setSuccessMessage('Revisa tu correo para restablecer tu contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return {
    mode, email, password, confirmPassword, nombre, apellido,
    loading, error, successMessage, validationErrors,
    ...fieldHandlers,
    handleLogin, handleSignup, handlePasswordRecovery,
    changeMode,
  };
};