function AuthCardShell({ title, description, children, className = '' }) {
  return (
    <div className={`bg-white dark:bg-[#141a16] rounded-2xl shadow-lg border border-gray-100 dark:border-[#1e2a21] p-8 w-full flex flex-col gap-6 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export default AuthCardShell;
