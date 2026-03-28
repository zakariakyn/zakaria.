import { createContext, useContext, useState, useEffect } from 'react'

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────
export const DEFAULT_DATA = {
  brand: {
    name: 'CodeCrafters Studio',
    tagline: 'Développement Android & Web de haute qualité depuis Marrakech.',
    domain: 'codecraftersstudio.me',
    logo: '',
  },
  contact: {
    email: 'zakariakiani7@gmail.com',
    whatsapp: '212687639981',
    linkedin: 'https://linkedin.com/in/zakaria-kiyani',
    github: 'https://github.com/zakariakyn',
    location: 'Guéliz, Marrakech 🇲🇦',
    responseTime: 'Réponse garantie sous 24h',
  },
  hero: {
    badge: '🇲🇦 Basé à Marrakech, Maroc',
    title: 'Vos',
    titleGradient: 'Apps Android',
    titleEnd: '& Sites Web sur mesure',
    subtitle: 'Kotlin pour le mobile. React pour le web.',
    subtitleHighlight: 'Conçu pour performer',
    subtitleEnd: 'à la hauteur de votre ambition.',
    ctaPrimary: 'Voir nos projets',
    ctaSecondary: 'Demander un devis',
    ctaBannerTitle: 'Prêt à lancer\nvotre projet ?',
    ctaBannerSub: "Construisons quelque chose d'extraordinaire ensemble. Devis gratuit sous 24h.",
    ctaBannerBtn: 'Démarrer maintenant',
  },
  stats: [
    { value: '30+', label: 'Projets livrés' },
    { value: '20+', label: 'Clients satisfaits' },
    { value: '2+', label: "Ans d'expérience" },
    { value: '100%', label: 'Satisfaction client' },
  ],
  servicesPage: {
    badge: 'Notre expertise',
    title: 'Services de',
    titleGradient: 'développement',
    titleEnd: 'expert',
    subtitle: "Nous transformons vos idées en produits digitaux performants.",
    processTitle: 'Comment on',
    processHighlight: 'travaille',
    stackTitle: 'Nos outils',
    stackTitleItalic: "standard de l'industrie.",
    stackSubtitle: "Expertise en langages et frameworks modernes.",
  },
  services: [
    { id: 1, icon: 'android', title: 'Développement Android', desc: "Applications natives hautes performances.", features: ['Code Kotlin moderne & propre', 'Material Design 3 & Jetpack Compose', 'Architecture offline-first', 'Publication Google Play Store'], link: 'Explorer les apps Kotlin', color: 'text-primary', bg: 'bg-primary/10' },
    { id: 2, icon: 'language', title: 'Développement Web', desc: 'Sites et web apps dynamiques.', features: ['React & Next.js SPAs', 'Tableaux de bord entreprise', 'E-commerce & landing pages', 'SEO & performance optimisés'], link: 'Voir les solutions React', color: 'text-slate-900', bg: 'bg-secondary-container' },
    { id: 3, icon: 'hub', title: 'Solution Full-Stack', desc: "Solution digitale complète et scalable.", features: ['Architecture backend Kotlin', 'APIs REST scalables', 'Intégration Firebase & Cloud', 'Déploiement CI/CD & Docker'], link: 'Construire en Full-Stack', color: 'text-tertiary', bg: 'bg-tertiary/10' },
  ],
  process: [
    { id: 1, icon: 'search', label: 'Découverte', desc: 'Analyse de vos besoins.' },
    { id: 2, icon: 'palette', label: 'Design', desc: "Maquettes UI/UX." },
    { id: 3, icon: 'code', label: 'Développement', desc: 'Code propre, itératif.' },
    { id: 4, icon: 'bug_report', label: 'Tests', desc: 'QA rigoureux.' },
    { id: 5, icon: 'rocket_launch', label: 'Livraison', desc: 'Déploiement fluide.' },
  ],
  portfolioPage: {
    badge: 'Nos réalisations',
    title: 'Nos Projets',
    subtitle: 'Des solutions digitales qui mêlent précision technique et design soigné.',
    ctaTitle: 'Votre projet sera le prochain.',
    ctaSubtitle: 'Discutons de votre idée — devis gratuit sous 24h.',
    ctaBtn: 'Discutons sur WhatsApp',
  },
  projects: [
    { id: 1, title: 'Nova Fitness', desc: "Suivi biométrique en temps réel.", tags: ['Kotlin', 'Firebase'], category: 'Android Apps', gradient: 'from-blue-500 to-indigo-700', icon: 'fitness_center', link: '', image: '' },
    { id: 2, title: 'Lumina CRM', desc: 'Dashboard éditorial pour équipes commerciales.', tags: ['React', 'Tailwind'], category: 'Web Apps', gradient: 'from-purple-500 to-pink-600', icon: 'dashboard', link: '', image: '' },
    { id: 3, title: 'EcoTrack Mobile', desc: "Outil d'audit environnemental offline-first.", tags: ['Android Jetpack'], category: 'Android Apps', gradient: 'from-emerald-500 to-teal-700', icon: 'eco', link: '', image: '' },
    { id: 4, title: 'Vortex API Gateway', desc: 'Middleware enterprise 2M+ requêtes/heure.', tags: ['Node.js', 'PostgreSQL'], category: 'Full-Stack', gradient: 'from-orange-500 to-red-600', icon: 'hub', link: '', image: '' },
    { id: 5, title: 'Aura Music Player', desc: 'Lecteur audio Material You.', tags: ['Kotlin', 'Compose'], category: 'Android Apps', gradient: 'from-violet-500 to-fuchsia-700', icon: 'music_note', link: '', image: '' },
    { id: 6, title: 'Summit Portfolio', desc: "Expérience web immersive pour architecture.", tags: ['React', 'Next.js'], category: 'Web Apps', gradient: 'from-cyan-500 to-blue-600', icon: 'architecture', link: '', image: '' },
  ],
  aboutPage: {
    badge: 'Notre histoire',
    title: 'Qui sommes-nous ?',
    subtitle: 'Développeur freelance basé à Marrakech.',
    name: 'Zakaria Kiyani',
    role: 'Développeur fullstack freelance',
    availableBadge: 'Disponible pour projets',
    bio1: "Chez CodeCrafters Studio, on ne fait pas que du code — on conçoit des expériences.",
    bio2: "Chaque projet est traité comme s'il était le mien : avec soin, rigueur et créativité.",
    photo: '',
    valuesTitle: 'Les principes',
    skillsTitle: 'Expertise technique',
    skillsSubtitle: "Mon stack est taillé pour la performance et la maintenabilité.",
    ctaTitle: 'Travaillons ensemble !',
    ctaSub: 'Devis gratuit — réponse sous 24h.',
  },
  values: [
    { id: 1, icon: 'verified', title: 'Qualité', desc: 'Code propre, testé et documenté.' },
    { id: 2, icon: 'bolt', title: 'Rapidité', desc: 'Livraison rapide sans compromis.' },
    { id: 3, icon: 'chat_bubble', title: 'Communication', desc: 'Transparence totale.' },
    { id: 4, icon: 'lightbulb', title: 'Innovation', desc: "Toujours à la pointe." },
  ],
  skills: [
    { id: 1, label: 'Kotlin / Android', pct: 90 },
    { id: 2, label: 'React / Next.js', pct: 95 },
    { id: 3, label: 'UI/UX Design', pct: 85 },
    { id: 4, label: 'Firebase / Cloud', pct: 80 },
    { id: 5, label: 'TypeScript', pct: 88 },
    { id: 6, label: 'REST APIs', pct: 85 },
  ],
  pricingPage: {
    badge: 'Nos offres',
    title: 'Prix transparents',
    subtitle: "Scale your digital presence. No hidden fees, just pure execution.",
    faqTitle: 'Questions fréquentes',
  },
  pricing: [
    { id: 1, name: 'Essentiel', price: '1 000 MAD', desc: 'Idéal pour démarrer.', features: ['Landing page unique', 'Design responsive moderne', 'Formulaire de contact intégré'], unavailable: ['Intégration CMS'], recommended: false },
    { id: 2, name: 'Pro', price: '2 000 MAD', desc: 'Pour les projets ambitieux.', features: ["Jusqu'à 5 pages + Blog", 'Application Android sur mesure', 'SEO avancé & optimisation', 'Support prioritaire 7j/7'], unavailable: [], recommended: true },
    { id: 3, name: 'Sur-mesure', price: 'Sur devis', desc: 'Solution complète.', features: ['Architecture Full-Stack complète', 'Ingénieur DevOps dédié', 'Migration de systèmes existants', 'Scalabilité illimitée'], unavailable: [], recommended: false },
  ],
  faqs: [
    { id: 1, q: 'Combien de temps prend un projet ?', a: 'Un projet Essentiel est livré en 1–2 semaines. Pro: 3–6 semaines.' },
    { id: 2, q: 'Quelle est votre politique de révisions ?', a: 'Révisions design illimitées pendant le prototype. Deux rondes fonctionnelles incluses.' },
    { id: 3, q: 'Proposez-vous une maintenance ?', a: '30 jours de support post-livraison inclus. Plans mensuels disponibles.' },
    { id: 4, q: 'Pouvez-vous travailler sur une base de code existante ?', a: 'Oui. Audit technique en premier, puis feuille de route claire.' },
    { id: 5, q: 'Quels modes de paiement acceptez-vous ?', a: 'Virement, PayPal, paiement mobile. 50% démarrage, 50% livraison.' },
  ],
  testimonials: [
    { id: 1, quote: "CodeCrafters Studio a transformé notre vision en réalité.", name: 'Karim Benali', role: 'CEO, StartupMaroc', color: 'text-primary' },
    { id: 2, quote: "Leur React est élégant et ultra-performant. +40% rétention.", name: 'Salma Ouazzani', role: 'CTO, DataWave MA', color: 'text-secondary' },
    { id: 3, quote: "Comme avoir une équipe tech interne. Sérieux et créatifs.", name: 'Youssef Ait Brahim', role: 'Fondateur, NovaPay', color: 'text-tertiary' },
  ],
  footer: {
    description: 'Développement Android & Web de haute qualité depuis Marrakech.',
    copyright: '© 2025 CodeCrafters Studio — codecraftersstudio.me',
    madeWith: 'Fait avec React & ❤️ à Marrakech',
  },
  contactPage: {
    badge: 'Contactez-nous',
    title: 'Construisons votre',
    titleGradient: 'avenir digital.',
    subtitle: 'Décrivez votre projet — réponse sous 24h avec devis gratuit.',
    submitBtn: 'Envoyer le message',
    whatsappBtn: 'Écrire sur WhatsApp maintenant',
  },
  images: [],
}

