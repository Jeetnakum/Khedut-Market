import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './FarmerDashboard.css';

const RECENT_CROPS = [
  {
    id: 'crop_1',
    lotId: '#KAP-782',
    nameGu: 'શંકર-૬ કપાસ',
    nameEn: 'Shankar-6 Cotton',
    grade: 'Grade A',
    qtyGu: '૩૫૦ ક્વિન્ટલ (લગભગ ૧,૭૫૦ મણ)',
    qtyEn: '350 Quintals (approx 1,750 mounds)',
    storageGu: 'ગોંડલ માર્કેટ યાર્ડ પાસે',
    storageEn: 'Near Gondal APMC Market Yard',
    bestOffer: 1720,
    apmcPrice: 1680,
    diff: '+₹૪૦ વધુ',
    offersCount: 3,
    img: '/crops/cotton.jpg',
  },
  {
    id: 'crop_2',
    lotId: '#JIR-104',
    nameGu: 'દેશી જીરૂ (Cumin Seeds - Machine Clean)',
    nameEn: 'Desi Cumin Seeds (Machine Clean)',
    grade: 'Grade A',
    qtyGu: '૧૨૦ ક્વિન્ટલ (૬૦૦ મણ)',
    qtyEn: '120 Quintals (600 mounds)',
    storageGu: 'ખેડૂત ગોડાઉન, રીબડા',
    storageEn: 'Farmer Warehouse, Ribda',
    bestOffer: 5350,
    apmcPrice: 5250,
    diff: '+₹૧૦૦ વધુ',
    offersCount: 2,
    img: '/crops/cumin.jpg',
  },
  {
    id: 'crop_3',
    lotId: '#MGF-491',
    nameGu: 'મગફળી G-20 (Groundnut Semi-Bold)',
    nameEn: 'Groundnut G-20 (Semi-Bold)',
    grade: 'Grade B',
    qtyGu: '૨૦૦ ક્વિન્ટલ (૧,૦૦૦ મણ)',
    qtyEn: '200 Quintals (1,000 mounds)',
    storageGu: 'યાર્ડ વેપારી વેરહાઉસ',
    storageEn: 'Yard Trader Warehouse',
    bestOffer: 1420,
    apmcPrice: 1410,
    diff: '૧ નવી ઓફર',
    offersCount: 1,
    img: '/crops/groundnut.jpg',
  },
  {
    id: 'crop_4',
    lotId: '#GHA-330',
    nameGu: 'ટુકડા લોકવન ઘઉં (Lokwan Wheat)',
    nameEn: 'Tukda Lokwan Wheat',
    grade: 'Grade A',
    qtyGu: '૪૩૦ ક્વિન્ટલ (૨,૧૫૦ મણ)',
    qtyEn: '430 Quintals (2,150 mounds)',
    storageGu: 'પોતાના ફાર્મહાઉસ પર',
    storageEn: 'At Farmhouse Storage',
    bestOffer: 560,
    apmcPrice: 545,
    diff: '+₹૧૫ વધુ',
    offersCount: 2,
    img: '/crops/wheat.jpg',
  },
];

