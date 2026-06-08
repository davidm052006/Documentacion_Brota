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
  validationErrors,
  error,
  loading,
  onNombreChange,
  onApellidoChange,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
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
