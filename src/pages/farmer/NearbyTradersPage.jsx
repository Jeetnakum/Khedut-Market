import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './NearbyTradersPage.css';

const TRADERS_DATA = [
  {
    id: 'trader_1',
    nameGu: 'શ્રી જીનિંગ એન્ડ પ્રોસેસિંગ ઇન્ડસ્ટ્રીઝ',
    nameEn: 'Shree Ginning & Processing Industries',
    ownerGu: 'પરેશભાઈ પટેલ',
    ownerEn: 'Pareshbhai Patel',
    distance: 8.5,
    distanceGu: '૮.૫ કિમી (8.5 km)',
    locationGu: 'જેતપુર-ગોંડલ હાઇવે',
    license: '#RJT-421',
    rating: 4.9,
    dealsCount: 142,
    tierGu: 'સુવર્ણ વેપારી (Gold Tier)',
    gradeGu: 'GRADE A (ઉત્તમ વેપારી)',
    gradeSubGu: 'ઓન-સાઇટ કાંટા વજન સુવિધા',
    cropsGu: 'શંકર કપાસ (Cotton), મગફળી (Groundnut)',
    cropsEn: 'Shankar Cotton, Groundnut',
    dailyRate: '₹૧,૭૫૦/મણ',
    paymentTrackGu: '૨૪ કલાકમાં RTGS બેંક ટ્રાન્સફર (૧૦૦% રેકોર્ડ)',
    paymentReceiptGu: 'તાત્કાલિક પહોંચ (GST & Mandi Cess રસીદ)',
    phone: '+91 98254 11223',
    verified712: true,
  },
  {
    id: 'trader_2',
    nameGu: 'કિસાન ટ્રેડિંગ કંપની - ગોંડલ',
    nameEn: 'Kisan Trading Co. - Gondal',
    ownerGu: 'હસમુખભાઈ શાહ',
    ownerEn: 'Hasmukhbhai Shah',
    distance: 14.2,
    distanceGu: '૧૪.૨ કિમી (14.2 km)',
    locationGu: 'જૂની માર્કેટ યાર્ડ પાસે, ગોંડલ',
    license: '#GDL-882',
    rating: 4.8,
    dealsCount: 68,
    tierGu: 'મોટો સંગ્રહ વેરહાઉસ ઉપલબ્ધ',
    gradeGu: 'GRADE A (સુપર પ્રીમિયમ)',
    gradeSubGu: 'સરકારી માન્ય લેબ ટેસ્ટિંગ',
    cropsGu: 'જીરૂ (Cumin Seed), રાયડો (Mustard), ધાણા (Coriander)',
    cropsEn: 'Cumin Seed, Mustard, Coriander',
    dailyRate: '₹૫,૪૦૦/મણ',
    paymentTrackGu: 'IMPS / RTGS અથવા યાર્ડ ચેક',
    paymentReceiptGu: 'સોદાના તે જ દિવસે વજન પછી રસીદ',
    phone: '+91 98254 22334',
    verified712: false,
  },
  {
    id: 'trader_3',
    nameGu: 'મારૂતિ ઓઇલ મિલર્સ & ટ્રેડર્સ - શાપર',
    nameEn: 'Maruti Oil Millers & Traders - Shapar',
    ownerGu: 'રમેશભાઈ ગોંડલિયા',
    ownerEn: 'Rameshbhai Gondaliya',
    distance: 22.0,
    distanceGu: '૨૨ કિમી (22 km)',
    locationGu: 'શાપર વેરાવળ ઇન્ડસ્ટ્રીયલ એરિયા',
    license: '#SHP-109',
    rating: 4.7,
    dealsCount: 210,
    tierGu: 'ખેતરેથી માલ ઉપાડવાની સુવિધા',
    gradeGu: 'GRADE A (મોટી જથ્થાબંધ)',
    gradeSubGu: 'બલ્ક ખરીદી સ્પેશિયાલિસ્ટ',
    cropsGu: 'મગફળી G-20 (Groundnut G-20), તલ (Sesame)',
    cropsEn: 'Groundnut G-20, Sesame',
    dailyRate: '₹૧,૪૪૦/મણ',
    paymentTrackGu: 'સીધા બેંક ખાતામાં ૧૦૦% સુરક્ષિત પેમેન્ટ',
    paymentReceiptGu: 'સરકારી ઈ-નામ (e-NAM) પોર્ટલ રજિસ્ટર્ડ',
    phone: '+91 98254 33445',
    verified712: false,
  },
];

