import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Preloader from './components/Preloader'
import SwipeNavigator from './components/SwipeNavigator'

import Home from './pages/Home'
import DeitiesPage from './pages/DeitiesPage'
import GalleryPage from './pages/GalleryPage'
import EventsPage from './pages/EventsPage'
import ContactPage from './pages/ContactPage'
import ServicesPage from './pages/ServicesPage'
import LotteryPage from './pages/LotteryPage'

function App() {
  const location = useLocation()
  const [isPreloading, setIsPreloading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      </AnimatePresence>
      
      {!isPreloading && (
        <>
          <ScrollToTop />
          <SwipeNavigator />
          <Navbar />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/deities" element={<DeitiesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/lottery" element={<LotteryPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
