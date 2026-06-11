import React from 'react';

function AuthCardShell({ title, description, children }) {
  return (
<div className=" bg-amber-50 p-10 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-6 border border-gray-200">
  <h3 className="text-2xl font-bold text-center text-black">{title}</h3>
  {description && (
    <p className="text-center text-sm text-gray-700 leading-relaxed">{description}</p>
  )}
  {children}
</div>
  );
}

export default AuthCardShell;
