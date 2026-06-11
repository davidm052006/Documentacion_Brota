import React from 'react'

function Input({ type = "text", value, onChange, placeholder, error, className = "" }) {
    return (
        <div className="w-full">
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`bg-[var(--color-surface)] text-black border px-4 py-3 text-base rounded-[var(--radius-md)] outline-none transition-all duration-200 w-full focus:ring-3 focus:ring-[var(--color-primary)]/30 placeholder:text-slate-400 ${
                    error
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-black focus:border-black'
                } ${className}`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Input
