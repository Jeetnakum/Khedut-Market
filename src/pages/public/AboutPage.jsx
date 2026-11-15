import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './AboutPage.css';

const STATS = [
  {
    val: '૫૫,૦૦૦+',
    valEn: '55,000+',
    labelGu: 'નોંધાયેલ ખેડૂતો',
    labelEn: 'Registered Farmers',
    subGu: '7/12 પ્રમાણિત ખેડૂતો',
    subEn: '7/12 Land Record Verified',
  },
  {
    val: '૧૨,૦૦૦+',
    valEn: '12,000+',
    labelGu: 'સક્રિય વેપારીઓ અને પ્રોસેસર્સ',
    labelEn: 'Active Buyers & Millers',
    subGu: 'ચકાસાયેલ લાયસન્સ વેપારીઓ',
    subEn: 'Licensed Mandi Buyers',
  },
  {
    val: '૪૫૦+',
    valEn: '450+',
    labelGu: 'APMC દૈનિક લાઈવ ભાવ',
    labelEn: 'Daily Live Mandi Rates',
    subGu: 'રોજેરોજના સચોટ બજાર ભાવ',
    subEn: 'Real-time Daily Mandi Data',
  },
  {
    val: '₹૧૨૦ કરોડ+',
    valEn: '₹120 Cr+',
    labelGu: 'પારદર્શક વેપાર વોલ્યુમ',
    labelEn: 'Transparent Trade Volume',
    subGu: 'શૂન્ય દલાલી સાથે સોદા',
    subEn: 'Zero Brokerage Farm Trade',
  },
];

const HELPLINE_CARDS = [
  {
    tagGu: 'ટોલ-ફ્રી / TOLL-FREE',
    tagEn: 'TOLL-FREE HELPLINE',
    titleGu: 'ટોલ-ફ્રી કિસાન હેલ્પલાઇન',
    titleEn: 'Toll-Free Kisan Helpline',
    contact: '1800-543-388',
    subGu: '(કિસાન કૉલ સેન્ટર - ખેડૂત મિત્રો માટે તદ્દન મફત)',
    subEn: '(Kisan Call Center - Completely Free for Farmers)',
    line1Gu: '⏰ સમય: સવારે 7:00 થી રાત્રે 9:00 (સોમવાર થી શનિવાર)',
    line1En: '⏰ Timing: 7:00 AM to 9:00 PM (Monday to Saturday)',
    line2Gu: '🗣 ભાષા: શુદ્ધ ગુજરાતીમાં સંપૂર્ણ સહાય',
    line2En: '🗣 Support in Gujarati, Hindi & English',
    btnTextGu: '📞 કૉલ કરો (Call Now)',
    btnTextEn: '📞 Call Now',
    btnAction: 'tel:1800543388',
    btnClass: 'btn-green',
  },
  {
    tagGu: '24X7 WHATSAPP',
    tagEn: '24X7 WHATSAPP',
    titleGu: 'વોટ્સએપ ખેડૂત સહાય',
    titleEn: 'WhatsApp Farmer Helpline',
    contact: '+91 94290 88211',
    subGu: '(ખેડૂતો માટે ૨૪ કલાક ઝડપી સહાય)',
    subEn: '(24x7 Fast Digital Assistance)',
    line1Gu: 'પાકના ફોટા મોકલો, વિવિધ માર્કેટના ભાવ મેળવો અથવા તમારા ખાતા અંગે મદદ પૂછો.',
    line1En: 'Send crop photos, get live mandi rates, or ask account assistance.',
    line2Gu: '⚡ રિસ્પોન્સ: માત્ર ૫ મિનિટમાં જવાબ',
    line2En: '⚡ Fast Response: Reply within 5 minutes',
    btnTextGu: '💬 વોટ્સએપ પર મેસેજ કરો (Chat on WhatsApp)',
    btnTextEn: '💬 Chat on WhatsApp',
    btnAction: 'https://wa.me/919429088211',
    btnClass: 'btn-whatsapp',
  },
  {
    tagGu: 'રૂબરૂ મુલાકાત',
    tagEn: 'REGIONAL HUBS',
    titleGu: 'જિલ્લા સહાય કેન્દ્રો (Regional Hubs)',
    titleEn: 'Regional Facilitation Centers',
    contact: 'રાજકોટ • ઊંઝા • ગોંડલ',
    contactEn: 'Rajkot • Unjha • Gondal',
    subGu: '(રૂબરૂ સેવા અને સહાય કેન્દ્રો)',
    subEn: '(In-Person Service & Verification Hubs)',
    line1Gu: '📍 રાજકોટ શાખા: ગેટ નં. 2 સામે, માર્કેટ યાર્ડ, રાજકોટ.',
    line1En: '📍 Rajkot Hub: Opp. Gate 2, APMC Market Yard, Rajkot.',
    line2Gu: '📍 ઊંઝા શાખા: જીરૂ ભવન કોમ્પ્લેક્સ, ઊંઝા. • ગોંડલ: માર્કેટ યાર્ડ.',
    line2En: '📍 Unjha Hub: Jeeru Bhavan, Unjha. • Gondal: Market Yard.',
    btnTextGu: '🗺️ કેન્દ્રોનું સરનામું જુઓ (View Centers)',
    btnTextEn: '🗺️ View Hub Locations',
    btnAction: '#',
    btnClass: 'btn-orange',
  },
];

