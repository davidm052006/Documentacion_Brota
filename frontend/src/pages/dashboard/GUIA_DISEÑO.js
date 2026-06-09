// ==========================================
// GUÍA PARA DISEÑADOR - CÓMO TRABAJAR EN DASHBOARD.JSX
// ==========================================
// Esta guía explica la estructura actual del dashboard y cómo agregar componentes.

/*
╔═════════════════════════════════════════════════════════════════════════════╗
║                          🎨 GUÍA PARA EL DISEÑADOR                         ║
╚═════════════════════════════════════════════════════════════════════════════╝

📌 UBICACIÓN DEL ARCHIVO
─────────────────────────
Frontend > src > pages > dashboard > Dashboard.jsx


📌 QUÉ ES EL DASHBOARD ACTUAL
────────────────────────────
El Dashboard se muestra después del login y se renderiza dentro de
DashboardLayout. El diseño actual incluye:

• Barra superior con saludo y notificaciones
• HeroBanner (bienvenida / resumen)
• ProfileCard (datos del usuario)
• QuickActions (accesos rápidos)
• ContinueSection (siguiente paso)


📌 DÓNDE TRABAJAR
────────────────────────
Modifica / amplía esta página aquí:

Frontend > src > pages > dashboard > Dashboard.jsx

También puedes crear componentes nuevos en:

Frontend > src > pages > dashboard > components

Y luego importarlos con rutas relativas:

import MiCard from './components/MiCard';


📌 ESTADO Y DATOS DISPONIBLES
────────────────────────────
Dentro de Dashboard.jsx ya tienes:

• profile: datos del usuario cargados desde la DB o modo demo
• user: datos de sesión
• isDemoMode: modo demo si no hay keys de Supabase

Campos útiles:

• profile?.nombre
• profile?.edad
• profile?.ciudad
• profile?.nivel_educativo
• profile?.condiciones_socioeconomicas
• user?.email


📌 CÓMO AGREGAR SECCIONES VISUALES
────────────────────────────────
Reemplaza o amplía el contenido dentro de:

<DashboardLayout isDemoMode={isDemoMode}>
  <div className="p-6 max-w-6xl mx-auto">
    ...
  </div>
</DashboardLayout>

Por ejemplo, después de QuickActions podrías añadir:

<div className="grid gap-6 lg:grid-cols-3 mb-6">
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-xl font-bold">📝 Cuestionario Vocacional</h3>
    <p className="text-gray-600 mt-2">Avanza en tu prueba</p>
    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
      Comenzar
    </button>
  </div>
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-xl font-bold">📊 Mi progreso</h3>
    <p className="text-gray-600 mt-2">Sigue tus resultados</p>
  </div>
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-xl font-bold">⭐ Recomendaciones</h3>
    <p className="text-gray-600 mt-2">Carreras sugeridas para ti</p>
  </div>
</div>


📌 USA TAILWIND PARA ESTILOS
──────────────────────────
No necesitas CSS extra. Usa clases ya disponibles:

• Espaciado: p-6, m-4, gap-6
• Layout: grid, grid-cols-3, flex, items-center, justify-between
• Fondo: bg-white, bg-green-50, bg-gray-50
• Texto: text-gray-600, text-xl, font-bold
• Bordes: rounded-lg, rounded-2xl
• Sombras: shadow, shadow-lg
• Hover: hover:bg-green-600, transition, duration-200


📌 SI QUIERES CREAR COMPONENTES REUTILIZABLES
──────────────────────────────────────────────
Crea archivos nuevos en:

Frontend > src > pages > dashboard > components

Por ejemplo:

src/pages/dashboard/components/ProgressCard.jsx

Importa con:

import ProgressCard from './components/ProgressCard';

Y úsalo en el JSX:

<ProgressCard profile={profile} />


📌 SI NECESITAS MODIFICAR EL LAYOUT GENERAL
────────────────────────────────────────────
El layout principal está en:

Frontend > src > components > Layout > DashboardLayout.jsx

Ahí se define:

• Fondo de la página
• Sidebar fijo
• Contenedor principal

Sólo edítalo si necesitas cambiar el wrapper del dashboard,
no para modificar contenido específico de la página.


📌 CHECKLIST ANTES DE COMMITEAR
──────────────────────────────
☐ El dashboard carga sin errores
☐ El diseño es responsive
☐ Los datos del perfil se muestran bien
☐ No hay warnings importantes en la consola
☐ Todo se ve bien en móvil y escritorio


📌 CONSEJOS IMPORTANTES
──────────────────────
• Usa componentes pequeños y claros.
• Evita duplicar código: extrae cards y bloques grandes.
• Mantén el JSX limpio y ordenado.
• Usa comentarios si agregas lógica compleja.


🎨 IDEA RÁPIDA
──────────────────────────────
Agrega una sección nueva con tarjetas:

<div className="grid gap-6 lg:grid-cols-2 mb-6">
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-xl font-bold">Mi progreso</h3>
    <p className="text-gray-600 mt-2">Tus avances y metas.</p>
  </div>
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-xl font-bold">Recomendaciones</h3>
    <p className="text-gray-600 mt-2">Carreras y rutas formativas.</p>
  </div>
</div>


¡Listo! Ya puedes diseñar el dashboard con la estructura real y sin depender
de secciones antiguas que ya no existen.
*/