// ─── GitHub config (stored in localStorage only — never in repo) ──────────────
const GH_CONFIG_KEY = 'ccs_github_config'
export function loadGithubConfig() {
  try { return JSON.parse(localStorage.getItem(GH_CONFIG_KEY)) } catch { return null }
}
export function saveGithubConfig(cfg) {
  localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(cfg))
}

// ─── GitHub API: save data.json to repo ──────────────────────────────────────
export async function saveToGithub(data, config) {
  const { token, owner, repo, branch = 'main' } = config
  const path = 'public/data.json'
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
  }

  // Get current file SHA (needed for update)
  let sha = null
  try {
    const res = await fetch(url, { headers })
    if (res.ok) {
      const info = await res.json()
      sha = info.sha
    }
  } catch {}

  // Encode content as base64
  const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))

  const body = {
    message: `🔧 Update site data [${new Date().toLocaleString('fr-MA')}]`,
    content,
    branch,
    ...(sha ? { sha } : {}),
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'GitHub API error')
  }
  return await res.json()
}

// ─── Load data: GitHub (data.json) → localStorage → DEFAULT ──────────────────
const LS_KEY = 'ccs_site_data_v3'

function deepMerge(defaults, saved) {
  const result = { ...defaults }
  for (const key of Object.keys(saved)) {
    if (Array.isArray(saved[key])) result[key] = saved[key]
    else if (saved[key] && typeof saved[key] === 'object' && typeof defaults[key] === 'object' && !Array.isArray(defaults[key]))
      result[key] = { ...defaults[key], ...saved[key] }
    else result[key] = saved[key]
  }
  return result
}

