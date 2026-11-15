import { useLanguage } from '../../context/LanguageContext';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    stars: 5,
    textGu: 'ગત વર્ષે કપાસના માલ યાર્ડમાં લઈ જવાને બદલે સીધો કિસાન બજાર પર મૂક્યો. રાજકોટના વેપારીએ ખેતરે આવીને ₹૧,૭૫૦ ના ભાવે રોકડા આપીને ૪૦૦ મણ ઉપાડી લીધો. ભાડું અને દલાલી બંને બચ્યા!',
    textEn: 'Last year, instead of hauling cotton to the mandi yard, I listed directly on KisanBazaar. A Rajkot trader came to my farm, paid cash at ₹1,750/20kg and loaded 400 Man. Saved both freight and brokerage!',
    nameGu: 'મનસુખભાઈ રાદડિયા',
    nameEn: 'Mansukhbhai Radadiya',
    roleGu: 'કોટડા સાંગાણી, રાજકોટ (કપાસ ઉત્પાદક)',
    roleEn: 'Kotda Sangani, Rajkot (Cotton Producer)',
    initial: 'મ',
  },
  {
    stars: 5,
    textGu: 'ઊંઝા યાર્ડમાં જીરૂના ભાવ રોજ જોતો હતો. પણ આ એપ્લિકેશન પર મુંબઈના એક્સપોર્ટરે સીધો સંપર્ક કર્યો અને ક્વિન્ટલે ₹૨૫૦ વધુ મળ્યા. પૈસા પણ ૨૪ કલાકમાં ખાતામાં આવી ગયા.',
    textEn: 'I watched Unjha mandi rates every day. But through this app, a Mumbai exporter contacted me directly and paid ₹250 more per quintal. Payment arrived in my bank account in 24 hours.',
    nameGu: 'પરબતભાઈ પટેલ',
    nameEn: 'Parbatbhai Patel',
    roleGu: 'વિસનગર, મહેસાણા (જીરૂ ઉત્પાદક)',
    roleEn: 'Visnagar, Mehsana (Cumin Producer)',
    initial: 'પ',
  },
  {
    stars: 5,
    textGu: 'અમારા જેવા નાના ખેડૂતો માટે આ પોર્ટલ આશીર્વાદરૂપ છે. ડીસાના બટાકાની સારી કિંમત નહોતી મળતી, પણ અમદાવાદના હોલસેલરે ખેતરેથી સીધો સોદો કરીને સારી કમાણી કરાવી.',
    textEn: 'For small farmers like us, this platform is a blessing. We struggled with potato rates in Deesa, but an Ahmedabad wholesaler bought directly from the farm at great rates.',
    nameGu: 'દિનેશજી ઠાકોર',
    nameEn: 'Dineshji Thakor',
    roleGu: 'ડીસા, બનાસકાંઠા (બટાકા ઉત્પાદક)',
    roleEn: 'Deesa, Banaskantha (Potato Producer)',
    initial: 'દ',
  },
];

const Testimonials = () => {
  const { lang } = useLanguage();

  return (
    <section className="testimonials-pdf1">
      <div className="testimonials-pdf1__inner">
        
        <div className="testimonials-pdf1__header">
          <div className="testimonials-pdf1__badge">
            💬 {lang === 'gu' ? 'ખેડૂતોના પ્રતિભાવ' : 'Farmer Feedback'}
          </div>
          <h2 className="testimonials-pdf1__title">
            {lang === 'gu' ? 'ખેડૂતોના અનુભવો અને સફળતા' : 'Farmer Experiences & Success Stories'}
          </h2>
          <p className="testimonials-pdf1__sub">
            {lang === 'gu'
              ? 'સૌરાષ્ટ્ર અને ઉત્તર ગુજરાતના પ્રગતિશીલ ખેડૂત મિત્રો શું કહે છે.'
              : 'What progressive farmers across Saurashtra & North Gujarat say.'}
          </p>
        </div>

        <div className="testimonials-pdf1__grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testi-pdf1-card">
              <div className="testi-pdf1-stars">
                {'★'.repeat(t.stars)}
              </div>
              <p className="testi-pdf1-text">
                "{lang === 'gu' ? t.textGu : t.textEn}"
              </p>
              
              <div className="testi-pdf1-author">
                <div className="testi-pdf1-avatar">{t.initial}</div>
                <div>
                  <div className="testi-pdf1-name">{lang === 'gu' ? t.nameGu : t.nameEn}</div>
                  <div className="testi-pdf1-role">{lang === 'gu' ? t.roleGu : t.roleEn}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