const INITIAL_DEALS = [
  {
    id: 'deal_1',
    traderGu: 'શ્રીજી જીનિંગ ઇન્ડસ્ટ્રીઝ',
    traderEn: 'Shreeji Ginning Industries',
    tag: 'SJ',
    timeGu: '૨૫ મિનિટ પહેલાં',
    timeEn: '25 min ago',
    addressGu: 'રાજકોટ હાઇવે • APMC લાઇસન્સ #RJT-421',
    cropGu: 'શંકર-૬ કપાસ (૨૦૦ ક્વિન્ટલ)',
    cropEn: 'Shankar-6 Cotton (200 Qtl)',
    offerRate: '₹૧,૭૨૦ / મણ',
    totalVal: '₹૧૭,૨૦,૦૦૦ (રોકડ RTGS)',
    messageGu: 'કાલે સવારે ગાડી ગોડાઉને મોકલી શકીશું. વજન કાંટો યાર્ડમાં માન્ય.',
    messageEn: 'Can send vehicle tomorrow morning. Standard yard weighment accepted.',
    status: 'pending',
  },
  {
    id: 'deal_2',
    traderGu: 'કિશાન ટ્રેડિંગ કંપની',
    traderEn: 'Kishan Trading Company',
    tag: 'KT',
    timeGu: '૧ કલાક પહેલાં',
    timeEn: '1 hour ago',
    addressGu: 'ગોંડલ માર્કેટ યાર્ડ • શોપ #૫૪',
    cropGu: 'દેશી જીરૂ (૫૦ ક્વિન્ટલ)',
    cropEn: 'Desi Cumin (50 Qtl)',
    offerRate: '₹૫,૩૫૦ / મણ',
    totalVal: '₹૧૦,૭૫,૦૦૦ (બેંક ટ્રાન્સફર)',
    messageGu: 'નમૂનો જોઈ લીધો છે, ઉત્તમ ક્વોલિટી છે. આજે સાંજ સુધીમાં કન્ફર્મ કરો.',
    messageEn: 'Sample inspected, excellent quality. Please confirm by this evening.',
    status: 'pending',
  },
  {
    id: 'deal_3',
    traderGu: 'મારૂતિ ઓઇલ મિલ્સ',
    traderEn: 'Maruti Oil Mills',
    tag: 'MO',
    timeGu: '૩ કલાક પહેલાં',
    timeEn: '3 hours ago',
    addressGu: 'શાપર વેરાવળ • ઇન્ડસ્ટ્રીયલ ઝોન',
    cropGu: 'મગફળી G-20 (૧૫૦ ક્વિન્ટલ)',
    cropEn: 'Groundnut G-20 (150 Qtl)',
    offerRate: '₹૧,૪૨૦ / મણ',
    targetRate: 'તમારો ટાર્ગેટ: ₹૧,૪૬૦/મણ',
    messageGu: 'ઓઇલ રિકવરી ટેસ્ટ રિપોર્ટ બાદ પેમેન્ટ ૨ કલાકમાં ક્લિયર કરીશું.',
    messageEn: 'Payment cleared within 2 hours of oil recovery test report.',
    status: 'counter_needed',
  },
];

