import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDarkMode } from '../../hooks/useDarkMode';
import LoginCard from './components/LoginCard';
import SignupCard from './components/SignupCard';
import ForgotPasswordCard from './components/ForgotPasswordCard';

// ─── Hero izquierdo por modo ──────────────────────────────────────────────────

function LoginHero() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2.5 mb-8">
        <img src="/logo-brota.png" alt="Brota" className="h-10 w-auto" />
        <span className="text-2xl font-bold text-green-800 dark:text-green-300 tracking-tight">BROTA</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-snug mb-4">
        Tu camino sigue justo<br />donde lo dejaste.
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-sm">
        Vuelve a explorar profesiones, retomar tu test y descubrir lo que sigue para tu futuro.
      </p>
    </div>
  );
}

function SignupHero() {
  const FEATURES = [
    { icon: '✅', text: 'Test vocacional 100% gratuito' },
    { icon: '🎯', text: '7.000+ programas disponibles' },
    { icon: '🔒', text: 'Tus datos siempre protegidos' },
  ];

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2.5 mb-8">
        <img src="/logo-brota.png" alt="Brota" className="h-10 w-auto" />
        <span className="text-2xl font-bold text-green-800 dark:text-green-300 tracking-tight">BROTA</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-snug mb-3">
        Crea tu cuenta y empieza a{' '}
        <span className="text-green-600 dark:text-green-400">crecer.</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
        Orientación vocacional pensada para ti, desde grado 9° hasta la especialización profesional.
      </p>
      <ul className="flex flex-col gap-3">
        {FEATURES.map(({ icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-lg">{icon}</span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ForgotHero() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2.5 mb-8">
        <img src="/logo-brota.png" alt="Brota" className="h-10 w-auto" />
        <span className="text-2xl font-bold text-green-800 dark:text-green-300 tracking-tight">BROTA</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-snug mb-4">
        Recupera el acceso<br />a tu cuenta.
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-sm">
        Te enviaremos un correo con las instrucciones para restablecer tu contraseña.
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

function Login() {
  const navigate = useNavigate();
  const [dark, toggleDark] = useDarkMode();

  const {
    mode, email, password, confirmPassword,
    primerNombre, segundoNombre, primerApellido, segundoApellido,
    nivelEducativo, grado, edad, ciudad, telefono, termsAccepted,
    loading, error, successMessage, validationErrors,
    onPrimerNombreChange, onSegundoNombreChange,
    onPrimerApellidoChange, onSegundoApellidoChange,
    onEmailChange,
    onPasswordChange, onConfirmPasswordChange,
    onNivelEducativoChange, onGradoChange, onEdadChange,
    onCiudadChange, onTelefonoChange, onTermsAcceptedChange,
    handleLogin, handleSignup, handlePasswordRecovery,
    changeMode,
  } = useAuth();

  const heroMap = {
    login:          <LoginHero />,
    signup:         <SignupHero />,
    forgotPassword: <ForgotHero />,
  };

  const cardMap = {
    signup: (
      <SignupCard
        primerNombre={primerNombre}
        segundoNombre={segundoNombre}
        primerApellido={primerApellido}
        segundoApellido={segundoApellido}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        nivelEducativo={nivelEducativo}
        grado={grado}
        edad={edad}
        ciudad={ciudad}
        telefono={telefono}
        termsAccepted={termsAccepted}
        onTermsAcceptedChange={onTermsAcceptedChange}
        validationErrors={validationErrors}
        error={error}
        loading={loading}
        onPrimerNombreChange={onPrimerNombreChange}
        onSegundoNombreChange={onSegundoNombreChange}
        onPrimerApellidoChange={onPrimerApellidoChange}
        onSegundoApellidoChange={onSegundoApellidoChange}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onConfirmPasswordChange={onConfirmPasswordChange}
        onNivelEducativoChange={onNivelEducativoChange}
        onGradoChange={onGradoChange}
        onEdadChange={onEdadChange}
        onCiudadChange={onCiudadChange}
        onTelefonoChange={onTelefonoChange}
        termsAccepted={termsAccepted}
        onTermsAcceptedChange={onTermsAcceptedChange}
        onSubmit={handleSignup}
        onSwitchToLogin={() => changeMode('login')}
      />
    ),
    forgotPassword: (
      <ForgotPasswordCard
        email={email}
        validationErrors={validationErrors}
        error={error}
        successMessage={successMessage}
        loading={loading}
        onEmailChange={onEmailChange}
        onSubmit={handlePasswordRecovery}
        onSwitchToLogin={() => changeMode('login')}
      />
    ),
    login: (
      <LoginCard
        email={email}
        password={password}
        validationErrors={validationErrors}
        error={error}
        loading={loading}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
        onSubmit={handleLogin}
        onSwitchToSignup={() => changeMode('signup')}
        onSwitchToForgotPassword={() => changeMode('forgotPassword')}
      />
    ),
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2efea] dark:bg-[#0d110e]">

      {/* ── Toggle dark mode flotante ── */}
      <button
        onClick={toggleDark}
        title={dark ? 'Modo claro' : 'Modo oscuro'}
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 dark:bg-[#1a1d24] border border-gray-200 dark:border-[#2c3140] shadow-sm hover:shadow-md backdrop-blur-sm text-sm transition-all"
      >
        {dark ? '☀️' : '🌙'}
      </button>

      {/* ── Contenido principal ── */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-20">

          {/* Columna izquierda: hero */}
          <div className="flex-1 min-w-0">
            {heroMap[mode] ?? heroMap.login}
          </div>

          {/* Columna derecha: formulario */}
          <div className="w-full md:w-[420px] shrink-0">
            {cardMap[mode] ?? cardMap.login}
          </div>

        </div>
      </main>

      {/* ── Footer bar ── */}
      <footer className="border-t border-gray-200 dark:border-[#1a2420] bg-white/50 dark:bg-[#0a0e0b]/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src="/logo-brota.png" alt="Brota" className="h-5 w-auto opacity-70" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-400">BROTA</span>
            <span className="text-gray-300 dark:text-gray-600 text-xs hidden sm:inline">·</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">Orientación vocacional para tu futuro</span>
          </div>

          <nav className="flex items-center gap-5 text-xs text-gray-500 dark:text-gray-500">
            <Link to="/" className="hover:text-green-600 transition-colors">Inicio</Link>
            <Link to="/contacto" className="hover:text-green-600 transition-colors">Contacto</Link>
            <Link to="/privacidad" className="hover:text-green-600 transition-colors">Privacidad</Link>
            <Link to="/terminos" className="hover:text-green-600 transition-colors">Términos</Link>
          </nav>
        </div>
      </footer>

    </div>
  );
}

export default Login;
