import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// Split nav links into primary and secondary for better layout
const PRIMARY_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Diseases', to: '/diseases' },
  { label: 'Predict', to: '/predict' },
  { label: 'How It Works', to: '/how-it-works' },
];
const SECONDARY_LINKS = [
  { label: 'FAQ', to: '/faq' },
  { label: 'About / Team', to: '/about' },
  { label: 'Contact / Feedback', to: '/contact' },
];

const HeaderBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate?.();
  const [darkMode, setDarkMode] = useState(() => {
    // Default to dark mode if no theme is set
    const stored = localStorage.getItem('theme');
    if (stored === null) return true;
    return stored === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="w-full bg-white/85 dark:bg-gray-900/85 backdrop-blur supports-[backdrop-filter]:bg-white/70 sticky top-0 z-50 transition-colors duration-300 border-b border-gray-200 dark:border-gray-800">
      <div className="page-wrap flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-slate-900 text-white rounded-full font-bold text-xl shadow">VA</span>
          <span className="ml-2 text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">Vision AI</span>
        </div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <div className="flex gap-6">
            {PRIMARY_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({isActive}) => `relative text-sm font-medium transition-colors px-1 ${isActive ? 'text-slate-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'} after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:bg-slate-900 dark:after:bg-white after:transition-all after:duration-200 ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="flex gap-4 ml-6 pl-6 border-l border-gray-300 dark:border-gray-700 text-sm opacity-80">
            {SECONDARY_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({isActive}) => `${isActive ? 'text-slate-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'} font-medium transition-colors px-1`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="flex items-center gap-2">
          {/* Theme toggle button - always visible on mobile, left of Sign In on desktop */}
          <button
            className="inline-flex items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 mr-2 md:mr-0 border border-gray-300 dark:border-gray-700"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            )}
          </button>
          <button onClick={() => navigate && navigate('/predict')} className="hidden md:inline-block px-3 py-2 btn-primary text-white rounded-md font-semibold shadow">Try now</button>
          {/* Mobile menu button */}
          <button
            className="inline-flex md:hidden items-center justify-center w-10 h-10 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 border border-gray-300 dark:border-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col gap-2 px-6 py-4">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({isActive}) => `${isActive ? 'text-slate-900 dark:text-white' : 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'} font-medium transition-colors`}
              >
                {link.label}
              </NavLink>
            ))}
            <button onClick={() => { setMenuOpen(false); navigate && navigate('/predict'); }} className="w-full mt-2 px-4 py-2 btn-primary text-center rounded-md font-semibold shadow">Try now</button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default HeaderBar;
