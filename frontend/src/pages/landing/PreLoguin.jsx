// ==========================================
// PRELOGUIN.JSX - PÁGINA DE AUTENTICACIÓN
// ==========================================
// Esta página maneja LOGIN y REGISTRO de usuarios.
// Aquí los usuarios pueden:
// 1. Loguearse si ya tienen cuenta (formulario login)
// 2. Registrarse si es su primera vez (formulario signup)
//
// FLUJO:
// Usuario escribe email/contraseña
//   ↓
// Validamos formato en el FRONTEND (en tiempo real, para UX)
//   ↓
// Si todo está bien, enviamos a SUPABASE
//   ↓
// Supabase valida definitivamente y autentica
//   ↓
// Si es exitoso, el usuario se loguea y App.jsx lo redirige al Dashboard

import { useState } from 'react';
import { supabase } from '../../config/supabase';
import Button from '../../components/Shared/Button';
import Input from '../../components/Shared/Input';
import PreLoginNavbar from './components/PreLoginNavbar';

function PreLoguin({ isDemoMode = false }) {
    // ==========================================
    // ESTADOS DEL COMPONENTE
    // ==========================================

    // Modo: 'login' para mostrar formulario de login, 'signup' para registro
    const [mode, setMode] = useState('login');

    // Campos del formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Solo para signup
    const [nombre, setNombre] = useState(''); // Solo para signup
    const [apellido, setApellido] = useState(''); // Solo para signup

    // Estados de validación y carga
    const [loading, setLoading] = useState(false); // True mientras enviamos a Supabase
    const [error, setError] = useState(null); // Mensaje de error si algo falla
    const [validationErrors, setValidationErrors] = useState({}); // Errores de validación por campo

    // ==========================================
    // FUNCIONES DE VALIDACIÓN EN FRONTEND
    // ==========================================
    // Estas funciones validan FORMATO antes de enviar a Supabase
    // Esto es para UX rápida (feedback inmediato) y reducir llamadas innecesarias

    // Validar formato de email
    const isValidEmail = (email) => {
        // Expresión regular para verificar si el email tiene formato correcto
        // Ejemplo: usuario@dominio.com
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validar fortaleza de contraseña
    const isValidPassword = (password) => {
        // Mínimo 6 caracteres
        // Idealmente debería tener mayúscula, minúscula, número (pero por MVP aceptamos cualquier cosa >= 6)
        return password.length >= 6;
    };

    // Validar que los campos no estén vacíos
    const validateFields = () => {
        const errors = {};

        if (!email) errors.email = 'El correo es requerido';
        else if (!isValidEmail(email)) errors.email = 'Correo inválido';

        if (!password) errors.password = 'La contraseña es requerida';
        else if (!isValidPassword(password)) errors.password = 'Mínimo 6 caracteres';

        if (mode === 'signup') {
            if (!nombre) errors.nombre = 'El nombre es requerido';
            if (!apellido) errors.apellido = 'El apellido es requerido';
            if (!confirmPassword) errors.confirmPassword = 'Confirma tu contraseña';
            else if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        return errors;
    };

    // ==========================================
    // FUNCIÓN: MANEJAR LOGIN
    // ==========================================
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setValidationErrors({});

        // Validar campos en frontend
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return; // No enviamos si hay errores
        }

        setLoading(true);

        try {
            // ========== MODO DEMO ==========
            if (isDemoMode) {
                // En modo demo, solo simulamos login
                console.log('📱 MODO DEMO: Simulando login con', email);
                // Guardar en localStorage para que App.jsx lo vea después del refresh
                localStorage.setItem('demoModeLoggedIn', 'true');
                localStorage.setItem('demoUserEmail', email);
                localStorage.setItem('demoUserName', 'Juan Demo');
                setTimeout(() => {
                    setLoading(false);
                    window.location.href = '/dashboard';
                }, 1500);
                return;
            }

            // ========== MODO REAL (Supabase) ==========
            // Enviar credenciales a Supabase
            // signInWithPassword: Supabase valida el email/contraseña y crea la sesión
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                // Si Supabase rechaza las credenciales, mostramos el error
                // (usuario no existe, contraseña incorrecta, etc.)
                setError(error.message);
            } else {
                // Login exitoso - redirigir al dashboard
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 500);
            }
        } catch (err) {
            console.error('Error en login:', err);
            setError('Ocurrió un error. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // FUNCIÓN: MANEJAR REGISTRO (SIGNUP)
    // ==========================================
    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);
        setValidationErrors({});

        // Validar campos
        const errors = validateFields();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setLoading(true);

        try {
            // ========== MODO DEMO ==========
            if (isDemoMode) {
                // En modo demo, solo simulamos signup
                console.log('📱 MODO DEMO: Simulando registro de', nombre, apellido);
                // Guardar en localStorage para que App.jsx lo vea después del refresh
                localStorage.setItem('demoModeLoggedIn', 'true');
                localStorage.setItem('demoUserEmail', email);
                localStorage.setItem('demoUserName', nombre + ' ' + apellido);
                setTimeout(() => {
                    setLoading(false);
                    window.location.href = '/dashboard';
                }, 1500);
                return;
            }

            // ========== MODO REAL (Supabase) ==========
            // Paso 1: Crear usuario en Supabase Auth
            // signUp crea un registro en la tabla auth.users
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) {
                setError(authError.message);
                setLoading(false);
                return;
            }

            // Paso 2: Crear perfil en la tabla PERFILES_USUARIO
            // Esto es información adicional del usuario (no es de autenticación)
            const { error: profileError } = await supabase
                .from('PERFILES_USUARIO')
                .insert([
                    {
                        user_id: authData.user.id, // ID del usuario creado en Auth
                        nombre: nombre,
                        apellido: apellido,
                        // Los demás campos (edad, ciudad, etc.) se completan después
                    },
                ]);

            if (profileError) {
                // Si hay error creando el perfil, mostramos el error
                // En un app real, quizás deberíamos eliminar el usuario auth creado
                setError('Error al crear tu perfil: ' + profileError.message);
            } else {
                // Registro exitoso
                // Supabase auto-loguea al usuario, así que App.jsx lo redirige
                setError(null);
            }
        } catch (err) {
            console.error('Error en signup:', err);
            setError('Ocurrió un error. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // RENDERIZACIÓN
    // ==========================================
    return (
        <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center relative">
            <PreLoginNavbar />

            {/* Contenedor principal dividido en dos grandes columnas */}
            <div className="flex w-full pt-24 pb-12 px-20">

                {/* --- CAJA IZQUIERDA (Información de Brota) --- */}
                <div className="w-1/2 flex flex-col justify-center pr-10">
                    <h1 className="text-green-600 mb-4 text-6xl font-bold tracking-tight">
                        🌱 BROTA
                    </h1>
                    <h2 className="text-3xl font-medium text-black mb-10 leading-snug">
                        Potenciando el crecimiento digital <br /> de tu negocio desde la raíz.
                    </h2>

                    <div className="flex gap-4">
                        <Button>Nuestros Servicios</Button>
                        <Button variant="outline">Saber más</Button>
                    </div>
                </div>

                {/* --- CAJA DERECHA (Formulario de Autenticación) --- */}
                <div className="w-1/2 flex flex-col justify-center items-center">

                    {/* Tarjeta del formulario */}
                    <div className="bg-black/15 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-6 border border-white/30">
                        
                        {/* Título que cambia según el modo (login/signup) */}
                        <h3 className="text-2xl font-bold text-center text-black">
                            {mode === 'login' ? 'Accede a tu cuenta' : 'Crea tu cuenta'}
                        </h3>

                        {/* Mensaje de error global (si algo falla) */}
                        {error && (
                            <div className="bg-red-500/20 border border-red-500 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* FORMULARIO */}
                        <form onSubmit={mode === 'login' ? handleLogin : handleSignup}>

                            {/* EN MODE SIGNUP: mostrar campos de nombre y apellido */}
                            {mode === 'signup' && (
                                <>
                                    <Input
                                        placeholder="Nombre..."
                                        value={nombre}
                                        onChange={(e) => {
                                            setNombre(e.target.value);
                                            setValidationErrors({ ...validationErrors, nombre: '' });
                                        }}
                                        error={validationErrors.nombre}
                                    />
                                    <Input
                                        placeholder="Apellido..."
                                        value={apellido}
                                        onChange={(e) => {
                                            setApellido(e.target.value);
                                            setValidationErrors({ ...validationErrors, apellido: '' });
                                        }}
                                        error={validationErrors.apellido}
                                    />
                                </>
                            )}

                            {/* CAMPOS EN AMBOS MODOS (login y signup): email y contraseña */}
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Escribe tu correo..."
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setValidationErrors({ ...validationErrors, email: '' });
                                    }}
                                    error={validationErrors.email}
                                />

                                <Input
                                    placeholder="Contraseña..."
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setValidationErrors({ ...validationErrors, password: '' });
                                    }}
                                    error={validationErrors.password}
                                />

                                {/* EN MODE SIGNUP: confirmar contraseña */}
                                {mode === 'signup' && (
                                    <Input
                                        placeholder="Confirma tu contraseña..."
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            setValidationErrors({ ...validationErrors, confirmPassword: '' });
                                        }}
                                        error={validationErrors.confirmPassword}
                                    />
                                )}
                            </div>

                            {/* BOTÓN SUBMIT (que dice "Ingresar" o "Crear cuenta" según el modo) */}
                            <Button
                                variant="secondary"
                                className="w-full mt-2"
                                disabled={loading}
                                type="submit"
                            >
                                {loading
                                    ? mode === 'login'
                                        ? 'Ingresando...'
                                        : 'Creando cuenta...'
                                    : mode === 'login'
                                    ? 'Ingresar'
                                    : 'Crear cuenta'}
                            </Button>

                        </form>
                        
                        {/* ENLACE PARA CAMBIAR DE MODO (entre login y signup) */}
                        <p className="text-sm text-center text-black mt-2">
                            {mode === 'login' ? (
                                <>
                                    ¿Aún no eres parte?{' '}
                                    <button
                                        onClick={() => {
                                            setMode('signup');
                                            setError(null);
                                            setValidationErrors({});
                                        }}
                                        className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
                                    >
                                        Regístrate
                                    </button>
                                </>
                            ) : (
                                <>
                                    ¿Ya tienes cuenta?{' '}
                                    <button
                                        onClick={() => {
                                            setMode('login');
                                            setError(null);
                                            setValidationErrors({});
                                        }}
                                        className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
                                    >
                                        Inicia sesión
                                    </button>
                                </>
                            )}
                            {/* Botón de recuperar contraseña */}
                        {mode === 'login' && (
                            <p className="flex items-center justify-center text-sm text-black mt-1">
                                <button
                                    onClick={() => {
                                        setMode('forgotPassword');
                                        setError(null);
                                        setValidationErrors({});
                                    }}
                                    className="text-[var(--color-primary)] font-bold hover:underline bg-transparent border-none cursor-pointer"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </p>
                        )}
                        {/* Enlaces debajo del botón */}
                        <div className="text-right">
                            {mode === 'forgotPassword' && (
                                <>
                                    <p className="text-center text- black-700 font-bold mb-4">
                                    Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                                    </p>
                                </>
                                
                            )}
                        </div>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default PreLoguin;