import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'
import ForAI from './pages/ForAI'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Traffic tracking logic
    const trackVisit = async () => {
      const isAdmin = sessionStorage.getItem('admin_auth') === 'true'
      const referrer = document.referrer || 'Direct'
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get('utm_source') || 'None'
      
      const newVisit = {
        timestamp: new Date().toISOString(),
        referrer,
        utmSource,
        path: location.pathname,
        userAgent: navigator.userAgent,
        isAdmin
      }
      
      try {
        const response = await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newVisit)
        });
        const result = await response.json();
        if (response.ok) {
          console.log('Tracking success:', result);
        } else {
          console.error('Tracking server error:', result);
        }
      } catch (error) {
        console.error('Tracking request failed (network error):', error);
      }
    }
    
    trackVisit()
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/for-ai" element={<ForAI />} />
    </Routes>
  )
}

export default App