function lsLoad() {
  try {
    const s = localStorage.getItem(LS_KEY)
    return s ? deepMerge(DEFAULT_DATA, JSON.parse(s)) : DEFAULT_DATA
  } catch { return DEFAULT_DATA }
}

function lsSave(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch {}
}

// ─── Context ──────────────────────────────────────────────────────────────────
const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [data, setData] = useState(lsLoad)
  const [ghLoading, setGhLoading] = useState(false)

  // On mount: try to fetch public/data.json from the deployed site
  useEffect(() => {
    fetch('/data.json?t=' + Date.now())
      .then(r => r.ok ? r.json() : null)
      .then(json => {
        if (json) {
          const merged = deepMerge(DEFAULT_DATA, json)
          setData(merged)
          lsSave(merged)
        }
      })
      .catch(() => {}) // silent fail — use localStorage
  }, [])

  const commit = (next) => {
    setData(next)
    lsSave(next)
  }

  const set = (path, value) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      lsSave(next)
      return next
    })
  }

  const updateItem = (arrayKey, id, field, value) => {
    setData(prev => {
      const next = { ...prev, [arrayKey]: prev[arrayKey].map(item => item.id === id ? { ...item, [field]: value } : item) }
      lsSave(next)
      return next
    })
  }

  const addItem = (arrayKey, template) => {
    setData(prev => {
      const next = { ...prev, [arrayKey]: [...prev[arrayKey], { ...template, id: Date.now() }] }
      lsSave(next)
      return next
    })
  }

  const removeItem = (arrayKey, id) => {
    setData(prev => {
      const next = { ...prev, [arrayKey]: prev[arrayKey].filter(item => item.id !== id) }
      lsSave(next)
      return next
    })
  }

  const updateStat = (index, field, value) => {
    setData(prev => {
      const stats = prev.stats.map((s, i) => i === index ? { ...s, [field]: value } : s)
      const next = { ...prev, stats }
      lsSave(next)
      return next
    })
  }

  const addImage = (imgObj) => {
    setData(prev => {
      const next = { ...prev, images: [{ id: Date.now(), ...imgObj }, ...(prev.images || [])] }
      lsSave(next)
      return next
    })
  }
  const deleteImage = (id) => {
    setData(prev => {
      const next = { ...prev, images: (prev.images || []).filter(img => img.id !== id) }
      lsSave(next)
      return next
    })
  }
  const renameImage = (id, name) => {
    setData(prev => {
      const next = { ...prev, images: (prev.images || []).map(img => img.id === id ? { ...img, name } : img) }
      lsSave(next)
      return next
    })
  }

  // Push to GitHub
  const pushToGithub = async (config) => {
    setGhLoading(true)
    try {
      await saveToGithub(data, config)
      setGhLoading(false)
      return { ok: true }
    } catch (err) {
      setGhLoading(false)
      return { ok: false, error: err.message }
    }
  }

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ccs-data-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (file) => new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result)
        const merged = deepMerge(DEFAULT_DATA, parsed)
        setData(merged)
        lsSave(merged)
        resolve()
      } catch { reject(new Error('Fichier JSON invalide')) }
    }
    r.readAsText(file)
  })

  const resetToDefaults = () => {
    localStorage.removeItem(LS_KEY)
    setData(DEFAULT_DATA)
  }

  return (
    <SiteContext.Provider value={{
      data, set, updateItem, addItem, removeItem, updateStat,
      addImage, deleteImage, renameImage,
      pushToGithub, ghLoading,
      exportData, importData, resetToDefaults,
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => useContext(SiteContext)
