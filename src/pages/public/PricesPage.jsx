import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './PricesPage.css';

const CHART_HISTORY_GU = [
  { day: '૬ માર્ચ', price: 1640 },
  { day: '૭ માર્ચ', price: 1660 },
  { day: '૮ માર્ચ', price: 1650 },
  { day: '૯ માર્ચ', price: 1680 },
  { day: '૧૦ માર્ચ', price: 1700 },
  { day: '૧૧ માર્ચ', price: 1695 },
  { day: '૧૨ માર્ચ (આજે)', price: 1720 },
];

const CHART_HISTORY_EN = [
  { day: '06 Mar', price: 1640 },
  { day: '07 Mar', price: 1660 },
  { day: '08 Mar', price: 1650 },
  { day: '09 Mar', price: 1680 },
  { day: '10 Mar', price: 1700 },
  { day: '11 Mar', price: 1695 },
  { day: '12 Mar (Today)', price: 1720 },
];

const MANDI_HIGHLIGHTS = [
  {
    apmcGu: 'ઊંઝા APMC',
    apmcEn: 'Unjha APMC',
    tagGu: '+₹85 તેજી',
    tagEn: '+₹85 Bullish',
    tagClass: 'tag-up',
    titleGu: 'ઊંઝા જીરૂ (Unjha Cumin)',
    titleEn: 'Unjha Cumin Seeds',
    priceRangeGu: '₹5,400 - ₹5,850 / મણ',
    priceRangeEn: '₹5,400 - ₹5,850 / 20kg',
    arrivalGu: '14,500 બોરી',
    arrivalEn: '14,500 Bags',
  },
  {
    apmcGu: 'રાજકોટ APMC',
    apmcEn: 'Rajkot APMC',
    tagGu: '+₹20 સુધારો',
    tagEn: '+₹20 Gain',
    tagClass: 'tag-up',
    titleGu: 'રાજકોટ શંકર કપાસ (Rajkot Cotton)',
    titleEn: 'Rajkot Shankar-6 Cotton',
    priceRangeGu: '₹1,650 - ₹1,740 / મણ',
    priceRangeEn: '₹1,650 - ₹1,740 / 20kg',
    arrivalGu: '32,000 મણ',
    arrivalEn: '32,000 Man',
  },
  {
    apmcGu: 'ગોંડલ APMC',
    apmcEn: 'Gondal APMC',
    tagGu: 'સ્થિર',
    tagEn: 'Stable',
    tagClass: 'tag-neutral',
    titleGu: 'ગોંડલ મગફળી જી-20 (Gondal Groundnut)',
    titleEn: 'Gondal Groundnut G-20',
    priceRangeGu: '₹1,320 - ₹1,410 / મણ',
    priceRangeEn: '₹1,320 - ₹1,410 / 20kg',
    arrivalGu: '18,200 ગુણી',
    arrivalEn: '18,200 Bags',
  },
];

