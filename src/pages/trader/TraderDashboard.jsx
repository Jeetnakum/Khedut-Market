import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import traderService from '../../services/traderService';
import './TraderDashboard.css';

const TraderDashboard = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { user } = useAuth();

  const [profile, setProfile] = useState(() => traderService.getProfile());
  const [deals, setDeals] = useState(() => traderService.getDeals());
  const [demands, setDemands] = useState(() => traderService.getDemands());
  const [watchlistCount, setWatchlistCount] = useState(() => traderService.getWatchlist().length);
  const [activeTab, setActiveTab] = useState('all'); // all, counter, pending

  // Upload weight slip modal state
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState(null);
  const [slipWeight, setSlipWeight] = useState('348.5');
  const [slipNumber, setSlipNumber] = useState('WB-GND-44102');

  useEffect(() => {
    setProfile(traderService.getProfile());
    setDeals(traderService.getDeals());
    setDemands(traderService.getDemands());
    setWatchlistCount(traderService.getWatchlist().length);
  }, []);

  // Filter deals based on activeTab
  const filteredDeals = deals.filter((deal) => {
    if (activeTab === 'counter') return deal.status === 'counter';
    if (activeTab === 'pending') return deal.status === 'pending';
    return true; // all
  });

  const handleAcceptCounter = (dealId, price) => {
    traderService.updateDealStatus(dealId, {
      status: 'accepted',
      statusGu: 'સ્વીકારેલ (Accepted)',
      agreedPriceMan: price,
      badgeType: 'green',
    });
    setDeals(traderService.getDeals());
    toast.success(
      lang === 'gu'
        ? `✅ કાઉન્ટર ભાવ ₹${price}/મણ સ્વીકારી લેવાયો છે! ડીલ કન્ફર્મ થઈ.`
        : `✅ Counter price ₹${price}/man accepted! Deal confirmed.`
    );
  };

  const handleCancelOffer = (dealId) => {
    traderService.updateDealStatus(dealId, {
      status: 'cancelled',
      statusGu: 'રદ કરેલ (Cancelled)',
      badgeType: 'gray',
    });
    setDeals(traderService.getDeals());
    toast.success(lang === 'gu' ? 'ઓફર સફળતાપૂર્વક રદ કરવામાં આવી.' : 'Offer cancelled successfully.');
  };

  const handleUploadSlip = (e) => {
    e.preventDefault();
    if (selectedDealId) {
      traderService.updateDealStatus(selectedDealId, {
        weighSlipUploaded: true,
        weighSlipNumber: slipNumber,
        actualWeightQtl: Number(slipWeight),
      });
      setDeals(traderService.getDeals());
      setShowSlipModal(false);
      toast.success(
        lang === 'gu'
          ? `⚖️ સરકારી ધર્મકાંટા સ્લિપ (${slipNumber}) સફળતાપૂર્વક અપલોડ થઈ!`
          : `⚖️ Official weighbridge slip (${slipNumber}) uploaded successfully!`
      );
    }
  };

  return (
    <div className="td-page">
      {/* 1. Header Profile Banner matching PDF Page 2 */}
      <div className="td-company-banner">
        <div className="td-cb-left">
          <div className="td-factory-icon">🏭</div>
          <div className="td-cb-info">
            <div className="td-cb-title-row">
              <h1 className="td-cb-name">{profile.companyNameGu}</h1>
              <span className="td-badge-verified">✓ વેરિફાઇડ વેપારી/બાયર</span>
            </div>
            <p className="td-cb-prop">સંચાલક: <strong>{profile.proprietor}</strong></p>
            <div className="td-cb-meta-pills">
              <span className="td-meta-pill">📋 APMC લાયસન્સ નં: <strong>{profile.tagline?.match(/#[A-Z0-9-]+/)?.[0] || '#RJT-421'}</strong> (રાજકોટ &amp; ગોંડલ યાર્ડ માન્ય)</span>
              <span className="td-meta-pill text-green">🛡️ 7/12 &amp; 8-A બાયર વેરિફિકેશન પૂર્ણ</span>
            </div>
          </div>
        </div>

        {/* 4 Action Buttons on Top Right */}
        <div className="td-cb-actions">
          <Link to="/buyer/post-demand" className="td-btn-post-demand">
            + ખરીદ જરૂરિયાત મૂકો (Post Demand)
          </Link>
          <Link to="/buyer/browse" className="td-btn-browse">
            બલ્ક પાક શોધો (Browse Bulk Crops)
          </Link>
          <Link to="/prices" className="td-btn-rates">
            📈 લાઈવ APMC યાર્ડ રેટ્સ
          </Link>
          <Link to="/buyer/messages" className="td-btn-dealroom">
            💬 ખેડૂત ડીલ રૂમ (Deal Room)
          </Link>
        </div>
      </div>

      {/* 2. Four Metrics / Stats Row */}
      <div className="td-metrics-row">
        <div className="td-metric-card">
          <div className="td-mc-top">
            <span className="td-mc-title">કુલ ખરીદેલ જથ્થો (Procured Volume)</span>
            <span className="td-mc-icon">⏳</span>
          </div>
          <div className="td-mc-val">૧૪,૫૦૦ ક્વિન્ટલ</div>
          <div className="td-mc-sub text-green">↑ +૧૨% આ મહિને ગત માસ કરતા વધારે</div>
        </div>

        <div className="td-metric-card">
          <div className="td-mc-top">
            <span className="td-mc-title">સક્રિય ડીલ ઓફર્સ (Active Deals)</span>
            <span className="td-mc-icon">🤝</span>
          </div>
          <div className="td-mc-val">૬ ચાલુ સોદા</div>
          <div className="td-mc-sub text-gold">૩ ખેડૂત પ્રત્યુત્તરની રાહમાં</div>
        </div>

        <div className="td-metric-card">
          <div className="td-mc-top">
            <span className="td-mc-title">સેવ કરેલા પાક (Bookmarked Crops)</span>
            <span className="td-mc-icon">🔖</span>
          </div>
          <div className="td-mc-val">{watchlistCount} પાક વોચલિસ્ટમાં</div>
          <div className="td-mc-sub text-green">૪ નવા લોટ્સ આજે ૧૫ મિનિટ પહેલાં ઉમેરાયા</div>
        </div>

        <div className="td-metric-card">
          <div className="td-mc-top">
            <span className="td-mc-title">માસિક ટ્રેડિંગ રકમ (Procurement Spend)</span>
            <span className="td-mc-icon">💳</span>
          </div>
          <div className="td-mc-val">₹૧.૮૫ કરોડ</div>
          <div className="td-mc-sub text-green">✓ સરેરાશ ચૂકવણી સમય ૨૪ કલાક</div>
        </div>
      </div>

      {/* 3. Main Dashboard Layout (Split) */}
      <div className="td-main-layout">
        {/* ================= LEFT MAIN ================= */}
        <div className="td-layout-left">
          {/* Active Negotiations & Offers Section */}
          <div className="td-card td-deals-card">
            <div className="td-deals-head">
              <div className="td-dh-title">
                <span className="td-head-icon">📢</span>
                <h2>તાજા ડીલ પ્રપોઝલ્સ અને સ્ટેટસ (Active Negotiations &amp; Offers)</h2>
              </div>
              {/* Filter Tabs matching PDF */}
              <div className="td-deal-tabs">
                <button
                  type="button"
                  className={`td-dtab ${activeTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  તમામ ({deals.length})
                </button>
                <button
                  type="button"
                  className={`td-dtab ${activeTab === 'counter' ? 'active' : ''}`}
                  onClick={() => setActiveTab('counter')}
                >
                  કાઉન્ટર ઓફર ({deals.filter((d) => d.status === 'counter').length})
                </button>
                <button
                  type="button"
                  className={`td-dtab ${activeTab === 'pending' ? 'active' : ''}`}
                  onClick={() => setActiveTab('pending')}
                >
                  પેન્ડિંગ ({deals.filter((d) => d.status === 'pending').length})
                </button>
              </div>
            </div>
            <p className="td-dh-sub">ખેડૂતો સાથે ચાલી રહેલી લાઇવ વાતચીત, રેટ કાઉન્ટર અને વેરિફાઇડ લોટ બિલિંગ</p>

            {/* List of Deals */}
            <div className="td-deals-list">
              {filteredDeals.map((deal) => (
                <div key={deal.id} className="td-deal-item-card">
                  {/* Top Bar of Item */}
                  <div className="td-di-top">
                    <div className="td-di-farmer">
                      <span className="td-di-avatar">{deal.farmer?.avatar || 'ખ'}</span>
                      <div>
                        <strong className="td-di-name">{deal.farmer?.name}</strong>
                        <span className="td-di-loc">({deal.farmer?.village || 'ગુજરાત'})</span>
                      </div>
                    </div>
                    <span className={`td-di-status-badge badge-${deal.badgeType}`}>
                      {deal.statusGu}
                    </span>
                  </div>

                  {/* Crop details */}
                  <div className="td-di-crop-row">
                    <span className="td-di-crop-name">{deal.cropGu} @ <strong>₹{deal.agreedPriceMan || deal.traderBidMan}/મણ</strong></span>
                    {deal.counterDiff && (
                      <span className="td-di-diff-badge">{deal.counterDiff}</span>
                    )}
                  </div>

                  {/* Status Pills */}
                  <div className="td-di-pills">
                    <span className="td-di-pill">📌 લોટ ID: <strong>{deal.lotId || deal.id}</strong></span>
                    {deal.status === 'accepted' && (
                      <span className="td-di-pill text-green">✓ ખેડૂત દ્વારા સ્વીકારાયેલ - વેઇટ સ્લિપ પેન્ડિંગ</span>
                    )}
                    {deal.milestones?.[2]?.time && (
                      <span className="td-di-pill text-gold">⏰ ધર્મકાંટા પહોંચ: {deal.milestones[2].time}</span>
                    )}
                  </div>

                  {/* Counter Offer Highlight Box if counter */}
                  {deal.status === 'counter' && (
                    <div className="td-counter-box">
                      <p className="td-cb-text">
                        📢 <strong>ખેડૂતે કાઉન્ટર ઓફર મોકલી છે:</strong> ₹{deal.farmerCounterMan}/મણ (ઊંઝા APMC ભાવ આધારિત)
                      </p>
                      <span className="td-cb-expiry">⏱️ ઓફર સમાપ્તિ: {deal.expiryTime || 'આજે સાંજે ૫:૦૦ વાગ્યા સુધી'}</span>
                    </div>
                  )}

                  {/* Milestone Progress Bar for Accepted Deal */}
                  {deal.status === 'accepted' && (
                    <div className="td-progress-track">
                      <div className="td-pt-step done">
                        <span className="td-pt-dot">✓</span>
                        <span className="td-pt-label">ભાવ સહમતિ</span>
                      </div>
                      <div className="td-pt-line done"></div>
                      <div className="td-pt-step active">
                        <span className="td-pt-dot">●</span>
                        <span className="td-pt-label">વાહન રવાના</span>
                      </div>
                      <div className="td-pt-line"></div>
                      <div className="td-pt-step">
                        <span className="td-pt-dot">○</span>
                        <span className="td-pt-label">તોલમાપ (Ginning Entry)</span>
                      </div>
                      <div className="td-pt-line"></div>
                      <div className="td-pt-step">
                        <span className="td-pt-dot">○</span>
                        <span className="td-pt-label">RTGS ચૂકવણી</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons Row */}
                  <div className="td-di-actions">
                    {deal.status === 'accepted' && (
                      <>
                        <button
                          type="button"
                          className="td-btn-upload-slip"
                          onClick={() => {
                            setSelectedDealId(deal.id);
                            setShowSlipModal(true);
                          }}
                        >
                          📄 {deal.weighSlipUploaded ? '✓ સ્લિપ અપલોડ થયેલ' : 'વેઇટ સ્લિપ અપલોડ'}
                        </button>
                        <button
                          type="button"
                          className="td-btn-wa"
                          onClick={() => navigate('/buyer/messages')}
                        >
                          💬 ખેડૂત સંપર્ક (WhatsApp / ચેટ)
                        </button>
                      </>
                    )}

                    {deal.status === 'counter' && (
                      <>
                        <button
                          type="button"
                          className="td-btn-accept"
                          onClick={() => handleAcceptCounter(deal.id, deal.farmerCounterMan)}
                        >
                          ✓ સ્વીકારો (Accept ₹{deal.farmerCounterMan})
                        </button>
                        <button
                          type="button"
                          className="td-btn-counter"
                          onClick={() => navigate('/buyer/messages')}
                        >
                          ✏️ નવો ભાવ આપો
                        </button>
                        <a href={`tel:${deal.farmer?.phone || '9825478210'}`} className="td-btn-call">
                          📞 કૉલ કરો
                        </a>
                      </>
                    )}

                    {deal.status === 'pending' && (
                      <>
                        <button
                          type="button"
                          className="td-btn-edit"
                          onClick={() => navigate(`/buyer/crop/${deal.cropId}`)}
                        >
                          ✏️ ઓફર સંશોધન
                        </button>
                        <button
                          type="button"
                          className="td-btn-cancel"
                          onClick={() => handleCancelOffer(deal.id)}
                        >
                          ✕ રદ કરો
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Link to Deal Room */}
            <div className="td-deals-footer">
              <Link to="/buyer/messages" className="td-link-all-deals">
                તમામ ૬ ડીલ રૂમ હિસ્ટ્રી જુઓ →
              </Link>
            </div>
          </div>

          {/* Active Demands Section matching PDF Page 2 */}
          <div className="td-card td-demands-card">
            <div className="td-card-head">
              <div className="td-card-title">
                <span className="td-head-icon">📋</span>
                <h2>તમારી માંગણીઓ (Active Demands)</h2>
              </div>
              <span className="td-badge-green">૨ માંગણીઓ સક્રિય</span>
            </div>
            <p className="td-dh-sub">તમે મૂકેલી ખરીદ જરૂરિયાતો જેના પર ખેડૂતો અરજી કરી શકે છે</p>

            <div className="td-demands-grid">
              {demands.slice(0, 2).map((demand) => (
                <div key={demand.id} className="td-demand-mini-card">
                  <div className="td-dmc-head">
                    <strong className="td-dmc-title">{demand.cropGu}</strong>
                    <span className="td-dmc-tag">ખુલ્લી જરૂરિયાત</span>
                  </div>
                  <div className="td-dmc-details">
                    <p>📦 <strong>જથ્થો:</strong> {demand.qtyQtl} ક્વિન્ટલ (ન્યૂનતમ: {demand.minLotQtl} ક્વિન્ટલ)</p>
                    <p>💰 <strong>ટાર્ગેટ પ્રાઇસ:</strong> <span className="text-green font-bold">{demand.targetPriceDisplay}</span></p>
                    <p>📍 <strong>સ્થાન:</strong> {demand.districts?.join(', ')}</p>
                  </div>
                  <div className="td-dmc-footer">
                    <span className="text-gold font-bold">{demand.responsesNote}</span>
                    <Link to="/buyer/post-demand" className="td-dmc-link">
                      અરજીઓ જુઓ →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDEBAR ================= */}
        <div className="td-layout-right">
          {/* Quick Crop Availability Alerts (>100 Qtl) */}
          <div className="td-card td-alerts-card">
            <div className="td-card-head">
              <div className="td-card-title">
                <span className="td-head-icon">⚡</span>
                <h2>ઝડપી પાક ઉપલબ્ધતા એલર્ટ</h2>
              </div>
            </div>
            <p className="td-dh-sub">Crops Matching Your Interest (&gt;100 Qtl)</p>

            <div className="td-alerts-list">
              <div className="td-alert-item">
                <span className="td-ai-hub">રાજકોટ યાર્ડ નજીક • ૧૦ મિનિટ પહેલાં</span>
                <div className="td-ai-main">
                  <div>
                    <strong className="td-ai-crop">શંકર-૬ કપાસ (Cotton Bales)</strong>
                    <span className="td-ai-qty">જથ્થો: ૨૨૦ ક્વિન્ટલ • વિઠ્ઠલભાઈ</span>
                  </div>
                  <div className="text-right">
                    <span className="td-ai-price">₹૧,૭૧૦/મણ</span>
                    <button
                      type="button"
                      className="td-btn-mini-offer"
                      onClick={() => navigate('/buyer/crop/LOT-KB-9042')}
                    >
                      ઓફર આપો
                    </button>
                  </div>
                </div>
              </div>

              <div className="td-alert-item">
                <span className="td-ai-hub">ગોંડલ સેન્ટર • ૩૫ મિનિટ પહેલાં</span>
                <div className="td-ai-main">
                  <div>
                    <strong className="td-ai-crop">G-20 મગફળી (Groundnut Bold)</strong>
                    <span className="td-ai-qty">જથ્થો: ૧૬૫ ક્વિન્ટલ • પોપટભાઈ</span>
                  </div>
                  <div className="text-right">
                    <span className="td-ai-price">₹૧,૩૮૫/મણ</span>
                    <button
                      type="button"
                      className="td-btn-mini-offer"
                      onClick={() => navigate('/buyer/crop/GND-4081')}
                    >
                      ઓફર આપો
                    </button>
                  </div>
                </div>
              </div>

              <div className="td-alert-item">
                <span className="td-ai-hub">જામનગર બેલ્ટ • ૧ કલાક પહેલાં</span>
                <div className="td-ai-main">
                  <div>
                    <strong className="td-ai-crop">જીરૂં શુદ્ધ (Cumin Seed Bulk)</strong>
                    <span className="td-ai-qty">જથ્થો: ૧૪૦ બોરી (~૧૫૦ Qtl) • ભગવાનભાઈ</span>
                  </div>
                  <div className="text-right">
                    <span className="td-ai-price">₹૫,૩૮૦/મણ</span>
                    <button
                      type="button"
                      className="td-btn-mini-offer"
                      onClick={() => navigate('/buyer/crop/UNJ-9124')}
                    >
                      ઓફર આપો
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="td-alerts-footer">
              <Link to="/buyer/browse" className="td-link-all-lots">
                બધા ૨૪ નવા લોટ્સ જુઓ →
              </Link>
            </div>
          </div>

          {/* Government Mandi Benchmark Table matching PDF Page 2 */}
          <div className="td-card td-mandi-card">
            <div className="td-card-head">
              <div className="td-card-title">
                <span className="td-head-icon">📊</span>
                <h2>સરકારી મંડી કિંમત સરખામણી</h2>
              </div>
            </div>
            <p className="td-dh-sub">Live Yard Rates vs APMC Benchmark</p>

            <div className="td-mandi-tables">
              {/* Cotton Row */}
              <div className="td-mandi-box">
                <div className="td-mb-head">
                  <strong>રાજકોટ યાર્ડ (શંકર-૬ કપાસ)</strong>
                  <span className="td-mb-trend text-green">▲ તેજી (+₹૩૫)</span>
                </div>
                <div className="td-mb-range">
                  રેન્જ (પ્રતિ મણ): <strong>₹૧,૬૮૦ - ₹૧,૭૪૦</strong>
                </div>
                <div className="td-mb-mini-stats">
                  <span>નીચો: ₹૧,૬૬૦</span>
                  <span>મોડલ: <strong>₹૧,૭૧૫</strong></span>
                  <span>ઊંચો: ₹૧,૭૪૦</span>
                </div>
              </div>

              {/* Groundnut Row */}
              <div className="td-mandi-box">
                <div className="td-mb-head">
                  <strong>ગોંડલ યાર્ડ (G-20 મગફળી)</strong>
                  <span className="td-mb-trend text-green">▲ સ્થિર (+₹૧૦)</span>
                </div>
                <div className="td-mb-range">
                  રેન્જ (પ્રતિ મણ): <strong>₹૧,૩૨૦ - ₹૧,૪૧૦</strong>
                </div>
                <div className="td-mb-mini-stats">
                  <span>નીચો: ₹૧,૩૨૦</span>
                  <span>મોડલ: <strong>₹૧,૩૭૦</strong></span>
                  <span>ઊંચો: ₹૧,૪૧૦</span>
                </div>
              </div>
            </div>

            {/* Note banner */}
            <div className="td-mandi-footer-note">
              <span>🌾 <strong>જીનિંગ ગેટ પાસ સુવિધા:</strong> સોદો થતાં APMC ઇ-પરમિટ અને પરવાના પહોંચ ડિજિટલ રીતે જનરેટ થશે.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Upload Weighbridge Slip */}
      {showSlipModal && (
        <div className="td-modal-overlay" onClick={() => setShowSlipModal(false)}>
          <div className="td-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="td-modal-header">
              <h3>📄 સરકારી ધર્મકાંટા વેઇટ સ્લિપ અપલોડ કરો</h3>
              <button
                type="button"
                className="td-modal-close"
                onClick={() => setShowSlipModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleUploadSlip} className="td-modal-form">
              <div className="td-mf-group">
                <label>સ્લિપ નંબર (Weighbridge Serial #):</label>
                <input
                  type="text"
                  value={slipNumber}
                  onChange={(e) => setSlipNumber(e.target.value)}
                  className="td-mf-input"
                  required
                />
              </div>
              <div className="td-mf-group">
                <label>વાસ્તવિક નેટ વજન (Net Weight in Quintals):</label>
                <input
                  type="number"
                  step="0.1"
                  value={slipWeight}
                  onChange={(e) => setSlipWeight(e.target.value)}
                  className="td-mf-input"
                  required
                />
              </div>
              <div className="td-mf-dropzone">
                <span className="td-dz-icon">📷</span>
                <p>ધર્મકાંટા સ્લિપનો સ્પષ્ટ ફોટો અથવા PDF અહીં અપલોડ કરો</p>
                <small>માન્ય ફોર્મેટ: JPG, PNG, PDF (મહત્તમ ૫ MB)</small>
              </div>
              <div className="td-modal-actions">
                <button
                  type="button"
                  className="td-btn-cancel"
                  onClick={() => setShowSlipModal(false)}
                >
                  રદ કરો
                </button>
                <button type="submit" className="td-btn-confirm-upload">
                  ✓ સ્લિપ સેવ અને કન્ફર્મ કરો
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TraderDashboard;
