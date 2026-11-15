import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './Navbar.css';

/* ---- Live APMC Ticker Data matching Image 1 & PDF 2 ---- */
const TICKER_ITEMS = [
  { apmc: 'રાજકોટ યાર્ડ', crop: 'કપાસ શંકર', range: '₹1,480 - ₹1,745 / 20 કિ.ગ્રા.', change: '+₹35', up: true },
  { apmc: 'ગોંડલ યાર્ડ', crop: 'મગફળી G-20', range: '₹1,340 - ₹1,410 / 20 કિ.ગ્રા.', change: '+₹18', up: true },
  { apmc: 'ઊંઝા ગંજબજાર', crop: 'જીરૂ આબુ રોડ', range: '₹5,200 - ₹5,850 / 20 કિ.ગ્રા.', change: '+₹110', up: true },
  { apmc: 'મહુવા માર્કેટ', crop: 'સફેદ તલ', range: '₹2,800 - ₹3,100 / 20 કિ.ગ્રા.', change: '+₹45', up: true },
  { apmc: 'ડીસા યાર્ડ', crop: 'રાયડો દેશી', range: '₹1,080 - ₹1,180 / 20 કિ.ગ્રા.', change: '-₹10', up: false },
  { apmc: 'અમરેલી યાર્ડ', crop: 'તલ સફેદ', range: '₹2,600 - ₹2,950 / 20 કિ.ગ્રા.', change: '+₹20', up: true },
];