const NearbyTradersPage = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [radiusFilter, setRadiusFilter] = useState(25); // 10, 25, 40, 100, 'all'
  const [cropFilter, setCropFilter] = useState('all'); // all, cotton, cumin, groundnut
  const [sortBy, setSortBy] = useState('nearest'); // nearest, rating, deals
  const [rtgsOnly, setRtgsOnly] = useState(true);
  const [selectedTraderPin, setSelectedTraderPin] = useState('trader_1');

  const filteredTraders = TRADERS_DATA.filter((trader) => {
    if (radiusFilter !== 'all' && trader.distance > radiusFilter) return false;
    if (cropFilter === 'cotton' && !trader.cropsGu.includes('કપાસ')) return false;
    if (cropFilter === 'cumin' && !trader.cropsGu.includes('જીરૂ')) return false;
    if (cropFilter === 'groundnut' && !trader.cropsGu.includes('મગફળી')) return false;
    return true;
  });

  return (
    <div className="nearby-traders-page">
      <div className="nt-container">

        {/* Top Farm Location & Trust Bar */}
        <div className="nt-top-location-bar">
          <div className="nt-tlb-left">
            <span className="farm-pin-icon">📍</span>
            <span>
              {lang === 'gu' ? 'તમારું ફાર્મ લોકેશન: ' : 'Your Farm Location: '}
              <strong>{lang === 'gu' ? 'મોવિયા રોડ, ગોંડલ તાલુકો (રાજકોટ)' : 'Moviya Road, Gondal (Rajkot)'}</strong>
            </span>
            <span className="tlb-sep">|</span>
            <span>{lang === 'gu' ? '૭/૧૨ ખાતા નંબર: ૨૪૮' : '7/12 Khata #248'}</span>
          </div>

          <div className="nt-tlb-right">
            <span className="tlb-shield">🛡️ {lang === 'gu' ? '૧૦૦% ચકાસાયેલા APMC લાયસન્સ વેપારીઓ' : '100% Verified APMC Traders'}</span>
            <span className="tlb-sep">|</span>
            <a href="tel:1800543388" className="tlb-help">📞 {lang === 'gu' ? 'સરકારી હેલ્પલાઇન: 1800-543-388' : 'Helpline: 1800-543-388'}</a>
          </div>
        </div>

        {/* Header Hero */}
        <div className="nt-header-hero">
          <div className="nt-hh-left">
            <div className="nt-dir-badge">
              {lang === 'gu' ? 'ડિરેક્ટરી સેવા / DIRECTORY • લાઈવ માર્કેટ એક્ટિવ' : 'DIRECTORY SERVICE • Live Market Active'}
            </div>
            <h1 className="nt-page-title">
              {lang === 'gu' ? 'નજીકના પ્રમાણિત વેપારીઓ અને જીનર્સ (Nearby Verified Traders Directory)' : 'Nearby Verified Traders & Ginners Directory'}
            </h1>
            <p className="nt-page-sub">
              {lang === 'gu'
                ? 'તમારા ખેતરની નજીકના લાયસન્સ ધરાવતા એપીએમસી વેપારીઓ શોધો અને સીધો સંપર્ક કરો.'
                : 'Discover and directly negotiate with licensed APMC millers and commission agents near your farmland.'}
            </p>
          </div>

          <div className="nt-hh-right">
            <div className="nt-trader-count-box">
              <span className="tc-icon">🏭</span>
              <div className="tc-text">
                <span className="tc-num">૪૮+</span>
                <span className="tc-label">{lang === 'gu' ? 'સક્રિય વેપારીઓ (૨૫ કિમી માં)' : 'Active Buyers (in 25km)'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="nt-filter-card">
          <div className="nt-filter-row">
            
            {/* Radius Filter */}
            <div className="filter-group">
              <span className="fg-label">🧭 {lang === 'gu' ? 'ત્રિજ્યા (Radius):' : 'Radius:'}</span>
              <div className="pill-btn-group">
                <button
                  type="button"
                  className={`pill-btn ${radiusFilter === 10 ? 'active' : ''}`}
                  onClick={() => setRadiusFilter(10)}
                >
                  10 km
                </button>
                <button
                  type="button"
                  className={`pill-btn ${radiusFilter === 25 ? 'active' : ''}`}
                  onClick={() => setRadiusFilter(25)}
                >
                  ✓ 25 km {lang === 'gu' ? '(પસંદ કરેલ)' : ''}
                </button>
                <button
                  type="button"
                  className={`pill-btn ${radiusFilter === 40 ? 'active' : ''}`}
                  onClick={() => setRadiusFilter(40)}
                >
                  40 km
                </button>
                <button
                  type="button"
                  className={`pill-btn ${radiusFilter === 100 ? 'active' : ''}`}
                  onClick={() => setRadiusFilter(100)}
                >
                  100 km
                </button>
                <button
                  type="button"
                  className={`pill-btn ${radiusFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setRadiusFilter('all')}
                >
                  {lang === 'gu' ? 'સમગ્ર જિલ્લો' : 'All District'}
                </button>
              </div>
            </div>

            {/* Crop Buyer Filter */}
            <div className="filter-group">
              <span className="fg-label">🌾 {lang === 'gu' ? 'ખરીદનાર પાક:' : 'Crop Buyer:'}</span>
              <div className="pill-btn-group">
                <button
                  type="button"
                  className={`pill-btn ${cropFilter === 'cotton' ? 'active' : ''}`}
                  onClick={() => setCropFilter('cotton')}
                >
                  {lang === 'gu' ? 'કપાસ ખરીદનાર' : 'Cotton'}
                </button>
                <button
                  type="button"
                  className={`pill-btn ${cropFilter === 'cumin' ? 'active' : ''}`}
                  onClick={() => setCropFilter('cumin')}
                >
                  {lang === 'gu' ? 'જીરૂ ખરીદનાર' : 'Cumin'}
                </button>
                <button
                  type="button"
                  className={`pill-btn ${cropFilter === 'groundnut' ? 'active' : ''}`}
                  onClick={() => setCropFilter('groundnut')}
                >
                  {lang === 'gu' ? 'મગફળી ખરીદનાર' : 'Groundnut'}
                </button>
                <button
                  type="button"
                  className={`pill-btn ${cropFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setCropFilter('all')}
                >
                  {lang === 'gu' ? 'તમામ પાક' : 'All'}
                </button>
              </div>
            </div>

          </div>

          {/* Sort & RTGS Toggle */}
          <div className="nt-filter-sub-row">
            <div className="sort-group">
              <span className="fg-label">⇅ {lang === 'gu' ? 'સોર્ટિંગ (Sort by):' : 'Sort by:'}</span>
              <button
                type="button"
                className={`sort-chip ${sortBy === 'nearest' ? 'active' : ''}`}
                onClick={() => setSortBy('nearest')}
              >
                📍 {lang === 'gu' ? 'નજીકના પહેલા (Nearest First)' : 'Nearest First'}
              </button>
              <button
                type="button"
                className={`sort-chip ${sortBy === 'rating' ? 'active' : ''}`}
                onClick={() => setSortBy('rating')}
              >
                ⭐ {lang === 'gu' ? 'ટોપ રેટિંગ (Highest Rated)' : 'Top Rated'}
              </button>
              <button
                type="button"
                className={`sort-chip ${sortBy === 'deals' ? 'active' : ''}`}
                onClick={() => setSortBy('deals')}
              >
                🤝 {lang === 'gu' ? 'સૌથી વધુ ખરીદી (Most Active)' : 'Most Active'}
              </button>
            </div>

            <div className="rtgs-group">
              <label className="rtgs-label">
                <input
                  type="checkbox"
                  checked={rtgsOnly}
                  onChange={(e) => setRtgsOnly(e.target.checked)}
                />
                <span>✓ {lang === 'gu' ? 'માત્ર તાત્કાલિક RTGS પેમેન્ટ વાળા' : 'Direct RTGS Payout Only'}</span>
              </label>
              <span className="results-count-text">
                {lang === 'gu' ? `કુલ પરિણામો: ${filteredTraders.length} ઉપલબ્ધ` : `Results: ${filteredTraders.length} available`}
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Map (Left 40%) + Profiles (Right 60%) */}
        <div className="nt-content-grid">
          
          {/* LEFT: Gujarat Saurashtra Map View */}
          <div className="nt-map-col">
            <div className="nt-map-card">
              <div className="nt-map-header">
                <div className="mh-left">
                  <span className="map-icon">🗺️</span>
                  <div>
                    <h3 className="mh-title">{lang === 'gu' ? 'ગુજરાત સૌરાષ્ટ્ર મેપ વ્યુ' : 'Gujarat Saurashtra Map View'}</h3>
                    <span className="mh-sub">{lang === 'gu' ? 'રાજકોટ, ગોંડલ, જેતપુર પટ્ટો' : 'Rajkot, Gondal, Jetpur Belt'}</span>
                  </div>
                </div>

                <div className="map-zoom-tools">
                  <button type="button" className="mzt-btn">+</button>
                  <button type="button" className="mzt-btn">-</button>
                  <button type="button" className="mzt-btn">◎</button>
                </div>
              </div>

              {/* Map Canvas with Stylized Route Graphics */}
              <div className="nt-map-canvas-wrap">
                <svg className="nt-map-svg" viewBox="0 0 400 440">
                  {/* Background grid */}
                  <defs>
                    <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
                    </pattern>
                  </defs>
                  <rect width="400" height="440" fill="#f8fafc" />
                  <rect width="400" height="440" fill="url(#mapGrid)" />

                  {/* Highway road curves */}
                  <path d="M 60 20 Q 120 180 200 240 T 320 420" fill="none" stroke="#cbd5e1" strokeWidth="12" strokeLinecap="round" />
                  <path d="M 60 20 Q 120 180 200 240 T 320 420" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,6" />

                  {/* Connect lines from farm to traders */}
                  <line x1="160" y1="210" x2="220" y2="280" stroke="#15803d" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="160" y1="210" x2="110" y2="150" stroke="#0284c7" strokeWidth="2" strokeDasharray="4,4" />
                  <line x1="160" y1="210" x2="280" y2="110" stroke="#ea580c" strokeWidth="2" strokeDasharray="4,4" />

                  {/* Towns labels */}
                  <text x="60" y="70" fill="#64748b" fontSize="11" fontWeight="600">રાજકોટ (Rajkot Urban)</text>
                  <text x="240" y="170" fill="#64748b" fontSize="11" fontWeight="600">શાપર-વેરાવળ જીઆઈડીસી</text>
                  <text x="220" y="380" fill="#64748b" fontSize="11" fontWeight="600">જેતપુર યાર્ડ રોડ (Jetpur)</text>

                  {/* Trader 3 Pin: Maruti Oil Mills (22km) */}
                  <g className="map-pin-group" onClick={() => setSelectedTraderPin('trader_3')}>
                    <circle cx="280" cy="110" r="14" fill="#ea580c" />
                    <text x="280" y="114" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle">૨૨</text>
                    <rect x="235" y="80" width="90" height="18" rx="4" fill="#ffffff" stroke="#ea580c" />
                    <text x="280" y="93" fill="#ea580c" fontSize="9.5" fontWeight="700" textAnchor="middle">મારૂતિ ઓઇલ મિલ્સ</text>
                  </g>

                  {/* Trader 2 Pin: Kishan Trading Co (14.2km) */}
                  <g className="map-pin-group" onClick={() => setSelectedTraderPin('trader_2')}>
                    <circle cx="110" cy="150" r="14" fill="#0284c7" />
                    <text x="110" y="154" fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle">૧૪.૨</text>
                    <rect x="65" y="122" width="90" height="18" rx="4" fill="#ffffff" stroke="#0284c7" />
                    <text x="110" y="135" fill="#0284c7" fontSize="9.5" fontWeight="700" textAnchor="middle">કિસાન ટ્રેડિંગ કંપની</text>
                  </g>

                  {/* Trader 1 Pin: Shree Ginning (8.5km) */}
                  <g className="map-pin-group" onClick={() => setSelectedTraderPin('trader_1')}>
                    <circle cx="220" cy="280" r="16" fill="#15803d" />
                    <text x="220" y="285" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle">૮.૫</text>
                    <rect x="170" y="250" width="100" height="20" rx="4" fill="#ffffff" stroke="#15803d" strokeWidth="1.5" />
                    <text x="220" y="264" fill="#15803d" fontSize="10" fontWeight="800" textAnchor="middle">શ્રી જીનિંગ ઇન્ડસ્ટ્રીઝ</text>
                  </g>

                  {/* Farmer Farm Pin (Center pulse) */}
                  <g className="farm-pin-group">
                    <circle cx="160" cy="210" r="24" fill="rgba(21, 128, 61, 0.2)" />
                    <circle cx="160" cy="210" r="16" fill="#15803d" />
                    <text x="160" y="215" fill="#ffffff" fontSize="12" fontWeight="800" textAnchor="middle">🌾</text>
                    <rect x="105" y="180" width="110" height="20" rx="4" fill="#0f172a" />
                    <text x="160" y="194" fill="#ffffff" fontSize="10" fontWeight="800" textAnchor="middle">તમારું ખેતર (Your Farm)</text>
                  </g>
                </svg>
              </div>

              {/* Map Legend & GIS attribution */}
              <div className="nt-map-legend">
                <div className="leg-item">
                  <span className="leg-dot farm"></span>
                  <span>{lang === 'gu' ? 'તમારું ખેતર' : 'Your Farm'}</span>
                </div>
                <div className="leg-item">
                  <span className="leg-dot trader"></span>
                  <span>{lang === 'gu' ? 'પ્રમાણિત વેપારીઓ' : 'Verified Traders'}</span>
                </div>
                <span className="gis-tag">Google Maps & ISRO Bhuvan GIS આધારિત</span>
              </div>

              {/* Highway Tip */}
              <div className="nt-map-tip-bar">
                <span>🛣️ {lang === 'gu' ? 'હાઇવે ટ્રાન્સપોર્ટેશન રસ્તો સીધો સુલભ છે' : 'Direct highway transportation route accessible'}</span>
                <button type="button" className="btn-expand-map" onClick={() => toast.success(lang === 'gu' ? 'નકશો વિગતમાં ખોલવામાં આવ્યો' : 'Map expanded')}>
                  {lang === 'gu' ? 'મોટો નકશો જુઓ ↗' : 'View Fullscreen ↗'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Verified Trader Profiles List */}
          <div className="nt-profiles-col">
            <div className="nt-profiles-header">
              <span className="ph-title">{lang === 'gu' ? 'પ્રમાણિત વેપારીઓની યાદી (VERIFIED TRADER PROFILES)' : 'VERIFIED TRADER PROFILES'}</span>
              <span className="ph-gov-tag">🛡️ {lang === 'gu' ? 'સરકારી APMC નોંધણી વેરિફાઇડ' : 'Govt APMC Registered'}</span>
            </div>

            <div className="nt-cards-list">
              {filteredTraders.map((trader) => (
                <div key={trader.id} className="nt-trader-card">
                  
                  {/* Top Badges Row */}
                  <div className="nt-tc-badges-strip">
                    {trader.verified712 && (
                      <span className="badge-712">🛡️ {lang === 'gu' ? 'ખેડૂત પ્રમાણિત (7/12 & 8-A)' : '7/12 Certified'}</span>
                    )}
                    <span className="badge-lic">APMC લાઇસન્સ: {trader.license}</span>
                    <span className="badge-dist">📍 {trader.distanceGu} • {trader.locationGu}</span>
                  </div>

                  {/* Main Details Row */}
                  <div className="nt-tc-main-row">
                    <div className="nt-tc-info">
                      <h2 className="nt-tc-name">{lang === 'gu' ? trader.nameGu : trader.nameEn}</h2>
                      <div className="nt-tc-owner-row">
                        <span>{lang === 'gu' ? `સંચાલક: ${trader.ownerGu}` : `Proprietor: ${trader.ownerEn}`}</span>
                        <span className="nt-sep">•</span>
                        <span className="star-rating">⭐ {trader.rating} ★ ({trader.dealsCount} {lang === 'gu' ? 'સફળ સોદા' : 'deals'})</span>
                        <span className="nt-sep">•</span>
                        <span className="tier-tag">{trader.tierGu}</span>
                      </div>
                    </div>

                    <div className="nt-tc-grade-box">
                      <span className="tc-grade-main">{trader.gradeGu}</span>
                      <span className="tc-grade-sub">{trader.gradeSubGu}</span>
                    </div>
                  </div>

                  {/* Specs Grid: Crops buying + Payment track record */}
                  <div className="nt-tc-specs-grid">
                    <div className="spec-box">
                      <span className="spec-label">🌾 {lang === 'gu' ? 'ખરીદી પાક (CROPS BUYING):' : 'Crops Buying:'}</span>
                      <strong className="spec-val">{trader.cropsGu}</strong>
                      <span className="spec-sub">{lang === 'gu' ? `રોજેરોજ ભાવ: ${trader.dailyRate}` : `Daily benchmark: ${trader.dailyRate}`}</span>
                    </div>

                    <div className="spec-box">
                      <span className="spec-label">💳 {lang === 'gu' ? 'પેમેન્ટ ટ્રેક રેકોર્ડ:' : 'Payment Track Record:'}</span>
                      <strong className="spec-val text-green-bold">{trader.paymentTrackGu}</strong>
                      <span className="spec-sub">{trader.paymentReceiptGu}</span>
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="nt-tc-actions-row">
                    <div className="nt-actions-left">
                      <a href={`tel:${trader.phone}`} className="nt-btn-call">
                        📞 {lang === 'gu' ? 'ડાયરેક્ટ કોલ (Call)' : 'Direct Call'}
                      </a>
                      <button
                        type="button"
                        className="nt-btn-chat"
                        onClick={() => navigate('/farmer/messages')}
                      >
                        💬 {lang === 'gu' ? 'ચેટ / ભાવતાલ (Chat)' : 'Chat & Bid'}
                      </button>
                    </div>

                    <Link to={`/farmer/traders/${trader.id}`} className="nt-btn-profile">
                      {lang === 'gu' ? 'પ્રોફાઇલ જુઓ (View Profile) →' : 'View Profile & Demands →'}
                    </Link>
                  </div>

                </div>
              ))}
            </div>

            {/* Bottom Support Banner */}
            <div className="nt-help-banner">
              <div className="hb-left">
                <span className="hb-icon">💡</span>
                <span className="hb-text">
                  {lang === 'gu'
                    ? 'વેપારી સાથે ભાવતાલ કરવામાં મુશ્કેલી પડે છે? અમારા APMC સલાહકાર ખેડૂત મિત્ર સાથે મફત વાત કરો.'
                    : 'Need guidance negotiating with millers? Speak to our local APMC agri-counselor free.'}
                </span>
              </div>
              <a href="tel:1800543388" className="hb-btn-call">
                📞 {lang === 'gu' ? '૧૮૦૦-૫૪૩-૩૮૮ પર કૉલ કરો' : 'Call 1800-543-388'}
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default NearbyTradersPage;
