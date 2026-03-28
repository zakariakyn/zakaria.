import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'

const PROCESS_COLORS = ['text-primary','text-slate-700','text-tertiary','text-error','text-primary']

export default function Services() {
  const { data } = useSite()
  const sp = data.servicesPage || {}
  const services = data.services || []
  const process = data.process || []

  const techStack = [
    { icon: 'code', label: 'Kotlin' },
    { icon: 'smartphone', label: 'Android' },
    { icon: 'javascript', label: 'React' },
    { icon: 'data_object', label: 'TypeScript' },
    { icon: 'dns', label: 'Node.js' },
    { icon: 'local_fire_department', label: 'Firebase' },
    { icon: 'account_tree', label: 'Git' },
    { icon: 'draw', label: 'Figma' },
    { icon: 'database', label: 'PostgreSQL' },
    { icon: 'token', label: 'Docker' },
  ]

  return (
    <main className="pt-32 pb-20 overflow-x-hidden">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 mb-32 relative">
        <div className="absolute -top-40 -left-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-3xl">
          <span className="font-label text-primary uppercase tracking-[0.2em] text-xs mb-4 block">
            {sp.badge || 'Notre expertise'}
          </span>
          <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-[-0.04em] text-slate-900 leading-[0.9] mb-8">
            {sp.title || 'Services de'}{' '}
            <span className="text-transparent bg-clip-text hero-gradient">{sp.titleGradient || 'développement'}</span>{' '}
            {sp.titleEnd || 'expert'}
          </h1>
          <p className="text-slate-600 text-xl leading-relaxed max-w-2xl font-light">
            {sp.subtitle || ''}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-7xl mx-auto px-8 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(s => (
            <div key={s.id} className="glass-card p-10 rounded-2xl group hover:bg-white hover:shadow-xl transition-all duration-500 flex flex-col justify-between min-h-[500px]">
              <div>
                <div className={`w-14 h-14 rounded-xl ${s.bg || 'bg-primary/10'} flex items-center justify-center mb-8`}>
                  <span className={`material-symbols-outlined ${s.color || 'text-primary'} text-3xl`}>{s.icon}</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-sm">{s.desc}</p>
                <ul className="space-y-3 mb-10">
                  {(s.features || []).map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className={`material-symbols-outlined ${s.color || 'text-primary'} text-lg flex-shrink-0`}>check_circle</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/contact" className={`${s.color || 'text-primary'} font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform text-sm`}>
                {s.link || 'En savoir plus'} <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-50 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-20 text-center">
            <span className="font-label text-slate-500 uppercase tracking-[0.2em] text-xs mb-4 block">Notre méthode</span>
            <h2 className="font-headline text-5xl font-bold text-slate-900">
              {sp.processTitle || 'Comment on'}{' '}
              <span className="text-primary">{sp.processHighlight || 'travaille'}</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute top-12 left-0 w-full h-px bg-slate-200 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative z-10">
              {process.map((p, i) => (
                <div key={p.id || i} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-md">
                    <span className={`material-symbols-outlined ${PROCESS_COLORS[i % PROCESS_COLORS.length]}`}>{p.icon || 'circle'}</span>
                  </div>
                  <h4 className="font-headline text-lg font-bold text-slate-900 mb-2">{p.label}</h4>
                  <p className="text-slate-500 text-xs font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="font-label text-primary uppercase tracking-[0.2em] text-xs mb-4 block">{sp.stackTitle || 'Nos outils'}</span>
            <h2 className="font-headline text-5xl font-bold text-slate-900 leading-tight">
              On construit avec les technologies <span className="italic font-light">{sp.stackTitleItalic || "standard de l'industrie."}</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm md:w-1/4">{sp.stackSubtitle || ''}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {techStack.map(({ icon, label }) => (
            <div key={label} className="bg-slate-50 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 hover:bg-white hover:shadow-lg transition-all group border border-slate-100 cursor-default">
              <span className="material-symbols-outlined text-primary text-4xl group-hover:scale-110 transition-transform">{icon}</span>
              <span className="font-label uppercase tracking-widest text-[10px] text-slate-600 font-bold">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-24 text-center">
          <Link to="/contact" className="hero-gradient px-10 py-5 rounded-xl text-white font-bold text-lg inline-flex items-center gap-3 hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
            Lancer mon projet <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
