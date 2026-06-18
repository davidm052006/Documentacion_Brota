export default function Terminos() {
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
      <h1 className="text-4xl font-bold">Términos y condiciones</h1>
      <div className="max-w-3xl text-left space-y-4 bg-white/90 rounded-lg p-6">
        <p className="text-lg">
          Al acceder a nuestra plataforma, aceptas y estás de acuerdo con los
          siguientes términos y condiciones:
        </p>
        <p className="text-lg font-semibold">Última actualización: Junio 2026</p>
        <div>
          <p className="text-lg font-semibold">1. Aceptación de los términos</p>
          <p className="text-lg">Al acceder y utilizar la plataforma BROTA, usted acepta cumplir con los presentes Términos y Condiciones. Si no está de acuerdo con alguno de ellos, debe abstenerse de usar el servicio.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">2. Registro de cuenta</p>
          <p className="text-lg">El usuario se compromete a proporcionar información veraz, completa y actualizada al momento de registrarse.</p>
          <p className="text-lg">Es responsabilidad del usuario mantener la confidencialidad de sus credenciales de acceso.</p>
          <p className="text-lg">BROTA no se responsabiliza por el uso indebido de cuentas compartidas o comprometidas.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">3. Uso permitido</p>
          <p className="text-lg">La plataforma se utilizará únicamente con fines de orientación vocacional, educativos y de desarrollo personal.</p>
          <p className="text-lg">Queda prohibido el uso para actividades ilícitas, fraudulentas o que afecten negativamente a terceros.</p>
          <p className="text-lg">BROTA se reserva el derecho de suspender cuentas que incumplan estas normas.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">4. Privacidad y protección de datos</p>
          <p className="text-lg">Los datos personales serán tratados conforme a la Ley 1581 de 2012 de Protección de Datos Personales en Colombia.</p>
          <p className="text-lg">BROTA garantiza que la información recopilada será utilizada únicamente para fines relacionados con la prestación del servicio.</p>
          <p className="text-lg">El usuario puede ejercer sus derechos de acceso, rectificación y supresión de datos enviando una solicitud a nuestro equipo de soporte.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">5. Propiedad intelectual</p>
          <p className="text-lg">Todo el contenido, diseño, logotipos, código fuente y materiales de BROTA son propiedad de sus desarrolladores.</p>
          <p className="text-lg">Está prohibida la reproducción, distribución o modificación sin autorización expresa.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">6. Responsabilidad</p>
          <p className="text-lg">BROTA no se hace responsable por decisiones académicas, laborales o personales tomadas por los usuarios basadas en la información de la plataforma.</p>
          <p className="text-lg">El servicio se ofrece “tal cual”, sin garantías adicionales de disponibilidad o resultados.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">7. Modificaciones</p>
          <p className="text-lg">BROTA se reserva el derecho de actualizar estos términos en cualquier momento.</p>
          <p className="text-lg">Los cambios serán publicados en esta misma sección y entrarán en vigor inmediatamente después de su publicación.</p>
        </div>
        <div>
          <p className="text-lg font-semibold">8. Jurisdicción</p>
          <p className="text-lg">Estos términos se rigen por las leyes de la República de Colombia.</p>
          <p className="text-lg">Cualquier controversia será resuelta ante los tribunales competentes de Bogotá, D.C.</p>
        </div>
      </div>
    </div>
  );
}