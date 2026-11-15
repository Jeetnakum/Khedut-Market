import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './MyCropsPage.css';

const MY_CROPS_DATA = [
  {
    id: 'crop_1',
    lotId: '#GJ-COT-8842',
    mandiGu: 'ગોંડલ યાર્ડ / Gondal APMC',
    dateGu: '૧૪ ફેબ્રુઆરી ૨૦૨૫ (૨ દિવસ પહેલાં)',
    dateEn: '14 Feb 2025 (2 days ago)',
    nameGu: 'સૌરાષ્ટ્ર શંકર કપાસ (Shankar-6 Cotton)',
    nameEn: 'Saurashtra Shankar-6 Cotton',
    descGu: 'સફેદ ચમકદાર રુ, ૨૯ એમએમ લંબાઈ, માઇક્રોનેર ૩.૮ થી ૪.૨, ભેજમુક્ત ૧૦૦% સાફ માલ, ખેતરેથી સીધો લોડિંગ તૈયાર.',
    descEn: 'Bright white fiber, 29mm staple, micronaire 3.8 to 4.2, 100% moisture-free clean stock, ready for farm-gate loading.',
    grade: 'Grade A (ઉત્તમ)',
    status: 'active',
    qty: '૩૫૦ ક્વિન્ટલ',
    rate: '₹૧,૭૨૦ / મણ',
    views: '૪૨૦ ખેડૂત/વેપારી',
    offers: '૪ ઑફર્સ મળી',
    offersCount: 4,
    highestOffer: '₹૧,૭૫૦/મણ (વેપારી: માખણ કોટન જીનિંગ, ગોંડલ)',
    img: '/crops/cotton.jpg',
  },
  {
    id: 'crop_2',
    lotId: '#GJ-CUM-3310',
    mandiGu: 'ઊંઝા માર્કેટ યાર્ડ / Unjha APMC',
    dateGu: '૧૨ ફેબ્રુઆરી ૨૦૨૫',
    dateEn: '12 Feb 2025',
    nameGu: 'ઊંઝા સ્પેશિયલ જીરૂ (Cumin Seeds - Jeera)',
    nameEn: 'Unjha Special Cumin Seeds',
    descGu: 'મશીન ક્લીન, સુગંધિત ગાંસડી વગરનું તેલવાળું જીરું. ૧૨૦ ગુણી (૫૦ કિગ્રા પેકિંગ), લેબ ટેસ્ટિંગ રિપોર્ટ ઉપલબ્ધ.',
    descEn: 'Machine clean, aromatic high-oil cumin seeds. 120 bags (50kg packaging), lab testing report certified.',
    grade: 'Grade A+ (નિકાસ ક્વોલિટી)',
    status: 'negotiating',
    qty: '૧૨૦ ગુણી (બોરી)',
    rate: '₹૫,૬૦૦ / મણ',
    views: '૩૧૫ વેપારી',
    offers: '૨ વેપારીઓ સામે',
    offersCount: 2,
    activeNeg: 'પટેલ સ્માઈલિંગ ટ્રેડર્સ ... અંતિમ નિર્ણય બાકી - Pending Farmer Approval',
    img: '/crops/cumin.jpg',
  },
  {
    id: 'crop_3',
    lotId: '#GJ-GNT-1092',
    mandiGu: 'જામનગર દાણા યાર્ડ / Jamnagar APMC',
    dateGu: '૧૦ ફેબ્રુઆરી ૨૦૨૫',
    dateEn: '10 Feb 2025',
    nameGu: 'જામનગરી જી-૨૦ મગફળી (Groundnut G-20 Bold)',
    nameEn: 'Jamnagari Groundnut G-20 Bold',
    descGu: 'સૂકી પૂર્ણ વગરની જી-૨૦ જાતની મગફળી, તેલની માત્રા ૪૮%+, ૫૦૦ ક્વિન્ટલ એકસાથે અથવા લોટ મુજબ ઉપલબ્ધ.',
    descEn: 'Sun-dried premium G-20 bold groundnut, 48%+ oil recovery, available in single 500 Qtl lot.',
    grade: 'Grade B (યાર્ડ પ્રમાણવાળો)',
    status: 'active',
    qty: '૫૦૦ ક્વિન્ટલ',
    rate: '₹૧,૩૮૦ / મણ',
    views: '૫૬૩ વ્યૂ',
    offers: '૧ નવી ઑફર',
    offersCount: 1,
    img: '/crops/groundnut.jpg',
  },
  {
    id: 'crop_4',
    lotId: '#GJ-WHT-7721',
    mandiGu: 'ગોંડલ તાલુકાતપૂર્વક પૂર્ણ',
    dateGu: '૦૫ ફેબ્રુઆરી ૨૦૨૫',
    dateEn: '05 Feb 2025',
    nameGu: 'ભાલિયા ટુકડા ઘઉં (Bhalia Tukda Wheat)',
    nameEn: 'Bhalia Tukda Wheat',
    descGu: 'કુદરતી ભાલ વિસ્તારના સોનેરી ટુકડા ઘઉં. ૪૦૦ બોરી સંપૂર્ણ વેચાણ પૂરું થઈ ગયેલ છે. પેમેન્ટ રસીદ ડાઉનલોડ માટે ઉપલબ્ધ.',
    descEn: 'Organic golden bhalia wheat. 200 bags successfully delivered and settled. Payment receipt available.',
    grade: 'Grade A',
    status: 'sold',
    qty: '૨૦૦ બોરી',
    rate: '₹૪૮૦ / મણ (અંતિમ ભાવ)',
    buyer: 'પટેલ એગ્રો મિલ (અમદાવાદ)',
    receiptId: '#APMC-PAY-98124',
    img: '/crops/wheat.jpg',
  },
];

