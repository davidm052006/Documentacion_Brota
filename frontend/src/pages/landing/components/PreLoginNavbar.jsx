function PreLoginNavbar() {
    return (
        <nav className="w-full flex justify-between items-center px-10 py-6 absolute top-0 left-0">
            <h2 className="text-2xl font-bold text-[black]">BROTA</h2>
            <nav>
                <ul className="flex gap-8 text-black font-medium ">
                    <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Inicio</a></li>
                    <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Sobre mí</a></li>
                    <li><a href="#" className="hover:text-[var(--color-primary)] transition-colors">Contacto</a></li>
                </ul>
            </nav>
        </nav>
    )
}

// ¡ESTA ES LA LÍNEA QUE FALTABA!
export default PreLoginNavbar;