const DAILY_RATES_DATA = [
  {
    id: 1,
    apmcGu: 'રાજકોટ APMC',
    apmcEn: 'Rajkot APMC',
    cropGu: 'કપાસ શંકર-૬ (Shankar-6)',
    cropEn: 'Cotton Shankar-6',
    gradeGu: 'Grade A',
    gradeEn: 'Grade A',
    gradeClass: 'badge-a',
    arrivalGu: '32,500 મણ',
    arrivalEn: '32,500 Man',
    min: 1550,
    max: 1740,
    modal: 1680,
    trend: '+₹25 (1.5%)',
    trendUp: true,
  },
  {
    id: 2,
    apmcGu: 'ઊંઝા APMC',
    apmcEn: 'Unjha APMC',
    cropGu: 'જીરૂ સ્પેશિયલ (Machine Clean)',
    cropEn: 'Cumin (Machine Clean)',
    gradeGu: 'Grade A+',
    gradeEn: 'Grade A+',
    gradeClass: 'badge-aplus',
    arrivalGu: '14,200 બોરી',
    arrivalEn: '14,200 Bags',
    min: 4900,
    max: 5850,
    modal: 5450,
    trend: '+₹70 (1.3%)',
    trendUp: true,
  },
  {
    id: 3,
    apmcGu: 'ગોંડલ APMC',
    apmcEn: 'Gondal APMC',
    cropGu: 'મગફળી 37 નંબર / G-20',
    cropEn: 'Groundnut 37 / G-20',
    gradeGu: 'Grade B',
    gradeEn: 'Grade B',
    gradeClass: 'badge-b',
    arrivalGu: '21,000 ગુણી',
    arrivalEn: '21,000 Bags',
    min: 1280,
    max: 1415,
    modal: 1340,
    trend: '-₹10 (-0.7%)',
    trendUp: false,
  },
  {
    id: 4,
    apmcGu: 'ડીસા APMC',
    apmcEn: 'Deesa APMC',
    cropGu: 'બટાકા દેશી/પુષ્કરાજ',
    cropEn: 'Potato (Desi/Pushkaraj)',
    gradeGu: 'Grade C',
    gradeEn: 'Grade C',
    gradeClass: 'badge-c',
    arrivalGu: '45,000 કટ્ટા',
    arrivalEn: '45,000 Bags',
    min: 310,
    max: 425,
    modal: 380,
    trend: '0.0%',
    trendUp: null,
  },
  {
    id: 5,
    apmcGu: 'અમરેલી APMC',
    apmcEn: 'Amreli APMC',
    cropGu: 'સફેદ તલ (White Sesame)',
    cropEn: 'White Sesame (Export)',
    gradeGu: 'Grade A',
    gradeEn: 'Grade A',
    gradeClass: 'badge-a',
    arrivalGu: '3,800 ગુણી',
    arrivalEn: '3,800 Bags',
    min: 2600,
    max: 3050,
    modal: 2900,
    trend: '+₹45 (1.6%)',
    trendUp: true,
  },
  {
    id: 6,
    apmcGu: 'પાટણ APMC',
    apmcEn: 'Patan APMC',
    cropGu: 'રાયડો (Mustard Seed)',
    cropEn: 'Mustard Seeds',
    gradeGu: 'Grade A',
    gradeEn: 'Grade A',
    gradeClass: 'badge-a',
    arrivalGu: '8,900 બોરી',
    arrivalEn: '8,900 Bags',
    min: 1050,
    max: 1180,
    modal: 1125,
    trend: '+₹15 (1.3%)',
    trendUp: true,
  },
  {
    id: 7,
    apmcGu: 'જામજોધપુર APMC',
    apmcEn: 'Jamjodhpur APMC',
    cropGu: 'ચણા (Chickpeas)',
    cropEn: 'Chickpeas (Desi Chana)',
    gradeGu: 'Grade B',
    gradeEn: 'Grade B',
    gradeClass: 'badge-b',
    arrivalGu: '6,500 ગુણી',
    arrivalEn: '6,500 Bags',
    min: 1080,
    max: 1220,
    modal: 1160,
    trend: '0.0%',
    trendUp: null,
  },
];

const APMC_OPTIONS = [
  { gu: 'બધા APMC માર્કેટ યાર્ડ', en: 'All APMC Market Yards' },
  { gu: 'રાજકોટ (Rajkot APMC)', en: 'Rajkot APMC' },
  { gu: 'ઊંઝા (Unjha APMC)', en: 'Unjha APMC' },
  { gu: 'ગોંડલ (Gondal APMC)', en: 'Gondal APMC' },
  { gu: 'ડીસા (Deesa APMC)', en: 'Deesa APMC' },
  { gu: 'અમરેલી (Amreli APMC)', en: 'Amreli APMC' },
  { gu: 'પાટણ (Patan APMC)', en: 'Patan APMC' },
  { gu: 'જામજોધપુર (Jamjodhpur APMC)', en: 'Jamjodhpur APMC' },
];

const COMMODITY_OPTIONS = [
  { gu: 'બધા પાક (All Commodities)', en: 'All Commodities' },
  { gu: 'કપાસ (Cotton / Shankar-6)', en: 'Cotton (Shankar-6)' },
  { gu: 'જીરૂ (Cumin Seed)', en: 'Cumin Seed' },
  { gu: 'મગફળી (Groundnut G-20)', en: 'Groundnut G-20' },
  { gu: 'બટાકા (Potato)', en: 'Potato' },
  { gu: 'સફેદ તલ (White Sesame)', en: 'White Sesame' },
  { gu: 'રાયડો (Mustard)', en: 'Mustard Seeds' },
  { gu: 'ચણા (Chickpeas)', en: 'Chickpeas' },
];

