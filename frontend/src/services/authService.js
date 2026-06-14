import { supabase } from '../config/supabase';
import { translateAuthError } from '../utils/authErrors';

export const loginWithEmail = async (email, password) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: translateAuthError(error.message) };
    return { success: true };
  } catch (err) {
    console.error('authService.loginWithEmail:', err);
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' };
  }
};

export const signUpWithEmail = async (email, password, nombre, apellido, nivelEducativo, grado, edad, ciudad, telefono) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    if (authError) return { success: false, error: translateAuthError(authError.message) };

    const { error: profileError } = await supabase.from('perfiles_usuario').insert([
      {
        user_id: authData.user.id,
        nombre,
        apellido,
        nivel_educativo: nivelEducativo,
        grado,
        edad,
        ciudad,
        telefono,
      },
    ]);

    if (profileError) {
      console.error('authService.signUpWithEmail — fallo al crear perfil:', profileError);
      try {
        await supabase.auth.admin.deleteUser(authData.user.id);
      } catch (deleteErr) {
        console.error('authService.signUpWithEmail — rollback fallido:', deleteErr);
      }
      return { success: false, error: 'No pudimos crear tu perfil. Por favor intenta registrarte de nuevo.' };
    }

    return { success: true };
  } catch (err) {
    console.error('authService.signUpWithEmail:', err);
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' };
  }
};

export const sendPasswordReset = async (email) => {
  try {
    if (typeof supabase.auth.resetPasswordForEmail !== 'function') {
      return { success: false, error: 'Funcionalidad de recuperación no disponible.' };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) return { success: false, error: translateAuthError(error.message) };
    return { success: true };
  } catch (err) {
    console.error('authService.sendPasswordReset:', err);
    return { success: false, error: 'Error de conexión. Intenta nuevamente.' };
  }
};

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