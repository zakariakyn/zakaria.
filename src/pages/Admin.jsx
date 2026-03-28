import { useState, useRef, useCallback } from 'react'
import { useSite, loadGithubConfig, saveGithubConfig } from '../context/SiteContext'

const ADMIN_PASSWORD = 'codecrafters2024'

// ─────────────────────────────────────────────────────────────────────────────
// UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

function Input({ label, hint, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-bold text-slate-700 text-sm">{label}</span>
      {hint && <span className="block text-slate-400 text-xs">{hint}</span>}
      <input
        type={type} value={value ?? ''} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 text-base focus:outline-none focus:border-blue-400 transition-colors"
      />
    </label>
  )
}

function Textarea({ label, hint, value, onChange, rows = 3 }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-bold text-slate-700 text-sm">{label}</span>
      {hint && <span className="block text-slate-400 text-xs">{hint}</span>}
      <textarea
        value={value ?? ''} rows={rows}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 text-base focus:outline-none focus:border-blue-400 transition-colors resize-none"
      />
    </label>
  )
}

// Upload image simple
function ImagePicker({ label, hint, value, onChange }) {
  const ref = useRef(null)
  const [loading, setLoading] = useState(false)
  const [urlMode, setUrlMode] = useState(false)
  const [urlVal, setUrlVal] = useState('')

  const processFile = useCallback(file => {
    if (!file?.type.startsWith('image/')) return
    if (file.size > 5 * 1024 * 1024) { alert('Image trop grande (max 5MB)'); return }
    setLoading(true)
    const r = new FileReader()
    r.onload = e => { onChange(e.target.result); setLoading(false) }
    r.readAsDataURL(file)
  }, [onChange])

  return (
    <div className="space-y-2">
      <span className="font-bold text-slate-700 text-sm block">{label}</span>
      {hint && <span className="block text-slate-400 text-xs">{hint}</span>}

      {value ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 group">
          <img src={value} alt="aperçu" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button onClick={() => ref.current?.click()}
              className="bg-white text-slate-800 px-4 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">upload</span> Changer
            </button>
            <button onClick={() => onChange('')}
              className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">delete</span> Effacer
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <button onClick={() => ref.current?.click()}
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl py-10 flex flex-col items-center gap-3 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer"
            onDrop={e => { e.preventDefault(); processFile(e.dataTransfer.files[0]) }}
            onDragOver={e => e.preventDefault()}>
            {loading
              ? <span className="material-symbols-outlined text-5xl text-blue-500 animate-spin">progress_activity</span>
              : <span className="material-symbols-outlined text-5xl text-slate-300">add_photo_alternate</span>
            }
            <span className="text-slate-400 font-medium">{loading ? 'Chargement...' : 'Cliquer ou glisser une image'}</span>
            <span className="text-slate-300 text-sm">JPG, PNG, WEBP · max 5MB</span>
          </button>
          {/* URL option */}
          {!urlMode
            ? <button onClick={() => setUrlMode(true)} className="text-sm text-blue-500 font-medium hover:underline">🔗 Ou coller un lien d'image</button>
            : <div className="flex gap-2">
                <input type="url" value={urlVal} onChange={e => setUrlVal(e.target.value)} autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') { onChange(urlVal.trim()); setUrlMode(false) } }}
                  placeholder="https://..." className="flex-1 border-2 border-blue-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none" />
                <button onClick={() => { if (urlVal.trim()) { onChange(urlVal.trim()); setUrlMode(false) } }}
                  className="px-4 py-2.5 hero-gradient text-white font-bold rounded-xl text-sm">OK</button>
                <button onClick={() => setUrlMode(false)} className="px-3 py-2.5 bg-slate-100 text-slate-500 rounded-xl text-sm">✕</button>
              </div>
          }
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={e => processFile(e.target.files[0])} />
    </div>
  )
}

// Toast notification
function Toast({ show, msg }) {
  if (!show) return null
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 font-bold text-sm">
      <span className="material-symbols-outlined text-green-400">check_circle</span>
      {msg}
    </div>
  )
}

// Bouton principal
function Btn({ children, onClick, color = 'blue', icon, small = false }) {
  const colors = {
    blue: 'hero-gradient text-white shadow-blue-500/20',
    green: 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    gray: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
  }
  return (
    <button onClick={onClick}
      className={`flex items-center gap-2 font-bold rounded-2xl shadow-md transition-all hover:scale-[1.02] active:scale-95 ${small ? 'px-4 py-2 text-sm' : 'px-6 py-3.5 text-base'} ${colors[color]}`}>
      {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
      {children}
    </button>
  )
}

// Carte de section
function Box({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5 ${className}`}>
      {children}
    </div>
  )
}

// Séparateur titre
function BoxTitle({ icon, children }) {
  return (
    <h3 className="font-bold text-slate-800 text-base flex items-center gap-2 pb-2 border-b border-slate-100">
      <span className="material-symbols-outlined text-blue-500">{icon}</span>
      {children}
    </h3>
  )
}

const GRADIENTS = [
  'from-blue-500 to-indigo-700', 'from-purple-500 to-pink-600',
  'from-emerald-500 to-teal-700', 'from-orange-500 to-red-600',
  'from-violet-500 to-fuchsia-700', 'from-cyan-500 to-blue-600',
  'from-rose-500 to-pink-700', 'from-amber-500 to-orange-600',
]
const ICONS = ['code','dashboard','fitness_center','eco','hub','music_note','architecture','smartphone','language','bolt','shopping_cart','school','store','payments','cloud']
const CATEGORIES = ['Android Apps', 'Web Apps', 'Full-Stack']


// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT GALERIE D'IMAGES
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// GALERIE CLOUDINARY
// ─────────────────────────────────────────────────────────────────────────────
const CLOUD_KEY = 'ccs_cloudinary_config'

function loadCloudConfig() {
  try { return JSON.parse(localStorage.getItem(CLOUD_KEY)) || null } catch { return null }
}
function saveCloudConfig(cfg) {
  localStorage.setItem(CLOUD_KEY, JSON.stringify(cfg))
}

async function uploadToCloudinary(file, cloudName, uploadPreset, onProgress) {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('upload_preset', uploadPreset)
  fd.append('folder', 'codecrafters')

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`)
    xhr.upload.onprogress = e => { if (e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100)) }
    xhr.onload = () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText)
        resolve({ url: res.secure_url, publicId: res.public_id, size: res.bytes, width: res.width, height: res.height })
      } else {
        reject(new Error(JSON.parse(xhr.responseText)?.error?.message || 'Erreur upload'))
      }
    }
    xhr.onerror = () => reject(new Error('Erreur réseau'))
    xhr.send(fd)
  })
}

