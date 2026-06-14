import React from 'react';
import Button from '../../../components/Shared/Button';
import Input from '../../../components/Shared/Input';
import AuthCardShell from './AuthCardShell';

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
        <Input
          placeholder="Contraseña..."
          type="password"
          value={password}
          onChange={onPasswordChange}
          error={validationErrors.password}
        />
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
