import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'

const VALUE_COLORS = [
  { color: 'text-primary', border: 'hover:border-primary' },
  { color: 'text-secondary', border: 'hover:border-secondary' },
  { color: 'text-tertiary', border: 'hover:border-tertiary' },
  { color: 'text-primary', border: 'hover:border-primary' },
]

const SKILL_COLORS = ['hero-gradient', 'hero-gradient', 'bg-secondary', 'hero-gradient', 'hero-gradient', 'bg-secondary']

export default function About() {
  const { data } = useSite()
  const a = data.aboutPage || {}
  const c = data.contact || {}
  const values = data.values || []
  const skills = data.skills || []

  return (
    <main className="pt-40 pb-20">

      {/* ─── Hero ─── */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row items-end gap-12">
          <div className="md:w-2/3">
            <span className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4 block font-bold">
              {a.badge || 'Notre histoire'}
            </span>
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-[-0.04em] text-on-background leading-none">
              {a.title || 'Qui sommes-nous ?'}
            </h1>
          </div>
          <div className="md:w-1/3 pb-2">
            <p className="text-xl text-on-surface-variant font-light leading-relaxed">
              {a.subtitle || ''}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Profil ─── */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Photo */}
          <div className="relative">
            <div className="aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
              {a.photo ? (
                <img
                  src={a.photo}
                  alt={a.name || 'Photo'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/20 select-none"
                    style={{ fontSize: '180px', fontVariationSettings: "'FILL' 1" }}>
                    person
                  </span>
                </div>
              )}
            </div>
            {/* Badge dispo */}
            <div className="absolute -bottom-4 -right-4 glass-card px-5 py-3 rounded-2xl shadow-xl border border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="font-bold text-slate-800 text-sm">
                  {a.availableBadge || 'Disponible pour projets'}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary mb-2 block">
                {a.role || 'Développeur freelance'}
              </span>
              <h2 className="font-headline text-4xl font-bold text-slate-900 mb-1">
                {a.name || 'Zakaria Kiyani'}
              </h2>
              <p className="text-slate-500 text-sm">{c.location || 'Marrakech, Maroc 🇲🇦'}</p>
            </div>
            <p className="text-slate-600 leading-relaxed">{a.bio1 || ''}</p>
            <p className="text-slate-600 leading-relaxed">{a.bio2 || ''}</p>

            {/* Liens contact */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={`mailto:${c.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-base">mail</span> Email
              </a>
              <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#075e54] rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-base">chat</span> WhatsApp
              </a>
              <a href={c.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-base">work</span> LinkedIn
              </a>
              <a href={c.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-base">code</span> GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Valeurs ─── */}
      <section className="max-w-7xl mx-auto px-8 mb-32">
        <div className="text-center mb-16">
          <span className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4 block font-bold">Ma philosophie</span>
          <h2 className="font-headline text-5xl font-bold text-on-background tracking-tight">
            {a.valuesTitle || 'Les principes'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const { color, border } = VALUE_COLORS[i % VALUE_COLORS.length]
            return (
              <div key={v.id || i} className={`glass-card p-10 rounded-2xl border-b-2 border-transparent ${border} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                <span className={`material-symbols-outlined ${color} text-4xl mb-6`}>{v.icon || 'star'}</span>
                <h4 className="font-headline text-xl font-bold text-on-background mb-3">{v.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── Compétences ─── */}
      <section className="max-w-7xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/2">
            <span className="font-label text-sm uppercase tracking-[0.2em] text-primary mb-4 block font-bold">Compétences</span>
            <h2 className="font-headline text-5xl font-bold text-on-background tracking-tight mb-8">
              {a.skillsTitle || 'Expertise technique'}
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
              {a.skillsSubtitle || 'Mon stack est taillé pour la performance et la maintenabilité.'}
            </p>
            <Link to="/services" className="hero-gradient px-8 py-4 rounded-xl font-bold text-white inline-flex items-center gap-2 hover:scale-105 transition-transform shadow-md">
              Voir mes services <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="md:w-1/2 flex flex-col gap-6">
            {skills.map((s, i) => {
              const color = SKILL_COLORS[i % SKILL_COLORS.length]
              return (
                <div key={s.id || i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-headline text-slate-900 font-bold text-sm">{s.label}</span>
                    <span className="text-primary font-bold text-sm">{s.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-1000`}
                      style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="hero-gradient p-12 md:p-16 rounded-3xl text-center relative overflow-hidden shadow-xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight relative z-10">
            {a.ctaTitle || 'Travaillons ensemble !'}
          </h2>
          <p className="text-white/80 text-lg mb-8 relative z-10">
            {a.ctaSub || 'Devis gratuit — réponse sous 24h.'}
          </p>
          <Link to="/contact" className="bg-white text-blue-600 font-bold px-10 py-4 rounded-xl inline-block hover:scale-105 transition-transform shadow-xl relative z-10">
            Me contacter
          </Link>
        </div>
      </section>

    </main>
  )
}