function ImagesGallery({ images, onAdd, onDelete, onRename, ok }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState([]) // [{ name, progress, error }]
  const [editId, setEditId] = useState(null)
  const [editName, setEditName] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [preview, setPreview] = useState(null)
  const [showConfig, setShowConfig] = useState(false)
  const [config, setConfig] = useState(loadCloudConfig)
  const [cfgInput, setCfgInput] = useState({ cloudName: '', uploadPreset: '' })

  const isConfigured = config?.cloudName && config?.uploadPreset

  const processFiles = useCallback(async (files) => {
    if (!isConfigured) { setShowConfig(true); return }
    const allowed = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!allowed.length) return

    // Init progress list
    const progressList = allowed.map(f => ({ name: f.name, progress: 0, error: null }))
    setUploading(progressList)

    let successCount = 0
    await Promise.all(allowed.map(async (file, i) => {
      try {
        const result = await uploadToCloudinary(
          file,
          config.cloudName,
          config.uploadPreset,
          (pct) => setUploading(prev => prev.map((p, idx) => idx === i ? { ...p, progress: pct } : p))
        )
        onAdd({
          name: file.name.replace(/\.[^.]+$/, ''),
          src: result.url,
          publicId: result.publicId,
          size: result.size,
          width: result.width,
          height: result.height,
          date: new Date().toLocaleDateString('fr-MA'),
          cloud: true,
        })
        successCount++
        setUploading(prev => prev.map((p, idx) => idx === i ? { ...p, progress: 100 } : p))
      } catch (err) {
        setUploading(prev => prev.map((p, idx) => idx === i ? { ...p, error: err.message } : p))
      }
    }))

    setTimeout(() => setUploading([]), 2000)
    if (successCount > 0) ok(`✅ ${successCount} image${successCount > 1 ? 's' : ''} uploadée${successCount > 1 ? 's' : ''} sur Cloudinary !`)
  }, [isConfigured, config, onAdd, ok])

  const saveConfig = () => {
    if (!cfgInput.cloudName || !cfgInput.uploadPreset) return
    const cfg = { cloudName: cfgInput.cloudName.trim(), uploadPreset: cfgInput.uploadPreset.trim() }
    saveCloudConfig(cfg)
    setConfig(cfg)
    setShowConfig(false)
    ok('✅ Cloudinary configuré !')
  }

  const copyUrl = (img) => {
    navigator.clipboard.writeText(img.src).then(() => {
      setCopiedId(img.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  // ── Config modal ───────────────────────────────────────────────────────────
  if (showConfig || !isConfigured) return (
    <div className="space-y-5">
      {/* Setup wizard */}
      <div className="bg-white rounded-3xl border-2 border-blue-200 p-7 space-y-6 shadow-lg shadow-blue-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-3xl">cloud_upload</span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-slate-900 text-xl">Connecter Cloudinary</h2>
            <p className="text-slate-400 text-sm">Stockage d'images gratuit dans le cloud ☁️</p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
            <p className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 hero-gradient rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
              Créer un compte gratuit
            </p>
            <p className="text-slate-500 text-sm pl-8">Va sur <a href="https://cloudinary.com/users/register_free" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">cloudinary.com</a> → "Sign Up Free"</p>
            <p className="text-slate-400 text-xs pl-8">Gratuit : 25GB stockage, 25GB bande passante/mois</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
            <p className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 hero-gradient rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
              Trouver ton Cloud Name
            </p>
            <p className="text-slate-500 text-sm pl-8">Dashboard → en haut à gauche → <strong>"Cloud Name"</strong></p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 space-y-2 border border-slate-100">
            <p className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 hero-gradient rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
              Créer un Upload Preset
            </p>
            <div className="text-slate-500 text-sm pl-8 space-y-1">
              <p>Settings → <strong>Upload</strong> → "Upload presets" → Add upload preset</p>
              <p>⚠️ <strong>Signing mode = Unsigned</strong> (obligatoire)</p>
              <p>Copie le nom du preset créé</p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="font-bold text-slate-700 text-sm block mb-1.5">Cloud Name</label>
            <input value={cfgInput.cloudName} onChange={e => setCfgInput(p => ({ ...p, cloudName: e.target.value }))}
              placeholder="ex: dxyz1234ab"
              className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:outline-none focus:border-blue-400 transition-colors" />
          </div>
          <div>
            <label className="font-bold text-slate-700 text-sm block mb-1.5">Upload Preset (Unsigned)</label>
            <input value={cfgInput.uploadPreset} onChange={e => setCfgInput(p => ({ ...p, uploadPreset: e.target.value }))}
              placeholder="ex: codecrafters_preset"
              className="w-full bg-white border-2 border-slate-200 rounded-2xl px-4 py-3.5 text-slate-800 focus:outline-none focus:border-blue-400 transition-colors" />
          </div>
          <button onClick={saveConfig}
            disabled={!cfgInput.cloudName || !cfgInput.uploadPreset}
            className="w-full hero-gradient py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-500/20 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40">
            Connecter Cloudinary ✓
          </button>
        </div>

        {config && (
          <button onClick={() => setShowConfig(false)} className="w-full text-slate-400 text-sm hover:text-slate-600 transition-colors">
            ← Annuler
          </button>
        )}
      </div>
    </div>
  )

  // ── Galerie principale ─────────────────────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* Header avec config */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-2xl px-4 py-2">
          <span className="material-symbols-outlined text-green-600 text-base">cloud_done</span>
          <span className="text-green-700 text-sm font-bold">Cloudinary connecté</span>
          <span className="text-green-500 text-xs">· {config.cloudName}</span>
        </div>
        <button onClick={() => { setCfgInput({ cloudName: config.cloudName, uploadPreset: config.uploadPreset }); setShowConfig(true) }}
          className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1 transition-colors">
          <span className="material-symbols-outlined text-sm">settings</span>
          Modifier
        </button>
      </div>

      {/* Zone upload */}
      <div
        onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files) }}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all
          ${dragging ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center transition-colors ${dragging ? 'bg-blue-500' : 'bg-slate-100'}`}>
            <span className={`material-symbols-outlined text-5xl ${dragging ? 'text-white' : 'text-slate-400'}`}>cloud_upload</span>
          </div>
          <p className="font-bold text-slate-700 text-xl">{dragging ? 'Lâche ici !' : 'Clique ou glisse tes images'}</p>
          <p className="text-slate-400 text-sm">JPG · PNG · WEBP · GIF — Les images seront sauvegardées sur Cloudinary ☁️</p>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => { processFiles(e.target.files); e.target.value = '' }} />

      {/* Progress bars upload en cours */}
      {uploading.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
          <p className="font-bold text-slate-700 text-sm">Upload en cours...</p>
          {uploading.map((u, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-slate-600 text-xs truncate max-w-[70%]">{u.name}</p>
                {u.error
                  ? <span className="text-red-500 text-xs font-bold">❌ {u.error}</span>
                  : <span className="text-slate-500 text-xs font-bold">{u.progress}%</span>
                }
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${u.error ? 'bg-red-400' : u.progress === 100 ? 'bg-green-500' : 'hero-gradient'}`}
                  style={{ width: `${u.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {images.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 px-5 py-3">
          <p className="text-slate-500 text-sm">
            <strong className="text-slate-900">{images.length}</strong> image{images.length > 1 ? 's' : ''} dans Cloudinary
          </p>
          <p className="text-blue-600 text-xs font-bold">Stockage permanent ☁️</p>
        </div>
      )}

      {/* Grille */}
      {images.length === 0 ? (
        <div className="text-center py-12 text-slate-300">
          <span className="material-symbols-outlined text-6xl block mb-3">image_not_supported</span>
          <p className="font-medium">Aucune image uploadée pour l'instant</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map(img => (
            <div key={img.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="relative aspect-square bg-slate-100 cursor-pointer" onClick={() => setPreview(img)}>
                <img src={img.src} alt={img.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.style.opacity = '0.2' }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-white text-3xl">zoom_in</span>
                </div>
                {/* Cloud badge */}
                <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-lg backdrop-blur-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">cloud_done</span>
                  {img.size ? (img.size > 1024*1024 ? `${(img.size/1024/1024).toFixed(1)}MB` : `${Math.round(img.size/1024)}KB`) : ''}
                </div>
              </div>

              <div className="p-3 space-y-2">
                {editId === img.id ? (
                  <div className="flex gap-2">
                    <input value={editName} onChange={e => setEditName(e.target.value)} autoFocus
                      onKeyDown={e => { if (e.key === 'Enter') { onRename(img.id, editName); setEditId(null); ok('Renommée') } if (e.key === 'Escape') setEditId(null) }}
                      className="flex-1 border-2 border-blue-400 rounded-lg px-2 py-1 text-xs focus:outline-none" />
                    <button onClick={() => { onRename(img.id, editName); setEditId(null); ok('Renommée') }}>
                      <span className="material-symbols-outlined text-base text-blue-600">check</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-800 font-bold text-xs truncate" title={img.name}>{img.name}</p>
                )}
                {img.date && <p className="text-slate-400 text-[10px]">{img.date}</p>}

                <div className="flex gap-1.5">
                  <button onClick={() => copyUrl(img)}
                    className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-[11px] font-bold transition-all
                      ${copiedId === img.id ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600'}`}>
                    <span className="material-symbols-outlined text-xs">{copiedId === img.id ? 'check' : 'content_copy'}</span>
                    {copiedId === img.id ? 'Copié !' : 'Copier lien'}
                  </button>
                  <button onClick={() => { setEditId(img.id); setEditName(img.name) }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </button>
                  <button onClick={() => { if (confirm(`Supprimer "${img.name}" de la liste ?`)) { onDelete(img.id); ok('Retiré de la liste') } }}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-green-600 flex-shrink-0">cloud_done</span>
        <div className="text-green-700 text-sm space-y-1">
          <p><strong>Images stockées sur Cloudinary ☁️</strong></p>
          <p>Les images restent en ligne même si tu changes de PC ou de navigateur.</p>
          <p className="text-green-500 text-xs">Pour utiliser une image : clique "Copier lien" → colle dans un projet.</p>
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/85 z-[99999] flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={preview.src} alt={preview.name} className="w-full rounded-3xl shadow-2xl max-h-[80vh] object-contain" />
            <div className="absolute top-4 left-4 bg-black/60 text-white text-sm font-bold px-4 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">cloud_done</span>
              {preview.name}
            </div>
            <button onClick={() => setPreview(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 backdrop-blur-sm">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { copyUrl(preview); ok('Lien copié !') }}
                className="flex-1 bg-white text-slate-800 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">content_copy</span>
                Copier le lien
              </button>
              <a href={preview.src} target="_blank" rel="noopener noreferrer"
                className="bg-blue-600 text-white px-5 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                <span className="material-symbols-outlined">open_in_new</span>
              </a>
              <button onClick={() => { if (confirm(`Retirer "${preview.name}" ?`)) { onDelete(preview.id); setPreview(null); ok('Retiré') } }}
                className="w-14 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:bg-red-600 transition-colors">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}



// ─── GitHub Setup Modal ───────────────────────────────────────────────────────
function GithubSetup({ initial, onSave, onClose }) {
  const [form, setForm] = useState({
    token: initial?.token || '',
    owner: initial?.owner || '',
    repo: initial?.repo || '',
    branch: initial?.branch || 'main',
  })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const testToken = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const res = await fetch(`https://api.github.com/repos/${form.owner}/${form.repo}`, {
        headers: { Authorization: `Bearer ${form.token}`, Accept: 'application/vnd.github+json' }
      })
      if (res.ok) {
        const data = await res.json()
        setTestResult({ ok: true, msg: `✅ Repo trouvé : ${data.full_name}` })
      } else {
        const err = await res.json()
        setTestResult({ ok: false, msg: err.message || 'Erreur' })
      }
    } catch {
      setTestResult({ ok: false, msg: 'Erreur réseau' })
    }
    setTesting(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <h2 className="font-headline font-bold text-slate-900 text-lg">Configurer GitHub</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Guide */}
          <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100">
            <p className="font-bold text-slate-800 text-sm">📋 Comment créer un token GitHub :</p>
            <ol className="text-slate-500 text-sm space-y-1.5 list-none">
              <li className="flex gap-2"><span className="w-5 h-5 hero-gradient rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Va sur <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">github.com/settings/tokens</a></li>
              <li className="flex gap-2"><span className="w-5 h-5 hero-gradient rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>"Generate new token (classic)"</li>
              <li className="flex gap-2"><span className="w-5 h-5 hero-gradient rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Coche <strong>repo</strong> (accès complet au repo)</li>
              <li className="flex gap-2"><span className="w-5 h-5 hero-gradient rounded-full text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Copie le token généré (commence par <code className="bg-slate-200 px-1 rounded text-xs">ghp_</code>)</li>
            </ol>
          </div>

          <Input label="🔑 Token GitHub" hint="Commence par ghp_... (ne le partage jamais)" value={form.token}
            onChange={v => setForm(p => ({ ...p, token: v }))} type="password" placeholder="ghp_xxxxxxxxxxxxxxxx" />
          <Input label="👤 Ton username GitHub" value={form.owner}
            onChange={v => setForm(p => ({ ...p, owner: v }))} placeholder="ex: zakariakyn" />
          <Input label="📁 Nom du repo" value={form.repo}
            onChange={v => setForm(p => ({ ...p, repo: v }))} placeholder="ex: codecraftersstudio" />
          <Input label="🌿 Branch" value={form.branch}
            onChange={v => setForm(p => ({ ...p, branch: v }))} placeholder="main" />

          {/* Test */}
          <button onClick={testToken} disabled={testing || !form.token || !form.owner || !form.repo}
            className="w-full py-3 border-2 border-blue-300 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all disabled:opacity-40 flex items-center justify-center gap-2">
            {testing ? <><span className="material-symbols-outlined animate-spin text-base">progress_activity</span>Test en cours...</> : <><span className="material-symbols-outlined text-base">wifi</span>Tester la connexion</>}
          </button>

          {testResult && (
            <div className={`rounded-2xl p-3 text-sm font-medium flex items-center gap-2 ${testResult.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
              <span className="material-symbols-outlined text-base">{testResult.ok ? 'check_circle' : 'error'}</span>
              {testResult.msg}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={onClose}
              className="flex-1 py-3.5 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all">
              Annuler
            </button>
            <button
              onClick={() => onSave(form)}
              disabled={!form.token || !form.owner || !form.repo}
              className="flex-1 py-3.5 hero-gradient text-white font-bold rounded-2xl disabled:opacity-40 shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pwd, setPwd] = useState('')
  const [pwdErr, setPwdErr] = useState(false)
  const [page, setPage] = useState(null) // null = menu principal
  const [toast, setToast] = useState({ show: false, msg: '' })
  const importRef = useRef(null)
  const [ghConfig, setGhConfig] = useState(loadGithubConfig)
  const [showGhSetup, setShowGhSetup] = useState(false)
  const [ghResult, setGhResult] = useState(null) // {ok, error}
  const { data, set, updateItem, addItem, removeItem, updateStat, exportData, importData, resetToDefaults, addImage, deleteImage, renameImage, pushToGithub, ghLoading } = useSite()

  const ok = (msg = 'Sauvegardé ✓') => {
    setToast({ show: true, msg })
    setTimeout(() => setToast({ show: false, msg: '' }), 2000)
  }
  const S = path => val => { set(path, val); ok() }

  // ── LOGIN ────────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-24 h-24 hero-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40">
            <span className="material-symbols-outlined text-white" style={{ fontSize: 48 }}>lock</span>
          </div>
          <h1 className="text-3xl font-headline font-bold text-white mb-2">Accès Admin</h1>
          <p className="text-blue-300 mb-8">CodeCrafters Studio</p>
          <form onSubmit={e => {
            e.preventDefault()
            pwd === ADMIN_PASSWORD ? setAuthed(true) : (setPwdErr(true), setPwd(''))
          }} className="space-y-4">
            <input type="password" value={pwd} autoFocus
              onChange={e => { setPwd(e.target.value); setPwdErr(false) }}
              placeholder="Mot de passe..."
              className={`w-full rounded-2xl px-5 py-4 text-lg focus:outline-none border-2 transition-all ${pwdErr ? 'border-red-400 bg-red-50 text-red-800' : 'border-transparent bg-white/90 text-slate-800 focus:border-blue-400'}`}
            />
            {pwdErr && <p className="text-red-400 text-sm font-medium">Mot de passe incorrect !</p>}
            <button type="submit" className="w-full hero-gradient py-4 rounded-2xl text-white font-bold text-lg shadow-xl shadow-blue-500/30 hover:opacity-90 active:scale-95 transition-all">
              Entrer
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── MENU SECTIONS ─────────────────────────────────────────────────────────────
  const sections = [
    { id: 'accueil',   icon: 'home',         label: 'Page d\'accueil',  desc: 'Titre, textes, boutons',        color: 'from-blue-500 to-blue-600' },
    { id: 'projets',   icon: 'folder_open',  label: 'Mes Projets',       desc: 'Ajouter, modifier, supprimer',  color: 'from-purple-500 to-purple-600' },
    { id: 'services',  icon: 'build',        label: 'Services',          desc: 'Ce que tu proposes',            color: 'from-emerald-500 to-emerald-600' },
    { id: 'apropos',   icon: 'person',       label: 'À propos',          desc: 'Ton profil et tes skills',      color: 'from-orange-500 to-orange-600' },
    { id: 'tarifs',    icon: 'sell',         label: 'Tarifs',            desc: 'Tes prix et FAQ',               color: 'from-rose-500 to-rose-600' },
    { id: 'contact',   icon: 'phone',        label: 'Contact',           desc: 'Email, WhatsApp, réseaux',      color: 'from-cyan-500 to-cyan-600' },
    { id: 'avis',      icon: 'stars',        label: 'Avis clients',      desc: 'Témoignages affichés',          color: 'from-amber-500 to-amber-600' },
    { id: 'images',    icon: 'photo_library', label: 'Mes Images',       desc: 'Uploader et gérer tes photos',  color: 'from-pink-500 to-rose-600' },
    { id: 'backup',    icon: 'save',         label: 'Sauvegarde',        desc: 'Exporter / Importer',           color: 'from-slate-600 to-slate-700' },
  ]

  // ── HEADER commun ──────────────────────────────────────────────────────────────
  const Header = ({ title }) => (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
        <button onClick={() => setPage(null)}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
          <span className="material-symbols-outlined text-slate-600">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="font-headline font-bold text-slate-900 text-lg">{title}</h1>
          <p className="text-slate-400 text-xs">CodeCrafters Studio</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-xl hover:bg-blue-100 transition-colors">
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          Voir le site
        </a>
      </div>
    </header>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // MENU PRINCIPAL
  // ──────────────────────────────────────────────────────────────────────────────
  if (!page) {
    return (
      <div className="min-h-screen bg-slate-50 font-body">
        <Toast show={toast.show} msg={toast.msg} />
        <header className="bg-white border-b border-slate-100 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 hero-gradient rounded-2xl flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-white text-lg">terminal</span>
              </div>
              <div>
                <p className="font-bold text-slate-900">{data.brand?.name}</p>
                <p className="text-slate-400 text-xs">Tableau de bord</p>
              </div>
            </div>
            <button onClick={() => setAuthed(false)}
              className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors font-medium">
              <span className="material-symbols-outlined text-base">logout</span>
              Déconnexion
            </button>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-headline font-bold text-slate-900">Que veux-tu modifier ?</h2>
            <p className="text-slate-400 mt-1">Clique sur une section pour la modifier</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map(s => (
              <button key={s.id} onClick={() => setPage(s.id)}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all text-left group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <span className="material-symbols-outlined text-white text-2xl">{s.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-base">{s.label}</p>
                  <p className="text-slate-400 text-sm truncate">{s.desc}</p>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-400 transition-colors">chevron_right</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // wrapper de page
  const Page = ({ title, children }) => (
    <div className="min-h-screen bg-slate-50 font-body">
      <Toast show={toast.show} msg={toast.msg} />
      <Header title={title} />
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">{children}</div>
    </div>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE ACCUEIL
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'accueil') return (
    <Page title="Page d'accueil">
      <Box>
        <BoxTitle icon="badge">Nom & Logo</BoxTitle>
        <Input label="Nom de ton studio" value={data.brand.name} onChange={S('brand.name')} />
        <Input label="Domaine (ex: codecraftersstudio.me)" value={data.brand.domain} onChange={S('brand.domain')} />
        <ImagePicker label="Logo" hint="Affiché dans la barre de navigation" value={data.brand.logo} onChange={v => { set('brand.logo', v); ok() }} />
      </Box>

      <Box>
        <BoxTitle icon="title">Grand titre de la page</BoxTitle>
        {/* Live preview */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
          <p className="text-xl font-headline font-bold text-slate-900 leading-tight">
            {data.hero.title || '...'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">{data.hero.titleGradient || '...'}</span>{' '}
            {data.hero.titleEnd || '...'}
          </p>
          <p className="text-slate-500 text-sm mt-2">
            {data.hero.subtitle} <strong className="text-blue-600">{data.hero.subtitleHighlight}</strong>
          </p>
        </div>
        <Input label="Début" hint='Ex: "Vos"' value={data.hero.title} onChange={S('hero.title')} />
        <Input label="Mot(s) en couleur" hint='Ex: "Apps Android"' value={data.hero.titleGradient} onChange={S('hero.titleGradient')} />
        <Input label="Fin" hint='Ex: "& Sites Web sur mesure"' value={data.hero.titleEnd} onChange={S('hero.titleEnd')} />
        <Input label="Sous-titre" value={data.hero.subtitle} onChange={S('hero.subtitle')} />
        <Input label="Texte en bleu dans le sous-titre" value={data.hero.subtitleHighlight} onChange={S('hero.subtitleHighlight')} />
      </Box>

      <Box>
        <BoxTitle icon="smart_button">Boutons</BoxTitle>
        <Input label="Bouton principal" hint='Ex: "Voir nos projets"' value={data.hero.ctaPrimary} onChange={S('hero.ctaPrimary')} />
        <Input label="Bouton secondaire" hint='Ex: "Demander un devis"' value={data.hero.ctaSecondary} onChange={S('hero.ctaSecondary')} />
      </Box>

      <Box>
        <BoxTitle icon="bar_chart">Les 4 chiffres clés</BoxTitle>
        <div className="grid grid-cols-2 gap-4">
          {data.stats.map((s, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100 text-center">
              <p className="text-3xl font-headline font-bold text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
              <input value={s.value} onChange={e => { updateStat(i, 'value', e.target.value); ok() }}
                className="w-full text-center bg-white border-2 border-slate-200 rounded-xl px-2 py-2 text-base font-bold focus:outline-none focus:border-blue-400"
                placeholder="30+" />
              <input value={s.label} onChange={e => { updateStat(i, 'label', e.target.value); ok() }}
                className="w-full text-center bg-white border-2 border-slate-200 rounded-xl px-2 py-2 text-sm focus:outline-none focus:border-blue-400"
                placeholder="Projets livrés" />
            </div>
          ))}
        </div>
      </Box>

      <Box>
        <BoxTitle icon="campaign">Bannière en bas de page</BoxTitle>
        <Textarea label="Titre" value={data.hero.ctaBannerTitle} onChange={S('hero.ctaBannerTitle')} rows={2} />
        <Textarea label="Texte" value={data.hero.ctaBannerSub} onChange={S('hero.ctaBannerSub')} rows={2} />
        <Input label="Bouton" value={data.hero.ctaBannerBtn} onChange={S('hero.ctaBannerBtn')} />
      </Box>
    </Page>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE PROJETS
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'projets') return (
    <Page title="Mes Projets">
      <div className="flex justify-end">
        <Btn icon="add" onClick={() => { addItem('projects', { title: 'Nouveau Projet', desc: 'Description...', tags: ['React'], category: 'Web Apps', gradient: 'from-blue-500 to-indigo-700', icon: 'code', link: '', image: '' }); ok('Projet ajouté !') }}>
          Ajouter un projet
        </Btn>
      </div>

      {data.projects.map(p => (
        <Box key={p.id}>
          {/* Header projet */}
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{p.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-slate-900 text-lg">{p.title}</p>
              <p className="text-slate-400 text-sm">{p.category}</p>
            </div>
            <button onClick={() => { if (confirm(`Supprimer "${p.title}" ?`)) { removeItem('projects', p.id); ok('Supprimé') } }}
              className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>

          <div className="space-y-4">
            <Input label="Nom du projet" value={p.title} onChange={v => { updateItem('projects', p.id, 'title', v); ok() }} />

            <div>
              <p className="font-bold text-slate-700 text-sm mb-1.5">Type de projet</p>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => { updateItem('projects', p.id, 'category', c); ok() }}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${p.category === c ? 'hero-gradient text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Textarea label="Description du projet" value={p.desc} onChange={v => { updateItem('projects', p.id, 'desc', v); ok() }} rows={2} />
            <Input label="Technologies utilisées" hint='Ex: React, Firebase (séparées par des virgules)' value={p.tags.join(', ')}
              onChange={v => { updateItem('projects', p.id, 'tags', v.split(',').map(t => t.trim()).filter(Boolean)); ok() }} />
            <Input label="Lien vers le projet (optionnel)" value={p.link} onChange={v => { updateItem('projects', p.id, 'link', v); ok() }} type="url" placeholder="https://monprojet.com" />

            <ImagePicker label="Image du projet" hint="Laisse vide pour afficher le gradient coloré"
              value={p.image} onChange={v => { updateItem('projects', p.id, 'image', v); ok() }} />

            {!p.image && (
              <div className="space-y-3">
                <p className="font-bold text-slate-700 text-sm">Couleur du fond (si pas d'image)</p>
                <div className="flex flex-wrap gap-3">
                  {GRADIENTS.map(g => (
                    <button key={g} onClick={() => { updateItem('projects', p.id, 'gradient', g); ok() }}
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${g} transition-all hover:scale-110 ${p.gradient === g ? 'ring-4 ring-blue-500 ring-offset-2 scale-110 shadow-xl' : 'shadow-md'}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Box>
      ))}
    </Page>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE SERVICES
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'services') return (
    <Page title="Mes Services">
      {data.services.map(s => (
        <Box key={s.id}>
          <BoxTitle icon="build">{s.title}</BoxTitle>
          <Input label="Titre du service" value={s.title} onChange={v => { updateItem('services', s.id, 'title', v); ok() }} />
          <Textarea label="Description" value={s.desc} onChange={v => { updateItem('services', s.id, 'desc', v); ok() }} rows={2} />
          <Textarea label="Ce que ça inclut" hint="Une fonctionnalité par ligne"
            value={s.features.join('\n')} onChange={v => { updateItem('services', s.id, 'features', v.split('\n').filter(Boolean)); ok() }} rows={5} />
        </Box>
      ))}

      <Box>
        <BoxTitle icon="timeline">Étapes de travail</BoxTitle>
        <div className="space-y-3">
          {data.process.map((p, i) => (
            <div key={p.id} className="flex gap-4 items-center bg-slate-50 rounded-2xl p-4">
              <div className="w-9 h-9 hero-gradient rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">{i + 1}</div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                <input value={p.label} onChange={e => { updateItem('process', p.id, 'label', e.target.value); ok() }}
                  className="bg-white border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-blue-400" />
                <input value={p.desc} onChange={e => { updateItem('process', p.id, 'desc', e.target.value); ok() }}
                  className="bg-white border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Page>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE À PROPOS
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'apropos') return (
    <Page title="À Propos de moi">
      <Box>
        <BoxTitle icon="account_circle">Ton profil</BoxTitle>
        <ImagePicker label="Ta photo" hint="Affichée sur la page À propos"
          value={data.aboutPage.photo} onChange={v => { set('aboutPage.photo', v); ok() }} />
        <Input label="Ton nom" value={data.aboutPage.name} onChange={S('aboutPage.name')} />
        <Input label="Ton rôle" hint='Ex: "Développeur fullstack freelance"' value={data.aboutPage.role} onChange={S('aboutPage.role')} />
        <Input label="Statut" hint='Ex: "Disponible pour projets"' value={data.aboutPage.availableBadge} onChange={S('aboutPage.availableBadge')} />
      </Box>

      <Box>
        <BoxTitle icon="format_align_left">Ta présentation</BoxTitle>
        <Textarea label="Premier paragraphe" value={data.aboutPage.bio1} onChange={S('aboutPage.bio1')} rows={4} />
        <Textarea label="Deuxième paragraphe" value={data.aboutPage.bio2} onChange={S('aboutPage.bio2')} rows={4} />
      </Box>

      <Box>
        <BoxTitle icon="equalizer">Tes compétences (%)</BoxTitle>
        <div className="space-y-3">
          {data.skills.map(s => (
            <div key={s.id} className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
              <input value={s.label} onChange={e => { updateItem('skills', s.id, 'label', e.target.value); ok() }}
                className="flex-1 bg-white border-2 border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-blue-400" />
              <div className="flex items-center gap-2">
                <input type="number" min={0} max={100} value={s.pct}
                  onChange={e => { updateItem('skills', s.id, 'pct', Number(e.target.value)); ok() }}
                  className="w-20 text-center bg-white border-2 border-slate-200 rounded-xl px-2 py-2.5 text-sm font-bold focus:outline-none focus:border-blue-400" />
                <span className="text-slate-400 font-bold text-sm">%</span>
              </div>
              <button onClick={() => { removeItem('skills', s.id); ok('Supprimé') }}
                className="text-slate-300 hover:text-red-400 transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          ))}
        </div>
        <Btn icon="add" color="gray" small onClick={() => { addItem('skills', { label: 'Nouvelle compétence', pct: 80 }); ok('Ajouté') }}>
          Ajouter une compétence
        </Btn>
      </Box>
    </Page>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE TARIFS
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'tarifs') return (
    <Page title="Mes Tarifs">
      <div className="grid grid-cols-1 gap-5">
        {data.pricing.map(plan => (
          <Box key={plan.id} className={plan.recommended ? 'border-2 border-blue-400 shadow-blue-100' : ''}>
            {plan.recommended && (
              <div className="inline-flex items-center gap-1 hero-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                ⭐ Plan recommandé
              </div>
            )}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-headline font-bold text-slate-900">{plan.price}</div>
              <div className="text-slate-400 font-medium">{plan.name}</div>
            </div>
            <Input label="Nom du plan" value={plan.name} onChange={v => { updateItem('pricing', plan.id, 'name', v); ok() }} />
            <Input label="Prix" hint='Ex: "1 000 MAD" ou "Sur devis"' value={plan.price} onChange={v => { updateItem('pricing', plan.id, 'price', v); ok() }} />
            <Textarea label="Description courte" value={plan.desc} onChange={v => { updateItem('pricing', plan.id, 'desc', v); ok() }} rows={2} />
            <Textarea label="✅ Ce qui est inclus" hint="Une option par ligne"
              value={plan.features.join('\n')} onChange={v => { updateItem('pricing', plan.id, 'features', v.split('\n').filter(Boolean)); ok() }} rows={5} />
            <Textarea label="❌ Non inclus" hint="Une option par ligne (laisser vide si rien)"
              value={plan.unavailable.join('\n')} onChange={v => { updateItem('pricing', plan.id, 'unavailable', v.split('\n').filter(Boolean)); ok() }} rows={2} />
          </Box>
        ))}
      </div>

      <Box>
        <div className="flex items-center justify-between mb-2">
          <BoxTitle icon="help">Questions fréquentes</BoxTitle>
          <Btn icon="add" color="gray" small onClick={() => { addItem('faqs', { q: 'Votre question ?', a: 'Votre réponse...' }); ok('Ajouté') }}>
            Ajouter
          </Btn>
        </div>
        <div className="space-y-4">
          {data.faqs.map(f => (
            <div key={f.id} className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-slate-100">
              <div className="flex gap-3 items-start">
                <div className="flex-1 space-y-3">
                  <Input label="❓ Question" value={f.q} onChange={v => { updateItem('faqs', f.id, 'q', v); ok() }} />
                  <Textarea label="💬 Réponse" value={f.a} onChange={v => { updateItem('faqs', f.id, 'a', v); ok() }} rows={2} />
                </div>
                <button onClick={() => { removeItem('faqs', f.id); ok('Supprimé') }}
                  className="text-slate-300 hover:text-red-400 mt-6 flex-shrink-0">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Page>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE CONTACT
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'contact') return (
    <Page title="Mes Coordonnées">
      <Box>
        <BoxTitle icon="contact_mail">Comment te contacter</BoxTitle>
        <Input label="📧 Email" value={data.contact.email} onChange={S('contact.email')} type="email" />
        <Input label="📱 Numéro WhatsApp" hint="Sans espaces ni +, ex: 212687639981" value={data.contact.whatsapp} onChange={S('contact.whatsapp')} />
        <Input label="💼 LinkedIn" hint="URL complète" value={data.contact.linkedin} onChange={S('contact.linkedin')} type="url" />
        <Input label="🐙 GitHub" hint="URL complète" value={data.contact.github} onChange={S('contact.github')} type="url" />
        <Input label="📍 Localisation" hint='Ex: "Guéliz, Marrakech 🇲🇦"' value={data.contact.location} onChange={S('contact.location')} />
        <Input label="⏱ Délai de réponse" hint='Ex: "Réponse garantie sous 24h"' value={data.contact.responseTime} onChange={S('contact.responseTime')} />
      </Box>

      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-5 flex items-start gap-4">
        <span className="material-symbols-outlined text-blue-500 text-2xl flex-shrink-0 mt-0.5">info</span>
        <p className="text-blue-700 text-sm">
          Le numéro WhatsApp est aussi utilisé pour le <strong>bouton vert flottant</strong> sur toutes les pages du site.
        </p>
      </div>
    </Page>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE AVIS
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'avis') return (
    <Page title="Avis Clients">
      <div className="flex justify-end">
        <Btn icon="add" onClick={() => { addItem('testimonials', { quote: 'Excellent service, je recommande !', name: 'Nouveau Client', role: 'Entrepreneur', color: 'text-primary' }); ok('Avis ajouté !') }}>
          Ajouter un avis
        </Btn>
      </div>

      {data.testimonials.map(t => (
        <Box key={t.id}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full hero-gradient flex items-center justify-center text-white font-bold text-lg shadow-md">
                {t.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-slate-400 text-sm">{t.role}</p>
              </div>
            </div>
            <button onClick={() => { removeItem('testimonials', t.id); ok('Supprimé') }}
              className="text-slate-300 hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
          <Input label="Nom du client" value={t.name} onChange={v => { updateItem('testimonials', t.id, 'name', v); ok() }} />
          <Input label="Rôle / Entreprise" hint='Ex: "CEO, StartupMaroc"' value={t.role} onChange={v => { updateItem('testimonials', t.id, 'role', v); ok() }} />
          <Textarea label="Son témoignage" value={t.quote} onChange={v => { updateItem('testimonials', t.id, 'quote', v); ok() }} rows={3} />
        </Box>
      ))}
    </Page>
  )

  // ──────────────────────────────────────────────────────────────────────────────
  // PAGE SAUVEGARDE
  // ──────────────────────────────────────────────────────────────────────────────
  if (page === 'backup') return (
    <Page title="Sauvegarde & Publication">

      {/* ══ PUBLIER SUR GITHUB ══════════════════════════════════════════════ */}
      <div className="bg-white rounded-3xl border-2 border-blue-200 shadow-lg shadow-blue-100 p-7 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 hero-gradient rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
            <span className="material-symbols-outlined text-white text-3xl">rocket_launch</span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-slate-900 text-xl">Publier sur le site</h2>
            <p className="text-slate-400 text-sm">Tes modifications → visibles par tout le monde en quelques secondes</p>
          </div>
        </div>

        {/* Comment ça marche */}
        <div className="flex items-start gap-3 bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <span className="material-symbols-outlined text-blue-500 flex-shrink-0 mt-0.5">info</span>
          <div className="text-blue-700 text-sm space-y-1">
            <p><strong>Comment ça marche :</strong></p>
            <p>Tu changes quelque chose → clic "Publier" → <strong>GitHub sauvegarde</strong> → le site se met à jour automatiquement ✅</p>
            <p className="text-blue-400 text-xs">Nécessite un token GitHub (config une seule fois)</p>
          </div>
        </div>

        {/* GitHub non configuré */}
        {!ghConfig ? (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-500 flex-shrink-0">warning</span>
              <p className="text-amber-700 text-sm">Configure ton GitHub d'abord pour activer la publication en ligne.</p>
            </div>
            <Btn icon="settings" onClick={() => setShowGhSetup(true)}>
              Configurer GitHub
            </Btn>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Config summary */}
            <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600">check_circle</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{ghConfig.owner}/{ghConfig.repo}</p>
                  <p className="text-slate-400 text-xs">Branch: {ghConfig.branch || 'main'}</p>
                </div>
              </div>
              <button onClick={() => setShowGhSetup(true)}
                className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-sm">edit</span>
                Modifier
              </button>
            </div>

            {/* Publish button */}
            <button
              onClick={async () => {
                setGhResult(null)
                const res = await pushToGithub(ghConfig)
                setGhResult(res)
              }}
              disabled={ghLoading}
              className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl
                ${ghLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'hero-gradient text-white hover:scale-[1.02] active:scale-95 shadow-blue-500/20'
                }`}
            >
              {ghLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Publication en cours...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">rocket_launch</span>
                  Publier les modifications
                </>
              )}
            </button>

            {/* Result */}
            {ghResult && (
              <div className={`rounded-2xl p-4 flex items-start gap-3 ${ghResult.ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <span className={`material-symbols-outlined flex-shrink-0 ${ghResult.ok ? 'text-green-600' : 'text-red-500'}`}>
                  {ghResult.ok ? 'check_circle' : 'error'}
                </span>
                <div>
                  {ghResult.ok ? (
                    <>
                      <p className="font-bold text-green-800">✅ Publié avec succès !</p>
                      <p className="text-green-600 text-sm">Les modifications sont en ligne. Attends 1–2 minutes si tu utilises GitHub Pages.</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-red-800">❌ Erreur de publication</p>
                      <p className="text-red-600 text-sm">{ghResult.error}</p>
                      <p className="text-red-400 text-xs mt-1">Vérifie ton token et les droits du repo.</p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Setup Modal GitHub */}
      {showGhSetup && (
        <GithubSetup
          initial={ghConfig}
          onSave={cfg => { setGhConfig(cfg); saveGithubConfig(cfg); setShowGhSetup(false) }}
          onClose={() => setShowGhSetup(false)}
        />
      )}

      {/* ══ EXPORT / IMPORT ══════════════════════════════════════════════════ */}
      <Box>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-green-600 text-2xl">download</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Sauvegarder un fichier</h3>
            <p className="text-slate-400 text-sm">Télécharge un fichier .json avec tout le contenu</p>
          </div>
        </div>
        <Btn icon="download" color="green" onClick={() => { exportData(); ok('📥 Fichier téléchargé !') }}>
          Télécharger la sauvegarde (.json)
        </Btn>
      </Box>

      <Box>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-blue-600 text-2xl">upload</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Restaurer une sauvegarde</h3>
            <p className="text-slate-400 text-sm">Importer un fichier .json</p>
          </div>
        </div>
        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
          onClick={() => importRef.current?.click()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) importData(f).then(() => ok('✅ Données restaurées !')).catch(err => alert(err.message)) }}
          onDragOver={e => e.preventDefault()}>
          <span className="material-symbols-outlined text-5xl text-slate-300 mb-2 block">upload_file</span>
          <p className="font-bold text-slate-600 mb-1">Glisse le fichier ici ou clique</p>
          <p className="text-slate-400 text-sm">Fichier .json uniquement</p>
        </div>
        <input ref={importRef} type="file" accept=".json" className="hidden"
          onChange={e => { const f = e.target.files[0]; if (f) importData(f).then(() => ok('✅ Données restaurées !')).catch(err => alert(err.message)); e.target.value = '' }} />
      </Box>

      <Box>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
            <span className="material-symbols-outlined text-red-500 text-2xl">restore</span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Remettre à zéro</h3>
            <p className="text-slate-400 text-sm">Effacer toutes les modifications</p>
          </div>
        </div>
        <Btn icon="delete_forever" color="red" onClick={() => { if (confirm('⚠️ Toutes tes modifications seront perdues. Continuer ?')) { resetToDefaults(); ok('🔄 Remis à zéro') } }}>
          Tout remettre à zéro
        </Btn>
      </Box>
    </Page>
  )

  return null
}