const BENEFITS = [
  {
    icon: '🛡️',
    titleGu: 'શૂન્ય દલાલી (0% Brokerage)',
    titleEn: '0% Brokerage (Zero Commission)',
    descGu: 'ખેડૂત અને વેપારી બંને માટે કોઈ ચાર્જ નહિ. કોઈપણ પ્રકારની દલાલી કે કમિશન આપ્યા વગર સીધો સોદો ખેડૂત અને મિલર્સ વચ્ચે.',
    descEn: 'Zero commission for both farmers and buyers. Direct farm-to-mill trade eliminating unnecessary middleman cuts.',
    tag1Gu: '✓ ખેડૂત પાસે થી કોઈ કમિશન નહિ',
    tag1En: '✓ Zero fee charged to farmers',
    tag2Gu: '✓ વેપારી માટે પારદર્શક ખરીદી',
    tag2En: '✓ 100% transparent procurement',
  },
  {
    icon: '📊',
    titleGu: 'લાઇવ મંડી પારદર્શિતા (Live Mandi Transparency)',
    titleEn: 'Live Mandi Price Transparency',
    descGu: 'ગુજરાતના તમામ એપીએમસી રાજકોટ, ઊંઝા, ગોંડલ, ડીસા, અમરેલીના રોજેરોજના લાઈવ સાચા ભાવ જેથી ખેડૂતો સસ્તા ભાવે માલ ન વેચે.',
    descEn: 'Official real-time APMC data from Rajkot, Unjha, Gondal, Deesa, and Amreli ensuring farmers get true fair market value.',
    tag1Gu: '✓ ૧૫૦ માર્કેટ યાર્ડનું લાઈવ નેટવર્ક',
    tag1En: '✓ 150+ APMC yards connected',
    tag2Gu: '✓ અધિકૃત એપીએમસી ડેટા લાઈવ',
    tag2En: '✓ Official mandi board figures',
  },
  {
    icon: '🏦',
    titleGu: 'સુરક્ષિત ચુકવણી વ્યવસ્થા (Secure Direct Bank Transfer)',
    titleEn: 'Secure Direct Bank Transfer',
    descGu: 'ખેતરમાંથી માલ ઉપાડતાની સાથે જ બેંક ખાતામાં વજન રસીદના આધારે તુરંત જ પૈસા ટ્રાન્સફર (RTGS/NEFT) દ્વારા જમા કરવાની સુરક્ષિત પ્રોટોકોલ સિસ્ટમ.',
    descEn: 'Instant payment settlement via RTGS/NEFT straight into farmer bank accounts upon weighbridge receipt generation.',
    tag1Gu: '✓ ડિજિટલ વજન પહોંચ ની ખાતરી',
    tag1En: '✓ Digital weighbridge verification',
    tag2Gu: '✓ બેંકમાં નિયમિત સુરક્ષિત ગેરેંટી',
    tag2En: '✓ 100% Escrow safe settlement',
  },
];