const PricesPage = () => {
  const { lang } = useLanguage();
  const [selectedApmc, setSelectedApmc] = useState('રાજકોટ (Rajkot APMC)');
  const [selectedCrop, setSelectedCrop] = useState('કપાસ (Cotton / Shankar-6)');
  const [selectedDate, setSelectedDate] = useState('2025-03-12');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRates = useMemo(() => {
    return DAILY_RATES_DATA;
  }, []);

  const handleShare = () => {
    const text = encodeURIComponent(
      lang === 'gu'
        ? 'ગુજરાત APMC લાઈવ બજાર ભાવ જુઓ કિસાન બજાર પર: ' + window.location.href
        : 'View Live Gujarat APMC Mandi Rates on KisanBazaar: ' + window.location.href
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleExport = () => {
    toast.success(
      lang === 'gu'
        ? 'APMC ભાવ શીટ PDF / Excel સફળતાપૂર્વક ડાઉનલોડ થઈ'
        : 'APMC Rate Sheet exported successfully (PDF / Excel)'
    );
  };

  const chartData = lang === 'gu' ? CHART_HISTORY_GU : CHART_HISTORY_EN;

  return (
    <div className="prices-pdf1-wrapper">
      
      {/* 1. Header Area with Share & Export */}
      <div className="pp-header-section">
        <div className="pp-header-inner">
          <div>
            <div className="pp-badge">
              ● {lang === 'gu' ? 'ગુજરાત રાજ્ય કૃષિ બજાર બોર્ડ માન્ય ડેટા' : 'Gujarat State Agricultural Marketing Board Official Data'}
            </div>
            <h1 className="pp-main-heading">
              {lang === 'gu'
                ? 'ગુજરાત APMC લાઈવ બજાર ભાવ (Gujarat Live Mandi Rates)'
                : 'Gujarat APMC Live Mandi Rates'}
            </h1>
            <p className="pp-sub-heading">
              {lang === 'gu'
                ? 'રાજકોટ, ઊંઝા, ગોંડલ, ડીસા, અમરેલી સહિત તમામ મુખ્ય માર્કેટ યાર્ડના રોજેરોજના સચોટ લાઈવ ભાવ'
                : 'Real-time daily mandi prices across Rajkot, Unjha, Gondal, Deesa, Amreli and all major market yards'}
            </p>
          </div>

          <div className="pp-header-actions">
            <button type="button" className="pp-btn-wa" onClick={handleShare}>
              💬 {lang === 'gu' ? 'WhatsApp શેર' : 'WhatsApp Share'}
            </button>
            <button type="button" className="pp-btn-export" onClick={handleExport}>
              ⬇ PDF / Excel
            </button>
          </div>
        </div>
      </div>

      <div className="pp-container">
        
        {/* 2. Filter Bar Card */}
        <div className="pp-filter-card">
          <div className="pp-filter-col">
            <label className="pp-filter-label">
              {lang === 'gu' ? 'APMC માર્કેટ યાર્ડ સિલેક્ટર:' : 'Select APMC Yard:'}
            </label>
            <select
              className="pp-select"
              value={selectedApmc}
              onChange={(e) => setSelectedApmc(e.target.value)}
            >
              {APMC_OPTIONS.map((a, i) => (
                <option key={i} value={a.gu}>
                  {lang === 'gu' ? a.gu : a.en}
                </option>
              ))}
            </select>
          </div>

          <div className="pp-filter-col">
            <label className="pp-filter-label">
              {lang === 'gu' ? 'પાક પસંદ કરો (Commodity):' : 'Select Commodity:'}
            </label>
            <select
              className="pp-select"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
            >
              {COMMODITY_OPTIONS.map((c, i) => (
                <option key={i} value={c.gu}>
                  {lang === 'gu' ? c.gu : c.en}
                </option>
              ))}
            </select>
          </div>

          <div className="pp-filter-col">
            <label className="pp-filter-label">
              {lang === 'gu' ? 'તારીખ પસંદગી (Date):' : 'Select Date:'}
            </label>
            <input
              type="date"
              className="pp-date-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="pp-filter-submit-btn"
            onClick={() => toast.success(lang === 'gu' ? 'ભાવ ફિલ્ટર અપડેટ થયા!' : 'Filters applied!')}
          >
            🔍 {lang === 'gu' ? 'ભાવ ફિલ્ટર કરો' : 'Filter Rates'}
          </button>
        </div>

        {/* 3. Top Mandi Highlights */}
        <div className="pp-highlights-section">
          <div className="pp-sec-head-row">
            <div className="pp-sec-title">
              📈 {lang === 'gu' ? 'મુખ્ય બજાર હાઇલાઇટ્સ (Top Mandi Highlights)' : 'Top Mandi Highlights'}
            </div>
            <div className="pp-sec-meta">
              {lang === 'gu' ? '૨૭ મિનિટ / ૧ કલાક દીઠ ભાવ' : 'Updated 27 min ago'}
            </div>
          </div>

          <div className="pp-highlights-grid">
            {MANDI_HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="pp-hl-card">
                <div className="pp-hl-top">
                  <span className="pp-hl-apmc">{lang === 'gu' ? item.apmcGu : item.apmcEn}</span>
                  <span className={`pp-hl-tag ${item.tagClass}`}>{lang === 'gu' ? item.tagGu : item.tagEn}</span>
                </div>
                <h3 className="pp-hl-title">{lang === 'gu' ? item.titleGu : item.titleEn}</h3>
                <div className="pp-hl-data-row">
                  <div>
                    <span className="hl-label">{lang === 'gu' ? 'હાજર આવક રેન્જ' : 'Price Range'}</span>
                    <div className="hl-val-price">{lang === 'gu' ? item.priceRangeGu : item.priceRangeEn}</div>
                  </div>
                  <div className="text-right">
                    <span className="hl-label">{lang === 'gu' ? 'દૈનિક આવક' : 'Daily Arrival'}</span>
                    <div className="hl-val-arr">{lang === 'gu' ? item.arrivalGu : item.arrivalEn}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. 7-Day Price Movement Chart */}
        <div className="pp-chart-card">
          <div className="pp-chart-header">
            <div>
              <h2 className="pp-chart-title">
                {lang === 'gu'
                  ? 'છેલ્લા ૭ દિવસનો ભાવ ટ્રેન્ડ (7-Day Price Movement)'
                  : '7-Day Price Movement Trend'}
              </h2>
              <span className="pp-chart-sub">
                {lang === 'gu'
                  ? 'રાજકોટ માર્કેટ યાર્ડ કપાસ શંકર-૬ દૈનિક મોડલ સરેરાશ ભાવ વિશ્લેષણ'
                  : 'Rajkot APMC Shankar-6 Cotton Daily Modal Price Trend Analysis'}
              </span>
            </div>

            <div className="pp-chart-stats">
              <div className="pp-chart-stat-item">
                <span className="cs-label">{lang === 'gu' ? 'સૌથી ઊંચો ભાવ (High)' : 'Highest Rate'}</span>
                <span className="cs-val text-green">₹1,740</span>
              </div>
              <div className="pp-chart-stat-item">
                <span className="cs-label">{lang === 'gu' ? 'સૌથી નીચો ભાવ (Low)' : 'Lowest Rate'}</span>
                <span className="cs-val text-red">₹1,630</span>
              </div>
              <div className="pp-chart-stat-item">
                <span className="cs-label">{lang === 'gu' ? 'સરેરાશ મોડલ (Modal Avg)' : 'Modal Average'}</span>
                <span className="cs-val text-blue">₹1,685</span>
              </div>
            </div>
          </div>

          <div className="pp-chart-body">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis domain={[1580, 1760]} stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(val) => [`₹${val} ${lang === 'gu' ? '/ મણ' : '/ 20kg'}`, lang === 'gu' ? 'મોડલ ભાવ' : 'Modal Price']}
                  contentStyle={{ background: '#1e293b', color: '#fff', borderRadius: '8px', border: 'none' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#15803d"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#15803d', stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. Daily Mandi Rate Sheet (Table) */}
        <div className="pp-table-card">
          <div className="pp-table-header-row">
            <div>
              <h2 className="pp-table-title">
                {lang === 'gu'
                  ? 'દૈનિક મંડી ભાવ પત્રક (APMC Daily Rate Sheet)'
                  : 'APMC Daily Rate Sheet'}
              </h2>
              <span className="pp-table-sub">
                {lang === 'gu'
                  ? 'તમામ ભાવ ૨૦ કિલોગ્રામ (૧ મણ) દીઠ દર્શાવેલ છે. માર્કેટ યાર્ડ સત્તાવાર અહેવાલ મુજબ.'
                  : 'All rates are per 20 kg (1 Man). Verified as per official APMC yard bulletins.'}
              </span>
            </div>

            <span className="pp-verified-tag">
              ✓ 7/12 & APMC Verified
            </span>
          </div>

          <div className="pp-table-wrap">
            <table className="pp-rates-table">
              <thead>
                <tr>
                  <th>{lang === 'gu' ? 'માર્કેટ યાર્ડ (APMC YARD)' : 'APMC Yard'}</th>
                  <th>{lang === 'gu' ? 'પાકનું નામ (CROP VARIETY)' : 'Crop Variety'}</th>
                  <th>{lang === 'gu' ? 'દૈનિક આવક (DAILY ARRIVAL)' : 'Daily Arrival'}</th>
                  <th>{lang === 'gu' ? 'ન્યૂનતમ ભાવ (MIN)' : 'Min Rate'}</th>
                  <th>{lang === 'gu' ? 'મહત્તમ ભાવ (MAX)' : 'Max Rate'}</th>
                  <th>{lang === 'gu' ? 'સરેરાશ મોડલ (MODAL AVG)' : 'Modal Avg'}</th>
                  <th>{lang === 'gu' ? '૨૪ કલાક ફેરફાર (TREND)' : '24h Trend'}</th>
                  <th>{lang === 'gu' ? 'વિગત' : 'Action'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredRates.map((r) => (
                  <tr key={r.id}>
                    <td className="cell-apmc">
                      🏢 {lang === 'gu' ? r.apmcGu : r.apmcEn}
                    </td>
                    <td className="cell-crop">
                      <div className="crop-title-bold">{lang === 'gu' ? r.cropGu : r.cropEn}</div>
                      <span className={`grade-tag ${r.gradeClass}`}>{lang === 'gu' ? r.gradeGu : r.gradeEn}</span>
                    </td>
                    <td className="cell-arrival">
                      {lang === 'gu' ? r.arrivalGu : r.arrivalEn}
                    </td>
                    <td className="cell-price">
                      ₹{r.min.toLocaleString()}
                    </td>
                    <td className="cell-price">
                      ₹{r.max.toLocaleString()}
                    </td>
                    <td className="cell-modal">
                      ₹{r.modal.toLocaleString()}
                    </td>
                    <td className="cell-trend">
                      <span className={`trend-badge ${r.trendUp === true ? 'up' : r.trendUp === false ? 'down' : 'neutral'}`}>
                        {r.trendUp === true ? '▲ ' : r.trendUp === false ? '▼ ' : '▬ '}
                        {r.trend}
                      </span>
                    </td>
                    <td>
                      <Link to="/listings" className="pp-row-link" title={lang === 'gu' ? 'પાક જુઓ' : 'View Listings'}>
                        📈
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Meta & Pagination */}
          <div className="pp-table-footer">
            <div className="pp-table-summary">
              {lang === 'gu'
                ? 'કુલ ૨૬ મુખ્ય પાક પૈકી ૭ દર્શાવેલ છે • રાજ્યભરની ૧૫૦+ APMC કાર્યરત'
                : 'Showing 7 of 26 major crops • 150+ APMCs active across Gujarat'}
            </div>

            <div className="pp-pagination">
              <button
                type="button"
                className="pp-pg-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                {lang === 'gu' ? 'અગાઉ' : 'Prev'}
              </button>
              <button
                type="button"
                className={`pp-pg-num ${currentPage === 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                type="button"
                className={`pp-pg-num ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                type="button"
                className={`pp-pg-num ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                type="button"
                className="pp-pg-btn"
                onClick={() => setCurrentPage(p => p + 1)}
              >
                {lang === 'gu' ? 'આગળ' : 'Next'}
              </button>
            </div>
          </div>
        </div>

        {/* 6. Bottom Sell Crop Callout */}
        <div className="pp-callout-card">
          <div className="pp-callout-inner">
            <div>
              <span className="callout-tag">
                {lang === 'gu' ? 'ખેડૂતો માટે ખાસ' : 'Special for Farmers'}
              </span>
              <h3 className="callout-title">
                {lang === 'gu'
                  ? 'તમારો પાક સારા ભાવે વેચવા માટે ખેડૂત લિસ્ટિંગ મૂકો'
                  : 'List Your Crop to Get Best Market Rates'}
              </h3>
              <p className="callout-desc">
                {lang === 'gu'
                  ? 'દલાલ કે વચેટિયા વગર ગુજરાતભરના ૧૦,૦૦૦+ ચકાસાયેલ વેપારીઓ પાસેથી સીધા તમારા ખેતર કે ગોડાઉનથી ઉત્તમ બોલીઓ મેળવો.'
                  : 'Get direct bids from 10,000+ verified traders across Gujarat without brokers or commission directly from your farm.'}
              </p>
            </div>

            <div className="callout-actions">
              <Link to="/farmer/add-crop" className="callout-btn-orange">
                🌾 {lang === 'gu' ? 'પાક લિસ્ટ કરો (Sell Crop)' : 'List Crop (Sell)'}
              </Link>
              <a href="tel:1800543388" className="callout-btn-outline">
                📞 {lang === 'gu' ? 'ટોલ-ફ્રી હેલ્પલાઇન' : 'Toll-Free Helpline'}
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PricesPage;