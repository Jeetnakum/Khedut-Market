import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './FeaturedCrops.css';

const FEATURED_CROPS = [
  {
    _id: '1',
    titleGu: 'શંકર-6 કપાસ (Cotton)',
    titleEn: 'Shankar-6 Cotton',
    tagGu: 'ઉત્તમ ગુણવત્તા Grade A',
    tagEn: 'Top Quality Grade A',
    locationGu: 'ગોંડલ યાર્ડ, રાજકોટ',
    locationEn: 'Gondal Yard, Rajkot',
    quantityGu: 'જથ્થો: 400 ક્વિન્ટલ',
    quantityEn: 'Qty: 400 Quintal',
    farmerGu: 'રમેશભાઈ પટેલ',
    farmerEn: 'Rameshbhai Patel',
    priceGu: '₹1,720',
    priceEn: '₹1,720',
    unitGu: '/ મણ',
    unitEn: '/ 20kg',
    image: '/crops/cotton.jpg',
  },
  {
    _id: '2',
    titleGu: 'ઊંઝા બોલ્ડ જીરૂ (Cumin)',
    titleEn: 'Unjha Bold Cumin',
    tagGu: 'ઉત્તમ ગુણવત્તા Grade A+',
    tagEn: 'Top Quality Grade A+',
    locationGu: 'ઊંઝા APMC, મહેસાણા',
    locationEn: 'Unjha APMC, Mehsana',
    quantityGu: 'જથ્થો: 120 ગુણી (Bags)',
    quantityEn: 'Qty: 120 Bags',
    farmerGu: 'વિષ્ણુભાઈ ચૌધરી',
    farmerEn: 'Vishnubhai Chaudhary',
    priceGu: '₹5,480',
    priceEn: '₹5,480',
    unitGu: '/ મણ',
    unitEn: '/ 20kg',
    image: '/crops/cumin.jpg',
  },
  {
    _id: '3',
    titleGu: 'જી-૨૦ મગફળી (Groundnut)',
    titleEn: 'G-20 Bold Groundnut',
    tagGu: 'મધ્યમ Grade B+',
    tagEn: 'Medium Grade B+',
    locationGu: 'કોટડા, જૂનાગઢ',
    locationEn: 'Kotda, Junagadh',
    quantityGu: 'જથ્થો: 250 ક્વિન્ટલ',
    quantityEn: 'Qty: 250 Quintal',
    farmerGu: 'કાનજીભાઈ આહીર',
    farmerEn: 'Kanjibhai Ahir',
    priceGu: '₹1,350',
    priceEn: '₹1,350',
    unitGu: '/ મણ',
    unitEn: '/ 20kg',
    image: '/crops/groundnut.jpg',
  },
  {
    _id: '4',
    titleGu: 'દેશી ટુકડા ઘઉં (Wheat)',
    titleEn: 'Desi Tukda Wheat',
    tagGu: 'ઉત્તમ ગુણવત્તા Grade A',
    tagEn: 'Top Quality Grade A',
    locationGu: 'વાંકાનેર, મોરબી',
    locationEn: 'Wankaner, Morbi',
    quantityGu: 'જથ્થો: 320 ગુણી (Bags)',
    quantityEn: 'Qty: 320 Bags',
    farmerGu: 'કાળુભાઈ ભરવાડ',
    farmerEn: 'Kalubhai Bharwad',
    priceGu: '₹575',
    priceEn: '₹575',
    unitGu: '/ મણ',
    unitEn: '/ 20kg',
    image: '/crops/wheat.jpg',
  },
];

const FeaturedCrops = () => {
  const { lang } = useLanguage();

  return (
    <section className="featured-pdf1">
      <div className="featured-pdf1__inner">
        
        {/* Top Header Row */}
        <div className="featured-pdf1__header">
          <div>
            <div className="featured-pdf1__badge">
              🌟 {lang === 'gu' ? 'ટોપ ખાસ ઓફર' : 'Top Special Offer'}
            </div>
            <h2 className="featured-pdf1__title">
              {lang === 'gu' ? 'ટોપ ફીચર્ડ પાક (Top Featured Crops)' : 'Top Featured Crops'}
            </h2>
            <p className="featured-pdf1__sub">
              {lang === 'gu'
                ? 'સૌરાષ્ટ્ર અને ઉત્તર ગુજરાતના ખેડૂતો દ્વારા સીધા વેચાણ માટે મૂકેલ તાજા ક્વોલિટી પાક.'
                : 'Directly listed fresh quality crops from farmers across Saurashtra and North Gujarat.'}
            </p>
          </div>

          <Link to="/listings" className="featured-pdf1__view-all">
            {lang === 'gu' ? 'તમામ ૧,૨૪૦+ પાક જુઓ →' : 'View All 1,240+ Crops →'}
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="featured-pdf1__grid">
          {FEATURED_CROPS.map(crop => (
            <div key={crop._id} className="fc-card">
              
              <div className="fc-card__image-wrap">
                <img src={crop.image} alt={lang === 'gu' ? crop.titleGu : crop.titleEn} className="fc-card__image" />
                <span className="fc-card__badge">
                  ● {lang === 'gu' ? crop.tagGu : crop.tagEn}
                </span>
                <span className="fc-card__qty-pill">
                  {lang === 'gu' ? crop.quantityGu : crop.quantityEn}
                </span>
              </div>

              <div className="fc-card__body">
                <h3 className="fc-card__title">
                  {lang === 'gu' ? crop.titleGu : crop.titleEn}
                </h3>
                
                <div className="fc-card__location">
                  📍 {lang === 'gu' ? crop.locationGu : crop.locationEn}
                </div>

                <div className="fc-card__farmer-row">
                  <span className="fc-card__farmer-name">
                    {lang === 'gu' ? `ખેડૂત: ${crop.farmerGu}` : `Farmer: ${crop.farmerEn}`}
                  </span>
                  <span className="fc-card__verified-badge">
                    ✓ {lang === 'gu' ? '7/12 પ્રમાણિત' : '7/12 Verified'}
                  </span>
                </div>

                <div className="fc-card__price-row">
                  <div className="fc-card__price-block">
                    <span className="fc-card__price-label">
                      {lang === 'gu' ? 'માર્કેટ ભાવ:' : 'Market Price:'}
                    </span>
                    <div className="fc-card__price">
                      {crop.priceGu} <span className="fc-card__price-unit">{lang === 'gu' ? crop.unitGu : crop.unitEn}</span>
                    </div>
                  </div>

                  <Link to={`/listings/${crop._id}`} className="fc-card__detail-btn">
                    <span>{lang === 'gu' ? 'વિગતો જુઓ' : 'View Details'}</span>
                    <span>→</span>
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCrops;
