import React from 'react';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';
import AuthCardShell from './AuthCardShell';
import { getPasswordStrength } from '../../../utils/validation';

function SignupCard({
  primerNombre,
  segundoNombre,
  primerApellido,
  segundoApellido,
  email,
  password,
  confirmPassword,
  nivelEducativo,
  grado,
  edad,
  ciudad,
  telefono,
  validationErrors,
  error,
  loading,
  onPrimerNombreChange,
  onSegundoNombreChange,
  onPrimerApellidoChange,
  onSegundoApellidoChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onNivelEducativoChange,
  onGradoChange,
  onEdadChange,
  onCiudadChange,
  onTelefonoChange,
  onSubmit,
  onSwitchToLogin,
}) {
  const passwordStrength = getPasswordStrength(password);

  return (
    <AuthCardShell title="Crea tu cuenta" className="max-w-2xl">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Primer nombre..."
            value={primerNombre}
            onChange={onPrimerNombreChange}
            error={validationErrors.primerNombre}
          />

          <Input
            placeholder="Segundo nombre..."
            value={segundoNombre}
            onChange={onSegundoNombreChange}
            error={validationErrors.segundoNombre}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Primer apellido..."
            value={primerApellido}
            onChange={onPrimerApellidoChange}
            error={validationErrors.primerApellido}
          />

          <Input
            placeholder="Segundo apellido..."
            value={segundoApellido}
            onChange={onSegundoApellidoChange}
            error={validationErrors.segundoApellido}
          />
        </div>

        <Input
          placeholder="Escribe tu correo..."
          value={email}
          onChange={onEmailChange}
          error={validationErrors.email}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Contrasena..."
            type="password"
            value={password}
            onChange={onPasswordChange}
            error={validationErrors.password}
          />

          <Input
            placeholder="Confirma tu contrasena..."
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            error={validationErrors.confirmPassword}
          />
        </div>

        {password && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Fortaleza de contrasena</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                passwordStrength === 'DÃ©bil' ? 'bg-red-100 text-red-700' :
                passwordStrength === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
              }`}>
                {passwordStrength}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className={`h-full transition-all duration-300 ${
                passwordStrength === 'DÃ©bil' ? 'w-1/3 bg-red-500' :
                passwordStrength === 'Media' ? 'w-2/3 bg-yellow-500' :
                'w-full bg-[var(--color-primary)]'
              }`} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="w-full relative">
            <select
              value={nivelEducativo}
              onChange={(e) => onNivelEducativoChange(e.target.value)}
              className={`bg-[var(--color-surface)] text-gray-400 border px-4 py-3 text-base rounded-[var(--radius-md)]
              outline-none transition-all duration-200 w-full focus:ring-3 focus:ring-[var(--color-primary)]/30 appearance-none ${
                validationErrors.nivelEducativo
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-black focus:border-black'
              }`}
            >
              <option value="" className="text-slate-400">Selecciona tu nivel educativo</option>
              <option value="Educacion media">Educacion media</option>
              <option value="Tecnico">Tecnico</option>
            </select>

            {validationErrors.nivelEducativo && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.nivelEducativo}</p>
            )}
          </div>

          <Input
            placeholder="Grado..."
            value={grado}
            onChange={onGradoChange}
            error={validationErrors.grado}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            placeholder="Edad..."
            value={edad}
            onChange={onEdadChange}
            error={validationErrors.edad}
          />

          <Input
            placeholder="Ciudad..."
            value={ciudad}
            onChange={onCiudadChange}
            error={validationErrors.ciudad}
          />
        </div>

        <Input
          placeholder="Numero de telefono..."
          value={telefono}
          onChange={onTelefonoChange}
          error={validationErrors.telefono}
        />

        <label className="flex items-start gap-3 rounded-[var(--radius-md)] border border-black bg-white/70 px-4 py-3 text-sm leading-relaxed text-gray-700 shadow-sm">
          <input
            type="checkbox"
            required
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
          />
          <span>
            Acepto los{' '}
            <a
              href="/terminos"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[var(--color-primary)] underline decoration-[var(--color-primary)]/40 underline-offset-4 hover:decoration-[var(--color-primary)]"
            >
              Terminos y Condiciones
            </a>{' '}
            y la{' '}
            <a
              href="/privacidad"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[var(--color-primary)] underline decoration-[var(--color-primary)]/40 underline-offset-4 hover:decoration-[var(--color-primary)]"
            >
              Politica de Privacidad
            </a>
            .
          </span>
        </label>

        <Button variant="secondary" className="w-full mt-2" disabled={loading} type="submit">
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <p className="text-sm text-center text-black">
        Ya tienes cuenta?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
          type="button"
        >
          Inicia sesion
        </button>
      </p>
    </AuthCardShell>
  );
}

export default SignupCard;
