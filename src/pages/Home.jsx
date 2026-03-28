import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'

const techBadges = [
  { icon: 'smartphone', label: 'Kotlin', color: 'text-primary', delay: '3s' },
  { icon: 'language', label: 'React', color: 'text-secondary', delay: '4s' },
  { icon: 'local_fire_department', label: 'Firebase', color: 'text-tertiary', delay: '3.5s' },
  { icon: 'code', label: 'TypeScript', color: 'text-primary', delay: '4.5s' },
]

const services = [
  { icon: 'smartphone', title: 'Android', desc: 'Applications natives performantes avec Kotlin et Jetpack Compose.', color: 'text-primary', bg: 'bg-primary/10', linkColor: 'text-primary' },
  { icon: 'monitor', title: 'Web', desc: 'Sites et web apps modernes, rapides et optimisés SEO avec React.', color: 'text-secondary', bg: 'bg-secondary/10', linkColor: 'text-secondary' },
  { icon: 'bolt', title: 'Full-Stack', desc: 'Solutions complètes : backend Kotlin, frontend React, cloud.', color: 'text-tertiary', bg: 'bg-tertiary/10', linkColor: 'text-tertiary' },
]

export default function Home() {
  const { data } = useSite()
  const { hero, stats, projects, testimonials } = data

  // Show first 3 projects on home
  const featuredProjects = projects.slice(0, 3)

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 px-8 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container rounded-full blob"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary-container rounded-full blob"></div>
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-variant border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-label uppercase tracking-[0.2em] text-on-surface-variant">{hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.9] tracking-[-0.04em] text-slate-900">
              {hero.title} <span className="text-gradient">{hero.titleGradient}</span> {hero.titleEnd}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl font-light leading-relaxed">
              {hero.subtitle} <span className="text-primary font-medium">{hero.subtitleHighlight}</span> {hero.subtitleEnd}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/portfolio" className="hero-gradient px-8 py-4 rounded-lg text-white font-bold text-lg hover:shadow-[0_10px_30px_-5px_rgba(79,142,247,0.4)] transition-all active:scale-95">
                {hero.ctaPrimary}
              </Link>
              <Link to="/contact" className="glass-card px-8 py-4 rounded-lg text-slate-800 font-medium text-lg hover:bg-white transition-colors border border-outline-variant active:scale-95">
                {hero.ctaSecondary}
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 pt-12">
              {techBadges.map(({ icon, label, color, delay }) => (
                <div key={label} className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl animate-bounce shadow-sm" style={{ animationDuration: delay }}>
                  <span className={`material-symbols-outlined ${color}`}>{icon}</span>
                  <span className="font-label text-sm font-semibold text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-surface py-16 border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-headline font-bold text-slate-900">{value}</div>
              <div className="text-xs font-label uppercase tracking-widest text-on-surface-variant">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Services Preview ─── */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-label uppercase tracking-[0.3em] text-primary block mb-4">Ce qu'on fait</span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 leading-tight">Experts du<br/>Digital Marocain</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map(({ icon, title, desc, color, bg, linkColor }) => (
              <div key={title} className="glass-card p-10 rounded-2xl group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal">
                <div className={`w-14 h-14 rounded-xl ${bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <span className={`material-symbols-outlined ${color} text-3xl`}>{icon}</span>
                </div>
                <h3 className="text-2xl font-headline font-bold text-slate-900 mb-4">{title}</h3>
                <p className="text-slate-600 leading-relaxed mb-8">{desc}</p>
                <Link to="/services" className={`${linkColor} font-bold inline-flex items-center gap-2 group-hover:gap-4 transition-all`}>
                  En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/services" className="text-slate-500 hover:text-slate-900 font-label uppercase tracking-widest text-sm transition-colors">
              Voir tous nos services →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Projects (from context) ─── */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <span className="text-xs font-label uppercase tracking-[0.3em] text-secondary block mb-4">Nos réalisations</span>
              <h2 className="text-4xl md:text-6xl font-headline font-bold text-slate-900 tracking-tighter">Projets phares</h2>
            </div>
            <p className="text-slate-600 max-w-sm">Du concept à la production, des solutions sur mesure qui redéfinissent votre secteur.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProjects.map((project, i) => (
              <div key={project.id} className={`group reveal ${i === 1 ? 'md:mt-24' : ''}`}>
                <div className={`aspect-[4/5] rounded-2xl overflow-hidden mb-6 relative shadow-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="material-symbols-outlined text-white/25 select-none" style={{ fontSize: '100px', fontVariationSettings: "'FILL' 1" }}>{project.icon}</span>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 flex gap-1.5 flex-wrap">
                    {project.tags.slice(0, 1).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white text-slate-900 text-xs font-bold rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-headline font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 font-body text-sm">{project.desc}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary font-bold text-sm mt-2 hover:underline">
                    Voir le projet <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/portfolio" className="inline-flex items-center gap-2 hero-gradient text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-md">
              Voir tous les projets <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-slate-900">Ils nous font confiance</h2>
        </div>
        <div className="flex overflow-x-hidden relative">
          <div className="flex animate-marquee whitespace-nowrap gap-8 py-8">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl w-96 flex-shrink-0 whitespace-normal shadow-sm">
                <span className={`material-symbols-outlined ${t.color} mb-6`}>format_quote</span>
                <p className="text-slate-700 italic mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold">{t.name}</div>
                    <div className={`text-xs ${t.color} font-label font-semibold`}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="hero-gradient p-12 md:p-24 rounded-[2rem] text-center space-y-8 relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h2 className="text-4xl md:text-7xl font-headline font-bold text-white tracking-tighter relative z-10">Prêt à lancer<br/>votre projet ?</h2>
            <p className="text-white/90 text-xl font-medium max-w-xl mx-auto relative z-10">
              Construisons quelque chose d'extraordinaire ensemble. Devis gratuit sous 24h.
            </p>
            <div className="pt-4 relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white px-10 py-5 rounded-xl text-blue-600 font-bold text-xl hover:scale-105 transition-transform shadow-xl active:scale-95 inline-block">
                Démarrer maintenant
              </Link>
              <a
                href={`https://wa.me/${data.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/50 px-10 py-5 rounded-xl text-white font-bold text-xl hover:bg-white/10 transition-colors inline-flex items-center gap-3 justify-center"
              >
                <span className="material-symbols-outlined">chat</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
