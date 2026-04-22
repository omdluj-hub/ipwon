import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '../components/LanguageSelector'
import '../App.css'

function Home() {
  const { t } = useTranslation()

  return (
    <div className="landing-page">
      <LanguageSelector />
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <span className="logo-main">{t('hospital_name')}</span>
            <span className="logo-tag">{t('tagline')}</span>
          </div>
          <nav className="nav">
            <a href="#features">{t('nav_features')}</a>
            <a href="#facilities">{t('nav_facilities')}</a>
            <a href="#process">{t('nav_process')}</a>
            <a href="#location">{t('nav_location')}</a>
          </nav>
          <div className="header-contact">
            <a href="https://pf.kakao.com/_JEGuu" target="_blank" rel="noopener noreferrer" className="btn btn-kakao-sm">{t('btn_kakao')}</a>
            <a href="tel:054-474-1075" className="btn btn-call">{t('btn_call')}</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/image/KakaoTalk_20230131_100611036.jpg')` }}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero_title') }}></h1>
            <p className="hero-sub" dangerouslySetInnerHTML={{ __html: t('hero_sub') }}></p>
            <div className="hero-actions">
              <a href="https://naver.me/5N15Owng" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">{t('btn_reserve')}</a>
              <a href="https://pf.kakao.com/_JEGuu" target="_blank" rel="noopener noreferrer" className="btn btn-kakao btn-lg">{t('btn_kakao')}</a>
              <a href="tel:054-474-1075" className="btn btn-accent btn-lg">{t('btn_call_now')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="quick-info">
        <div className="container info-bar-inner">
          <div className="info-item"><strong>{t('quick_night')}</strong></div>
          <div className="info-item"><strong>{t('quick_365')}</strong></div>
          <div className="info-item"><strong>{t('quick_park')}</strong></div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">{t('features_title')}</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🛌</div>
              <h3>{t('feature_1_title')}</h3>
              <p>{t('feature_1_desc')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏥</div>
              <h3>{t('feature_2_title')}</h3>
              <p>{t('feature_2_desc')}</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💆</div>
              <h3>{t('feature_3_title')}</h3>
              <p>{t('feature_3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="facilities">
        <div className="container">
          <h2 className="section-title">{t('facilities_title')}</h2>
          <div className="gallery">
            <div className="gallery-item">
              <img src="/image/KakaoTalk_20230131_100621199.jpg" alt="입원실" className="facility-img" />
              <p>{t('facility_1_name')}</p>
            </div>
            <div className="gallery-item">
              <img src="/image/KakaoTalk_20230131_100622250.jpg" alt="치료실" className="facility-img" />
              <p>{t('facility_2_name')}</p>
            </div>
            <div className="gallery-item">
              <img src="/image/KakaoTalk_20230131_100623206.jpg" alt="한의원내부" className="facility-img" />
              <p>{t('facility_3_name')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kakao CTA Section */}
      <section className="kakao-cta">
        <div className="container">
          <div className="kakao-box">
            <h2>{t('kakao_cta_title')}</h2>
            <p dangerouslySetInnerHTML={{ __html: t('kakao_cta_desc') }}></p>
            <a href="https://pf.kakao.com/_JEGuu" target="_blank" rel="noopener noreferrer" className="btn btn-kakao btn-lg">{t('kakao_cta_btn')}</a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process">
        <div className="container">
          <h2 className="section-title">{t('process_title')}</h2>
          <div className="process-steps">
            <div className="step">
              <span className="step-num">01</span>
              <h4>{t('process_1_title')}</h4>
              <p>{t('process_1_desc')}</p>
            </div>
            <div className="step">
              <span className="step-num">02</span>
              <h4>{t('process_2_title')}</h4>
              <p>{t('process_2_desc')}</p>
            </div>
            <div className="step">
              <span className="step-num">03</span>
              <h4>{t('process_3_title')}</h4>
              <p>{t('process_3_desc')}</p>
            </div>
            <div className="step">
              <span className="step-num">04</span>
              <h4>{t('process_4_title')}</h4>
              <p>{t('process_4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="location bg-gray">
        <div className="container">
          <div className="location-grid">
            <div className="location-info">
              <h2 className="section-title align-left">{t('location_title')}</h2>
              <div className="info-row">
                <strong>📍 {t('addr_label')}:</strong> {t('addr_value')}
              </div>
              <div className="info-row">
                <strong>📞 {t('phone_label')}:</strong> 054-474-1075
              </div>
              <div className="info-row">
                <strong>⏰ {t('hours_label')}:</strong> 
                <p>{t('hours_1')}</p>
                <p>{t('hours_2')}</p>
                <p>{t('hours_3')}</p>
                <p>{t('hours_4')}</p>
                <p className="highlight-text">{t('hours_note')}</p>
              </div>
              <div className="info-row">
                <strong>🚗 {t('parking_label')}:</strong>
                <p>{t('parking_desc')}</p>
              </div>
            </div>
            <div className="map-area">
              <iframe 
                src="https://maps.google.com/maps?q=경북 구미시 인동가산로 9-3 후한의원 구미점&t=&z=17&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="400" 
                style={{ border: 0, borderRadius: '12px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Kakao Button */}
      <a href="https://pf.kakao.com/_JEGuu" target="_blank" rel="noopener noreferrer" className="floating-kakao">
        <span className="tooltip">{t('btn_kakao')}</span>
        <div className="kakao-icon-circle">💬</div>
      </a>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">{t('hospital_name')}</div>
          <div className="footer-details">
            <p>{t('footer_info')}</p>
            <p>© 2024 Hoo Clinic Gumi. <Link to="/admin" style={{ color: 'inherit', textDecoration: 'none', cursor: 'default' }}>All rights reserved.</Link> | <Link to="/for-ai" style={{ color: '#888', textDecoration: 'none', fontSize: '11px' }}>For AI</Link></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
