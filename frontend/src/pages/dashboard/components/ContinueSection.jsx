// src/pages/dashboard/components/ContinueSection.jsx
//
// IMAGEN DEL ESTUDIANTE:
// Coloca una ilustración en: src/assets/student-illustration.png
// y reemplaza el emoji del placeholder con:
// <img src="/assets/student-illustration.png" className="w-full h-full object-cover" alt="" />

import ProgressBar from '../../../components/Shared/ProgressBar';
import { useNavigate } from 'react-router-dom';

const MOTIVATIONAL_QUOTE = 'No se trata de tener todas las respuestas, sino de tener la curiosidad de descubrirlas. ¡Tú puedes!';

const MOCK_PROGRESS = {
  title: 'Test vocacional',
  desc: 'Descubre tus intereses y fortalezas',
  pct: 60,
};

export default function ContinueSection() {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-800 mb-3">
        Continúa donde lo dejaste
      </h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        <div className="bg-white dark:bg-[#1a2e1f] rounded-2xl border border-gray-100 dark:border-[#334155] shadow-sm p-5 flex gap-4 items-center">
          <div className="w-20 h-20 rounded-xl bg-green-50 flex items-center justify-center text-4xl shrink-0 overflow-hidden">
            🧑‍🎓
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">{MOCK_PROGRESS.title}</p>
            <p className="text-xs text-gray-500 mb-3">{MOCK_PROGRESS.desc}</p>
            <ProgressBar value={MOCK_PROGRESS.pct} />
            <p className="text-xs text-gray-400 mt-1">{MOCK_PROGRESS.pct}% completado</p>
            <button
              onClick={() => navigate('/dashboard/test')}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Continuar →
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-[#111c14] rounded-2xl border border-gray-100 dark:border-[#334155] p-5 flex items-center gap-3 relative overflow-hidden">
          <span className="text-4xl opacity-10 absolute top-2 left-3 select-none">❝</span>
          <p className="text-sm text-gray-600 leading-relaxed italic relative z-10">
            {MOTIVATIONAL_QUOTE}
          </p>
        </div>
      </div>
    </div>
  );
}
