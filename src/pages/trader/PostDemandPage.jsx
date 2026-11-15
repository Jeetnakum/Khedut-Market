import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { traderService } from '../../services/traderService';
import toast from 'react-hot-toast';
import './PostDemandPage.css';

export default function PostDemandPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State matching PDF Page 6
  const [commodity, setCommodity] = useState('groundnut');
  const [variety, setVariety] = useState('જામનગરી જી-૨૦ બોલ્ડ (Grade A)');
  const [quantityQtl, setQuantityQtl] = useState(500);
  const [allowSmallLots, setAllowSmallLots] = useState(true);
  const [targetPrice, setTargetPrice] = useState(1400);
  const [selectedLocations, setSelectedLocations] = useState([
    'junagadh',
    'rajkot',
    'jamnagar',
  ]);
  const [logisticsType, setLogisticsType] = useState('mill_delivery');
  const [paymentTerm, setPaymentTerm] = useState(
    'ડિજિટલ કાંટા વજન બાદ ૨૪ કલાકમાં સીધા બેંક ખાતામાં RTGS'
  );
  const [validityDays, setValidityDays] = useState('5');

  // Demands list
  const [demands, setDemands] = useState([]);

  useEffect(() => {
    loadDemands();
  }, []);

  const loadDemands = () => {
    const list = traderService.getDemands();
    setDemands(list);
  };

  // Location presets with farmer counts
  const locationOptions = [
    { id: 'junagadh', nameGu: 'જૂનાગઢ (Junagadh)', count: 920 },
    { id: 'rajkot', nameGu: 'રાજકોટ (Rajkot)', count: 1140 },
    { id: 'jamnagar', nameGu: 'જામનગર (Jamnagar)', count: 740 },
    { id: 'amreli', nameGu: 'અમરેલી (Amreli)', count: 650 },
    { id: 'morbi', nameGu: 'મોરબી (Morbi)', count: 520 },
  ];

  const handleLocationToggle = (id) => {
    if (selectedLocations.includes(id)) {
      if (selectedLocations.length === 1) {
        toast.error('ઓછામાં ઓછો એક જિલ્લો પસંદ કરવો જરૂરી છે');
        return;
      }
      setSelectedLocations(selectedLocations.filter((loc) => loc !== id));
    } else {
      setSelectedLocations([...selectedLocations, id]);
    }
  };

  const totalReachCount = selectedLocations.reduce((sum, id) => {
    const found = locationOptions.find((l) => l.id === id);
    return sum + (found ? found.count : 0);
  }, 0);

  // Commodity variety presets
  const handleCommodityChange = (val) => {
    setCommodity(val);
    if (val === 'groundnut') {
      setVariety('જામનગરી જી-૨૦ બોલ્ડ (Grade A)');
      setTargetPrice(1400);
    } else if (val === 'cotton') {
      setVariety('સૌરાષ્ટ્ર શંકર-૬ (Grade A)');
      setTargetPrice(1720);
    } else if (val === 'cumin') {
      setVariety('ઊંઝા દેશી મશીન ક્લીન (Grade A+)');
      setTargetPrice(5600);
    } else if (val === 'wheat') {
      setVariety('દેશી ટુકડા / લોકવન (Grade A)');
      setTargetPrice(620);
    } else if (val === 'sesame') {
      setVariety('ઝેડ-બ્લેક કાળા તલ (સોર્ટેક્સ)');
      setTargetPrice(2950);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantityQtl || !targetPrice) {
      toast.error('કૃપા કરીને જથ્થો અને ઓફર કિંમત દાખલ કરો');
      return;
    }

    const commodityNameGu =
      commodity === 'groundnut'
        ? 'મગફળી (Groundnut)'
        : commodity === 'cotton'
        ? 'શંકર કપાસ (Cotton)'
        : commodity === 'cumin'
        ? 'જીરૂ (Cumin)'
        : commodity === 'wheat'
        ? 'ઘઉં (Wheat)'
        : 'તલ (Sesame)';

    const newDemand = traderService.createDemand({
      cropGu: commodityNameGu,
      cropEn: commodity,
      variety,
      qtyQtl: Number(quantityQtl),
      priceMan: Number(targetPrice),
      locations: selectedLocations,
      reachCount: totalReachCount,
      logistics:
        logisticsType === 'mill_delivery'
          ? 'ગોંડલ મિલ/ગોડાઉન પર ડિલિવરી (Mill Delivery)'
          : 'ખેતરેથી સીધો ઉપાડ (Farm Gate Pickup)',
      validity: `${validityDays} દિવસ`,
      offersCount: 0,
      status: 'active',
    });

    toast.success('તમારી ખરીદ જરૂરિયાત સફળતાપૂર્વક ખેડૂતોને બ્રોડકાસ્ટ થઈ ગઈ છે!', {
      icon: '📢',
      duration: 4000,
    });
    loadDemands();
  };

  return (
    <div className="post-demand-page">
      {/* Top Breadcrumb Strip */}
      <div className="demand-breadcrumb-strip">
        <div className="demand-breadcrumb-container">
          <span className="demand-breadcrumb-text">
            મુખ્ય પેજ / વેપારી પોર્ટલ (Buyer Hub) / ખરીદ જરૂરિયાત મૂકો (Post Requirement)
          </span>
          <span className="demand-miller-badge">
            🛡️ વેરિફાઇડ મિલર / વેપારી ID: #GUJ-V-9932 &nbsp;•&nbsp; ક્રેડિટ રેટિંગ: A+ (99.4%)
          </span>
        </div>
      </div>

      <div className="demand-main-container">
        {/* Header Hero Banner */}
        <div className="demand-hero-card">
          <div className="demand-hero-badge">
            <span className="broadcast-icon">📢</span>
            <span>ત્વરિત ખેડૂત બ્રોડકાસ્ટ (Direct Broadcast System)</span>
          </div>
          <h1 className="demand-hero-title">
            ખરીદ જરૂરિયાત મૂકો (Post Buying Requirement)
          </h1>
          <p className="demand-hero-subtitle">
            તમારી માંગણી પોસ્ટ કરો - પસંદ કરેલા જિલ્લાના ૨,૫૦૦+ વેરિફાઇડ ખેડૂતોને સીધો SMS અને WhatsApp એલર્ટ જશે.
          </p>

          <div className="demand-hero-benefits-row">
            <div className="benefit-pill">
              <span className="benefit-icon">⚡</span>
              <span>ત્વરિત SMS સુવિધા</span>
            </div>
            <div className="benefit-pill">
              <span className="benefit-icon">💬</span>
              <span>WhatsApp ડાયરેક્ટ મેસેજ</span>
            </div>
            <div className="benefit-pill">
              <span className="benefit-icon">📄</span>
              <span>૭/૧૨ પ્રમાણિત ખેડૂતો</span>
            </div>
            <div className="benefit-pill">
              <span className="benefit-icon">₹</span>
              <span>શૂન્ય કમિશન બ્રોડકાસ્ટ</span>
            </div>
          </div>
        </div>

        {/* Two-Column Main Content */}
        <div className="demand-grid-layout">
          {/* Left Column: Form */}
          <div className="demand-form-column">
            <div className="form-card">
              <div className="form-card-header">
                <div className="form-card-title">
                  <span className="form-icon">📝</span>
                  <h3>માંગણી વિગતો (Requirement Form)</h3>
                </div>
                <span className="mandatory-note">* તમામ વિગતો ફરજિયાત છે</span>
              </div>

              <form onSubmit={handleSubmit} className="post-requirement-form">
                {/* 1. Commodity Selection */}
                <div className="form-field-group">
                  <label className="field-label">
                    ૧. પાક પસંદ કરો (Select Commodity) *
                  </label>
                  <select
                    className="demand-select"
                    value={commodity}
                    onChange={(e) => handleCommodityChange(e.target.value)}
                  >
                    <option value="groundnut">🥜 મગફળી (Groundnut / Mandvi)</option>
                    <option value="cotton">🌿 કપાસ (Cotton / Kapas)</option>
                    <option value="cumin">🌱 જીરૂ (Cumin Seed / Jeeru)</option>
                    <option value="wheat">🌾 ઘઉં (Wheat / Tukda)</option>
                    <option value="sesame">✨ તલ (Sesame / Tal)</option>
                  </select>
                  <span className="field-meta-info">
                    ℹ️ સૌરાષ્ટ્ર અને ઉત્તર ગુજરાતના APMC રેટ્સ સાથે સંકલિત
                  </span>
                </div>

                {/* 2. Variety & Grade */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label">
                      ૨. વિશિષ્ટ જાત અને ગુણવત્તા ગ્રેડ (Variety & Grade) *
                    </label>
                    <span className="quality-grade-tag">Grade A (ઉત્તમ ક્વોલિટી) ✓</span>
                  </div>
                  <input
                    type="text"
                    className="demand-input"
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                  />
                  <span className="variety-specs-text">
                    ઓઇલ ટકાવારી: ૪૮%+, મોઇશ્ચર (ભેજ): ૭% થી ઓછો, દાણાનું કદ: બોલ્ડ ૧૦૦-દાણા વજન ૫૫+ ગ્રામ
                  </span>
                </div>

                {/* 3. Required Quantity */}
                <div className="form-field-group">
                  <label className="field-label">
                    ૩. જરૂરી જથ્થો (Required Quantity) *
                  </label>
                  <div className="qty-input-wrapper">
                    <input
                      type="number"
                      className="demand-input qty-input"
                      value={quantityQtl}
                      onChange={(e) => setQuantityQtl(Number(e.target.value))}
                      placeholder="દા.ત. 500"
                      min="10"
                      required
                    />
                    <span className="qty-unit-pill">ક્વિન્ટલ (Quintal)</span>
                    <div className="man-calc-badge">
                      અંદાજે {(quantityQtl * 5).toLocaleString('en-IN')} મણ
                    </div>
                  </div>
                  <label className="small-lot-checkbox">
                    <input
                      type="checkbox"
                      checked={allowSmallLots}
                      onChange={(e) => setAllowSmallLots(e.target.checked)}
                    />
                    <span>નાના ખેડૂતોના ૧૦-૫૦ મણના લૉટ સ્વીકાર્ય</span>
                  </label>
                </div>

                {/* 4. Target Buying Price */}
                <div className="form-field-group">
                  <div className="field-label-row">
                    <label className="field-label">
                      ૪. તમારી ઓફર કિંમત (Target Buying Price per 20kg) *
                    </label>
                    <span className="premium-offer-tag">📈 પ્રીમિયમ ઓફર</span>
                  </div>
                  <div className="price-input-wrapper">
                    <span className="price-currency">₹</span>
                    <input
                      type="number"
                      className="demand-input price-input"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(Number(e.target.value))}
                      placeholder="દા.ત. 1400"
                      required
                    />
                    <span className="price-unit-pill">/ મણ (20kg)</span>
                  </div>
                  <span className="field-meta-info green-info">
                    ℹ️ રાજકોટ યાર્ડ મોડલ ભાવ: ₹૧,૩૪૦ કરતાં +₹{targetPrice - 1340 > 0 ? targetPrice - 1340 : 0} વધુ (ખેડૂતો તરફથી ૮૦% વધુ ઝડપી પ્રતિસાદ મળશે)
                  </span>
                </div>

                {/* 5. Target Locations */}
                <div className="form-field-group">
                  <label className="field-label">
                    ૫. લક્ષિત જિલ્લો અને તાલુકો (Target Locations for Notification) *
                  </label>
                  <p className="field-instruction">
                    તમે પસંદ કરેલા જિલ્લાના રજિસ્ટર્ડ ખેડૂતોને સીધા એલર્ટ જશે:
                  </p>
                  <div className="location-chips-grid">
                    {locationOptions.map((loc) => {
                      const isSelected = selectedLocations.includes(loc.id);
                      return (
                        <button
                          key={loc.id}
                          type="button"
                          className={`location-chip ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleLocationToggle(loc.id)}
                        >
                          {isSelected ? '✓' : '+'} {loc.nameGu} {isSelected && `${loc.count} ખેડૂત`}
                        </button>
                      );
                    })}
                  </div>
                  <span className="reach-summary-text">
                    📢 કુલ {totalReachCount.toLocaleString('en-IN')}+ પ્રમાણિત ખેડૂતો સુધી તમારા ભાવની માહિતી પહોંચશે.
                  </span>
                </div>

                {/* 6. Logistics Type */}
                <div className="form-field-group">
                  <label className="field-label">
                    ૬. ડિલિવરી પ્રકાર અને સુવિધા (Logistics Type) *
                  </label>
                  <div className="logistics-radios-grid">
                    <label
                      className={`logistics-radio-box ${
                        logisticsType === 'farm_gate' ? 'selected' : ''
                      }`}
                      onClick={() => setLogisticsType('farm_gate')}
                    >
                      <input
                        type="radio"
                        name="logistics"
                        value="farm_gate"
                        checked={logisticsType === 'farm_gate'}
                        onChange={() => setLogisticsType('farm_gate')}
                      />
                      <div className="radio-text">
                        <strong>ખેતરેથી સીધો ઉપાડ (Farm Gate Pickup)</strong>
                        <span>ટ્રાન્સપોર્ટ ખર્ચ ખરીદનાર ભોગવશે</span>
                      </div>
                    </label>

                    <label
                      className={`logistics-radio-box ${
                        logisticsType === 'mill_delivery' ? 'selected' : ''
                      }`}
                      onClick={() => setLogisticsType('mill_delivery')}
                    >
                      <input
                        type="radio"
                        name="logistics"
                        value="mill_delivery"
                        checked={logisticsType === 'mill_delivery'}
                        onChange={() => setLogisticsType('mill_delivery')}
                      />
                      <div className="radio-text">
                        <strong>ગોંડલ મિલ/ગોડાઉન પર ડિલિવરી (Mill Delivery)</strong>
                        <span>શ્રી રામ ઓઇલ મિલ, ગોંડલ હાઇવે</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 7. Payment Terms */}
                <div className="form-field-group">
                  <label className="field-label">
                    ૭. ચૂકવણી શરત (Payment Term) *
                  </label>
                  <div className="payment-term-box">
                    <span className="bank-icon">🏛️</span>
                    <input
                      type="text"
                      className="demand-input"
                      value={paymentTerm}
                      onChange={(e) => setPaymentTerm(e.target.value)}
                    />
                  </div>
                  <span className="field-meta-info">
                    APMC નિયમ મુજબ ડિજિટલ સ્લિપ બન્યા પછી સીધા ખેડૂતના ખાતામાં જમા.
                  </span>
                </div>

                {/* 8. Demand Validity */}
                <div className="form-field-group">
                  <label className="field-label">
                    ૮. સમય મર્યાદા (Demand Validity) *
                  </label>
                  <div className="validity-pills-row">
                    <button
                      type="button"
                      className={`validity-pill ${validityDays === '2' ? 'active' : ''}`}
                      onClick={() => setValidityDays('2')}
                    >
                      ૪૮ કલાક (2 Days)
                    </button>
                    <button
                      type="button"
                      className={`validity-pill ${validityDays === '5' ? 'active' : ''}`}
                      onClick={() => setValidityDays('5')}
                    >
                      આગામી ૫ દિવસ માટે સક્રિય
                    </button>
                    <button
                      type="button"
                      className={`validity-pill ${validityDays === '10' ? 'active' : ''}`}
                      onClick={() => setValidityDays('10')}
                    >
                      ૧૦ દિવસ (10 Days)
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button type="submit" className="demand-submit-btn">
                  ▷ ખરીદ જરૂરિયાત લાઈવ કરો અને ખેડૂતોને એલર્ટ મોકલો (Broadcast Demand to Farmers)
                </button>
                <div className="submit-security-note">
                  🔒 આ જરૂરિયાત APMC નિયમો અનુસાર ઇ-માર્કેટમાં તુરંત પ્રસારિત થશે.
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Phone Mockup & Active Demands */}
          <div className="demand-preview-column">
            {/* Top Phone Mockup Box */}
            <div className="preview-card">
              <div className="preview-card-header">
                <div className="preview-title-row">
                  <span className="live-dot">●</span>
                  <h4>ખેડૂતોને આવો SMS/WhatsApp એલર્ટ મળશે</h4>
                </div>
                <span className="preview-pill">લાઈવ પ્રિવ્યૂ</span>
              </div>
              <p className="preview-desc">
                જૂનાગઢ અને રાજકોટના પસંદ કરેલા {totalReachCount.toLocaleString('en-IN')}+ ખેડૂતોના મોબાઇલ પર નીચે મુજબ સીધો મેસેજ મળશે:
              </p>

              {/* Realistic Smartphone Frame */}
              <div className="smartphone-mockup">
                <div className="phone-notch"></div>
                <div className="phone-screen">
                  {/* WhatsApp Header */}
                  <div className="wa-header">
                    <span className="wa-back">←</span>
                    <div className="wa-avatar">KB</div>
                    <div className="wa-header-info">
                      <strong>કિસાન બજાર ઓફિશિયલ</strong>
                      <span>વેરિફાઇડ વેપારી એલર્ટ</span>
                    </div>
                    <span className="wa-menu">⋮</span>
                  </div>

                  {/* WhatsApp Chat Body */}
                  <div className="wa-chat-body">
                    <div className="wa-message-bubble">
                      <div className="wa-bubble-badge">
                        <span>📢 ખરીદ જરૂરિયાત / New Crop Demand</span>
                        <span className="wa-tag-now">હમણાં જ</span>
                      </div>

                      <p className="wa-greeting">નમસ્તે ખેડૂત મિત્રો! 🙏</p>
                      <p className="wa-intro">
                        તમારા વિસ્તારના રજિસ્ટર્ડ ખરીદદાર દ્વારા{' '}
                        <strong>
                          {commodity === 'groundnut'
                            ? 'મગફળી'
                            : commodity === 'cotton'
                            ? 'કપાસ'
                            : commodity === 'cumin'
                            ? 'જીરૂ'
                            : commodity === 'wheat'
                            ? 'ઘઉં'
                            : 'તલ'}
                        </strong>{' '}
                        માટે મોટી ખરીદ ડિમાન્ડ મૂકવામાં આવી છે:
                      </p>

                      <div className="wa-details-box">
                        <div className="wa-detail-row">
                          <span>🌾 પાક/જાત:</span>
                          <strong>
                            {commodity === 'groundnut'
                              ? 'મગફળી'
                              : commodity === 'cotton'
                              ? 'કપાસ'
                              : commodity === 'cumin'
                              ? 'જીરૂ'
                              : commodity === 'wheat'
                              ? 'ઘઉં'
                              : 'તલ'}{' '}
                            - {variety.split('(')[0]}
                          </strong>
                        </div>
                        <div className="wa-detail-row">
                          <span>📦 જથ્થો:</span>
                          <strong>
                            {quantityQtl} ક્વિન્ટલ ({(quantityQtl * 5).toLocaleString('en-IN')} મણ)
                          </strong>
                        </div>
                        <div className="wa-detail-row">
                          <span>💰 ભાવ ઓફર:</span>
                          <strong className="wa-price-gold">
                            ₹{targetPrice?.toLocaleString('en-IN')} / મણ{' '}
                            <span className="wa-sub-rate">(રાજકોટ મોડલ +₹{targetPrice - 1340 > 0 ? targetPrice - 1340 : 50})</span>
                          </strong>
                        </div>
                        <div className="wa-detail-row">
                          <span>📍 ડિલિવરી:</span>
                          <span>
                            {logisticsType === 'mill_delivery'
                              ? 'ગોંડલ મિલ અથવા ખેતરેથી ઉપાડ'
                              : 'ખેતરેથી સીધો ઉપાડ'}
                          </span>
                        </div>
                        <div className="wa-detail-row">
                          <span>💳 પેમેન્ટ:</span>
                          <span>વજન પછી ૨૪ કલાકમાં RTGS બેંક ખાતામાં</span>
                        </div>
                      </div>

                      <p className="wa-validity-note">
                        આ ઓફર આગામી {validityDays} દિવસ સુધી માન્ય છે.
                      </p>

                      {/* Dynamic action buttons in WhatsApp */}
                      <div className="wa-action-buttons">
                        <button
                          type="button"
                          className="wa-btn"
                          onClick={() => toast.success('વેપારી નંબર: +91 98254 12345')}
                        >
                          📞 વેપારી સાથે સીધો સંપર્ક કરો
                        </button>
                        <button
                          type="button"
                          className="wa-btn"
                          onClick={() => toast.success('સ્ટોક વેચવા માટે ખેડૂત ફોર્મ ખુલશે')}
                        >
                          📋 તમારો સ્ટોક વેચવા ઓફર આપો
                        </button>
                      </div>

                      <div className="wa-time-tick">
                        <span>10:42 AM</span>
                        <span className="blue-ticks">✓✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="phone-footer-caption">
                SMS અને WhatsApp બંને દ્વારા {totalReachCount.toLocaleString('en-IN')}+ ખેડૂતોને ડિલિવર થશે.
              </p>
            </div>

            {/* Bottom Active Demands Card */}
            <div className="active-demands-card">
              <div className="active-demands-header">
                <div className="active-demands-title-group">
                  <span className="demands-icon">📋</span>
                  <h4>અગાઉ મૂકેલી સક્રિય માંગણીઓ (Active Demands)</h4>
                </div>
                <span className="active-count-pill">૨ લાઈવ</span>
              </div>

              <div className="demands-list">
                {/* Demand 1 */}
                <div className="demand-item-card">
                  <div className="demand-item-header">
                    <span className="demand-crop-title">શંકર કપાસ (Cotton)</span>
                    <div className="demand-status-group">
                      <span className="demand-status-badge">સક્રિય / ACTIVE</span>
                      <span className="demand-days-left">૨ દિવસ બાકી</span>
                    </div>
                  </div>
                  <div className="demand-item-details">
                    <span>જથ્થો: ૧,૦૦૦ ક્વિન્ટલ</span>
                    <span className="item-sep">|</span>
                    <span>ભાવ: ₹૧,૭૨૦/મણ</span>
                  </div>
                  <div className="demand-item-actions">
                    <span className="offers-received-text">
                      👥 ૮ ખેડૂતોએ ઓફર આપી (Offers Received)
                    </span>
                    <button
                      className="view-offers-btn"
                      onClick={() => navigate('/buyer/messages')}
                    >
                      ઓફર જુઓ ▷
                    </button>
                  </div>
                </div>

                {/* Demand 2 */}
                <div className="demand-item-card">
                  <div className="demand-item-header">
                    <span className="demand-crop-title">જીરૂ (Cumin Seed - Unjha)</span>
                    <div className="demand-status-group">
                      <span className="demand-status-badge">સક્રિય / ACTIVE</span>
                      <span className="demand-days-left">૩ દિવસ બાકી</span>
                    </div>
                  </div>
                  <div className="demand-item-details">
                    <span>જથ્થો: ૨૦૦ ક્વિન્ટલ</span>
                    <span className="item-sep">|</span>
                    <span>ભાવ: ₹૫,૬૦૦/મણ</span>
                  </div>
                  <div className="demand-item-actions">
                    <span className="offers-received-text">
                      💬 ૫ ખેડૂતો સંપર્કમાં (Farmers Connected)
                    </span>
                    <button
                      className="view-offers-btn"
                      onClick={() => navigate('/buyer/messages')}
                    >
                      વાતચીત જુઓ ▷
                    </button>
                  </div>
                </div>
              </div>

              <div className="active-demands-footer">
                <span className="procurement-stat-pill">
                  📈 કુલ સફળ ખરીદી: ૧,૨૪૦ ટન
                </span>
                <button
                  className="all-demands-link"
                  onClick={() => toast.info('બધી ૬ સક્રિય ખરીદ માંગણીઓ લોડ થઈ રહી છે...')}
                >
                  બધી માંગણીઓ જુઓ -&gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
