import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll-reveal observer
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(el => {
        if (el.isIntersecting) {
          el.target.classList.add('visible')
          observer.unobserve(el.target)
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    // Observe all .reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}

export default function PageWrapper({ children }) {
  const location = useLocation()
  const ref = useRef(null)

  useScrollReveal()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // Re-trigger animation on route change
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('page-enter')
    void el.offsetWidth // force reflow
    el.classList.add('page-enter')
  }, [location.pathname])

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  )
}
