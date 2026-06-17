// ============================================================
// authService.js
// Capa de acceso a datos para autenticación (modo producción).
//
// RESPONSABILIDAD: Es el único archivo del frontend que habla
// directamente con Supabase Auth y con la tabla perfiles_usuario.
// Ningún componente ni hook debería importar supabase directamente
// para operaciones de auth — todo pasa por aquí.
//
// OPERACIONES SQL QUE REALIZA:
//
//   signUpWithEmail → INSERT en perfiles_usuario:
//     INSERT INTO perfiles_usuario (user_id, nombre, apellido)
//     VALUES ($1, $2, $3);
//     (el user_id viene de Supabase Auth después del signUp)
//
//   loginWithEmail → no hay SQL propio; Supabase Auth verifica
//     internamente en auth.users (tabla gestionada por Supabase).
//
//   sendPasswordReset → no hay SQL; Supabase genera un token
//     y envía el correo de recuperación automáticamente.
//
// CONTRATO DE RETORNO: todas las funciones devuelven siempre
//   { success: true }           si la operación fue exitosa
//   { success: false, error }   si falló (error ya en español)
//
// USADO EN: useAuth.js (cuando isDemoMode = false)
// ============================================================

import { supabase } from '../config/supabase';
import { translateAuthError } from '../utils/authErrors';

// ─────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────

/**
 * Inicia sesión con correo y contraseña.
 *
 * Internamente Supabase verifica contra auth.users y devuelve
 * un JWT que queda almacenado en localStorage automáticamente.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const loginWithEmail = async (email, password) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      // Traducimos el error antes de devolverlo al hook
      return { success: false, error: translateAuthError(error.message) };
    }

    return { success: true };
  } catch (err) {
    // Error de red u otro error inesperado (no de Supabase)
    console.error('authService.loginWithEmail:', err);
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' };
  }
};

// ─────────────────────────────────────────────────────────────
// REGISTRO
// ─────────────────────────────────────────────────────────────

/**
 * Registra un nuevo usuario en dos pasos:
 *   1. Crea el usuario en Supabase Auth (tabla auth.users interna)
 *   2. Crea su perfil en nuestra tabla pública perfiles_usuario
 *
 * ROLLBACK: si el paso 2 falla, se intenta eliminar el usuario
 * del paso 1 para evitar "usuarios fantasma" — registros en
 * auth.users sin perfil correspondiente en perfiles_usuario.
 *
 * SQL del paso 2:
 *   INSERT INTO perfiles_usuario (user_id, nombre, apellido)
 *   VALUES ($userId, $nombre, $apellido);
 *
 * @param {string} email
 * @param {string} password
 * @param {string} nombre
 * @param {string} apellido
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const signUpWithEmail = async (email, password, nombre, apellido) => {
  try {
    // ── Paso 1: crear usuario en Supabase Auth ──────────────
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return { success: false, error: translateAuthError(authError.message) };
    }

    // ── Paso 2: crear perfil en nuestra tabla ───────────────
    // authData.user.id es el UUID generado por Supabase Auth.
    // Lo usamos como FK para vincular auth.users ↔ perfiles_usuario.
    const { error: profileError } = await supabase
      .from('perfiles_usuario')
      .insert([{ user_id: authData.user.id, nombre, apellido }]);

    if (profileError) {
      // ── Rollback: limpiar el usuario de Auth si el perfil falló ──
      // Sin esto, el usuario quedaría en auth.users pero sin datos
      // en perfiles_usuario — no podría usar la app y tampoco
      // podría registrarse de nuevo con el mismo correo.
      //
      // NOTA: supabase.auth.admin.deleteUser requiere la service_role
      // key, que NO debe estar en el frontend en producción real.
      // Este rollback funciona en desarrollo. En producción debería
      // hacerse desde el backend (Express/Node) con una ruta protegida.
      console.error('authService.signUpWithEmail — fallo al crear perfil:', profileError);
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
      } catch (deleteErr) {
        // Si el rollback también falla, solo lo registramos.
        // El equipo debería limpiar ese usuario manualmente desde
        // el dashboard de Supabase.
        console.error('authService.signUpWithEmail — rollback fallido:', deleteErr);
      }

      return {
        success: false,
        error: 'No pudimos crear tu perfil. Por favor intenta registrarte de nuevo.',
      };
    }

    return { success: true };
  } catch (err) {
    console.error('authService.signUpWithEmail:', err);
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' };
  }
};

// ─────────────────────────────────────────────────────────────
// RECUPERACIÓN DE CONTRASEÑA
// ─────────────────────────────────────────────────────────────

/**
 * Envía un correo de recuperación de contraseña.
 *
 * Supabase genera un token seguro y envía el correo usando
 * el proveedor de email configurado en el proyecto de Supabase.
 * No hay SQL directo — todo es gestionado por Supabase Auth.
 *
 * El usuario recibirá un enlace que lo lleva a una página de
 * restablecimiento (deberán implementar esa ruta más adelante).
 *
 * @param {string} email
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export const sendPasswordReset = async (email) => {
  try {
    if (typeof supabase.auth.resetPasswordForEmail !== 'function') {
      return { success: false, error: 'Funcionalidad de recuperación no disponible.' };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return { success: false, error: translateAuthError(error.message) };
    }

    return { success: true };
  } catch (err) {
    console.error('authService.sendPasswordReset:', err);
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' };
  }
};

// Actualiza la contraseña del usuario autenticado (usado en ResetPassword.jsx)
export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { success: false, error: translateAuthError(error.message) };
    return { success: true };
  } catch (err) {
    console.error('authService.updatePassword:', err);
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' };
  }
};