const FAQS = [
  {
    qGu: 'શું આ પોર્ટલ પર પાક જોવા માટે કોઈ ફી ચૂકવવી પડે છે?',
    qEn: 'Is there any fee to browse crops or check APMC rates?',
    aGu: 'ના, કોઈપણ ખેડૂત કે વેપારી કોઈપણ પ્રકારની ફી આપ્યા વગર તમામ APMC ના લાઈવ ભાવ નિશુલ્ક જોઈ શકે છે. ફક્ત ખેડૂતો માટે પાક વેચવા માટે મફતમાં લિસ્ટિંગ કરવાની સુવિધા ઉપલબ્ધ છે.',
    aEn: 'No! All mandi rates, price graphs, and crop listings are 100% free for everyone. Farmers can list crops with zero platform charges.',
  },
  {
    qGu: 'ખેડૂત માટે પાકની જાહેરાત મૂકવાનો કોઈ ચાર્જ છે?',
    qEn: 'Does a farmer have to pay to list crops for sale?',
    aGu: 'બિલકુલ નહીં! કિસાન બજાર પર પાકનું લિસ્ટિંગ કરવું ૧૦૦% મફત છે. કોઈ છૂપી ફી કે કમિશન લેવામાં આવતું નથી.',
    aEn: 'Not a single rupee! Listing crops is completely free. We do not deduct any broker commission or hidden fees.',
  },
  {
    qGu: 'પેમેન્ટની સુરક્ષા કેવી રીતે થાય છે?',
    qEn: 'How is farmer payment security guaranteed?',
    aGu: 'જ્યારે ખેતરેથી માલ ઉપાડવામાં આવે ત્યારે વજનકાંટાની ડિજિટલ સ્લિપ મુજબ રકમ સીધી RTGS/NEFT દ્વારા ખેડૂતના બેંક ખાતામાં જમા થાય છે.',
    aEn: 'Payment is guaranteed through our Escrow protocol. Upon weighbridge receipt generation at farm gate, money is credited directly via RTGS/NEFT.',
  },
  {
    qGu: 'જો તોલ કે ભાવ અંગે વિવાદ થાય તો શું?',
    qEn: 'What happens if there is a dispute regarding quality or weight?',
    aGu: 'કિસાન બજારની મધ્યસ્થી ટીમ ૭૨ કલાકમાં ખેડૂત અને વેપારી વચ્ચે એપીએમસી નિયમો અનુસાર સમાધાન કરાવી આપે છે.',
    aEn: 'Our dedicated dispute resolution team resolves any discrepancies within 72 hours following standard APMC mandi bylaws.',
  },
];

