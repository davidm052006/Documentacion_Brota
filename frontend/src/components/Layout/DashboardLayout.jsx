// src/components/Layout/DashboardLayout.jsx
import Sidebar from "./Sidebar";
import UserMenu from "../Shared/UserMenu"; // tu componente de menú

export default function DashboardLayout({ children, isDemoMode = false }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-100 to-emerald-300">
      <div className="absolute inset-0 bg-transparent" />

      <div className="relative flex min-h-screen z-10">
        <Sidebar isDemoMode={isDemoMode} />
        
        <main className="flex-1 ml-56 min-h-screen bg-transparent">
          {/* Header con menú de usuario */}
          <header className="flex justify-end p-4 bg-emerald-200">
            <UserMenu />
          </header>

          {children}
        </main>
      </div>
    </div>
  );
}
