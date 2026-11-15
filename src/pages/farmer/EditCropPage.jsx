import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './EditCropPage.css';

const EditCropPage = () => {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams();

  // State
  const [cropName, setCropName] = useState('સૌરાષ્ટ્ર શંકર-૬ કપાસ (Saurashtra Shankar-6 Cotton)');
  const [pricePer20kg, setPricePer20kg] = useState(1720);
  const [remainingQty, setRemainingQty] = useState(350);
  const [minOrderQty, setMinOrderQty] = useState(25);
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [stapleLength, setStapleLength] = useState('29mm+ સ્ટેપલ (Extra Long)');
  const [stockReadiness, setStockReadiness] = useState('ખેતરે ગોડાઉનમાં તૈયાર છે (Ready at Farm Warehouse)');
  const [loadingTerms, setLoadingTerms] = useState('ખેડૂત દ્વારા તોલમાપ સુવિધા ઉપલબ્ધ (Weighment facility available on farm)');
  const [moistureClean, setMoistureClean] = useState(true);
  const [truckAccess, setTruckAccess] = useState(true);
  const [listingStatus, setListingStatus] = useState('active'); // active, paused, sold

  const [photos, setPhotos] = useState([
    { id: 1, img: '/crops/cotton.jpg', isMain: true },
    { id: 2, img: '/crops/cotton.jpg', isMain: false },
    { id: 3, img: '/crops/cotton.jpg', isMain: false },
    { id: 4, img: '/crops/cotton.jpg', isMain: false },
    { id: 5, img: '/crops/cotton.jpg', isMain: false },
  ]);

  const pricePerQuintal = pricePer20kg * 5;

  const handlePriceQuickAdj = (delta) => {
    setPricePer20kg(prev => Math.max(100, prev + delta));
  };

  const handleDeletePhoto = (photoId) => {
    if (photos.length <= 1) {
      toast.error(lang === 'gu' ? 'ઓછામાં ઓછો ૧ ફોટો હોવો જરૂરી છે' : 'At least 1 photo is required');
      return;
    }
    setPhotos(prev => prev.filter(p => p.id !== photoId));
    toast.success(lang === 'gu' ? 'ફોટો ડિલીટ થયો' : 'Photo removed');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    toast.success(lang === 'gu' ? 'પાકની વિગતો સફળતાપૂર્વક અપડેટ થઈ ગઈ! વેપારીઓને જાણ કરાઈ.' : 'Listing updated successfully! Alerted registered buyers.');
    navigate('/farmer/my-crops');
  };

  const handleDeleteListing = () => {
    if (window.confirm(lang === 'gu' ? 'શું તમે ખરેખર આ લિસ્ટિંગ ડિલીટ કરવા માંગો છો?' : 'Are you sure you want to delete this listing?')) {
      toast.success(lang === 'gu' ? 'લિસ્ટિંગ ડિલીટ કરવામાં આવી છે' : 'Listing deleted');
      navigate('/farmer/my-crops');
    }
  };

  return (
    <div className="edit-crop-page">
      <div className="ec-container">

        {/* Back Link */}
        <div className="ec-back-row">
          <Link to="/farmer/my-crops" className="ec-back-link">
            ← {lang === 'gu' ? 'પાક વિગતો સુધારો (Edit Crop Listing - સૌરાષ્ટ્ર શંકર કપાસ #KB-9042)' : 'Back to My Crops'}
          </Link>
        </div>

        {/* Header Title Bar */}
        <div className="ec-header-bar">
          <div className="ec-hb-left">
            <h1 className="ec-hb-title">
              {lang === 'gu' ? 'સૌરાષ્ટ્ર શંકર કપાસ વિગત સંશોધન' : 'Edit Saurashtra Shankar-6 Cotton'}
            </h1>
            <span className="ec-verified-lot-pill">
              🛡️ {lang === 'gu' ? 'વેરિફાઇડ લિસ્ટિંગ #KB-9042' : 'Verified Listing #KB-9042'}
            </span>
          </div>

          <div className="ec-hb-right">
            <span className="ec-last-update-time">
              ⏱️ {lang === 'gu' ? 'છેલ્લે અપડેટ: આજે, ૧૧:૪૨ AM' : 'Last Updated: Today, 11:42 AM'}
            </span>
          </div>
        </div>

        {/* Live Notification Banner */}
        <div className="ec-live-broadcast-banner">
          <div className="lbb-left">
            <span className="lbb-icon">📡</span>
            <div>
              <div className="lbb-title-row">
                <strong>{lang === 'gu' ? 'લાઈવ લિસ્ટિંગ નોટિફિકેશન સિસ્ટમ' : 'Live Listing Notification System'}</strong>
                <span className="lbb-tag">{lang === 'gu' ? 'સક્રિય પ્રસારણ' : 'Active Broadcast'}</span>
              </div>
              <p className="lbb-desc">
                {lang === 'gu'
                  ? 'આ લિસ્ટિંગ હાલમાં સક્રિય છે. ભાવ કે જથ્થામાં ફેરફાર કરવાથી રજિસ્ટર્ડ વેપારીઓને તાત્કાલિક અપડેટ મળશે.'
                  : 'This listing is live on the marketplace. Price or quantity adjustments will immediately alert registered traders.'}
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="ec-grid">
          
          {/* LEFT COLUMN: Main ID, Price, Quantity & Quality Specs */}
          <div className="ec-col-left">

            {/* Card 1: Main ID & Price */}
            <div className="ec-card">
              <div className="ec-card-header">
                <span className="ec-ch-title">📋 {lang === 'gu' ? 'પાકની મુખ્ય ઓળખ અને ભાવ' : 'Crop Identification & Rate'}</span>
                <span className="ec-ch-unit">{lang === 'gu' ? '૧ મણ = ૨૦ કિગ્રા' : '1 Mound = 20kg'}</span>
              </div>

              <div className="ec-card-body">
                {/* Crop Name */}
                <div className="ec-form-group">
                  <div className="ec-label-row">
                    <label>{lang === 'gu' ? 'પાકનું નામ અને વેરાયટી (Crop & Variety) *' : 'Crop Name & Variety *'}</label>
                    <span className="ec-label-badge">{lang === 'gu' ? '૭/૧૨ રેકોર્ડ આધારિત' : '7/12 Land Record Linked'}</span>
                  </div>
                  <div className="ec-input-verified-wrap">
                    <input
                      type="text"
                      value={cropName}
                      onChange={(e) => setCropName(e.target.value)}
                      className="ec-input"
                    />
                    <span className="verified-check">✓</span>
                  </div>
                  <span className="ec-field-hint">
                    ℹ️ {lang === 'gu' ? 'વેરાયટી સુધારવાથી APMC ના ભાવ સરખામણી કોષ્ટક આપમેળે બદલાશે.' : 'Editing variety automatically updates linked APMC rate sheets.'}
                  </span>
                </div>

                {/* Price per 20kg */}
                <div className="ec-form-group mt-18">
                  <div className="ec-label-row">
                    <label>{lang === 'gu' ? 'ભાવ ફેરફાર (Update Price per 20kg / મણ)' : 'Update Rate per 20kg (Mound)'}</label>
                    <span className="ec-qtl-equiv-badge">
                      {lang === 'gu' ? `તમારો નવો ભાવ: ક્વિન્ટલ સમકક્ષ ₹${pricePerQuintal.toLocaleString()} / Qtl` : `Equivalent: ₹${pricePerQuintal.toLocaleString()} / Qtl`}
                    </span>
                  </div>

                  <div className="ec-price-stepper-wrap">
                    <div className="price-input-box">
                      <span className="rupee-char">₹</span>
                      <input
                        type="number"
                        value={pricePer20kg}
                        onChange={(e) => setPricePer20kg(Number(e.target.value))}
                        className="price-num-input"
                      />
                      <span className="per-20kg-text">/ ૨૦ કિગ્રા</span>
                    </div>

                    {/* Quick Adjustment Chips */}
                    <div className="ec-quick-adj-chips">
                      <span className="adj-label">{lang === 'gu' ? 'ઝડપી ફેરફાર:' : 'Quick adjust:'}</span>
                      <button type="button" className="adj-chip red" onClick={() => handlePriceQuickAdj(-20)}>-₹૨૦</button>
                      <button type="button" className="adj-chip red" onClick={() => handlePriceQuickAdj(-10)}>-₹૧૦</button>
                      <button type="button" className="adj-chip green" onClick={() => handlePriceQuickAdj(10)}>+₹૧૦</button>
                      <button type="button" className="adj-chip green" onClick={() => handlePriceQuickAdj(20)}>+₹૨૦</button>
                      <button type="button" className="adj-chip outline" onClick={() => setPricePer20kg(1720)}>
                        {lang === 'gu' ? 'કસ્ટમ ભાવ દાખલ કરો' : 'Custom'}
                      </button>
                    </div>
                  </div>

                  {/* APMC Callout Box */}
                  <div className="ec-apmc-eval-box">
                    <span className="eval-icon">📈</span>
                    <span className="eval-text">
                      <strong>{lang === 'gu' ? 'APMC લાઈવ માર્કેટ સરખામણી:' : 'APMC Live Benchmark:'}</strong>{' '}
                      {lang === 'gu'
                        ? 'રાજકોટ યાર્ડનો આજનો ભાવ ₹૧,૬૫૦ થી ₹૧,૭૪૦ છે. તમારો ભાવ સ્પર્ધાત્મક છે અને ઝડપી સોદા માટે અનુકૂળ છે.'
                        : 'Rajkot APMC today is ₹1,650 to ₹1,740. Your asking rate of ₹1,720 is competitive for quick mill deals.'}
                    </span>
                  </div>
                </div>

                {/* Remaining Quantity & Min Order */}
                <div className="ec-grid-2 mt-18">
                  <div className="ec-form-group">
                    <label>{lang === 'gu' ? 'ઉપલબ્ધ જથ્થો (Remaining Quantity) *' : 'Remaining Quantity *'}</label>
                    <div className="ec-qty-unit-wrap">
                      <input
                        type="number"
                        value={remainingQty}
                        onChange={(e) => setRemainingQty(Number(e.target.value))}
                        className="ec-input"
                      />
                      <span className="qty-unit-tag">{lang === 'gu' ? 'ક્વિન્ટલ' : 'Qtl'}</span>
                    </div>
                    <span className="ec-field-hint">{lang === 'gu' ? 'આશરે ૧,૭૫૦ મણ અનામત છે' : 'Approx 1,750 mounds reserved'}</span>
                  </div>

                  <div className="ec-form-group">
                    <label>{lang === 'gu' ? 'ન્યૂનતમ ઓર્ડર જથ્થો (Min. Order) *' : 'Minimum Order Quantity *'}</label>
                    <div className="ec-qty-unit-wrap">
                      <input
                        type="number"
                        value={minOrderQty}
                        onChange={(e) => setMinOrderQty(Number(e.target.value))}
                        className="ec-input"
                      />
                      <span className="qty-unit-tag">{lang === 'gu' ? 'ક્વિન્ટલ' : 'Qtl'}</span>
                    </div>
                    <span className="ec-field-hint">{lang === 'gu' ? 'નાના વેપારીઓ માટે મર્યાદા' : 'Batch threshold for small traders'}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Card 2: Quality Parameters & Logistics */}
            <div className="ec-card">
              <div className="ec-card-header">
                <span className="ec-ch-title">⚙️ {lang === 'gu' ? 'ગુણવત્તા પરિમાણો અને શરતો' : 'Quality Specs & Logistics'}</span>
                <span className="ec-lab-tag">🧪 {lang === 'gu' ? 'લેબ રિપોર્ટ જોડાયેલ છે' : 'Lab Test Attached'}</span>
              </div>

              <div className="ec-card-body">
                <div className="ec-grid-2">
                  <div className="ec-form-group">
                    <label>{lang === 'gu' ? 'ગુણવત્તા ગ્રેડ (Quality Grade)' : 'Quality Grade'}</label>
                    <select
                      value={qualityGrade}
                      onChange={(e) => setQualityGrade(e.target.value)}
                      className="ec-select"
                    >
                      <option value="Grade A">Grade A (ઉત્તમ / સુપર પ્રીમિયમ)</option>
                      <option value="Grade B">Grade B (મધ્યમ / Standard)</option>
                    </select>
                  </div>

                  <div className="ec-form-group">
                    <label>{lang === 'gu' ? 'સ્ટેપલ લંબાઈ (Staple Length)' : 'Staple Length'}</label>
                    <input
                      type="text"
                      value={stapleLength}
                      onChange={(e) => setStapleLength(e.target.value)}
                      className="ec-input"
                    />
                  </div>
                </div>

                <div className="ec-form-group mt-14">
                  <label>{lang === 'gu' ? 'પાકની સ્થિતિ (Stock Location & Readiness)' : 'Stock Location & Readiness'}</label>
                  <input
                    type="text"
                    value={stockReadiness}
                    onChange={(e) => setStockReadiness(e.target.value)}
                    className="ec-input"
                  />
                </div>

                <div className="ec-form-group mt-14">
                  <label>{lang === 'gu' ? 'લોડિંગ / ટ્રાન્સપોર્ટ શરતો (Loading & Delivery Terms)' : 'Loading & Delivery Terms'}</label>
                  <input
                    type="text"
                    value={loadingTerms}
                    onChange={(e) => setLoadingTerms(e.target.value)}
                    className="ec-input"
                  />
                </div>

                {/* Quality Checkbox Tags */}
                <div className="ec-checkbox-pills-row mt-14">
                  <label className={`ec-pill-checkbox ${moistureClean ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={moistureClean}
                      onChange={(e) => setMoistureClean(e.target.checked)}
                    />
                    <span>✓ {lang === 'gu' ? 'સૂકો અને સાફ માલ (Moisture < ૮%)' : 'Dry & Clean Stock (Moisture < 8%)'}</span>
                  </label>

                  <label className={`ec-pill-checkbox ${truckAccess ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={truckAccess}
                      onChange={(e) => setTruckAccess(e.target.checked)}
                    />
                    <span>✓ {lang === 'gu' ? 'ટ્રેક્ટર/ટ્રક સીધો ગોડાઉન સુધી પહોંચ માર્ગ' : 'Direct Truck/Tractor Access to Warehouse'}</span>
                  </label>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Photos Management & Listing Status */}
          <div className="ec-col-right">

            {/* Photo Management Card */}
            <div className="ec-card">
              <div className="ec-card-header">
                <span className="ec-ch-title">📷 {lang === 'gu' ? 'ફોટો મેનેજમેન્ટ (Photos)' : 'Photo Management'}</span>
                <span className="ec-photo-count">{photos.length}/૮ અપલોડ</span>
              </div>

              <div className="ec-card-body">
                <p className="ec-photo-helper-text">
                  {lang === 'gu'
                    ? 'વેપારીઓ પાકની સાચી ગુણવત્તા જોવા માટે તાજા અને સ્પષ્ટ ફોટા પસંદ કરે છે. મુખ્ય ફોટો બદલવા માટે ખેંચો (Drag).'
                    : 'Buyers look for clear daytime photos to judge fiber lustre and cleanliness. Drag to reorder main photo.'}
                </p>

                {/* Photos Grid */}
                <div className="ec-photo-matrix">
                  {photos.map((item, idx) => (
                    <div key={item.id} className="ec-pm-tile">
                      <img src={item.img} alt={`Crop photo ${idx + 1}`} />
                      {idx === 0 && <span className="main-photo-tag">{lang === 'gu' ? 'મુખ્ય' : 'Main'}</span>}
                      <button
                        type="button"
                        className="pm-del-btn"
                        onClick={() => handleDeletePhoto(item.id)}
                        title="Delete photo"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}

                  {/* Add Photo Slot */}
                  <div
                    className="ec-pm-add-tile"
                    onClick={() => {
                      setPhotos(prev => [...prev, { id: Date.now(), img: '/crops/cotton.jpg', isMain: false }]);
                      toast.success(lang === 'gu' ? 'નવો ફોટો ઉમેરાયો' : 'Photo added');
                    }}
                  >
                    <span className="pm-add-cam">📷</span>
                    <span className="pm-add-txt">{lang === 'gu' ? '+ નવો ફોટો ઉમેરો' : '+ Add Photo'}</span>
                  </div>
                </div>

                <div className="ec-photo-meta-bar">
                  <span>{lang === 'gu' ? 'મહત્તમ સાઇઝ: 10MB પ્રતિ ફોટો' : 'Max size: 10MB per photo'}</span>
                  <button type="button" className="btn-open-cam" onClick={() => toast.success(lang === 'gu' ? 'કેમેરા સક્રિય...' : 'Camera activated...')}>
                    📷 {lang === 'gu' ? 'મોબાઇલ કેમેરા ખોલો' : 'Open Camera'}
                  </button>
                </div>
              </div>
            </div>

            {/* Listing Status Control Card */}
            <div className="ec-card">
              <div className="ec-card-header">
                <span className="ec-ch-title">⚙️ {lang === 'gu' ? 'લિસ્ટિંગ સ્ટેટસ કંટ્રોલ' : 'Listing Status Control'}</span>
                <span className="status-indicator-dot green">🟢 {lang === 'gu' ? 'સક્રિય' : 'Active'}</span>
              </div>

              <div className="ec-card-body">
                <p className="ec-status-sub">
                  {lang === 'gu'
                    ? 'તમારા માલની ઉપલબ્ધતા મુજબ લિસ્ટિંગનું સ્ટેટસ સેટ કરો જેથી વેપારીઓ સમયસર સંપર્ક કરી શકે.'
                    : 'Set status according to inventory availability so traders know when you are accepting bids.'}
                </p>

                {/* Radio Options */}
                <div className="ec-status-options-list">
                  
                  {/* Option 1: Active */}
                  <label className={`ec-status-radio-card ${listingStatus === 'active' ? 'selected green' : ''}`}>
                    <div className="radio-card-top">
                      <div className="rc-left">
                        <input
                          type="radio"
                          name="listingStatus"
                          value="active"
                          checked={listingStatus === 'active'}
                          onChange={() => setListingStatus('active')}
                        />
                        <strong className="rc-title">{lang === 'gu' ? 'સક્રિય (Active)' : 'Active'}</strong>
                      </div>
                      <span className="rc-tag green">{lang === 'gu' ? 'લાઈવ બજારમાં' : 'Live in Market'}</span>
                    </div>
                    <p className="rc-desc">
                      {lang === 'gu'
                        ? 'લિસ્ટિંગ તમામ APMC વેપારીઓને દેખાશે અને સીધા ફોન/WhatsApp ઓફર આવી શકશે.'
                        : 'Visible to all mandi buyers with direct call and WhatsApp bids enabled.'}
                    </p>
                  </label>

                  {/* Option 2: Pause */}
                  <label className={`ec-status-radio-card ${listingStatus === 'paused' ? 'selected orange' : ''}`}>
                    <div className="radio-card-top">
                      <div className="rc-left">
                        <input
                          type="radio"
                          name="listingStatus"
                          value="paused"
                          checked={listingStatus === 'paused'}
                          onChange={() => setListingStatus('paused')}
                        />
                        <strong className="rc-title">{lang === 'gu' ? 'અસ્થાયી બંધ (Pause Listing)' : 'Pause Listing'}</strong>
                      </div>
                      <span className="rc-tag orange">{lang === 'gu' ? 'હોલ્ડ પર' : 'On Hold'}</span>
                    </div>
                    <p className="rc-desc">
                      {lang === 'gu'
                        ? 'નવા વેપારીઓ જોઈ શકશે નહીં. વાટાઘાટો ચાલુ હોય ત્યારે ઉપયોગી.'
                        : 'Hidden from new buyers. Ideal while final negotiations are underway.'}
                    </p>
                  </label>

                  {/* Option 3: Mark Sold */}
                  <label className={`ec-status-radio-card ${listingStatus === 'sold' ? 'selected gray' : ''}`}>
                    <div className="radio-card-top">
                      <div className="rc-left">
                        <input
                          type="radio"
                          name="listingStatus"
                          value="sold"
                          checked={listingStatus === 'sold'}
                          onChange={() => setListingStatus('sold')}
                        />
                        <strong className="rc-title">{lang === 'gu' ? 'વેચાઈ ગયેલ માર્ક કરો (Mark as Sold)' : 'Mark as Sold'}</strong>
                      </div>
                      <span className="rc-tag gray">{lang === 'gu' ? 'વેચાણ પૂરું' : 'Sold Out'}</span>
                    </div>
                    <p className="rc-desc">
                      {lang === 'gu'
                        ? 'સ્ટોક ૦ થશે અને સોદાની પહોંચ તમારા ખાતામાં જમા થઈ જશે.'
                        : 'Inventory set to zero and settlement receipt credited to your profile.'}
                    </p>
                  </label>

                </div>

                {/* Farmer 7/12 Badge at Bottom of Card */}
                <div className="ec-farmer-profile-footer">
                  <div className="fpf-left">
                    <span className="fpf-shield">🛡️</span>
                    <div>
                      <strong>{lang === 'gu' ? 'ખેડૂત પ્રમાણિત લિસ્ટિંગ' : 'Certified Farmer Listing'}</strong>
                      <span>7/12 & 8-A Verified Farmer Profile</span>
                    </div>
                  </div>
                  <span className="fpf-status-pill">{lang === 'gu' ? 'સત્યાપિત' : 'Verified'}</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="ec-sticky-footer-bar">
          <button
            type="button"
            className="ec-btn-delete-listing"
            onClick={handleDeleteListing}
          >
            🗑️ {lang === 'gu' ? 'લિસ્ટિંગ ડિલીટ કરો (Delete Listing)' : 'Delete Listing'}
          </button>

          <div className="ec-footer-right-buttons">
            <button
              type="button"
              className="ec-btn-cancel"
              onClick={() => navigate('/farmer/my-crops')}
            >
              {lang === 'gu' ? 'રદ કરો (Cancel)' : 'Cancel'}
            </button>
            <button
              type="button"
              className="ec-btn-save-changes"
              onClick={handleSaveChanges}
            >
              💾 {lang === 'gu' ? 'ફેરફારો સેવ કરો અને પબ્લિશ કરો (Save Changes & Update Listing)' : 'Save Changes & Update Listing'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditCropPage;
