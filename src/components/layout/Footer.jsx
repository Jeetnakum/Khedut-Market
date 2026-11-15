import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { lang } = useLanguage();

  return (
    <footer className="footer-pdf1">
      
      {/* 1. Green CTA Banner */}
      <div className="footer-pdf1__cta">
        <div className="footer-pdf1__cta-inner">
          <div className="footer-pdf1__cta-text">
            <h3 className="cta-title">
              {lang === 'gu'
                ? 'તમારો પાક સારા ભાવે વેચવા માટે આજેજ જોડાઓ'
                : 'Join Today to Sell Your Crops at Better Prices'}
            </h3>
            <p className="cta-sub">
              {lang === 'gu'
                ? 'ગુજરાતના ૫૫,૦૦૦+ ખેડૂતો ખેતરે બેઠા ડિજિટલ ક્રાંતિનો લાભ લો અને મેળવો યોગ્ય મૂલ્ય.'
                : 'Over 55,000+ Gujarat farmers benefiting from digital mandi trading directly from their farms.'}
            </p>
          </div>

          <div className="footer-pdf1__cta-actions">
            <Link to="/login?tab=register&role=farmer" className="btn-cta-orange">
              {lang === 'gu' ? 'પાક વેચવા નોંધણી કરો' : 'Register to Sell Crop'}
            </Link>
            <a href="tel:1800543388" className="btn-cta-white">
              📞 1800-KHEDUT
            </a>
          </div>
        </div>
      </div>

      {/* 2. Bottom Copyright & Essential Links */}
      <div className="footer-pdf1__bottom">
        <div className="footer-pdf1__bottom-inner">
          <div className="footer-pdf1__brand">
            🌾 <strong>{lang === 'gu' ? 'ગુજરાત કિસાન બજાર (Gujarat Kisan Bazaar)' : 'Gujarat Kisan Bazaar'}</strong>
            <span className="footer-copy-text">
              {lang === 'gu'
                ? '© 2025 ગુજરાત કિસાન બજાર. સર્વાધિકાર સુરક્ષિત. APMC સહાયક પોર્ટલ.'
                : '© 2025 Gujarat Kisan Bazaar. All rights reserved. APMC Facilitation Portal.'}
            </span>
          </div>

          <div className="footer-pdf1__links">
            <Link to="/about" className="footer-link">
              {lang === 'gu' ? 'ગોપનીયતા નીતિ (Privacy)' : 'Privacy Policy'}
            </Link>
            <span className="footer-link-sep">•</span>
            <Link to="/about" className="footer-link">
              {lang === 'gu' ? 'નિયમો અને શરતો (Terms)' : 'Terms & Conditions'}
            </Link>
            <span className="footer-link-sep">•</span>
            <a href="tel:1800543388" className="footer-link">
              📞 {lang === 'gu' ? 'કિસાન હેલ્પલાઇન: 1800-543-388' : 'Kisan Helpline: 1800-543-388'}
            </a>
            <span className="footer-link-sep">•</span>
            <Link to="/prices" className="footer-link">
              {lang === 'gu' ? 'APMC સૂચિ (Mandi List)' : 'APMC Directory'}
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
