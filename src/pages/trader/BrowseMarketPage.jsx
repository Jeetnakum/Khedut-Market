import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import traderService from '../../services/traderService';
import './BrowseMarketPage.css';

const BrowseMarketPage = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { user } = useAuth();

  // Load crops from traderService
  const [crops, setCrops] = useState(() => traderService.getCrops());
  const [watchlist, setWatchlist] = useState(() => traderService.getWatchlist());

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMinVolume, setSelectedMinVolume] = useState('100'); // 100, 250, 500, 1000
  const [certifications, setCertifications] = useState({
    land712: true,
    moistureLab: false,
    npopOrganic: false,
    singleFarm: false,
  });
  const [harvestDate, setHarvestDate] = useState('all'); // all, 15days, month, godown
  const [districts, setDistricts] = useState({
    Rajkot: true,
    Gondal: true,
    Jamnagar: false,
    Mehsana: false,
    Amreli: false,
    Banaskantha: false,
  });
  const [weighment, setWeighment] = useState({
    farm: true,
    apmc: true,
  });
  const [sortBy, setSortBy] = useState('qty_desc'); // qty_desc, price_asc, price_desc, latest

  // Quick Offer Modal
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [quickOfferPrice, setQuickOfferPrice] = useState(1700);
  const [quickVolume, setQuickVolume] = useState(350);

  // Toggle watchlist helper
  const handleToggleBookmark = (crop) => {
    const isSaved = traderService.isInWatchlist(crop.id);
    if (isSaved) {
      traderService.removeFromWatchlist(crop.id);
      setWatchlist(traderService.getWatchlist());
      toast.success(lang === 'gu' ? 'વોચલિસ્ટમાંથી દૂર કર્યો' : 'Removed from Watchlist');
    } else {
      traderService.addToWatchlist(crop);
      setWatchlist(traderService.getWatchlist());
      toast.success(lang === 'gu' ? '⭐ પાક વોચલિસ્ટમાં સેવ થયો!' : '⭐ Crop saved to Watchlist!');
    }
  };

  const handleResetFilters = () => {
    setSelectedMinVolume('100');
    setCertifications({ land712: false, moistureLab: false, npopOrganic: false, singleFarm: false });
    setHarvestDate('all');
    setDistricts({ Rajkot: false, Gondal: false, Jamnagar: false, Mehsana: false, Amreli: false, Banaskantha: false });
    setWeighment({ farm: false, apmc: false });
    setSearchQuery('');
    setSortBy('qty_desc');
    toast.success(lang === 'gu' ? 'ફિલ્ટર્સ રીસેટ કર્યા' : 'Filters reset');
  };

  // Filter & Sort Logic
  const filteredCrops = useMemo(() => {
    let result = [...crops];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.nameGu?.toLowerCase().includes(q) ||
          c.nameEn?.toLowerCase().includes(q) ||
          c.farmer?.name?.toLowerCase().includes(q) ||
          c.farmer?.district?.toLowerCase().includes(q)
      );
    }

    // Minimum Volume
    if (selectedMinVolume) {
      const minV = Number(selectedMinVolume);
      result = result.filter((c) => (c.volumeQtl || 0) >= minV);
    }

    // Certifications
    if (certifications.npopOrganic) {
      result = result.filter((c) => c.gradeTag?.includes('Organic') || c.grade?.includes('Organic'));
    }

    // District filters if any selected
    const activeDistricts = Object.keys(districts).filter((d) => districts[d]);
    if (activeDistricts.length > 0) {
      result = result.filter((c) =>
        activeDistricts.some((ad) =>
          c.farmer?.district?.includes(ad) ||
          c.farmer?.taluka?.includes(ad) ||
          c.nameGu?.includes(ad)
        )
      );
    }

    // Sorting
    if (sortBy === 'qty_desc') {
      result.sort((a, b) => (b.volumeQtl || 0) - (a.volumeQtl || 0));
    } else if (sortBy === 'price_asc') {
      result.sort((a, b) => (a.farmerAskMan || 0) - (b.farmerAskMan || 0));
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => (b.farmerAskMan || 0) - (a.farmerAskMan || 0));
    } else if (sortBy === 'latest') {
      result.sort((a, b) => (a.daysListed || 0) - (b.daysListed || 0));
    }

    return result;
  }, [crops, searchQuery, selectedMinVolume, certifications, districts, sortBy]);

  const handleOpenQuickOffer = (crop) => {
    setSelectedCrop(crop);
    setQuickOfferPrice(crop.farmerAskMan ? crop.farmerAskMan - 20 : 1700);
    setQuickVolume(crop.volumeQtl || 350);
    setShowOfferModal(true);
  };

  const handleSubmitQuickOffer = (e) => {
    e.preventDefault();
    if (selectedCrop) {
      traderService.createDealOffer({
        cropId: selectedCrop.id,
        lotId: `#${selectedCrop.id}`,
        cropGu: selectedCrop.nameGu,
        cropEn: selectedCrop.nameEn,
        commodity: selectedCrop.commodity,
        grade: selectedCrop.grade,
        volumeQtl: quickVolume,
        offerPriceMan: quickOfferPrice,
        farmerAskMan: selectedCrop.farmerAskMan,
        farmer: selectedCrop.farmer,
      });
      setShowOfferModal(false);
      toast.success(
        lang === 'gu'
          ? `✅ ઑફર ₹${quickOfferPrice}/મણ સફળતાપૂર્વક મોકલાઈ!`
          : `✅ Offer of ₹${quickOfferPrice}/man submitted!`
      );
      navigate('/buyer/messages');
    }
  };

  return (
    <div className="bmp-page">
      {/* 1. Header Banner matching PDF Page 3 */}
      <div className="bmp-header">
        <div className="bmp-sub-bread">
          B2B બલ્ક ટ્રેડિંગ પોર્ટલ (B2B Bulk Crop Procurement Engine) / <span>મિલર્સ અને પ્રોસેસર્સ માટે વિશેષ</span>
        </div>
        <div className="bmp-title-bar">
          <div className="bmp-title-left">
            <h1 className="bmp-title">મોટા જથ્થામાં પાક બજાર (Bulk Crop Marketplace)</h1>
            <span className="bmp-tag-verified">લાઇવ વેરિફાઇડ લોટ્સ</span>
          </div>
          <div className="bmp-top-stats">
            <span className="bmp-stat-pill">📦 કુલ ઉપલબ્ધ જથ્થો: <strong>૪૮,૫૦૦+ ક્વિન્ટલ</strong></span>
            <span className="bmp-stat-pill text-green">✓ પ્રમાણિત ખેડૂતો: <strong>૭/૧૨ &amp; ૮-અ માન્ય</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Top Summary & Sort Strip */}
      <div className="bmp-action-strip">
        <div className="bmp-count-wrap">
          <span className="bmp-count-dot"></span>
          <strong className="bmp-count-num">૩૪૮</strong>
          <span className="bmp-count-text">બલ્ક લિસ્ટિંગ્સ ઉપલબ્ધ (Bulk Listings Active)</span>
        </div>

        {/* Search Input Box */}
        <div className="bmp-search-box">
          <span className="bmp-sb-icon">🔍</span>
          <input
            type="text"
            placeholder="પાક, ખેડૂત અથવા યાર્ડ શોધો..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bmp-sb-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="bmp-sb-clear"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="bmp-sort-wrap">
          <label htmlFor="bmpSort">ક્રમ ગોઠવો (Sort By):</label>
          <select
            id="bmpSort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bmp-sort-select"
          >
            <option value="qty_desc">જથ્થો: વધુથી ઓછો (Highest Qty)</option>
            <option value="price_asc">ભાવ: ઓછાથી વધુ (Price Low to High)</option>
            <option value="price_desc">ભાવ: વધુથી ઓછો (Price High to Low)</option>
            <option value="latest">તાજા લિસ્ટિંગ્સ (Latest Added)</option>
          </select>
        </div>
      </div>

      {/* 3. Main Split Layout (Sidebar + Listings) */}
      <div className="bmp-layout">
        {/* ================= LEFT SIDEBAR: FILTERS ================= */}
        <aside className="bmp-sidebar">
          <div className="bmp-sb-header">
            <h3>બલ્ક ફિલ્ટર્સ (Filters)</h3>
            <button
              type="button"
              className="bmp-btn-reset"
              onClick={handleResetFilters}
            >
              રીસેટ કરો
            </button>
          </div>

          {/* Section 1: Bulk Quantity */}
          <div className="bmp-filter-sec">
            <h4 className="bmp-fs-title">જથ્થો (Bulk Quantity) <small className="text-muted">ક્વિન્ટલ</small></h4>
            <div className="bmp-radio-group">
              <label className={`bmp-radio-item ${selectedMinVolume === '100' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="volume"
                  value="100"
                  checked={selectedMinVolume === '100'}
                  onChange={() => setSelectedMinVolume('100')}
                />
                <span className="bmp-opt-dot"></span>
                <span className="bmp-opt-text">૧૦૦+ ક્વિન્ટલથી વધુ</span>
                <span className="bmp-opt-tag">પસંદ કરેલ</span>
              </label>

              <label className={`bmp-radio-item ${selectedMinVolume === '250' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="volume"
                  value="250"
                  checked={selectedMinVolume === '250'}
                  onChange={() => setSelectedMinVolume('250')}
                />
                <span className="bmp-opt-dot"></span>
                <span className="bmp-opt-text">૨૫૦+ ક્વિન્ટલ</span>
                <span className="bmp-opt-badge">૧૪૪ લોટ</span>
              </label>

              <label className={`bmp-radio-item ${selectedMinVolume === '500' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="volume"
                  value="500"
                  checked={selectedMinVolume === '500'}
                  onChange={() => setSelectedMinVolume('500')}
                />
                <span className="bmp-opt-dot"></span>
                <span className="bmp-opt-text">૫૦૦+ ક્વિન્ટલ</span>
                <span className="bmp-opt-badge">૬૮ લોટ</span>
              </label>

              <label className={`bmp-radio-item ${selectedMinVolume === '1000' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="volume"
                  value="1000"
                  checked={selectedMinVolume === '1000'}
                  onChange={() => setSelectedMinVolume('1000')}
                />
                <span className="bmp-opt-dot"></span>
                <span className="bmp-opt-text">૧૦૦૦+ ક્વિન્ટલ</span>
                <span className="bmp-opt-badge">૧૯ લોટ</span>
              </label>
            </div>
          </div>

          {/* Section 2: Certification & Lab Testing */}
          <div className="bmp-filter-sec">
            <h4 className="bmp-fs-title">સર્ટિફિકેશન / લેબ ટેસ્ટિંગ</h4>
            <div className="bmp-checkbox-group">
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={certifications.land712}
                  onChange={(e) => setCertifications({ ...certifications, land712: e.target.checked })}
                />
                <span>✓ ૭/૧૨ વેરિફાઇડ ખેડૂત</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={certifications.moistureLab}
                  onChange={(e) => setCertifications({ ...certifications, moistureLab: e.target.checked })}
                />
                <span>✓ લેબ ભેજ ટેસ્ટેડ (&lt; ૮%)</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={certifications.npopOrganic}
                  onChange={(e) => setCertifications({ ...certifications, npopOrganic: e.target.checked })}
                />
                <span>NPOP ઓર્ગેનિક સર્ટિફાઇડ</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={certifications.singleFarm}
                  onChange={(e) => setCertifications({ ...certifications, singleFarm: e.target.checked })}
                />
                <span>સિંગલ ફાર્મ લોટ</span>
              </label>
            </div>
          </div>

          {/* Section 3: Harvest Date */}
          <div className="bmp-filter-sec">
            <h4 className="bmp-fs-title">હાર્વેસ્ટ તારીખ (Harvest Date)</h4>
            <div className="bmp-radio-group">
              <label className="bmp-chk-item">
                <input
                  type="radio"
                  name="harvest"
                  checked={harvestDate === '15days'}
                  onChange={() => setHarvestDate('15days')}
                />
                <span>છેલ્લા ૧૫ દિવસનો તાજો પાક</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="radio"
                  name="harvest"
                  checked={harvestDate === 'month'}
                  onChange={() => setHarvestDate('month')}
                />
                <span>આ મહિનાનો પાક</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="radio"
                  name="harvest"
                  checked={harvestDate === 'godown'}
                  onChange={() => setHarvestDate('godown')}
                />
                <span>ગોડાઉન સ્ટોક (Dry Stored)</span>
              </label>
            </div>
          </div>

          {/* Section 4: District Filter */}
          <div className="bmp-filter-sec">
            <h4 className="bmp-fs-title">જિલ્લા ફિલ્ટર (Select District)</h4>
            <div className="bmp-dist-grid">
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={districts.Rajkot}
                  onChange={(e) => setDistricts({ ...districts, Rajkot: e.target.checked })}
                />
                <span>રાજકોટ</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={districts.Gondal}
                  onChange={(e) => setDistricts({ ...districts, Gondal: e.target.checked })}
                />
                <span>ગોંડલ</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={districts.Jamnagar}
                  onChange={(e) => setDistricts({ ...districts, Jamnagar: e.target.checked })}
                />
                <span>જામનગર</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={districts.Mehsana}
                  onChange={(e) => setDistricts({ ...districts, Mehsana: e.target.checked })}
                />
                <span>મહેસાણા</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={districts.Amreli}
                  onChange={(e) => setDistricts({ ...districts, Amreli: e.target.checked })}
                />
                <span>અમરેલી</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={districts.Banaskantha}
                  onChange={(e) => setDistricts({ ...districts, Banaskantha: e.target.checked })}
                />
                <span>બનાસકાંઠા</span>
              </label>
            </div>
          </div>

          {/* Section 5: Weighment Facilities */}
          <div className="bmp-filter-sec">
            <h4 className="bmp-fs-title">વજન અને તોલમાપ સુવિધા</h4>
            <div className="bmp-checkbox-group">
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={weighment.farm}
                  onChange={(e) => setWeighment({ ...weighment, farm: e.target.checked })}
                />
                <span>ખેતરે તોલમાપ ઉપલબ્ધ</span>
              </label>
              <label className="bmp-chk-item">
                <input
                  type="checkbox"
                  checked={weighment.apmc}
                  onChange={(e) => setWeighment({ ...weighment, apmc: e.target.checked })}
                />
                <span>નજીકના APMC કાંટે</span>
              </label>
            </div>
          </div>

          {/* Apply Button */}
          <button
            type="button"
            className="bmp-btn-apply-filters"
            onClick={() => toast.success(lang === 'gu' ? 'ફિલ્ટર્સ સફળતાપૂર્વક લાગુ કર્યા!' : 'Filters applied successfully!')}
          >
            ✓ ફિલ્ટર્સ લાગુ કરો (Apply Filters)
          </button>
        </aside>

        {/* ================= RIGHT MAIN: LISTING CARDS ================= */}
        <main className="bmp-listings-main">
          {filteredCrops.length === 0 ? (
            <div className="bmp-empty-box">
              <span className="bmp-empty-icon">🌾</span>
              <h3>કોઈ પાક લિસ્ટિંગ મળ્યો નથી</h3>
              <p>તમારા ફિલ્ટર્સ બદલીને અથવા રીસેટ કરીને ફરીથી પ્રયત્ન કરો.</p>
              <button
                type="button"
                className="bmp-btn-reset-empty"
                onClick={handleResetFilters}
              >
                ફિલ્ટર્સ રીસેટ કરો
              </button>
            </div>
          ) : (
            <div className="bmp-cards-list">
              {filteredCrops.map((crop) => {
                const isSaved = traderService.isInWatchlist(crop.id);
                return (
                  <div key={crop.id} className="bmp-crop-card">
                    {/* Left Thumbnail with Badge */}
                    <div className="bmp-cc-img-wrap">
                      <img
                        src={crop.images?.[0] || '/crops/cotton.jpg'}
                        alt={crop.nameGu}
                        className="bmp-cc-img"
                      />
                      <span className="bmp-cc-badge">{crop.gradeTag || crop.grade}</span>
                      <div className="bmp-cc-loc-tag">
                        📍 {crop.farmer?.taluka}, {crop.farmer?.district}
                      </div>
                    </div>

                    {/* Right Info Section */}
                    <div className="bmp-cc-content">
                      {/* Top Header of Card */}
                      <div className="bmp-cc-head">
                        <div>
                          <h2 className="bmp-cc-title">
                            <Link to={`/buyer/crop/${crop.id}`} className="bmp-cc-title-link">
                              {crop.nameGu} ({crop.nameEn})
                            </Link>
                          </h2>
                          <p className="bmp-cc-farmer-line">
                            {crop.farmer?.name} • <span className="text-green">✓ {crop.farmer?.landVerified}</span>
                          </p>
                        </div>

                        {/* Price box */}
                        <div className="bmp-cc-price-box">
                          <span className="bmp-cc-price-lbl">અપેક્ષિત ભાવ (Expected)</span>
                          <strong className="bmp-cc-price-val">₹{crop.farmerAskMan?.toLocaleString('gu-IN') || '૧,૭૨૦'} <small>/ મણ (20kg)</small></strong>
                          <span className="bmp-cc-price-qtl">₹{crop.farmerAskQtl?.toLocaleString('gu-IN') || '૮,૬૦૦'} / ક્વિન્ટલ</span>
                        </div>
                      </div>

                      {/* 4-Cell Details Grid matching PDF */}
                      <div className="bmp-cc-grid">
                        <div className="bmp-grid-cell">
                          <span className="bmp-cell-lbl">કુલ જથ્થો (Bulk Volume)</span>
                          <strong className="bmp-cell-val text-green">{crop.volumeQtl} ક્વિન્ટલ ({crop.volumeMan} મણ)</strong>
                        </div>
                        <div className="bmp-grid-cell">
                          <span className="bmp-cell-lbl">હાર્વેસ્ટ તારીખ</span>
                          <strong className="bmp-cell-val">{crop.harvestDate}</strong>
                        </div>
                        <div className="bmp-grid-cell">
                          <span className="bmp-cell-lbl">લેબ ભેજ (Moisture)</span>
                          <strong className="bmp-cell-val text-green">{crop.quality?.moisture || '૭.૪%'} <small>(માનક સ્તર &lt; ૮%)</small></strong>
                        </div>
                        <div className="bmp-grid-cell">
                          <span className="bmp-cell-lbl">સ્ટેપલ / વિશેષતા</span>
                          <strong className="bmp-cell-val">{crop.quality?.stapleLength || crop.quality?.oilContent || crop.quality?.purity || 'પ્રીમિયમ ગ્રેડ'}</strong>
                        </div>
                      </div>

                      {/* Facilities / Logistics Highlights */}
                      <div className="bmp-cc-facilities">
                        <span className="bmp-fac-item">🚛 {crop.transportAccess}</span>
                        <span className="bmp-fac-item">⚖️ {crop.weighmentLocation}</span>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="bmp-cc-actions">
                        <button
                          type="button"
                          className="bmp-btn-make-offer"
                          onClick={() => handleOpenQuickOffer(crop)}
                        >
                          ✉️ ઓફર મોકલો (Make Offer)
                        </button>
                        <Link
                          to={`/buyer/crop/${crop.id}`}
                          className="bmp-btn-view-details"
                        >
                          👁️ વિગત જુઓ
                        </Link>
                        <button
                          type="button"
                          className={`bmp-btn-bookmark ${isSaved ? 'saved' : ''}`}
                          onClick={() => handleToggleBookmark(crop)}
                        >
                          {isSaved ? '✓ સેવ કરેલ (Saved)' : '🔖 સેવ કરો (Bookmark)'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Strip matching PDF */}
          <div className="bmp-pagination">
            <span className="bmp-pg-info">દર્શાવી રહ્યા છીએ: ૧ થી ૪ / કુલ ૩૪૮ બલ્ક લોટ્સ</span>
            <div className="bmp-pg-btns">
              <button type="button" className="bmp-pg-btn" disabled>&lt; પાછળ</button>
              <button type="button" className="bmp-pg-btn active">૧</button>
              <button type="button" className="bmp-pg-btn">૨</button>
              <button type="button" className="bmp-pg-btn">૩</button>
              <span className="bmp-pg-dots">...</span>
              <button type="button" className="bmp-pg-btn">૮૭</button>
              <button type="button" className="bmp-pg-btn">આગળ &gt;</button>
            </div>
          </div>

          {/* Bottom Custom Procurement Banner matching PDF */}
          <div className="bmp-mill-banner">
            <div className="bmp-mb-icon">🏭</div>
            <div className="bmp-mb-text">
              <h4>મોટી મિલ અથવા પ્રોસેસિંગ પ્લાન્ટ માટે કસ્ટમ ખરીદી કરવી છે?</h4>
              <p>અમારા બલ્ક ટ્રેડિંગ એક્સપર્ટ સાથે સીધી વાત કરો: વેરહાઉસ ઇન્સ્પેક્શન, એસ્ક્રો પેમેન્ટ્સ અને રિવર્સ ઓક્શન સુવિધા.</p>
            </div>
            <a href="tel:1800543388" className="bmp-mb-phone">
              📞 ટોલ-ફ્રી: ૧૮૦૦-૫૪૩-૩૮૮
            </a>
          </div>
        </main>
      </div>

      {/* Quick Offer Modal */}
      {showOfferModal && selectedCrop && (
        <div className="bmp-modal-overlay" onClick={() => setShowOfferModal(false)}>
          <div className="bmp-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="bmp-modal-header">
              <h3>✉️ {selectedCrop.nameGu} માટે ઝડપી ભાવ પ્રસ્તાવ</h3>
              <button
                type="button"
                className="bmp-modal-close"
                onClick={() => setShowOfferModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmitQuickOffer} className="bmp-modal-form">
              <p className="bmp-mf-sub">
                ખેડૂત: <strong>{selectedCrop.farmer?.name}</strong> • પૂછેલ ભાવ: <strong className="text-green">₹{selectedCrop.farmerAskMan}/મણ</strong>
              </p>
              <div className="bmp-mf-group">
                <label>તમારો ઓફર ભાવ (₹/મણ - ૨૦ કિગ્રા):</label>
                <input
                  type="number"
                  value={quickOfferPrice}
                  onChange={(e) => setQuickOfferPrice(Number(e.target.value) || 0)}
                  className="bmp-mf-input"
                  required
                />
              </div>
              <div className="bmp-mf-group">
                <label>જથ્થો (ક્વિન્ટલ):</label>
                <input
                  type="number"
                  value={quickVolume}
                  onChange={(e) => setQuickVolume(Number(e.target.value) || 0)}
                  className="bmp-mf-input"
                  required
                />
              </div>
              <div className="bmp-mf-total">
                <span>અંદાજિત સોદા મૂલ્ય:</span>
                <strong>₹{((quickVolume * 5) * quickOfferPrice).toLocaleString('en-IN')}</strong>
              </div>
              <div className="bmp-modal-actions">
                <button
                  type="button"
                  className="bmp-btn-modal-cancel"
                  onClick={() => setShowOfferModal(false)}
                >
                  રદ કરો
                </button>
                <button type="submit" className="bmp-btn-modal-submit">
                  ▶ ઓફર સબમિટ કરો
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseMarketPage;
