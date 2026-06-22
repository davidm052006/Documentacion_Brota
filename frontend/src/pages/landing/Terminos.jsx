export default function Terminos() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#111318]">

      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#111318]/90 backdrop-blur-sm border-b border-gray-100 dark:border-[#2c3140]">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            ← Volver
          </a>
          <img
            src="/logo-brota.png" alt="BROTA"        
            className="h-16 w-auto"
        />
        <span className="text-lg font-bold text-emerald-800 dark:text-emerald-600">BROTA</span>
          <span className="text-gray-200 dark:text-gray-700">|</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Términos y Condiciones</span>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Última actualización: <span className="font-medium">Junio de 2026</span>
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-emerald-400 pl-4">
            Al acceder o utilizar BROTA aceptas estos términos.
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">01 · Aceptación</h2>
            <p>Al acceder, registrarse o utilizar la plataforma BROTA, el usuario declara haber leído, comprendido y aceptado los presentes Términos y Condiciones.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">02 · Objeto de la Plataforma</h2>
            <p className="mb-2">BROTA facilita procesos de perfilamiento ocupacional, orientación profesional y recomendación de oportunidades educativas.</p>
            <p className="text-xs text-gray-400 italic">BROTA actúa como intermediario tecnológico y no garantiza la obtención de empleo, becas o admisiones.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">03 · Registro de Usuarios</h2>
            <p className="mb-2">Para acceder a determinadas funcionalidades deberás crear una cuenta. Te comprometes a:</p>
            <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Proporcionar información veraz y actualizada.</li>
              <li>Mantener la confidencialidad de tus credenciales.</li>
              <li>No compartir tu cuenta con terceros.</li>
              <li>Notificar cualquier uso no autorizado.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">04 · Obligaciones del Usuario</h2>
            <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Utilizar la plataforma de manera responsable.</li>
              <li>Respetar los derechos de terceros.</li>
              <li>Suministrar información veraz.</li>
              <li>No utilizar la plataforma para actividades ilícitas.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">05 · Conductas Prohibidas</h2>
            <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Suplantar identidades.</li>
              <li>Crear cuentas fraudulentas.</li>
              <li>Introducir virus o código malicioso.</li>
              <li>Publicar contenido ilegal u ofensivo.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">06 · Propiedad Intelectual</h2>
            <p>Todos los elementos de la plataforma son propiedad de BROTA o sus respectivos titulares y están protegidos por la legislación aplicable.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">07 · Limitación de Responsabilidad</h2>
            <p className="mb-2">BROTA no será responsable por decisiones de terceros, rechazos en procesos de selección ni resultados obtenidos por el usuario.</p>
            <p className="text-xs text-gray-400 italic">El uso de la plataforma se realiza bajo responsabilidad del usuario.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">08 · Protección de Datos Personales</h2>
            <p>
              El tratamiento de los datos personales se realiza conforme a nuestra{' '}
              <a href="/privacidad" className="text-emerald-600 hover:underline">Política de Privacidad</a>.
            </p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">09 · Modificaciones</h2>
            <p>BROTA podrá modificar estos Términos en cualquier momento. Las modificaciones entrarán en vigor desde su publicación.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">10 · Legislación Aplicable</h2>
            <p>Estos Términos se rigen por las leyes de la República de Colombia.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">11 · Contacto</h2>
            <p className="mb-3">Para dudas, soporte o consultas generales puedes usar nuestro formulario de contacto.</p>
            <a
              href="/contacto"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              📬 Ir al formulario de contacto →
            </a>
          </section>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#2c3140] flex gap-6 text-xs text-gray-400">
          <a href="/" className="hover:text-emerald-600 transition-colors">Volver al inicio</a>
          <a href="/privacidad" className="hover:text-emerald-600 transition-colors">Política de Privacidad</a>
          <a href="/contacto" className="hover:text-emerald-600 transition-colors">Contacto</a>
        </div>
      </div>
    </div>
  );
}
