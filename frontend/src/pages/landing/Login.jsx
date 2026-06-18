// src/pages/landing/Login.jsx
import { useNavigate } from 'react-router-dom';   // ← NUEVO
import LoginNavbar from './components/LoginNavbar';
import LoginCard from './components/LoginCard';
import SignupCard from './components/SignupCard';
import ForgotPasswordCard from './components/ForgotPasswordCard';
import Footer from './components/Footer';
import { useAuth } from '../../hooks/useAuth';
import { useDarkMode } from '../../hooks/useDarkMode';

function Login() {
  const navigate = useNavigate();   // ← NUEVO
  const [dark, toggleDark] = useDarkMode();

  const {
    mode, email, password, confirmPassword,
    primerNombre, segundoNombre, primerApellido, segundoApellido,
    nivelEducativo, grado, edad, ciudad, telefono,
    loading, error, successMessage, validationErrors,
    onPrimerNombreChange, onSegundoNombreChange,
    onPrimerApellidoChange, onSegundoApellidoChange,
    onEmailChange,
    onPasswordChange, onConfirmPasswordChange,
    onNivelEducativoChange, onGradoChange, onEdadChange,
    onCiudadChange, onTelefonoChange,
    handleLogin, handleSignup, handlePasswordRecovery,
    changeMode,
  } = useAuth();

  const renderAuthCard = () => {
    switch (mode) {
      case 'signup':
        return (
          <SignupCard
            primerNombre={primerNombre}
            segundoNombre={segundoNombre}
            primerApellido={primerApellido}
            segundoApellido={segundoApellido}
            email={email} password={password} confirmPassword={confirmPassword}
            nivelEducativo={nivelEducativo} grado={grado} edad={edad}
            ciudad={ciudad} telefono={telefono}
            validationErrors={validationErrors} error={error} loading={loading}
            onPrimerNombreChange={onPrimerNombreChange}
            onSegundoNombreChange={onSegundoNombreChange}
            onPrimerApellidoChange={onPrimerApellidoChange}
            onSegundoApellidoChange={onSegundoApellidoChange}
            onEmailChange={onEmailChange} onPasswordChange={onPasswordChange}
            onConfirmPasswordChange={onConfirmPasswordChange}
            onNivelEducativoChange={onNivelEducativoChange}
            onGradoChange={onGradoChange} onEdadChange={onEdadChange}
            onCiudadChange={onCiudadChange} onTelefonoChange={onTelefonoChange}
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
    <div className="flex flex-col w-full min-h-screen">

      <button
        onClick={toggleDark}
        title={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-[#1a1d24] border border-gray-200 dark:border-[#2c3140] shadow-sm hover:shadow-md text-base transition-all backdrop-blur-sm"
      >
        {dark ? '☀️' : '🌙'}
      </button>

      {/* ── Sección principal con fondo ── */}
      <div className="flex flex-col flex-1 bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative dark:bg-none dark:bg-[#111318]">
        <LoginNavbar />
        <div className="flex w-full pt-24 pb-12 px-20 flex-1">

          {/* Columna izquierda: hero text */}
          <div className="w-1/2 flex flex-col justify-center pr-10">
            <h1 className="text-green-600 mb-4 text-6xl font-bold tracking-tight dark:text-green-400">🌱 BROTA</h1>
            <h2 className="text-3xl font-medium text-black dark:text-white mb-10 leading-snug">
              Potenciando el crecimiento digital <br /> de tu negocio desde la raíz.
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/servicios')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[0_4px_6px_-1px_rgba(43,207,43,0.3)] hover:shadow-[0_6px_8px_-1px_rgba(43,207,43,0.4)] transition-all duration-200"
              >
                Nuestros Servicios
              </button>
              <button
                onClick={() => navigate('/saber-mas')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold rounded-[var(--radius-md)] bg-transparent text-black dark:text-white border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black transition-all duration-200"
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

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}

export default Login;
