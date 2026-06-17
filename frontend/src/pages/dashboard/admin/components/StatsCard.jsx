const COLOR_MAP = {
  green:  { bg: 'bg-green-100',  icon: 'text-green-600'  },
  yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600' },
  blue:   { bg: 'bg-blue-100',   icon: 'text-blue-600'   },
  purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
  red:    { bg: 'bg-red-100',    icon: 'text-red-500'    },
};

export default function StatsCard({ label, value, change, icon, color }) {
  const c = COLOR_MAP[color] || COLOR_MAP.green;
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className={`${c.bg} ${c.icon} w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {/* Solo renderiza el cambio si se pasa el prop (puede ser omitido) */}
          {change && <p className="text-xs text-green-600 mt-0.5">{change}</p>}
        </div>
      </div>
    </div>
  );
}
