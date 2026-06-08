// src/components/Layout/DashboardLayout.jsx
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, isDemoMode = false }) {
  return (
    <div class="flex min-h-screen bg-gray-50">
      <Sidebar isDemoMode={isDemoMode} />
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
    </div>
  );
}