const AboutPage = () => {
  const { lang } = useLanguage();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="about-pdf1-wrapper">
      
      {/* 1. Hero Title & Intro */}
      <section className="ap-hero-section">
        <div className="ap-hero-inner">
          <div className="ap-hero-pill">
            ● {lang === 'gu' ? '૧૦૦% ખેડૂત હિતલક્ષી - ગુજરાત કૃષિ સેતુ મંચ' : '100% Farmer-Centric - Gujarat Agri Bridge Platform'}
          </div>
          <h1 className="ap-hero-title">
            {lang === 'gu'
              ? 'ગુજરાતના ખેડૂતોને સીધા વેપારીઓ સાથે જોડતો ડિજિટલ સેતુ'
              : 'Digital Bridge Connecting Gujarat Farmers Directly with Buyers'}
          </h1>
          <p className="ap-hero-desc">
            {lang === 'gu'
              ? 'અમારી સંકલ્પ દરેક ખેડૂતને પાકના પોષણક્ષમ ભાવ અને વચેટિયા વગર પારદર્શક વેપાર.'
              : 'Our mission: Ensuring remunerative prices for every farmer with zero middlemen and total transparency.'}
          </p>

          {/* 4 Stat Badges */}
          <div className="ap-stats-grid">
            {STATS.map((s, i) => (
              <div key={i} className="ap-stat-card">
                <div className="ap-stat-val">{lang === 'gu' ? s.val : s.valEn}</div>
                <div className="ap-stat-label">{lang === 'gu' ? s.labelGu : s.labelEn}</div>
                <div className="ap-stat-sub">{lang === 'gu' ? s.subGu : s.subEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 3 Helpline Cards */}
      <section id="helpline">
        <div className="ap-section-inner">
          <div className="ap-section-header">
            <span className="ap-pre-title">
              {lang === 'gu' ? 'કિસાન સહાયતા કંટ્રોલ રૂમ / 24X7 SUPPORT' : 'KISAN ASSISTANCE / 24X7 SUPPORT'}
            </span>
            <h2 className="ap-section-title">
              {lang === 'gu' ? 'ખેડૂત હેલ્પલાઇન અને સીધો સંપર્ક સેવા' : 'Farmer Helpline & Direct Support'}
            </h2>
            <p className="ap-section-desc">
              {lang === 'gu'
                ? 'કોઈપણ પ્રશ્ન, ભાવ બાબતે માર્ગદર્શન અથવા ટેકનિકલ મુશ્કેલી માટે અમારી પ્રશિક્ષિત ટીમ આપની સેવા માટે સદાય હાજર છે.'
                : 'Our dedicated agricultural support team is ready to assist you with rates, listings, or technical inquiries.'}
            </p>
          </div>

          <div className="ap-helpline-grid">
            {HELPLINE_CARDS.map((c, i) => (
              <div key={i} className="ap-hl-card">
                <div className="ap-hl-tag">
                  {lang === 'gu' ? c.tagGu : c.tagEn}
                </div>
                <h3 className="ap-hl-title">{lang === 'gu' ? c.titleGu : c.titleEn}</h3>
                <div className="ap-hl-contact">
                  {i === 2 && lang === 'en' ? c.contactEn : c.contact}
                </div>
                <div className="ap-hl-sub">{lang === 'gu' ? c.subGu : c.subEn}</div>
                
                <div className="ap-hl-lines">
                  <div>{lang === 'gu' ? c.line1Gu : c.line1En}</div>
                  <div>{lang === 'gu' ? c.line2Gu : c.line2En}</div>
                </div>

                <a href={c.btnAction} className={`ap-hl-btn ${c.btnClass}`}>
                  {lang === 'gu' ? c.btnTextGu : c.btnTextEn}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 3 Core Platform Benefits */}
      <section>
        <div className="ap-section-inner">
          <div className="ap-section-header">
            <span className="ap-pre-title">
              {lang === 'gu' ? 'મુખ્ય ફાયદા / CORE BENEFITS' : 'CORE BENEFITS'}
            </span>
            <h2 className="ap-section-title">
              {lang === 'gu' ? 'ગુજરાતના અન્નદાતાને ટેકનોલોજી દ્વારા આત્મનિર્ભર બનાવવો' : 'Empowering Gujarat Farmers Through Agri-Tech'}
            </h2>
            <p className="ap-section-desc">
              {lang === 'gu'
                ? 'કિસાન બજારનું દરેક ફીચર ખેડૂતોના પરિશ્રમનું સાચું વળતર મળે તેવા એકમાત્ર લક્ષ્ય સાથે બનાવવામાં આવ્યું છે.'
                : 'Every feature of KisanBazaar is crafted to ensure farmers receive maximum returns for their hard work.'}
            </p>
          </div>

          <div className="ap-benefits-grid">
            {BENEFITS.map((b, i) => (
              <div key={i} className="ap-benefit-card">
                <div className="ap-benefit-icon">{b.icon}</div>
                <h3 className="ap-benefit-title">{lang === 'gu' ? b.titleGu : b.titleEn}</h3>
                <p className="ap-benefit-desc">{lang === 'gu' ? b.descGu : b.descEn}</p>
                <div className="ap-benefit-tags">
                  <span>{lang === 'gu' ? b.tag1Gu : b.tag1En}</span>
                  <span>{lang === 'gu' ? b.tag2Gu : b.tag2En}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 7/12 Land Record Verification Banner */}
          <div className="ap-712-banner">
            <div className="banner-shield">🛡️</div>
            <div>
              <strong>
                {lang === 'gu' ? '૭/૧૨ અને ૮-અ જમીન પ્રમાણિત પ્રોફાઇલ (Verified Farmer Badge)' : '7/12 & 8-A Land Record Verified (Verified Farmer Badge)'}
              </strong>
              <p>
                {lang === 'gu'
                  ? 'દરેક નોંધાયેલ ખેડૂતનું મહેસૂલ રેકોર્ડ સાથે વેરિફિકેશન જેથી વેપારીઓને મળે ૧૦૦% સાચા અને અધિકૃત ખેડૂતો.'
                  : 'Every registered farmer is verified against Gujarat revenue records, ensuring 100% genuine and verified trade.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) */}
      <section>
        <div className="ap-section-inner">
          <div className="ap-section-header">
            <span className="ap-pre-title">
              {lang === 'gu' ? 'વારંવાર પૂછાતા પ્રશ્નો / HELPFUL FAQS' : 'HELPFUL FAQS'}
            </span>
            <h2 className="ap-section-title">
              {lang === 'gu' ? 'ખેડૂત મિત્રોના સામાન્ય પ્રશ્નો અને ઉત્તરો' : 'Frequently Asked Questions (FAQs)'}
            </h2>
            <p className="ap-section-desc">
              {lang === 'gu'
                ? 'પોર્ટલના ઉપયોગ, ભાવ તપાસવા અને પેમેન્ટ બાબતે ખેડૂતો દ્વારા વારંવાર પૂછાતા સવાલો.'
                : 'Common questions from farmers and buyers regarding mandi rates, crop sales, and escrow payments.'}
            </p>
          </div>

          <div className="ap-faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className="ap-faq-item">
                <button
                  type="button"
                  className="ap-faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{lang === 'gu' ? faq.qGu : faq.qEn}</span>
                  <span className="faq-toggle-arrow">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && (
                  <div className="ap-faq-answer">
                    <p>{lang === 'gu' ? faq.aGu : faq.aEn}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions Callout */}
          <div className="ap-help-callout">
            <h4 className="callout-q">
              {lang === 'gu' ? 'હજુ કોઈ અન્ય મૂંઝવણ કે પ્રશ્ન છે?' : 'Still have queries or need assistance?'}
            </h4>
            <p className="callout-p">
              {lang === 'gu'
                ? 'અમારા ખેડૂત મિત્ર પ્રતિનિધિ સાથે સીધી વાત કરવા માટે હેલ્પલાઇન પર સંપર્ક કરો.'
                : 'Connect directly with our agricultural coordinators for immediate guidance.'}
            </p>
            <div className="callout-buttons">
              <a href="tel:1800543388" className="btn-call-helpline">
                📞 1800-543-388 {lang === 'gu' ? 'પર કૉલ કરો' : 'Call Toll-Free'}
              </a>
              <a href="https://wa.me/919429088211" className="btn-wa-helpline">
                💬 {lang === 'gu' ? 'વોટ્સએપ સહાય (+91 94290 88211)' : 'WhatsApp (+91 94290 88211)'}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;