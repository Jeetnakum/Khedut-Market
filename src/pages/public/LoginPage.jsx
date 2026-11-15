import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './LoginPage.css';

const DISTRICT_TALUKA_MAP = {
  'Rajkot': {
    gu: 'રાજકોટ (Rajkot)',
    talukas: [
      { val: 'Jetpur', gu: 'જેતપુર (Jetpur)', en: 'Jetpur' },
      { val: 'Gondal', gu: 'ગોંડલ (Gondal)', en: 'Gondal' },
      { val: 'Rajkot', gu: 'રાજકોટ (Rajkot)', en: 'Rajkot' },
      { val: 'Dhoraji', gu: 'ધોરાજી (Dhoraji)', en: 'Dhoraji' },
      { val: 'Kotda', gu: 'કોટડા સાંગાણી (Kotda Sangani)', en: 'Kotda Sangani' },
    ],
  },
  'Mehsana': {
    gu: 'મહેસાણા (Mehsana)',
    talukas: [
      { val: 'Unjha', gu: 'ઊંઝા (Unjha)', en: 'Unjha' },
      { val: 'Visnagar', gu: 'વિસનગર (Visnagar)', en: 'Visnagar' },
      { val: 'Kadi', gu: 'કડી (Kadi)', en: 'Kadi' },
      { val: 'Mehsana', gu: 'મહેસાણા (Mehsana)', en: 'Mehsana' },
    ],
  },
  'Junagadh': {
    gu: 'જૂનાગઢ (Junagadh)',
    talukas: [
      { val: 'Junagadh', gu: 'જૂનાગઢ (Junagadh)', en: 'Junagadh' },
      { val: 'Keshod', gu: 'કેશોદ (Keshod)', en: 'Keshod' },
      { val: 'Mangrol', gu: 'માંગરોળ (Mangrol)', en: 'Mangrol' },
      { val: 'Visavadar', gu: 'વિસાવદર (Visavadar)', en: 'Visavadar' },
    ],
  },
  'Banaskantha': {
    gu: 'બનાસકાંઠા (Banaskantha)',
    talukas: [
      { val: 'Deesa', gu: 'ડીસા (Deesa)', en: 'Deesa' },
      { val: 'Palanpur', gu: 'પાલનપુર (Palanpur)', en: 'Palanpur' },
      { val: 'Vav', gu: 'વાવ (Vav)', en: 'Vav' },
      { val: 'Tharad', gu: 'થરાદ (Tharad)', en: 'Tharad' },
    ],
  },
  'Ahmedabad': {
    gu: 'અમદાવાદ (Ahmedabad)',
    talukas: [
      { val: 'Dhandhuka', gu: 'ધંધૂકા (Dhandhuka)', en: 'Dhandhuka' },
      { val: 'Dholka', gu: 'ધોળકા (Dholka)', en: 'Dholka' },
      { val: 'Sanand', gu: 'સાણંદ (Sanand)', en: 'Sanand' },
    ],
  },
};

