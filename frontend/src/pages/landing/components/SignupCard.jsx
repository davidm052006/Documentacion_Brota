import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';
import AuthCardShell from './AuthCardShell';
import { getPasswordStrength } from '../../../utils/validation';

// Anima la entrada de un grupo de campos cuando show cambia a true.
// Usa una key numérica para que React destruya y recree el nodo,
// disparando la animación CSS cada vez que el campo aparece.
function RevealField({ show, step, children }) {
  if (!show) return null;
  return (
    <div key={step} className="reveal-field">
      {children}
    </div>
  );
}

function SignupCard({
  primerNombre, segundoNombre, primerApellido, segundoApellido,
  email, password, confirmPassword,
  nivelEducativo, grado, edad, ciudad, telefono,
  validationErrors, error, loading,
  onPrimerNombreChange, onSegundoNombreChange,
  onPrimerApellidoChange, onSegundoApellidoChange,
  onEmailChange, onPasswordChange, onConfirmPasswordChange,
  onNivelEducativoChange, onGradoChange, onEdadChange,
  onCiudadChange, onTelefonoChange,
  onSubmit, onSwitchToLogin,
}) {
  const passwordStrength = getPasswordStrength(password);

  // ── Condiciones de visibilidad: cada paso se desbloquea cuando
  //    el campo anterior tiene contenido suficiente.
  const s1 = primerNombre.trim().length > 0;                         // apellidos
  const s2 = s1 && primerApellido.trim().length > 0;                 // email
  const s3 = s2 && email.trim().length > 3;                          // contraseñas
  const s4 = s3 && password.length >= 4 && confirmPassword.length >= 4; // educativo + grado
  const s5 = s4 && nivelEducativo.length > 0;                        // edad + ciudad
  const s6 = s5 && edad.trim().length > 0 && ciudad.trim().length > 0; // teléfono
  const s7 = s6 && telefono.trim().length >= 7;                      // términos + botón

  // Barra de progreso (0–7 pasos completados)
  const pasos = [s1, s2, s3, s4, s5, s6, s7];
  const completados = pasos.filter(Boolean).length;
  const progreso = Math.round((completados / pasos.length) * 100);

  return (
    <AuthCardShell title="Crea tu cuenta" className="max-w-md w-full">

      {/* ── Barra de progreso ── */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 bg-gray-100 dark:bg-[#2c3140] rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 w-8 text-right">
          {completados}/7
        </span>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">

        {/* ── Paso 0: Primer nombre (siempre visible) ── */}
        <Input
          placeholder="Primer nombre *"
          value={primerNombre}
          onChange={onPrimerNombreChange}
          error={validationErrors.primerNombre}
        />

        {/* ── Paso 1: Segundo nombre + Primer apellido ── */}
        <RevealField show={s1} step={1}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Segundo nombre"
              value={segundoNombre}
              onChange={onSegundoNombreChange}
              error={validationErrors.segundoNombre}
            />
            <Input
              placeholder="Primer apellido *"
              value={primerApellido}
              onChange={onPrimerApellidoChange}
              error={validationErrors.primerApellido}
            />
          </div>
        </RevealField>

        {/* ── Paso 2: Segundo apellido + Email ── */}
        <RevealField show={s2} step={2}>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Segundo apellido"
              value={segundoApellido}
              onChange={onSegundoApellidoChange}
              error={validationErrors.segundoApellido}
            />
            <Input
              placeholder="Correo electrónico *"
              value={email}
              onChange={onEmailChange}
              error={validationErrors.email}
            />
          </div>
        </RevealField>

        {/* ── Paso 3: Contraseñas ── */}
        <RevealField show={s3} step={3}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Contraseña *"
                type="password"
                value={password}
                onChange={onPasswordChange}
                error={validationErrors.password}
              />
              <Input
                placeholder="Confirmar contraseña *"
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                error={validationErrors.confirmPassword}
              />
            </div>
            {password && (
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 dark:bg-[#2c3140] rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${
                    passwordStrength === 'Débil' ? 'w-1/3 bg-red-500' :
                    passwordStrength === 'Media' ? 'w-2/3 bg-yellow-500' :
                    'w-full bg-green-500'
                  }`} />
                </div>
                <span className={`text-xs font-semibold ${
                  passwordStrength === 'Débil' ? 'text-red-500' :
                  passwordStrength === 'Media' ? 'text-yellow-500' :
                  'text-green-600 dark:text-green-400'
                }`}>
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>
        </RevealField>

        {/* ── Paso 4: Nivel educativo + Grado ── */}
        <RevealField show={s4} step={4}>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <select
                value={nivelEducativo}
                onChange={(e) => onNivelEducativoChange(e.target.value)}
                className={`bg-[var(--color-surface)] dark:bg-[#1a1d24] dark:text-gray-300 text-gray-500 border px-4 py-3 text-sm rounded-[var(--radius-md)]
                  outline-none transition-all duration-200 w-full focus:ring-2 focus:ring-[var(--color-primary)]/30 appearance-none ${
                    validationErrors.nivelEducativo
                      ? 'border-red-500'
                      : 'border-black dark:border-[#3a4155]'
                  }`}
              >
                <option value="">Nivel educativo *</option>
                <option value="Educacion media">Educación media</option>
                <option value="Tecnico">Técnico</option>
              </select>
              {validationErrors.nivelEducativo && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.nivelEducativo}</p>
              )}
            </div>
            <Input
              placeholder="Grado *"
              value={grado}
              onChange={onGradoChange}
              error={validationErrors.grado}
            />
          </div>
        </RevealField>

        {/* ── Paso 5: Edad + Ciudad ── */}
        <RevealField show={s5} step={5}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Edad *"
              value={edad}
              onChange={onEdadChange}
              error={validationErrors.edad}
            />
            <Input
              placeholder="Ciudad *"
              value={ciudad}
              onChange={onCiudadChange}
              error={validationErrors.ciudad}
            />
          </div>
        </RevealField>

        {/* ── Paso 6: Teléfono ── */}
        <RevealField show={s6} step={6}>
          <Input
            placeholder="Número de teléfono *"
            value={telefono}
            onChange={onTelefonoChange}
            error={validationErrors.telefono}
          />
        </RevealField>

        {/* ── Paso 7: Términos + Botón ── */}
        <RevealField show={s7} step={7}>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 rounded-[var(--radius-md)] border border-black dark:border-[#3a4155] bg-white/70 dark:bg-[#1a1d24] px-4 py-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 shadow-sm">
              <input
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)] cursor-pointer"
              />
              <p>
                Acepto los{' '}
                <a
                  href="/terminos"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[var(--color-primary)] underline underline-offset-4 hover:opacity-80"
                >
                  Términos y Condiciones
                </a>{' '}
                y la{' '}
                <a
                  href="/privacidad"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[var(--color-primary)] underline underline-offset-4 hover:opacity-80"
                >
                  Política de Privacidad
                </a>.
              </p>
            </div>
            <Button variant="secondary" className="w-full" disabled={loading} type="submit">
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </div>
        </RevealField>

      </form>

      <p className="text-sm text-center text-black dark:text-gray-300">
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
