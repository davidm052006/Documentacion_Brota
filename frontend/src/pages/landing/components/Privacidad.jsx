export default function Privacidad() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 mt-10 text-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/fondo-planta-crema.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="text-4xl font-bold">Política de privacidad</h1>
      <div className="max-w-3xl text-left space-y-4 bg-white/90 rounded-lg p-6">
        <p className="text-lg">
          BROTA se reserva el derecho de actualizar esta política de privacidad en cualquier momento.
        </p>
        <p className="text-lg font-semibold">Última actualización: Junio 2026</p>
        <div>
          <p className="text-lg font-semibold">1.Recopilación de datos</p>
          <p className="text-lg">BROTA recopila información personal como nombre, correo electrónico y datos académicos para ofrecer orientación vocacional.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">2. Uso de la información</p>
          <p className="text-lg">Los datos se utilizan únicamente para personalizar la experiencia del usuario y mejorar el servicio.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">3. Protección de datos</p>
          <p className="text-lg">BROTA aplica medidas de seguridad técnicas y organizativas para proteger la información.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">4. Compartición de datos</p>
          <p className="text-lg">No se comparten datos con terceros sin consentimiento, salvo obligación legal.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">5. Derechos del usuario</p>
          <p className="text-lg">El usuario puede solicitar acceso, rectificación o eliminación de sus datos conforme a la Ley 1581 de 2012 en Colombia.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">6. Cookies y tecnologías similares</p>
          <p className="text-lg">Se utilizan para mejorar la experiencia de navegación y análisis de uso.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">7. Modificaciones</p>
          <p className="text-lg">BROTA puede actualizar esta política en cualquier momento, notificando los cambios en la plataforma.</p>
        </div>
      </div>
    </div>
  );
}