import { createContext, useContext, useState, useCallback } from 'react';

/* ============================================================
   LANGUAGE CONTEXT — Gujarati ↔ English
   Usage:
     const { lang, t, toggleLang } = useLanguage();
     lang === 'gu' | 'en'
     t('key')  → returns translated string
   ============================================================ */

export const TRANSLATIONS = {

  /* ======== NAVBAR ======== */
  home:        { gu: 'હોમ',         en: 'Home' },
  marketplace: { gu: 'માર્કેટ',     en: 'Marketplace' },
  apmcRates:   { gu: 'APMC ભાવ',    en: 'APMC Rates' },
  about:       { gu: 'અમારા વિશે',  en: 'About' },
  helpline:    { gu: 'હેલ્પલાઇન',   en: 'Helpline' },
  dashboard:   { gu: 'ડેશબોર્ડ',    en: 'Dashboard' },
  login:       { gu: 'લૉગ ઇન',      en: 'Login' },
  register:    { gu: 'નોંધણી',      en: 'Register' },
  logout:      { gu: 'લૉગ આઉટ',     en: 'Logout' },
  sellCrop:    { gu: '+ પાક વેચો',  en: '+ Sell Crop' },

  /* ======== HERO SECTION ======== */
  heroBadge:   { gu: '૧,૨૪૦+ ક્રોપ APMC ભાવ Live છે', en: '1,240+ Crops with Live APMC Prices' },
  heroSeeBtn:  { gu: 'જુઓ →', en: 'View →' },
  heroHeading: { gu: 'ગુજરાતના ખેડૂતો અને\nવેપારીઓ માટે વિશ્વસનીય ડિજિટલ બઝાર', en: 'Trusted Digital Bazaar\nfor Gujarat Farmers & Traders' },
  heroHeading1:{ gu: 'ગુજરાતના ખેડૂતો અને', en: 'Trusted Digital Bazaar for' },
  heroHeading2:{ gu: 'વેપારીઓ માટે', en: 'Gujarat Farmers &' },
  heroHeading3:{ gu: 'વિશ્વસનીય ડિજિટલ બઝાર', en: 'Traders' },
  heroSub:     { gu: 'સીધો ખેડૂત-વેપારી સંપર્ક — APMC ભાવ, ક્રોપ લિસ્ટિંગ, ઓફર, મેસેજ અને ડીલ — બધું એક જ જગ્યાએ. કોઈ બ્રોકર નહીં, 0% કમિશન.', en: 'Direct farmer-trader connect — APMC prices, crop listings, offers, messages & deals — all in one place. No broker, 0% commission.' },
  heroSearchBtn: { gu: '🔍 શોધો / Search', en: '🔍 Search' },
  heroSearchPlaceholder: { gu: 'પાક / ખેડૂત / વેરાયટી શોધો...', en: 'Search crop / farmer / variety...' },
  heroQuickFilter: { gu: 'ઝડપી ફિલ્ટર:', en: 'Quick Filter:' },

  /* Hero stat labels */
  heroStatFarmer:  { gu: 'નોંધાયેલ ખેડૂત', en: 'Registered Farmers' },
  heroStatTrader:  { gu: 'સક્રિય વેપારી',  en: 'Active Traders' },
  heroStatListing: { gu: 'ક્રોપ લિસ્ટિંગ', en: 'Crop Listings' },
  heroStatComm:    { gu: 'કમિશન',           en: 'Commission' },

  /* Hero Category chips */
  catAll:        { gu: 'બધા',      en: 'All' },
  catCotton:     { gu: '🌿 કપાસ', en: '🌿 Cotton' },
  catWheat:      { gu: '🌾 ઘઉં',  en: '🌾 Wheat' },
  catCumin:      { gu: '🟡 જીરૂ', en: '🟡 Cumin' },
  catGroundnut:  { gu: '🥜 મગફળી', en: '🥜 Groundnut' },
  catSesame:     { gu: '⚫ તલ',    en: '⚫ Sesame' },
  catCastor:     { gu: '🌱 અળસી', en: '🌱 Castor' },

  /* Districts */
  districtAll:   { gu: 'બધા જિલ્લા', en: 'All Districts' },

  /* ======== FEATURED CROPS ======== */
  featuredLabel:   { gu: '🌟 ટોપ ફીચર્ડ ક્રોપ', en: '🌟 Top Featured Crops' },
  featuredTitle:   { gu: 'ટોપ ફીચર્ડ પાક', en: 'Top Featured Crops' },
  featuredSub:     { gu: 'ગુજરાત ભરમાંથી ચૂંટેલા best quality ના ક્રોપ — verified ખેડૂત દ્વારા.', en: 'Hand-picked best quality crops from across Gujarat — by verified farmers.' },
  featuredViewAll: { gu: 'સઘળા ૧,૨૪૦+ પાક જુઓ →', en: 'View All 1,240+ Crops →' },
  apmcPrice:    { gu: 'APMC ભાવ:', en: 'APMC Price:' },
  viewDetails:  { gu: '🔍 વિગત જુઓ', en: '🔍 View Details' },
  makeOffer:    { gu: '💼 ઓફર', en: '💼 Offer' },
  verified:     { gu: '✓ Verified', en: '✓ Verified' },
  aboveApmc:    { gu: 'APMC કરતા વધારે', en: 'above APMC' },
  belowApmc:    { gu: 'APMC નીચે', en: 'below APMC' },
  perQuintal:   { gu: '/ક્વિ.', en: '/qtl' },
  qtyAvailable: { gu: 'ક્વિ. ઉપ.', en: 'qtl Avail.' },
  views:        { gu: 'views', en: 'views' },

  /* ======== HOW IT WORKS ======== */
  howLabel:   { gu: '🔄 આ Platform કઈ રીતે કામ કરે?', en: '🔄 How Does This Platform Work?' },
  howTitle:   { gu: 'કેવી રીતે કામ કરે છે?', en: 'How It Works' },
  howSub:     { gu: 'ચાર સરળ પગલામાં ખેડૂત-વેપારી connection — ઝડપી, સુરક્ષિત, ભરોસાપાત્ર.', en: 'Farmer-trader connection in four simple steps — fast, secure, reliable.' },
  step1Title:  { gu: '1. નોંધણી કરો', en: '1. Register' },
  step1Desc:   { gu: 'ખેડૂત અથવા વેપારી તરીકે OTP દ્વારા ઝડપથી નોંધણી. Aadhaar verification optional.', en: 'Quick OTP registration as farmer or trader. Aadhaar verification optional.' },
  step1Link:   { gu: 'અત્યારે નોંધાઓ', en: 'Register Now' },
  step2Title:  { gu: '2. APMC ભાવ જાણો', en: '2. Know APMC Prices' },
  step2Desc:   { gu: 'ગુજરાતના ૧૦૦+ APMC ના Live ભાવ, ગ્રાફ, અને ટ્રેન્ડ — real-time માં.', en: 'Live prices, graphs & trends from 100+ Gujarat APMCs — in real-time.' },
  step2Link:   { gu: 'ભાવ જુઓ', en: 'View Prices' },
  step3Title:  { gu: '3. ઓફર કરો અને મેળવો', en: '3. Offer & Deal' },
  step3Desc:   { gu: 'ખેડૂત crop list કરો, ટ્રેડર ઓફર આપો. Direct chat + deal negotiation.', en: 'Farmer lists crops, trader makes offer. Direct chat + deal negotiation.' },
  step3Link:   { gu: 'Marketplace', en: 'Marketplace' },
  step4Title:  { gu: '4. સુરક્ષિત ડીલ', en: '4. Secure Deal' },
  step4Desc:   { gu: 'Digital deal agreement, payment tracking અને delivery confirmation — secure platform.', en: 'Digital deal agreement, payment tracking & delivery confirmation — secure platform.' },
  step4Link:   { gu: 'More Info', en: 'More Info' },

  /* ======== TESTIMONIALS ======== */
  testiLabel: { gu: '💬 ખેડૂતોના અનુભવ', en: '💬 Farmer Experiences' },
  testiTitle: { gu: 'ખેડૂતોના અનુભવો અને સફળતા', en: 'Farmer Experiences & Success Stories' },
  testiSub:   { gu: 'ગુજરાત ભરના ખેડૂત અને વેપારીઓ Gujarat Kisan Bazaar વિશે શું કહે છે.', en: 'What farmers and traders across Gujarat say about Gujarat Kisan Bazaar.' },
  testiText1: { gu: 'Gujarat Kisan Bazaar એ મારી ૩૦૦ ક્વિ. કપાસ સીધા ₹૧,૭૫૦/ક્વિ.ના ભાવે વેચવામાં મદદ કરી. APMC કરતા ₹૭૦ વધારે — ₹૨૧,૦૦૦ extra profit! WhatsApp notification ઝડપથી આવ્યું.', en: 'Gujarat Kisan Bazaar helped me sell 300 qtl cotton directly at ₹1,750/qtl. ₹70 more than APMC — ₹21,000 extra profit! WhatsApp notification came quickly.' },
  testiText2: { gu: 'ટ્રેડર તરીકે ૧૦૦+ verified ખેડૂત સાથે direct deal કરી. Quality lab report, GPS location — ભરોસો ઘણો. Platform simple છે, Gujarati interface ગ્રામ્ય ખેડૂતો માટે best.', en: 'As a trader, dealt directly with 100+ verified farmers. Quality lab report, GPS location — very trustworthy. Platform is simple, Gujarati interface is best for rural farmers.' },
  testiText3: { gu: 'Add Crop wizard 4 steps માં ક્રોપ list થઈ ગઈ — ૧૫ minutes! APMC suggested price automatically આવ્યો. ૩ traders contacted the same day.', en: 'Crop listed in 4 steps — 15 minutes! APMC suggested price came automatically. 3 traders contacted the same day.' },
  testiRole1: { gu: 'ખેડૂત, ગોંડલ', en: 'Farmer, Gondal' },
  testiRole2: { gu: 'Trader, Rajkot', en: 'Trader, Rajkot' },
  testiRole3: { gu: 'ખેડૂત, બનાસકાંઠા', en: 'Farmer, Banaskantha' },
  testiTagFarmer: { gu: '🌱 ખેડૂત', en: '🌱 Farmer' },
  testiTagTrader: { gu: '🏪 Trader', en: '🏪 Trader' },

  /* ======== MARKETPLACE PAGE ======== */
  mktBreadHome:  { gu: 'Home', en: 'Home' },
  mktBreadCrop:  { gu: 'Crop Marketplace', en: 'Crop Marketplace' },
  mktFound:      { gu: 'ક્રોપ મળ્યા (Gujarat\'s Verified Farmers)', en: 'Crops Found (Gujarat\'s Verified Farmers)' },
  mktFilterTitle:{ gu: '🔧 ફિલ્ટર (Filter)', en: '🔧 Filter' },
  mktResetAll:   { gu: 'Reset All', en: 'Reset All' },
  mktSearchPH:   { gu: '🔍 પાક / variety શોધો...', en: '🔍 Search crop / variety...' },
  mktCategoryTitle: { gu: '📦 પ્રકાર (Category)', en: '📦 Category' },
  mktQualityTitle:  { gu: '🌟 ગુણવત્તા (Quality Grade)', en: '🌟 Quality Grade' },
  mktVerifiedTitle: { gu: '✅ Verified ખેડૂત', en: '✅ Verified Farmers' },
  mktVerifiedOnly:  { gu: 'Verified Farmers Only', en: 'Verified Farmers Only' },
  mktApmcCert:      { gu: 'APMC Certified', en: 'APMC Certified' },
  mktPriceRange:    { gu: '💰 ભાવ રેન્જ (₹/ક્વિ.)', en: '💰 Price Range (₹/qtl)' },
  mktApplyFilter:   { gu: '✓ Apply ભાવ ફિ.', en: '✓ Apply Price Filter' },
  mktQtyTitle:      { gu: '📦 જથ્થો (Qty in Quintal)', en: '📦 Quantity (in Quintal)' },
  mktSortAll:       { gu: 'All Crops', en: 'All Crops' },
  mktSortLatest:    { gu: 'Latest', en: 'Latest' },
  mktSortPriceLow:  { gu: 'ભાવ: ઓછો-વધારે', en: 'Price: Low-High' },
  mktSortVerified:  { gu: 'Top Verified', en: 'Top Verified' },
  mktSortLabel:     { gu: 'ક્રમ:', en: 'Sort:' },
  mktSortLatestFirst: { gu: 'નવા પ્રથમ', en: 'Latest First' },
  mktSortPriceLH:   { gu: 'ભાવ: ઓછો-વધારે', en: 'Price: Low to High' },
  mktSortPriceHL:   { gu: 'ભાવ: વધારે-ઓછો', en: 'Price: High to Low' },
  mktSortMostViewed:{ gu: 'સૌથી વધારે જોવ.', en: 'Most Viewed' },
  mktFarmerLabel:   { gu: '👤 ખેડૂત:', en: '👤 Farmer:' },
  mktLocationLabel: { gu: '📍 સ્થ.:', en: '📍 Location:' },
  mktMoistureLabel: { gu: '💧 Moisture:', en: '💧 Moisture:' },
  mktAvailable:     { gu: 'ઉ. Available', en: 'Available' },
  mktViewDetails:   { gu: '🔍 વિગત જુઓ (View Details)', en: '🔍 View Details' },
  mktOffer:         { gu: '💼 ઓ. +', en: '💼 Offer +' },
  mktNoCrops:       { gu: 'કોઈ ક્રોપ નહ.', en: 'No Crops Found' },
  mktResetHint:     { gu: 'ફ. reset કરો અથવા category change કરો', en: 'Reset filters or change category' },
  mktNew:           { gu: '🆕 New', en: '🆕 New' },
  mktNoMin:         { gu: 'No Min', en: 'No Min' },
  mktNoMax:         { gu: 'No Max', en: 'No Max' },

  /* ======== APMC RATES PAGE ======== */
  pricesPageTitle: { gu: '📊 APMC ભાવ અને સામગ્રી નિયત્રણ કેન્દ્ર', en: '📊 APMC Rates & Commodity Control Center' },
  pricesDesc:      { gu: 'ગુજરાતના APMC ભાવ, ટ્રેન્ડ અને ૭-day chart — Real-time data.', en: 'Gujarat APMC prices, trends & 7-day chart — Real-time data.' },
  pricesAllCom:    { gu: 'બધા', en: 'All' },
  pricesAllApmc:   { gu: 'બધા APMC', en: 'All APMC' },
  pricesFilterBtn: { gu: '🔍 ભાવ ફ. જુઓ', en: '🔍 Filter Prices' },
  pricesHighTitle: { gu: '🌟 આ.ક.ના ટોપ ભાવ Highlights', en: '🌟 Today\'s Top Price Highlights' },
  pricesArrivals:  { gu: 'આ.:', en: 'Arr.:' },
  pricesChartTitle:{ gu: '📈 ભાવ Trend (૭-Day Price Movement)', en: '📈 Price Trend (7-Day Movement)' },
  pricesChartDesc: { gu: 'ગુ. APMC ભ. ટ્ર. — ૭-day movement (₹/ક્વિ.)', en: 'Gujarat APMC price trend — 7-day movement (₹/qtl)' },
  pricesTableTitle:{ gu: '📋 રોજિ.ના APMC Daily Rate Sheet', en: '📋 Daily APMC Rate Sheet' },
  pricesExportCSV: { gu: '📥 Export CSV', en: '📥 Export CSV' },
  pricesColCom:    { gu: 'ચીજ / VARIETY', en: 'COMMODITY / VARIETY' },
  pricesColApmc:   { gu: 'APMC', en: 'APMC' },
  pricesColMin:    { gu: 'MIN (₹/ક્વિ.)', en: 'MIN (₹/qtl)' },
  pricesColModal:  { gu: 'MODAL (₹/ક્વિ.)', en: 'MODAL (₹/qtl)' },
  pricesColMax:    { gu: 'MAX (₹/ક્વિ.)', en: 'MAX (₹/qtl)' },
  pricesColArr:    { gu: 'ARRIVALS', en: 'ARRIVALS' },
  pricesColTrend:  { gu: 'TREND', en: 'TREND' },

  /* ======== ABOUT PAGE ======== */
  aboutStatTitle: { gu: 'ગ. ખ. — Gujarat Kisan Bazaar Platform Stats', en: 'Gujarat Kisan Bazaar — Platform Stats' },
  aboutStatDesc:  { gu: 'Real numbers — real impact on Gujarat\'s agricultural ecosystem', en: 'Real numbers — real impact on Gujarat\'s agricultural ecosystem' },
  aboutStatFarmer: { gu: 'નોંધ. ખેડૂત', en: 'Reg. Farmers' },
  aboutStatTrader: { gu: 'Active Traders', en: 'Active Traders' },
  aboutStatDeals:  { gu: 'Deals Done', en: 'Deals Done' },
  aboutStatComm:   { gu: 'Commission', en: 'Commission' },
  aboutStatGMV:    { gu: 'Platform GMV', en: 'Platform GMV' },
  helplineLabel:   { gu: '📞 Help & Support', en: '📞 Help & Support' },
  helplineTitle:   { gu: 'ખ. Help Center — Helpline', en: 'Help Center — Helpline' },
  helplineSub:     { gu: 'ગ. farmer support team ready — call, WhatsApp, or online.', en: 'Our farmer support team is ready — call, WhatsApp, or online.' },
  helpline1Title:  { gu: 'Toll-Free Helpline', en: 'Toll-Free Helpline' },
  helpline1Desc:   { gu: 'ઝડ. farmer support, crop listing help, price info — ગ. ભ.માં.', en: 'Quick farmer support, crop listing help, price info — in Gujarati.' },
  helpline1Hours:  { gu: '⏰ સોમ-શનિ, 9 AM – 6 PM', en: '⏰ Mon-Sat, 9 AM – 6 PM' },
  helpline1Btn:    { gu: '📞 1800-845-388 Call Now', en: '📞 1800-845-388 Call Now' },
  helpline2Title:  { gu: 'WhatsApp Support', en: 'WhatsApp Support' },
  helpline2Desc:   { gu: 'WhatsApp message — crop photos, price query, account help — 24x7.', en: 'WhatsApp message — crop photos, price query, account help — 24x7.' },
  helpline2Hours:  { gu: '⏰ 24×7 ઉપલ.', en: '⏰ 24×7 Available' },
  helpline2Btn:    { gu: '💬 WhatsApp Chat', en: '💬 WhatsApp Chat' },
  helpline3Title:  { gu: 'Online ફ.ર. (Grievance)', en: 'Online Grievance' },
  helpline3Desc:   { gu: 'ઓ. complaint — account, deal, price dispute — 48 hr response.', en: 'Online complaint — account, deal, price dispute — 48 hr response.' },
  helpline3Hours:  { gu: '⏰ 48 hr Response', en: '⏰ 48 hr Response' },
  helpline3Btn:    { gu: '📋 Submit Grievance', en: '📋 Submit Grievance' },
  whyChooseUs:     { gu: '⭐ Why Choose Us', en: '⭐ Why Choose Us' },
  benefitsTitle:   { gu: 'ગ. ખ. Platform ના ફ. (Platform Benefits)', en: 'Platform Benefits' },
  benefit1Title:   { gu: 'Buyer-Seller Protection', en: 'Buyer-Seller Protection' },
  benefit1Desc:    { gu: 'Platform-backed deals. Dispute resolution in 72 hrs. ખ.-વ. protection.', en: 'Platform-backed deals. Dispute resolution in 72 hrs. Buyer-Seller protection.' },
  benefit2Title:   { gu: 'Real APMC Data', en: 'Real APMC Data' },
  benefit2Desc:    { gu: 'Gujarat APMC official data — daily update. Fair price reference.', en: 'Gujarat APMC official data — daily update. Fair price reference.' },
  benefit3Title:   { gu: 'Verified Users', en: 'Verified Users' },
  benefit3Desc:    { gu: 'Aadhaar + GST verification. Blue tick for trusted farmers & traders.', en: 'Aadhaar + GST verification. Blue tick for trusted farmers & traders.' },
  faqLabel:        { gu: '❓ FAQ', en: '❓ FAQ' },
  faqTitle:        { gu: 'વારં. પૂ.તા (Frequently Asked Questions)', en: 'Frequently Asked Questions' },
  faq1Q:  { gu: 'Gujarat Kisan Bazaar account ક. બ. જ.?', en: 'How to create a Gujarat Kisan Bazaar account?' },
  faq1A:  { gu: 'OTP login — mobile number enter, OTP verify, role select (farmer/trader), basic info fill. ૫ min!', en: 'OTP login — enter mobile number, verify OTP, select role (farmer/trader), fill basic info. Just 5 min!' },
  faq2Q:  { gu: 'ખ. crop list ક. ₹ ખ.?', en: 'Is there any charge to list a crop?' },
  faq2A:  { gu: 'Crop listing bilkul FREE. Platform zero commission. Direct farmer-trader.', en: 'Crop listing is completely FREE. Platform zero commission. Direct farmer-trader.' },
  faq3Q:  { gu: 'APMC ભ. ક. update?', en: 'How often are APMC prices updated?' },
  faq3A:  { gu: 'Daily morning Gujarat APMC official data. Real-time updates.', en: 'Daily morning with Gujarat APMC official data. Real-time updates.' },
  faq4Q:  { gu: 'ડ. payment ક.?', en: 'How does payment work?' },
  faq4A:  { gu: 'Platform deal tracking. Payment direct between farmer-trader (NEFT/UPI/Cash). Platform escrow coming soon.', en: 'Platform deal tracking. Payment direct between farmer-trader (NEFT/UPI/Cash). Platform escrow coming soon.' },
  grievanceLabel:  { gu: '📋 Grievance', en: '📋 Grievance' },
  grievanceTitle:  { gu: 'ફ.ર. / Feedback (Submit Grievance)', en: 'Feedback / Submit Grievance' },
  grievanceName:   { gu: 'તમારું નામ (Your Name) *', en: 'Your Name *' },
  grievanceNamePH: { gu: 'પૂ. નામ enter કો.', en: 'Enter your full name' },
  grievanceMobile: { gu: 'Mobile Number *', en: 'Mobile Number *' },
  grievanceType:   { gu: 'Complaint Type', en: 'Complaint Type' },
  grievanceMsg:    { gu: 'ફ.ર. / Message', en: 'Message / Feedback' },
  grievanceMsgPH:  { gu: 'તમ. ફ.ર. અ. problem describe .', en: 'Describe your problem or feedback here.' },
  grievanceSubmit: { gu: '📤 Submit Grievance', en: '📤 Submit Grievance' },
  grievanceNote:   { gu: '📅 Response within 48 hours | Grievance ID will be sent to your mobile', en: '📅 Response within 48 hours | Grievance ID will be sent to your mobile' },
  complaintAccount:{ gu: 'Account Issue', en: 'Account Issue' },
  complaintCrop:   { gu: 'Crop Listing Problem', en: 'Crop Listing Problem' },
  complaintPrice:  { gu: 'Price Dispute', en: 'Price Dispute' },
  complaintDeal:   { gu: 'Deal Issue', en: 'Deal Issue' },
  complaintOther:  { gu: 'Other', en: 'Other' },

  /* ======== FOOTER ======== */
  footerCtaTitle:  { gu: '🌾 તમારો પાક સારા ભાવે વેચવા માટે આજે જ જોડાઓ', en: '🌾 Join today to sell your crops at better prices' },
  footerCtaSub:    { gu: 'ગુજરાતના ૫૫,૦૦૦+ ખેડૂત અને ૨,૫૦૦+ વેપારી સાથે જોડાઈ સીધો ફાયદો મેળવો', en: 'Connect with 55,000+ farmers and 2,500+ traders in Gujarat for direct benefit' },
  footerCtaBtn1:   { gu: '🌱 ખેડૂત તરીકે નોંધાઓ', en: '🌱 Register as Farmer' },
  footerBrandName: { gu: 'ગુજરાત કિસાન બઝાર', en: 'Gujarat Kisan Bazaar' },
  footerBrandDesc: { gu: 'ગુજરાતના ખેડૂતો અને વેપારીઓ માટેનું ભરોસાપાત્ર ડિજિટલ બઝાર. APMC ભાવ, ક્રોપ લિસ્ટિંગ, અને સીધો ખેડૂત-વેપારી સંપર્ક.', en: 'Trusted digital bazaar for Gujarat farmers and traders. APMC prices, crop listings, and direct farmer-trader connect.' },
  footerQuickLinks:{ gu: 'Quick Links', en: 'Quick Links' },
  footerServices:  { gu: 'Services', en: 'Services' },
  footerContact:   { gu: 'સંપર્ક / Contact', en: 'Contact' },
  footerFarmerLogin:{ gu: '🌱 Farmer Login', en: '🌱 Farmer Login' },
  footerTraderLogin:{ gu: '🏪 Trader Login', en: '🏪 Trader Login' },
  footerSellCrop:  { gu: '➕ Sell Crop', en: '➕ Sell Crop' },
  footerPostDemand:{ gu: '📋 Post Demand', en: '📋 Post Demand' },
  footerLivePrices:{ gu: '📊 Live Prices', en: '📊 Live Prices' },
  footerTollFree:  { gu: 'Toll Free: 1800-563-388', en: 'Toll Free: 1800-563-388' },
  footerPhoneHours:{ gu: 'સોમ-શનિ, સવારે 9 - સાંજે 6', en: 'Mon-Sat, 9 AM - 6 PM' },
  footerWAHours:   { gu: '24x7 Support Available', en: '24x7 Support Available' },
  footerEmailResp: { gu: 'Email Response in 24 hrs', en: 'Email Response in 24 hrs' },
  footerHQ:        { gu: 'Gujarat Kisan Bazaar HQ', en: 'Gujarat Kisan Bazaar HQ' },
  footerHQAddr:    { gu: 'ગાંધીનગર, ગુજરાત - 382010', en: 'Gandhinagar, Gujarat - 382010' },
  footerCopy:      { gu: 'ગુજરાત કિસાન બઝાર (Gujarat Kisan Bazaar). All rights reserved.', en: 'Gujarat Kisan Bazaar. All rights reserved.' },
  footerPrivacy:   { gu: 'Privacy Policy', en: 'Privacy Policy' },
  footerTerms:     { gu: 'Terms of Service', en: 'Terms of Service' },
  footerApmcInfo:  { gu: 'APMC Info', en: 'APMC Info' },
  footerSitemap:   { gu: 'Sitemap', en: 'Sitemap' },

  /* ======== LOGIN PAGE ======== */
  loginBrandName:  { gu: 'Gujarat Kisan Bazaar', en: 'Gujarat Kisan Bazaar' },
  loginHeading:    { gu: 'ગુજરાતનું ડિજિટલ ખેતી', en: 'Gujarat\'s Digital Farming' },
  loginHeading2:   { gu: 'Platform', en: 'Platform' },
  loginSub:        { gu: '૫૫,૦૦૦+ ખેડૂત ◦ ₂,૫૦૦+ વેપારી ◦ 0% commission.', en: '55,000+ Farmers ◦ 2,500+ Traders ◦ 0% commission.' },
  feat1Title:      { gu: 'Live APMC Prices', en: 'Live APMC Prices' },
  feat1Desc:       { gu: '100+ APMC ભ. real-time — crop decision support.', en: '100+ APMC prices real-time — crop decision support.' },
  feat2Title:      { gu: 'Direct Farmer-Trader', en: 'Direct Farmer-Trader' },
  feat2Desc:       { gu: '0% commission — direct deal, max profit.', en: '0% commission — direct deal, max profit.' },
  feat3Title:      { gu: 'Verified & Secure', en: 'Verified & Secure' },
  feat3Desc:       { gu: 'Aadhaar/GST verified users. Platform-backed deals.', en: 'Aadhaar/GST verified users. Platform-backed deals.' },
  feat4Title:      { gu: 'WhatsApp Alerts', en: 'WhatsApp Alerts' },
  feat4Desc:       { gu: 'Price change, new offer — instant mobile notification.', en: 'Price change, new offer — instant mobile notification.' },
  loginTestiText:  { gu: '"Gujarat Kisan Bazaar એ ₹21,000 extra profit આપ્યો!"', en: '"Gujarat Kisan Bazaar gave me ₹21,000 extra profit!"' },
  loginTestiAuthor:{ gu: '— ભૂ. ગ., ગોંડલ, Rajkot ⭐⭐⭐⭐⭐', en: '— B. Gadhvi, Gondal, Rajkot ⭐⭐⭐⭐⭐' },
  loginTabLogin:   { gu: '🔑 Login', en: '🔑 Login' },
  loginTabReg:     { gu: '📝 Register', en: '📝 Register' },
  loginSelectRole: { gu: 'Select Your Role:', en: 'Select Your Role:' },
  loginFarmerRole: { gu: 'ખ. (Farmer)', en: 'Farmer' },
  loginFarmerDesc: { gu: 'Crop list & sell', en: 'Crop list & sell' },
  loginTraderRole: { gu: 'T./ખ. (Trader)', en: 'Trader' },
  loginTraderDesc: { gu: 'Browse & buy crops', en: 'Browse & buy crops' },
  loginFullName:   { gu: 'Full Name *', en: 'Full Name *' },
  loginDistrict:   { gu: 'Select District', en: 'Select District' },
  loginTaluka:     { gu: 'Taluka', en: 'Taluka' },
  loginVillage:    { gu: 'Village', en: 'Village' },
  loginCropLabel:  { gu: 'Primary Crops (select all):', en: 'Primary Crops (select all):' },
  loginMobilePH:   { gu: 'Mobile number enter karo...', en: 'Enter mobile number...' },
  loginSendOtp:    { gu: '📲 OTP Send karo', en: '📲 Send OTP' },
  loginSending:    { gu: '⏳ Sending...', en: '⏳ Sending...' },
  loginOtpLabel:   { gu: 'Enter 6-digit OTP', en: 'Enter 6-digit OTP' },
  loginResendIn:   { gu: 'Resend in', en: 'Resend in' },
  loginResendOtp:  { gu: 'Resend OTP', en: 'Resend OTP' },
  loginOtpNote:    { gu: '✅ OTP valid 5 minutes | Auto-fill supported', en: '✅ OTP valid 5 minutes | Auto-fill supported' },
  loginTerms:      { gu: 'Gujarat Kisan Bazaar ના Terms & Conditions અને Privacy Policy સ્વીકારો.', en: 'I agree to Gujarat Kisan Bazaar Terms & Conditions and Privacy Policy.' },
  loginCompleteReg:{ gu: '✅ Complete Registration & Login →', en: '✅ Complete Registration & Login →' },
  loginVerifyOtp:  { gu: '✅ Verify OTP & Login →', en: '✅ Verify OTP & Login →' },
  loginVerifying:  { gu: '⏳ Verifying...', en: '⏳ Verifying...' },
  loginNewUser:    { gu: 'New user?', en: 'New user?' },
  loginRegHere:    { gu: 'Register here', en: 'Register here' },
  loginAlreadyReg: { gu: 'Already registered?', en: 'Already registered?' },
  loginHere:       { gu: 'Login here', en: 'Login here' },

  /* ======== COMMON ======== */
  loading:      { gu: 'લોડ થઈ રહ્યું છે...', en: 'Loading...' },
  noData:       { gu: 'કોઈ ડેટા મળ્યો નથી', en: 'No data found' },
  price:        { gu: 'ભાવ',          en: 'Price' },
  quantity:     { gu: 'જથ્થો',       en: 'Quantity' },
  location:     { gu: 'સ્થળ',        en: 'Location' },
  date:         { gu: 'તારીખ',       en: 'Date' },
  status:       { gu: 'સ્થિતિ',      en: 'Status' },
  actions:      { gu: 'ક્રિયાઓ',    en: 'Actions' },
  save:         { gu: 'સાચવો',       en: 'Save' },
  cancel:       { gu: 'રદ',          en: 'Cancel' },
  delete:       { gu: 'કાઢો',        en: 'Delete' },
  edit:         { gu: 'સંપાદિત',     en: 'Edit' },
  add:          { gu: 'ઉમેરો',       en: 'Add' },
  search:       { gu: 'શોધ',         en: 'Search' },
  back:         { gu: 'પાછળ',       en: 'Back' },
  next:         { gu: 'આગળ',         en: 'Next' },
  yes:          { gu: 'હા',           en: 'Yes' },
  no:           { gu: 'ના',           en: 'No' },
  total:        { gu: 'કુલ',          en: 'Total' },
  messages:     { gu: 'સંદેશ',       en: 'Messages' },
  profile:      { gu: 'પ્રોફાઇલ',   en: 'Profile' },
  settings:     { gu: 'સેટિંગ',      en: 'Settings' },
  crops:        { gu: 'પાક',          en: 'Crops' },
  farmer:       { gu: 'ખેડૂત',       en: 'Farmer' },
  trader:       { gu: 'વેપારી',      en: 'Trader' },
  admin:        { gu: 'એડ્મિન',      en: 'Admin' },
  submit:       { gu: 'સબમિટ',       en: 'Submit' },
  filter:       { gu: 'ફિલ્ટર',     en: 'Filter' },
  sortBy:       { gu: 'ક્રમ',       en: 'Sort By' },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    () => localStorage.getItem('km_lang') || 'gu'
  );

  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'gu' ? 'en' : 'gu';
      localStorage.setItem('km_lang', next);
      return next;
    });
  }, []);

  /* t('key') → translated string */
  const t = useCallback((key) => {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[lang] ?? entry['en'];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
