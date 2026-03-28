import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white w-full pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400 text-xl">terminal</span>
              <span className="text-lg font-headline font-bold text-white">CodeCrafters Studio</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Développement Android & Web de haute qualité depuis Marrakech. Kotlin pour le mobile, React pour le web.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="https://linkedin.com/in/zakaria-kiyani" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-sm">work</span>
              </a>
              <a href="https://wa.me/212687639981" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-sm">chat</span>
              </a>
              <a href="mailto:zakariakiani7@gmail.com"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-500 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-sm">mail</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-1">Navigation</h4>
            {[
              { label: 'Accueil', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Portfolio', path: '/portfolio' },
              { label: 'À propos', path: '/about' },
              { label: 'Tarifs', path: '/pricing' },
            ].map(({ label, path }) => (
              <Link key={path} to={path} className="text-slate-400 hover:text-white transition-colors text-sm">
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-1">Contact</h4>
            <a href="mailto:zakariakiani7@gmail.com" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span> zakariakiani7@gmail.com
            </a>
            <a href="https://wa.me/212687639981" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">chat</span> +212 687 639 981
            </a>
            <a href="https://linkedin.com/in/zakaria-kiyani" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">work</span> linkedin.com/in/zakaria-kiyani
            </a>
            <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
              <span className="material-symbols-outlined text-sm">location_on</span> Guéliz, Marrakech 🇲🇦
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} CodeCrafters Studio — <a href="https://codecraftersstudio.me" className="hover:text-white transition-colors">codecraftersstudio.me</a>
          </p>
          <p className="text-slate-600 text-xs">Fait avec React & ❤️ à Marrakech</p>
        </div>
      </div>
    </footer>
  )
}
