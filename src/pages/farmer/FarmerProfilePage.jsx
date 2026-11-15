import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './FarmerProfilePage.css';

const FarmerProfilePage = () => {
  const { lang, setLang } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile'); // profile, land, payment, language

  // Form State
  const [fullName, setFullName] = useState(user?.name || 'રમેશભાઈ કાનજીભાઈ પટેલ');
  const [mobile, setMobile] = useState(user?.mobile || '9825478210');
  const [payoutMode, setPayoutMode] = useState('bank'); // bank, upi, cash
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [voiceCallAlerts, setVoiceCallAlerts] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    toast.success(lang === 'gu' ? 'પ્રોફાઇલ અને સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવ્યા! 🎉' : 'Profile & settings saved successfully! 🎉');
  };

  const handleDownloadCard = () => {
    toast.success(lang === 'gu' ? 'કિસાન સ્માર્ટ કાર્ડ ડાઉનલોડ થઈ રહ્યું છે...' : 'Downloading Farmer Smart Card...');
  };

  const handleLogout = () => {
    logout();
    toast.success(
      lang === 'gu' ? 'સફળતાપૂર્વક લૉગઆઉટ થયા! 🙏' : 'Logged out successfully! 🙏'
    );
    navigate('/login');
  };

  return (
    <div className="farmer-profile-page">
      <div className="fp-container">

        {/* Top Breadcrumbs */}
        <div className="fp-top-bar">
          <div className="fp-breadcrumbs">
            <Link to="/farmer/dashboard">🏠 {lang === 'gu' ? 'કિસાન પોર્ટલ' : 'Farmer Portal'}</Link>
            <span className="crumb-sep">›</span>
            <span>{lang === 'gu' ? 'ખાતું અને સેટિંગ્સ' : 'Account & Settings'}</span>
            <span className="crumb-sep">›</span>
            <span className="crumb-current">{lang === 'gu' ? 'ખેડૂત પ્રોફાઈલ' : 'Farmer Profile'}</span>
          </div>

          <div className="fp-top-actions">
            <a href="https://wa.me/919429088211" target="_blank" rel="noreferrer" className="fp-btn-whatsapp-help">
              💬 {lang === 'gu' ? 'APMC વ્હોટ્સએપ હેલ્પ' : 'APMC WhatsApp Help'}
            </a>
            <button type="button" className="fp-btn-download-card" onClick={handleDownloadCard}>
              📄 {lang === 'gu' ? 'પ્રોફાઇલ કાર્ડ ડાઉનલોડ' : 'Download ID Card'}
            </button>
            <button
              type="button"
              className="fp-btn-logout-prominent"
              onClick={handleLogout}
              title={lang === 'gu' ? 'લૉગઆઉટ કરો' : 'Logout'}
            >
              🚪 {lang === 'gu' ? 'લૉગઆઉટ (Logout)' : 'Logout'}
            </button>
          </div>
        </div>

        {/* Header Hero Section */}
        <div className="fp-header-hero">
          <h1 className="fp-page-title">
            {lang === 'gu' ? 'ખેડૂત પ્રોફાઈલ અને સેટિંગ્સ (Farmer Profile & Account Settings)' : 'Farmer Profile & Account Settings'}
          </h1>
          <p className="fp-page-sub">
            {lang === 'gu'
              ? 'રાજકોટ અને જેતપુર APMC હેઠળ રજિસ્ટર્ડ સત્તાવાર ખેડૂત ખાતાનું સંચાલન, જમીન રેકોર્ડ્સ અને બેંકિંગ વિગતો.'
              : 'Official APMC registered farmer account management, AnyRoR land records, and verified bank payout settings.'}
          </p>
        </div>

        {/* Farmer Official Identity Card */}
        <div className="fp-id-card">
          <div className="fp-idc-left">
            <div className="fp-avatar-wrap">
              <div className="fp-avatar-img-box">
                <span className="fp-avatar-emoji">👨‍🌾</span>
              </div>
              <button type="button" className="fp-avatar-cam-btn" title="Change photo">📷</button>
            </div>

            <div className="fp-idc-details">
              <div className="fp-name-row">
                <h2 className="fp-farmer-name">{fullName}</h2>
                <span className="fp-712-badge">
                  🛡️ {lang === 'gu' ? '૭/૧૨ અને ૮-અ આધાર વેરિફાઇડ ખેડૂત (Verified Farmer)' : '7/12 & 8-A Aadhaar Verified Farmer'}
                </span>
              </div>

              <div className="fp-idc-meta-line">
                <span>🏷️ {lang === 'gu' ? 'કિસાન આઈડી:' : 'Farmer ID:'} <strong>#KB-GUJ-8841</strong></span>
                <span className="fp-meta-sep">•</span>
                <span>📅 {lang === 'gu' ? 'સભ્ય બન્યા:' : 'Member since:'} <strong>જાન્યુઆરી ૨૦૨૪</strong></span>
              </div>

              <div className="fp-idc-address-line">
                <span>📍 {lang === 'gu' ? 'ગામ: નવાગઢ, તાલુકો: જેતપુર, જિલ્લો: રાજકોટ (સૌરાષ્ટ્ર) - પિન: ૩૬૦૩૭૦' : 'Village: Navagadh, Taluka: Jetpur, District: Rajkot - PIN: 360370'}</span>
              </div>
            </div>
          </div>

          <div className="fp-idc-right">
            <div className="fp-mandi-badge-box">
              <span className="mb-label">{lang === 'gu' ? 'પ્રાથમિક માર્કેટ યાર્ડ' : 'Primary APMC Yard'}</span>
              <strong className="mb-mandi-name">🏛️ {lang === 'gu' ? 'જેતપુર & ગોંડલ APMC' : 'Jetpur & Gondal APMC'}</strong>
              <span className="mb-grade-tag">{lang === 'gu' ? 'ગ્રેડ-A વેપારી માન્યતા' : 'Grade-A Mandi Certified'}</span>
            </div>
          </div>
        </div>

        {/* 4 Navigation Tabs */}
        <div className="fp-tabs-bar">
          <button
            type="button"
            className={`fp-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 {lang === 'gu' ? 'પ્રોફાઇલ વિગત' : 'Profile Details'}
          </button>
          <button
            type="button"
            className={`fp-tab-btn ${activeTab === 'land' ? 'active' : ''}`}
            onClick={() => setActiveTab('land')}
          >
            🌾 {lang === 'gu' ? 'જમીન અને ૭/૧૨' : 'Land Records (7/12)'}
          </button>
          <button
            type="button"
            className={`fp-tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
            onClick={() => setActiveTab('payment')}
          >
            🏦 {lang === 'gu' ? 'પેમેન્ટ એકાઉન્ટ' : 'Payment Account'}
          </button>
          <button
            type="button"
            className={`fp-tab-btn ${activeTab === 'language' ? 'active' : ''}`}
            onClick={() => setActiveTab('language')}
          >
            ⚙️ {lang === 'gu' ? 'ભાષા અને સિક્યુરિટી' : 'Language & Security'}
          </button>
        </div>

        {/* 4 Content Sections Form */}
        <form onSubmit={handleSaveProfile} className="fp-sections-container">
          
          {/* SECTION 1: Personal & Aadhaar Verification */}
          <div className="fp-section-card">
            <div className="fp-sc-header">
              <div className="sc-left">
                <span className="sc-icon">📋</span>
                <div>
                  <h3 className="sc-title">
                    {lang === 'gu' ? '૧. વ્યક્તિગત અને આધાર વિગતો (Personal & Aadhaar Verification)' : '1. Personal & Aadhaar Verification'}
                  </h3>
                </div>
              </div>
              <span className="sc-completed-tag">✓ {lang === 'gu' ? 'સંપૂર્ણ પૂર્ણ' : 'Verified'}</span>
            </div>

            <div className="fp-sc-body">
              <div className="fp-grid-2">
                
                {/* Full Name */}
                <div className="fp-form-group">
                  <label>{lang === 'gu' ? 'પૂરું નામ (Full Name - સરકારી રેકોર્ડ મુજબ) *' : 'Full Name (As per official records) *'}</label>
                  <div className="fp-input-icon-wrap">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="fp-input"
                    />
                    <span className="fp-input-check">✓</span>
                  </div>
                  <span className="fp-hint">{lang === 'gu' ? 'આધાર કાર્ડ અને બેંક પાસબુક મુજબનું પ્રમાણિત નામ.' : 'Verified as per Aadhaar & Bank Passbook.'}</span>
                </div>

                {/* Mobile Number */}
                <div className="fp-form-group">
                  <label>{lang === 'gu' ? 'મોબાઇલ નંબર (Mobile Number) *' : 'Mobile Number *'}</label>
                  <div className="fp-input-icon-wrap">
                    <input
                      type="text"
                      value={`+91 ${mobile}`}
                      onChange={(e) => setMobile(e.target.value.replace('+91 ', ''))}
                      className="fp-input"
                    />
                    <span className="fp-badge-otp">✓ {lang === 'gu' ? 'વેરિફાઇડ OTP થી' : 'Verified OTP'}</span>
                  </div>
                  <span className="fp-hint">{lang === 'gu' ? 'આ નંબર પર ડીલ્સ અને પેમેન્ટ એલર્ટ આવશે.' : 'Alerts and OTPs sent to this number.'}</span>
                </div>

              </div>

              {/* Aadhaar Box */}
              <div className="fp-aadhaar-box">
                <div className="ab-left">
                  <span className="ab-icon">🪪</span>
                  <div>
                    <span className="ab-label">{lang === 'gu' ? 'આધાર કાર્ડ વેરિફિકેશન સ્થિતિ (UIDAI Status)' : 'Aadhaar Verification Status (UIDAI)'}</span>
                    <strong className="ab-number">XXXXXXXX4589</strong>
                    <span className="ab-sub-text">✓ UIDAI ઈ-કેવાયસી વેરિફાઇડ</span>
                  </div>
                </div>

                <button type="button" className="ab-btn-reverify" onClick={() => toast.success(lang === 'gu' ? 'આધાર સ્ટેટસ સક્રિય છે' : 'Aadhaar status active')}>
                  {lang === 'gu' ? 'પુનઃ ચકાસણી' : 'Re-verify'}
                </button>
              </div>

              <div className="fp-security-notice">
                🔒 {lang === 'gu' ? 'સરકારી ડેટા સુરક્ષા ધારા અનુસાર તમામ વ્યક્તિગત ડેટા એન્ક્રિપ્ટેડ છે.' : 'All personal data is encrypted according to Digital Personal Data Protection Act.'}
              </div>
            </div>
          </div>

          {/* SECTION 2: Land Records (7/12 & 8-A - AnyRoR) */}
          <div className="fp-section-card">
            <div className="fp-sc-header">
              <div className="sc-left">
                <span className="sc-icon">🌾</span>
                <div>
                  <h3 className="sc-title">
                    {lang === 'gu' ? '૨. જમીન અને વાવેતરની વિગતો (Land Records - 7/12 & 8-A)' : '2. Land Records (7/12 & 8-A)'}
                  </h3>
                </div>
              </div>
              <span className="sc-anyror-tag">🌐 AnyRoR કનેક્ટેડ</span>
            </div>

            <div className="fp-sc-body">
              <div className="fp-grid-2">
                
                {/* Land Holding */}
                <div className="fp-info-tile">
                  <span className="it-lbl">{lang === 'gu' ? 'કુલ જમીન વિગત' : 'Total Land Holding'}</span>
                  <strong className="it-val">{lang === 'gu' ? '૧૫ વીઘા (૬.૨ એકર)' : '15 Vigha (6.2 Acres)'}</strong>
                  <span className="it-sub">💧 {lang === 'gu' ? 'પિયત જમીન (કૂવો + બોરવેલ)' : 'Irrigated Land (Well + Borewell)'}</span>
                </div>

                {/* Survey Number */}
                <div className="fp-info-tile">
                  <span className="it-lbl">{lang === 'gu' ? 'સર્વે / ખાતા નંબર' : 'Survey / Khata Number'}</span>
                  <strong className="it-val">૧૨૪/૨</strong>
                  <span className="it-sub">🏛️ {lang === 'gu' ? 'જેતપુર સબ-ડિવિઝન રેકોર્ડ' : 'Jetpur Sub-Division Record'}</span>
                </div>

              </div>

              {/* Current Season Crops */}
              <div className="fp-crops-season-box">
                <span className="csb-title">{lang === 'gu' ? 'મુખ્ય વાવેતર કરેલા પાક (Current Season Crops)' : 'Current Season Crops'}</span>
                <div className="csb-grid">
                  <div className="csb-item">
                    <span className="csb-dot green"></span>
                    <div>
                      <strong>{lang === 'gu' ? 'કપાસ (Cotton)' : 'Cotton'}</strong>
                      <span className="csb-sub">{lang === 'gu' ? '૧૦ વીઘા વાવેતર' : '10 Vigha cultivated'}</span>
                    </div>
                  </div>
                  <div className="csb-item">
                    <span className="csb-dot orange"></span>
                    <div>
                      <strong>{lang === 'gu' ? 'જીરૂ (Cumin Seed)' : 'Cumin Seed'}</strong>
                      <span className="csb-sub">{lang === 'gu' ? '૫ વીઘા વાવેતર' : '5 Vigha cultivated'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Proof */}
              <div className="fp-proof-status-card">
                <div className="psc-left">
                  <span className="psc-check">✓</span>
                  <div>
                    <strong>AnyRoR રેકોર્ડ વેરિફાઇડ ✓</strong>
                    <span className="psc-sub">{lang === 'gu' ? 'તાજેતરનું ૭/૧૨ અને ૮-અ નકલ પ્રમાણપત્ર સંલગ્ન છે.' : 'Latest 7/12 & 8-A certified revenue extract linked.'}</span>
                  </div>
                </div>
                <button type="button" className="psc-btn-view" onClick={() => toast.success(lang === 'gu' ? '૭/૧૨ નકલ ખુલી રહી છે...' : 'Opening 7/12 extract...')}>
                  📄 {lang === 'gu' ? 'નકલ જુઓ' : 'View Document'}
                </button>
              </div>

              <div className="fp-section-footer-row">
                <span className="sfr-date">{lang === 'gu' ? 'છેલ્લું અપડેટ: ૧૨ ફેબ્રુઆરી ૨૦૨૫' : 'Last Updated: 12 Feb 2025'}</span>
                <Link to="/farmer/add-crop" className="sfr-add-crop-link">
                  ⊕ {lang === 'gu' ? 'નવો પાક ઉમેરો' : 'Add New Crop'}
                </Link>
              </div>
            </div>
          </div>

          {/* SECTION 3: Payment & Bank Transfer Settings */}
          <div className="fp-section-card">
            <div className="fp-sc-header">
              <div className="sc-left">
                <span className="sc-icon">💳</span>
                <div>
                  <h3 className="sc-title">
                    {lang === 'gu' ? '૩. પેમેન્ટ અને બેંક વિગતો (Payment & Bank Transfer Settings)' : '3. Payment & Bank Transfer Settings'}
                  </h3>
                  <span className="sc-sub-text">
                    {lang === 'gu' ? 'મંડીમાં વેચાણ થયેલા પાકની રકમ સીધા તમારા બેંક ખાતામાં જમા કરવામાં આવે છે.' : 'Crop sale proceeds deposited directly into your verified bank account.'}
                  </span>
                </div>
              </div>
              <span className="sc-escrow-badge">🛡️ {lang === 'gu' ? 'એસ્ક્રો પેમેન્ટ સુરક્ષા સક્રિય છે (૧૦૦% સલામત)' : 'Escrow Protection Active (100% Safe)'}</span>
            </div>

            <div className="fp-sc-body">
              {/* Payout Mode Radio Options */}
              <div className="fp-payout-options-grid">
                
                <label className={`fp-payout-card ${payoutMode === 'bank' ? 'selected' : ''}`}>
                  <div className="poc-top">
                    <input
                      type="radio"
                      name="payoutMode"
                      value="bank"
                      checked={payoutMode === 'bank'}
                      onChange={() => setPayoutMode('bank')}
                    />
                    <strong>{lang === 'gu' ? 'ડાયરેક્ટ બેંક ટ્રાન્સફર' : 'Direct Bank Transfer'}</strong>
                    {payoutMode === 'bank' && <span className="poc-check">✓</span>}
                  </div>
                  <span className="poc-sub">RTGS / NEFT / IMPS ({lang === 'gu' ? 'સૌથી ઝડપી' : 'Fastest'})</span>
                </label>

                <label className={`fp-payout-card ${payoutMode === 'upi' ? 'selected' : ''}`}>
                  <div className="poc-top">
                    <input
                      type="radio"
                      name="payoutMode"
                      value="upi"
                      checked={payoutMode === 'upi'}
                      onChange={() => setPayoutMode('upi')}
                    />
                    <strong>UPI પેમેન્ટ</strong>
                    {payoutMode === 'upi' && <span className="poc-check">✓</span>}
                  </div>
                  <span className="poc-sub">GPay / PhonePe / BHIM</span>
                </label>

                <label className={`fp-payout-card ${payoutMode === 'cash' ? 'selected' : ''}`}>
                  <div className="poc-top">
                    <input
                      type="radio"
                      name="payoutMode"
                      value="cash"
                      checked={payoutMode === 'cash'}
                      onChange={() => setPayoutMode('cash')}
                    />
                    <strong>{lang === 'gu' ? 'રોકડ / કેશ (APMC યાર્ડ)' : 'Cash at Mandi Yard'}</strong>
                    {payoutMode === 'cash' && <span className="poc-check">✓</span>}
                  </div>
                  <span className="poc-sub">{lang === 'gu' ? 'રૂબરૂ રોકડ રસીદ મેળવીને' : 'In-person printed receipt'}</span>
                </label>

              </div>

              {/* Active Bank Account Card */}
              <div className="fp-active-bank-card">
                <div className="abc-header">
                  <div className="abc-left">
                    <span className="abc-bank-icon">🏛️</span>
                    <div>
                      <strong className="abc-bank-name">State Bank of India (SBI)</strong>
                      <span className="abc-branch">{lang === 'gu' ? 'શાખા: જેતપુર મુખ્ય બજાર (Jetpur Main)' : 'Branch: Jetpur Main Market'}</span>
                    </div>
                  </div>

                  <div className="abc-right">
                    <span className="abc-primary-tag">✓ {lang === 'gu' ? 'પ્રાથમિક ખાતું સક્રિય' : 'Primary Account Active'}</span>
                    <button type="button" className="abc-btn-change" onClick={() => toast.success('Bank edit modal')}>
                      {lang === 'gu' ? 'ખાતું બદલો' : 'Change Account'}
                    </button>
                  </div>
                </div>

                <div className="abc-body-grid">
                  <div className="abc-item">
                    <span className="abc-lbl">{lang === 'gu' ? 'બેંક ખાતા નંબર:' : 'Bank Account Number:'}</span>
                    <strong className="abc-val">••••••••••••૫૬૭૮</strong>
                  </div>

                  <div className="abc-item">
                    <span className="abc-lbl">{lang === 'gu' ? 'IFSC કોડ:' : 'IFSC Code:'}</span>
                    <strong className="abc-val">SBIN0001234</strong>
                  </div>

                  <div className="abc-item">
                    <span className="abc-lbl">{lang === 'gu' ? 'ખાતાનો પ્રકાર:' : 'Account Type:'}</span>
                    <strong className="abc-val">{lang === 'gu' ? 'કિસાન ક્રેડિટ બચત ખાતું (KCC Savings)' : 'Kisan Credit Savings (KCC)'}</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* SECTION 4: Language & Notification Preferences */}
          <div className="fp-section-card">
            <div className="fp-sc-header">
              <div className="sc-left">
                <span className="sc-icon">⚙️</span>
                <div>
                  <h3 className="sc-title">
                    {lang === 'gu' ? '૪. સિસ્ટમ ભાષા અને નોટિફિકેશન પસંદગી (Language & Alert Preferences)' : '4. Language & Alert Preferences'}
                  </h3>
                  <span className="sc-sub-text">
                    {lang === 'gu' ? 'દૈનિક ભાવ ફેરફાર અને પેમેન્ટ કન્ફર્મેશન એલર્ટ મેળવવાના વિકલ્પો.' : 'Options for daily APMC rate movements and auction payout alerts.'}
                  </span>
                </div>
              </div>
            </div>

            <div className="fp-sc-body">
              <div className="fp-grid-2">
                
                {/* Language Picker */}
                <div className="fp-pref-col">
                  <label className="pref-heading">{lang === 'gu' ? 'એપ્લિકેશન ભાષા પસંદ કરો (Language)' : 'Select Application Language'}</label>
                  <div className="fp-lang-selector-grid">
                    <button
                      type="button"
                      className={`lang-choice-card ${lang === 'gu' ? 'selected' : ''}`}
                      onClick={() => setLang('gu')}
                    >
                      <strong className="lc-title">ગુજરાતી</strong>
                      <span className="lc-sub">Selected</span>
                    </button>

                    <button
                      type="button"
                      className={`lang-choice-card ${lang === 'en' ? 'selected' : ''}`}
                      onClick={() => setLang('en')}
                    >
                      <strong className="lc-title">English</strong>
                      <span className="lc-sub">અંગ્રેજી</span>
                    </button>

                    <button
                      type="button"
                      className="lang-choice-card"
                      onClick={() => toast.success('Hindi coming soon')}
                    >
                      <strong className="lc-title">हिंदी</strong>
                      <span className="lc-sub">હિન્દી</span>
                    </button>
                  </div>
                </div>

                {/* Alert Channels */}
                <div className="fp-pref-col">
                  <label className="pref-heading">{lang === 'gu' ? 'સંચાર અને ચેતવણી ચેનલો (Alert Channels)' : 'Communication & Alert Channels'}</label>
                  
                  <div className="fp-toggle-row">
                    <div className="tr-info">
                      <span className="tr-icon">📱</span>
                      <div>
                        <strong>{lang === 'gu' ? 'SMS / WhatsApp એલર્ટ્સ' : 'SMS / WhatsApp Alerts'}</strong>
                        <p>{lang === 'gu' ? 'નવી બોલી ઓફર, મંડી ભાવ ફેરફાર અને પેમેન્ટ કન્ફર્મેશન સંદેશ.' : 'New offers, mandi rate sheets and payout confirmations.'}</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={smsAlerts}
                        onChange={(e) => setSmsAlerts(e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                  <div className="fp-toggle-row">
                    <div className="tr-info">
                      <span className="tr-icon">📞</span>
                      <div>
                        <strong>{lang === 'gu' ? 'મહત્વપૂર્ણ ઓક્શન કોલ (Voice Call)' : 'Critical Auction Voice Call'}</strong>
                        <p>{lang === 'gu' ? 'જો પાકની બોલી અંતિમ તબક્કામાં હોય ત્યારે તાત્કાલિક કૉલ.' : 'Urgent call when live bids reach threshold.'}</p>
                      </div>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={voiceCallAlerts}
                        onChange={(e) => setVoiceCallAlerts(e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Bottom Sticky Footer */}
          <div className="fp-bottom-action-bar">
            <span className="bab-sync-note">
              ℹ️ {lang === 'gu' ? 'તમામ ફેરફારો તાત્કાલિક APMC પોર્ટલ પર સિન્ક થઈ જશે.' : 'All modifications sync directly with the APMC registry.'}
            </span>

            <div className="bab-buttons-group">
              <button
                type="button"
                className="bab-btn-cancel"
                onClick={() => toast.success(lang === 'gu' ? 'ફેરફારો રદ કર્યા' : 'Changes discarded')}
              >
                {lang === 'gu' ? 'રદ કરો (Cancel)' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="bab-btn-save"
              >
                💾 {lang === 'gu' ? 'પ્રોફાઇલ સાચવો (Save Changes)' : 'Save Profile Changes'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default FarmerProfilePage;