const FarmerDashboard = () => {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [selectedOfferCrop, setSelectedOfferCrop] = useState(null);

  const handleAcceptDeal = (dealId, traderName) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, status: 'accepted' } : d));
    toast.success(
      lang === 'gu'
        ? `${traderName} ની ઑફર સ્વીકારાઈ! APMC ડિજિટલ કોન્ટ્રાક્ટ જનરેટ થયો. 🎉`
        : `Offer accepted from ${traderName}! APMC digital contract generated. 🎉`
    );
  };

  const handleCounterDeal = (dealId) => {
    navigate('/farmer/messages');
  };

  return (
    <div className="farmer-dash-page">
      <div className="fd-container">

        {/* 1. Header Greeting & Quick Actions Banner */}
        <div className="fd-welcome-card">
          <div className="fd-welcome-left">
            <span className="fd-verified-badge">
              🛡️ {lang === 'gu' ? '૭/૧૨ અને ૮-અ પ્રમાણિત ખાતાધારક (7/12 & 8-A Verified Farmer)' : '7/12 & 8-A Verified Farmer'}
            </span>
            <h1 className="fd-welcome-title">
              {lang === 'gu' ? `જય ખેડૂત, ${user?.name || 'રમેશભાઈ પટેલ'}! 🙏` : `Welcome, ${user?.nameEn || 'Ramesh Patel'}! 🙏`}
            </h1>
            <p className="fd-welcome-sub">
              {lang === 'gu'
                ? 'તમારા પાક અને વેચાણનું આજનું લાઈવ સ્ટેટસ (Today\'s Live Crop & Sales Status)'
                : 'Today\'s live status of your listed crops, buyer offers and APMC market prices.'}
            </p>
          </div>

          <div className="fd-welcome-actions">
            <Link to="/farmer/add-crop" className="fd-btn-action primary">
              <span className="btn-sym">⊕</span>
              <span>{lang === 'gu' ? '+ નવો પાક ઉમેરો (+ Add Crop)' : '+ Add New Crop'}</span>
            </Link>
            <Link to="/prices" className="fd-btn-action outline">
              <span className="btn-sym">📈</span>
              <span>{lang === 'gu' ? 'મંડી લાઈવ ભાવ (APMC Rates)' : 'Live APMC Rates'}</span>
            </Link>
            <Link to="/farmer/my-crops" className="fd-btn-action outline">
              <span className="btn-sym">📬</span>
              <span>{lang === 'gu' ? 'ઓફર્સ જુઓ (View Offers)' : 'View Offers'}</span>
              <span className="fd-orange-bubble">૮</span>
            </Link>
            <Link to="/about#helpline" className="fd-btn-action outline">
              <span className="btn-sym">📞</span>
              <span>{lang === 'gu' ? 'સહાયતા (Helpline)' : 'Helpline'}</span>
            </Link>
          </div>
        </div>

        {/* 2. 4 Top Key Stats Cards */}
        <div className="fd-stats-grid">
          
          {/* Stat 1 */}
          <div className="fd-stat-card">
            <div className="fd-stat-top">
              <span className="fd-stat-icon green-bg">🌾</span>
              <span className="fd-stat-badge green">{lang === 'gu' ? '૪ સક્રિય' : '4 Active'}</span>
            </div>
            <span className="fd-stat-label">{lang === 'gu' ? 'સક્રિય પાક (Active Listings)' : 'Active Listings'}</span>
            <div className="fd-stat-main-val">
              {lang === 'gu' ? '૪ પાક' : '4 Crops'} <span className="fd-stat-sub-val">(૧,૧૦૦ ક્વિન્ટલ કુલ)</span>
            </div>
            <span className="fd-stat-footer-text">{lang === 'gu' ? 'કપાસ, જીરૂ, મગફળી, ઘઉં' : 'Cotton, Cumin, Groundnut, Wheat'}</span>
          </div>

          {/* Stat 2 */}
          <div className="fd-stat-card">
            <div className="fd-stat-top">
              <span className="fd-stat-icon blue-bg">👁️</span>
              <span className="fd-stat-badge blue">{lang === 'gu' ? '+૧૮% આજે' : '+18% today'}</span>
            </div>
            <span className="fd-stat-label">{lang === 'gu' ? 'કુલ વ્યૂઝ (Total Buyer Views)' : 'Total Buyer Views'}</span>
            <div className="fd-stat-main-val">
              {lang === 'gu' ? '૧,૪૨૦' : '1,420'} <span className="fd-stat-sub-val">{lang === 'gu' ? 'ચકાસાયેલ વેપારીઓ' : 'verified buyers'}</span>
            </div>
            <span className="fd-stat-footer-text">{lang === 'gu' ? 'રાજકોટ, ગોંડલ, સુરત જીનર્સ' : 'Rajkot, Gondal, Surat Ginners'}</span>
          </div>

          {/* Stat 3 */}
          <div className="fd-stat-card">
            <div className="fd-stat-top">
              <span className="fd-stat-icon orange-bg">📬</span>
              <span className="fd-stat-badge orange">{lang === 'gu' ? '૨ તાકીદે રિવ્યુ કરો' : '2 Urgent Reviews'}</span>
            </div>
            <span className="fd-stat-label">{lang === 'gu' ? 'મળેલી ઓફર્સ (Received Offers)' : 'Received Offers'}</span>
            <div className="fd-stat-main-val">
              {lang === 'gu' ? '૮ નવી ઓફર્સ' : '8 New Offers'} <span className="fd-stat-sub-val">(૨૪ કલાકમાં)</span>
            </div>
            <span className="fd-stat-footer-text text-green-bold">{lang === 'gu' ? 'સૌથી ઉંચી બોલી: ₹૧,૭૨૦/મણ →' : 'Highest Bid: ₹1,720/mound →'}</span>
          </div>

          {/* Stat 4 */}
          <div className="fd-stat-card">
            <div className="fd-stat-top">
              <span className="fd-stat-icon teal-bg">₹</span>
              <span className="fd-stat-badge teal">Mandi Benchmark</span>
            </div>
            <span className="fd-stat-label">{lang === 'gu' ? 'અંદાજિત સંભવિત કમાણી (Estimated Value)' : 'Estimated Stock Value'}</span>
            <div className="fd-stat-main-val">
              {lang === 'gu' ? '₹૧૨.૪ લાખ' : '₹12.4 Lakh'} <span className="fd-stat-gain">▲ +₹42,000</span>
            </div>
            <span className="fd-stat-footer-text">{lang === 'gu' ? 'સરકારી APMC દર કરતાં વધુ મળવાપાત્ર' : 'Higher than government mandi benchmark'}</span>
          </div>

        </div>

        {/* 3. Main 2-Column Split: Recent Crops (Left) + APMC Rates & Tips (Right) */}
        <div className="fd-main-grid">
          
          {/* LEFT: Recent Listed Crops */}
          <div className="fd-crops-col">
            <div className="fd-card">
              <div className="fd-card-header">
                <div className="fd-ch-title-wrap">
                  <h2 className="fd-ch-title">{lang === 'gu' ? 'મારા તાજા લિસ્ટેડ પાક (Recent Listed Crops)' : 'Recent Listed Crops'}</h2>
                  <span className="fd-active-count-tag">{lang === 'gu' ? '૪ સક્રિય' : '4 Active'}</span>
                </div>
                <div className="fd-ch-tools">
                  <button type="button" className="fd-tool-btn">🔍 {lang === 'gu' ? 'ફિલ્ટર કરો' : 'Filter'}</button>
                  <button type="button" className="fd-tool-btn">⇅ {lang === 'gu' ? 'ક્રમબદ્ધ' : 'Sort'}</button>
                </div>
              </div>

              {/* Crops Items List */}
              <div className="fd-crops-list">
                {RECENT_CROPS.map((crop) => (
                  <div key={crop.id} className="fd-crop-item">
                    <div className="fd-ci-img-wrap">
                      <img src={crop.img} alt={crop.nameGu} />
                      <span className="fd-ci-grade">{crop.grade}</span>
                    </div>

                    <div className="fd-ci-info">
                      <div className="fd-ci-title-row">
                        <h3 className="fd-ci-name">{lang === 'gu' ? crop.nameGu : crop.nameEn}</h3>
                        <span className="fd-ci-lot">{crop.lotId}</span>
                      </div>

                      <div className="fd-ci-meta-row">
                        <span>📦 {lang === 'gu' ? 'જથ્થો:' : 'Qty:'} <strong>{lang === 'gu' ? crop.qtyGu : crop.qtyEn}</strong></span>
                        <span className="ci-meta-sep">•</span>
                        <span>📍 {lang === 'gu' ? 'સંગ્રહ:' : 'Storage:'} <strong>{lang === 'gu' ? crop.storageGu : crop.storageEn}</strong></span>
                      </div>

                      <div className="fd-ci-price-strip">
                        <div className="fd-ci-offer-box">
                          <span className="ci-ps-label">{lang === 'gu' ? 'શ્રેષ્ઠ ઓફર:' : 'Best Offer:'}</span>
                          <strong className="ci-ps-val">₹{crop.bestOffer.toLocaleString()} <span className="ci-unit">{lang === 'gu' ? '/ મણ' : '/ 20kg'}</span></strong>
                        </div>
                        <div className="fd-ci-apmc-box">
                          <span className="ci-ps-label">{lang === 'gu' ? 'APMC સરખામણી:' : 'APMC Comparison:'}</span>
                          <span className="ci-ps-apmc">₹{crop.apmcPrice} ({crop.diff})</span>
                        </div>
                      </div>
                    </div>

                    <div className="fd-ci-actions">
                      <button
                        type="button"
                        className="fd-ci-btn-offer"
                        onClick={() => setSelectedOfferCrop(crop)}
                      >
                        📬 {lang === 'gu' ? `ઓફર તપાસો (${crop.offersCount})` : `Check Offers (${crop.offersCount})`}
                      </button>
                      <Link to={`/farmer/edit-crop/${crop.id}`} className="fd-ci-btn-manage">
                        ⚙️ {lang === 'gu' ? 'મેનેજ કરો' : 'Manage'}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer Link */}
              <div className="fd-card-footer">
                <span className="fd-footer-meta">{lang === 'gu' ? 'કુલ ૪ લિસ્ટિંગ્સ પ્રદર્શિત • તમામ સ્ટોક વેરિફાઈડ' : 'Showing 4 listings • All 7/12 verified'}</span>
                <Link to="/farmer/my-crops" className="fd-footer-link">
                  {lang === 'gu' ? 'તમામ પાક ઈતિહાસ જુઓ (View All) →' : 'View Full Crop History →'}
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Live APMC Mandi Ticker + Advisor Tip */}
          <div className="fd-sidebar-col">
            
            {/* Live APMC Rates Card */}
            <div className="fd-card fd-mandi-card">
              <div className="fd-mandi-header">
                <div className="fd-mh-left">
                  <span className="fd-live-radar">●</span>
                  <span className="fd-mh-title">{lang === 'gu' ? 'નજીકની APMC ના લાઈવ ભાવ' : 'Live Nearby APMC Rates'}</span>
                </div>
                <span className="fd-today-badge">{lang === 'gu' ? 'આજનો દિવસ' : 'Today'}</span>
              </div>
              <div className="fd-mandi-district">{lang === 'gu' ? 'તમારા જિલ્લા માટે: રાજકોટ / ગોંડલ (Rajkot & Gondal)' : 'Your District: Rajkot / Gondal'}</div>

              {/* Highlight Market Alert */}
              <div className="fd-mandi-alert">
                <span className="alert-star">⭐</span>
                <span>{lang === 'gu' ? 'કપાસમાં આજે +₹૨૬ નો સુધારો - યાર્ડમાં લેવાલી વધતાં ભાવ મજબૂત રહેવાની સંભાવના' : 'Cotton surged +₹26 today - strong ginner buying expected'}</span>
              </div>

              {/* Rates Table */}
              <div className="fd-mandi-table">
                <div className="fd-mt-head">
                  <span>{lang === 'gu' ? 'પાક (Commodity)' : 'Commodity'}</span>
                  <span>{lang === 'gu' ? 'નીચો-ઊંચો ભાવ (૨૦ કિલો/મણ)' : 'Min-Max (20kg)'}</span>
                </div>

                <div className="fd-mt-row">
                  <div className="fd-mt-item">
                    <span className="crop-dot green"></span>
                    <div>
                      <strong>{lang === 'gu' ? 'કપાસ (Cotton)' : 'Cotton'}</strong>
                      <span className="crop-mandi-sub">{lang === 'gu' ? 'ગોંડલ યાર્ડ • આવક ૪૫,૦૦૦ બોરી' : 'Gondal Yard • 45k bags'}</span>
                    </div>
                  </div>
                  <div className="fd-mt-price">
                    <strong>₹૧,૫૨૦ - ₹૧,૭૪૫</strong>
                    <span className="rate-up">▲ +₹૨૫</span>
                  </div>
                </div>

                <div className="fd-mt-row">
                  <div className="fd-mt-item">
                    <span className="crop-dot orange"></span>
                    <div>
                      <strong>{lang === 'gu' ? 'જીરૂ (Cumin)' : 'Cumin'}</strong>
                      <span className="crop-mandi-sub">{lang === 'gu' ? 'રાજકોટ યાર્ડ • આવક ૮,૨૦૦ બોરી' : 'Rajkot Yard • 8.2k bags'}</span>
                    </div>
                  </div>
                  <div className="fd-mt-price">
                    <strong>₹૫,૩૦૦ - ₹૫,૪૨૦</strong>
                    <span className="rate-up">▲ +₹૬૦</span>
                  </div>
                </div>

                <div className="fd-mt-row">
                  <div className="fd-mt-item">
                    <span className="crop-dot yellow"></span>
                    <div>
                      <strong>{lang === 'gu' ? 'મગફળી (Groundnut)' : 'Groundnut'}</strong>
                      <span className="crop-mandi-sub">{lang === 'gu' ? 'ગોંડલ યાર્ડ • આવક ૨૮,૦૦૦ ગુણી' : 'Gondal Yard • 28k bags'}</span>
                    </div>
                  </div>
                  <div className="fd-mt-price">
                    <strong>₹૧,૩૦૦ - ₹૧,૪૮૦</strong>
                    <span className="rate-down">▼ -₹૧૦</span>
                  </div>
                </div>

                <div className="fd-mt-row">
                  <div className="fd-mt-item">
                    <span className="crop-dot purple"></span>
                    <div>
                      <strong>{lang === 'gu' ? 'તલ સફેદ (Sesame)' : 'White Sesame'}</strong>
                      <span className="crop-mandi-sub">{lang === 'gu' ? 'રાજકોટ યાર્ડ • સામાન્ય આવક' : 'Rajkot Yard • Steady'}</span>
                    </div>
                  </div>
                  <div className="fd-mt-price">
                    <strong>₹૨,૪૦૦ - ₹૨,૬૫૦</strong>
                    <span className="rate-steady">સ્થિર</span>
                  </div>
                </div>
              </div>

              <Link to="/prices" className="fd-mandi-more-link">
                📈 {lang === 'gu' ? 'તમામ ૩૩ જિલ્લાના ભાવ પત્રક જુઓ →' : 'View Full APMC Daily Sheet →'}
              </Link>
            </div>

            {/* Farmer Advisor Tip Card */}
            <div className="fd-card fd-advisor-card">
              <div className="fd-advisor-top">
                <span className="adv-icon">💡</span>
                <span className="adv-title">{lang === 'gu' ? 'કિસાન સલાહકાર ટીપ (ADVISOR)' : 'Agri Advisor Tip'}</span>
              </div>
              <p className="fd-advisor-body">
                {lang === 'gu'
                  ? 'કપાસના વેચાણ અંગે: જીનિંગ મિલો તરફથી સારી ગુણવત્તાવાળા શંકર-૬ કપાસની માગમાં વધારો થયો છે. તમારી પાસે હાલ ₹૧,૭૨૦ ની ઓફર છે, જે સરેરાશ મંડી ભાવથી ૨.૩% વધુ છે.'
                  : 'Cotton Market Advice: Demand for high staple Shankar-6 cotton from spinning mills is strong. Your current offer of ₹1,720 is 2.3% above the local mandi average.'}
              </p>
              <a href="tel:1800543388" className="fd-advisor-cta">
                📞 {lang === 'gu' ? 'કૃષિ નિષ્ણાત સાથે વાત કરો (Toll-Free)' : 'Talk to Agri Specialist (Toll-Free)'}
              </a>
            </div>

          </div>

        </div>

        {/* 4. Bottom Full-Width Section: Recent Deals & Inquiries (3 Pending) */}
        <div className="fd-card fd-deals-card">
          <div className="fd-deals-header">
            <div className="fd-dh-left">
              <span className="fd-dh-icon">🤝</span>
              <div>
                <div className="fd-dh-title-row">
                  <h2 className="fd-dh-title">{lang === 'gu' ? 'તાજેતરની વેપારી પૂછપરછ અને ડીલ્સ (Recent Deals & Inquiries)' : 'Recent Trader Inquiries & Deals'}</h2>
                  <span className="fd-dh-badge orange">{lang === 'gu' ? '૩ નિર્ણયાધીન' : '3 Decisions Pending'}</span>
                </div>
                <p className="fd-dh-sub">
                  {lang === 'gu'
                    ? 'ચકાસાયેલ જીનર્સ અને વેપારીઓ તરફથી મળેલી નવી ઓફર્સ પર તાત્કાલિક સ્વીકાર, કાઉન્ટર અથવા ચેટ કરો.'
                    : 'Instant accept, counter or chat on fresh offers from verified APMC millers and traders.'}
                </p>
              </div>
            </div>

            <div className="fd-dh-rule-notice">
              ⏱️ {lang === 'gu' ? 'નિયમ: સ્વીકાર પછી ૨૪ કલાકમાં વજન અને ડિલિવરી પેકિંગ' : 'Rule: Weighment & vehicle pickup within 24 hours of accept'}
            </div>
          </div>

          {/* 3 Deals Cards Grid */}
          <div className="fd-deals-grid">
            {deals.map((deal) => (
              <div key={deal.id} className={`fd-deal-box ${deal.status === 'accepted' ? 'accepted' : ''}`}>
                <div className="deal-box-header">
                  <div className="deal-trader-meta">
                    <span className="trader-avatar-tag">{deal.tag}</span>
                    <div>
                      <strong className="trader-name">
                        {lang === 'gu' ? deal.traderGu : deal.traderEn}{' '}
                        <span className="v-tick">✓</span>
                      </strong>
                      <span className="trader-addr">{deal.addressGu}</span>
                    </div>
                  </div>
                  <span className="deal-time">{lang === 'gu' ? deal.timeGu : deal.timeEn}</span>
                </div>

                <div className="deal-metrics-block">
                  <div className="dm-row">
                    <span className="dm-label">{lang === 'gu' ? 'લક્ષિત પાક:' : 'Target Crop:'}</span>
                    <strong className="dm-val">{lang === 'gu' ? deal.cropGu : deal.cropEn}</strong>
                  </div>
                  <div className="dm-row">
                    <span className="dm-label">{lang === 'gu' ? 'વેપારીની ઓફર:' : 'Trader Offer:'}</span>
                    <strong className="dm-val text-green-bold">{deal.offerRate}</strong>
                  </div>
                  <div className="dm-row">
                    <span className="dm-label">{lang === 'gu' ? 'કુલ રકમ:' : 'Total Amount:'}</span>
                    <strong className="dm-val">{deal.totalVal}</strong>
                  </div>
                  {deal.targetRate && (
                    <div className="dm-row target-row">
                      <span className="dm-label">{deal.targetRate}</span>
                    </div>
                  )}
                </div>

                <div className="deal-msg-box">
                  <span className="quote-sym">💬</span>
                  <p className="deal-msg-text">"{lang === 'gu' ? deal.messageGu : deal.messageEn}"</p>
                </div>

                <div className="deal-actions-row">
                  {deal.status === 'accepted' ? (
                    <div className="deal-accepted-pill">
                      ✓ {lang === 'gu' ? 'ડીલ સ્વીકારાઈ • કોન્ટ્રાક્ટ સક્રિય' : 'Deal Accepted • In Progress'}
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="deal-btn-accept"
                        onClick={() => handleAcceptDeal(deal.id, deal.traderGu)}
                      >
                        ✓ {lang === 'gu' ? 'સ્વીકારો (Accept)' : 'Accept Deal'}
                      </button>
                      <button
                        type="button"
                        className="deal-btn-counter"
                        onClick={() => handleCounterDeal(deal.id)}
                      >
                        ⇄ {lang === 'gu' ? 'કાઉન્ટર' : 'Counter'}
                      </button>
                      <button
                        type="button"
                        className="deal-btn-chat"
                        onClick={() => navigate('/farmer/messages')}
                        title="Chat"
                      >
                        💬
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Security Footer */}
          <div className="fd-deals-footer">
            <span className="df-secure-text">
              🛡️ {lang === 'gu' ? 'તમામ વ્યવહાર ગુજરાત APMC કાયદા હેઠળ સુરક્ષિત છે. મધ્યસ્થી વિના સીધા ખેડૂત ખાતામાં નાણાં જમા.' : 'All transactions protected under Gujarat APMC Mandi regulations with direct bank escrow.'}
            </span>
            <Link to="/farmer/messages" className="df-all-deals-link">
              {lang === 'gu' ? 'બધી જૂની ડીલ્સ જુઓ →' : 'View All Deals & Messages →'}
            </Link>
          </div>
        </div>

      </div>

      {/* Offer Modal Drawer if opened */}
      {selectedOfferCrop && (
        <div className="fd-modal-overlay" onClick={() => setSelectedOfferCrop(null)}>
          <div className="fd-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="fd-mc-header">
              <h3>{lang === 'gu' ? `${selectedOfferCrop.nameGu} - મળેલી ઑફર્સ` : `Offers for ${selectedOfferCrop.nameEn}`}</h3>
              <button type="button" className="fd-mc-close" onClick={() => setSelectedOfferCrop(null)}>✕</button>
            </div>
            <div className="fd-mc-body">
              <p>{lang === 'gu' ? `આ પાક માટે હાલમાં ${selectedOfferCrop.offersCount} વેપારીઓએ બોલી લગાવી છે.` : `${selectedOfferCrop.offersCount} buyers have placed offers on this crop.`}</p>
              <div className="fd-modal-offer-item">
                <div>
                  <strong>શ્રીજી જીનિંગ ઇન્ડસ્ટ્રીઝ (રાજકોટ)</strong>
                  <div>બોલી: ₹૧,૭૨૦/મણ • RTGS પેમેન્ટ</div>
                </div>
                <button
                  type="button"
                  className="deal-btn-accept"
                  onClick={() => { setSelectedOfferCrop(null); navigate('/farmer/messages'); }}
                >
                  {lang === 'gu' ? 'ડીલ રૂમમાં જુઓ' : 'Open Deal Room'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FarmerDashboard;
