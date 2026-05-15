import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Building, LogOut, ChevronRight } from 'lucide-react';
import Empresas from '../components/Empresas';
import Empleados from '../components/Empleados';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: 'Empresas', path: '/dashboard/empresas', icon: Building },
    { name: 'Empleados', path: '/dashboard/empleados', icon: Users },
  ];

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', background: 'var(--clr-bg-panel)', borderRight: '1px solid var(--clr-bg-elevated)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--clr-bg-elevated)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--clr-primary)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
            <LayoutDashboard size={20} color="white" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Taller API</h2>
        </div>

        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--clr-bg-elevated)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--clr-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={20} color="var(--clr-text-muted)" />
            </div>
            <div>
              <div style={{ fontWeight: 500 }}>{user?.username}</div>
              <span className={`badge ${user?.role === 'admin' ? 'badge-admin' : 'badge-user'}`} style={{ fontSize: '0.65rem' }}>
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 1rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--clr-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', paddingLeft: '0.5rem' }}>
            Menú
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.includes(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
                      background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                      color: isActive ? 'var(--clr-primary)' : 'var(--clr-text-muted)',
                      fontWeight: isActive ? 600 : 400,
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = 'var(--clr-text-main)'; e.currentTarget.style.background = 'var(--clr-bg-elevated)'; }}}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = 'var(--clr-text-muted)'; e.currentTarget.style.background = 'transparent'; } }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Icon size={18} />
                      {item.name}
                    </div>
                    {isActive && <ChevronRight size={16} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid var(--clr-bg-elevated)' }}>
          <button
            onClick={logout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--clr-danger)', color: 'var(--clr-danger)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--clr-bg-base)', overflowY: 'auto' }}>
        <header style={{ padding: '1.5rem 3rem', borderBottom: '1px solid var(--clr-bg-elevated)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Resumen del Sistema</h1>
        </header>
        <div style={{ padding: '2rem 3rem', flex: 1 }}>
          <div className="glass-panel animate-enter" style={{ minHeight: '100%' }}>
            <Routes>
              <Route path="/" element={<div style={{ textAlign: 'center', padding: '4rem', color: 'var(--clr-text-muted)' }}><LayoutDashboard size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} /><h2>Bienvenido a tu Panel de Control</h2><p>Selecciona una opción del menú para comenzar.</p></div>} />
              <Route path="/empresas" element={<Empresas />} />
              <Route path="/empleados" element={<Empleados />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

function UserIcon({ size = 24, color, ...props }: { size?: number; color?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
