import Sidebar from './Sidebar';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function DashboardLayout({ children, isDemoMode = false }) {
  const [dark, toggleDark] = useDarkMode();

  return (
    <div className="brota-layout relative min-h-screen">
      <div className="absolute inset-0 bg-transparent" />

      <div className="relative flex min-h-screen z-10">
        <Sidebar isDemoMode={isDemoMode} />
        <main className="flex-1 ml-56 min-h-screen bg-transparent">
          {children}
        </main>
      </div>

      <button
        onClick={toggleDark}
        title={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="fixed top-4 right-4 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#1a2e1f] border border-gray-200 dark:border-[#334155] shadow-sm hover:shadow-md text-base transition-all"
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
