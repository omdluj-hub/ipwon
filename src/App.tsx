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
      
      // Send to both endpoints
      const trackLocal = async () => {
        try {
          const response = await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVisit)
          });
          const result = await response.json();
          if (response.ok) console.log('Local tracking success:', result);
        } catch (error) {
          console.error('Local tracking failed:', error);
        }
      };

      const trackExternal = async () => {
        try {
          const response = await fetch('https://adminpage-xi.vercel.app/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...newVisit, site_id: 'ipwon' })
          });
          if (response.ok) console.log('External tracking success');
        } catch (error) {
          console.error('External tracking failed:', error);
        }
      };

      trackLocal();
      trackExternal();
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
