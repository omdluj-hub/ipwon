import '../App.css'

function Home() {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <span className="logo-main">후한의원 구미점</span>
            <span className="logo-tag">교통사고 1인실 입원치료</span>
          </div>
          <nav className="nav">
            <a href="#features">입원실특징</a>
            <a href="#facilities">시설안내</a>
            <a href="#process">치료절차</a>
            <a href="#location">진료시간/위치</a>
          </nav>
          <div className="header-contact">
            <a href="https://pf.kakao.com/_JEGuu" target="_blank" rel="noopener noreferrer" className="btn btn-kakao-sm">카톡상담</a>
            <a href="tel:054-474-1075" className="btn btn-call">문의 054-474-1075</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('/image/KakaoTalk_20230131_100611036.jpg')` }}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              교통사고 후유증,<br />
              <span className="accent">365일 운영 1인실 위주</span><br />
              쾌적한 입원 환경에서 회복하세요
            </h1>
            <p className="hero-sub">
              사고 접수번호만 있으면 절차 완료! <br />
              월/화/수/금 야간진료(20:30)로 바쁜 일상 중에도 집중 치료가 가능합니다.
            </p>
            <div className="hero-actions">
              <a href="https://naver.me/5N15Owng" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">네이버 예약</a>
              <a href="https://pf.kakao.com/_JEGuu" target="_blank" rel="noopener noreferrer" className="btn btn-kakao btn-lg">카톡 상담</a>
              <a href="tel:054-474-1075" className="btn btn-accent btn-lg">전화하기</a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <div className="quick-info">
        <div className="container info-bar-inner">
          <div className="info-item"><strong>야간진료</strong> 월/화/수/금 (~20:30)</div>
          <div className="info-item"><strong>입원실</strong> 365일 정상 운영</div>
          <div className="info-item"><strong>주차안내</strong> 건물 내 무료 타워 주차</div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">후한의원 구미점만의 쾌적한 회복 시스템</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🛌</div>
              <h3>프라이빗 1인실 위주 구성</h3>
              <p>다인실의 불편함 없이, 개인의 프라이버시가 보장되는 1인실 중심의 입원실에서 조용하고 편안한 회복을 돕습니다.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🏥</div>
              <h3>365일 끊김 없는 케어</h3>
              <p>외래 휴진일(목, 일, 공휴일)과 관계없이 입원실은 365일 연중무휴로 운영되어 집중적인 통증 관리가 가능합니다.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">💆</div>
              <h3>1:1 증상별 한방 집중 케어</h3>
              <p>침, 약침, 추나요법 등 체계적인 한방 진료를 통해 사고 후유증의 빠른 회복과 안정을 돕습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="facilities">
        <div className="container">
          <h2 className="section-title">최상의 진료 환경</h2>
          <div className="gallery">
            <div className="gallery-item">
              <img src="/image/KakaoTalk_20230131_100621199.jpg" alt="입원실" className="facility-img" />
              <p>아늑하고 쾌적한 전용 입원실</p>
            </div>
            <div className="gallery-item">
              <img src="/image/KakaoTalk_20230131_100622250.jpg" alt="치료실" className="facility-img" />
              <p>집중 케어를 위한 진료 공간</p>
            </div>
            <div className="gallery-item">
              <img src="/image/KakaoTalk_20230131_100623206.jpg" alt="한의원내부" className="facility-img" />
              <p>편안한 대기 및 상담 공간</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kakao CTA Section */}
      <section className="kakao-cta">
        <div className="container">
          <div className="kakao-box">
            <h2>전화가 부담스러우신가요?</h2>
            <p>카카오톡으로 언제 어디서든 편하게 문의하세요. <br />친절하고 빠른 상담을 도와드립니다.</p>
            <a href="https://pf.kakao.com/_JEGuu" target="_blank" rel="noopener noreferrer" className="btn btn-kakao btn-lg">후한의원 구미점 카톡 상담하기</a>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process">
        <div className="container">
          <h2 className="section-title">간편한 교통사고 치료 절차</h2>
          <div className="process-steps">
            <div className="step">
              <span className="step-num">01</span>
              <h4>접수 및 보험 확인</h4>
              <p>사고 접수번호와 담당자 연락처만 알려주시면 보험사 지불보증 절차를 저희가 진행합니다.</p>
            </div>
            <div className="step">
              <span className="step-num">02</span>
              <h4>원장님 1:1 정밀 진단</h4>
              <p>환자분의 증상과 체질에 맞는 맞춤형 치료 계획을 수립합니다.</p>
            </div>
            <div className="step">
              <span className="step-num">03</span>
              <h4>집중 치료 및 입원</h4>
              <p>쾌적한 1인실 환경에서 침, 약침, 추나 등 집중적인 회복 치료를 시작합니다.</p>
            </div>
            <div className="step">
              <span className="step-num">04</span>
              <h4>건강한 일상 복귀</h4>
              <p>건강한 일상 복귀를 목표로 후유증 최소화를 위해 정성을 다해 케어합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="location bg-gray">
        <div className="container">
          <div className="location-grid">
            <div className="location-info">
              <h2 className="section-title align-left">오시는 길 및 진료 시간</h2>
              <div className="info-row">
                <strong>📍 주소:</strong> 경북 구미시 인동가산로 9-3, 4층 (인동동)
              </div>
              <div className="info-row">
                <strong>📞 전화번호:</strong> 054-474-1075
              </div>
              <div className="info-row">
                <strong>⏰ 진료 시간 (외래):</strong> 
                <p>• 월/화/수/금: 10:30 ~ 20:30 (야간진료)</p>
                <p>• 토요일: 10:00 ~ 14:00 (점심시간 없음)</p>
                <p>• 점심시간: 13:00 ~ 14:00 (평일)</p>
                <p>• 휴진: 매주 목요일, 일요일, 공휴일</p>
                <p className="highlight-text">* 입원실은 365일 연중무휴 운영됩니다.</p>
              </div>
              <div className="info-row">
                <strong>🚗 주차 안내:</strong>
                <p>건물 내 타워 주차장 무료 이용 가능 (주차 불가 시 인근 사설 주차장 지원)</p>
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
        <span className="tooltip">카톡 상담</span>
        <div className="kakao-icon-circle">💬</div>
      </a>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">후한의원 구미점</div>
          <div className="footer-details">
            <p>상호: 후한의원 구미점 | 주소: 경북 구미시 인동가산로 9-3, 4층 | TEL: 054-474-1075</p>
            <p>© 2024 Hoo Clinic Gumi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