const CROPS_LIST = [
  { val: 'Cotton', gu: 'કપાસ (Cotton)', en: 'Cotton' },
  { val: 'Cumin', gu: 'જીરૂ (Cumin)', en: 'Cumin' },
  { val: 'Groundnut', gu: 'મગફળી (Groundnut)', en: 'Groundnut' },
  { val: 'Wheat', gu: 'ઘઉં (Wheat)', en: 'Wheat' },
  { val: 'Mustard', gu: 'રાયડો (Mustard)', en: 'Mustard' },
  { val: 'Sesame', gu: 'તલ (Sesame)', en: 'Sesame' },
];

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();

  // Tabs: 'register' or 'login'
  const [tab, setTab] = useState(searchParams.get('tab') === 'login' ? 'login' : 'register');
  const [role, setRole] = useState(searchParams.get('role') === 'trader' ? 'trader' : 'farmer');

  // Form Fields
  const [mobile, setMobile] = useState('9825478210');
  const [otpSent, setOtpSent] = useState(true);
  const [otp, setOtp] = useState(['5', '8', '2', '9', '1', '0']);
  const [timer, setTimer] = useState(45);
  const [fullName, setFullName] = useState('પરેશભાઈ કાનજીભાઈ પટેલ');
  const [selectedDistrict, setSelectedDistrict] = useState('Rajkot');
  const [selectedTaluka, setSelectedTaluka] = useState('Jetpur');
  const [village, setVillage] = useState('નવાગઢ');
  const [selectedCrops, setSelectedCrops] = useState(['Cotton', 'Cumin', 'Groundnut']);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  const otpRefs = useRef([]);

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      toast.error(lang === 'gu' ? 'કૃપા કરીને ૧૦ અંકનો સાચો મોબાઇલ નંબર દાખલ કરો' : 'Please enter valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
    setTimer(60);
    toast.success(lang === 'gu' ? `OTP +91 ${mobile} પર મોકલાઈ ગયો છે` : `OTP sent to +91 ${mobile}`);
  };

  const handleOtpChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      otpRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const toggleCrop = (c) => {
    setSelectedCrops(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      toast.error(lang === 'gu' ? '૧૦ અંકનો મોબાઇલ નંબર દાખલ કરો' : 'Enter 10-digit mobile number');
      return;
    }
    if (tab === 'register' && !fullName.trim()) {
      toast.error(lang === 'gu' ? 'પૂરું નામ દાખલ કરો' : 'Please enter full name');
      return;
    }
    if (tab === 'register' && !termsAgreed) {
      toast.error(lang === 'gu' ? 'કૃપા કરીને નિયમો અને શરતો સ્વીકારો' : 'Please agree to terms and conditions');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const mockToken = 'jwt_token_' + Date.now();
      const mockUser = {
        _id: 'user_1',
        name: tab === 'register' ? fullName : (role === 'farmer' ? 'પરેશભાઈ પટેલ' : 'રાજકોટ ટ્રેડિંગ કંપની'),
        mobile,
        role,
        district: selectedDistrict,
        taluka: selectedTaluka,
        village,
      };
      login(mockToken, mockUser);
      setLoading(false);
      toast.success(
        tab === 'register'
          ? (lang === 'gu' ? 'નોંધણી અને લૉગિન સફળ થયું! 🎉' : 'Registration & Login Successful! 🎉')
          : (lang === 'gu' ? 'સફળતાપૂર્વક લૉગિન થયું! 🎉' : 'Logged in successfully! 🎉')
      );

      if (role === 'farmer') {
        navigate('/farmer/dashboard');
      } else {
        navigate('/buyer/dashboard');
      }
    }, 600);
  };

  const currentTalukas = DISTRICT_TALUKA_MAP[selectedDistrict]?.talukas || [];

  return (
    <div className="login-pdf1-wrapper">
      <div className="login-pdf1-container">
        
        {/* ================= LEFT PROMO PANEL ================= */}
        <div className="login-pdf1__left">
          
          <div className="lp-gov-pill">
            ● {lang === 'gu' ? 'ગુજરાત સરકાર માન્ય કૃષિ સેવા પહેલ' : 'Gujarat Govt Recognized Agri-Services Initiative'}
          </div>

          <h1 className="lp-heading">
            {lang === 'gu' ? (
              <>ગુજરાતના <span className="text-green-brand">કૃષિ ક્રાંતિ મંચ</span> પર આપનું સ્વાગત છે</>
            ) : (
              <>Welcome to Gujarat <span className="text-green-brand">Agri-Revolution Platform</span></>
            )}
          </h1>

          <p className="lp-subheading">
            {lang === 'gu'
              ? 'ખેડૂતો અને વેપારીઓ માટે ૧૦૦% પારદર્શક અને વિના મૂલ્યે પ્લેટફોર્મ. તમારા પાકનું સાચું મૂલ્ય સીધું તમારા હાથમાં.'
              : '100% transparent and free platform for farmers and buyers. True crop valuation directly in your hands.'}
          </p>

          {/* 4 Feature Items */}
          <div className="lp-features-list">
            
            <div className="lp-feat-item">
              <div className="lp-feat-icon">🌾</div>
              <div>
                <div className="lp-feat-title">
                  {lang === 'gu' ? 'સીધા ખેતરેથી ખરીદી / વેચાણ' : 'Direct Farm Procurement / Sale'}{' '}
                  <span className="lp-feat-tag green">0% Brokerage</span>
                </div>
                <div className="lp-feat-desc">
                  {lang === 'gu'
                    ? 'કોઈપણ પ્રકારની દલાલી કે કમિશન આપ્યા વગર સીધો સોદો ખેડૂત અને મિલર્સ વચ્ચે.'
                    : 'Direct deal between farmer and millers without any brokerage or commission.'}
                </div>
              </div>
            </div>

            <div className="lp-feat-item">
              <div className="lp-feat-icon">📊</div>
              <div>
                <div className="lp-feat-title">
                  {lang === 'gu' ? 'તમામ APMC ના લાઈવ ભાવ' : 'Live Rates from All APMCs'}{' '}
                  <span className="lp-feat-tag blue">Real-time</span>
                </div>
                <div className="lp-feat-desc">
                  {lang === 'gu'
                    ? 'રાજકોટ, ઊંઝા, ગોંડલ, પાટણ સહિત ૧૬૦+ માર્કેટિંગ યાર્ડના પ્રતિ-મણ સચોટ દૈનિક ભાવો.'
                    : 'Accurate daily prices per 20kg from 160+ APMC market yards including Rajkot, Unjha, Gondal.'}
                </div>
              </div>
            </div>

            <div className="lp-feat-item">
              <div className="lp-feat-icon">🛡️</div>
              <div>
                <div className="lp-feat-title">
                  {lang === 'gu' ? '૧૦૦% વેરિફાઇડ ખેડૂતો અને જીનર્સ' : '100% Verified Farmers & Ginners'}{' '}
                  <span className="lp-feat-tag green">KYC Verified</span>
                </div>
                <div className="lp-feat-desc">
                  {lang === 'gu'
                    ? '7/12 & 8-A પ્રમાણિત જમીન ખાતા ધારકો અને લાઈસન્સ ધરાવતા વેપારીઓ સાથે સુરક્ષિત વ્યાપાર.'
                    : 'Safe trade with 7/12 & 8-A certified landholders and verified licensed mandi buyers.'}
                </div>
              </div>
            </div>

            <div className="lp-feat-item">
              <div className="lp-feat-icon">🏦</div>
              <div>
                <div className="lp-feat-title">
                  {lang === 'gu' ? '૨૪ કલાકમાં સુરક્ષિત બેંક ચુકવણી' : 'Guaranteed 24-Hour Settlement'}{' '}
                  <span className="lp-feat-tag orange">Escrow Safe</span>
                </div>
                <div className="lp-feat-desc">
                  {lang === 'gu'
                    ? 'ડિજિટલ વજન કાંટાની પહોંચ જમા થતા જ સીધા તમારા બેંક ખાતામાં UPI/NEFT દ્વારા રકમ.'
                    : 'Direct payment to your bank account via UPI/NEFT immediately upon digital weighbridge receipt.'}
                </div>
              </div>
            </div>

          </div>

          {/* Testimonial Box */}
          <div className="lp-testi-box">
            <div className="lp-testi-stars">★★★★★</div>
            <p className="lp-testi-quote">
              {lang === 'gu'
                ? '"મને ઊંઝા યાર્ડ સુધી ગયા વગર મારા જીરૂના સારા ભાવ સીધા ખેતરે મળ્યા."'
                : '"I received higher rates for my cumin directly at my farm without travelling to Unjha mandi."'}
            </p>
            <div className="lp-testi-author">
              {lang === 'gu' ? '— રમેશભાઈ પટેલ • મહેસાણા (જીરૂ ઉત્પાદક)' : '— Rameshbhai Patel • Mehsana (Cumin Producer)'}
            </div>
          </div>

          {/* Bottom Trust Seals */}
          <div className="lp-trust-seals">
            <span>✓ {lang === 'gu' ? 'ગુજરાત APMC સહાયક ડિજિટલ મંચ' : 'Official APMC Facilitation Platform'}</span>
            <span>🔒 {lang === 'gu' ? '100% સુરક્ષિત OTP પ્રવેશ' : '100% Secure OTP Login'}</span>
          </div>

        </div>

        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="login-pdf1__right">
          
          {/* Top Tabs */}
          <div className="lp-tabs-bar">
            <button
              type="button"
              className={`lp-tab-btn ${tab === 'login' ? 'active' : ''}`}
              onClick={() => setTab('login')}
            >
              🔑 {lang === 'gu' ? 'લૉગિન (Login)' : 'Login'}
            </button>
            <button
              type="button"
              className={`lp-tab-btn ${tab === 'register' ? 'active' : ''}`}
              onClick={() => setTab('register')}
            >
              ✨ {lang === 'gu' ? 'નવું રજીસ્ટ્રેશન (Register)' : 'New Registration'}
            </button>
          </div>

          <div className="lp-form-header">
            <h2 className="lp-form-title">
              {tab === 'register' ? (
                <>
                  {lang === 'gu' ? 'નવા સભ્ય તરીકે જોડાઓ' : 'Join as New Member'}{' '}
                  <span className="free-badge">{lang === 'gu' ? 'તદ્દન મફત' : '100% Free'}</span>
                </>
              ) : (
                <>{lang === 'gu' ? 'ખાતામાં પ્રવેશ કરો (Login)' : 'Sign In to Your Account'}</>
              )}
            </h2>
            <p className="lp-form-subtitle">
              {lang === 'gu'
                ? 'માત્ર ૩ સરળ પગલાંમાં તમારી પ્રોફાઇલ પૂર્ણ કરો અને ગુજરાતના સૌથી મોટા એગ્રી નેટવર્કમાં પ્રવેશ કરો.'
                : 'Complete your profile in 3 simple steps to join Gujarat’s largest agricultural network.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="lp-form">
            
            {/* Role Selection */}
            <div className="lp-form-group">
              <label className="lp-label">
                {lang === 'gu' ? 'તમારી ભૂમિકા પસંદ કરો (Select Your Role):' : 'Select Your Role:'}
              </label>

              <div className="lp-role-cards">
                <div
                  className={`lp-role-card ${role === 'farmer' ? 'selected' : ''}`}
                  onClick={() => setRole('farmer')}
                >
                  <div className="role-radio-circle">
                    {role === 'farmer' && <div className="inner-dot"></div>}
                  </div>
                  <div>
                    <div className="role-card-title">
                      🌱 {lang === 'gu' ? 'હું ખેડૂત છું' : 'I am a Farmer'}
                    </div>
                    <div className="role-card-en">
                      {lang === 'gu' ? 'I am a Farmer' : 'Sell Your Crops'}
                    </div>
                    <span className="role-card-pill green">
                      {lang === 'gu' ? 'પાક વેચવા માટે (Sell Crops)' : 'Direct farm-gate bids'}
                    </span>
                  </div>
                </div>

                <div
                  className={`lp-role-card ${role === 'trader' ? 'selected' : ''}`}
                  onClick={() => setRole('trader')}
                >
                  <div className="role-radio-circle">
                    {role === 'trader' && <div className="inner-dot"></div>}
                  </div>
                  <div>
                    <div className="role-card-title">
                      🏢 {lang === 'gu' ? 'હું વેપારી/જીનર છું' : 'I am a Buyer / Trader'}
                    </div>
                    <div className="role-card-en">
                      {lang === 'gu' ? 'I am a Buyer / Trader' : 'Procure Agri Commodities'}
                    </div>
                    <span className="role-card-pill blue">
                      {lang === 'gu' ? 'પાક ખરીદવા માટે (Buy Crops)' : 'Bulk direct procurement'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Number & OTP */}
            <div className="lp-form-group">
              <label className="lp-label">
                {lang === 'gu' ? 'મોબાઈલ નંબર (Mobile Number) *' : 'Mobile Number *'}
              </label>
              <div className="lp-mobile-input-row">
                <span className="country-prefix">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  className="lp-mobile-field"
                  placeholder={lang === 'gu' ? '૯૮૨૫૪ ૭૮૨૧૦' : '98254 78210'}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                />
                <button
                  type="button"
                  className="lp-send-otp-btn"
                  onClick={handleSendOtp}
                >
                  {lang === 'gu' ? 'ઓટીપી મોકલો' : 'Send OTP'}
                </button>
              </div>
              <span className="lp-field-note">
                ⓘ {lang === 'gu' ? 'આ નંબર પર ૬ આંકડાનો ચકાસણી કોડ મોકલવામાં આવશે.' : 'A 6-digit verification code will be sent to this number.'}
              </span>
            </div>

            {/* OTP Input Boxes (6-digit) */}
            {otpSent && (
              <div className="lp-form-group">
                <div className="otp-header-row">
                  <label className="lp-label">
                    {lang === 'gu' ? '૬-ડિજિટ OTP દાખલ કરો (Verification OTP)' : 'Enter 6-Digit OTP'}
                  </label>
                  <span className="otp-timer">
                    ⏱ {lang === 'gu' ? `બાકી સમય: 00:${timer < 10 ? '0' : ''}${timer}` : `Time: 00:${timer < 10 ? '0' : ''}${timer}`}
                  </span>
                </div>

                <div className="otp-boxes-container">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      className="otp-box-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target.value, idx)}
                      onKeyDown={(e) => handleOtpKeyDown(e.key, idx)}
                    />
                  ))}
                </div>

                <div className="otp-feedback-row">
                  <span className="otp-verified-check">
                    ✓ {lang === 'gu' ? 'ઓટીપી ચકાસાયેલ છે' : 'OTP Verified'}
                  </span>
                  <button
                    type="button"
                    className="otp-resend-btn"
                    onClick={handleSendOtp}
                    disabled={timer > 0}
                  >
                    {lang === 'gu' ? 'ફરીથી OTP મોકલો (Resend OTP)' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}

            {/* Registration Additional Fields */}
            {tab === 'register' && (
              <>
                {/* Full Name */}
                <div className="lp-form-group">
                  <label className="lp-label">
                    {role === 'farmer'
                      ? (lang === 'gu' ? 'ખેડૂતનું પૂરું નામ (Full Name) *' : 'Farmer Full Name *')
                      : (lang === 'gu' ? 'વેપારી / પેઢીનું નામ (Full Name / Firm) *' : 'Trader / Firm Name *')}
                  </label>
                  <div className="lp-input-with-icon">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      className="lp-text-field"
                      placeholder={lang === 'gu' ? 'દા.ત. પરેશભાઈ કાનજીભાઈ પટેલ' : 'e.g. Pareshbhai Kanjibhai Patel'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                {/* 3-Column Location: District, Taluka, Village */}
                <div className="lp-form-group">
                  <label className="lp-label">
                    {lang === 'gu' ? 'સ્થાન વિગતો (Location Details - 7/12 મુજબ) *' : 'Location Details (As per 7/12 Land Record) *'}
                  </label>

                  <div className="location-3grid">
                    <div>
                      <span className="sub-label">{lang === 'gu' ? 'જિલ્લો (District)' : 'District'}</span>
                      <select
                        className="lp-select-field"
                        value={selectedDistrict}
                        onChange={(e) => {
                          setSelectedDistrict(e.target.value);
                          const firstTaluka = DISTRICT_TALUKA_MAP[e.target.value]?.talukas[0]?.val || '';
                          setSelectedTaluka(firstTaluka);
                        }}
                      >
                        {Object.keys(DISTRICT_TALUKA_MAP).map((k) => (
                          <option key={k} value={k}>
                            {lang === 'gu' ? DISTRICT_TALUKA_MAP[k].gu : k}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="sub-label">{lang === 'gu' ? 'તાલુકો (Taluka)' : 'Taluka'}</span>
                      <select
                        className="lp-select-field"
                        value={selectedTaluka}
                        onChange={(e) => setSelectedTaluka(e.target.value)}
                      >
                        {currentTalukas.map((t) => (
                          <option key={t.val} value={t.val}>
                            {lang === 'gu' ? t.gu : t.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="sub-label">{lang === 'gu' ? 'ગામ (Village)' : 'Village'}</span>
                      <input
                        type="text"
                        className="lp-village-field"
                        placeholder={lang === 'gu' ? 'નવાગઢ' : 'Navagadh'}
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Crops Checkboxes */}
                <div className="lp-form-group">
                  <div className="crops-label-row">
                    <label className="lp-label">
                      {lang === 'gu' ? 'મુખ્ય પાક (Primary Crops Grown)' : 'Primary Crops'}
                    </label>
                    <span className="multi-note">
                      {lang === 'gu' ? 'બહુવિધ પસંદ કરો' : 'Select all that apply'}
                    </span>
                  </div>

                  <div className="crops-checks-grid">
                    {CROPS_LIST.map((c) => (
                      <label
                        key={c.val}
                        className={`crop-check-tile ${selectedCrops.includes(c.val) ? 'checked' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCrops.includes(c.val)}
                          onChange={() => toggleCrop(c.val)}
                        />
                        <span>{lang === 'gu' ? c.gu : c.en}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Terms & Conditions Checkbox */}
                <div className="lp-form-group">
                  <label className="terms-checkbox-label">
                    <input
                      type="checkbox"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                    />
                    <span>
                      {lang === 'gu' ? (
                        <>
                          હું ગુજરાત કિસાન બજારના{' '}
                          <Link to="/about">નિયમો અને શરતો (Terms & Conditions)</Link>{' '}
                          તથા ગોપનીયતા નીતિ સ્વીકારું છું.
                        </>
                      ) : (
                        <>
                          I accept the Gujarat Kisan Bazaar{' '}
                          <Link to="/about">Terms & Conditions</Link>{' '}
                          and Privacy Policy.
                        </>
                      )}
                    </span>
                  </label>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button type="submit" className="lp-submit-button" disabled={loading}>
              {loading ? (
                <span>{lang === 'gu' ? 'ચકાસણી ચાલુ છે...' : 'Verifying...'}</span>
              ) : tab === 'register' ? (
                <span>{lang === 'gu' ? 'ખાતું બનાવો અને પ્રવેશ કરો (Complete Registration & Login) →' : 'Complete Registration & Login →'}</span>
              ) : (
                <span>{lang === 'gu' ? 'પ્રવેશ કરો (Login) →' : 'Sign In →'}</span>
              )}
            </button>

            {/* Switch Tab Link */}
            <div className="lp-switch-row">
              {tab === 'register' ? (
                <button
                  type="button"
                  className="lp-switch-btn"
                  onClick={() => setTab('login')}
                >
                  {lang === 'gu' ? 'પહેલેથી ખાતું છે? ફક્ત મોબાઇલ નંબરથી લૉગિન કરો →' : 'Already registered? Login with mobile number →'}
                </button>
              ) : (
                <button
                  type="button"
                  className="lp-switch-btn"
                  onClick={() => setTab('register')}
                >
                  {lang === 'gu' ? 'નવું ખાતું બનાવવું છે? અહીં નોંધણી કરો →' : 'New here? Create an account now →'}
                </button>
              )}
            </div>

          </form>

        </div>

      </div>

      {/* Bottom Bar: Privacy & Helpline */}
      <div className="lp-bottom-security-bar">
        <div>
          🔒 {lang === 'gu'
            ? 'ખેડૂતોનો વ્યક્તિગત ડેટા ગુજરાત સરકારના ડેટા સુરક્ષા ધારા અનુસાર સુરક્ષિત રાખવામાં આવે છે.'
            : 'User personal information is encrypted and secured under Gujarat Data Protection Guidelines.'}
        </div>
        <div>
          🎧 {lang === 'gu' ? 'નિઃશુલ્ક હેલ્પડેસ્ક: ૧૮૦૦-૫૪૩-૩૮૮' : 'Toll-Free Helpdesk: 1800-543-388'} &nbsp;|&nbsp; {lang === 'gu' ? 'સવારે ૮:૦૦ થી રાત્રે ૮:૦૦' : '8:00 AM to 8:00 PM'}
        </div>
      </div>

    </div>
  );
};

export default LoginPage;