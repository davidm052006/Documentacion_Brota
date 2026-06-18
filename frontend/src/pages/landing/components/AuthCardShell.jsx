import React from 'react';

function AuthCardShell({ title, description, children, className = '' }) {
  return (
    <div className={`bg-amber-50 dark:bg-[#1a1d24] p-10 rounded-2xl shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] w-full max-w-sm flex flex-col gap-6 border border-gray-200 dark:border-[#2c3140] ${className}`}>
      <h3 className="text-2xl font-bold text-center text-black dark:text-white">{title}</h3>
      {description && (
        <p className="text-center text-sm text-gray-700 dark:text-[#c8cdd8] leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
}

export default AuthCardShell;
