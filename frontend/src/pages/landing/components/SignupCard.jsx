import React from 'react';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';
import AuthCardShell from './AuthCardShell';
import { getPasswordStrength } from '../../../utils/validation';

function SignupCard({
  nombre,
  apellido,
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
  onNombreChange,
  onApellidoChange,
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
  return (
    <AuthCardShell title="Crea tu cuenta">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          placeholder="Nombre..."
          value={nombre}
          onChange={onNombreChange}
          error={validationErrors.nombre}
        />
        <Input
          placeholder="Apellido..."
          value={apellido}
          onChange={onApellidoChange}
          error={validationErrors.apellido}
        />
        <Input
          placeholder="Escribe tu correo..."
          value={email}
          onChange={onEmailChange}
          error={validationErrors.email}
        />
<<<<<<< HEAD
=======
        
        <Input
        placeholder="Contraseña..."
        type="password"
        value={password}
        onChange={onPasswordChange}
        error={validationErrors.password}
        />

        {password && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Fortaleza de contraseña</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                getPasswordStrength(password) === 'Débil' ? 'bg-red-100 text-red-700' :
                getPasswordStrength(password) === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
              }`}>
                {getPasswordStrength(password)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className={`h-full transition-all duration-300 ${
                getPasswordStrength(password) === 'Débil' ? 'w-1/3 bg-red-500' :
                getPasswordStrength(password) === 'Media' ? 'w-2/3 bg-yellow-500' :
                'w-full bg-[var(--color-primary)]'
              }`} />
            </div>
          </div>
        )}

        <Input
        placeholder="Confirma tu contraseña..."
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        error={validationErrors.confirmPassword}
        />
>>>>>>> 252ba5125f97a964cc0a65472c9eb57998493980
        
        <Input
        placeholder="Contraseña..."
        type="password"
        value={password}
        onChange={onPasswordChange}
        error={validationErrors.password}
        />

        {password && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Fortaleza de contraseña</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                getPasswordStrength(password) === 'Débil' ? 'bg-red-100 text-red-700' :
                getPasswordStrength(password) === 'Media' ? 'bg-yellow-100 text-yellow-700' :
                'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
              }`}>
                {getPasswordStrength(password)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className={`h-full transition-all duration-300 ${
                getPasswordStrength(password) === 'Débil' ? 'w-1/3 bg-red-500' :
                getPasswordStrength(password) === 'Media' ? 'w-2/3 bg-yellow-500' :
                'w-full bg-[var(--color-primary)]'
              }`} />
            </div>
          </div>
        )}

        <Input
        placeholder="Confirma tu contraseña..."
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        error={validationErrors.confirmPassword}
        />

        <div className="w-full">
          <select
            value={nivelEducativo}
            onChange={(e) => onNivelEducativoChange(e.target.value)}
            className={`w-full px-4 py-3 rounded-md border text-base font-sans 
            bg-[var(--color-surface)] text-gray-400 outline-none transition-all duration-200
              ${validationErrors.nivelEducativo 
                ? 'border-black -500 focus:border-black-500' 
                : 'border-black  focus:border-black'}
            `}
          >
    <option value="">Selecciona tu nivel educativo</option>
    <option value="Educación media">Educación media</option>
    <option value="Tecnico">Técnico</option>
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
        <Input
          placeholder="Numero de telefono..."
          value={telefono}
          onChange={onTelefonoChange}
          error={validationErrors.telefono}
        />

        <Button variant="secondary" className="w-full mt-2" disabled={loading} type="submit">
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </Button>
      </form>

      <p className="text-sm text-center text-black">
        ¿Ya tienes cuenta?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
          type="button"
        >
          Inicia sesión
        </button>
      </p>
    </AuthCardShell>
  );
}

export default SignupCard;
