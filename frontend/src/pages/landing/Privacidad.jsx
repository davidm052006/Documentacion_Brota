export default function Privacidad() {
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
          <span className="text-gray-200 dark:text-gray-700">|</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Política de Privacidad</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Política de Tratamiento de Datos Personales
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Última actualización: <span className="font-medium">Junio de 2026</span>
          </p>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-emerald-400 pl-4">
            En BROTA respetamos tu privacidad y protegemos tus datos personales conforme a la Ley 1581 de 2012 (Colombia).
          </p>
        </div>

        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">01 · Responsable del Tratamiento</h2>
            <p className="mb-1"><strong>BROTA</strong> — Plataforma de orientación vocacional</p>
            <p>Para consultas sobre privacidad puedes contactarnos a través de nuestro{' '}
              <a href="/contacto" className="text-emerald-600 hover:underline">formulario de contacto</a>.
            </p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">02 · Datos que Recolectamos</h2>
            <p className="mb-2">Recolectamos únicamente los datos necesarios para prestarte el servicio:</p>
            <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Nombre y apellidos</li>
              <li>Correo electrónico</li>
              <li>Nivel educativo, grado y edad</li>
              <li>Ciudad de residencia y teléfono (opcional)</li>
              <li>Respuestas al cuestionario vocacional</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">03 · Finalidades del Tratamiento</h2>
            <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Generar tu perfil vocacional personalizado.</li>
              <li>Recomendarte programas educativos adecuados a tu perfil.</li>
              <li>Gestionar tu cuenta y autenticación.</li>
              <li>Mejorar continuamente la plataforma.</li>
              <li>Cumplir obligaciones legales.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">04 · Base Legal</h2>
            <p>El tratamiento se realiza con base en tu consentimiento expreso al registrarte en la plataforma y aceptar esta política.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">05 · Compartición de Datos</h2>
            <p className="mb-2">No vendemos ni compartimos tus datos personales con terceros, excepto:</p>
            <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
              <li>Proveedores tecnológicos esenciales (Supabase para base de datos y autenticación).</li>
              <li>Requerimientos legales o judiciales.</li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">06 · Almacenamiento y Seguridad</h2>
            <p>Tus datos se almacenan en servidores seguros con cifrado en tránsito (HTTPS) y en reposo. Implementamos medidas técnicas y organizativas para proteger tu información.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">07 · Tus Derechos (ARCO)</h2>
            <p className="mb-2">Como titular de los datos tienes derecho a:</p>
            <ul className="space-y-1 list-disc list-inside text-gray-600 dark:text-gray-400">
              <li><strong>Acceder</strong> a tus datos personales.</li>
              <li><strong>Rectificar</strong> información incorrecta.</li>
              <li><strong>Cancelar</strong> (eliminar) tu cuenta y datos.</li>
              <li><strong>Oponerte</strong> a ciertos tratamientos.</li>
            </ul>
            <p className="mt-3">
              Para ejercer tus derechos usa nuestro{' '}
              <a href="/contacto" className="text-emerald-600 hover:underline">formulario de contacto</a>.
            </p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">08 · Cookies y Almacenamiento Local</h2>
            <p>Utilizamos <code className="bg-gray-100 dark:bg-[#2c3140] px-1 rounded text-xs">localStorage</code> del navegador para mantener tu sesión y preferencias. No usamos cookies de rastreo de terceros.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">09 · Retención de Datos</h2>
            <p>Conservamos tus datos mientras tu cuenta esté activa. Puedes solicitar la eliminación en cualquier momento.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">10 · Modificaciones</h2>
            <p>BROTA podrá actualizar esta política. El uso continuo después de la publicación implica aceptación.</p>
          </section>

          <section className="bg-white dark:bg-[#1a1d24] rounded-2xl border border-gray-100 dark:border-[#2c3140] p-6">
            <h2 className="font-bold text-gray-800 dark:text-gray-100 mb-2">11 · Contacto</h2>
            <p className="mb-3">Para dudas o ejercicio de derechos relacionados con tus datos personales:</p>
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
          <a href="/terminos" className="hover:text-emerald-600 transition-colors">Términos y Condiciones</a>
          <a href="/contacto" className="hover:text-emerald-600 transition-colors">Contacto</a>
        </div>
      </div>
    </div>
  );
}
