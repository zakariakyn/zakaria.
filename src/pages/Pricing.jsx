import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSite } from '../context/SiteContext'

export default function Pricing() {
  const { data } = useSite()
  const pp = data.pricingPage || {}
  const plans = data.pricing || []
  const faqs = data.faqs || []
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <main className="pt-32 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 text-center mb-16">
        <span className="font-label text-primary uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
          {pp.badge || 'Nos offres'}
        </span>
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface tracking-[-0.04em] mb-6">
          {pp.title || 'Prix transparents'}
        </h1>
        <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
          {pp.subtitle || ''}
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 items-start">
        {plans.map(plan => (
          plan.recommended ? (
            <div key={plan.id} className="gradient-border rounded-xl transform md:scale-105 z-10 shadow-2xl">
              <div className="bg-white p-8 rounded-[11px] h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-4 right-4 px-3 py-1 hero-gradient rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                  Recommandé
                </div>
                <PlanContent plan={plan} recommended />
              </div>
            </div>
          ) : (
            <div key={plan.id} className="glass-card p-8 rounded-xl flex flex-col h-full border border-outline/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <PlanContent plan={plan} />
            </div>
          )
        ))}
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-8">
        <h2 className="font-headline text-3xl font-bold text-on-surface mb-12 text-center">
          {pp.faqTitle || 'Questions fréquentes'}
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={f.id || i} className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center text-on-surface font-medium hover:bg-primary/5 transition-colors"
              >
                <span>{f.q}</span>
                <span className="material-symbols-outlined text-primary">{openFaq === i ? 'remove' : 'add'}</span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function PlanContent({ plan, recommended = false }) {
  return (
    <>
      <div className="mb-8">
        <h3 className="font-headline text-2xl text-on-surface mb-2">{plan.name}</h3>
        <p className="text-on-surface-variant text-sm">{plan.desc}</p>
      </div>
      <div className="mb-8">
        <span className="text-4xl font-bold text-on-surface font-headline">{plan.price}</span>
        {plan.price !== 'Sur devis' && <span className="text-on-surface-variant text-sm">/projet</span>}
      </div>
      <ul className="space-y-4 mb-12 flex-grow">
        {(plan.features || []).map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-on-surface">
            <span className="material-symbols-outlined text-primary text-lg"
              style={recommended ? { fontVariationSettings: "'FILL' 1" } : {}}>
              check_circle
            </span>
            {f}
          </li>
        ))}
        {(plan.unavailable || []).map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-on-surface-variant/50">
            <span className="material-symbols-outlined text-lg">block</span>
            {f}
          </li>
        ))}
      </ul>
      <Link to="/contact"
        className={`w-full py-4 rounded-lg font-bold text-center block transition-all ${
          recommended
            ? 'hero-gradient text-white shadow-xl hover:opacity-90'
            : plan.name === 'Sur-mesure'
            ? 'border border-secondary text-secondary hover:bg-secondary/5'
            : 'border border-outline text-on-surface hover:bg-surface-container'
        }`}>
        {plan.name === 'Essentiel' ? 'Démarrer' : plan.name === 'Pro' ? 'Choisir Pro' : 'Nous contacter'}
      </Link>
    </>
  )
}
