import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import traderService from '../../services/traderService';
import './CropOfferPage.css';

const CropOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { user } = useAuth();

  // Load crop from service
  const [crop, setCrop] = useState(() => traderService.getCropById(id || 'LOT-KB-9042'));
  const [isSaved, setIsSaved] = useState(() => traderService.isInWatchlist(id || 'LOT-KB-9042'));
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Calculator states
  const [volumeQtl, setVolumeQtl] = useState(350);
  const [offerPriceMan, setOfferPriceMan] = useState(1700);
  const [deliveryDate, setDeliveryDate] = useState('2025-02-16');
  const [deliveryTerm, setDeliveryTerm] = useState('farm_gate');
  const [showLabModal, setShowLabModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loaded = traderService.getCropById(id || 'LOT-KB-9042');
    setCrop(loaded);
    setIsSaved(traderService.isInWatchlist(loaded.id));
    if (loaded.farmerAskMan) {
      setOfferPriceMan(loaded.farmerAskMan - 20);
    }
  }, [id]);

  // Dynamic calculations
  const volumeMan = volumeQtl * 5;
  const baseCropCost = volumeMan * (crop.farmerAskMan || 1720);
  const estFreight = Math.round(volumeQtl * 35.7); // ~12,500 for 350
  const mandiWeighing = Math.round(volumeQtl * 15); // ~5,250 for 350
  const platformFee = Math.round(baseCropCost * 0.0015); // 0.15% = ~4,515
  const totalLandedCost = baseCropCost + estFreight + mandiWeighing + platformFee;
  const landedRateMan = volumeMan > 0 ? Math.round(totalLandedCost / volumeMan) : 0;

  // Price Difference
  const priceDiff = offerPriceMan - (crop.farmerAskMan || 1720);

  const handleToggleWatchlist = () => {
    if (isSaved) {
      traderService.removeFromWatchlist(crop.id);
      setIsSaved(false);
      toast.success(lang === 'gu' ? 'વોચલિસ્ટમાંથી દૂર કર્યો' : 'Removed from Watchlist');
    } else {
      traderService.addToWatchlist(crop);
      setIsSaved(true);
      toast.success(lang === 'gu' ? '⭐ પાક વોચલિસ્ટમાં સેવ થયો!' : '⭐ Crop saved to Watchlist!');
    }
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerPriceMan || offerPriceMan <= 0) {
      toast.error(lang === 'gu' ? 'કૃપા કરીને માન્ય ઓફર ભાવ દાખલ કરો' : 'Please enter valid offer price');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const deal = traderService.createDealOffer({
        cropId: crop.id,
        lotId: `#${crop.id}`,
        cropGu: crop.nameGu,
        cropEn: crop.nameEn,
        commodity: crop.commodity,
        grade: crop.grade,
        volumeQtl,
        offerPriceMan,
        farmerAskMan: crop.farmerAskMan,
        deliveryTerms: deliveryTerm,
        expectedDeliveryDate: deliveryDate,
        farmer: crop.farmer,
      });

      setIsSubmitting(false);
      toast.success(
        lang === 'gu'
          ? `✅ ઔપચારિક ઑફર ₹${offerPriceMan}/મણ ખેડૂતને મોકલી દેવાઈ!`
          : `✅ Formal Offer of ₹${offerPriceMan}/man sent to farmer!`
      );
      navigate('/buyer/messages');
    }, 600);
  };

  const handleDownloadLabPDF = () => {
    toast.success(
      lang === 'gu'
        ? '📄 APMC સત્તાવાર લેબ રિપોર્ટ (#GND-LAB-2025-8841) ડાઉનલોડ થઈ રહ્યો છે...'
        : '📄 Downloading Official APMC Lab Report PDF (#GND-LAB-2025-8841)...'
    );
  };

  return (
    <div className="cop-page">
      {/* Top Breadcrumb & Status Bar */}
      <div className="cop-topbar">
        <div className="cop-breadcrumb">
          <Link to="/" className="cop-bc-link">હોમ</Link>
          <span className="cop-bc-sep">&gt;</span>
          <Link to="/buyer/browse" className="cop-bc-link">બલ્ક માર્કેટપ્લેસ</Link>
          <span className="cop-bc-sep">&gt;</span>
          <span className="cop-bc-curr">{crop.nameGu} (#{crop.id})</span>
        </div>
        <div className="cop-top-badges">
          <span className="cop-badge-green">✓ ખેડૂત પ્રમાણિત (7/12 &amp; 8-A Verified)</span>
          <span className="cop-badge-orange">⚡ તાત્કાલિક લોડિંગ ઉપલબ્ધ</span>
        </div>
      </div>

      {/* Title & Metadata Header */}
      <div className="cop-header-section">
        <div className="cop-title-row">
          <h1 className="cop-main-title">{crop.nameGu} ({crop.nameEn})</h1>
          <span className="cop-grade-tag">{crop.grade || 'GRADE A સુપર પ્રીમિયમ'}</span>
        </div>
        <p className="cop-sub-meta">
          લોટ આઈડી: <strong className="text-white">#{crop.id}</strong> • નમૂનો સંગ્રહ: <span className="cop-hl-gold">{crop.sampleLocation}</span>
        </p>
      </div>

      {/* Main 2-Column Layout matching PDF Page 1 */}
      <div className="cop-grid">
        {/* ================= LEFT COLUMN ================= */}
        <div className="cop-left-col">
          {/* Image Gallery */}
          <div className="cop-gallery-card">
            <div className="cop-main-image-wrap">
              <img
                src={crop.images?.[activeImageIdx] || '/crops/cotton.jpg'}
                alt={crop.nameGu}
                className="cop-main-img"
              />
              <span className="cop-img-label">
                📷 {activeImageIdx === 0 ? '૧. કપાસનો ઢગલો (Raw Cotton Heap) • 1080p HD' : `ફોટો ${activeImageIdx + 1} • ઉચ્ચ ગુણવત્તા`}
              </span>
              <span className="cop-img-count">5/5 ફોટા ઉપલબ્ધ</span>
            </div>

            {/* Thumbnails */}
            <div className="cop-thumbs-row">
              <button
                type="button"
                className={`cop-thumb-btn ${activeImageIdx === 0 ? 'active' : ''}`}
                onClick={() => setActiveImageIdx(0)}
              >
                <img src="/crops/cotton.jpg" alt="Thumb 1" />
                <span>કાચો કપાસ</span>
              </button>
              <button
                type="button"
                className={`cop-thumb-btn ${activeImageIdx === 1 ? 'active' : ''}`}
                onClick={() => setActiveImageIdx(1)}
              >
                <img src="/crops/cotton.jpg" alt="Thumb 2" />
                <span>લેબ સેમ્પલ</span>
              </button>
              <button
                type="button"
                className={`cop-thumb-btn ${activeImageIdx === 2 ? 'active' : ''}`}
                onClick={() => setActiveImageIdx(2)}
              >
                <img src="/crops/cotton.jpg" alt="Thumb 3" />
                <span>APMC કાંટો</span>
              </button>
              <button
                type="button"
                className={`cop-thumb-btn ${activeImageIdx === 3 ? 'active' : ''}`}
                onClick={() => setActiveImageIdx(3)}
              >
                <img src="/crops/cotton.jpg" alt="Thumb 4" />
                <span>ખેડૂત ગોડાઉન</span>
              </button>
            </div>
          </div>

          {/* Technical Specifications & Lab Report */}
          <div className="cop-card cop-quality-card">
            <div className="cop-card-head">
              <div className="cop-card-title">
                <span className="cop-head-icon">🔬</span>
                <h2>ટેકનિકલ સ્પષ્ટીકરણો (Quality &amp; Lab Report)</h2>
              </div>
              <button
                type="button"
                className="cop-btn-pdf"
                onClick={handleDownloadLabPDF}
              >
                📥 લેબ રિપોર્ટ PDF
              </button>
            </div>

            {/* 6-Grid Parameters */}
            <div className="cop-specs-grid">
              <div className="cop-spec-box">
                <span className="cop-spec-lbl">ગ્રેડ રેટિંગ / Grade</span>
                <strong className="cop-spec-val text-green">{crop.quality?.grade || 'Grade A પ્રીમિયમ'}</strong>
                <span className="cop-spec-sub">{crop.quality?.gradeSub || 'સુપર વ્હાઇટ કલર'}</span>
              </div>
              <div className="cop-spec-box">
                <span className="cop-spec-lbl">સ્ટેપલ લંબાઈ / Staple Length</span>
                <strong className="cop-spec-val">{crop.quality?.stapleLength || '29.5 mm'}</strong>
                <span className="cop-spec-sub">{crop.quality?.stapleSub || 'સ્પિનિંગ માટે ઉત્તમ'}</span>
              </div>
              <div className="cop-spec-box">
                <span className="cop-spec-lbl">માઇક્રોનેયર / Micronaire</span>
                <strong className="cop-spec-val">{crop.quality?.micronaire || '3.8 MIC'}</strong>
                <span className="cop-spec-sub">{crop.quality?.micronaireSub || 'પરફેક્ટ ફાઇબર પરિપક્વતા'}</span>
              </div>
              <div className="cop-spec-box">
                <span className="cop-spec-lbl">ભેજ / Moisture</span>
                <strong className="cop-spec-val text-green">{crop.quality?.moisture || '7.2%'}</strong>
                <span className="cop-spec-sub">{crop.quality?.moistureSub || 'સ્ટાન્ડર્ડ (< 8.5% થી ઓછું)'}</span>
              </div>
              <div className="cop-spec-box">
                <span className="cop-spec-lbl">કચરો / Trash Content</span>
                <strong className="cop-spec-val">{crop.quality?.trash || '< 2.0%'}</strong>
                <span className="cop-spec-sub">{crop.quality?.trashSub || 'નહિવત પાન-ડાખળી'}</span>
              </div>
              <div className="cop-spec-box">
                <span className="cop-spec-lbl">તાકાત / Strength (GPT)</span>
                <strong className="cop-spec-val">{crop.quality?.strength || '29.2 g/tex'}</strong>
                <span className="cop-spec-sub">{crop.quality?.strengthSub || 'હાઇ ટેન્સાઇલ ક્ષમતા'}</span>
              </div>
            </div>

            {/* Lab Verification Certificate Banner */}
            <div className="cop-lab-banner">
              <div className="cop-lab-badge">✓ APMC Certified</div>
              <p className="cop-lab-text">
                ગોંડલ APMC ટેસ્ટિંગ લેબ રિપોર્ટ જોડવામાં આવેલ: નમૂનો તા. <strong>{crop.quality?.labDate || '૧૨ ફેબ્રુઆરી ૨૦૨૫'}</strong> ના રોજ માન્ય APMC લેબોરેટરી નિરીક્ષક શ્રી ભાવેશભાઈ દ્વારા પ્રમાણિત કરાયેલ છે. ટેસ્ટ સ્લિપ સીરિયલ: <strong>{crop.quality?.labReportNo || '#GND-LAB-2025-8841'}</strong>.
              </p>
            </div>
          </div>

          {/* Farmer Info & Logistics */}
          <div className="cop-card cop-farmer-card">
            <div className="cop-card-head">
              <div className="cop-card-title">
                <span className="cop-head-icon">👨‍🌾</span>
                <h2>ખેડૂત માહિતી અને લોકેશન (Farmer &amp; Logistics)</h2>
              </div>
              <Link to={`/farmer/traders`} className="cop-link-verified">
                ✓ વેરિફાઇડ પ્રોફાઇલ
              </Link>
            </div>

            <div className="cop-farmer-layout">
              <div className="cop-farmer-avatar">{crop.farmer?.avatar || 'રપ'}</div>
              <div className="cop-farmer-details">
                <div className="cop-farmer-name-row">
                  <h3 className="cop-farmer-name">{crop.farmer?.name}</h3>
                  <span className="cop-tag-land">✓ {crop.farmer?.landVerified}</span>
                </div>
                <div className="cop-farmer-info-list">
                  <p className="cop-f-info">
                    📍 <strong>ગામ:</strong> {crop.farmer?.village}, <strong>તાલુકો:</strong> {crop.farmer?.taluka} ({crop.farmer?.district} જિલ્લો)
                  </p>
                  <p className="cop-f-info">
                    🛣️ <strong>ગોડાઉનથી હાઇવે અંતર:</strong> {crop.farmer?.highwayDist}
                  </p>
                  <p className="cop-f-info">
                    🤝 <strong>પ્લેટફોર્મ સાથે જોડાયેલ:</strong> {crop.farmer?.memberSince}
                  </p>
                </div>
              </div>
            </div>

            {/* Transport Photo Access */}
            <div className="cop-access-strip">
              <div className="cop-access-icon">🚛</div>
              <div className="cop-access-text">
                <strong>ટ્રાન્સપોર્ટ એક્સેસ:</strong> {crop.farmer?.taluka}-{crop.farmer?.district} નેશનલ હાઇવે નજીક, સીધા ખેતરે ૧૬-વ્હીલર ડામર રોડ સુવિધા.
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="cop-right-col">
          {/* 1. Transport & Total Landed Cost Calculator */}
          <div className="cop-card cop-calc-card">
            <div className="cop-card-head">
              <div className="cop-card-title">
                <span className="cop-head-icon">🧮</span>
                <h2>ટ્રાન્સપોર્ટ અને કુલ ખર્ચ કેલ્ક્યુલેટર</h2>
              </div>
              <span className="cop-tag-calc">લાઈવ ગણતરી</span>
            </div>

            {/* Farmer Ask Rates Banner */}
            <div className="cop-rates-row">
              <div className="cop-rate-item">
                <span className="cop-rate-lbl">ખેડૂતનો માંગેલ ભાવ (Farmer Rate)</span>
                <span className="cop-rate-val text-green">₹{crop.farmerAskMan?.toLocaleString('gu-IN') || '૧,૭૨૦'} <small>/ મણ (૨૦ કિગ્રા)</small></span>
              </div>
              <div className="cop-rate-item text-right">
                <span className="cop-rate-lbl">ક્વિન્ટલ ભાવ</span>
                <span className="cop-rate-val">₹{crop.farmerAskQtl?.toLocaleString('gu-IN') || '૮,૬૦૦'} <small>/ ક્વિન્ટલ</small></span>
              </div>
            </div>

            {/* Purchase Volume Selector */}
            <div className="cop-vol-section">
              <label className="cop-vol-label">
                ખરીદ જથ્થો (Purchase Volume):
                <div className="cop-vol-input-wrap">
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={volumeQtl}
                    onChange={(e) => setVolumeQtl(Math.max(1, Number(e.target.value) || 0))}
                    className="cop-vol-input"
                  />
                  <span className="cop-vol-unit">ક્વિન્ટલ</span>
                </div>
              </label>

              {/* Quick Preset Buttons matching PDF */}
              <div className="cop-preset-btns">
                <button
                  type="button"
                  className={`cop-preset-btn ${volumeQtl === 50 ? 'active' : ''}`}
                  onClick={() => setVolumeQtl(50)}
                >
                  ૫૦ ક્વિન્ટલ (૨૫૦ મણ)
                </button>
                <button
                  type="button"
                  className={`cop-preset-btn ${volumeQtl === 350 ? 'active' : ''}`}
                  onClick={() => setVolumeQtl(350)}
                >
                  ૧,૭૫૦ મણ સમકક્ષ (૩૫૦ ક્વિ.)
                </button>
                <button
                  type="button"
                  className={`cop-preset-btn ${volumeQtl === 1000 ? 'active' : ''}`}
                  onClick={() => setVolumeQtl(1000)}
                >
                  ૧,૦૦૦ ક્વિન્ટલ (૫,૦૦૦ મણ)
                </button>
              </div>
            </div>

            {/* Itemized Calculation Breakdown Table */}
            <div className="cop-breakdown-table">
              <div className="cop-bd-row">
                <span className="cop-bd-lbl">માલની મૂળ કિંમત (Base Crop Cost):</span>
                <span className="cop-bd-val">₹{baseCropCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="cop-bd-row">
                <span className="cop-bd-lbl">
                  અંદાજિત ટ્રક ભાડું ({crop.farmer?.taluka} થી ગોંડલ - ૩૫ કિમી): ⓘ
                </span>
                <span className="cop-bd-val">₹{estFreight.toLocaleString('en-IN')}</span>
              </div>
              <div className="cop-bd-row">
                <span className="cop-bd-lbl">તોલમાપ અને લેબર ચાર્જિસ (Mandi Weighing &amp; Loading):</span>
                <span className="cop-bd-val">₹{mandiWeighing.toLocaleString('en-IN')}</span>
              </div>
              <div className="cop-bd-row">
                <span className="cop-bd-lbl">કિસાનબજાર એસ્ક્રો પ્લેટફોર્મ ફી (0.15%):</span>
                <span className="cop-bd-val">₹{platformFee.toLocaleString('en-IN')}</span>
              </div>

              {/* Total Landed Cost Row */}
              <div className="cop-total-box">
                <div className="cop-total-left">
                  <span className="cop-total-lbl">કુલ લેન્ડેડ ખર્ચ (TOTAL LANDED COST)</span>
                  <span className="cop-total-num">₹{totalLandedCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="cop-total-right">
                  <span className="cop-per-man-lbl">અંદાજિત પડતર ભાવ</span>
                  <span className="cop-per-man-val text-green">₹{landedRateMan.toLocaleString('en-IN')} / મણ</span>
                </div>
              </div>

              <p className="cop-calc-disclaimer">
                * ડિલિવરી સ્થળ અને વાસ્તવિક વજન અનુસાર આખરી રકમમાં નજીવો ફેરફાર થઈ શકે છે.
              </p>
            </div>
          </div>

          {/* 2. Send Formal Offer Form */}
          <div className="cop-card cop-offer-card">
            <div className="cop-offer-head">
              <div className="cop-offer-head-left">
                <span className="cop-head-icon">🤝</span>
                <h3>ભાવ પ્રસ્તાવ મોકલો (Send Formal Offer)</h3>
              </div>
              <span className="cop-resp-sub">ખેડૂત સીધો તમારા બોક્સનો રિસ્પોન્સ આપશે</span>
            </div>

            <form onSubmit={handleSendOffer} className="cop-offer-form">
              {/* Offer Price Input */}
              <div className="cop-form-group">
                <label className="cop-form-label">
                  તમારો ઑફર ભાવ દાખલ કરો (Your Offer Price):
                </label>
                <div className="cop-price-input-row">
                  <div className="cop-cur-wrap">
                    <span className="cop-cur-sym">₹</span>
                    <input
                      type="number"
                      value={offerPriceMan}
                      onChange={(e) => setOfferPriceMan(Number(e.target.value) || 0)}
                      className="cop-price-input"
                    />
                    <span className="cop-cur-unit">/ મણ (૨૦ કિગ્રા)</span>
                  </div>
                  <div className="cop-diff-badge">
                    <span className="cop-diff-ask">ખેડૂતનો દર: ₹{crop.farmerAskMan || 1720}</span>
                    <span className={`cop-diff-val ${priceDiff >= 0 ? 'text-green' : 'text-red'}`}>
                      તફાવત: {priceDiff > 0 ? `+₹${priceDiff}` : `-₹${Math.abs(priceDiff)}`} / મણ
                    </span>
                  </div>
                </div>
              </div>

              {/* Expected Delivery Date */}
              <div className="cop-form-group">
                <label className="cop-form-label">
                  અપેક્ષિત ડિલિવરી તારીખ (Expected Delivery Date):
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="cop-date-input"
                />
              </div>

              {/* Delivery Terms Radios */}
              <div className="cop-form-group">
                <label className="cop-form-label">ડિલિવરી શરત (Delivery Terms):</label>
                <div className="cop-delivery-radios">
                  <label className={`cop-radio-chip ${deliveryTerm === 'farm_gate' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryTerm"
                      value="farm_gate"
                      checked={deliveryTerm === 'farm_gate'}
                      onChange={() => setDeliveryTerm('farm_gate')}
                    />
                    <span className="cop-rc-dot"></span>
                    <div>
                      <strong>Farm Gate</strong>
                      <span>ખેતરેથી સીધો ઉપાડ</span>
                    </div>
                  </label>
                  <label className={`cop-radio-chip ${deliveryTerm === 'mill_gate' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryTerm"
                      value="mill_gate"
                      checked={deliveryTerm === 'mill_gate'}
                      onChange={() => setDeliveryTerm('mill_gate')}
                    />
                    <span className="cop-rc-dot"></span>
                    <div>
                      <strong>Mill Gate</strong>
                      <span>જીનિંગ મિલ પર પહોંચ</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Escrow Payment Condition Box */}
              <div className="cop-escrow-box">
                <span className="cop-escrow-title">ચુકવણી શરત (Escrow Payment Condition):</span>
                <p className="cop-escrow-text">
                  🛡️ ડિજિટલ વજન સ્લિપ બાદ ૨૪ કલાકમાં RTGS બેંક ટ્રાન્સફર
                </p>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="cop-btn-submit-offer"
              >
                {isSubmitting ? 'પ્રક્રિયા ચાલુ છે...' : '▶ ઔપચારિક ઑફર સબમિટ કરો (Send Formal Offer)'}
              </button>

              {/* Dual Action Buttons matching PDF */}
              <div className="cop-action-dual">
                <button
                  type="button"
                  className="cop-btn-chat"
                  onClick={() => navigate('/buyer/messages')}
                >
                  💬 ખેડૂત સાથે ચેટ (Chat)
                </button>
                <button
                  type="button"
                  className={`cop-btn-save ${isSaved ? 'saved' : ''}`}
                  onClick={handleToggleWatchlist}
                >
                  {isSaved ? '✓ વોચલિસ્ટમાં સેવ કરેલ' : '🔖 વોચલિસ્ટમાં સેવ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Trader Buyer Protection Banner matching PDF */}
      <div className="cop-protection-banner">
        <div className="cop-prot-left">
          <span className="cop-prot-shield">🛡️</span>
          <div>
            <h4>કિસાનબજાર વેપારી સુરક્ષા કવચ (Trader Buyer Protection)</h4>
            <p>ગુણવત્તા મેળ ખાતી ન હોય તો ૧૦૦% એસ્ક્રો રિફંડ ગેરંટી અને તુરંત મધ્યસ્થી સેવા.</p>
          </div>
        </div>
        <div className="cop-prot-right">
          <span>હેલ્પલાઇન સહાય: <strong>1800-543-388</strong></span>
          <a href="#terms" className="cop-prot-link">નિયમો વાંચો (Terms)</a>
        </div>
      </div>
    </div>
  );
};

export default CropOfferPage;
