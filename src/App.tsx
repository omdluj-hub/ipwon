import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Traffic tracking logic (for demonstration using localStorage)
    if (location.pathname === '/') {
      const trackVisit = () => {
        const visits = JSON.parse(localStorage.getItem('traffic_data') || '[]')
        const referrer = document.referrer || 'Direct'
        const urlParams = new URLSearchParams(window.location.search)
        const utmSource = urlParams.get('utm_source') || 'None'
        
        const newVisit = {
          timestamp: new Date().toISOString(),
          referrer,
          utmSource,
          path: location.pathname
        }
        
        visits.push(newVisit)
        // Keep only last 1000 visits to avoid filling localStorage
        if (visits.length > 1000) visits.shift()
        localStorage.setItem('traffic_data', JSON.stringify(visits))
      }
      
      trackVisit()
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
