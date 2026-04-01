import Button from "../../components/Shared/Button";
import Input from "../../components/Shared/Input";
import PreLoginNavbar from "./components/PreLoginNavbar";

function PreLoguin() {
    return (
        <div className="flex w-full min-h-screen bg-[url('/fondo-planta-crema.jpg')] bg-cover bg-center bg-no-repeat relative">
            <PreLoginNavbar />

            {/* Contenedor principal dividido en dos grandes columnas */}
            <div className="flex w-full pt-24 pb-12 px-20"> {/* pt-24 para que el navbar no tape el contenido */}

                {/* --- CAJA IZQUIERDA (Tus textos) --- */}
                <div className="w-1/2 flex flex-col justify-center pr-10">
                    <h1 className="text-[var(--color-primary)] mb-4 text-6xl font-bold tracking-tight">
                        🌱 BROTA
                    </h1>
                    <h2 className="text-3xl font-medium text-black mb-10 leading-snug">
                        Potenciando el crecimiento digital <br /> de tu negocio desde la raíz.
                    </h2>

                    <div className="flex gap-4">
                        <Button>Nuestros Servicios</Button>
                        <Button variant="outline">Saber más</Button>
                    </div>
                </div>

                {/* --- CAJA DERECHA (Tu formulario de Login/Contacto) --- */}
                <div className="w-1/2 flex flex-col justify-center items-center">

                    {/* Tarjeta blanca para el formulario (lo hace ver súper premium) */}
                    <div className="bg-black/15 backdrop-blur-md p-10 rounded-2xl shadow-xl w-full max-w-sm flex flex-col gap-6 border border-white/30">
                        <h3 className="text-2xl font-bold text-center text-black">Accede a tu cuenta</h3>

                        <div className="flex flex-col gap-4">
                            <Input placeholder="Escribe tu correo..." />
                            <Input placeholder="Contraseña..." type="password" />
                        </div>

                        <Button variant="secondary" className="w-full mt-2">Ingresar</Button>

                        <p className="text-sm text-center text-black mt-2">
                            ¿Aún no eres parte? <a href="#" className="text-[var(--color-primary)] font-bold hover:underline">Regístrate</a>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default PreLoguin;