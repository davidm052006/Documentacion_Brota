// src/pages/landing/Login.jsx
import { useNavigate } from 'react-router-dom';   // ← NUEVO
import LoginNavbar from './components/LoginNavbar';
import LoginCard from './components/LoginCard';
import SignupCard from './components/SignupCard';
import ForgotPasswordCard from './components/ForgotPasswordCard';
import { useAuth } from '../../hooks/useAuth';

function Login() {
  const navigate = useNavigate();   // ← NUEVO
  const {
    mode, email, password, confirmPassword, nombre, apellido,
    loading, error, successMessage, validationErrors,
    onNombreChange, onApellidoChange, onEmailChange,
    onPasswordChange, onConfirmPasswordChange,
    handleLogin, handleSignup, handlePasswordRecovery,
    changeMode,
  } = useAuth();

  const renderAuthCard = () => {
    switch (mode) {
      case 'signup':
        return (
          <SignupCard
            nombre={nombre} apellido={apellido}
            email={email} password={password} confirmPassword={confirmPassword}
            validationErrors={validationErrors} error={error} loading={loading}
            onNombreChange={onNombreChange} onApellidoChange={onApellidoChange}
            onEmailChange={onEmailChange} onPasswordChange={onPasswordChange}
            onConfirmPasswordChange={onConfirmPasswordChange}
            onSubmit={handleSignup}
            onSwitchToLogin={() => changeMode('login')}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordCard
            email={email} validationErrors={validationErrors}
            error={error} successMessage={successMessage} loading={loading}
            onEmailChange={onEmailChange}
            onSubmit={handlePasswordRecovery}
            onSwitchToLogin={() => changeMode('login')}
          />
        );
      default:
        return (
          <LoginCard
            email={email} password={password}
            validationErrors={validationErrors} error={error} loading={loading}
            onEmailChange={onEmailChange} onPasswordChange={onPasswordChange}
            onSubmit={handleLogin}
            onSwitchToSignup={() => changeMode('signup')}
            onSwitchToForgotPassword={() => changeMode('forgotPassword')}
          />
        );
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative">
      <LoginNavbar />
      <div className="flex w-full pt-24 pb-12 px-20">

        {/* Columna izquierda: hero text */}
        <div className="w-1/2 flex flex-col justify-center pr-10">
          <h1 className="text-green-600 mb-4 text-6xl font-bold tracking-tight">🌱 BROTA</h1>
          <h2 className="text-3xl font-medium text-black mb-10 leading-snug">
            Potenciando el crecimiento digital <br /> de tu negocio desde la raíz.
          </h2>
          <div className="flex gap-4">
            {/* ← onClick actualizado */}
            <button
              onClick={() => navigate('/servicios')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[0_4px_6px_-1px_rgba(43,207,43,0.3)] hover:shadow-[0_6px_8px_-1px_rgba(43,207,43,0.4)] transition-all duration-200"
            >
              Nuestros Servicios
            </button>
            <button
              onClick={() => navigate('/saber-mas')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold rounded-[var(--radius-md)] bg-transparent text-black border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-all duration-200"
            >
              Saber más
            </button>
          </div>
        </div>

        {/* Columna derecha: tarjeta de autenticación */}
        <div className="w-1/2 flex flex-col justify-center items-center">
          {renderAuthCard()}
        </div>

      </div>
    </div>
  );
}

export default Login;