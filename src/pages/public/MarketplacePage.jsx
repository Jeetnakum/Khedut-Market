import { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import './MarketplacePage.css';

/* ---- Mock Crop Listings Matching Exact Design ---- */
const INITIAL_CROPS = [
  {
    _id: '1',
    titleGu: 'સૌરાષ્ટ્ર શંકર કપાસ',
    titleEn: 'Shankar-6 Cotton (Long Staple)',
    category: 'Cotton',
    categoryGu: 'કપાસ',
    gradeGu: 'GRADE A (ઉત્તમ)',
    gradeEn: 'GRADE A (Premium)',
    badgeClass: 'badge-grade-a',
    verifiedGu: '૭/૧૨ ચકાસાયેલ ખેડૂત',
    verifiedEn: '7/12 Verified Farmer',
    trend: '+2.4%',
    trendUp: true,
    image: '/crops/cotton.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1594489428504-5c0c480a15fd?w=800&auto=format&fit=crop&q=80',
    quantityGu: '350 ક્વિન્ટલ',
    quantityEn: '350 Quintal',
    quantityNum: 350,
    unit: 'ક્વિન્ટલ',
    locationGu: 'જેતપુર, રાજકોટ',
    locationEn: 'Jetpur, Rajkot',
    districtGu: 'રાજકોટ',
    districtEn: 'Rajkot',
    districtVal: 'Rajkot',
    price20kg: 1710,
    apmcRate20kg: 1680,
    farmerGu: 'હરસુખભાઈ પટેલ',
    farmerEn: 'Harsukhbhai Patel',
    farmerPhone: '+91 98251 44520',
    gradeVal: 'Grade A',
    staple: '29mm',
    moisture: '7.5%',
  },
  {
    _id: '2',
    titleGu: 'ઊંઝા સ્પેશિયલ જીરૂ',
    titleEn: 'Unjha Machine-Clean Cumin Seeds',
    category: 'Cumin',
    categoryGu: 'જીરૂ',
    gradeGu: 'GRADE A+ (પ્રિમીયમ)',
    gradeEn: 'GRADE A+ (Premium)',
    badgeClass: 'badge-grade-aplus',
    verifiedGu: 'ચકાસાયેલ ખેડૂત',
    verifiedEn: 'Verified Farmer',
    trend: '+1.8%',
    trendUp: true,
    image: '/crops/cumin.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=80',
    quantityGu: '120 બોરી (Bags)',
    quantityEn: '120 Bags',
    quantityNum: 120,
    unit: 'બોરી (Bags)',
    locationGu: 'ઊંઝા, મહેસાણા',
    locationEn: 'Unjha, Mehsana',
    districtGu: 'મહેસાણા',
    districtEn: 'Mehsana',
    districtVal: 'Mehsana',
    price20kg: 5600,
    apmcRate20kg: 5400,
    farmerGu: 'કાનજીભાઈ ચૌધરી',
    farmerEn: 'Kanjibhai Chaudhary',
    farmerPhone: '+91 94280 33119',
    gradeVal: 'Grade A',
    moisture: '6.8%',
    purity: '99.5%',
  },
  {
    _id: '3',
    titleGu: 'જામનગરી જી-20 મગફળી',
    titleEn: 'Bold Groundnut G-20 (High Oil)',
    category: 'Groundnut',
    categoryGu: 'મગફળી',
    gradeGu: 'GRADE A (બોલ્ડ)',
    gradeEn: 'GRADE A (Bold)',
    badgeClass: 'badge-grade-bold',
    verifiedGu: '૭/૧૨ ચકાસાયેલ ખેડૂત',
    verifiedEn: '7/12 Verified Farmer',
    trend: '0.0%',
    trendUp: null,
    image: '/crops/groundnut.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1567892328731-0814f1454848?w=800&auto=format&fit=crop&q=80',
    quantityGu: '500 ક્વિન્ટલ',
    quantityEn: '500 Quintal',
    quantityNum: 500,
    unit: 'ક્વિન્ટલ',
    locationGu: 'કાલાવડ, જામનગર',
    locationEn: 'Kalavad, Jamnagar',
    districtGu: 'જામનગર',
    districtEn: 'Jamnagar',
    districtVal: 'Jamnagar',
    price20kg: 1380,
    apmcRate20kg: 1320,
    farmerGu: 'મનસુખભાઈ વઘાસિયા',
    farmerEn: 'Mansukhbhai Vaghasiya',
    farmerPhone: '+91 97241 88921',
    gradeVal: 'Grade A',
    oilContent: '48%',
    moisture: '8.0%',
  },
  {
    _id: '4',
    titleGu: 'ભાલિયા ટુકડા ઘઉં',
    titleEn: 'Premium Bhalia Wheat (Organic Desi)',
    category: 'Wheat',
    categoryGu: 'ઘઉં',
    gradeGu: 'GRADE A (ઓર્ગેનિક)',
    gradeEn: 'GRADE A (Organic)',
    badgeClass: 'badge-grade-organic',
    verifiedGu: 'લેબ ટેસ્ટ પ્રમાણિત',
    verifiedEn: 'Lab Test Certified',
    trend: '+1.2%',
    trendUp: true,
    image: '/crops/wheat.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
    quantityGu: '200 બોરી (Bags)',
    quantityEn: '200 Bags',
    quantityNum: 200,
    unit: 'બોરી (Bags)',
    locationGu: 'ધંધૂકા, અમદાવાદ',
    locationEn: 'Dhandhuka, Ahmedabad',
    districtGu: 'અમદાવાદ',
    districtEn: 'Ahmedabad',
    districtVal: 'Ahmedabad',
    price20kg: 980,
    apmcRate20kg: 920,
    farmerGu: 'વિઠ્ઠલભાઈ ભરવાડ',
    farmerEn: 'Vithalbhai Bharwad',
    farmerPhone: '+91 99092 11456',
    gradeVal: 'Organic',
    protein: '14.2%',
    moisture: '9.0%',
  },
  {
    _id: '5',
    titleGu: 'બનાસકાંઠા દેશી રાયડો',
    titleEn: 'Mustard Seeds (High Pungency)',
    category: 'Mustard',
    categoryGu: 'રાયડો',
    gradeGu: 'GRADE B (મધ્યમ)',
    gradeEn: 'GRADE B (Medium)',
    badgeClass: 'badge-grade-b',
    verifiedGu: '૭/૧૨ ચકાસાયેલ',
    verifiedEn: '7/12 Verified',
    trend: '-0.5%',
    trendUp: false,
    image: '/crops/mustard.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    quantityGu: '180 ક્વિન્ટલ',
    quantityEn: '180 Quintal',
    quantityNum: 180,
    unit: 'ક્વિન્ટલ',
    locationGu: 'ડીસા, બનાસકાંઠા',
    locationEn: 'Deesa, Banaskantha',
    districtGu: 'બનાસકાંઠા',
    districtEn: 'Banaskantha',
    districtVal: 'Banaskantha',
    price20kg: 1120,
    apmcRate20kg: 1150,
    farmerGu: 'રમેશભાઈ રબારી',
    farmerEn: 'Rameshbhai Rabari',
    farmerPhone: '+91 96384 55210',
    gradeVal: 'Grade B',
    oilContent: '41%',
    moisture: '7.8%',
  },
  {
    _id: '6',
    titleGu: 'સફેદ તલ',
    titleEn: 'White Sesame Seeds (Export Grade)',
    category: 'Sesame',
    categoryGu: 'તલ',
    gradeGu: 'GRADE A (સુપર વ્હાઇટ)',
    gradeEn: 'GRADE A (Super White)',
    badgeClass: 'badge-grade-white',
    verifiedGu: '૭/૧૨ ચકાસાયેલ',
    verifiedEn: '7/12 Verified',
    trend: '+3.1%',
    trendUp: true,
    image: '/crops/sesame.jpg',
    onlineImage: 'https://images.unsplash.com/photo-1508736793122-f516e3ba5569?w=800&auto=format&fit=crop&q=80',
    quantityGu: '80 ક્વિન્ટલ',
    quantityEn: '80 Quintal',
    quantityNum: 80,
    unit: 'ક્વિન્ટલ',
    locationGu: 'મહુવા, ભાવનગર',
    locationEn: 'Mahuva, Bhavnagar',
    districtGu: 'ભાવનગર',
    districtEn: 'Bhavnagar',
    districtVal: 'Bhavnagar',
    price20kg: 2950,
    apmcRate20kg: 2850,
    farmerGu: 'બાબુભાઈ કોળી',
    farmerEn: 'Babubhai Koli',
    farmerPhone: '+91 97123 77890',
    gradeVal: 'Grade A',
    purity: '99.8%',
    moisture: '6.2%',
  },
];

/* Districts list matching sidebar */
const DISTRICT_LIST = [
  { gu: 'રાજકોટ', en: 'Rajkot', val: 'Rajkot', count: 142 },
  { gu: 'જૂનાગઢ', en: 'Junagadh', val: 'Junagadh', count: 78 },
  { gu: 'અમરેલી', en: 'Amreli', val: 'Amreli', count: 84 },
  { gu: 'જામનગર', en: 'Jamnagar', val: 'Jamnagar', count: 65 },
  { gu: 'મહેસાણા', en: 'Mehsana', val: 'Mehsana', count: 110 },
  { gu: 'ભાવનગર', en: 'Bhavnagar', val: 'Bhavnagar', count: 92 },
  { gu: 'અમદાવાદ', en: 'Ahmedabad', val: 'Ahmedabad', count: 48 },
  { gu: 'બનાસકાંઠા', en: 'Banaskantha', val: 'Banaskantha', count: 88 },
];

/* Category options */
const CATEGORY_LIST = [
  { val: 'Cotton', icon: '🌿', gu: 'કપાસ / Cotton', en: 'Cotton', count: 210 },
  { val: 'Cumin', icon: '🟡', gu: 'જીરૂ / Cumin', en: 'Cumin', count: 145 },
  { val: 'Groundnut', icon: '🥜', gu: 'મગફળી / Groundnut', en: 'Groundnut', count: 186 },
  { val: 'Wheat', icon: '🌾', gu: 'ઘઉં / Wheat', en: 'Wheat', count: 95 },
  { val: 'Mustard', icon: '🌱', gu: 'રાયડો / Mustard', en: 'Mustard', count: 68 },
  { val: 'Sesame', icon: '⚪', gu: 'તલ / Sesame', en: 'Sesame', count: 42 },
  { val: 'Castor', icon: '🍃', gu: 'દિવેલા / Castor', en: 'Castor', count: 56 },
];

/* Quality grades */
const GRADE_PILLS = [
  { val: 'Grade A', gu: 'Grade A (પ્રિમીયમ)', en: 'Grade A (Premium)' },
  { val: 'Grade B', gu: 'Grade B (મધ્યમ)', en: 'Grade B (Medium)' },
  { val: 'Grade C', gu: 'Grade C (સામાન્ય)', en: 'Grade C (Standard)' },
  { val: 'Organic', gu: '🌿 ઓર્ગેનિક સર્ટિફાઇડ', en: '🌿 Certified Organic' },
];

/* Quantity filters */
const QTY_PILLS = [
  { min: 50, label: '50+ Qtl' },
  { min: 100, label: '100+ Qtl' },
  { min: 500, label: '500+ Qtl' },
];

const MarketplacePage = () => {
  const { lang, t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Filters State — Pre-populated to mirror the screenshot exactly by default
  const [keyword, setKeyword] = useState(searchParams.get('search') || '');
  const [districtSearch, setDistrictSearch] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState(['Rajkot', 'Junagadh']);
  const [selectedCategories, setSelectedCategories] = useState(['Cotton', 'Cumin']);
  const [selectedGrade, setSelectedGrade] = useState('Grade A');
  const [priceMin, setPriceMin] = useState(500);
  const [priceMax, setPriceMax] = useState(6000);
  const [selectedQty, setSelectedQty] = useState(100);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [activeModalCrop, setActiveModalCrop] = useState(null);
  const [chatModalCrop, setChatModalCrop] = useState(null);

  // Filter District List by search
  const filteredDistrictList = useMemo(() => {
    if (!districtSearch.trim()) return DISTRICT_LIST;
    const q = districtSearch.toLowerCase();
    return DISTRICT_LIST.filter(d =>
      d.gu.toLowerCase().includes(q) || d.en.toLowerCase().includes(q)
    );
  }, [districtSearch]);

  // District checkbox toggle
  const toggleDistrict = (val) => {
    setSelectedDistricts(prev =>
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
    );
  };

  // Category checkbox toggle
  const toggleCategory = (val) => {
    setSelectedCategories(prev =>
      prev.includes(val) ? prev.filter(c => c !== val) : [...prev, val]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setKeyword('');
    setDistrictSearch('');
    setSelectedDistricts([]);
    setSelectedCategories([]);
    setSelectedGrade(null);
    setPriceMin(500);
    setPriceMax(6000);
    setSelectedQty(null);
    setSortBy('newest');
    toast.success(lang === 'gu' ? 'બધા ફિલ્ટર્સ સાફ થયા' : 'All filters reset');
  };

  // Filter & Sort Crops
  const filteredCrops = useMemo(() => {
    return INITIAL_CROPS.filter(crop => {
      // Keyword
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const matchTitle = crop.titleGu.toLowerCase().includes(q) || crop.titleEn.toLowerCase().includes(q);
        const matchFarmer = crop.farmerGu.toLowerCase().includes(q) || crop.farmerEn.toLowerCase().includes(q);
        const matchLoc = crop.locationGu.toLowerCase().includes(q) || crop.locationEn.toLowerCase().includes(q);
        if (!matchTitle && !matchFarmer && !matchLoc) return false;
      }
      // Districts
      if (selectedDistricts.length > 0 && !selectedDistricts.includes(crop.districtVal)) {
        return false;
      }
      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(crop.category)) {
        return false;
      }
      // Grade
      if (selectedGrade && crop.gradeVal !== selectedGrade) {
        return false;
      }
      // Price Range (20kg)
      if (crop.price20kg < priceMin || crop.price20kg > priceMax) {
        return false;
      }
      // Quantity
      if (selectedQty && crop.quantityNum < selectedQty) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price20kg - b.price20kg;
      if (sortBy === 'price-high') return b.price20kg - a.price20kg;
      if (sortBy === 'qty-high') return b.quantityNum - a.quantityNum;
      return 0; // default order
    });
  }, [keyword, selectedDistricts, selectedCategories, selectedGrade, priceMin, priceMax, selectedQty, sortBy]);

  // Handle WhatsApp / Chat click
  const handleOpenChat = (crop) => {
    const text = encodeURIComponent(
      lang === 'gu'
        ? `નમસ્તે ${crop.farmerGu}, મેં કિસાન બજાર પર તમારો ${crop.titleGu} (ભાવ ₹${crop.price20kg}/મણ) જોયો છે. મારે આ ખરીદવો છે.`
        : `Hello ${crop.farmerEn}, I saw your listing for ${crop.titleEn} (₹${crop.price20kg}/20kg) on KisanBazaar. I am interested in buying.`
    );
    const waUrl = `https://wa.me/${crop.farmerPhone.replace(/[^0-9]/g, '')}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="marketplace-wrapper">

      {/* 1. Sub-Header: Breadcrumbs & Trust Badges */}
      <div className="mkt-subheader">
        <div className="mkt-subheader__inner">
          <div className="mkt-breadcrumbs">
            <Link to="/" className="mkt-bread-link">
              🏠 {lang === 'gu' ? 'મુખ્ય પેજ' : 'Home'}
            </Link>
            <span className="mkt-bread-sep">›</span>
            <span className="mkt-bread-current">
              {lang === 'gu' ? 'પાક બજાર / Crop Marketplace' : 'Crop Marketplace'}
            </span>
          </div>

          <div className="mkt-trust-badges">
            <div className="mkt-trust-badge">
              <span className="mkt-trust-icon">🛡️</span>
              <span>{lang === 'gu' ? '૭/૧૨ ચકાસાયેલ ખેડૂતો' : '7/12 Land Record Verified'}</span>
            </div>
            <span className="mkt-trust-sep">•</span>
            <div className="mkt-trust-badge">
              <span className="mkt-trust-icon">🚚</span>
              <span>{lang === 'gu' ? 'મંડી સીધો વેપાર' : 'Direct Mandi Trade'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Marketplace 2-Column Layout */}
      <div className="mkt-container">
        
        {/* LEFT COLUMN: Filters Sidebar */}
        <aside className="mkt-sidebar">
          
          {/* Sidebar Top Title + Reset */}
          <div className="mkt-sidebar__header">
            <div className="mkt-sidebar__title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              <span>{lang === 'gu' ? 'ફિલ્ટર્સ (Filters)' : 'Filters'}</span>
            </div>
            <button className="mkt-sidebar__reset-btn" onClick={handleResetFilters} title="Reset all filters">
              <span className="reset-icon">↺</span>
              <span>{lang === 'gu' ? 'ફિલ્ટર્સ સાફ કરો (Reset Filters)' : 'Reset Filters'}</span>
            </button>
          </div>

          {/* Section 1: Keyword Search */}
          <div className="mkt-filter-block">
            <label className="mkt-filter-label">
              {lang === 'gu' ? 'શોધ (Keyword Search)' : 'Keyword Search'}
            </label>
            <div className="mkt-search-input-wrap">
              <input
                type="text"
                className="mkt-input"
                placeholder={lang === 'gu' ? 'પાકનું નામ અથવા ખેડૂત શોધો...' : 'Search crop or farmer...'}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <span className="mkt-input-icon">🔍</span>
            </div>
          </div>

          {/* Section 2: Gujarat Districts */}
          <div className="mkt-filter-block">
            <div className="mkt-filter-label-row">
              <label className="mkt-filter-label">
                {lang === 'gu' ? 'ગુજરાતના જિલ્લાઓ (Districts - 33)' : 'Gujarat Districts (33)'}
              </label>
              <span className="mkt-label-count">{lang === 'gu' ? 'કુલ 33' : 'Total 33'}</span>
            </div>

            <div className="mkt-search-input-wrap mkt-subsearch">
              <input
                type="text"
                className="mkt-input mkt-input-sm"
                placeholder={lang === 'gu' ? '🔍 જિલ્લો શોધો... (Search district)' : '🔍 Search district...'}
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
              />
            </div>

            <div className="mkt-checkbox-list">
              {filteredDistrictList.map(dist => (
                <label key={dist.val} className="mkt-checkbox-item">
                  <div className="mkt-cb-left">
                    <input
                      type="checkbox"
                      className="mkt-checkbox"
                      checked={selectedDistricts.includes(dist.val)}
                      onChange={() => toggleDistrict(dist.val)}
                    />
                    <span className="mkt-cb-text">
                      {lang === 'gu' ? `${dist.gu} (${dist.en})` : `${dist.en} (${dist.gu})`}
                    </span>
                  </div>
                  <span className="mkt-cb-count">{dist.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Crop Categories */}
          <div className="mkt-filter-block">
            <label className="mkt-filter-label">
              {lang === 'gu' ? 'પાક કેટેગરી (Crop Category)' : 'Crop Category'}
            </label>
            <div className="mkt-checkbox-list">
              {CATEGORY_LIST.map(cat => (
                <label key={cat.val} className="mkt-checkbox-item">
                  <div className="mkt-cb-left">
                    <input
                      type="checkbox"
                      className="mkt-checkbox"
                      checked={selectedCategories.includes(cat.val)}
                      onChange={() => toggleCategory(cat.val)}
                    />
                    <span className="mkt-cat-icon">{cat.icon}</span>
                    <span className="mkt-cb-text">
                      {lang === 'gu' ? cat.gu : cat.en}
                    </span>
                  </div>
                  <span className="mkt-cb-count">{cat.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 4: Quality Grade Pills */}
          <div className="mkt-filter-block">
            <label className="mkt-filter-label">
              {lang === 'gu' ? 'ગુણવત્તા ગ્રેડ (Quality Grade)' : 'Quality Grade'}
            </label>
            <div className="mkt-pills-wrap">
              {GRADE_PILLS.map(pill => (
                <button
                  key={pill.val}
                  type="button"
                  className={`mkt-pill-btn ${selectedGrade === pill.val ? 'active' : ''}`}
                  onClick={() => setSelectedGrade(selectedGrade === pill.val ? null : pill.val)}
                >
                  {lang === 'gu' ? pill.gu : pill.en}
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Price Range / 20kg મણ */}
          <div className="mkt-filter-block">
            <label className="mkt-filter-label">
              {lang === 'gu' ? 'ભાવ રેન્જ (Price Range / 20kg મણ)' : 'Price Range (per 20kg)'}
            </label>
            
            <div className="mkt-slider-container">
              <input
                type="range"
                min="300"
                max="8000"
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="mkt-range-slider"
              />
            </div>

            <div className="mkt-price-inputs-row">
              <div className="mkt-price-box">
                <span className="mkt-price-box-label">{lang === 'gu' ? 'ન્યૂનતમ (Min)' : 'Min'}</span>
                <div className="mkt-price-field">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    value={priceMin}
                    onChange={(e) => setPriceMin(Number(e.target.value))}
                    className="mkt-price-input"
                  />
                </div>
              </div>

              <span className="mkt-price-dash">-</span>

              <div className="mkt-price-box">
                <span className="mkt-price-box-label">{lang === 'gu' ? 'મહત્તમ (Max)' : 'Max'}</span>
                <div className="mkt-price-field">
                  <span className="currency-symbol">₹</span>
                  <input
                    type="number"
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="mkt-price-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Quantity Pills */}
          <div className="mkt-filter-block no-border">
            <label className="mkt-filter-label">
              {lang === 'gu' ? 'જથ્થો (Quantity)' : 'Quantity'}
            </label>
            <div className="mkt-qty-pills">
              {QTY_PILLS.map(q => (
                <button
                  key={q.min}
                  type="button"
                  className={`mkt-qty-btn ${selectedQty === q.min ? 'active' : ''}`}
                  onClick={() => setSelectedQty(selectedQty === q.min ? null : q.min)}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

        </aside>

        {/* RIGHT COLUMN: Results Header + Crop Grid */}
        <main className="mkt-main-content">
          
          {/* Main Content Top Bar */}
          <div className="mkt-header-bar">
            <div className="mkt-header-left">
              <h1 className="mkt-results-title">
                {lang === 'gu'
                  ? '૧,૨૪૮ પાકની જાહેરાતો ઉપલબ્ધ'
                  : '1,248 Active Crop Listings'}
                <span className="mkt-results-sub">
                  ({filteredCrops.length} {lang === 'gu' ? 'મળ્યા' : 'Active Listings'})
                </span>
              </h1>

              {/* Active Filter Badges */}
              <div className="mkt-active-chips">
                {selectedDistricts.length > 0 && (
                  <span className="mkt-chip">
                    {selectedDistricts.map(d => {
                      const found = DISTRICT_LIST.find(x => x.val === d);
                      return found ? (lang === 'gu' ? found.gu : found.en) : d;
                    }).join(', ')}
                    <button onClick={() => setSelectedDistricts([])} className="mkt-chip-x">✕</button>
                  </span>
                )}

                {selectedCategories.length > 0 && (
                  <span className="mkt-chip">
                    {selectedCategories.map(c => {
                      const found = CATEGORY_LIST.find(x => x.val === c);
                      return found ? (lang === 'gu' ? found.gu.split('/')[0].trim() : found.en) : c;
                    }).join(', ')}
                    <button onClick={() => setSelectedCategories([])} className="mkt-chip-x">✕</button>
                  </span>
                )}

                {selectedGrade && (
                  <span className="mkt-chip">
                    {selectedGrade}
                    <button onClick={() => setSelectedGrade(null)} className="mkt-chip-x">✕</button>
                  </span>
                )}

                {selectedQty && (
                  <span className="mkt-chip">
                    {selectedQty}+ Qtl
                    <button onClick={() => setSelectedQty(null)} className="mkt-chip-x">✕</button>
                  </span>
                )}

                {(selectedDistricts.length > 0 || selectedCategories.length > 0 || selectedGrade || selectedQty) && (
                  <button className="mkt-clear-all-link" onClick={handleResetFilters}>
                    {lang === 'gu' ? 'બધા કાઢો' : 'Clear all'}
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="mkt-header-right">
              <span className="mkt-sort-label">
                {lang === 'gu' ? 'ક્રમમાં ગોઠવો:' : 'Sort by:'}
              </span>
              <div className="mkt-sort-select-wrapper">
                <select
                  className="mkt-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">
                    {lang === 'gu' ? 'નવા મુકેલા પાક (Newest First)' : 'Newest First'}
                  </option>
                  <option value="price-low">
                    {lang === 'gu' ? 'ભાવ: ઓછો થી વધુ (Price: Low-High)' : 'Price: Low to High'}
                  </option>
                  <option value="price-high">
                    {lang === 'gu' ? 'ભાવ: વધુ થી ઓછો (Price: High-Low)' : 'Price: High to Low'}
                  </option>
                  <option value="qty-high">
                    {lang === 'gu' ? 'સૌથી વધુ જથ્થો (Highest Quantity)' : 'Highest Quantity'}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* 3-Column Grid of 6 Realistic Crop Cards */}
          {filteredCrops.length > 0 ? (
            <div className="mkt-cards-grid">
              {filteredCrops.map(crop => (
                <div key={crop._id} className="mkt-card">
                  
                  {/* Card Image Area */}
                  <div className="mkt-card__image-wrap">
                    <img
                      src={crop.image}
                      alt={crop.titleGu}
                      className="mkt-card__image"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback to online image or clean container
                        if (e.target.src !== crop.onlineImage) {
                          e.target.src = crop.onlineImage;
                        }
                      }}
                    />

                    {/* Top Grade Badge */}
                    <div className={`mkt-card__grade-badge ${crop.badgeClass}`}>
                      {lang === 'gu' ? crop.gradeGu : crop.gradeEn}
                    </div>

                    {/* Bottom Verification Banner */}
                    <div className="mkt-card__verify-banner">
                      <span className="shield-icon">🛡️</span>
                      <span>{lang === 'gu' ? crop.verifiedGu : crop.verifiedEn}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="mkt-card__body">
                    
                    {/* Title & Trend Badge */}
                    <div className="mkt-card__title-row">
                      <h2 className="mkt-card__title">
                        {lang === 'gu' ? crop.titleGu : crop.titleEn}
                      </h2>
                      <div className={`mkt-card__trend ${crop.trendUp === true ? 'trend-up' : crop.trendUp === false ? 'trend-down' : 'trend-neutral'}`}>
                        {crop.trendUp === true ? '▲ ' : crop.trendUp === false ? '▼ ' : '▬ '}
                        {crop.trend}
                      </div>
                    </div>

                    {/* Subtitle in English / Details */}
                    <div className="mkt-card__subtitle">
                      {crop.titleEn}
                    </div>

                    {/* Specs Box (Quantity & Location) */}
                    <div className="mkt-card__specs-box">
                      <div className="mkt-spec-col">
                        <span className="mkt-spec-label">
                          {lang === 'gu' ? 'ઉપલબ્ધ જથ્થો:' : 'Available Qty:'}
                        </span>
                        <span className="mkt-spec-val">
                          {lang === 'gu' ? crop.quantityGu : crop.quantityEn}
                        </span>
                      </div>

                      <div className="mkt-spec-col text-right">
                        <span className="mkt-spec-label">
                          {lang === 'gu' ? 'સ્થળ:' : 'Location:'}
                        </span>
                        <span className="mkt-spec-val">
                          📍 {lang === 'gu' ? crop.locationGu : crop.locationEn}
                        </span>
                      </div>
                    </div>

                    {/* Price & Farmer Row */}
                    <div className="mkt-card__price-row">
                      <div className="mkt-price-left">
                        <span className="mkt-price-label">
                          {lang === 'gu' ? 'ભાવ (પ્રતિ 20 કિલો મણ):' : 'Price (per 20 kg):'}
                        </span>
                        <div className="mkt-price-amount">
                          <span className="mkt-price-num">₹{crop.price20kg.toLocaleString()}</span>
                          <span className="mkt-price-unit">{lang === 'gu' ? '/ મણ' : '/ 20kg'}</span>
                        </div>
                      </div>

                      <div className="mkt-farmer-right">
                        <span className="mkt-farmer-label">
                          {lang === 'gu' ? 'ખેડૂત:' : 'Farmer:'}
                        </span>
                        <span className="mkt-farmer-name">
                          {lang === 'gu' ? crop.farmerGu : crop.farmerEn}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mkt-card__actions">
                      <Link
                        to={`/listings/${crop._id}`}
                        className="mkt-btn-view"
                      >
                        <span>{lang === 'gu' ? 'વિગત જુઓ (View Details)' : 'View Details'}</span>
                        <span className="btn-arrow">→</span>
                      </Link>

                      <button
                        type="button"
                        className="mkt-btn-chat"
                        title={lang === 'gu' ? 'ખેડૂત સાથે વાત કરો (WhatsApp / Chat)' : 'Chat with Farmer'}
                        onClick={() => handleOpenChat(crop)}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mkt-empty-box">
              <div className="mkt-empty-icon">🌾</div>
              <h3>{lang === 'gu' ? 'કોઈ પાક મળ્યો નથી' : 'No crops match your filters'}</h3>
              <p>{lang === 'gu' ? 'કૃપા કરીને ફિલ્ટર્સ બદલો અથવા સાફ કરો' : 'Try adjusting or clearing your filters'}</p>
              <button className="mkt-reset-empty-btn" onClick={handleResetFilters}>
                {lang === 'gu' ? 'બધા ફિલ્ટર્સ સાફ કરો' : 'Reset All Filters'}
              </button>
            </div>
          )}

          {/* Bottom Pagination matching screenshot */}
          <div className="mkt-pagination">
            <button
              className="mkt-page-nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            >
              ‹
            </button>
            <button
              className={`mkt-page-number ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className={`mkt-page-number ${currentPage === 2 ? 'active' : ''}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              className={`mkt-page-number ${currentPage === 3 ? 'active' : ''}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <span className="mkt-page-dots">...</span>
            <button
              className={`mkt-page-number ${currentPage === 15 ? 'active' : ''}`}
              onClick={() => setCurrentPage(15)}
            >
              15
            </button>
            <button
              className="mkt-page-nav"
              onClick={() => setCurrentPage(p => Math.min(15, p + 1))}
            >
              ›
            </button>
          </div>

        </main>
      </div>

      {/* Detail Modal Component */}
      {activeModalCrop && (
        <div className="mkt-modal-overlay" onClick={() => setActiveModalCrop(null)}>
          <div className="mkt-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="mkt-modal-close" onClick={() => setActiveModalCrop(null)}>✕</button>

            <div className="mkt-modal-header">
              <div className="mkt-modal-img-wrap">
                <img src={activeModalCrop.image} alt={activeModalCrop.titleGu} />
              </div>
              <div className="mkt-modal-header-info">
                <span className={`mkt-card__grade-badge ${activeModalCrop.badgeClass}`}>
                  {lang === 'gu' ? activeModalCrop.gradeGu : activeModalCrop.gradeEn}
                </span>
                <h2>{lang === 'gu' ? activeModalCrop.titleGu : activeModalCrop.titleEn}</h2>
                <p className="modal-en-title">{activeModalCrop.titleEn}</p>
                <div className="mkt-modal-price-tag">
                  <span className="tag-price">₹{activeModalCrop.price20kg}</span>
                  <span className="tag-unit">{lang === 'gu' ? 'પ્રતિ 20 કિલો મણ' : 'per 20kg'}</span>
                  <span className="tag-apmc">
                    (APMC: ₹{activeModalCrop.apmcRate20kg})
                  </span>
                </div>
              </div>
            </div>

            <div className="mkt-modal-body">
              <div className="modal-specs-grid">
                <div className="modal-spec-item">
                  <span className="spec-name">{lang === 'gu' ? 'ઉપલબ્ધ જથ્થો' : 'Quantity'}</span>
                  <span className="spec-val">{lang === 'gu' ? activeModalCrop.quantityGu : activeModalCrop.quantityEn}</span>
                </div>
                <div className="modal-spec-item">
                  <span className="spec-name">{lang === 'gu' ? 'સ્થળ / તાલુકો' : 'Location'}</span>
                  <span className="spec-val">📍 {lang === 'gu' ? activeModalCrop.locationGu : activeModalCrop.locationEn}</span>
                </div>
                <div className="modal-spec-item">
                  <span className="spec-name">{lang === 'gu' ? 'ખેડૂતનું નામ' : 'Farmer Name'}</span>
                  <span className="spec-val">👤 {lang === 'gu' ? activeModalCrop.farmerGu : activeModalCrop.farmerEn}</span>
                </div>
                <div className="modal-spec-item">
                  <span className="spec-name">{lang === 'gu' ? 'વેરિફિકેશન' : 'Verification'}</span>
                  <span className="spec-val text-green">🛡️ {lang === 'gu' ? activeModalCrop.verifiedGu : activeModalCrop.verifiedEn}</span>
                </div>
                {activeModalCrop.moisture && (
                  <div className="modal-spec-item">
                    <span className="spec-name">{lang === 'gu' ? 'ભેજ (Moisture)' : 'Moisture'}</span>
                    <span className="spec-val">{activeModalCrop.moisture}</span>
                  </div>
                )}
                {activeModalCrop.oilContent && (
                  <div className="modal-spec-item">
                    <span className="spec-name">{lang === 'gu' ? 'તેલ ટકાવારી (Oil)' : 'Oil Content'}</span>
                    <span className="spec-val">{activeModalCrop.oilContent}</span>
                  </div>
                )}
              </div>

              <div className="mkt-modal-actions">
                <button
                  className="modal-btn-wa"
                  onClick={() => handleOpenChat(activeModalCrop)}
                >
                  💬 {lang === 'gu' ? 'ખેડૂત સાથે WhatsApp પર વાત કરો' : 'WhatsApp Farmer'}
                </button>
                <a
                  href={`tel:${activeModalCrop.farmerPhone}`}
                  className="modal-btn-call"
                >
                  📞 {lang === 'gu' ? 'સીધો ફોન કરો' : 'Direct Call'}
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MarketplacePage;
