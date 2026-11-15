import { useLanguage } from '../../context/LanguageContext';
import './HowItWorks.css';

const STEPS = [
  {
    num: '01',
    icon: '📝',
    titleGu: '૧. પાકની નોંધણી કરો',
    titleEn: '1. Register Your Crop',
    descGu: 'મોબાઇલથી પાકના ફોટા પાડો, અંદાજિત વજન અને ગુણવત્તા ઉમેરીને માત્ર ૨ મિનિટમાં યાદી બનાવો.',
    descEn: 'Take photos with your phone, enter estimated weight and quality in just 2 minutes.',
    tagGu: '✓ ફ્રી ક્રોપ લિસ્ટિંગ',
    tagEn: '✓ Free Crop Listing',
  },
  {
    num: '02',
    icon: '📈',
    titleGu: '૨. APMC ભાવ સરખાવો',
    titleEn: '2. Compare APMC Rates',
    descGu: 'તમારા નજીકના તમામ યાર્ડના આજના લાઈવ દૈનિક ભાવ સાથે સરખામણી કરી યોગ્ય નફાકારક ભાવ નક્કી કરો.',
    descEn: 'Compare today’s live daily APMC rates of nearby yards and fix a profitable price.',
    tagGu: '✓ દૈનિક માર્કેટ ડેટા',
    tagEn: '✓ Daily Market Data',
  },
  {
    num: '03',
    icon: '🤝',
    titleGu: '૩. સીધી સોદો અને ઓફર',
    titleEn: '3. Direct Deals & Offers',
    descGu: 'પ્રમાણિત મોટા વેપારીઓ અને પ્રોસેસર્સ તરફથી સીધા ફોન અથવા વ્હોટ્સએપ પર શ્રેષ્ઠ ખરીદ ઓફર્સ મેળવો.',
    descEn: 'Get direct phone/WhatsApp purchase offers from verified traders and processing mills.',
    tagGu: '✓ શૂન્ય વચેટિયા',
    tagEn: '✓ Zero Middlemen',
  },
  {
    num: '04',
    icon: '🛡️',
    titleGu: '૪. સુરક્ષિત ચુકવણી',
    titleEn: '4. Guaranteed Payment',
    descGu: 'ખેતરે માલ ઉપાડતાની સાથે જ બેંક ટ્રાન્સફર (NEFT/RTGS) અથવા સીધી રોકડ રકમ મેળવો. કોઈ કમિશન કપાત નહિ.',
    descEn: 'Receive direct bank transfer (RTGS/NEFT) upon farm pickup. Zero commission deduction.',
    tagGu: '✓ ૧૦૦% પેમેન્ટ ગેરેંટી',
    tagEn: '✓ 100% Payment Guarantee',
  },
];

const HowItWorks = () => {
  const { lang } = useLanguage();

  return (
    <section className="how-pdf1">
      <div className="how-pdf1__inner">
        
        <div className="how-pdf1__header">
          <div className="how-pdf1__badge">
            {lang === 'gu' ? 'ખૂબ સરળ અને પારદર્શક પ્રક્રિયા' : 'Simple & Transparent Process'}
          </div>
          <h2 className="how-pdf1__title">
            {lang === 'gu' ? 'કેવી રીતે કામ કરે છે? (How It Works)' : 'How It Works'}
          </h2>
          <p className="how-pdf1__sub">
            {lang === 'gu'
              ? 'ખેડૂત પોતાના મોબાઇલથી માત્ર ૪ સરળ તબક્કામાં પોતાના પાકનું ઉત્તમ અને વેચાણ કરી શકે છે.'
              : 'Farmers can list and sell crops in 4 simple steps right from their mobile phones.'}
          </p>
        </div>

        <div className="how-pdf1__grid">
          {STEPS.map((s, i) => (
            <div key={i} className="how-card">
              <div className="how-card__top">
                <span className="how-card__icon">{s.icon}</span>
                <span className="how-card__num">{s.num}</span>
              </div>
              <h3 className="how-card__title">
                {lang === 'gu' ? s.titleGu : s.titleEn}
              </h3>
              <p className="how-card__desc">
                {lang === 'gu' ? s.descGu : s.descEn}
              </p>
              <div className="how-card__tag">
                {lang === 'gu' ? s.tagGu : s.tagEn}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