const MyCropsPage = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('active'); // active, negotiating, sold, all
  const [searchTerm, setSearchTerm] = useState('');
  const [mandiFilter, setMandiFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredCrops = MY_CROPS_DATA.filter((crop) => {
    if (activeTab === 'active' && crop.status !== 'active') return false;
    if (activeTab === 'negotiating' && crop.status !== 'negotiating') return false;
    if (activeTab === 'sold' && crop.status !== 'sold') return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const match =
        crop.nameGu.toLowerCase().includes(q) ||
        crop.nameEn.toLowerCase().includes(q) ||
        crop.lotId.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleShareWhatsApp = (crop) => {
    const text = encodeURIComponent(
      `ગુજરાત કિસાન બજાર લિસ્ટિંગ: ${crop.nameGu} (${crop.lotId})\nજથ્થો: ${crop.qty}\nભાવ: ${crop.rate}\nસ્થળ: નવાગઢ, ગોંડલ\nખરીદવા માટે લિંક જુઓ: https://khedutmarket.gov.in/crop/${crop.id}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleMarkSold = (cropName) => {
    toast.success(lang === 'gu' ? `${cropName} વેચાઈ ગયો તરીકે માર્ક થયો!` : `${cropName} marked as sold!`);
  };

  return (
    <div className="my-crops-page">
      <div className="mc-container">

        {/* 1. Header Bar */}
        <div className="mc-header-card">
          <div className="mc-header-left">
            <div className="mc-tag-badge">
              🌾 {lang === 'gu' ? 'ખેડૂત લિસ્ટિંગ મેનેજમેન્ટ - Farmer Stock Desk' : 'Farmer Stock Desk'}
            </div>
            <h1 className="mc-page-title">
              {lang === 'gu' ? 'મારા મુકેલા તમામ પાકની યાદી (My Crop Listings)' : 'My Crop Listings'}
            </h1>
            <p className="mc-page-subtitle">
              {lang === 'gu'
                ? 'તમે વેચવા મૂકેલા પાકનું સીધું સંચાલન કરો. નવા વેપારીઓ સાથે વાતચીત કરો, વ્હોટ્સએપ પર શેર કરી ઝડપથી ઓર્ડર મેળવો અને ઊંચા બજાર ભાવ મેળવો.'
                : 'Directly manage your live stock. Chat with verified buyers, share on WhatsApp for instant bids, and secure highest mandi prices.'}
            </p>
          </div>

          <div className="mc-header-right">
            <Link to="/farmer/add-crop" className="mc-btn-add-crop">
              ⊕ {lang === 'gu' ? '+ નવો પાક ઉમેરો (+ Add New Crop)' : '+ Add New Crop'}
            </Link>
          </div>
        </div>

        {/* Sub-bar with APMC and Payment status */}
        <div className="mc-sub-status-bar">
          <div className="mss-item">
            <span className="dot green">●</span>
            <span>{lang === 'gu' ? 'ગોંડલ એપીએમસી સંલગ્ન (APMC Gondal)' : 'APMC Gondal Registered'}</span>
          </div>
          <div className="mss-item">
            <span className="dot green">●</span>
            <span>{lang === 'gu' ? 'પેમેન્ટ એકાઉન્ટ: એક્ટિવ (Escrow Ready)' : 'Payment Account: Active (Escrow Ready)'}</span>
          </div>
        </div>

        {/* 2. 4 Stat Badges Row */}
        <div className="mc-stats-grid">
          <div className="mc-stat-badge-box">
            <span className="sb-icon">📦</span>
            <div className="sb-text">
              <span className="sb-label">{lang === 'gu' ? 'કુલ સક્રિય સ્ટોક' : 'Active Stock'}</span>
              <strong className="sb-val">{lang === 'gu' ? '૮૭૦ ક્વિન્ટલ' : '870 Qtl'}</strong>
            </div>
          </div>

          <div className="mc-stat-badge-box">
            <span className="sb-icon">👁️</span>
            <div className="sb-text">
              <span className="sb-label">{lang === 'gu' ? 'કુલ વેરિફાઇડ વ્યુઝ' : 'Verified Views'}</span>
              <strong className="sb-val">{lang === 'gu' ? '૧,૨૪૮ વ્યૂઝ' : '1,248 Views'}</strong>
            </div>
          </div>

          <div className="mc-stat-badge-box">
            <span className="sb-icon">📬</span>
            <div className="sb-text">
              <span className="sb-label">{lang === 'gu' ? 'મળેલી ઑફર્સ (Offers)' : 'Offers Received'}</span>
              <strong className="sb-val text-green-bold">{lang === 'gu' ? '૬ સક્રિય ઑફર' : '6 Active Offers'}</strong>
            </div>
          </div>

          <div className="mc-stat-badge-box">
            <span className="sb-icon">💰</span>
            <div className="sb-text">
              <span className="sb-label">{lang === 'gu' ? 'વેચાયેલ કુલ મૂલ્ય' : 'Total Sold Value'}</span>
              <strong className="sb-val">{lang === 'gu' ? '₹૧૪.૮ લાખ' : '₹14.8 Lakh'}</strong>
            </div>
          </div>
        </div>

        {/* 3. Status Tabs */}
        <div className="mc-tabs-row">
          <button
            type="button"
            className={`mc-tab-btn ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            🌾 {lang === 'gu' ? 'સક્રિય પાક (Active)' : 'Active'} <span className="tab-count">3</span>
          </button>
          <button
            type="button"
            className={`mc-tab-btn ${activeTab === 'negotiating' ? 'active' : ''}`}
            onClick={() => setActiveTab('negotiating')}
          >
            💬 {lang === 'gu' ? 'વાતચીત ચાલુ (In Negotiation)' : 'In Negotiation'} <span className="tab-count orange">1</span>
          </button>
          <button
            type="button"
            className={`mc-tab-btn ${activeTab === 'sold' ? 'active' : ''}`}
            onClick={() => setActiveTab('sold')}
          >
            ✓ {lang === 'gu' ? 'વેચાઈ ગયો / પૂર્ણ (Sold & Closed)' : 'Sold & Closed'} <span className="tab-count gray">5</span>
          </button>
          <button
            type="button"
            className={`mc-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            📋 {lang === 'gu' ? 'તમામ (All)' : 'All Listings'} <span className="tab-count">10</span>
          </button>
        </div>

        {/* 4. Search & Filter Bar */}
        <div className="mc-filter-toolbar">
          <div className="mc-search-box">
            <input
              type="text"
              placeholder={lang === 'gu' ? 'પાકનું નામ, જાત અથવા લોટ નંબર શોધો...' : 'Search crop name, variety, or lot ID...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mc-search-input"
            />
            <button type="button" className="mc-search-mic">🎙️</button>
          </div>

          <div className="mc-select-group">
            <select value={mandiFilter} onChange={(e) => setMandiFilter(e.target.value)} className="mc-filter-select">
              <option value="all">{lang === 'gu' ? 'ગોંડલ APMC (Gondal)' : 'Gondal APMC'}</option>
              <option value="rajkot">{lang === 'gu' ? 'રાજકોટ APMC (Rajkot)' : 'Rajkot APMC'}</option>
              <option value="unjha">{lang === 'gu' ? 'ઊંઝા APMC (Unjha)' : 'Unjha APMC'}</option>
            </select>

            <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="mc-filter-select">
              <option value="all">{lang === 'gu' ? 'ગુણવત્તા (Grade: All)' : 'Grade: All'}</option>
              <option value="A">Grade A (ઉત્તમ)</option>
              <option value="B">Grade B (મધ્યમ)</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="mc-filter-select">
              <option value="newest">{lang === 'gu' ? 'નવા મુકેલા પહેલા (Newest)' : 'Newest First'}</option>
              <option value="price_high">{lang === 'gu' ? 'ભાવ: ઊંચા થી નીચા' : 'Price: High to Low'}</option>
              <option value="views">{lang === 'gu' ? 'સૌથી વધુ વ્યૂઝ' : 'Most Viewed'}</option>
            </select>

            <button type="button" className="mc-btn-refresh" onClick={() => toast.success(lang === 'gu' ? 'રિફ્રેશ થયું' : 'Refreshed')}>
              ↻
            </button>
          </div>
        </div>

        {/* 5. Horizontal Cards List */}
        <div className="mc-cards-list">
          {filteredCrops.map((crop) => (
            <div key={crop.id} className="mc-crop-card">
              
              <div className="mc-card-top-row">
                {/* Left Thumbnail with Grade */}
                <div className="mc-thumb-wrap">
                  <img src={crop.img} alt={crop.nameGu} />
                  <span className={`mc-card-status-badge ${crop.status}`}>
                    {crop.status === 'active' && (lang === 'gu' ? '● સક્રિય (Active)' : '● Active')}
                    {crop.status === 'negotiating' && (lang === 'gu' ? '💬 વાતચીત ચાલુ' : '💬 In Negotiation')}
                    {crop.status === 'sold' && (lang === 'gu' ? '✓ વેચાઈ ગયો (SOLD)' : '✓ Sold')}
                  </span>
                  <span className="mc-grade-pill">{crop.grade}</span>
                </div>

                {/* Center Main Info */}
                <div className="mc-card-center-info">
                  <div className="mc-lot-strip">
                    <span className="mc-lot-id">{crop.lotId}</span>
                    <span className="mc-dot-sep">•</span>
                    <span className="mc-mandi-tag">🏛️ {crop.mandiGu}</span>
                    <span className="mc-date-tag">⏱️ {lang === 'gu' ? crop.dateGu : crop.dateEn}</span>
                  </div>

                  <h2 className="mc-crop-title">{lang === 'gu' ? crop.nameGu : crop.nameEn}</h2>
                  <p className="mc-crop-desc">{lang === 'gu' ? crop.descGu : crop.descEn}</p>

                  {/* 4 Key Metrics Grid */}
                  <div className="mc-metrics-row">
                    <div className="mc-m-col">
                      <span className="mc-m-label">{lang === 'gu' ? 'જથ્થો (Quantity)' : 'Quantity'}</span>
                      <strong className="mc-m-val">{crop.qty}</strong>
                    </div>

                    <div className="mc-m-col">
                      <span className="mc-m-label">{lang === 'gu' ? 'અપેક્ષિત ભાવ (Rate)' : 'Expected Rate'}</span>
                      <strong className="mc-m-val text-green-bold">{crop.rate}</strong>
                    </div>

                    <div className="mc-m-col">
                      <span className="mc-m-label">{lang === 'gu' ? 'વ્યુઝ (Views)' : 'Views'}</span>
                      <strong className="mc-m-val">{crop.views || '૪૨૦ વેપારી'}</strong>
                    </div>

                    <div className="mc-m-col">
                      <span className="mc-m-label">{lang === 'gu' ? 'ઓફર્સ સ્ટેટસ' : 'Offer Status'}</span>
                      <span className={`mc-offers-pill ${crop.status === 'negotiating' ? 'orange' : 'green'}`}>
                        {crop.offers}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="mc-card-actions-bar">
                <div className="mc-ca-left">
                  {crop.status !== 'sold' && (
                    <button
                      type="button"
                      className="mc-btn-whatsapp"
                      onClick={() => handleShareWhatsApp(crop)}
                    >
                      <span className="wa-icon">📱</span> {lang === 'gu' ? 'WhatsApp પર શેર કરો (Share)' : 'Share on WhatsApp'}
                    </button>
                  )}

                  {crop.status === 'active' && (
                    <button
                      type="button"
                      className="mc-btn-offers"
                      onClick={() => navigate('/farmer/messages')}
                    >
                      📬 {lang === 'gu' ? `ઓફર્સ જુઓ (View Offers - ${crop.offersCount})` : `View Offers (${crop.offersCount})`}
                    </button>
                  )}

                  {crop.status === 'negotiating' && (
                    <button
                      type="button"
                      className="mc-btn-chat"
                      onClick={() => navigate('/farmer/messages')}
                    >
                      💬 {lang === 'gu' ? 'ચેટ / વાતચીત જુઓ (View Chat)' : 'View Chat & Counter'}
                    </button>
                  )}

                  {crop.status === 'sold' && (
                    <>
                      <button
                        type="button"
                        className="mc-btn-receipt"
                        onClick={() => toast.success(lang === 'gu' ? 'રસીદ ડાઉનલોડ થઈ રહી છે...' : 'Downloading receipt...')}
                      >
                        📄 {lang === 'gu' ? 'વેચાણ પાવતી ડાઉનલોડ (Download Receipt)' : 'Download Receipt'}
                      </button>
                      <button
                        type="button"
                        className="mc-btn-relist"
                        onClick={() => navigate('/farmer/add-crop')}
                      >
                        ↻ {lang === 'gu' ? 'ફરી લિસ્ટ કરો (Relist)' : 'Relist Stock'}
                      </button>
                    </>
                  )}
                </div>

                <div className="mc-ca-right">
                  {crop.status !== 'sold' && (
                    <>
                      <Link to={`/farmer/edit-crop/${crop.id}`} className="mc-btn-edit">
                        ✏️ {lang === 'gu' ? 'ભાવ/વિગત એડિટ કરો (Edit)' : 'Edit Listing'}
                      </Link>
                      <button
                        type="button"
                        className="mc-btn-mark-sold"
                        onClick={() => handleMarkSold(crop.nameGu)}
                      >
                        ✓ {lang === 'gu' ? 'વેચાઈ ગયો માર્ક કરો' : 'Mark as Sold'}
                      </button>
                      <button type="button" className="mc-btn-more">⋮</button>
                    </>
                  )}
                </div>
              </div>

              {/* Status Banner at bottom of Card */}
              {crop.highestOffer && (
                <div className="mc-card-banner green-banner">
                  <span>⭐ <strong>{lang === 'gu' ? 'સૌથી ઊંચી ઑફર:' : 'Highest Offer:'}</strong> {crop.highestOffer}</span>
                  <Link to="/farmer/messages" className="banner-link">
                    {lang === 'gu' ? 'ઓફર સ્વીકારો અથવા સામે નવો ભાવ આપો →' : 'Accept offer or send counter bid →'}
                  </Link>
                </div>
              )}

              {crop.activeNeg && (
                <div className="mc-card-banner orange-banner">
                  <span>⏳ <strong>{lang === 'gu' ? 'ચાલુ ભાવતાલ:' : 'Active Negotiation:'}</strong> {crop.activeNeg}</span>
                  <Link to="/farmer/messages" className="banner-link">
                    {lang === 'gu' ? 'નિર્ણય આપો (Decision) →' : 'Submit Decision →'}
                  </Link>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* 6. Pagination */}
        <div className="mc-pagination-bar">
          <span className="pg-count-text">
            {lang === 'gu' ? 'કુલ ૧૫ માંથી ૧ થી ૪ પાક દર્શાવ્યા છે' : 'Showing 1 to 4 of 15 crops'}
          </span>
          <div className="pg-btn-group">
            <button type="button" className="pg-btn">← {lang === 'gu' ? 'પાછળ' : 'Prev'}</button>
            <button type="button" className="pg-btn active">1</button>
            <button type="button" className="pg-btn">2</button>
            <button type="button" className="pg-btn">3</button>
            <button type="button" className="pg-btn">{lang === 'gu' ? 'આગળ' : 'Next'} →</button>
          </div>
        </div>

        {/* 7. Bottom Help Banner */}
        <div className="mc-support-banner">
          <div className="sb-inner-left">
            <span className="sb-big-icon">📞</span>
            <div>
              <h3 className="sb-title">
                {lang === 'gu' ? 'પાકના સારા ભાવ મેળવવામાં મુશ્કેલી પડે છે?' : 'Difficulty getting right prices for your crops?'}
              </h3>
              <p className="sb-desc">
                {lang === 'gu'
                  ? 'અમારા જિલ્લા APMC સહાયક ખેડૂત મિત્ર સાથે નિઃશુલ્ક વાત કરો. અમે તમને યોગ્ય વેપારી સામે લાઈવ સોદો કરવામાં મદદ કરીશું.'
                  : 'Speak with our dedicated APMC district agri-officer for free. We help you negotiate directly with verified millers.'}
              </p>
            </div>
          </div>
          <a href="tel:1800543388" className="sb-btn-tollfree">
            📞 {lang === 'gu' ? 'ટોલ-ફ્રી: ૧૮૦૦-૫૪૩-૩૮૮' : 'Toll-Free: 1800-543-388'}
          </a>
        </div>

      </div>
    </div>
  );
};

export default MyCropsPage;
