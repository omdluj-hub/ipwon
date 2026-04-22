import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'

function App() {
  const location = useLocation()

  useEffect(() => {
    // Traffic tracking logic
    const trackVisit = async () => {
      console.log('Attempting to track visit for path:', location.pathname)
      
      // Don't track if user is already authenticated as admin
      if (sessionStorage.getItem('admin_auth') === 'true') {
        console.log('Skipping track: Admin user detected')
        return
      }
      
      const referrer = document.referrer || 'Direct'
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get('utm_source') || 'None'
      
      const newVisit = {
        timestamp: new Date().toISOString(),
        referrer,
        utmSource,
        path: location.pathname,
        userAgent: navigator.userAgent
      }
      
      try {
        const response = await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newVisit)
        });
        const result = await response.json();
        console.log('Tracking response:', response.status, result);
      } catch (error) {
        console.error('Tracking request failed:', error);
      }
    }
    
    trackVisit()
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )
}

export default App
