import React from 'react'

const variants = {
  primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] shadow-[0_4px_6px_-1px_rgba(43,207,43,0.3)] hover:shadow-[0_6px_8px_-1px_rgba(43,207,43,0.4)]",
  secondary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline: "bg-transparent text-black border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-black"
};

function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const baseClasses = "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-base font-semibold rounded-[var(--radius-md)] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0";
  const variantClass = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClass} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
