import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './HeroSection.css';

const POPULAR_CROPS = [
  { gu: 'કપાસ (Cotton)', en: 'Cotton', val: 'Cotton' },
  { gu: 'જીરૂ (Cumin Seed)', en: 'Cumin', val: 'Cumin' },
  { gu: 'મગફળી (Groundnut G-20)', en: 'Groundnut', val: 'Groundnut' },
  { gu: 'ઘઉં (Wheat)', en: 'Wheat', val: 'Wheat' },
  { gu: 'તલ (Sesame)', en: 'Sesame', val: 'Sesame' },
];

const DISTRICT_OPTIONS = [
  { gu: 'બધા જિલ્લા / માર્કેટ યાર્ડ', en: 'All Districts / APMC' },
  { gu: 'રાજકોટ (ગોંડલ / રાજકોટ યાર્ડ)', en: 'Rajkot (Gondal / Rajkot Yard)' },
  { gu: 'મહેસાણા (ઊંઝા APMC)', en: 'Mehsana (Unjha APMC)' },
  { gu: 'જૂનાગઢ (જૂનાગઢ માર્કેટ યાર્ડ)', en: 'Junagadh (Junagadh APMC)' },
  { gu: 'અમદાવાદ (ધંધૂકા / અમદાવાદ)', en: 'Ahmedabad (Dhandhuka / Ahmedabad)' },
  { gu: 'બનાસકાંઠા (ડીસા બટાટા યાર્ડ)', en: 'Banaskantha (Deesa APMC)' },
  { gu: 'જામનગર (કાલાવડ / જામનગર)', en: 'Jamnagar (Kalavad / Jamnagar)' },
  { gu: 'ભાવનગર (મહુવા ડુંગળી-તલ માર્કેટ)', en: 'Bhavnagar (Mahuva APMC)' },
  { gu: 'અમરેલી (અમરેલી યાર્ડ)', en: 'Amreli (Amreli Yard)' },
];

const HeroSection = () => {
  const { lang } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDistrict && !selectedDistrict.includes('બધા')) {
      params.set('district', selectedDistrict);
    }
    if (searchText.trim()) {
      params.set('search', searchText.trim());
    }
    navigate(`/listings?${params.toString()}`);
  };

  const handleQuickCropClick = (val) => {
    navigate(`/listings?category=${val}`);
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.lang = lang === 'gu' ? 'gu-IN' : 'en-IN';
      rec.start();
      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setSearchText(text);
        navigate(`/listings?search=${encodeURIComponent(text)}`);
      };
    }
  };

  return (
    <section className="hero-pdf1">
      <div className="hero-pdf1__inner">
        
        {/* 1. Green Trust Pill */}
        <div className="hero-pdf1__trust-pill">
          <span className="trust-dot">●</span>
          <span>
            {lang === 'gu'
              ? 'ગુજરાત સરકાર & APMC પ્રમાણિત ડિજિટલ મંચ 100% સુરક્ષિત'
              : 'Gujarat Govt & APMC Certified Digital Platform 100% Secure'}
          </span>
        </div>

        {/* 2. Main Heading */}
        <h1 className="hero-pdf1__heading">
          {lang === 'gu' ? (
            <>
              ગુજરાતના ખેડૂતો અને વેપારીઓ માટે <span className="text-green-brand">વિશ્વસનીય ડિજિટલ બજાર</span>
            </>
          ) : (
            <>
              Trusted Digital Bazaar for <span className="text-green-brand">Gujarat Farmers & Traders</span>
            </>
          )}
        </h1>

        {/* 3. Subtitle */}
        <p className="hero-pdf1__sub">
          {lang === 'gu'
            ? 'સીધા ખેતરેથી ખરીદી અને વેચાણ — વચેટિયા વગર શ્રેષ્ઠ APMC ભાવે, સંપૂર્ણ પારદર્શક તોલમાપ અને તાત્કાલિક બેંક ચુકવણી.'
            : 'Direct farm-to-trade procurement — Best APMC prices with zero middlemen, verified weighing, and instant bank settlement.'}
        </p>

        {/* 4. White Search Card */}
        <div className="hero-pdf1__search-card">
          <form className="hero-pdf1__form" onSubmit={handleSearch}>
            
            {/* Field 1: District Select */}
            <div className="hero-pdf1__field">
              <label className="hero-pdf1__field-label">
                📍 {lang === 'gu' ? 'જિલ્લો / માર્કેટ પસંદ કરો:' : 'Select District / Market:'}
              </label>
              <select
                className="hero-pdf1__select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {DISTRICT_OPTIONS.map((d, i) => (
                  <option key={i} value={d.gu}>
                    {lang === 'gu' ? d.gu : d.en}
                  </option>
                ))}
              </select>
            </div>

            <div className="hero-pdf1__field-divider"></div>

            {/* Field 2: Crop Search with Mic */}
            <div className="hero-pdf1__field flex-2">
              <label className="hero-pdf1__field-label">
                🌾 {lang === 'gu' ? 'પાક શોધો (કપાસ, જીરૂ, મગફળી...):' : 'Search Crop (Cotton, Cumin...):'}
              </label>
              <div className="hero-pdf1__input-wrap">
                <input
                  type="text"
                  className="hero-pdf1__input"
                  placeholder={lang === 'gu' ? 'દા.ત. શંકર કપાસ, ગોંડલ જીરૂ...' : 'e.g. Shankar Cotton, Gondal Cumin...'}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type="button"
                  className="hero-pdf1__mic-btn"
                  onClick={handleVoiceSearch}
                  title="Voice Search"
                >
                  🎙️
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="hero-pdf1__submit-btn">
              <span>🔍</span>
              <span>{lang === 'gu' ? 'શોધો / Search' : 'Search'}</span>
            </button>
          </form>

          {/* Quick Popular Tags */}
          <div className="hero-pdf1__tags-row">
            <span className="hero-pdf1__tags-label">
              {lang === 'gu' ? 'લોકપ્રિય પાક:' : 'Popular Crops:'}
            </span>
            <div className="hero-pdf1__tags-list">
              {POPULAR_CROPS.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className="hero-pdf1__tag-btn"
                  onClick={() => handleQuickCropClick(c.val)}
                >
                  {lang === 'gu' ? c.gu : c.en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 5. 3-Stat Boxes */}
        <div className="hero-pdf1__stats-grid">
          <div className="hero-pdf1__stat-box">
            <div className="stat-number">૫૫,૦૦૦+</div>
            <div className="stat-desc">{lang === 'gu' ? 'નોંધાયેલ ખેડૂતો' : 'Registered Farmers'}</div>
          </div>

          <div className="hero-pdf1__stat-box">
            <div className="stat-number">૪૫૦+</div>
            <div className="stat-desc">{lang === 'gu' ? 'APMC દૈનિક ભાવ' : 'Daily APMC Rates'}</div>
          </div>

          <div className="hero-pdf1__stat-box">
            <div className="stat-number">૦% કમિશન</div>
            <div className="stat-desc">{lang === 'gu' ? 'ખેડૂત માટે કોઈ ચાર્જ નહિ' : 'Zero Commission for Farmers'}</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
