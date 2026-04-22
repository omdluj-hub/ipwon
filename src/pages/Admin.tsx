import { useState, useEffect } from 'react'
import '../App.css'

interface Visit {
  timestamp: string
  referrer: string
  utmSource: string
  path: string
  userAgent?: string
}

const getBotInfo = (ua?: string) => {
  if (!ua) return { name: 'Unknown', isBot: false }
  
  const bots = [
    { name: 'ChatGPT (GPTBot)', pattern: /GPTBot/i },
    { name: 'Google Bot', pattern: /Googlebot/i },
    { name: 'Bing Bot', pattern: /Bingbot/i },
    { name: 'Naver Yeti', pattern: /Yeti/i },
    { name: 'Claude Bot', pattern: /ClaudeBot/i },
    { name: 'Gemini/Google', pattern: /Mediapartners-Google/i },
    { name: 'Pinterest', pattern: /Pinterest/i },
    { name: 'Facebook', pattern: /facebookexternalhit/i }
  ]

  for (const bot of bots) {
    if (bot.pattern.test(ua)) return { name: bot.name, isBot: true }
  }

  if (/bot|crawler|spider|crawling/i.test(ua)) return { name: 'Generic Bot', isBot: true }
  if (/iPhone|iPad|iPod/i.test(ua)) return { name: 'iOS Device', isBot: false }
  if (/Android/i.test(ua)) return { name: 'Android Device', isBot: false }
  if (/Macintosh/i.test(ua)) return { name: 'Mac', isBot: false }
  if (/Windows/i.test(ua)) return { name: 'Windows PC', isBot: false }

  return { name: 'Other Device', isBot: false }
}

type Period = 'daily' | 'weekly' | 'monthly' | 'all'

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [allVisits, setAllVisits] = useState<Visit[]>([])
  const [filteredVisits, setFilteredVisits] = useState<Visit[]>([])
  const [period, setPeriod] = useState<Period>('all')

  const fetchData = async () => {
    console.log('Fetching visit data from API...')
    try {
      const response = await fetch('/api/track')
      console.log('Fetch response status:', response.status)
      const data = await response.json()
      console.log('Received raw data:', data)
      
      if (Array.isArray(data)) {
        setAllVisits(data)
        setFilteredVisits(data)
        console.log('Successfully set visits:', data.length)
      } else {
        console.error('API error (non-array):', data.error || 'Unknown error', data.message || '', data)
        setAllVisits([])
        setFilteredVisits([])
      }
    } catch (error) {
      console.error('Fetch request failed:', error)
    }
  }

  useEffect(() => {
    // Check if already authenticated in this session
    const authStatus = sessionStorage.getItem('admin_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    
    fetchData()
  }, [])

  useEffect(() => {
    const now = new Date()
    let filtered = [...allVisits]

    if (period === 'daily') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
      filtered = allVisits.filter(v => new Date(v.timestamp).getTime() >= today)
    } else if (period === 'weekly') {
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).getTime()
      filtered = allVisits.filter(v => new Date(v.timestamp).getTime() >= lastWeek)
    } else if (period === 'monthly') {
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).getTime()
      filtered = allVisits.filter(v => new Date(v.timestamp).getTime() >= lastMonth)
    }

    setFilteredVisits(filtered)
  }, [period, allVisits])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'gnrnal1075') {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
    } else {
      alert('비밀번호가 틀렸습니다.')
    }
  }

  const getStats = () => {
    const stats: { [key: string]: number } = {}
    filteredVisits.forEach(v => {
      const source = v.utmSource !== 'None' ? `UTM: ${v.utmSource}` : v.referrer
      stats[source] = (stats[source] || 0) + 1
    })
    return Object.entries(stats).sort((a, b) => b[1] - a[1])
  }

  const clearData = async () => {
    if (confirm('모든 방문 통계를 서버에서 삭제하시겠습니까?')) {
      try {
        await fetch('/api/track', { method: 'DELETE' })
        setAllVisits([])
        setFilteredVisits([])
      } catch (error) {
        console.error('Failed to clear data:', error)
      }
    }
  }

  const periodLabels: Record<Period, string> = {
    daily: '오늘',
    weekly: '최근 7일',
    monthly: '최근 30일',
    all: '전체'
  }

  if (!isAuthenticated) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        fontFamily: 'sans-serif' 
      }}>
        <form onSubmit={handleLogin} style={{ 
          background: '#fff', 
          padding: '40px', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '320px'
        }}>
          <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>관리자 로그인</h2>
          <input 
            type="password" 
            placeholder="비밀번호를 입력하세요" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '16px', 
              borderRadius: '6px', 
              border: '1px solid #ddd',
              boxSizing: 'border-box'
            }}
          />
          <button type="submit" style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>로그인</button>
        </form>
      </div>
    )
  }

  return (
    <div className="admin-page" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>관리자 대시보드</h1>
        <button onClick={clearData} className="btn" style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>통계 초기화</button>
      </header>

      <section className="stats-section" style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px' }}>유입 경로 통계 ({periodLabels[period]})</h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['all', 'daily', 'weekly', 'monthly'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #ddd',
                  backgroundColor: period === p ? '#007bff' : '#fff',
                  color: period === p ? '#fff' : '#333',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {periodLabels[p]}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          {getStats().map(([source, count]) => (
            <div key={source} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontWeight: 500, color: '#444' }}>{source}</span>
              <span style={{ color: '#007bff', fontWeight: 'bold' }}>{count}회 방문</span>
            </div>
          ))}
          {filteredVisits.length === 0 && <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>선택한 기간에 해당하는 데이터가 없습니다.</p>}
        </div>
      </section>

      <section className="log-section">
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>최근 방문 로그 ({filteredVisits.length}건)</h2>
        <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', border: '1px solid #eee' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#fcfcfc', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '16px' }}>시간</th>
                <th style={{ padding: '16px' }}>경로 (Path)</th>
                <th style={{ padding: '16px' }}>유입 (Referrer)</th>
                <th style={{ padding: '16px' }}>UTM</th>
                <th style={{ padding: '16px' }}>기기/봇</th>
              </tr>
            </thead>
            <tbody>
              {[...filteredVisits].reverse().slice(0, 100).map((visit, index) => {
                const botInfo = getBotInfo(visit.userAgent)
                return (
                  <tr key={index} style={{ 
                    borderBottom: '1px solid #f5f5f5',
                    backgroundColor: botInfo.isBot ? '#f0f7ff' : 'transparent'
                  }}>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#666' }}>{new Date(visit.timestamp).toLocaleString()}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#007bff', fontWeight: 'bold' }}>{visit.path || '/'}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#444' }}>{visit.referrer}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#444' }}>{visit.utmSource}</td>
                    <td style={{ padding: '14px 16px', fontSize: '14px', color: botInfo.isBot ? '#007bff' : '#444', fontWeight: botInfo.isBot ? 'bold' : 'normal' }}>
                      {botInfo.name}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
      
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a href="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>← 홈페이지로 돌아가기</a>
      </div>
    </div>
  )
}

export default Admin
