function LoginNavbar({ logoVisible = true }) {
  return (
    <nav className="w-full flex justify-start items-center px-9 py-5 absolute top-0 left-0 z-10">
      <img
        src="/logo-brota-animacion.png"
        alt="Brota"
        style={{
          height: 48,
          width: 'auto',
          opacity: logoVisible ? 1 : 0,
          transition: 'opacity 0.4s ease-in',
        }}
      />
    </nav>
  );
}

export default LoginNavbar;
