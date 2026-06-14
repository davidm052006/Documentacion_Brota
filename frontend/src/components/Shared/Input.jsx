import React, { useState } from 'react'

function Input({ type = "text", value, onChange, placeholder, error, className = "" }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className="w-full relative">
            <input
                type={inputType}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`bg-[var(--color-surface)] text-black border px-4 py-3 text-base rounded-[var(--radius-md)] outline-none transition-all duration-200 w-full focus:ring-3 focus:ring-[var(--color-primary)]/30 placeholder:text-slate-400 ${
                    isPassword ? 'pr-12' : ''
                } ${
                    error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-black focus:border-black'
                } ${className}`}
            />

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                    {showPassword ? (
                        // Ojo tachado — ocultar
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                    ) : (
                        // Ojo abierto — mostrar
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                </button>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Input
