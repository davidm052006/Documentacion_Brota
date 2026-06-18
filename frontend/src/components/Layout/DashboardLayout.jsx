// src/components/Layout/DashboardLayout.jsx
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, isDemoMode = false }) {
  return (
    <div className="brota-layout relative min-h-screen">
      <div className="absolute inset-0 bg-transparent" />

      <div className="relative flex min-h-screen z-10">
        <Sidebar isDemoMode={isDemoMode} />
        {/* Margen izquierdo igual al ancho del sidebar (w-56 = 224px) */}
        <main className="flex-1 ml-56 min-h-screen bg-transparent">
          {children}
        </main>
      </div>
    </div>
  );
}