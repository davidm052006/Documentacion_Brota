// ==========================================
// GUÍA PARA DISEÑADOR - CÓMO TRABAJAR EN DASHBOARD.JSX
// ==========================================
// Tu compañero de diseño debe leer esto para entender dónde y cómo agregar componentes visuales

/*
╔═════════════════════════════════════════════════════════════════════════════╗
║                          🎨 GUÍA PARA EL DISEÑADOR                         ║
╚═════════════════════════════════════════════════════════════════════════════╝

📌 UBICACIÓN DEL ARCHIVO
─────────────────────────
Frontend > src > pages > dashboard > Dashboard.jsx


📌 QUÉ ES EL DASHBOARD
──────────────────────
Es la página principal que VE EL USUARIO después de loguearse.
Aquí puede ver su perfil, hacer cuestionarios, ver recomendaciones de carreras, etc.


📌 CÓMO FUNCIONA ACTUALMENTE
────────────────────────────
Dashboard.jsx ya tiene:

✅ Autenticación integrada (recibe el usuario logueado)
✅ Carga de perfil desde la BD (nombre, edad, ciudad, etc.)
✅ Botón de cerrar sesión
✅ Estructura HTML básica con Tailwind CSS
✅ Manejo de errores


📌 QUÉ FALTA (AQUÍ ENTRA TÚ)
─────────────────────────────
❌ Componentes visuales profesionales
❌ Cuestionario vocacional
❌ Vista de recomendaciones
❌ Progreso del usuario
❌ Navegación interna (pestañas, secciones)
❌ Gráficos / estadísticas


📌 PASOS PARA DISEÑAR EL DASHBOARD
──────────────────────────────────

1️⃣ ABRE EL ARCHIVO
   Frontend > src > pages > dashboard > Dashboard.jsx


2️⃣ BUSCA ESTA SECCIÓN (ALREDEDOR DE LA LÍNEA 150)
   /* ==================== ZONA DE DISEÑO PERSONALIZADO ==================== */

   Es la sección azul con borde punteado donde dice "Área de Diseño Personalizado"


3️⃣ REEMPLAZA ESA SECCIÓN CON TUS COMPONENTES
   
   Ejemplo básico:
   ──────────────
   <div className="grid grid-cols-3 gap-8">
     {/* Card 1: Cuestionario */}
     <div className="bg-white rounded-lg shadow p-6">
       <h3 className="text-xl font-bold">📝 Cuestionario Vocacional</h3>
       <p className="text-gray-600 mt-2">Descubre tu carrera ideal</p>
       <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
         Comenzar
       </button>
     </div>

     {/* Card 2: Mis Resultados */}
     <div className="bg-white rounded-lg shadow p-6">
       <h3 className="text-xl font-bold">📊 Mis Resultados</h3>
       <p className="text-gray-600 mt-2">Ver mis evaluaciones</p>
       <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
         Ver
       </button>
     </div>

     {/* Card 3: Recomendaciones */}
     <div className="bg-white rounded-lg shadow p-6">
       <h3 className="text-xl font-bold">⭐ Recomendaciones</h3>
       <p className="text-gray-600 mt-2">Carreras sugeridas para ti</p>
       <button className="bg-purple-500 text-white px-4 py-2 rounded mt-4">
         Explorar
       </button>
     </div>
   </div>


4️⃣ USA TAILWIND CSS PARA ESTILOS
   
   No importes CSS adicional, ya está configurado Tailwind.
   
   Ejemplos útiles:
   ───────────────
   • Colores: bg-green-500, text-white, border-blue-300
   • Espaciado: p-6 (padding), m-4 (margin), gap-8 (espacio entre items)
   • Grid: grid grid-cols-3 (3 columnas), grid-cols-2 (2 columnas)
   • Flexbox: flex flex-col (columna), flex-row (fila), justify-center, items-center
   • Tamaños: w-1/2 (50% ancho), max-w-2xl (ancho máximo)
   • Rounded: rounded-lg, rounded-xl
   • Shadow: shadow, shadow-lg
   • Hover: hover:bg-green-600, hover:shadow-xl
   
   📖 Documentación: https://tailwindcss.com


5️⃣ SI NECESITAS DATOS DEL USUARIO
   
   Ya los tienes disponibles:
   
   • profile.nombre (nombre completo)
   • profile.edad
   • profile.ciudad
   • profile.nivel_educativo
   • profile.condiciones_socioeconomicas (es JSON)
   • user.email (correo del usuario)
   
   Ejemplo uso:
   ───────────
   <p>Hola, {profile?.nombre}</p>
   <p>Tu ciudad: {profile?.ciudad}</p>


6️⃣ SI NECESITAS AGREGAR MÁS FUNCIONALIDAD
   
   • Usa useState() para estados internos
   • Usa useEffect() para cargar datos
   • Consulta a la BD con supabase
   
   Ejemplo:
   ───────
   import { useEffect, useState } from 'react';
   import { supabase } from '../../config/supabase';
   
   // Dentro del componente:
   const [resultados, setResultados] = useState(null);
   
   useEffect(() => {
     const fetchResultados = async () => {
       const { data } = await supabase
         .from('RESULTADOS')
         .select('*')
         .eq('perfil_usuario_id', profile.id);
       setResultados(data);
     };
     if (profile?.id) fetchResultados();
   }, [profile?.id]);


7️⃣ CÓMO CONECTAR CON COMPONENTES
   
   Si el compañero crea componentes reutilizables en:
   Frontend > src > components > ...
   
   Puedes importarlos:
   ──────────────────
   import MiComponente from '../../components/MiComponente';
   
   // Usar en el JSX
   <MiComponente data={resultados} />


📋 CHECKLIST ANTES DE COMMITEAR
────────────────────────────────
☐ El dashboard carga sin errores
☐ Se ve bien en diferentes tamaños de pantalla (responsive)
☐ Los datos del usuario se muestran correctamente
☐ Los botones funcionan (al menos el de cerrar sesión)
☐ No hay console.error() o advertencias
☐ El código tiene comentarios donde sea necesario


❓ PREGUNTAS FRECUENTES
──────────────────────

P: ¿Puedo agregar JavaScript personalizado?
R: Sí, usa useState() y useEffect() como en cualquier componente React.

P: ¿Cómo hago un "modal" (ventana emergente)?
R: Usa estado para mostrar/ocultar, y posicionamiento con Tailwind (fixed, z-50, etc.)

P: ¿Cómo consulto la base de datos?
R: Usa supabase. Ejemplos: supabase.from('TABLA').select('*'), .insert(), .update()

P: ¿Debo modificar App.jsx?
R: No es necesario. Trabaja solo en Dashboard.jsx a menos que necesites nuevas rutas.

P: ¿Cómo importo componentes?
R: import NombreComponente from '../../ruta/al/componente';

P: El componente no se actualiza cuando cambio el código
R: Guarda el archivo (Ctrl+S) y espera a que Vite lo recargue (unos 2-3 segundos)


🎨 INSPIRACIÓN Y RECURSOS
─────────────────────────
• Tailwind UI: https://tailwindui.com (ejemplos de componentes)
• Tailwind CSS: https://tailwindcss.com/docs (documentación completa)
• React: https://react.dev (si necesitas revisar hooks como useState)
• Supabase: https://supabase.com/docs (para consultas a BD)


═════════════════════════════════════════════════════════════════════════════

¡Ahora estás listo para diseñar! 🚀

*/
