import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Accueil', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'À propos', path: '/about' },
  { label: 'Tarifs', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-xl ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : ''}`}>
        <div className="flex justify-between items-center w-full px-6 md:px-8 py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-blue-700 text-xl">terminal</span>
            <span className="text-lg md:text-xl font-headline font-bold tracking-tighter text-blue-700">CodeCrafters Studio</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 font-headline font-bold tracking-[-0.02em] uppercase text-xs">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={location.pathname === path
                  ? 'text-blue-700 border-b-2 border-blue-700 pb-0.5'
                  : 'text-slate-600 hover:text-purple-600 transition-all duration-300'
                }
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden md:block hero-gradient px-5 py-2 rounded-lg text-white font-bold text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all">
              Devis gratuit
            </Link>
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 text-slate-700" aria-label="Menu">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <div className={`fixed inset-0 z-[200] bg-white transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Top bar */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-700 text-xl">terminal</span>
            <span className="text-lg font-headline font-bold tracking-tighter text-blue-700">CodeCrafters Studio</span>
          </div>
          <button onClick={() => setMenuOpen(false)} className="p-2">
            <span className="material-symbols-outlined text-2xl text-slate-700">close</span>
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-8 pt-10 gap-1">
          {navLinks.map(({ label, path }, i) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={`font-headline font-bold uppercase py-5 border-b border-slate-100 flex items-center justify-between transition-colors ${
                location.pathname === path ? 'text-blue-700 text-2xl' : 'text-slate-800 text-2xl hover:text-blue-700'
              }`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {label}
              <span className="material-symbols-outlined text-slate-300 text-xl">arrow_forward_ios</span>
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 space-y-3">
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="hero-gradient py-4 rounded-xl text-white font-bold text-base uppercase tracking-wider text-center block"
          >
            Demander un devis gratuit
          </Link>
          <a
            href="https://wa.me/212687639981"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366]/10 text-[#075e54] border border-[#25D366]/30 py-4 rounded-xl font-bold text-sm"
          >
            <span className="material-symbols-outlined text-base">chat</span>
            WhatsApp: +212 687 639 981
          </a>
        </div>
      </div>
    </>
  )
}
