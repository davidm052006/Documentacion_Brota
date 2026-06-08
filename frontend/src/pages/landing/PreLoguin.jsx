// ==========================================
// PRELOGUIN.JSX - PÁGINA DE AUTENTICACIÓN
// ==========================================
// Esta página maneja LOGIN, REGISTRO y RECUPERACIÓN de contraseña.
// Separamos cada tarjeta en un componente independiente para mantener el archivo ordenado.

import { useState } from 'react';
import { supabase } from '../../config/supabase';
import PreLoginNavbar from './components/PreLoginNavbar';
import LoginCard from './components/LoginCard';
import SignupCard from './components/SignupCard';
import ForgotPasswordCard from './components/ForgotPasswordCard';

function PreLoguin({ isDemoMode = false }) {
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

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value) => value.length >= 6;

  const validateFields = () => {
    const errors = {};

    if (!email) errors.email = 'El correo es requerido';
    else if (!isValidEmail(email)) errors.email = 'Correo inválido';

    if (!password) errors.password = 'La contraseña es requerida';
    else if (!isValidPassword(password)) errors.password = 'Mínimo 6 caracteres';

    if (mode === 'signup') {
      if (!nombre) errors.nombre = 'El nombre es requerido';
      if (!apellido) errors.apellido = 'El apellido es requerido';
      if (!confirmPassword) errors.confirmPassword = 'Confirma tu contraseña';
      else if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      if (isDemoMode) {
        console.log('📱 MODO DEMO: Simulando login con', email);
        localStorage.setItem('demoModeLoggedIn', 'true');
        localStorage.setItem('demoUserEmail', email);
        localStorage.setItem('demoUserName', 'Juan Demo');
        setTimeout(() => {
          setLoading(false);
          window.location.href = '/dashboard';
        }, 1500);
        return;
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
      } else {
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      }
    } catch (err) {
      console.error('Error en login:', err);
      setError('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    clearMessages();

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setLoading(true);
    try {
      if (isDemoMode) {
        console.log('📱 MODO DEMO: Simulando registro de', nombre, apellido);
        localStorage.setItem('demoModeLoggedIn', 'true');
        localStorage.setItem('demoUserEmail', email);
        localStorage.setItem('demoUserName', nombre + ' ' + apellido);
        setTimeout(() => {
          setLoading(false);
          window.location.href = '/dashboard';
        }, 1500);
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      const { error: profileError } = await supabase.from('PERFILES_USUARIO').insert([
        {
          user_id: authData.user.id,
          nombre,
          apellido,
        },
      ]);

      if (profileError) {
        setError('Error al crear tu perfil: ' + profileError.message);
      } else {
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      }
    } catch (err) {
      console.error('Error en signup:', err);
      setError('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!email) {
      setValidationErrors({ email: 'El correo es requerido' });
      return;
    }

    if (!isValidEmail(email)) {
      setValidationErrors({ email: 'Correo inválido' });
      return;
    }

    setLoading(true);
    try {
      if (isDemoMode) {
        setSuccessMessage('Se ha enviado un correo de recuperación simulado.');
        return;
      }

      if (typeof supabase.auth.resetPasswordForEmail === 'function') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
        if (resetError) {
          setError(resetError.message);
        } else {
          setSuccessMessage('Revisa tu correo para restablecer tu contraseña.');
        }
      } else {
        setError('Funcionalidad de recuperación no disponible.');
      }
    } catch (err) {
      console.error('Error en recuperación de contraseña:', err);
      setError('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (nextMode) => {
    clearMessages();
    setMode(nextMode);
  };

  const authCard = () => {
    switch (mode) {
      case 'signup':
        return (
          <SignupCard
            nombre={nombre}
            apellido={apellido}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            validationErrors={validationErrors}
            error={error}
            loading={loading}
            onNombreChange={(e) => {
              setNombre(e.target.value);
              setValidationErrors({ ...validationErrors, nombre: '' });
            }}
            onApellidoChange={(e) => {
              setApellido(e.target.value);
              setValidationErrors({ ...validationErrors, apellido: '' });
            }}
            onEmailChange={(e) => {
              setEmail(e.target.value);
              setValidationErrors({ ...validationErrors, email: '' });
            }}
            onPasswordChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors({ ...validationErrors, password: '' });
            }}
            onConfirmPasswordChange={(e) => {
              setConfirmPassword(e.target.value);
              setValidationErrors({ ...validationErrors, confirmPassword: '' });
            }}
            onSubmit={handleSignup}
            onSwitchToLogin={() => changeMode('login')}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordCard
            email={email}
            validationErrors={validationErrors}
            error={error}
            successMessage={successMessage}
            loading={loading}
            onEmailChange={(e) => {
              setEmail(e.target.value);
              setValidationErrors({ ...validationErrors, email: '' });
            }}
            onSubmit={handlePasswordRecovery}
            onSwitchToLogin={() => changeMode('login')}
          />
        );
      default:
        return (
          <LoginCard
            email={email}
            password={password}
            validationErrors={validationErrors}
            error={error}
            loading={loading}
            onEmailChange={(e) => {
              setEmail(e.target.value);
              setValidationErrors({ ...validationErrors, email: '' });
            }}
            onPasswordChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors({ ...validationErrors, password: '' });
            }}
            onSubmit={handleLogin}
            onSwitchToSignup={() => changeMode('signup')}
            onSwitchToForgotPassword={() => changeMode('forgotPassword')}
          />
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative">
      <PreLoginNavbar />

      <div className="flex w-full pt-24 pb-12 px-20">
        <div className="w-1/2 flex flex-col justify-center pr-10">
          <h1 className="text-green-600 mb-4 text-6xl font-bold tracking-tight">🌱 BROTA</h1>
          <h2 className="text-3xl font-medium text-black mb-10 leading-snug">
            Potenciando el crecimiento digital <br /> de tu negocio desde la raíz.
          </h2>

          <div className="flex gap-4">
            <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[0_4px_6px_-1px_rgba(43,207,43,0.3)] hover:shadow-[0_6px_8px_-1px_rgba(43,207,43,0.4)] transition-all duration-200">
              Nuestros Servicios
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold rounded-[var(--radius-md)] bg-transparent text-black border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-all duration-200">
              Saber más
            </button>
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">{authCard()}</div>
      </div>
    </div>
  );
}

export default PreLoguin;
