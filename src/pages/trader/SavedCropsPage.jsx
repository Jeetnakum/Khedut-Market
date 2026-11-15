import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { traderService } from '../../services/traderService';
import toast from 'react-hot-toast';
import './SavedCropsPage.css';

export default function SavedCropsPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [watchlist, setWatchlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('price_changes');
  const [showOnlyDrops, setShowOnlyDrops] = useState(false);

  // Modals
  const [offerModalCrop, setOfferModalCrop] = useState(null);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerQty, setOfferQty] = useState('');
  const [callModalCrop, setCallModalCrop] = useState(null);
  const [showBulkBidModal, setShowBulkBidModal] = useState(false);
  const [showProcurementPlanModal, setShowProcurementPlanModal] = useState(false);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    const list = traderService.getWatchlist();
    setWatchlist(list);
  };

  const handleRemove = (item) => {
    traderService.removeFromWatchlist(item.id);
    loadWatchlist();
    toast.success(`${item.nameGu || item.nameEn} વોચલિસ્ટમાંથી દૂર કરવામાં આવ્યો`, {
      icon: '🗑️',
    });
  };

  const handleOpenOfferModal = (item) => {
    setOfferModalCrop(item);
    setOfferPrice(item.currentPrice || item.oldPrice || 1700);
    setOfferQty('100');
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!offerPrice || !offerQty) {
      toast.error('કૃપા કરીને ભાવ અને જથ્થો દાખલ કરો');
      return;
    }

    const newDeal = traderService.createDealOffer({
      cropId: offerModalCrop.cropId || offerModalCrop.id,
      lotId: `#${offerModalCrop.id}`,
      cropGu: offerModalCrop.nameGu,
      cropEn: offerModalCrop.nameEn,
      commodity: offerModalCrop.commodity,
      grade: offerModalCrop.statusTag || 'Grade A',
      volumeQtl: Number(offerQty),
      volumeMan: Number(offerQty) * 5,
      agreedPriceMan: Number(offerPrice),
      marketRateMan: offerModalCrop.currentPrice || 1700,
      totalDealValue: Number(offerPrice) * Number(offerQty) * 5,
      farmer: {
        name: offerModalCrop.farmerGu,
        village: offerModalCrop.locationGu,
        phone: offerModalCrop.phone || '+91 98254 XXXXX',
        rating: '૪.૯ ★',
      },
      status: 'pending',
    });

    toast.success('તમારી સત્તાવાર ઓફર ખેડૂતને મોકલાઈ ગઈ છે!', { icon: '✅' });
    setOfferModalCrop(null);
    navigate('/buyer/messages');
  };

  const handleExport = () => {
    const headers = 'Lot ID,Crop,Farmer,Location,Price(Rs/Man),Volume,Status\n';
    const rows = watchlist
      .map(
        (c) =>
          `"${c.id}","${c.nameGu}","${c.farmerGu}","${c.locationGu}","${c.currentPrice}","${c.volumeGu}","${c.statusTag}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Watchlist_Export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('વોચલિસ્ટ સફળતાપૂર્વક CSV ફાઇલમાં એક્સપોર્ટ થયું!');
  };

  // Filter logic
  let filtered = watchlist.filter((crop) => {
    // Drop filter
    if (showOnlyDrops && (crop.priceDrop >= 0 || !crop.priceDrop)) {
      return false;
    }
    // Category filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'cotton' && crop.commodity !== 'cotton') return false;
      if (selectedCategory === 'groundnut' && crop.commodity !== 'groundnut') return false;
      if (selectedCategory === 'cumin' && crop.commodity !== 'cumin') return false;
      if (selectedCategory === 'other' && (crop.commodity === 'cotton' || crop.commodity === 'groundnut' || crop.commodity === 'cumin')) return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (crop.nameGu || '').toLowerCase().includes(q) || (crop.nameEn || '').toLowerCase().includes(q);
      const matchFarmer = (crop.farmerGu || '').toLowerCase().includes(q);
      const matchLoc = (crop.locationGu || '').toLowerCase().includes(q);
      const matchLot = (crop.id || '').toLowerCase().includes(q);
      if (!matchName && !matchFarmer && !matchLoc && !matchLot) return false;
    }
    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'price_changes') {
      // price drop first
      return (a.priceDrop || 0) - (b.priceDrop || 0);
    }
    if (sortBy === 'price_asc') {
      return (a.currentPrice || 0) - (b.currentPrice || 0);
    }
    if (sortBy === 'price_desc') {
      return (b.currentPrice || 0) - (a.currentPrice || 0);
    }
    return 0;
  });

  return (
    <div className="saved-crops-page">
      {/* Top Breadcrumb */}
      <div className="saved-breadcrumb-strip">
        <div className="saved-breadcrumb-container">
          <span className="saved-breadcrumb-text">
            🏷️ ખરીદદાર પ્રાયોરિટી વૉચલિસ્ટ (/buyer/saved)
          </span>
          <span className="saved-trader-id">
            ● વેપારી ID: BYR-GJ-94821 (સૌરાષ્ટ્ર ટ્રેડર્સ)
          </span>
        </div>
      </div>

      <div className="saved-main-container">
        {/* Page Title & Top Actions */}
        <div className="saved-title-bar">
          <div className="saved-title-left">
            <h1 className="saved-main-title">
              સેવ કરેલા પાકની યાદી (Saved / Bookmarked Crops Watchlist)
            </h1>
            <p className="saved-main-subtitle">
              વેપારીએ પાછળથી ખરીદવા અથવા ભાવ સરખામણી માટે સાચવી રાખેલા પાક
            </p>
          </div>
          <div className="saved-title-actions">
            <button className="saved-action-btn export-btn" onClick={handleExport}>
              📥 એક્સપોર્ટ (PDF/Excel)
            </button>
            <button
              className="saved-action-btn bulk-bid-btn"
              onClick={() => setShowBulkBidModal(true)}
            >
              🌿 સામૂહિક ઓફર (Bulk Bid)
            </button>
          </div>
        </div>

        {/* Price Drop Alert Banner */}
        <div className="saved-price-drop-banner">
          <div className="saved-banner-left">
            <div className="saved-banner-badge">
              <span className="drop-arrow-icon">📉</span>
              <strong>ભાવ ઘટાડા સૂચના (PRICE DROP)</strong>
              <span className="banner-update-time">તાજી અપડેટ: ૧૨ મિનિટ પહેલાં</span>
            </div>
            <h3 className="saved-banner-headline">
              તમે સેવ કરેલા ૨ પાકના ભાવમાં ખેડૂતે ઘટાડો કર્યો છે! ઝડપથી ઓફર મોકલો.
            </h3>
            <p className="saved-banner-desc">
              સૌરાષ્ટ્ર શંકર-૬ કપાસમાં -₹૨૦/મણ અને જી-૨૦ મગફળીમાં ખેડૂત સીધી વાટાઘાટો માટે ઉપલબ્ધ છે.
            </p>
          </div>
          <div className="saved-banner-right">
            <button
              className={`view-drops-btn ${showOnlyDrops ? 'active-filter' : ''}`}
              onClick={() => setShowOnlyDrops(!showOnlyDrops)}
            >
              {showOnlyDrops ? 'બધા પાક જુઓ' : 'ઘટાડેલા પાક જુઓ (View Drops)'}
            </button>
          </div>
        </div>

        {/* Filter Chips Bar & Search/Sort */}
        <div className="saved-controls-bar">
          <div className="saved-filter-chips">
            <button
              className={`filter-chip ${selectedCategory === 'all' && !showOnlyDrops ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory('all');
                setShowOnlyDrops(false);
              }}
            >
              બધા સેવ કરેલા પાક (૧૮)
            </button>
            <button
              className={`filter-chip ${selectedCategory === 'cotton' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('cotton')}
            >
              કપાસ (૮)
            </button>
            <button
              className={`filter-chip ${selectedCategory === 'groundnut' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('groundnut')}
            >
              મગફળી (૫)
            </button>
            <button
              className={`filter-chip ${selectedCategory === 'cumin' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('cumin')}
            >
              જીરૂ (૩)
            </button>
            <button
              className={`filter-chip ${selectedCategory === 'other' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('other')}
            >
              અન્ય (૨)
            </button>
          </div>

          <div className="saved-search-sort-group">
            <div className="saved-search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="પાક અથવા ખેડૂત શોધો..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="mic-icon" title="વૉઇસ સર્ચ">🎙️</span>
            </div>

            <div className="saved-sort-dropdown">
              <label>સોર્ટ:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="price_changes">ભાવમાં ફેરફાર (Price Changes First)</option>
                <option value="price_asc">સૌથી ઓછો ભાવ</option>
                <option value="price_desc">સૌથી વધુ ભાવ</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Indicator Sub-Row */}
        <div className="saved-status-subrow">
          <div className="saved-status-tags">
            <span className="status-indicator-tag green-dot">
              <span className="dot">●</span> ૪ સક્રિય લૉટ
            </span>
            <span className="status-indicator-tag orange-dot">
              <span className="dot">●</span> ૧ વાટાઘાટો હેઠળ
            </span>
            <span className="status-indicator-tag grey-dot">
              <span className="dot">●</span> ૧ વેચાઈ ગયો (Sold Out)
            </span>
          </div>
          <div className="saved-last-updated-text">
            છેલ્લી તાજી માહિતી: આજે બપોરે ૦૨:૪૫ વાગ્યે
          </div>
        </div>

        {/* Watchlist Cards List */}
        <div className="saved-cards-list">
          {filtered.length === 0 ? (
            <div className="saved-empty-state">
              <div className="empty-icon">🔖</div>
              <h3>કોઈ સાચવેલ પાક મળ્યો નથી</h3>
              <p>તમારા ફિલ્ટર અથવા શોધ માપદંડ બદલીને ફરીથી પ્રયાસ કરો.</p>
              <button
                className="saved-action-btn bulk-bid-btn"
                onClick={() => {
                  setSelectedCategory('all');
                  setShowOnlyDrops(false);
                  setSearchQuery('');
                }}
              >
                બધા પાક ફરીથી જુઓ
              </button>
            </div>
          ) : (
            filtered.map((item) => {
              const isSold = item.statusType === 'sold' || item.id === 'WHT-5501';
              const isPriceDrop = item.priceDrop < 0;
              const isNegotiation = item.statusType === 'negotiation';

              return (
                <div
                  key={item.id}
                  className={`saved-crop-card ${isSold ? 'sold-out-card' : ''} ${
                    isPriceDrop ? 'price-dropped-card' : ''
                  }`}
                >
                  {/* Top Price Slashed Banner if Price Drop */}
                  {isPriceDrop && (
                    <div className="card-top-alert-strip">
                      <span>📉 ભાવ ઘટાડો: -₹૨૦/મણ (PRICE SLASHED)</span>
                    </div>
                  )}

                  <div className="saved-card-body">
                    {/* Left: Thumbnail & Badges */}
                    <div className="saved-card-thumbnail-col">
                      <div className="thumbnail-wrapper">
                        <img
                          src={
                            item.commodity === 'cotton'
                              ? '/crops/cotton.jpg'
                              : item.commodity === 'groundnut'
                              ? '/crops/groundnut.jpg'
                              : item.commodity === 'cumin'
                              ? '/crops/cumin.jpg'
                              : item.commodity === 'wheat'
                              ? '/crops/wheat.jpg'
                              : '/crops/mustard.jpg'
                          }
                          alt={item.nameGu}
                          onError={(e) => {
                            e.target.src =
                              'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=80';
                          }}
                        />
                        {isSold && <span className="sold-overlay-pill">સ્ટોક નથી</span>}
                        {!isSold && (
                          <span className="card-grade-badge">
                            {item.grade || (item.commodity === 'groundnut' ? 'ગ્રેડ A+' : 'ગ્રેડ A')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle: Details & 3-Column Metrics */}
                    <div className="saved-card-details-col">
                      {/* Meta Tags Row */}
                      <div className="card-meta-row">
                        {isSold ? (
                          <span className="badge-tag red-tag">● વેચાઈ ગયો (Sold Out)</span>
                        ) : (
                          <>
                            <span className="badge-tag green-tag">🛡️ વેરિફાઇડ ૭/૧૨ & ૮-અ</span>
                            <span className="badge-tag teal-tag">● સક્રિય સ્ટોક</span>
                          </>
                        )}
                        {isNegotiation && (
                          <span className="badge-tag orange-tag">⚠️ ૧ ઓફર અંડર નેગોશિયેશન</span>
                        )}
                        {item.statusTag && !isSold && !isPriceDrop && (
                          <span className="badge-tag info-tag">{item.statusTag}</span>
                        )}
                      </div>

                      {/* Title & Farmer Info */}
                      <div className="card-title-row">
                        <h2 className={`card-crop-name ${isSold ? 'strikethrough-title' : ''}`}>
                          {item.nameGu}
                        </h2>
                        {isSold && (
                          <span className="sold-time-note">આજે સવારે ૧૧:૩૦ કલાકે સોદો પૂર્ણ</span>
                        )}
                      </div>

                      <div className="card-farmer-info-row">
                        <span className="farmer-name">👤 {item.farmerGu}</span>
                        <span className="farmer-location">📍 {item.locationGu}</span>
                      </div>

                      <div className="card-lot-info-row">
                        <span className="lot-id">લૉટ ID: #{item.id}</span>
                        <span className="quick-spec">{item.quickInfo}</span>
                      </div>

                      {/* 3-Column Metrics Box */}
                      <div className="card-metrics-grid">
                        <div className="metric-box">
                          <span className="metric-label">
                            {isSold ? 'જથ્થો (વેચાયેલ)' : 'ઉપલબ્ધ જથ્થો'}
                          </span>
                          <span className="metric-value-primary">
                            {item.volumeGu?.split('(')[0] || '૩૫૦ ક્વિન્ટલ'}
                          </span>
                          <span className="metric-subtext">
                            {item.volumeGu?.includes('(')
                              ? `(${item.volumeGu.split('(')[1]}`
                              : 'લગભગ ૧,૭૫૦ મણ'}
                          </span>
                        </div>

                        <div className="metric-box highlight-price">
                          <span className="metric-label">
                            {isSold
                              ? 'અંતિમ ભાવ'
                              : isNegotiation
                              ? 'ખેડૂતની માંગણી ભાવ'
                              : 'વર્તમાન ભાવ'}
                          </span>
                          <div className="price-display-wrapper">
                            <span className="metric-value-primary price-val">
                              ₹{item.currentPrice?.toLocaleString('en-IN')}{' '}
                              <span className="price-unit">/મણ</span>
                            </span>
                            {isPriceDrop && (
                              <span className="price-drop-pill">
                                નવો ઘટાડો: -₹૨૦ (જૂનો ભાવ: ₹{item.oldPrice})
                              </span>
                            )}
                            {item.priceDrop > 0 && (
                              <span className="price-rise-pill">
                                +₹{item.priceDrop} (ભાવ વધારો)
                              </span>
                            )}
                            {isSold && (
                              <span className="price-locked-pill">વેચાણ કિંમત લૉક</span>
                            )}
                          </div>
                        </div>

                        <div className="metric-box">
                          <span className="metric-label">
                            {isSold ? 'કુલ ડીલ' : 'કુલ ડીલ મૂલ્ય (APPROX)'}
                          </span>
                          <span className="metric-value-primary total-val">
                            {item.totalValLakh || '₹૩૦.૧૦ લાખ'}
                          </span>
                          <span className="metric-subtext green-sub">
                            {isSold
                              ? 'સમાન નવો સ્ટોક ઉપલબ્ધ છે'
                              : item.commodity === 'groundnut'
                              ? 'પેમેન્ટ શરત: તાત્કાલિક RTGS'
                              : '🚛 તુરંત ડિલિવરી રેડી'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="saved-card-actions-col">
                      {isSold ? (
                        <>
                          <button className="card-btn disabled-btn" disabled>
                            🔒 સોદો પૂર્ણ (ઓફર બંધ)
                          </button>
                          <button
                            className="card-btn secondary-btn"
                            onClick={() => navigate('/buyer/browse')}
                          >
                            🔍 આવો અન્ય માલ શોધો
                          </button>
                        </>
                      ) : isNegotiation ? (
                        <>
                          <button
                            className="card-btn counter-bid-btn"
                            onClick={() => handleOpenOfferModal(item)}
                          >
                            ⚖️ પ્રતિયોગી ઓફર આપો (Counter Offer)
                          </button>
                          <button
                            className="card-btn chat-btn"
                            onClick={() => navigate('/buyer/messages')}
                          >
                            💬 વાતચીત કરો
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="card-btn make-offer-btn"
                            onClick={() => handleOpenOfferModal(item)}
                          >
                            ▷ ઓફર મોકલો (Make Offer)
                          </button>
                          <button
                            className="card-btn call-farmer-btn"
                            onClick={() => setCallModalCrop(item)}
                          >
                            📞 ખેડૂતને કોલ કરો
                          </button>
                        </>
                      )}

                      <button
                        className="card-remove-btn"
                        onClick={() => handleRemove(item)}
                        title="વોચલિસ્ટમાંથી હટાવો"
                      >
                        🗑️ દૂર કરો (Remove)
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Watchlist Portfolio Summary Box */}
        <div className="watchlist-portfolio-summary-bar">
          <div className="summary-bar-icon-box">
            <span className="summary-icon">📊</span>
          </div>
          <div className="summary-bar-text-content">
            <span className="summary-section-label">
              વોચલિસ્ટ કુલ સારાંશ (WATCHLIST PORTFOLIO SUMMARY)
            </span>
            <h2 className="summary-headline">
              કુલ વોચલિસ્ટ જથ્થો: ૧,૨૦૦ ક્વિન્ટલ &nbsp;|&nbsp; અંદાજિત કિંમત: ₹૧.૧૫ કરોડ
            </h2>
            <p className="summary-breakdown-text">
              રાજકોટ, ગોંડલ, ઊંઝા, ભાવનગર અને ધંધૂકા માર્કેટ યાર્ડ વચ્ચે વિભાજિત કુલ ૧૮ સેવ કરેલા પાક.
            </p>
          </div>
          <div className="summary-bar-action">
            <button
              className="plan-procurement-btn"
              onClick={() => setShowProcurementPlanModal(true)}
            >
              📋 ખરીદી યોજના બનાવો (Plan Procurement)
            </button>
          </div>
        </div>

        {/* Trust & Guarantee 3-Card Footer */}
        <div className="saved-trust-footer-grid">
          <div className="trust-feature-card">
            <div className="trust-icon-pill">📜</div>
            <div className="trust-text-block">
              <h4 className="trust-card-title">૭/૧૨ સરકારી જમીન ખરાઈ</h4>
              <p className="trust-card-desc">
                દરેક લૉટ સાથે સાચા ખેડૂતની ખાતરી માટે e-Dhara રેકોર્ડ ચકાસાયેલ છે.
              </p>
            </div>
          </div>

          <div className="trust-feature-card">
            <div className="trust-icon-pill">📲</div>
            <div className="trust-text-block">
              <h4 className="trust-card-title">ભાવ ઘટાડા એલર્ટ (Instant Alerts)</h4>
              <p className="trust-card-desc">
                ખેડૂત ભાવ ઘટાડે ત્યારે વેપારીના WhatsApp પર સીધો મેસેજ મળશે.
              </p>
            </div>
          </div>

          <div className="trust-feature-card">
            <div className="trust-icon-pill">🏢</div>
            <div className="trust-text-block">
              <h4 className="trust-card-title">APMC વેપારી ડેસ્ક</h4>
              <p className="trust-card-desc">
                ટોલ-ફ્રી હેલ્પલાઇન: 1800-543-388 પર સવારે ૮ થી રાત્રે ૮ સહાય ઉપલબ્ધ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL 1: MAKE OFFER / COUNTER OFFER --- */}
      {offerModalCrop && (
        <div className="modal-backdrop" onClick={() => setOfferModalCrop(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                📩 {offerModalCrop.nameGu} માટે સત્તાવાર ઓફર આપો
              </h3>
              <button className="modal-close-btn" onClick={() => setOfferModalCrop(null)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitOffer} className="modal-form">
              <div className="modal-lot-summary">
                <p>
                  <strong>ખેડૂત:</strong> {offerModalCrop.farmerGu} &nbsp;|&nbsp;{' '}
                  <strong>સ્થળ:</strong> {offerModalCrop.locationGu}
                </p>
                <p>
                  <strong>હાલનો ભાવ:</strong> ₹{offerModalCrop.currentPrice} /મણ &nbsp;|&nbsp;{' '}
                  <strong>લૉટ ID:</strong> #{offerModalCrop.id}
                </p>
              </div>

              <div className="form-group">
                <label>તમારો ઓફર ભાવ (₹ / ૨૦ કિગ્રા મણ) *</label>
                <input
                  type="number"
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="દા.ત. 1720"
                  required
                />
              </div>

              <div className="form-group">
                <label>જરૂરી જથ્થો (ક્વિન્ટલ) *</label>
                <input
                  type="number"
                  value={offerQty}
                  onChange={(e) => setOfferQty(e.target.value)}
                  placeholder="દા.ત. 100"
                  required
                />
                <span className="field-hint">
                  = {(Number(offerQty) * 5 || 0).toLocaleString('en-IN')} મણ
                </span>
              </div>

              <div className="modal-calc-preview">
                <span>અંદાજિત કુલ સોદા રકમ:</span>
                <strong>
                  ₹{((Number(offerPrice) || 0) * (Number(offerQty) || 0) * 5).toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setOfferModalCrop(null)}
                >
                  રદ કરો
                </button>
                <button type="submit" className="modal-submit-btn">
                  ઓફર ખેડૂતને મોકલો ▷
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: CALL FARMER --- */}
      {callModalCrop && (
        <div className="modal-backdrop" onClick={() => setCallModalCrop(null)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📞 ખેડૂત સાથે સીધો સંપર્ક</h3>
              <button className="modal-close-btn" onClick={() => setCallModalCrop(null)}>
                ✕
              </button>
            </div>
            <div className="modal-call-body">
              <div className="farmer-badge-card">
                <div className="farmer-avatar-circle">
                  {callModalCrop.farmerGu?.slice(0, 2) || 'ખે'}
                </div>
                <div>
                  <h4>{callModalCrop.farmerGu}</h4>
                  <p>{callModalCrop.locationGu}</p>
                  <span className="verified-pill">🛡️ ૭/૧૨ વેરિફાઇડ ખેડૂત</span>
                </div>
              </div>
              <div className="phone-display-box">
                <span className="phone-label">સત્તાવાર રજિસ્ટર્ડ નંબર:</span>
                <span className="phone-number">{callModalCrop.phone || '+91 98254 78210'}</span>
              </div>
              <div className="modal-call-actions">
                <a
                  href={`tel:${callModalCrop.phone || '+919825478210'}`}
                  className="modal-submit-btn"
                  onClick={() => toast.success('કોલ ડાયલર શરૂ થઈ રહ્યું છે...')}
                >
                  📞 ડાયરેક્ટ કોલ કરો
                </a>
                <a
                  href={`https://wa.me/919825478210?text=${encodeURIComponent(
                    `નમસ્તે ${callModalCrop.farmerGu}, મેં કિસાન બજાર પોર્ટલ પર આપનો ${callModalCrop.nameGu} લૉટ જોયો છે.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="modal-whatsapp-btn"
                >
                  💬 WhatsApp મેસેજ
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: BULK BID MODAL --- */}
      {showBulkBidModal && (
        <div className="modal-backdrop" onClick={() => setShowBulkBidModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🌿 સામૂહિક ઓફર (Bulk Bid - તમામ સક્રિય પાક)</h3>
              <button className="modal-close-btn" onClick={() => setShowBulkBidModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-form">
              <p>
                તમે એકસાથે તમારા વોચલિસ્ટમાં રહેલા તમામ સક્રિય પાક માટે સામૂહિક પ્રપોઝલ મોકલી શકો છો.
              </p>
              <div className="form-group">
                <label>સામૂહિક ઓફર ડિસ્કાઉન્ટ / પ્રીમિયમ</label>
                <select className="modal-select">
                  <option>માર્કેટ ભાવ પર સીધી ખરીદી (Market Rate)</option>
                  <option>-૨% રોકડ તુરંત પેમેન્ટ સાથે</option>
                  <option>+૧% ઉચ્ચ ગુણવત્તા પ્રીમિયમ</option>
                </select>
              </div>
              <div className="form-group">
                <label>વેપારી ટિપ્પણી / નોંધ</label>
                <textarea
                  rows="3"
                  defaultValue="અમે ખેતરેથી સીધો ઉપાડ કરી રોકડ RTGS પેમેન્ટ ૨૪ કલાકમાં કરી આપીશું."
                />
              </div>
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowBulkBidModal(false)}
                >
                  બંધ કરો
                </button>
                <button
                  type="button"
                  className="modal-submit-btn"
                  onClick={() => {
                    toast.success('બધા સક્રિય ખેડૂતોને સામૂહિક ઓફર મોકલાઈ ગઈ છે!', { icon: '🌿' });
                    setShowBulkBidModal(false);
                  }}
                >
                  સામૂહિક ઓફર લાઈવ કરો ▷
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: PROCUREMENT PLAN MODAL --- */}
      {showProcurementPlanModal && (
        <div className="modal-backdrop" onClick={() => setShowProcurementPlanModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📋 ખરીદી યોજના સારાંશ (Procurement Plan)</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowProcurementPlanModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-form">
              <div className="procurement-summary-stats">
                <div className="p-stat">
                  <span>કુલ ટાર્ગેટ લૉટ્સ:</span>
                  <strong>૫ મુખ્ય લૉટ્સ</strong>
                </div>
                <div className="p-stat">
                  <span>કુલ અંદાજિત જથ્થો:</span>
                  <strong>૧,૨૦૦ ક્વિન્ટલ</strong>
                </div>
                <div className="p-stat">
                  <span>જરૂરી મૂડી ભંડોળ:</span>
                  <strong className="green-txt">₹૧.૧૫ કરોડ</strong>
                </div>
              </div>
              <p className="procurement-note">
                આ ખરીદી યોજના તમારા ગોંડલ વેરહાઉસ અને મિલિંગ પ્રોસેસિંગ માટે નિર્ધારિત થયેલ છે.
              </p>
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowProcurementPlanModal(false)}
                >
                  બંધ કરો
                </button>
                <button
                  type="button"
                  className="modal-submit-btn"
                  onClick={() => {
                    toast.success('ખરીદી યોજના PDF સ્વરૂપે સેવ થઈ ગઈ છે!', { icon: '📋' });
                    setShowProcurementPlanModal(false);
                  }}
                >
                  પ્લાન મંજૂર કરો અને ડાઉનલોડ કરો ▷
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
