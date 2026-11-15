import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './TraderProfilePage.css';

const TraderProfilePage = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();

  // Direct Deal Form
  const [selectedCrop, setSelectedCrop] = useState('cotton');
  const [dealQty, setDealQty] = useState('');
  const [villageTaluka, setVillageTaluka] = useState('નવાગઢ, જેતપુર (Navagadh, Jetpur)');
  const [mobileNum, setMobileNum] = useState('+91 98254 78210');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitDeal = (e) => {
    e.preventDefault();
    if (!dealQty) {
      toast.error(lang === 'gu' ? 'કૃપા કરીને જથ્થો દાખલ કરો' : 'Please enter quantity');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(lang === 'gu' ? 'ડીલ પ્રપોઝલ વેપારીને મોકલવામાં આવી! ડીલ રૂમમાં ચેટ શરૂ થઈ. 🎉' : 'Deal proposal sent! Deal Room opened.');
      navigate('/farmer/messages');
    }, 800);
  };

  return (
    <div className="trader-profile-page">
      <div className="tp-container">

        {/* Top Breadcrumb & Portal Zone */}
        <div className="tp-top-nav-bar">
          <Link to="/farmer/traders" className="tp-back-link">
            ← {lang === 'gu' ? 'વેપારીઓની યાદી પર પાછા જાઓ (Back to Traders Directory)' : 'Back to Traders Directory'}
          </Link>
          <span className="tp-zone-pill">
            {lang === 'gu' ? 'પોર્ટલ: ખેડૂત સેન્ટ્રલ / રાજકોટ ઝોન / ગોંડલ યાર્ડ માન્ય વેપારી' : 'Portal: Farmer Central / Rajkot Zone / Gondal APMC Approved'}
          </span>
        </div>

        {/* Trader Main Profile Header Card */}
        <div className="tp-header-card">
          <div className="tp-hc-top-row">
            
            <div className="tp-hc-identity">
              <div className="tp-factory-avatar">
                <span className="fa-icon">🏭</span>
                <span className="fa-online-dot"></span>
              </div>

              <div className="tp-hc-titles">
                <h1 className="tp-trader-name">
                  {lang === 'gu' ? 'શ્રી જીનિંગ એન્ડ પ્રોસેસિંગ ઇન્ડસ્ટ્રીઝ' : 'Shree Ginning & Processing Industries'}
                </h1>
                <span className="tp-trader-sub">Shree Ginning Industries, Gondal</span>

                <div className="tp-owner-strip">
                  <span>👤 {lang === 'gu' ? 'પ્રોપરાઈટર: હસમુખભાઈ ચુનીલાલ પટેલ' : 'Proprietor: Hasmukhbhai Chunilal Patel'}</span>
                  <span className="tp-dot-sep">•</span>
                  <span className="tp-online-status">🟢 {lang === 'gu' ? 'સક્રિયતા: છેલ્લા ૫ મિનિટમાં ઓનલાઇન' : 'Active: Online 5 min ago'}</span>
                </div>

                <div className="tp-cert-badges-row">
                  <span className="cert-badge govt">
                    🛡️ {lang === 'gu' ? 'ગુજરાત સરકાર APMC માન્ય લાઇસન્સ ધારક (#RJT-421)' : 'Gujarat Govt APMC License Holder (#RJT-421)'}
                  </span>
                  <span className="cert-badge protect">
                    🌾 {lang === 'gu' ? '૭/૧૨ કિસાન રક્ષિત વેપારી (7/12 Protected)' : '7/12 Farmer Protected Buyer'}
                  </span>
                </div>

                <div className="tp-rating-line">
                  <span className="stars-val">૪.૯ ★★★★★</span>
                  <span className="review-count">({lang === 'gu' ? '૧૪૨ ખેડૂત સમીક્ષાઓ / 142 Verified Reviews' : '142 Verified Farmer Reviews'})</span>
                </div>
              </div>
            </div>

            {/* Top Right Direct CTA Buttons */}
            <div className="tp-hc-actions">
              <a href="tel:9825411223" className="tp-btn-direct-call">
                📞 {lang === 'gu' ? 'સીધો ફોન કરો: +91 98254 XXXXX' : 'Direct Call: +91 98254 XXXXX'}
              </a>
              <button
                type="button"
                className="tp-btn-send-deal"
                onClick={() => navigate('/farmer/messages')}
              >
                💬 {lang === 'gu' ? 'ડીલ પ્રપોઝલ મોકલો / ચેટ કરો (Send Deal)' : 'Send Deal Proposal / Chat'}
              </button>
            </div>

          </div>

          {/* 4 Stats Metrics Row */}
          <div className="tp-stats-metrics-grid">
            <div className="tp-metric-box">
              <span className="m-icon green">🤝</span>
              <div className="m-text">
                <strong className="m-num">૧૪૨</strong>
                <span className="m-lbl">{lang === 'gu' ? 'સફળ સોદા (Completed Deals)' : 'Completed Deals'}</span>
              </div>
            </div>

            <div className="tp-metric-box">
              <span className="m-icon blue">📦</span>
              <div className="m-text">
                <strong className="m-num">૨૪,૫૦૦+</strong>
                <span className="m-lbl">{lang === 'gu' ? 'કુલ જથ્થો (Quintals Procured)' : 'Quintals Procured'}</span>
              </div>
            </div>

            <div className="tp-metric-box">
              <span className="m-icon purple">⏱️</span>
              <div className="m-text">
                <strong className="m-num">૯૯.૮%</strong>
                <span className="m-lbl">{lang === 'gu' ? 'સમયસર પેમેન્ટ રેકોર્ડ (On-time)' : 'On-time Payment Record'}</span>
              </div>
            </div>

            <div className="tp-metric-box">
              <span className="m-icon orange">⚡</span>
              <div className="m-text">
                <strong className="m-num">૪ કલાકમાં</strong>
                <span className="m-lbl">{lang === 'gu' ? 'સરેરાશ NEFT ક્રેડિટ (Avg. Payout)' : 'Average NEFT Payout'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Grid Layout: Details (Left 65%) + Forms (Right 35%) */}
        <div className="tp-content-grid">
          
          {/* LEFT COLUMN: Locations, Commodities, Reviews */}
          <div className="tp-col-main">

            {/* Section 1: Locations & Yard Facilities */}
            <div className="tp-card">
              <div className="tp-card-header">
                <div className="ch-left">
                  <span className="ch-icon">📍</span>
                  <h2 className="ch-title">{lang === 'gu' ? 'વેપારના સ્થળો અને યાર્ડ ફેસિલિટી' : 'Trading Locations & Yard Facilities'}</h2>
                </div>
                <span className="tp-sector-tag">Gondal APMC Sector 8</span>
              </div>

              <div className="tp-card-body">
                {/* Office Address Banner */}
                <div className="tp-office-address-banner">
                  <span className="oa-icon">🏢</span>
                  <div className="oa-info">
                    <strong>{lang === 'gu' ? 'મુખ્ય પ્રોસેસિંગ એકમ અને ઓફિસ (Head Office & Yard):' : 'Main Processing Unit & Yard:'}</strong>
                    <p className="oa-text">
                      {lang === 'gu'
                        ? 'ગોંડલ માર્કેટ યાર્ડ સામે, જેતપુર રોડ, ગોંડલ (રાજકોટ જિલ્લો, ગુજરાત - ૩૬૦૩૧૧)'
                        : 'Opp. Gondal Market Yard, Jetpur Road, Gondal (Rajkot District, Gujarat - 360311)'}
                    </p>
                    <span className="oa-landmark">{lang === 'gu' ? 'લેન્ડમાર્ક: નેશનલ હાઇવે ૨૭, માખણ જીનિંગ ઝોન ગેટ નં. ૪' : 'Landmark: National Highway 27, Makhan Ginning Zone Gate #4'}</span>
                  </div>
                  <button type="button" className="oa-btn-map" onClick={() => toast.success('Opening Google Maps...')}>
                    🗺️ {lang === 'gu' ? 'મેપ પર જુઓ (Google Map)' : 'View Map'}
                  </button>
                </div>

                {/* 3 Yard Facilities Tiles */}
                <div className="tp-facilities-grid">
                  <div className="tp-fac-tile">
                    <span className="fac-icon">⚖️</span>
                    <strong className="fac-title">{lang === 'gu' ? '૫૦ ટન ડિજિટલ વજન કાંટો' : '50-Ton Digital Weighbridge'}</strong>
                    <span className="fac-sub">Computerized Weighbridge</span>
                    <p className="fac-desc">
                      {lang === 'gu'
                        ? 'ગવર્નમેન્ટ સીલ મારેલો કમ્પ્યુટરાઇઝ્ડ કાંટો. વાહન સાથે અને ખાલી વજનની તુરંત પ્રિન્ટેડ પાવતી ઉપલબ્ધ.'
                        : 'Govt sealed electronic weighbridge. Instant gross and tare printed receipt.'}
                    </p>
                    <span className="fac-tag">✓ {lang === 'gu' ? '૧૦૦% સચોટ માપણી ગેરંટી' : '100% Accurate Guarantee'}</span>
                  </div>

                  <div className="tp-fac-tile">
                    <span className="fac-icon">🧪</span>
                    <strong className="fac-title">{lang === 'gu' ? 'ભેજ માપક લેબ' : 'Instant Moisture Lab'}</strong>
                    <span className="fac-sub">Instant Moisture Testing</span>
                    <p className="fac-desc">
                      {lang === 'gu'
                        ? 'ખેડૂતની હાજરીમાં કપાસ તથા મગફળીનું ૨ મિનિટમાં ડિજિટલ મોઇશ્ચર ટેસ્ટિંગ, જેથી યોગ્ય ભાવ મળી શકે.'
                        : 'On-the-spot moisture test in 2 minutes in presence of farmer for transparent pricing.'}
                    </p>
                    <span className="fac-tag">✓ {lang === 'gu' ? 'પારદર્શક ગુણવત્તા ટેસ્ટ' : 'Transparent Lab Report'}</span>
                  </div>

                  <div className="tp-fac-tile">
                    <span className="fac-icon">🛋️</span>
                    <strong className="fac-title">{lang === 'gu' ? 'ખેડૂત વિશ્રામ ભવન' : 'Farmer AC Lounge'}</strong>
                    <span className="fac-sub">Farmer Lounge with AC</span>
                    <p className="fac-desc">
                      {lang === 'gu'
                        ? 'ખેડૂત મિત્રો અને ડ્રાઇવરો માટે એર-કંડિશન વિશ્રામ કક્ષ, ઠંડુ આર.ઓ. ફિલ્ટર પાણી તથા ચા-નાસ્તાની સુવિધા.'
                        : 'Air-conditioned lounge for farmers, pure RO water and refreshment facilities.'}
                    </p>
                    <span className="fac-tag">✓ {lang === 'gu' ? 'વિનામૂલ્યે ૨૪ કલાક ખુલ્લું' : 'Complimentary 24x7'}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Section 2: Currently Buying Commodities */}
            <div className="tp-card">
              <div className="tp-card-header">
                <div className="ch-left">
                  <span className="ch-icon">🌾</span>
                  <h2 className="ch-title">{lang === 'gu' ? 'ખરીદી પ્રાથમિકતાઓ (Currently Buying Commodities)' : 'Currently Buying Commodities'}</h2>
                </div>
                <span className="tp-live-buying-pill">● {lang === 'gu' ? 'યાર્ડ ઓપન - સીધી ખરીદી ચાલુ' : 'Yard Open - Active Buying'}</span>
              </div>

              <div className="tp-card-body">
                <div className="tp-commodities-list">
                  
                  {/* Crop 1: Cotton */}
                  <div className="tp-comm-card">
                    <div className="comm-left">
                      <div className="comm-icon-box">☁️</div>
                      <div className="comm-info">
                        <div className="comm-title-row">
                          <h3 className="comm-name">{lang === 'gu' ? 'શંકર-૬ કપાસ' : 'Shankar-6 Raw Cotton'}</h3>
                          <span className="comm-sub-txt">(Shankar-6 Raw Cotton)</span>
                          <span className="comm-grade-tag">Grade A & B</span>
                        </div>
                        <div className="comm-specs-row">
                          <span>{lang === 'gu' ? 'રોજિંદી ક્ષમતા: ૫૦૦ ક્વિન્ટલ (Daily Cap)' : 'Daily Cap: 500 Quintals'}</span>
                          <span className="comm-dot">•</span>
                          <span>{lang === 'gu' ? 'ભેજ મર્યાદા: મહત્તમ ૮-૧૦%' : 'Moisture Limit: Max 8-10%'}</span>
                        </div>
                        <div className="comm-payment-hint">
                          ✓ {lang === 'gu' ? 'ચૂકવણી: તાત્કાલિક RTGS' : 'Payment: Instant RTGS'}
                        </div>
                      </div>
                    </div>

                    <div className="comm-right">
                      <span className="comm-price-label">{lang === 'gu' ? 'આજનો ખરીદ ભાવ' : 'Today\'s Buying Rate'}</span>
                      <strong className="comm-price-val">₹૧,૬૮૦ - ₹૧,૭૮૫ <span className="mound-txt">/ મણ</span></strong>
                      <button
                        type="button"
                        className="btn-offer-commodity"
                        onClick={() => { setSelectedCrop('cotton'); toast.success('શંકર કપાસ પસંદ થયો. નીચે ફોર્મ ભરો.'); }}
                      >
                        {lang === 'gu' ? 'કપાસ સોદો ઓફર કરો' : 'Offer This Crop'}
                      </button>
                    </div>
                  </div>

                  {/* Crop 2: Groundnut */}
                  <div className="tp-comm-card">
                    <div className="comm-left">
                      <div className="comm-icon-box">🥜</div>
                      <div className="comm-info">
                        <div className="comm-title-row">
                          <h3 className="comm-name">{lang === 'gu' ? 'મગફળી ૨૦ નંબર' : 'Groundnut No. 20 Bold'}</h3>
                          <span className="comm-sub-txt">(Groundnut No. 20 Bold)</span>
                          <span className="comm-grade-tag">Grade A માન્ય</span>
                        </div>
                        <div className="comm-specs-row">
                          <span>{lang === 'gu' ? 'રોજિંદી ક્ષમતા: ૨૫૦ ક્વિન્ટલ (Daily Cap)' : 'Daily Cap: 250 Quintals'}</span>
                          <span className="comm-dot">•</span>
                          <span>{lang === 'gu' ? 'તેલ ટકાવારી: ૪૮%+' : 'Oil Recovery: 48%+'}</span>
                        </div>
                        <div className="comm-payment-hint">
                          ✓ {lang === 'gu' ? 'ચૂકવણી: ૨ કલાકમાં ખાતામાં' : 'Payment: Within 2 hours to account'}
                        </div>
                      </div>
                    </div>

                    <div className="comm-right">
                      <span className="comm-price-label">{lang === 'gu' ? 'આજનો ખરીદ ભાવ' : 'Today\'s Buying Rate'}</span>
                      <strong className="comm-price-val">₹૧,૩૫૦ - ₹૧,૪૮૦ <span className="mound-txt">/ મણ</span></strong>
                      <button
                        type="button"
                        className="btn-offer-commodity"
                        onClick={() => { setSelectedCrop('groundnut'); toast.success('મગફળી પસંદ થઈ. નીચે ફોર્મ ભરો.'); }}
                      >
                        {lang === 'gu' ? 'મગફળી સોદો ઓફર કરો' : 'Offer This Crop'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Section 3: Farmer Reviews & Ratings */}
            <div className="tp-card">
              <div className="tp-card-header">
                <div className="ch-left">
                  <span className="ch-icon">💬</span>
                  <h2 className="ch-title">{lang === 'gu' ? 'ખેડૂતોના અનુભવો અને રેટિંગ્સ (Farmer Reviews & Feedback)' : 'Farmer Reviews & Feedback'}</h2>
                </div>
                <button type="button" className="btn-all-reviews" onClick={() => toast.success('બધી ૧૪૨ સમીક્ષા લોડ થઈ')}>
                  {lang === 'gu' ? 'બધી ૧૪૨ સમીક્ષા જુઓ →' : 'View all 142 reviews →'}
                </button>
              </div>

              <div className="tp-card-body">
                <div className="tp-reviews-list">
                  
                  {/* Review 1 */}
                  <div className="tp-review-item">
                    <div className="ri-avatar rp">RP</div>
                    <div className="ri-content">
                      <div className="ri-head">
                        <div>
                          <strong className="ri-name">રમેશભાઈ પટેલ</strong>
                          <span className="ri-loc"> (જેતપુર, રાજકોટ)</span>
                          <span className="ri-sold-tag">🛡️ ૭/૧૨ વેરિફાઈડ ખેડૂત • ૧૫૦ ક્વિન્ટલ કપાસ સોદો પૂર્ણ</span>
                        </div>
                        <span className="ri-stars">★★★★★ ૫/૫</span>
                      </div>
                      <p className="ri-comment">
                        "ખૂબ સારો વ્યવહાર. વજન કાંટો એકદમ સાચો અને ખાતામાં ૨ કલાકમાં પૈસા જમા થયા. ગોંડલ યાર્ડમાં વર્ષોથી આ જીનિંગ સાથે કામ કરીએ છીએ, ક્યારેય કપાત કે વિવાદ થયો નથી."
                      </p>
                      <span className="ri-date">સોદા તારીખ: ૧૨ જાન્યુઆરી ૨૦૨૫</span>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="tp-review-item">
                    <div className="ri-avatar kc">KC</div>
                    <div className="ri-content">
                      <div className="ri-head">
                        <div>
                          <strong className="ri-name">કાનજીભાઈ ચૌધરી</strong>
                          <span className="ri-loc"> (ગોંડલ તાલુકો)</span>
                          <span className="ri-sold-tag">🛡️ ૭/૧૨ વેરિફાઈડ ખેડૂત • ૮૫ ક્વિન્ટલ મગફળી સોદો પૂર્ણ</span>
                        </div>
                        <span className="ri-stars">★★★★★ ૫/૫</span>
                      </div>
                      <p className="ri-comment">
                        "કપાસનો સારો ભાવ આપ્યો અને કાપણી વગર સીધો ઉપાડ કર્યો. ખેડૂતો માટે બેસવાની વ્યવસ્થા પણ ખૂબ ઉત્તમ છે. વેપારી શ્રી હસમુખભાઈ ખુદ હાજર રહીને તોલ કરાવે છે."
                      </p>
                      <span className="ri-date">સોદા તારીખ: ૦૮ જાન્યુઆરી ૨૦૨૫</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Escrow Guarantee, Direct Deal Form, Yard Schedule */}
          <div className="tp-col-side">

            {/* Escrow Guarantee Card */}
            <div className="tp-card tp-escrow-card">
              <div className="tp-escrow-head">
                <span className="esc-shield-icon">🛡️</span>
                <div>
                  <h3 className="esc-title">{lang === 'gu' ? 'પેમેન્ટ સુરક્ષા ગેરેંટી' : 'Payment Escrow Guarantee'}</h3>
                  <span className="esc-sub">Escrow & Mandi Bank Guarantee</span>
                </div>
                <span className="esc-gov-tag">GOVT BACKED APMC</span>
              </div>

              <div className="tp-escrow-body">
                <div className="esc-point">
                  <span className="ep-tick">✓</span>
                  <div>
                    <strong>{lang === 'gu' ? 'APMC કિસાન કાનૂની રક્ષણ:' : 'APMC Mandi Legal Protection:'}</strong>{' '}
                    <span>{lang === 'gu' ? 'તમામ વેપાર ગુજરાત ખેત ઉત્પન્ન બજાર ધારા અંતર્ગત સુરક્ષિત છે.' : 'Fully protected under Gujarat APMC Act.'}</span>
                  </div>
                </div>

                <div className="esc-point">
                  <span className="ep-tick">✓</span>
                  <div>
                    <strong>{lang === 'gu' ? 'કિસાનબજાર એસ્ક્રો બેંક:' : 'Escrow Protection:'}</strong>{' '}
                    <span>{lang === 'gu' ? 'માલ તોલ થાય ત્યાં સુધી વેપારીની બેંક ડિપોઝીટ APMC ખાતામાં સુરક્ષિત રહે છે.' : 'Funds locked in escrow until weighment.'}</span>
                  </div>
                </div>

                <div className="esc-point">
                  <span className="ep-tick">✓</span>
                  <div>
                    <strong>{lang === 'gu' ? 'ડિજિટલ જીએસટી અને તોલ પાવતી:' : 'Digital Receipt:'}</strong>{' '}
                    <span>{lang === 'gu' ? 'વજન કાંટાનો પહોંચ સીધો તમારા મોબાઇલ નંબર પર એસએમએસ/વોટ્સએપ દ્વારા મળે છે.' : 'Instant weighment slip sent on WhatsApp.'}</span>
                  </div>
                </div>

                <div className="esc-cert-box">
                  <span className="ecb-check">🛡️</span>
                  <div>
                    <strong>KisanBazaar સુરક્ષા બેજ સાથે પ્રમાણિત</strong>
                    <span className="ecb-sub">લાઇસન્સ નંબર: APMC/GND/COTTON/2021/421</span>
                  </div>
                </div>

                <div className="esc-help-row">
                  <span>📞 {lang === 'gu' ? 'વિવાદ નિવારણ હેલ્પલાઇન: 1800-543-388' : 'Dispute Helpline: 1800-543-388'}</span>
                </div>
              </div>
            </div>

            {/* Farmer Direct Deal Proposal Form Card */}
            <div className="tp-card tp-deal-form-card">
              <div className="tp-deal-form-header">
                <h3 className="df-title">{lang === 'gu' ? 'ખેડૂત સીધો સોદો ફોર્મ' : 'Farmer Direct Deal Form'}</h3>
                <p className="df-sub">
                  {lang === 'gu'
                    ? 'વેપારી શ્રી હસમુખભાઈને સીધો તમારો પાક અને જથ્થો ઓફર કરો. ૨ કલાકમાં કોલ બેક મળશે.'
                    : 'Submit your crop proposal directly. Ginner will call back within 2 hours.'}
                </p>
              </div>

              <form onSubmit={handleSubmitDeal} className="tp-deal-form-body">
                <div className="df-group">
                  <label>{lang === 'gu' ? 'પાક પસંદ કરો (Select Crop) *' : 'Select Crop *'}</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="df-select"
                  >
                    <option value="cotton">{lang === 'gu' ? 'શંકર-૬ કપાસ (Cotton)' : 'Shankar-6 Cotton'}</option>
                    <option value="groundnut">{lang === 'gu' ? 'મગફળી ૨૦ નંબર (Groundnut)' : 'Groundnut #20'}</option>
                    <option value="cumin">{lang === 'gu' ? 'જીરૂ (Cumin)' : 'Cumin Seeds'}</option>
                  </select>
                </div>

                <div className="df-group">
                  <label>{lang === 'gu' ? 'અંદાજિત જથ્થો (Quantity in Quintals) *' : 'Quantity in Quintals *'}</label>
                  <input
                    type="number"
                    placeholder={lang === 'gu' ? 'દા.ત. ૫૦ ક્વિન્ટલ' : 'e.g. 50 Qtl'}
                    value={dealQty}
                    onChange={(e) => setDealQty(e.target.value)}
                    className="df-input"
                    required
                  />
                </div>

                <div className="df-group">
                  <label>{lang === 'gu' ? 'તમારું ગામ અને તાલુકો (Village / Taluka) *' : 'Village / Taluka *'}</label>
                  <input
                    type="text"
                    value={villageTaluka}
                    onChange={(e) => setVillageTaluka(e.target.value)}
                    className="df-input"
                    required
                  />
                </div>

                <div className="df-group">
                  <label>{lang === 'gu' ? 'મોબાઇલ નંબર (Mobile Number) *' : 'Mobile Number *'}</label>
                  <input
                    type="text"
                    value={mobileNum}
                    onChange={(e) => setMobileNum(e.target.value)}
                    className="df-input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="df-btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? (lang === 'gu' ? 'મોકલાઈ રહ્યું છે...' : 'Submitting...')
                    : (lang === 'gu' ? '▶ ડીલ પ્રપોઝલ સબમિટ કરો (Submit Deal)' : '▶ Submit Deal Proposal')}
                </button>
              </form>
            </div>

            {/* Yard Operating Hours Card */}
            <div className="tp-card tp-yard-hours-card">
              <div className="yh-head">
                <span className="yh-clock">⏱️</span>
                <strong className="yh-title">{lang === 'gu' ? 'યાર્ડ આવક અને વજન સમયપત્રક' : 'Yard Arrivals & Weighing Schedule'}</strong>
              </div>
              <div className="yh-body">
                <div className="yh-row">
                  <span>{lang === 'gu' ? 'સોમવાર થી શનિવાર:' : 'Mon to Sat:'}</span>
                  <strong>{lang === 'gu' ? 'સવારે ૮:૦૦ થી સાંજે ૭:૦૦' : '8:00 AM to 7:00 PM'}</strong>
                </div>
                <div className="yh-row">
                  <span>{lang === 'gu' ? 'ડિજિટલ કાંટો તોલ:' : 'Digital Scale:'}</span>
                  <strong className="text-green-bold">{lang === 'gu' ? 'સતત ચાલુ (No Lunch Break)' : 'Continuous (No Break)'}</strong>
                </div>
                <div className="yh-row">
                  <span>{lang === 'gu' ? 'રવિવાર રજા:' : 'Sunday:'}</span>
                  <span className="yh-sub">{lang === 'gu' ? 'ફક્ત પૂર્વ-નોંધણી પ્રવેશ' : 'Prior booking only'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TraderProfilePage;
