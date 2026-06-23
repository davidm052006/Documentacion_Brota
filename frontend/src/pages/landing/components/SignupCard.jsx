import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthCardShell from './AuthCardShell';

// ── Componente Input local ──
function Input({ placeholder, value, onChange, error, type = 'text' }) {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className={`bg-[var(--color-surface)] dark:bg-[#1a1d24] dark:text-gray-300 text-gray-700 border px-4 py-3 text-sm rounded-[var(--radius-md)]
          outline-none transition-all duration-200 w-full focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
            error ? 'border-red-500' : 'border-black dark:border-[#3a4155]'
          }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const CIUDADES_COLOMBIA = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Pereira',
  'Manizales',
  'Santa Marta',
  'Cúcuta',
  'Ibagué',
  'Villavicencio',
  'Pasto',
  'Montería',
  'Neiva',
  'Armenia',
  'Sincelejo',
  'Valledupar',
  'Popayán',
  'Tunja',
];

function CityAutocomplete({ value, onChange, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const search = value.trim().toLowerCase();
  const suggestions = search
    ? CIUDADES_COLOMBIA.filter((city) => city.toLowerCase().startsWith(search)).slice(0, 5)
    : [];

  const selectCity = (city) => {
    onChange({ target: { value: city } });
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col">
      <input
        type="text"
        placeholder="Ciudad "
        value={value}
        onChange={(e) => {
          onChange(e);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 120)}
        autoComplete="off"
        className={`bg-[var(--color-surface)] dark:bg-[#1a1d24] dark:text-gray-500 text-gray-700 border px-4 py-3 text-sm rounded-[var(--radius-md)]
          outline-none transition-all duration-200 w-full focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
            error ? 'border-red-500' : 'border-black dark:border-[#3a4155]'
          }`}
      />

      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-[var(--radius-md)] border border-black/20 dark:border-[#3a4155] bg-white dark:bg-[#1a1d24] shadow-lg">
          {suggestions.map((city) => (
            <button
              key={city}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => selectCity(city)}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-[var(--color-primary)]/10 dark:text-gray-300"
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function PasswordInput({ placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          className={`bg-[var(--color-surface)] dark:bg-[#1a1d24] dark:text-gray-300 text-gray-700 border px-4 py-3 pr-11 text-sm rounded-[var(--radius-md)]
            outline-none transition-all duration-200 w-full focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
              error ? 'border-red-500' : 'border-black dark:border-[#3a4155]'
            }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          {show ? (
            // Ojo tachado — ocultar
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.03 0 2.02.15 2.955.432M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-3.364L4.636 19.364" />
            </svg>
          ) : (
            // Ojo — mostrar
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ── Componente Button local ──
function Button({ children, variant, className, disabled, type }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-3 text-sm font-semibold rounded-[var(--radius-md)] transition-all duration-200
        ${variant === 'secondary'
          ? 'bg-[var(--color-primary)] text-white hover:opacity-90 disabled:opacity-50'
          : 'bg-gray-200 text-gray-800'}
        ${className}`}
    >
      {children}
    </button>
  );
}

function SignupCard({
  primerNombre = '', primerApellido = '',
  email = '', password = '', confirmPassword = '',
  nivelEducativo = '', grado = '', edad = '', ciudad = '', telefono = '',
  validationErrors = {}, error, loading,
  onPrimerNombreChange,
  onPrimerApellidoChange,
  onEmailChange, onPasswordChange, onConfirmPasswordChange,
  onNivelEducativoChange, onGradoChange, onEdadChange,
  onCiudadChange, onTelefonoChange,
  onSubmit, onSwitchToLogin,
}) {
  const getPasswordStrength = (pwd) => {
    if (!pwd || pwd.length === 0) return { label: '', score: 0 };
    if (pwd.length < 4)           return { label: 'Muy débil', score: 1 };
    if (pwd.length < 8)           return { label: 'Débil',     score: 2 };
    if (pwd.length < 12)          return { label: 'Media',     score: 3 };
    return                               { label: 'Fuerte',    score: 4 };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <AuthCardShell title="Crea tu cuenta" className="max-w-md w-full">

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3" autoComplete="off">

        {/* ── Nombres completos ── */}
        <Input
          placeholder="Nombres completos "
          value={primerNombre}
          onChange={onPrimerNombreChange}
          error={validationErrors.primerNombre}
        />

        {/* ── Apellidos completos ── */}
        <Input
          placeholder="Apellidos completos *"
          value={primerApellido}
          onChange={onPrimerApellidoChange}
          error={validationErrors.primerApellido}
        />

        {/* ── Email ── */}
        <Input
          placeholder="Correo electrónico "
          value={email}
          onChange={onEmailChange}
          error={validationErrors.email}
        />

        {/* ── Contraseñas ── */}
        <div className="grid grid-cols-2 gap-3">
          <PasswordInput
            placeholder="Contraseña "
            value={password}
            onChange={onPasswordChange}
            error={validationErrors.password}
          />
          <PasswordInput
            placeholder="Confirmar contraseña "
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            error={validationErrors.confirmPassword}
          />
        </div>

        {/* ── Barra fortaleza contraseña ── */}
        {password && (
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 dark:bg-[#2c3140] rounded-full h-1.5 overflow-hidden">
              <div className={`h-full transition-all duration-300 ${
                passwordStrength.label === 'Muy débil' ? 'w-1/4 bg-red-500' :
                passwordStrength.label === 'Débil'     ? 'w-2/4 bg-orange-500' :
                passwordStrength.label === 'Media'     ? 'w-3/4 bg-yellow-500' :
                'w-full bg-green-500'
              }`} />
            </div>
            <span className={`text-xs font-semibold ${
              passwordStrength.label === 'Muy débil' ? 'text-red-500' :
              passwordStrength.label === 'Débil'     ? 'text-orange-500' :
              passwordStrength.label === 'Media'     ? 'text-yellow-500' :
              'text-green-600 dark:text-green-400'
            }`}>
              {passwordStrength.label}
            </span>
          </div>
        )}

        {/* ── Nivel educativo + Grado ── */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <select
              value={nivelEducativo}
              onChange={(e) => onNivelEducativoChange(e.target.value)}
              className={`bg-[var(--color-surface)] dark:bg-[#1a1d24] dark:text-gray-700 text-gray-700 border px-4 py-3 text-sm rounded-[var(--radius-md)]
                outline-none transition-all duration-200 w-full focus:ring-2 focus:ring-[var(--color-primary)]/30 appearance-none ${
                  validationErrors.nivelEducativo
                    ? 'border-red-500'
                    : 'border-black dark:border-[#3a4155]'
                }`}
            >
              <option value="">Nivel educativo </option>
              <option value="Educacion media">Educación media</option>
              <option value="Tecnico">Técnico</option>
            </select>
            {validationErrors.nivelEducativo && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.nivelEducativo}</p>
            )}
          </div>
          <Input
            placeholder="Grado "
            value={grado}
            onChange={onGradoChange}
            error={validationErrors.grado}
          />
        </div>

        {/* ── Fecha de nacimiento + Ciudad ── */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="Fecha de nacimiento "
            type="date"
            value={edad}
            onChange={onEdadChange}
            error={validationErrors.edad}
            className="text-gray-600 dark:text-gray-300"
          />
          <CityAutocomplete
            value={ciudad}
            onChange={onCiudadChange}
            error={validationErrors.ciudad}
            className="text-gray-700 dark:text-gray-700"
          />
        </div>

        {/* ── Teléfono ── */}
        <Input
          placeholder="Número de teléfono "
          value={telefono}
          onChange={onTelefonoChange}
          error={validationErrors.telefono}
        />

        {/* ── Términos ── */}
        <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-black dark:border-[#3a4155] bg-white/70 dark:bg-[#1a1d24] px-4 py-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 shadow-sm">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)] cursor-pointer"
          />
          <p>
            Acepto los{' '}
            <a href="/terminos" target="_blank" rel="noreferrer"
              className="font-semibold text-[var(--color-primary)] underline underline-offset-4 hover:opacity-80">
              Términos y Condiciones
            </a>{' '}
            y la{' '}
            <a href="/privacidad" target="_blank" rel="noreferrer"
              className="font-semibold text-[var(--color-primary)] underline underline-offset-4 hover:opacity-80">
              Política de Privacidad
            </a>.
          </p>
        </div>

        {/* ── Botón submit ── */}
        <Button variant="secondary" className="w-full" disabled={loading} type="submit">
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>

      </form>

      <p className="text-sm text-center text-black dark:text-gray-700">
        ¿Ya tienes cuenta?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
          type="button"
        >
          Inicia sesión
        </button>
      </p>

      <p className="text-xs text-center text-gray-400 dark:text-gray-500 -mt-2">
        <Link to="/terminos" className="hover:text-[var(--color-primary)] underline underline-offset-2 transition-colors">
          Términos y condiciones
        </Link>
        {' · '}
        <Link to="/privacidad" className="hover:text-[var(--color-primary)] underline underline-offset-2 transition-colors">
          Política de privacidad
        </Link>
      </p>

    </AuthCardShell>
  );
}

export default SignupCard;
