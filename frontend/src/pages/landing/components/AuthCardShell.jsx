import React from 'react';

function AuthCardShell({ title, description, children }) {
  return (
    <div className="bg-black/15 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-6 border border-white/30">
      <h3 className="text-2xl font-bold text-center text-black">{title}</h3>
      {description && (
        <p className="text-center text-sm text-black/80 leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
}

export default AuthCardShell;
