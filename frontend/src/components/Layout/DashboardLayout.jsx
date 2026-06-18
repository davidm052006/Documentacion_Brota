import Sidebar from './Sidebar';
import UserMenu from '../Shared/UserMenu';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function DashboardLayout({ children, profile, isDemoMode = false }) {
  const [dark, toggleDark] = useDarkMode();

  return (
    <div className="brota-layout relative min-h-screen">
      <div className="absolute inset-0 bg-transparent" />

      <div className="relative flex min-h-screen z-10">
        <Sidebar isDemoMode={isDemoMode} />
        <main className="flex-1 ml-56 min-h-screen bg-transparent">
          <header className="sticky top-0 z-20 flex items-start justify-end gap-3 px-6 pt-7 pb-5">
            {profile && <UserMenu profile={profile} isDemoMode={isDemoMode} />}

            <button
              type="button"
              onClick={toggleDark}
              title={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="w-10 h-10 flex shrink-0 items-center justify-center rounded-full bg-white dark:bg-[#1a2e1f] border border-gray-200 dark:border-[#334155] shadow-sm hover:shadow-md text-base transition-all"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
