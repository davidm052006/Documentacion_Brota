import TopNavbar from './TopNavbar';

export default function DashboardLayout({ children, profile, isDemoMode = false }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
      <TopNavbar profile={profile} isDemoMode={isDemoMode} />
      <main style={{ minHeight: 'calc(100vh - 66px)' }}>
        {children}
      </main>
    </div>
  );
}
