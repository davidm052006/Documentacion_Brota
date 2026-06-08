// src/pages/dashboard/components/HeroBanner.jsx
//
// IMAGEN DE FONDO:
// Coloca tu imagen de hojas en:  src/assets/hero-leaves.png  (o .svg / .webp)
// Luego descomenta la línea del <img> y borra el emoji de fondo.

export default function HeroBanner({ name = '' }) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-8 flex items-center justify-between min-h-[180px]">

      {/* Texto */}
      <div className="relative z-10 max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Bienvenido a BROTA! 🌿
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed">
          Estamos felices de tenerte aquí. Este es tu espacio para descubrir
          tus talentos, explorar opciones y construir el futuro que sueñas.
        </p>
      </div>

      {/* Ilustración / imagen de fondo */}
      {/* OPCIÓN A — imagen real (recomendado):
          Descarga o crea una ilustración de hojas y ponla en src/assets/hero-leaves.png
          Luego reemplaza el bloque de abajo con:

          <img
            src="/assets/hero-leaves.png"
            alt=""
            aria-hidden="true"
            className="absolute right-0 bottom-0 h-full object-contain opacity-80 pointer-events-none"
          />
      */}

      {/* OPCIÓN B — placeholder mientras no tienes imagen */}
      <div className="absolute right-6 bottom-4 text-8xl opacity-10 select-none pointer-events-none">
        🌿
      </div>

      {/* Fondo degradado sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/60 to-transparent pointer-events-none" />
    </div>
  );
}
