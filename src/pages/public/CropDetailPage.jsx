import { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './CropDetailPage.css';

const CropDetailPage = () => {
  const { id } = useParams();
  const { lang } = useLanguage();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [modalMobile, setModalMobile] = useState('');
  const [modalOtpSent, setModalOtpSent] = useState(false);
  const [modalOtp, setModalOtp] = useState(['', '', '', '', '', '']);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Calculator State
  const [volumeQtl, setVolumeQtl] = useState(350);
  const ratePerMan = 1710; // 20kg
  const ratePerQtl = ratePerMan * 5; // 8550

  // Offer State
  const [offerPrice, setOfferPrice] = useState(1710);
  const [deliveryDate, setDeliveryDate] = useState('2025-03-20');
  const [deliveryTerm, setDeliveryTerm] = useState('farm-gate');

  // Calculations
  const baseCost = useMemo(() => volumeQtl * ratePerQtl, [volumeQtl, ratePerQtl]);
  const truckFreight = 12500;
  const mandiWeighing = 5250;
  const escrowFee = Math.round(baseCost * 0.0015);
  const totalLandedCost = baseCost + truckFreight + mandiWeighing + escrowFee;
  const costPerMan = Math.round(totalLandedCost / (volumeQtl * 5));

  const photos = [
    {
      labelGu: '૧. કપાસનો ઢગલો (Raw Cotton Heap) • 1080p HD',
      labelEn: '1. Raw Cotton Heap • 1080p HD',
      src: '/crops/cotton.jpg',
    },
    {
      labelGu: '૨. ફાઈબર ક્લોઝ-અપ (Fiber Microscopic)',
      labelEn: '2. Fiber Close-up (Microscopic View)',
      src: '/crops/cotton.jpg',
    },
    {
      labelGu: '૩. વજન કાંટો (Weigh Scale & Verification)',
      labelEn: '3. Digital Weigh Scale & Verification',
      src: '/crops/cotton.jpg',
    },
    {
      labelGu: '૪. લેબ ટેસ્ટ પરિણામ (Lab Report)',
      labelEn: '4. Lab Quality Certificate',
      src: '/crops/cotton.jpg',
    },
  ];

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    toast.success(
      lang === 'gu'
        ? `₹${offerPrice}/મણ નો ભાવ પ્રસ્તાવ ખેડૂતને મોકલાઈ ગયો છે!`
        : `Formal offer of ₹${offerPrice}/20kg sent to farmer!`
    );
  };

  const handleOpenContact = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      toast.success(
        lang === 'gu'
          ? 'ખેડૂતનો મોબાઇલ નંબર: +91 98251 44520'
          : 'Farmer Contact Number: +91 98251 44520'
      );
    }
  };

  const handleModalSendOtp = () => {
    if (modalMobile.length !== 10) {
      toast.error(
        lang === 'gu'
          ? 'કૃપા કરીને ૧૦ અંકનો સાચો મોબાઇલ નંબર દાખલ કરો'
          : 'Please enter a valid 10-digit mobile number'
      );
      return;
    }
    setModalOtpSent(true);
    toast.success(
      lang === 'gu' ? 'OTP તમારા નંબર પર મોકલાઈ ગયો છે' : 'OTP sent successfully to your mobile'
    );
  };

  const handleModalVerifyOtp = () => {
    const mockToken = 'mock_jwt_token_123';
    const mockUser = { _id: 'u1', name: 'પરેશભાઈ પટેલ', mobile: modalMobile, role: 'trader' };
    login(mockToken, mockUser);
    setShowLoginModal(false);
    toast.success(lang === 'gu' ? 'સફળતાપૂર્વક લૉગિન થયું! 🎉' : 'Logged in successfully! 🎉');
  };

  const handleShareWhatsApp = () => {
    const url = window.location.href;
    const text = encodeURIComponent(
      lang === 'gu'
        ? `કિસાન બજાર પર જુઓ: સૌરાષ્ટ્ર શંકર કપાસ (૩૫૦ ક્વિન્ટલ) ભાવ ₹૧,૭૧૦/મણ: ${url}`
        : `View on KisanBazaar: Shankar-6 Cotton (350 Quintal) at ₹1,710/20kg: ${url}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="crop-detail-wrapper">
      
      {/* 1. Subheader: Breadcrumbs & Verification */}
      <div className="cd-subheader">
        <div className="cd-subheader__inner">
          <div className="cd-breadcrumbs">
            <Link to="/" className="cd-bread-link">
              🏠 {lang === 'gu' ? 'મુખ્ય પેજ' : 'Home'}
            </Link>
            <span className="cd-sep">›</span>
            <Link to="/listings" className="cd-bread-link">
              {lang === 'gu' ? 'પાક બજાર' : 'Crop Marketplace'}
            </Link>
            <span className="cd-sep">›</span>
            <span className="cd-current">
              {lang === 'gu' ? 'સૌરાષ્ટ્ર શંકર કપાસ (#LOT-KB-9042)' : 'Shankar-6 Cotton (#LOT-KB-9042)'}
            </span>
          </div>

          <div className="cd-trust-tags">
            <span className="cd-trust-tag green">
              🛡️ {lang === 'gu' ? '૭/૧૨ ચકાસાયેલ ખેડૂત' : '7/12 Land Record Verified'}
            </span>
            <span className="cd-trust-tag orange">
              ⚡ {lang === 'gu' ? 'તાત્કાલિક લોડિંગ ઉપલબ્ધ' : 'Immediate Loading Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Content */}
      <div className="cd-container">
        
        {/* LEFT COLUMN: Gallery, Specs & Farmer Info */}
        <div className="cd-left-col">
          
          {/* Title Area */}
          <div className="cd-title-box">
            <div className="cd-title-row">
              <h1 className="cd-main-title">
                {lang === 'gu' ? 'સૌરાષ્ટ્ર શંકર કપાસ' : 'Shankar-6 Cotton (Long Staple)'}
              </h1>
              <span className="cd-grade-badge">
                {lang === 'gu' ? 'GRADE A (ઉત્તમ)' : 'GRADE A (Premium)'}
              </span>
            </div>
            <div className="cd-lot-id">
              {lang === 'gu'
                ? 'લોટ આઈડી: #LOT-KB-9042 • નમૂનો સંગ્રહ: ગોંડલ યાર્ડ માન્યતા'
                : 'Lot ID: #LOT-KB-9042 • Sample Inspection: Gondal Yard Certified'}
            </div>
          </div>

          {/* Photo Gallery Viewer */}
          <div className="cd-gallery">
            <div className="cd-gallery__main">
              <img
                src={photos[activePhotoIdx].src}
                alt="Crop"
                className="cd-gallery__img"
              />
              <div className="cd-gallery__label">
                {lang === 'gu' ? photos[activePhotoIdx].labelGu : photos[activePhotoIdx].labelEn}
              </div>
              <span className="cd-gallery__counter">
                {activePhotoIdx + 1}/{photos.length} {lang === 'gu' ? 'ફોટા ઉપલબ્ધ' : 'Photos Available'}
              </span>
            </div>

            <div className="cd-gallery__thumbs">
              {photos.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`cd-thumb-btn ${activePhotoIdx === idx ? 'active' : ''}`}
                  onClick={() => setActivePhotoIdx(idx)}
                >
                  <img src={p.src} alt="" />
                  <span className="thumb-idx">{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Technical Specifications (Quality & Lab Report) */}
          <div className="cd-card-section">
            <div className="cd-section-header">
              <div className="cd-section-title">
                🔬 {lang === 'gu' ? 'ટેકનિકલ સ્પષ્ટીકરણો (Quality & Lab Report)' : 'Quality & Lab Report'}
              </div>
              <button
                type="button"
                className="cd-download-btn"
                onClick={() => toast.success(lang === 'gu' ? 'લેબ રિપોર્ટ PDF ડાઉનલોડ શરૂ થઈ' : 'Lab report PDF downloaded')}
              >
                ⬇ {lang === 'gu' ? 'લેબ રિપોર્ટ PDF' : 'Download Lab PDF'}
              </button>
            </div>

            <div className="cd-specs-grid">
              <div className="cd-spec-tile">
                <span className="spec-tile-label">{lang === 'gu' ? 'ગ્રેડ રેટિંગ / Grade' : 'Grade Rating'}</span>
                <span className="spec-tile-val text-green">{lang === 'gu' ? 'Grade A પ્રીમિયમ' : 'Grade A Premium'}</span>
                <span className="spec-tile-sub">{lang === 'gu' ? 'સુપર વ્હાઇટ કલર' : 'Super White Fiber'}</span>
              </div>

              <div className="cd-spec-tile">
                <span className="spec-tile-label">{lang === 'gu' ? 'સ્ટેપલ લંબાઈ / Staple' : 'Staple Length'}</span>
                <span className="spec-tile-val">29.5 mm</span>
                <span className="spec-tile-sub">{lang === 'gu' ? 'સ્પિનિંગ માટે ઉત્તમ' : 'Ideal for High Count Spinning'}</span>
              </div>

              <div className="cd-spec-tile">
                <span className="spec-tile-label">{lang === 'gu' ? 'માઇક્રોનેયર / Micronaire' : 'Micronaire'}</span>
                <span className="spec-tile-val">3.8 MIC</span>
                <span className="spec-tile-sub">{lang === 'gu' ? 'પરફેક્ટ ફાઈબર પરિપક્વતા' : 'Perfect Maturity'}</span>
              </div>

              <div className="cd-spec-tile">
                <span className="spec-tile-label">{lang === 'gu' ? 'ભેજ / Moisture' : 'Moisture Content'}</span>
                <span className="spec-tile-val">7.2%</span>
                <span className="spec-tile-sub">{lang === 'gu' ? 'સ્ટાન્ડર્ડ (<8.5%) થી ઓછું' : 'Below Standard (<8.5%)'}</span>
              </div>

              <div className="cd-spec-tile">
                <span className="spec-tile-label">{lang === 'gu' ? 'કચરો / Trash Content' : 'Trash Content'}</span>
                <span className="spec-tile-val">&lt; 2.0%</span>
                <span className="spec-tile-sub">{lang === 'gu' ? 'નહિવત પાન-ડાખળી' : 'Minimal Foreign Matter'}</span>
              </div>

              <div className="cd-spec-tile">
                <span className="spec-tile-label">{lang === 'gu' ? 'તાકાત / Strength (GPT)' : 'Fiber Strength'}</span>
                <span className="spec-tile-val">29.2 g/tex</span>
                <span className="spec-tile-sub">{lang === 'gu' ? 'ઉચ્ચ ટેન્સાઈલ ક્ષમતા' : 'High Tensile Strength'}</span>
              </div>
            </div>

            <div className="cd-lab-verification-note">
              <span className="check-icon">✓</span>
              <span>
                <strong>{lang === 'gu' ? 'ગોંડલ APMC ટેસ્ટિંગ લેબ રિપોર્ટ જોડવામાં આવેલ:' : 'Gondal APMC Testing Lab Report Attached:'}</strong>{' '}
                {lang === 'gu'
                  ? 'નમૂનો તા. ૧૨ ફેબ્રુઆરી ૨૦૨૫ ના રોજ માન્ય APMC લેબોરેટરી નિરીક્ષક શ્રી મનોજભાઈ દ્વારા પ્રમાણિત કરાયેલ છે. ટેસ્ટ સ્લિપ સીરીયલ: #GND-LAB-2025-8841.'
                  : 'Certified sample tested by approved APMC Lab Quality Inspector Mr. Manojbhai on 12-Feb-2025. Certificate #GND-LAB-2025-8841.'}
              </span>
            </div>
          </div>

          {/* Farmer Info & Location */}
          <div className="cd-card-section">
            <div className="cd-section-header">
              <div className="cd-section-title">
                👨‍🌾 {lang === 'gu' ? 'ખેડૂત માહિતી અને લોકેશન (Farmer & Logistics)' : 'Farmer & Logistics Details'}
              </div>
              <span className="cd-verified-pill">
                ✓ {lang === 'gu' ? 'વેરિફાઇડ પ્રોફાઇલ' : 'Verified Profile'}
              </span>
            </div>

            <div className="cd-farmer-box">
              <div className="cd-farmer-avatar">{lang === 'gu' ? 'હપ' : 'HP'}</div>
              <div className="cd-farmer-details">
                <h3 className="farmer-name">
                  {lang === 'gu' ? 'હરસુખભાઈ પટેલ' : 'Harsukhbhai Patel'}
                </h3>
                <p className="farmer-badge-text">
                  ✓ {lang === 'gu' ? '7/12 અને 8-A જમીન વેરિફાઇડ ખેડૂત' : '7/12 & 8-A Land Record Verified Farmer'}
                </p>
                <div className="farmer-location-meta">
                  <div>
                    📍 {lang === 'gu' ? 'ગામ: નવાગઢ, તાલુકો: જેતપુર (રાજકોટ જિલ્લો)' : 'Village: Navagadh, Taluka: Jetpur (Rajkot District)'}
                  </div>
                  <div>
                    🚚 {lang === 'gu' ? 'ગોડાઉનથી હાઇવે અંતર: ૨.૫ કિમી (મોટા ૧૬-વ્હીલર ટ્રક આવી શકે તેવો પાકો રોડ)' : 'Highway Distance: 2.5 km (Paved asphalt road accessible for 16-wheeler trucks)'}
                  </div>
                  <div>
                    ⏱ {lang === 'gu' ? 'પ્લેટફોર્મ સાથે જોડાયેલ: છેલ્લા ૩ વર્ષથી (૪૯ સફળ સોદા)' : 'Member Since: 3 Years (49 Successful Deals)'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logistics Info */}
          <div className="cd-card-section">
            <div className="cd-section-title">
              🚚 {lang === 'gu' ? 'લોજિસ્ટિક્સ અને ખેતર પરિવહન સુવિધા (Logistics Info)' : 'Logistics & Farm Transport Facility'}
            </div>

            <div className="cd-logistics-grid">
              <div className="cd-logistic-card">
                <div className="log-icon">🚜</div>
                <div>
                  <strong>{lang === 'gu' ? 'લોડિંગ સુવિધા ઉપલબ્ધ' : 'Loading Facility Available'}</strong>
                  <p>
                    {lang === 'gu'
                      ? 'ખેતરના પાકા ગોડાઉન પર ટ્રક/આઇશર સીધા પહોંચવાની વ્યવસ્થા અને મજૂર ઉપલબ્ધ.'
                      : 'Direct access for trucks/Eichers at farm warehouse with full loading labor available.'}
                  </p>
                </div>
              </div>

              <div className="cd-logistic-card">
                <div className="log-icon">🚚</div>
                <div>
                  <strong>{lang === 'gu' ? 'ટ્રાન્સપોર્ટ સહાયક વ્યવસ્થા' : 'Transport Assistance'}</strong>
                  <p>
                    {lang === 'gu'
                      ? 'ગોંડલ/રાજકોટ યાર્ડ તથા મિલ સુધી ગાડી ભાડે કરવા ખેડૂત દ્વારા સીધો સહયોગ મળશે.'
                      : 'Direct assistance by farmer to book freight to Gondal/Rajkot mandi or spinning mills.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="cd-weigh-note">
              ⚖️ {lang === 'gu'
                ? 'ખેતર પર આવી રૂબરૂ માલ ચકાસીને તુરંત વજનકાંટો (Weighbridge) કરાવવાની સંપૂર્ણ છૂટ.'
                : 'Full permission to inspect crop quality at farm and proceed with digital weighbridge weighing.'}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Transport Calculator & Send Offer Form */}
        <div className="cd-right-col">
          
          {/* Card 1: Transport & Landed Cost Calculator */}
          <div className="cd-card-panel">
            <div className="panel-header-row">
              <div className="panel-title">
                🧮 {lang === 'gu' ? 'ટ્રાન્સપોર્ટ અને કુલ ખર્ચ કેલ્ક્યુલેટર' : 'Transport & Landed Cost Calculator'}
              </div>
              <span className="panel-tag">
                {lang === 'gu' ? 'લાઈવ ગણતરી' : 'Live Calculator'}
              </span>
            </div>

            <div className="panel-rate-box">
              <div>
                <span className="rate-lbl">
                  {lang === 'gu' ? 'ખેડૂતનો માંગેલ ભાવ:' : 'Farmer Listed Price:'}
                </span>
                <div className="rate-main">
                  ₹{ratePerMan} <span className="rate-unit">{lang === 'gu' ? '/ મણ (૨૦ કિગ્રા)' : '/ 20 kg (Man)'}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="rate-lbl">
                  {lang === 'gu' ? 'ક્વિન્ટલ ભાવ:' : 'Per Quintal:'}
                </span>
                <div className="rate-qtl">
                  ₹{ratePerQtl.toLocaleString()} {lang === 'gu' ? '/ ક્વિન્ટલ' : '/ Qtl'}
                </div>
              </div>
            </div>

            {/* Volume Selector Slider */}
            <div className="cd-volume-block">
              <div className="volume-label-row">
                <label>
                  {lang === 'gu' ? 'ખરીદ જથ્થો (Purchase Volume):' : 'Purchase Quantity:'}
                </label>
                <div className="volume-display">
                  <strong>{volumeQtl}</strong> <span>{lang === 'gu' ? 'ક્વિન્ટલ' : 'Quintal'}</span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={volumeQtl}
                onChange={(e) => setVolumeQtl(Number(e.target.value))}
                className="cd-slider"
              />

              <div className="slider-ticks">
                <span>50 Qtl</span>
                <span className="active">{volumeQtl * 5} {lang === 'gu' ? 'મણ સમકક્ષ' : 'Man equiv.'}</span>
                <span>1,000 Qtl</span>
              </div>
            </div>

            {/* Cost Breakdown Table */}
            <div className="cd-calc-breakdown">
              <div className="breakdown-row">
                <span>{lang === 'gu' ? 'માલની મૂળ કિંમત (Base Crop Cost):' : 'Base Crop Cost:'}</span>
                <strong>₹{baseCost.toLocaleString()}</strong>
              </div>
              <div className="breakdown-row">
                <span>{lang === 'gu' ? 'અંદાજિત ટ્રક ભાડું (જેતપુર થી ગોંડલ - ૩૫ કિમી):' : 'Estimated Freight (Jetpur to Gondal - 35km):'}</span>
                <strong>₹{truckFreight.toLocaleString()}</strong>
              </div>
              <div className="breakdown-row">
                <span>{lang === 'gu' ? 'તોલમાપ અને લેબર ચાર્જિસ (Mandi Weighing & Loading):' : 'Weighbridge & Loading Charges:'}</span>
                <strong>₹{mandiWeighing.toLocaleString()}</strong>
              </div>
              <div className="breakdown-row">
                <span>{lang === 'gu' ? 'કિસાનબજાર એસ્ક્રો ફી (0.15%):' : 'Escrow Platform Fee (0.15%):'}</span>
                <strong>₹{escrowFee.toLocaleString()}</strong>
              </div>

              <div className="breakdown-total">
                <div>
                  <span className="total-lbl">
                    {lang === 'gu' ? 'કુલ લેન્ડેડ ખર્ચ (TOTAL LANDED COST):' : 'TOTAL LANDED COST:'}
                  </span>
                  <div className="total-num">₹{totalLandedCost.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <span className="total-lbl">
                    {lang === 'gu' ? 'અંદાજિત પડતર ભાવ:' : 'Effective Landed Rate:'}
                  </span>
                  <div className="landed-rate">₹{costPerMan} {lang === 'gu' ? '/ મણ' : '/ 20kg'}</div>
                </div>
              </div>
            </div>

            <p className="cd-calc-note">
              * {lang === 'gu'
                ? 'ડિલિવરી સ્થળ અને વાસ્તવિક વજન અનુસાર આખરી રકમમાં નજીવો ફેરફાર થઈ શકે છે.'
                : 'Final amount may vary slightly based on actual weighbridge slips and delivery destination.'}
            </p>
          </div>

          {/* Card 2: Send Formal Offer Form */}
          <div className="cd-card-panel">
            <div className="panel-title">
              💼 {lang === 'gu' ? 'ભાવ પ્રસ્તાવ મોકલો (Send Formal Offer)' : 'Send Formal Price Offer'}
            </div>
            <p className="panel-subtitle">
              {lang === 'gu' ? 'ખેડૂત સીધો તમારા ઓફરનો રિસ્પોન્સ આપશે' : 'Farmer will respond directly to your quote'}
            </p>

            <form onSubmit={handleSendOffer} className="cd-offer-form">
              
              <div className="form-group">
                <label>
                  {lang === 'gu' ? 'તમારો ઓફર ભાવ દાખલ કરો (Your Offer Price):' : 'Your Offer Price (per 20kg / Man):'}
                </label>
                <div className="offer-input-box">
                  <span className="curr">₹</span>
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="offer-input"
                  />
                  <span className="unit">{lang === 'gu' ? '/ મણ (૨૦ કિગ્રા)' : '/ 20kg'}</span>
                </div>
                <div className="offer-diff-text">
                  {lang === 'gu' ? 'ખેડૂતની દર:' : 'Farmer ask:'} ₹{ratePerMan} &nbsp;•&nbsp;
                  <span className={offerPrice >= ratePerMan ? 'text-green' : 'text-red'}>
                    {lang === 'gu' ? 'તફાવત:' : 'Diff:'} {offerPrice - ratePerMan >= 0 ? `+₹${offerPrice - ratePerMan}` : `-₹${Math.abs(offerPrice - ratePerMan)}`}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>
                  {lang === 'gu' ? 'અપેક્ષિત ડિલિવરી તારીખ (Expected Delivery Date):' : 'Expected Delivery Date:'}
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="cd-date-input"
                />
              </div>

              <div className="form-group">
                <label>
                  {lang === 'gu' ? 'ડિલિવરી શરત (Delivery Terms):' : 'Delivery Terms:'}
                </label>
                <div className="delivery-radio-group">
                  <label className={`radio-pill ${deliveryTerm === 'farm-gate' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryTerm === 'farm-gate'}
                      onChange={() => setDeliveryTerm('farm-gate')}
                    />
                    <div>
                      <strong>Farm Gate</strong>
                      <span>{lang === 'gu' ? 'ખેતરથી સીધો ઉપાડ' : 'Pickup from farm'}</span>
                    </div>
                  </label>

                  <label className={`radio-pill ${deliveryTerm === 'mill-gate' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryTerm === 'mill-gate'}
                      onChange={() => setDeliveryTerm('mill-gate')}
                    />
                    <div>
                      <strong>Mill Gate</strong>
                      <span>{lang === 'gu' ? 'જીનિંગ મિલ પર પહોંચ' : 'Delivered to mill'}</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="escrow-terms-box">
                <span className="escrow-badge">
                  🛡️ {lang === 'gu' ? 'ચૂકવણી શરત (Escrow Payment Condition):' : 'Payment Terms (Escrow):'}
                </span>
                <p>
                  {lang === 'gu'
                    ? 'ડિજિટલ વજન સ્લિપ બાદ ૨૪ કલાકમાં RTGS બેંક ટ્રાન્સફર'
                    : '100% RTGS bank transfer within 24 hours of weighbridge receipt verification.'}
                </p>
              </div>

              <button type="submit" className="cd-submit-offer-btn">
                <span>{lang === 'gu' ? 'ભાવ ઓફર કરો (Make Offer / ભાવતાલ)' : 'Make Offer / Submit Quote'}</span>
                <span>→</span>
              </button>

              <div className="cd-secondary-btns">
                <button
                  type="button"
                  className="cd-sec-btn"
                  onClick={handleOpenContact}
                >
                  💬 {lang === 'gu' ? 'ખેડૂત સાથે સંપર્ક કરો' : 'Contact Farmer'}
                </button>
                <button
                  type="button"
                  className="cd-sec-btn"
                  onClick={() => toast.success(lang === 'gu' ? 'વોચલિસ્ટમાં સેવ થયો' : 'Saved to Watchlist')}
                >
                  🔖 {lang === 'gu' ? 'વોચલિસ્ટમાં સેવ' : 'Save Watchlist'}
                </button>
              </div>

              <div className="cd-whatsapp-share-row">
                <span>{lang === 'gu' ? 'આ પાક વેપારી મિત્રને મોકલો:' : 'Share listing with colleagues:'}</span>
                <button
                  type="button"
                  className="whatsapp-share-btn"
                  onClick={handleShareWhatsApp}
                >
                  {lang === 'gu' ? 'WhatsApp શેર' : 'WhatsApp Share'}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>

      {/* 3. Bottom Buyer Protection Banner */}
      <div className="cd-protection-banner">
        <div className="cd-protection-inner">
          <div className="prot-left">
            🛡️ <strong>{lang === 'gu' ? 'કિસાનબજાર વેપારી સુરક્ષા કવચ (Trader Protection)' : 'Trader Buyer Protection Guarantee'}</strong>
            <span>
              {lang === 'gu'
                ? 'ગુણવત્તા મેળ ખાતી ન હોય તો ૧૦૦% એસ્ક્રો રિફંડ ગેરંટી અને તુરંત મધ્યસ્થી સેવા.'
                : '100% Escrow refund guarantee and immediate mediation if quality does not match certified lab specs.'}
            </span>
          </div>
          <div className="prot-right">
            <span>{lang === 'gu' ? 'હેલ્પલાઇન: 1800-543-388' : 'Helpline: 1800-543-388'}</span>
            <Link to="/about" className="prot-link">
              {lang === 'gu' ? 'નિયમો વાંચો (Terms)' : 'Read Terms'}
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Login Modal Overlay matching Page 3 Screenshot */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="login-modal-close" onClick={() => setShowLoginModal(false)}>✕</button>

            <div className="login-modal-icon">📞</div>
            
            <h2 className="login-modal-title">
              {lang === 'gu' ? 'ખેડૂતનો નંબર જોવા માટે લૉગિન કરો' : 'Login to Contact Farmer'}
            </h2>
            <p className="login-modal-en">
              {lang === 'gu' ? '(Login to Contact Farmer)' : 'Direct Farmer Access'}
            </p>

            <p className="login-modal-desc">
              {lang === 'gu'
                ? 'હરસુખભાઈ પટેલ સાથે સીધી વાતચીત કરવા આપનો મોબાઇલ નંબર દાખલ કરો.'
                : 'Enter your mobile number to connect directly with Harsukhbhai Patel.'}
            </p>

            <div className="login-modal-crop-pill">
              {lang === 'gu' ? 'સૌરાષ્ટ્ર શંકર કપાસ (૩૫૦ ક્વિન્ટલ)' : 'Shankar-6 Cotton (350 Quintal)'} &nbsp;•&nbsp; <strong>₹૧,૭૧૦/મણ</strong>
            </div>

            <div className="login-modal-form">
              <label className="modal-input-label">
                {lang === 'gu' ? 'મોબાઈલ નંબર (Mobile Number)' : 'Mobile Number'}
              </label>
              <div className="modal-phone-input-row">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  className="modal-phone-input"
                  placeholder={lang === 'gu' ? 'દસ આંકડાનો મોબાઇલ નંબર (દા.ત. 98765 43210)' : 'Enter 10-digit mobile number'}
                  value={modalMobile}
                  onChange={(e) => setModalMobile(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              {!modalOtpSent ? (
                <button
                  type="button"
                  className="modal-otp-btn"
                  onClick={handleModalSendOtp}
                >
                  🔒 {lang === 'gu' ? 'OTP મેળવો (Get 6-Digit OTP)' : 'Get 6-Digit OTP'}
                </button>
              ) : (
                <div className="modal-otp-section">
                  <div className="otp-boxes-row">
                    {modalOtp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        className="modal-otp-box"
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value;
                          const next = [...modalOtp];
                          next[idx] = val;
                          setModalOtp(next);
                          if (val && idx < 5) {
                            e.target.nextElementSibling?.focus();
                          }
                        }}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="modal-otp-btn"
                    onClick={handleModalVerifyOtp}
                  >
                    ✓ {lang === 'gu' ? 'પ્રવેશ કરો (Login)' : 'Verify & Continue'}
                  </button>
                </div>
              )}

              <div className="modal-trust-note">
                <p>✓ {lang === 'gu' ? 'કોઈ પાસવર્ડની જરૂર નથી. માત્ર ૧૦ સેકન્ડમાં OTP થી પ્રવેશ કરો.' : 'No password needed. Instant login with 6-digit OTP in 10 seconds.'}</p>
                <p>{lang === 'gu' ? 'તમારો નંબર સુરક્ષિત છે. માત્ર ચકાસાયેલ એપીએમસી સોદા માટે ઉપયોગ થશે.' : 'Your number is completely secure and verified for APMC trade.'}</p>
              </div>

              <div className="modal-guest-row">
                <button
                  type="button"
                  className="modal-guest-link"
                  onClick={() => setShowLoginModal(false)}
                >
                  {lang === 'gu' ? 'અત્યારે નહિ, માત્ર વિગતો જોવી છે (Continue browsing as guest)' : 'Continue browsing as guest'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CropDetailPage;