import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './AddCropPage.css';

const CROPS_OPTIONS = [
  { id: 'cotton', nameGu: 'સૌરાષ્ટ્ર શંકર-૬ કપાસ', nameEn: 'Saurashtra Shankar-6 Cotton', variety: 'સુધારેલો હાઇબ્રિડ સીડ્સ', defaultPrice: 1720, apmcPrice: 1680, img: '/crops/cotton.jpg' },
  { id: 'cumin', nameGu: 'ઊંઝા સ્પેશિયલ જીરૂ', nameEn: 'Unjha Special Cumin Seeds', variety: 'મશીન ક્લીન બોલ્ડ', defaultPrice: 5600, apmcPrice: 5450, img: '/crops/cumin.jpg' },
  { id: 'groundnut', nameGu: 'જામનગરી જી-૨૦ મગફળી', nameEn: 'Jamnagari G-20 Groundnut', variety: 'સેમી-બોલ્ડ ૪૮% તેલ', defaultPrice: 1380, apmcPrice: 1360, img: '/crops/groundnut.jpg' },
  { id: 'wheat', nameGu: 'ભાલિયા ટુકડા ઘઉં', nameEn: 'Premium Bhalia Tukda Wheat', variety: 'કુદરતી સોનેરી ટુકડા', defaultPrice: 980, apmcPrice: 950, img: '/crops/wheat.jpg' },
  { id: 'mustard', nameGu: 'બનાસકાંઠા દેશી રાયડો', nameEn: 'Banaskantha Desi Mustard', variety: 'હાઈ પંજન્સી રાયડો', defaultPrice: 1120, apmcPrice: 1100, img: '/crops/mustard.jpg' },
  { id: 'sesame', nameGu: 'સફેદ તલ (નિકાસ ગુણવત્તા)', nameEn: 'White Sesame (Export Quality)', variety: 'સુપર વ્હાઈટ ક્લીન', defaultPrice: 2950, apmcPrice: 2880, img: '/crops/sesame.jpg' },
];

