import { useSite } from '../context/SiteContext'
import { useState } from 'react'

export default function Contact() {
  const { data } = useSite()
  const c = data.contact
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1500)
  }

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      {/* ─── Header ─── */}
      <div className="mb-16 md:mb-20">
        <span className="text-primary font-label text-sm uppercase tracking-[0.2em] mb-4 block font-bold">Contactez-nous</span>
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-[-0.04em] text-on-background max-w-3xl">
          Construisons votre <span className="text-gradient">avenir digital.</span>
        </h1>
        <p className="text-slate-500 mt-6 text-lg max-w-xl">Décrivez votre projet — je vous réponds sous 24h avec un devis gratuit et sans engagement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ─── Left: Info ─── */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-8 rounded-2xl space-y-6">
            {/* Email */}
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-label uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:{c.email}" className="font-headline font-bold text-slate-900 hover:text-primary transition-colors text-sm">
                  {c.email}
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* WhatsApp */}
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-[#25D366] flex-shrink-0">
                <span className="material-symbols-outlined">chat</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-label uppercase tracking-widest mb-1">WhatsApp</p>
                <a href="{`https://wa.me/${c.whatsapp}`}" target="_blank" rel="noopener noreferrer" className="font-headline font-bold text-slate-900 hover:text-[#25D366] transition-colors">
                  +212 687 639 981
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* LinkedIn */}
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0A66C2] flex-shrink-0">
                <span className="material-symbols-outlined">work</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-label uppercase tracking-widest mb-1">LinkedIn</p>
                <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="font-headline font-bold text-slate-900 hover:text-[#0A66C2] transition-colors text-sm">
                  linkedin.com/in/zakaria-kiyani
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* GitHub */}
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
                <span className="material-symbols-outlined">code</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-label uppercase tracking-widest mb-1">GitHub</p>
                <a href={c.github} target="_blank" rel="noopener noreferrer" className="font-headline font-bold text-slate-900 hover:text-slate-600 transition-colors text-sm">
                  github.com/zakariakyn
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100"></div>

            {/* Location */}
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-secondary flex-shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-label uppercase tracking-widest mb-1">Localisation</p>
                <p className="font-headline font-bold text-slate-900">{c.location}</p>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="{`https://wa.me/${c.whatsapp}`}"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5c] text-white py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg shadow-green-500/20 hover:scale-[1.02]"
          >
            <span className="material-symbols-outlined">chat</span>
            Écrire sur WhatsApp maintenant
          </a>

          {/* Response time badge */}
          <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></div>
            <p className="text-slate-600 text-sm"><strong>{c.responseTime}</strong> — généralement en quelques heures.</p>
          </div>
        </div>

        {/* ─── Right: Form ─── */}
        <div className="lg:col-span-7">
          <div className="glass-card p-10 md:p-12 rounded-2xl">
            {sent ? (
              <div className="text-center py-16 space-y-6">
                <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto shadow-xl shadow-blue-500/20">
                  <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h3 className="font-headline text-3xl font-bold text-on-background">Message envoyé !</h3>
                <p className="text-slate-500">Je vous répondrai dans les plus brefs délais, généralement sous 24h.</p>
                <a href="{`https://wa.me/${c.whatsapp}`}" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-base">chat</span>
                  Pour aller plus vite — WhatsApp
                </a>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-slate-900 mb-1">Décrivez votre projet</h2>
                  <p className="text-slate-400 text-sm">Tous les champs marqués * sont obligatoires.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-500 text-xs font-label uppercase tracking-widest font-bold">Nom complet *</label>
                    <input
                      type="text"
                      placeholder="Mohammed Alaoui"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 font-headline text-base py-3 transition-colors placeholder:text-slate-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500 text-xs font-label uppercase tracking-widest font-bold">Email professionnel *</label>
                    <input
                      type="email"
                      placeholder="contact@votreentreprise.ma"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 font-headline text-base py-3 transition-colors placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-slate-500 text-xs font-label uppercase tracking-widest font-bold">Service souhaité</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 font-headline text-base py-3 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="">Choisir un service</option>
                      <option>Site web / Landing page</option>
                      <option>Application Android (Kotlin)</option>
                      <option>Web App React / Next.js</option>
                      <option>Solution Full-Stack</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500 text-xs font-label uppercase tracking-widest font-bold">Budget estimé</label>
                    <select
                      value={form.budget}
                      onChange={e => setForm({ ...form, budget: e.target.value })}
                      className="w-full bg-transparent border-b-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 font-headline text-base py-3 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="">Sélectionner</option>
                      <option>Moins de 1 000 MAD</option>
                      <option>1 000 – 2 000 MAD</option>
                      <option>2 000 – 5 000 MAD</option>
                      <option>Plus de 5 000 MAD</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-slate-500 text-xs font-label uppercase tracking-widest font-bold">Détails du projet *</label>
                  <textarea
                    rows={5}
                    placeholder="Décrivez votre projet, vos objectifs, vos délais..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-slate-200 focus:border-primary focus:outline-none text-slate-900 font-headline text-base py-3 transition-colors placeholder:text-slate-300 resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-4 items-start">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !form.name || !form.email || !form.message}
                    className="group hero-gradient text-white px-10 py-4 rounded-xl font-bold text-base uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                  >
                    {loading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">send</span>
                      </>
                    )}
                  </button>
                  <p className="text-slate-400 text-xs flex items-center gap-1 mt-2 sm:mt-3">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    Vos données sont sécurisées et confidentielles.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
