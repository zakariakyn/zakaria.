import { useState, useCallback } from 'react'
import { useSite } from '../context/SiteContext'

// Image avec skeleton loading
function ImgWithSkeleton({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  return (
    <div className="relative w-full h-full">
      {!loaded && !error && (
        <div className="absolute inset-0 img-skeleton rounded-none" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => { setError(true); setLoaded(true) }}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}


const filters = [
  { label: 'Tous', value: 'All' },
  { label: 'Apps Android', value: 'Android Apps' },
  { label: 'Sites Web', value: 'Web Apps' },
  { label: 'Full-Stack', value: 'Full-Stack' },
]

export default function Portfolio() {
  const { data } = useSite()
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? data.projects
    : data.projects.filter(p => p.category === active)

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <header className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-4 block font-bold">Nos réalisations</span>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-[-0.04em] leading-tight text-slate-900">Nos Projets</h1>
          <p className="mt-6 text-slate-600 text-lg max-w-xl leading-relaxed">
            Des solutions digitales qui mêlent précision technique et design soigné.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 p-1.5 glass-card rounded-xl self-start md:self-end">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                active === value ? 'hero-gradient text-white shadow-md' : 'text-slate-600 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filtered.map(({ id, title, desc, tags, gradient, icon, link, image }) => (
          <article key={id} className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 reveal">
            <div className={`aspect-[16/9] bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
              {image ? (
                <ImgWithSkeleton src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="material-symbols-outlined text-white/20 select-none" style={{ fontSize: '120px', fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              )}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500"></div>
            </div>
            <div className="p-8">
              <div className="flex gap-2 mb-4 flex-wrap">
                {tags.map(tag => (
                  <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">{tag}</span>
                ))}
              </div>
              <h3 className="font-headline text-2xl font-bold text-slate-900 mb-3 tracking-tight">{title}</h3>
              <p className="text-slate-500 line-clamp-2 mb-6 text-sm leading-relaxed">{desc}</p>
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-700 font-bold text-sm hover:underline">
                  Voir le projet <span className="material-symbols-outlined text-base">open_in_new</span>
                </a>
              ) : (
                <span className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                  Voir le projet <span className="material-symbols-outlined text-base">arrow_forward</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-24 text-center glass-card p-12 rounded-3xl">
        <h2 className="font-headline text-3xl font-bold text-slate-900 mb-4">Votre projet sera le prochain.</h2>
        <p className="text-slate-500 mb-8">Discutons de votre idée — devis gratuit sous 24h.</p>
        <a href={`https://wa.me/${data.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
          <span className="material-symbols-outlined">chat</span>
          Discutons sur WhatsApp
        </a>
      </div>
    </main>
  )
}
