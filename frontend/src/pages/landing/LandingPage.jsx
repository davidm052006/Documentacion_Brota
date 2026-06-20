import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDarkMode } from '../../hooks/useDarkMode';

// ─── Datos de contenido ──────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Servicios',     href: '/servicios' },
  { label: 'Contacto',      href: '/contacto' },
];

const PASOS = [
  {
    numero: '01',
    emoji: '📝',
    titulo: 'Responde el test',
    desc: 'Contesta preguntas sobre tus intereses, habilidades y lo que te apasiona. No hay respuestas correctas ni incorrectas.',
  },
  {
    numero: '02',
    emoji: '🧠',
    titulo: 'Descubre tu perfil',
    desc: 'Obtendrás un perfil vocacional personalizado que refleja quién eres y tus fortalezas reales.',
  },
  {
    numero: '03',
    emoji: '🎓',
    titulo: 'Explora programas',
    desc: 'Te recomendamos carreras, programas y rutas formativas reales: universidades, SENA y más.',
  },
];

const FEATURES = [
  { emoji: '🔬', titulo: 'Basado en ciencia', desc: 'Nuestro modelo se fundamenta en teorías de orientación vocacional reconocidas internacionalmente.' },
  { emoji: '🎯', titulo: 'Perfil único',       desc: 'Tu perfil no es una caja. Es una combinación de categorías que describe tu forma de ver el mundo.' },
  { emoji: '🏫', titulo: 'Programas reales',   desc: 'Conectamos tu perfil con instituciones y programas disponibles en Colombia: universidades, SENA y técnicos.' },
  { emoji: '🌱', titulo: 'Gratis y accesible', desc: 'Brota es gratis para estudiantes. Queremos que ninguna persona tome decisiones sin orientación.' },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar({ dark, toggleDark }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#060d07]/90 backdrop-blur-md border-b border-green-100 dark:border-green-950">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/logo-brota.png" alt="Brota" className="h-9 w-auto" />
          <span className="text-xl font-bold text-green-900 dark:text-green-100 tracking-tight">BROTA</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) =>
            href.startsWith('#') ? (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-gray-600 dark:text-green-200/80 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={href}
                className="text-sm font-medium text-gray-600 dark:text-green-200/80 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            title={dark ? 'Modo claro' : 'Modo oscuro'}
            className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full text-sm bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => navigate('/login')}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-500 rounded-full shadow-sm transition-colors"
          >
            Iniciar sesión
          </button>

          {/* Hamburger mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-green-200 hover:bg-green-50 dark:hover:bg-green-950"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {open && (
        <div className="md:hidden px-6 pb-4 pt-2 border-t border-green-100 dark:border-green-950 bg-white dark:bg-[#060d07] flex flex-col gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-700 dark:text-green-200 py-1"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => navigate('/login')}
            className="mt-2 w-full py-2 text-sm font-semibold text-white bg-green-700 rounded-full"
          >
            Iniciar sesión
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12 md:gap-16">

      {/* Texto */}
      <div className="flex-1 text-center md:text-left">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 px-3 py-1.5 rounded-full mb-6">
          🌱 Orientación vocacional gratuita
        </span>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-green-950 dark:text-green-50 mb-6">
          Descubre<br />
          <em className="not-italic text-green-600 dark:text-green-400">quién</em>{' '}
          quieres<br />
          ser.
        </h1>

        <p className="text-lg text-gray-600 dark:text-green-200/70 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
          Brota te ayuda a conocer tus intereses, habilidades y fortalezas para que puedas elegir
          una carrera o programa con confianza, no con miedo.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-500 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Comenzar gratis →
          </button>
          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-green-800 dark:text-green-300 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 rounded-full transition-all"
          >
            Cómo funciona
          </a>
        </div>

        {/* Mini stats */}
        <div className="flex gap-8 mt-10 justify-center md:justify-start">
          {[
            { n: '100%', label: 'Gratuito' },
            { n: '+15',  label: 'Áreas vocacionales' },
            { n: '3',    label: 'Pasos para tu perfil' },
          ].map(({ n, label }) => (
            <div key={label}>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{n}</p>
              <p className="text-xs text-gray-500 dark:text-green-200/50">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ilustración */}
      <div className="shrink-0 flex items-center justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-950 dark:to-emerald-900 opacity-60" />
          <img
            src="/logo-brota.png"
            alt="Brota — crece tu potencial"
            className="relative w-full h-full object-contain drop-shadow-xl p-6"
          />
        </div>
      </div>

    </section>
  );
}

// ─── Cómo funciona ───────────────────────────────────────────────────────────

function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-green-50 dark:bg-[#0a1a0a] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">Proceso</p>
          <h2 className="text-3xl md:text-4xl font-bold text-green-950 dark:text-green-50">
            Tu camino en 3 pasos
          </h2>
          <p className="text-gray-500 dark:text-green-200/60 mt-3 max-w-md mx-auto">
            En menos de 20 minutos puedes tener claridad sobre tu dirección.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PASOS.map(({ numero, emoji, titulo, desc }) => (
            <div
              key={numero}
              className="bg-white dark:bg-[#0d1f0d] rounded-2xl p-7 border border-green-100 dark:border-green-900 flex flex-col gap-4 hover:shadow-md hover:border-green-300 dark:hover:border-green-700 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{emoji}</span>
                <span className="text-xs font-bold text-green-300 dark:text-green-700">{numero}</span>
              </div>
              <h3 className="text-lg font-bold text-green-900 dark:text-green-100">{titulo}</h3>
              <p className="text-sm text-gray-500 dark:text-green-200/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Filosofía ───────────────────────────────────────────────────────────────

function Filosofia() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row items-center gap-12">

        {/* Icono */}
        <div className="shrink-0 w-40 h-40 rounded-3xl bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 flex items-center justify-center text-6xl shadow-sm">
          🔓
        </div>

        {/* Texto */}
        <div>
          <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-3">Nuestra filosofía</p>
          <h2 className="text-3xl md:text-4xl font-bold text-green-950 dark:text-green-50 mb-5 leading-snug">
            No se trata de elegir{' '}
            <em className="not-italic text-green-600 dark:text-green-400">"bien"</em>.
          </h2>
          <p className="text-gray-600 dark:text-green-200/70 leading-relaxed max-w-xl mb-4">
            Muchos estudiantes sienten que elegir carrera es decidir su futuro para siempre,
            y ese peso paraliza. En Brota creemos que la vocación no es una caja cerrada:
            es un punto de partida.
          </p>
          <p className="text-gray-600 dark:text-green-200/70 leading-relaxed max-w-xl">
            No buscamos la carrera "perfecta" — buscamos la que tiene más afinidad con
            quien eres hoy, con espacio para crecer, cambiar y descubrirte.
          </p>
        </div>

      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section className="bg-green-50 dark:bg-[#0a1a0a] py-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">Por qué Brota</p>
          <h2 className="text-3xl md:text-4xl font-bold text-green-950 dark:text-green-50">
            Diseñado para ti
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ emoji, titulo, desc }) => (
            <div
              key={titulo}
              className="bg-white dark:bg-[#0d1f0d] rounded-2xl p-6 border border-green-100 dark:border-green-900 flex flex-col gap-3 hover:shadow-sm transition-shadow"
            >
              <span className="text-3xl">{emoji}</span>
              <h3 className="font-bold text-green-900 dark:text-green-100">{titulo}</h3>
              <p className="text-sm text-gray-500 dark:text-green-200/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── CTA footer ─────────────────────────────────────────────────────────────

function FooterCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-green-900 dark:bg-green-950 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-4">Empieza hoy</p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Tu futuro empieza<br />con <span className="text-green-400">Brota.</span>
        </h2>
        <p className="text-green-200/70 mb-8 max-w-md mx-auto">
          Únete a estudiantes colombianos que ya están descubriendo su camino.
          Es gratis, es tuyo.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-bold text-green-900 bg-green-400 hover:bg-green-300 rounded-full shadow-lg shadow-green-900/40 transition-all"
        >
          Comenzar ahora →
        </button>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#040a04] dark:bg-[#020602] text-green-200/50">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div className="flex items-center gap-2.5">
          <img src="/logo-brota.png" alt="Brota" className="h-7 w-auto opacity-70" />
          <span className="text-white/70 font-semibold text-sm">BROTA</span>
        </div>

        <nav className="flex gap-6 text-sm flex-wrap">
          {[
            { label: 'Inicio',    to: '/'           },
            { label: 'Servicios', to: '/servicios'  },
            { label: 'Contacto',  to: '/contacto'   },
            { label: 'Privacidad', to: '/privacidad'},
            { label: 'Términos',  to: '/terminos'   },
          ].map(({ label, to }) => (
            <Link key={label} to={to} className="hover:text-green-400 transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-green-200/30">
          © {new Date().getFullYear()} Brota — Colombia
        </p>
      </div>
    </footer>
  );
}

// ─── Página completa ─────────────────────────────────────────────────────────

export default function LandingPage() {
  const [dark, toggleDark] = useDarkMode();

  return (
    <div className="min-h-screen bg-white dark:bg-[#060d07] transition-colors duration-200">
      <Navbar dark={dark} toggleDark={toggleDark} />
      <Hero />
      <ComoFunciona />
      <Filosofia />
      <Features />
      <FooterCTA />
      <Footer />
    </div>
  );
}