const AddCropPage = () => {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Wizard Step: 1, 2, 3, 4
  const [currentStep, setCurrentStep] = useState(3); // Start with Step 3 expanded like in PDF, or step state

  // Form State
  const [selectedCropId, setSelectedCropId] = useState('cotton');
  const [quantity, setQuantity] = useState(350);
  const [quantityUnit, setQuantityUnit] = useState('quintal');
  const [packagingType, setPackagingType] = useState('20kg_bale');
  const [qualityGrade, setQualityGrade] = useState('Grade A');
  const [isOrganic, setIsOrganic] = useState(true);
  const [expectedPrice, setExpectedPrice] = useState(1720);

  // Photos state (4 default uploaded matching PDF)
  const [photos, setPhotos] = useState([
    { id: 1, labelGu: 'પાકનો મુખ્ય ઢગલો', labelEn: 'Main Crop Heap', size: '2.1 MB', tag: 'મુખ્ય ઢગલો (Main Heap)', img: '/crops/cotton.jpg' },
    { id: 2, labelGu: 'દાણા / સ્ટેપલ ક્લોઝ-અપ', labelEn: 'Fibers / Close-up', size: '1.4 MB', tag: 'સ્ટેપલ લંબાઈ (Fibers)', img: '/crops/cotton.jpg' },
    { id: 3, labelGu: 'વજન કાંટો / પેકિંગ', labelEn: 'Weigh Scale / Packing', size: '2.1 MB', tag: 'વજન કાંટો (Weigh Scale)', img: '/crops/cotton.jpg' },
    { id: 4, labelGu: 'ગ્રેડિંગ / લેબ ટેસ્ટ સ્લિપ', labelEn: 'Grading / Lab Slip', size: '1.2 MB', tag: 'વેરિફિકેશન સ્લિપ (Lab)', img: '/crops/cotton.jpg' },
  ]);

  // Step 4 Location
  const [district, setDistrict] = useState('રાજકોટ (Rajkot)');
  const [taluka, setTaluka] = useState('જેતપુર (Jetpur)');
  const [village, setVillage] = useState('નવાગઢ (Navagadh)');
  const [surveyNo, setSurveyNo] = useState('સર્વે નં. ૧૨૪/૨, નવાગઢ - ભાદર પુલ પાસે, તા. જેતપુર');
  const [gpsLocked, setGpsLocked] = useState(true);
  const [declarationChecked, setDeclarationChecked] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const selectedCrop = CROPS_OPTIONS.find(c => c.id === selectedCropId) || CROPS_OPTIONS[0];

  const handlePublish = (e) => {
    e.preventDefault();
    if (!declarationChecked) {
      toast.error(lang === 'gu' ? 'કૃપા કરીને પુષ્ટિ ચેકબોક્સ સ્વીકારો' : 'Please accept the declaration');
      return;
    }
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      toast.success(lang === 'gu' ? 'પાક સફળતાપૂર્વક પબ્લિશ થયો! ૨૨૦+ વેપારીઓને જાણ કરાઈ. 🎉' : 'Crop successfully listed! Alerted 220+ mandi buyers. 🎉');
      navigate('/farmer/my-crops');
    }, 1000);
  };

  const handleSaveDraft = () => {
    toast.success(lang === 'gu' ? 'ડ્રાફ્ટ સાચવવામાં આવ્યો છે' : 'Draft saved successfully');
  };

  const handleGpsToggle = () => {
    setGpsLocked(true);
    toast.success(lang === 'gu' ? 'GPS લોકેશન લૉક થયું (21.758° N, 70.627° E)' : 'GPS Location Locked (21.758° N, 70.627° E)');
  };

  return (
    <div className="add-crop-page">
      {/* Top Breadcrumb & Status Bar */}
      <div className="ac-top-bar">
        <div className="ac-top-bar__inner">
          <div className="ac-breadcrumbs">
            <Link to="/farmer/dashboard">🏠 {lang === 'gu' ? 'મુખ્ય ડેશબોર્ડ' : 'Dashboard'}</Link>
            <span className="crumb-sep">›</span>
            <Link to="/farmer/my-crops">{lang === 'gu' ? 'મારા પાક સ્ટોક' : 'My Crops'}</Link>
            <span className="crumb-sep">›</span>
            <span className="crumb-current">{lang === 'gu' ? 'નવો પાક લિસ્ટિંગ (Add Crop)' : 'Add Crop Listing'}</span>
          </div>

          <div className="ac-top-badges">
            <span className="ac-badge-verified">
              🛡️ {lang === 'gu' ? '૭/૧૨ & ૮-અ વેરિફાઇડ ખેડૂત' : '7/12 & 8-A Verified Farmer'}
            </span>
            <button type="button" className="ac-btn-draft" onClick={handleSaveDraft}>
              💾 {lang === 'gu' ? 'ડ્રાફ્ટ સાચવો (Save Draft)' : 'Save Draft'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="ac-main-container">
        
        {/* Header Hero Banner */}
        <div className="ac-header-hero">
          <div className="ac-header-left">
            <div className="ac-auto-id-pill">
              {lang === 'gu' ? 'લિસ્ટિંગ આઈડી: #APMC-GJ-2025-084 (ઓટો જનરેટ)' : 'Listing ID: #APMC-GJ-2025-084 (Auto Generated)'}
            </div>
            <h1 className="ac-hero-title">
              {lang === 'gu' ? 'નવો પાક વેચાણ માટે મૂકો (List New Crop for Sale)' : 'List New Crop for Sale'}
            </h1>
            <p className="ac-hero-subtitle">
              {lang === 'gu'
                ? 'આ વિગતો ગુજરાતના ૨૨૦+ માર્કેટ યાર્ડના વેપારીઓ અને નોંધાયેલ ખરીદદારોને તાત્કાલિક દર્શાવવામાં આવશે.'
                : 'These details will be instantly broadcast to 220+ APMC buyers and verified millers across Gujarat.'}
            </p>
          </div>
          <div className="ac-header-right">
            <div className="ac-avg-time-box">
              <span className="avg-clock">⏱️</span>
              <div className="avg-text">
                <span className="avg-label">{lang === 'gu' ? 'સરેરાશ વેચાણ સમય' : 'Avg Sell Time'}</span>
                <span className="avg-value">{lang === 'gu' ? '૪ થી ૬ કલાક' : '4 to 6 Hours'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Wizard Navigation */}
        <div className="ac-wizard-nav">
          <div className={`ac-step-node ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : ''}`} onClick={() => setCurrentStep(1)}>
            <div className="step-num-circle">{currentStep > 1 ? '✓' : '૧'}</div>
            <div className="step-label-group">
              <span className="step-tag">{lang === 'gu' ? 'પગલું ૧ (Step 1)' : 'Step 1'} {currentStep > 1 && <span className="step-status-tag">પૂર્ણ</span>}</span>
              <span className="step-name">{lang === 'gu' ? 'પાકની મૂળભૂત વિગતો' : 'Crop Basic Details'}</span>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className={`ac-step-node ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : ''}`} onClick={() => setCurrentStep(2)}>
            <div className="step-num-circle">{currentStep > 2 ? '✓' : '૨'}</div>
            <div className="step-label-group">
              <span className="step-tag">{lang === 'gu' ? 'પગલું ૨ (Step 2)' : 'Step 2'} {currentStep > 2 && <span className="step-status-tag">પૂર્ણ</span>}</span>
              <span className="step-name">{lang === 'gu' ? 'ક્વોલિટી & અપેક્ષિત ભાવ' : 'Quality & Price'}</span>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className={`ac-step-node ${currentStep === 3 ? 'active current' : currentStep > 3 ? 'completed' : ''}`} onClick={() => setCurrentStep(3)}>
            <div className="step-num-circle">{currentStep > 3 ? '✓' : '૩'}</div>
            <div className="step-label-group">
              <span className="step-tag">{lang === 'gu' ? 'પગલું ૩ (Step 3)' : 'Step 3'} <span className="step-status-tag live">ચાલુ (Active)</span></span>
              <span className="step-name">{lang === 'gu' ? 'પાકના ફોટા અપલોડ' : 'Photos & Proofs'}</span>
            </div>
          </div>

          <div className="step-connector"></div>

          <div className={`ac-step-node ${currentStep === 4 ? 'active' : ''}`} onClick={() => setCurrentStep(4)}>
            <div className="step-num-circle">૪</div>
            <div className="step-label-group">
              <span className="step-tag">{lang === 'gu' ? 'પગલું ૪ (Step 4)' : 'Step 4'}</span>
              <span className="step-name">{lang === 'gu' ? 'સ્થાન & ઇન્સ્ટન્ટ પબ્લિશ' : 'Location & Publish'}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Content Grid: Form + Sticky Buyer Preview */}
        <div className="ac-content-grid">
          
          {/* LEFT: 4 Steps Form Cards */}
          <div className="ac-form-steps-col">

            {/* STEP 1: Basic Details Card */}
            <div className="ac-card ac-step-card">
              <div className="ac-step-header">
                <div className="ac-sh-left">
                  <span className="ac-sh-num green">૧</span>
                  <div className="ac-sh-titles">
                    <h2 className="ac-sh-main">{lang === 'gu' ? 'પગલું ૧: પાકની મૂળભૂત વિગતો' : 'Step 1: Crop Basic Details'}</h2>
                    <span className="ac-sh-sub">{lang === 'gu' ? 'પાક પસંદ કરો અને અંદાજિત જથ્થો નોંધાવો' : 'Select crop & declare available stock'}</span>
                  </div>
                </div>
                <button type="button" className="ac-btn-edit-step" onClick={() => setCurrentStep(1)}>
                  ✏️ {lang === 'gu' ? 'સુધારો (Edit)' : 'Edit'}
                </button>
              </div>

              {currentStep === 1 ? (
                <div className="ac-step-body open">
                  <div className="ac-grid-3">
                    <div className="ac-input-group">
                      <label>{lang === 'gu' ? 'પસંદ કરેલ પાક (Crop Name) *' : 'Selected Crop *'}</label>
                      <select value={selectedCropId} onChange={(e) => setSelectedCropId(e.target.value)} className="ac-select">
                        {CROPS_OPTIONS.map(c => (
                          <option key={c.id} value={c.id}>{lang === 'gu' ? c.nameGu : c.nameEn}</option>
                        ))}
                      </select>
                      <span className="ac-input-hint">{selectedCrop.variety}</span>
                    </div>

                    <div className="ac-input-group">
                      <label>{lang === 'gu' ? 'કુલ ઉપલબ્ધ જથ્થો (Total Quantity) *' : 'Total Quantity *'}</label>
                      <div className="ac-qty-input-wrap">
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="ac-input"
                          min="1"
                        />
                        <span className="ac-unit-badge">{lang === 'gu' ? 'ક્વિન્ટલ' : 'Quintal'}</span>
                      </div>
                      <span className="ac-input-hint">{lang === 'gu' ? `અંદાજે ${Math.round(quantity * 0.75)} + ${Math.round(quantity * 0.25)} બોરી` : `Approx ${Math.round(quantity * 0.75)} + ${Math.round(quantity * 0.25)} Bags`}</span>
                    </div>

                    <div className="ac-input-group">
                      <label>{lang === 'gu' ? 'પેકિંગ પ્રકાર (Packaging Type)' : 'Packaging Type'}</label>
                      <select value={packagingType} onChange={(e) => setPackagingType(e.target.value)} className="ac-select">
                        <option value="20kg_bale">{lang === 'gu' ? '૨૦ કિગ્રા પ્રમાણિત ગાંસડી / બોરી' : '20kg Certified Bales / Bags'}</option>
                        <option value="50kg_bag">{lang === 'gu' ? '૫૦ કિગ્રા ગણી બેગ' : '50kg Jute Bags'}</option>
                        <option value="loose">{lang === 'gu' ? 'લુઝ / ખુલ્લો માલ' : 'Loose Crop / Bulk'}</option>
                      </select>
                      <span className="ac-input-hint">{lang === 'gu' ? 'સામાજિક વજન કાંટો સુગમ' : 'Standard weighbridge compatible'}</span>
                    </div>
                  </div>
                  <div className="ac-step-action-row">
                    <button type="button" className="ac-btn-proceed" onClick={() => setCurrentStep(2)}>
                      {lang === 'gu' ? 'ક્વોલિટી & ભાવ પર આગળ વધો →' : 'Proceed to Quality & Price →'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ac-step-summary-row">
                  <div className="sum-col">
                    <span className="sum-label">{lang === 'gu' ? 'પસંદ કરેલ પાક / Crop Name' : 'Crop Name'}</span>
                    <strong className="sum-val">{lang === 'gu' ? selectedCrop.nameGu : selectedCrop.nameEn}</strong>
                    <span className="sum-sub">{selectedCrop.variety}</span>
                  </div>
                  <div className="sum-col">
                    <span className="sum-label">{lang === 'gu' ? 'કુલ ઉપલબ્ધ જથ્થો / Total Quantity' : 'Total Quantity'}</span>
                    <strong className="sum-val">{quantity} {lang === 'gu' ? 'ક્વિન્ટલ (Quintals)' : 'Quintals'}</strong>
                    <span className="sum-sub">{lang === 'gu' ? 'અંદાજે ૧૫૦ + ૧૨૦ બોરી' : 'Approx 150+120 Bags'}</span>
                  </div>
                  <div className="sum-col">
                    <span className="sum-label">{lang === 'gu' ? 'પેકિંગ પ્રકાર / Packaging Type' : 'Packaging Type'}</span>
                    <strong className="sum-val">{lang === 'gu' ? '૨૦ કિગ્રા પ્રમાણિત ગાંસડી / બોરી' : '20kg Certified Bales'}</strong>
                    <span className="sum-sub">{lang === 'gu' ? 'સામાજિક વજન કાંટો સુગમ' : 'Standard weighbridge compatible'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 2: Quality & Expected Price Card */}
            <div className="ac-card ac-step-card">
              <div className="ac-step-header">
                <div className="ac-sh-left">
                  <span className="ac-sh-num green">૨</span>
                  <div className="ac-sh-titles">
                    <h2 className="ac-sh-main">{lang === 'gu' ? 'પગલું ૨: ક્વોલિટી અને અપેક્ષિત ભાવ' : 'Step 2: Quality & Expected Price'}</h2>
                    <span className="ac-sh-sub">{lang === 'gu' ? 'ગુણવત્તા માપદંડ, ઓર્ગેનિક પ્રમાણપત્ર અને પ્રતિ મણ ભાવ' : 'Quality parameters, organic certification & price per 20kg'}</span>
                  </div>
                </div>
                <button type="button" className="ac-btn-edit-step" onClick={() => setCurrentStep(2)}>
                  ✏️ {lang === 'gu' ? 'સુધારો (Edit)' : 'Edit'}
                </button>
              </div>

              {currentStep === 2 ? (
                <div className="ac-step-body open">
                  <div className="ac-quality-cards-grid">
                    <div
                      className={`ac-q-box ${qualityGrade === 'Grade A' ? 'selected' : ''}`}
                      onClick={() => setQualityGrade('Grade A')}
                    >
                      <div className="q-badge-header">
                        <span className="q-title">{lang === 'gu' ? 'Grade A (ઉત્તમ / Premium)' : 'Grade A (Premium)'}</span>
                        {qualityGrade === 'Grade A' && <span className="q-check">✓</span>}
                      </div>
                      <p className="q-desc">{lang === 'gu' ? 'સ્વચ્છ, સૂકી, સફેદ રંગ, મિશ્ર માત્રા < 2%' : 'Clean, dry, white fiber, impurity < 2%'}</p>
                    </div>

                    <div
                      className={`ac-q-box ${qualityGrade === 'Grade B' ? 'selected' : ''}`}
                      onClick={() => setQualityGrade('Grade B')}
                    >
                      <div className="q-badge-header">
                        <span className="q-title">{lang === 'gu' ? 'Grade B (મધ્યમ / Medium)' : 'Grade B (Medium)'}</span>
                        {qualityGrade === 'Grade B' && <span className="q-check">✓</span>}
                      </div>
                      <p className="q-desc">{lang === 'gu' ? 'હળવો પીળો છાંટો, ભેજ ૮% થી ૧૦%' : 'Slight cream tint, moisture 8% to 10%'}</p>
                    </div>

                    <div
                      className={`ac-q-box organic-box ${isOrganic ? 'selected' : ''}`}
                      onClick={() => setIsOrganic(!isOrganic)}
                    >
                      <div className="q-badge-header">
                        <span className="q-title">🌱 {lang === 'gu' ? 'ઓર્ગેનિક પ્રમાણિત' : 'Certified Organic'}</span>
                        <input type="checkbox" checked={isOrganic} readOnly />
                      </div>
                      <p className="q-desc">{lang === 'gu' ? 'NPOP સર્ટિફાઇડ ઓર્ગેનિક ખેત પેદાશ' : 'NPOP Certified organic crop produce'}</p>
                      <span className="org-pill-active">● {lang === 'gu' ? 'સક્રિય (Certified Active)' : 'Active Certified'}</span>
                    </div>
                  </div>

                  {/* Dynamic Price Benchmarking */}
                  <div className="ac-price-bench-card">
                    <div className="apmc-ref-row">
                      <div className="apmc-ref-info">
                        <span className="ref-dot">📈</span>
                        <span className="ref-text">
                          {lang === 'gu' ? `રાજકોટ યાર્ડનો આજનો મોડલ ભાવ: ` : `Rajkot APMC Today's Modal Rate: `}
                          <strong>₹{selectedCrop.apmcPrice} / ૨૦ કિગ્રા (મણ)</strong>
                        </span>
                      </div>
                      <span className="apmc-benchmark-tag">{lang === 'gu' ? 'યાર્ડ અપડેટ: આજે સવારે ૧૧:૧૫' : 'Yard Update: Today 11:15 AM'}</span>
                    </div>

                    <div className="ac-price-input-row">
                      <label>{lang === 'gu' ? 'તમારો અપેક્ષિત ભાવ (Expected Price per 20kg / મણ) *' : 'Your Expected Price per 20kg (Mound) *'}</label>
                      <div className="price-big-input-wrap">
                        <span className="rupee-sym">₹</span>
                        <input
                          type="number"
                          value={expectedPrice}
                          onChange={(e) => setExpectedPrice(Number(e.target.value))}
                          className="price-big-input"
                        />
                        <span className="per-mound-txt">{lang === 'gu' ? '/ ૨૦ કિગ્રા (મણ)' : '/ 20kg (Mound)'}</span>
                      </div>
                      <div className="price-diff-hint">
                        {expectedPrice > selectedCrop.apmcPrice ? (
                          <span className="diff-higher">
                            ▲ {lang === 'gu' ? `તમારો ભાવ બજાર ભાવથી +₹${expectedPrice - selectedCrop.apmcPrice} વધુ છે (ઉચ્ચ ગુણવત્તા આધારિત)` : `Your rate is +₹${expectedPrice - selectedCrop.apmcPrice} higher than APMC modal`}
                          </span>
                        ) : (
                          <span className="diff-fair">
                            ✓ {lang === 'gu' ? `તમારો ભાવ બજાર ભાવ સમકક્ષ છે - ઝડપી વેચાણ શક્ય` : `Your rate matches current market - fast deal likely`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ac-step-action-row">
                    <button type="button" className="ac-btn-proceed" onClick={() => setCurrentStep(3)}>
                      {lang === 'gu' ? 'ફોટા અપલોડ કરવા આગળ વધો →' : 'Proceed to Photo Upload →'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="ac-step-summary-row">
                  <div className="sum-col">
                    <span className="sum-label">{lang === 'gu' ? 'ગુણવત્તા ગ્રેડ / Quality Grade' : 'Quality Grade'}</span>
                    <strong className="sum-val">{qualityGrade} {lang === 'gu' ? '(ઉત્તમ / Premium)' : '(Premium)'}</strong>
                    <span className="sum-sub">{lang === 'gu' ? 'સ્વચ્છ, સૂકી, ભેજ માત્રા < ૮%' : 'Clean, dry, moisture < 8%'}</span>
                  </div>
                  <div className="sum-col">
                    <span className="sum-label">{lang === 'gu' ? 'ઓર્ગેનિક સ્ટેટસ / Organic' : 'Organic Status'}</span>
                    <strong className="sum-val">{isOrganic ? (lang === 'gu' ? '🌱 ઓર્ગેનિક પ્રમાણિત (NPOP)' : '🌱 NPOP Certified Organic') : (lang === 'gu' ? 'પરંપરાગત' : 'Conventional')}</strong>
                    <span className="sum-sub">{lang === 'gu' ? 'પ્રમાણપત્ર વેરિફિકેશન સક્રિય' : 'Certificate Active'}</span>
                  </div>
                  <div className="sum-col">
                    <span className="sum-label">{lang === 'gu' ? 'અપેક્ષિત ભાવ / Expected Rate' : 'Expected Rate'}</span>
                    <strong className="sum-val text-green-bold">₹{expectedPrice} / મણ</strong>
                    <span className="sum-sub">{lang === 'gu' ? `બજાર ભાવ કરતાં +₹${expectedPrice - selectedCrop.apmcPrice} વધુ` : `+₹${expectedPrice - selectedCrop.apmcPrice} vs APMC`}</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: Crop Photos Upload Card (Active in PDF) */}
            <div className={`ac-card ac-step-card ${currentStep === 3 ? 'active-step-border' : ''}`}>
              <div className="ac-step-header">
                <div className="ac-sh-left">
                  <span className="ac-sh-num green">૩</span>
                  <div className="ac-sh-titles">
                    <h2 className="ac-sh-main">{lang === 'gu' ? 'પગલું ૩: પાકના ફોટા અપલોડ કરો (Step 3: Crop Photos Upload)' : 'Step 3: Crop Photos Upload'}</h2>
                    <span className="ac-sh-sub">{lang === 'gu' ? 'ખરીદદારો અને વ્યાપારીઓનો વિશ્વાસ જીતવા ૫ સ્પષ્ટ ફોટા અપલોડ કરો (મહત્તમ ૫ ફોટા)' : 'Upload up to 5 clear photos for instant buyer confidence'}</span>
                  </div>
                </div>
                <div className="ac-photos-count-badge">
                  {lang === 'gu' ? '૪/૫ ફોટા અપલોડ થયેલ' : '4/5 Photos Uploaded'}
                </div>
              </div>

              <div className="ac-step-body open">
                
                {/* Photo Guide Callout */}
                <div className="ac-photo-guidance-pill">
                  <span className="p-guide-icon">💡</span>
                  <span>{lang === 'gu' ? 'ફોટો માર્ગદર્શન: સૂર્યપ્રકાશમાં લીધેલા ફોટા પસંદ કરો, દાણાનો ક્લોઝ-અપ અને પેકિંગ ભેગા ચોખ્ખી દેખાવી જરૂરી છે.' : 'Photo Guide: Use clear daylight photos, include a close-up of grains/staple, and one photo of weighbridge/packaging.'}</span>
                </div>

                {/* 5 Photo Tiles Grid */}
                <div className="ac-photos-grid">
                  {photos.map((item) => (
                    <div key={item.id} className="ac-photo-tile">
                      <div className="tile-img-box">
                        <img src={item.img} alt={item.labelGu} />
                        <span className="tile-check-badge">✓</span>
                        <div className="tile-header-tag">{item.tag}</div>
                      </div>
                      <div className="tile-footer">
                        <span className="tile-name">{lang === 'gu' ? item.labelGu : item.labelEn}</span>
                        <span className="tile-size">{item.size}</span>
                      </div>
                    </div>
                  ))}

                  {/* 5th Upload Tile */}
                  <div className="ac-photo-tile add-new-tile">
                    <div className="tile-add-inner">
                      <div className="add-cam-icon">📷</div>
                      <span className="add-tile-title">{lang === 'gu' ? 'વધારે ફોટો ઉમેરો' : 'Add More Photo'}</span>
                      <span className="add-tile-sub">{lang === 'gu' ? 'ટ્રેક્ટરનો પરિસર અથવા સ્ટોરેજ વેરહાઉસ ફોટો' : 'Tractor yard or warehouse storage'}</span>
                      <div className="add-tile-btn-row">
                        <button type="button" className="btn-cam" onClick={() => toast.success(lang === 'gu' ? 'કેમેરા ખોલવામાં આવ્યો...' : 'Opening camera...')}>
                          📷 {lang === 'gu' ? 'કેમેરા' : 'Camera'}
                        </button>
                        <button type="button" className="btn-gallery" onClick={() => toast.success(lang === 'gu' ? 'ગેલેરી પસંદગી...' : 'Opening gallery...')}>
                          🖼️ {lang === 'gu' ? 'ગેલેરી' : 'Gallery'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expert Tip Callout */}
                <div className="ac-expert-tip-box">
                  <span className="expert-star">⭐</span>
                  <div className="expert-text">
                    <strong>{lang === 'gu' ? 'હેપી એગ્રી એક્સપર્ટ ટિપ:' : 'Agri Expert Tip:'}</strong>{' '}
                    {lang === 'gu'
                      ? 'જે ખેડૂતો ૪ કે તેથી વધુ ગુણવત્તાવાળા ફોટા મૂકે છે તેમને વેપારીઓ તરફથી સરેરાશ ૧૫% થી ૨૦% ઝડપી અને બહેતર ભાવ મળે છે.'
                      : 'Farmers who upload 4 or more high-quality photos receive offers 15% to 20% faster at better prices.'}
                  </div>
                  <div className="expert-format-hint">
                    {lang === 'gu' ? 'માન્ય ફોર્મેટ: મહત્તમ 10MB | JPG/PNG' : 'Max size: 10MB | JPG/PNG'}
                  </div>
                </div>

                {/* Step Action Buttons */}
                <div className="ac-step-action-buttons">
                  <button type="button" className="ac-btn-back" onClick={() => setCurrentStep(2)}>
                    ← {lang === 'gu' ? 'પાછળ જાઓ (Back)' : 'Back to Step 2'}
                  </button>
                  <button type="button" className="ac-btn-proceed-green" onClick={() => setCurrentStep(4)}>
                    {lang === 'gu' ? 'આગળ વધો (Proceed to Step 4) →' : 'Proceed to Step 4 →'}
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 4: Location & Instant Publish Card */}
            <div className={`ac-card ac-step-card ${currentStep === 4 ? 'active-step-border' : ''}`}>
              <div className="ac-step-header">
                <div className="ac-sh-left">
                  <span className="ac-sh-num green">૪</span>
                  <div className="ac-sh-titles">
                    <h2 className="ac-sh-main">{lang === 'gu' ? 'પગલું ૪: સ્થાન અને પબ્લિશ (Step 4: Location & Publish)' : 'Step 4: Location & Publish'}</h2>
                    <span className="ac-sh-sub">{lang === 'gu' ? 'ખેતરનું સચોટ સરનામું, વ્યાપારી મુલાકાત મંજૂરી અને પબ્લિશ નિયમો' : 'Farm address, inspection readiness & instant live broadcast'}</span>
                  </div>
                </div>
                <button type="button" className="ac-btn-edit-step" onClick={() => setCurrentStep(4)}>
                  ✏️ {lang === 'gu' ? 'સુધારો (Edit)' : 'Edit'}
                </button>
              </div>

              <div className="ac-step-body open">
                <div className="ac-grid-3">
                  <div className="ac-input-group">
                    <label>{lang === 'gu' ? 'જિલ્લો / District' : 'District'}</label>
                    <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)} className="ac-input readonly-style" />
                  </div>
                  <div className="ac-input-group">
                    <label>{lang === 'gu' ? 'તાલુકો / Taluka' : 'Taluka'}</label>
                    <input type="text" value={taluka} onChange={(e) => setTaluka(e.target.value)} className="ac-input readonly-style" />
                  </div>
                  <div className="ac-input-group">
                    <label>{lang === 'gu' ? 'ગામ / Village' : 'Village'}</label>
                    <input type="text" value={village} onChange={(e) => setVillage(e.target.value)} className="ac-input readonly-style" />
                  </div>
                </div>

                <div className="ac-input-group full-width mt-12">
                  <label>{lang === 'gu' ? 'ખેતરનું સરનામું / લેન્ડ સર્વે નંબર (Farm Landmark & Survey No.) *' : 'Farm Landmark & Survey No. *'}</label>
                  <div className="ac-survey-wrap">
                    <input
                      type="text"
                      value={surveyNo}
                      onChange={(e) => setSurveyNo(e.target.value)}
                      className="ac-input"
                    />
                    <button type="button" className={`ac-gps-btn ${gpsLocked ? 'locked' : ''}`} onClick={handleGpsToggle}>
                      📍 {gpsLocked ? (lang === 'gu' ? 'GPS સ્થાન જોડાયેલ ✓' : 'GPS Attached ✓') : (lang === 'gu' ? 'GPS સ્થાન જોડો' : 'Attach GPS')}
                    </button>
                  </div>
                </div>

                {/* Farmer Declaration Box */}
                <div className="ac-declaration-box">
                  <label className="ac-dec-label">
                    <input
                      type="checkbox"
                      checked={declarationChecked}
                      onChange={(e) => setDeclarationChecked(e.target.checked)}
                      className="ac-checkbox"
                    />
                    <span className="dec-text">
                      <strong>{lang === 'gu' ? 'હું પુષ્ટિ કરું છું કે આ માલ મારા ખેતરમાં ઉપલબ્ધ છે' : 'I confirm that this stock is physically available on my farm'}</strong>{' '}
                      {lang === 'gu'
                        ? 'અને તમામ દર્શાવેલ વિગતો સાચી છે. હું ગુજરાત APMC તથા કિસાન બજારના નિયમો અને શરતોનું પાલન કરવા સહમત છું.'
                        : 'and all declared specifications are genuine. I agree to abide by Gujarat APMC and KisanBazaar trading terms.'}
                    </span>
                  </label>
                </div>

                {/* Final Publish Bar */}
                <div className="ac-publish-action-bar">
                  <div className="ac-pub-notice">
                    <span className="pub-bell">🔔</span>
                    <span>{lang === 'gu' ? 'પબ્લિશ થતાં જ ૨૨૦+ APMC વેપારીઓને SMS & WhatsApp એલર્ટ જશે.' : 'Instant notification will be sent to 220+ mandi buyers via SMS & WhatsApp.'}</span>
                  </div>
                  <button
                    type="button"
                    className="ac-btn-publish-instant"
                    disabled={isPublishing}
                    onClick={handlePublish}
                  >
                    {isPublishing ? (
                      lang === 'gu' ? 'પબ્લિશ થઈ રહ્યું છે...' : 'Publishing...'
                    ) : (
                      <>▶ {lang === 'gu' ? 'પાક તરત જ પબ્લિશ કરો (Publish Crop Listing Instantly)' : 'Publish Crop Listing Instantly'}</>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT: Sticky Live Buyer Preview Card */}
          <div className="ac-preview-col">
            <div className="ac-sticky-preview-card">
              
              <div className="ac-preview-header">
                <span className="pv-header-title">{lang === 'gu' ? 'ખરીદદારને આવું દેખાશે' : 'Buyer Preview'}</span>
                <span className="pv-live-pill">● {lang === 'gu' ? 'લાઈવ પ્રીવ્યૂ' : 'Live Preview'}</span>
              </div>

              {/* Preview Crop Image */}
              <div className="pv-img-wrap">
                <img src={selectedCrop.img} alt={selectedCrop.nameGu} className="pv-crop-img" />
                <span className="pv-grade-badge">{qualityGrade} {lang === 'gu' ? '(ઉત્તમ)' : '(Premium)'}</span>
                <span className="pv-verify-tag">🛡️ {lang === 'gu' ? '૭/૧૨ ચકાસાયેલ ખેડૂત' : '7/12 Verified Farmer'}</span>
              </div>

              {/* Crop Main Info */}
              <div className="pv-body">
                <h3 className="pv-crop-title">{lang === 'gu' ? selectedCrop.nameGu : selectedCrop.nameEn}</h3>
                
                <div className="pv-price-stock-grid">
                  <div className="pv-price-box">
                    <span className="pv-sub-label">{lang === 'gu' ? 'અપેક્ષિત ભાવ (Expected Rate)' : 'Expected Rate'}</span>
                    <strong className="pv-rate-highlight">₹{expectedPrice.toLocaleString()} <span className="mound-unit">{lang === 'gu' ? '/ મણ (૨૦ કિગ્રા)' : '/ Mound (20kg)'}</span></strong>
                  </div>
                  <div className="pv-stock-box">
                    <span className="pv-sub-label">{lang === 'gu' ? 'કુલ સ્ટોક' : 'Total Stock'}</span>
                    <strong className="pv-qty-val">{quantity} {lang === 'gu' ? 'ક્વિન્ટલ' : 'Qtl'}</strong>
                  </div>
                </div>

                <div className="pv-details-list">
                  <div className="pv-detail-item">
                    <span>📍 {lang === 'gu' ? 'સ્થળ:' : 'Location:'}</span>
                    <strong>{lang === 'gu' ? 'નવાગઢ, જેતપુર (રાજકોટ)' : 'Navagadh, Jetpur (Rajkot)'}</strong>
                  </div>
                  <div className="pv-detail-item">
                    <span>🌱 {lang === 'gu' ? 'ખેતી પદ્ધતિ:' : 'Farming:'}</span>
                    <strong className="text-green-bold">{isOrganic ? (lang === 'gu' ? 'ઓર્ગેનિક પદ્ધતિ (NPOP)' : 'Organic (NPOP)') : (lang === 'gu' ? 'પરંપરાગત' : 'Standard')}</strong>
                  </div>
                </div>

                {/* Mandi Benchmark Box */}
                <div className="pv-mandi-benchmarks">
                  <div className="bench-title">
                    <span>🏛️ {lang === 'gu' ? 'આજના આસપાસના યાર્ડના ભાવ:' : 'Nearby APMC Rates Today:'}</span>
                    <span>{lang === 'gu' ? 'આજનો દર' : 'Today'}</span>
                  </div>
                  <div className="bench-row">
                    <span>{lang === 'gu' ? 'રાજકોટ યાર્ડ (મોડલ):' : 'Rajkot APMC (Modal):'}</span>
                    <strong>₹{selectedCrop.apmcPrice}</strong>
                  </div>
                  <div className="bench-row">
                    <span>{lang === 'gu' ? 'ગોંડલ યાર્ડ:' : 'Gondal APMC:'}</span>
                    <strong>₹{selectedCrop.apmcPrice - 5}</strong>
                  </div>
                  <div className="bench-row">
                    <span>{lang === 'gu' ? 'અમરેલી યાર્ડ:' : 'Amreli APMC:'}</span>
                    <strong>₹{selectedCrop.apmcPrice - 30}</strong>
                  </div>
                  <div className="pv-mandi-conclusion">
                    ✓ {lang === 'gu' ? 'તમારો ભાવ વ્યાજબી અને વ્યાપારીઓ માટે આકર્ષક છે.' : 'Your price is competitive and attractive to buyers.'}
                  </div>
                </div>

                {/* Farmer Help Box */}
                <div className="pv-help-box">
                  <div className="help-icon">📞</div>
                  <div className="help-text">
                    <span className="help-q">{lang === 'gu' ? 'મદદ જોઈએ છે?' : 'Need Help?'}</span>
                    <span className="help-num">{lang === 'gu' ? 'કિસાન મિત્ર હેલ્પલાઇન: 1800-543-388' : 'Kisan Helpline: 1800-543-388'}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AddCropPage;
