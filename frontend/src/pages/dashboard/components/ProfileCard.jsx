// src/pages/dashboard/components/ProfileCard.jsx
export default function ProfileCard({ profile, userEmail }) {
  const fields = [
    { icon: '👤', label: 'Nombre',            value: `${profile?.nombre ?? ''} ${profile?.apellido ?? ''}`.trim() || '—' },
    { icon: '✉️', label: 'Correo electrónico', value: userEmail || '—' },
    { icon: '📅', label: 'Edad',              value: profile?.edad ? `${profile.edad} años` : '—' },
    { icon: '📍', label: 'Ciudad',            value: profile?.ciudad || '—' },
    { icon: '🎓', label: 'Nivel educativo',   value: profile?.nivel_educativo || '—' },
    { icon: '📊', label: 'Grado',             value: profile?.grado ? `${profile.grado}°` : '—' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-gray-400 text-lg">👤</span>
        <h2 className="text-base font-semibold text-gray-800">Tu perfil</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {fields.map(({ icon, label, value }) => (
          <div key={label}>
            <p className="text-[11px] text-gray-400 mb-0.5 flex items-center gap-1">
              <span>{icon}</span> {label}
            </p>
            <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
