import React from 'react'

function Input({ type = "text", value, onChange, placeholder, className = "" }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`bg-[var(--color-surface)] text-black border border-[var(--color-border)] px-4 py-3 text-base rounded-[var(--radius-md)] outline-none transition-all duration-200 w-full max-w-[300px] focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary)]/30 placeholder:text-slate-400 ${className}`}
        />
    )
}

export default Input