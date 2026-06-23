import TopNavbar from './TopNavbar';

export default function DashboardLayout({ children, profile, isDemoMode = false }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d110e]">
      <TopNavbar profile={profile} isDemoMode={isDemoMode} />
      <main className="min-h-[calc(100vh-3.5rem)]">
        {children}
      </main>
    </div>
  );
}