const ApmcTicker = () => {
  const { lang } = useLanguage();
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="apmc-ticker">
      <div className="apmc-ticker__inner">
        {/* Fixed Left Badge */}
        <div className="apmc-ticker__badge">
          <span className="ticker-dot"></span>
          <span>{lang === 'gu' ? 'લાઈવ મંડી ભાવ (LIVE APMC)' : 'LIVE MANDI RATES (APMC)'}</span>
        </div>

        {/* Scrolling Items */}
        <div className="apmc-ticker__scroll-container">
          <div className="apmc-ticker__track">
            {items.map((item, idx) => (
              <span key={idx} className="apmc-ticker__item">
                <span className="apmc-ticker__market">{item.apmc}:</span>
                <span className="apmc-ticker__crop">{item.crop}</span>
                <span className="apmc-ticker__price">{item.range}</span>
                <span className={`apmc-ticker__change ${item.up ? 'up' : 'down'}`}>
                  {item.up ? '▲' : '▼'} {item.change}
                </span>
                <span className="apmc-ticker__sep">|</span>
              </span>
            ))}
          </div>
        </div>

        {/* Pinned Right Update Timestamp */}
        <div className="apmc-ticker__timestamp">
          <span>⏱️ {lang === 'gu' ? 'અપડેટ: ૭ મિનિટ પહેલા' : 'Updated: 7 min ago'}</span>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { lang, toggleLang } = useLanguage();
  const [navSearch, setNavSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // If farmer is authenticated, farmer portal navigation remains active everywhere (including /prices, etc.)
  const isFarmer = (isAuthenticated && user?.role === 'farmer') || location.pathname.startsWith('/farmer');
  const isTrader = (isAuthenticated && user?.role === 'trader') || location.pathname.startsWith('/buyer');
  const homeLink = isFarmer ? '/farmer/dashboard' : (isTrader ? '/buyer/dashboard' : '/');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setProfileDropdownOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'gu' ? 'gu-IN' : 'en-IN';
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNavSearch(transcript);
        navigate(`/listings?search=${encodeURIComponent(transcript)}`);
      };
    } else {
      alert(lang === 'gu' ? 'તમારા બ્રાઉઝરમાં વોઇસ સર્ચ સપોર્ટ નથી' : 'Voice search is not supported in this browser');
    }
  };

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMenuOpen(false);
    toast.success(
      lang === 'gu' ? 'સફળતાપૂર્વક લૉગઆઉટ થયા! 🙏' : 'Logged out successfully! 🙏'
    );
    navigate('/login');
  };

  return (
    <>
      {/* 1. Top APMC Ticker */}
      <ApmcTicker />

      {/* 2. Main Navbar */}
      <header className="navbar">
        <div className="navbar__inner">

          {/* Logo with Tractor Icon */}
          <Link to={homeLink} className="navbar__logo">
            <div className="navbar__logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17h18"></path>
                <path d="M6 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M18 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M9 14h6"></path>
                <path d="M9 11V7l4-2v6"></path>
                <path d="M17 11V5"></path>
              </svg>
            </div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-main">કિસાન બજાર / KisanBazaar</span>
              <span className="navbar__logo-sub">
                {isFarmer
                  ? (lang === 'gu' ? 'ગુજરાત ઈ-મંડી - ખેડૂત પોર્ટલ' : 'Gujarat E-Mandi - Farmer Portal')
                  : isTrader
                  ? (lang === 'gu' ? 'ગુજરાત ઈ-મંડી - વેપારી પોર્ટલ' : 'Gujarat E-Mandi - Trader Portal')
                  : (lang === 'gu' ? 'ગુજરાત ઓનલાઇન કૃષિ મંડી મંચ' : 'Gujarat Online Agri Mandi Platform')}
              </span>
            </div>
          </Link>

          {/* Navbar Search Capsule Button - Visible only on Public Pages to keep portal clean */}
          {!isAuthenticated && (
            <div className="navbar__search-capsule" onClick={() => navigate('/listings')} title={lang === 'gu' ? 'પાક શોધો' : 'Search Crops'}>
              <span className="search-cap-icon">🔍</span>
              <span className="search-cap-divider"></span>
              <button
                type="button"
                className="search-cap-mic"
                onClick={(e) => { e.stopPropagation(); handleVoiceSearch(); }}
                title={lang === 'gu' ? 'વોઇસ દ્વારા શોધો' : 'Voice Search'}
              >
                🎙️
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="navbar__links">
            {isFarmer ? (
              <>
                <NavLink to="/farmer/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">મુખ્ય પેજ</span>
                  <span className="nav-text-en">/ Home</span>
                </NavLink>
                <NavLink to="/farmer/my-crops" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">મારા પાક સ્ટોક</span>
                  <span className="nav-text-en">/ My Crops</span>
                </NavLink>
                <NavLink to="/prices" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">મંડી ભાવ</span>
                  <span className="nav-text-en">/ APMC Rates</span>
                </NavLink>
                <NavLink to="/farmer/traders" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">વેપારીઓ</span>
                  <span className="nav-text-en">/ Traders</span>
                </NavLink>
                <NavLink to="/farmer/messages" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">ડીલ રૂમ</span>
                  <span className="nav-text-en">/ Messages</span>
                </NavLink>
              </>
            ) : isTrader ? (
              <>
                <NavLink to="/buyer/dashboard" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">મુખ્ય પેજ</span>
                  <span className="nav-text-en">/ Home</span>
                </NavLink>
                <NavLink to="/buyer/browse" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">બજાર પાક</span>
                  <span className="nav-text-en">/ Market</span>
                </NavLink>
                <NavLink to="/buyer/saved" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">સેવ કરેલ</span>
                  <span className="nav-text-en">/ Saved</span>
                </NavLink>
                <NavLink to="/buyer/messages" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">ડીલ રૂમ</span>
                  <span className="nav-text-en">/ Messages</span>
                </NavLink>
                <NavLink to="/prices" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">મંડી ભાવ</span>
                  <span className="nav-text-en">/ APMC Rates</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`} end>
                  <span className="nav-text-gu">મુખ્ય પેજ</span>
                  <span className="nav-text-en">/ Home</span>
                </NavLink>
                <NavLink to="/listings" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">બજાર પાક</span>
                  <span className="nav-text-en">/ Marketplace</span>
                </NavLink>
                <NavLink to="/prices" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">મંડી ભાવ</span>
                  <span className="nav-text-en">/ APMC Rates</span>
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">અમારા વિશે</span>
                  <span className="nav-text-en">/ About</span>
                </NavLink>
                <NavLink to="/about#helpline" className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text-gu">સહાયતા</span>
                  <span className="nav-text-en">/ Helpline</span>
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Action Tools */}
          <div className="navbar__actions">
            
            {/* Language Toggle Dropdown Pill */}
            <button className="navbar__lang-pill" onClick={toggleLang} title="Change Language">
              <span className="lang-icon">🌐</span>
              <span className="lang-label">{lang === 'gu' ? 'ગુજરાતી' : 'English'}</span>
              <span className="lang-arrow">▾</span>
            </button>

            {/* Helpline quick link - Only shown on public pages to avoid cluttering portal */}
            {!isAuthenticated && (
              <a href="tel:1800543388" className="navbar__helpline-pill" title="Toll-Free Helpline">
                <span className="hl-icon">📞</span>
                <span className="hl-num">1800-543-388</span>
              </a>
            )}

            {/* Sell Crop or Post Demand Button */}
            {isTrader ? (
              <Link to="/buyer/post-demand" className="navbar__sell-crop-btn">
                <span className="btn-icon">📢</span>
                <div className="btn-text-stacked">
                  <span className="btn-main-txt">{lang === 'gu' ? 'માગ પ્રકાશિત' : 'Post Demand'}</span>
                  <span className="btn-sub-txt">{lang === 'gu' ? '(Post Demand)' : '(માગ પ્રકાશિત)'}</span>
                </div>
              </Link>
            ) : (
              <Link to="/farmer/add-crop" className="navbar__sell-crop-btn">
                <span className="btn-icon">⊕</span>
                <div className="btn-text-stacked">
                  <span className="btn-main-txt">{lang === 'gu' ? 'પાક વેચો' : 'Sell Crop'}</span>
                  <span className="btn-sub-txt">{lang === 'gu' ? '(Sell Crop)' : '(પાક વેચો)'}</span>
                </div>
              </Link>
            )}

            {/* User Profile Capsule with Interactive Dropdown & Direct Logout */}
            {isAuthenticated ? (
              <div className="navbar__profile-container" ref={dropdownRef}>
                <button
                  type="button"
                  className={`navbar__login-btn ${profileDropdownOpen ? 'active' : ''}`}
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  title="User Profile & Menu"
                >
                  <span className="btn-icon">👤</span>
                  <div className="btn-text-stacked">
                    <span className="btn-main-txt">
                      {user?.name?.split(' ')[0] || (isTrader ? (lang === 'gu' ? 'વેપારી' : 'Trader') : (lang === 'gu' ? 'રમેશભાઈ' : 'Ramesh'))}
                    </span>
                    <span className="btn-sub-txt">
                      {isTrader
                        ? (lang === 'gu' ? 'વેપારી ખાતું' : 'Licensed Trader')
                        : user?.verified712 
                        ? (lang === 'gu' ? '૭/૧૨ પ્રમાણિત' : '7/12 Verified') 
                        : (lang === 'gu' ? 'ખેડૂત ખાતું' : 'Farmer')}
                    </span>
                  </div>
                  <span className="btn-dropdown-arrow">▾</span>
                </button>

                {/* Direct Visible Logout Icon Button for Instant 1-Click Access */}
                <button
                  type="button"
                  className="navbar__quick-logout-btn"
                  onClick={handleLogout}
                  title={lang === 'gu' ? 'લૉગઆઉટ કરો (Logout)' : 'Logout'}
                >
                  <span className="lo-icon">🚪</span>
                  <span className="lo-text">{lang === 'gu' ? 'લૉગઆઉટ' : 'Logout'}</span>
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="navbar__profile-dropdown">
                    <div className="npd-header">
                      <div className="npd-avatar">{isTrader ? '🏭' : '👨‍🌾'}</div>
                      <div className="npd-user-info">
                        <strong className="npd-name">{user?.name || (isTrader ? 'શ્રી જીનિંગ ઇન્ડસ્ટ્રીઝ' : 'રમેશભાઈ કાનજીભાઈ પટેલ')}</strong>
                        <span className="npd-badge">
                          🛡️ {isTrader
                            ? (lang === 'gu' ? 'APMC લાઇસન્સ પ્રાપ્ત વેપારી' : 'APMC Licensed Trader')
                            : (lang === 'gu' ? '૭/૧૨ અને ૮-અ પ્રમાણિત' : '7/12 Verified Farmer')}
                        </span>
                        <span className="npd-meta">
                          {isTrader
                            ? `License: ${user?.licenseNo || '#RJT-421'} • ${user?.mobile ? `+91 ${user.mobile}` : '+91 98254 99999'}`
                            : `ID: #KB-GUJ-8841 • ${user?.mobile ? `+91 ${user.mobile}` : '+91 98254 78210'}`}
                        </span>
                      </div>
                    </div>

                    <div className="npd-links-list">
                      {isTrader ? (
                        <>
                          <Link to="/buyer/dashboard" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">🏠</span>
                            <div>
                              <strong>{lang === 'gu' ? 'વેપારી ડેશબોર્ડ' : 'Trader Dashboard'}</strong>
                              <span>{lang === 'gu' ? 'ઓફર્સ અને ઓવરવ્યૂ' : 'Overview & Bids'}</span>
                            </div>
                          </Link>

                          <Link to="/buyer/browse" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">🔍</span>
                            <div>
                              <strong>{lang === 'gu' ? 'બજાર પાક શોધો' : 'Browse Market'}</strong>
                              <span>{lang === 'gu' ? 'ખેડૂતોના ઉપલબ્ધ પાક' : 'Available Crops'}</span>
                            </div>
                          </Link>

                          <Link to="/buyer/post-demand" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">📢</span>
                            <div>
                              <strong>{lang === 'gu' ? 'માગ પ્રકાશિત કરો' : 'Post Demand'}</strong>
                              <span>{lang === 'gu' ? 'નવી ખરીદ જરૂરિયાત' : 'New Buying Request'}</span>
                            </div>
                          </Link>

                          <Link to="/buyer/saved" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">❤️</span>
                            <div>
                              <strong>{lang === 'gu' ? 'સેવ કરેલ પાક' : 'Saved Crops'}</strong>
                              <span>{lang === 'gu' ? 'બુકમાર્ક કરેલ લિસ્ટિંગ્સ' : 'Bookmarked Listings'}</span>
                            </div>
                          </Link>

                          <Link to="/buyer/messages" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">💬</span>
                            <div>
                              <strong>{lang === 'gu' ? 'ડીલ રૂમ અને સંદેશ' : 'Deal Room & Messages'}</strong>
                              <span>{lang === 'gu' ? 'ખેડૂતો સાથે વાતચીત' : 'Farmer Negotiations'}</span>
                            </div>
                          </Link>

                          <Link to="/buyer/profile" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">⚙️</span>
                            <div>
                              <strong>{lang === 'gu' ? 'પ્રોફાઇલ સેટિંગ્સ' : 'Profile Settings'}</strong>
                              <span>{lang === 'gu' ? 'કંપની અને પેમેન્ટ વિગતો' : 'Business & Preferences'}</span>
                            </div>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/farmer/dashboard" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">🏠</span>
                            <div>
                              <strong>{lang === 'gu' ? 'ખેડૂત ડેશબોર્ડ' : 'Farmer Dashboard'}</strong>
                              <span>{lang === 'gu' ? 'લાઈવ વેચાણ અને ડીલ્સ' : 'Overview & Bids'}</span>
                            </div>
                          </Link>

                          <Link to="/farmer/my-crops" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">📦</span>
                            <div>
                              <strong>{lang === 'gu' ? 'મારા પાક સ્ટોક' : 'My Crop Listings'}</strong>
                              <span>{lang === 'gu' ? 'સ્ટોક ડેસ્ક અને ઓફર્સ' : 'Manage Listings'}</span>
                            </div>
                          </Link>

                          <Link to="/farmer/add-crop" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">➕</span>
                            <div>
                              <strong>{lang === 'gu' ? 'નવો પાક લિસ્ટ કરો' : 'Add New Crop'}</strong>
                              <span>{lang === 'gu' ? '૪-સ્ટેપ વેચાણ વિઝાર્ડ' : 'Instant Listing'}</span>
                            </div>
                          </Link>

                          <Link to="/farmer/messages" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">💬</span>
                            <div>
                              <strong>{lang === 'gu' ? 'ડીલ રૂમ અને ચેટ' : 'Deal Room & Messages'}</strong>
                              <span>{lang === 'gu' ? 'વેપારી સાથે વાટાઘાટો' : 'Active Negotiations'}</span>
                            </div>
                          </Link>

                          <Link to="/farmer/profile" className="npd-link" onClick={() => setProfileDropdownOpen(false)}>
                            <span className="npd-link-icon">⚙️</span>
                            <div>
                              <strong>{lang === 'gu' ? 'પ્રોફાઇલ અને સેટિંગ્સ' : 'Profile & Land Records'}</strong>
                              <span>{lang === 'gu' ? '૭/૧૨ રેકોર્ડ્સ અને બેંક ખાતું' : '7/12 & Payout Settings'}</span>
                            </div>
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="npd-footer">
                      <button
                        type="button"
                        className="npd-logout-btn"
                        onClick={handleLogout}
                      >
                        🚪 {lang === 'gu' ? 'લૉગઆઉટ કરો (Logout)' : 'Logout'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="navbar__login-btn">
                <span className="btn-icon">👤</span>
                <div className="btn-text-stacked">
                  <span className="btn-main-txt">{lang === 'gu' ? 'લૉગિન / પ્રવેશ' : 'Login'}</span>
                  <span className="btn-sub-txt">{lang === 'gu' ? '(Login)' : '(પ્રવેશ)'}</span>
                </div>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`navbar__mobile-drawer ${menuOpen ? 'open' : ''}`}>
          {isTrader ? (
            <>
              <NavLink to="/buyer/dashboard" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                🏠 {lang === 'gu' ? 'વેપારી ડેશબોર્ડ (Dashboard)' : 'Trader Dashboard'}
              </NavLink>
              <NavLink to="/buyer/browse" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                🔍 {lang === 'gu' ? 'બજાર પાક શોધો (Browse)' : 'Browse Market'}
              </NavLink>
              <NavLink to="/buyer/post-demand" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                📢 {lang === 'gu' ? 'માગ પ્રકાશિત કરો (Post Demand)' : 'Post Demand'}
              </NavLink>
              <NavLink to="/buyer/saved" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                ❤️ {lang === 'gu' ? 'સેવ કરેલ પાક (Saved)' : 'Saved Crops'}
              </NavLink>
              <NavLink to="/buyer/messages" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                💬 {lang === 'gu' ? 'ડીલ રૂમ અને સંદેશ (Messages)' : 'Deal Room & Messages'}
              </NavLink>
              <NavLink to="/buyer/profile" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                👤 {lang === 'gu' ? 'પ્રોફાઇલ સેટિંગ્સ (Profile)' : 'Trader Profile'}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/farmer/dashboard" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                🏠 {lang === 'gu' ? 'ખેડૂત ડેશબોર્ડ (Dashboard)' : 'Farmer Dashboard'}
              </NavLink>
              <NavLink to="/farmer/my-crops" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                📦 {lang === 'gu' ? 'મારા પાક સ્ટોક (My Crops)' : 'My Crops'}
              </NavLink>
              <NavLink to="/farmer/add-crop" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                ➕ {lang === 'gu' ? 'નવો પાક ઉમેરો (Add Crop)' : 'Add New Crop'}
              </NavLink>
              <NavLink to="/farmer/traders" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                🏭 {lang === 'gu' ? 'પ્રમાણિત વેપારીઓ (Traders)' : 'Nearby Traders'}
              </NavLink>
              <NavLink to="/farmer/messages" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                💬 {lang === 'gu' ? 'ડીલ રૂમ અને ચેટ (Messages)' : 'Deal Room & Messages'}
              </NavLink>
              <NavLink to="/farmer/profile" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                👤 {lang === 'gu' ? 'પ્રોફાઇલ અને ૭/૧૨ (Profile)' : 'Farmer Profile'}
              </NavLink>
            </>
          )}
          <NavLink to="/prices" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
            📈 {lang === 'gu' ? 'મંડી ભાવ (APMC Rates)' : 'APMC Rates'}
          </NavLink>

          <div className="navbar__mobile-bottom">
            <button className="navbar__lang-pill" onClick={toggleLang} style={{ width: '100%', justifyContent: 'center' }}>
              🌐 {lang === 'gu' ? 'ગુજરાતી / English' : 'English / ગુજરાતી'}
            </button>
            {isTrader ? (
              <Link to="/buyer/post-demand" className="navbar__sell-crop-btn" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                📢 {lang === 'gu' ? 'માગ પ્રકાશિત કરો' : 'Post Demand'}
              </Link>
            ) : (
              <Link to="/farmer/add-crop" className="navbar__sell-crop-btn" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                🌾 {lang === 'gu' ? 'પાક વેચો (Sell Crop)' : 'Sell Crop'}
              </Link>
            )}
            {isAuthenticated ? (
              <button
                type="button"
                className="navbar__mobile-logout-btn"
                onClick={handleLogout}
              >
                🚪 {lang === 'gu' ? 'લૉગઆઉટ કરો (Logout)' : 'Logout'}
              </button>
            ) : (
              <Link to="/login" className="navbar__login-btn" style={{ justifyContent: 'center' }} onClick={() => setMenuOpen(false)}>
                {lang === 'gu' ? 'લોગિન / પ્રવેશ (Login)' : 'Login'}
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
