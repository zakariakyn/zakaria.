import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SiteProvider } from './context/SiteContext'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import WhatsAppButton from './components/shared/WhatsAppButton'
import PageWrapper from './components/shared/PageWrapper'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

function PublicLayout() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about"     element={<About />} />
          <Route path="/pricing"   element={<Pricing />} />
          <Route path="/contact"   element={<Contact />} />
        </Routes>
      </PageWrapper>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/*"    element={<PublicLayout />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  )
}
