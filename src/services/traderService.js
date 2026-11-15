// ============================================================
// traderService.js — Full-featured Data Service & Persistence
// For KisanBazaar Vepari (Trader / Buyer) Portal
// ============================================================

const STORAGE_KEYS = {
  CROPS: 'kb_trader_crops',
  WATCHLIST: 'kb_trader_watchlist',
  DEALS: 'kb_trader_deals',
  DEMANDS: 'kb_trader_demands',
  PROFILE: 'kb_trader_profile',
  MESSAGES: 'kb_trader_messages',
};

// --- INITIAL SEED DATA MATCHING THE PDF EXACTLY ---

export const INITIAL_CROPS = [
  {
    id: 'LOT-KB-9042',
    nameGu: 'સૌરાષ્ટ્ર શંકર-૬ સુપર કપાસ',
    nameEn: 'Saurashtra Shankar-6 Cotton',
    commodity: 'cotton',
    variety: 'Shankar-6',
    grade: 'Grade A (સુપર પ્રીમિયમ)',
    gradeTag: 'Grade A (ઉત્તમ)',
    farmer: {
      name: 'રમેશભાઈ કાનજીભાઈ પટેલ',
      nameEn: 'Rameshbhai Kanjibhai Patel',
      verified: true,
      landVerified: '7/12 & 8-A વેરિફાઇડ ખેડૂત',
      village: 'નવાગઢ',
      taluka: 'જેતપુર',
      district: 'રાજકોટ',
      highwayDist: '૨.૫ કિમી (મોટા ૧૬-વ્હીલર ટ્રક આવી શકે તેવો પાકો ડામર રોડ)',
      memberSince: 'છેલ્લા ૩ વર્ષથી (૪૯ સફળ સોદા)',
      rating: 4.9,
      phone: '+91 98254 78210',
      avatar: 'રપ',
    },
    sampleLocation: 'ગોંડલ યાર્ડ માન્યતા',
    images: [
      '/crops/cotton.jpg',
      '/crops/cotton.jpg',
      '/crops/cotton.jpg',
      '/crops/cotton.jpg',
      '/crops/cotton.jpg',
    ],
    quality: {
      grade: 'Grade A પ્રીમિયમ',
      gradeSub: 'સુપર વ્હાઇટ કલર',
      stapleLength: '29.5 mm',
      stapleSub: 'સ્પિનિંગ માટે ઉત્તમ',
      micronaire: '3.8 MIC',
      micronaireSub: 'પરફેક્ટ ફાઇબર પરિપક્વતા',
      moisture: '7.2%',
      moistureSub: 'સ્ટાન્ડર્ડ (< 8.5% થી ઓછું)',
      trash: '< 2.0%',
      trashSub: 'નહિવત પાન-ડાખળી',
      strength: '29.2 g/tex',
      strengthSub: 'હાઇ ટેન્સાઇલ ક્ષમતા',
      labReportNo: '#GND-LAB-2025-8841',
      labDate: '૧૨ ફેબ્રુઆરી ૨૦૨૫',
      labInspector: 'ભાવેશભાઈ દ્વારા પ્રમાણિત',
    },
    volumeQtl: 350,
    volumeMan: 1750,
    farmerAskMan: 1720,
    farmerAskQtl: 8600,
    apmcPriceMan: 1680,
    harvestDate: '૧૨ જાન્યુઆરી ૨૦૨૫ (તાજો પાક)',
    harvestType: 'તાજો પાક (Fresh)',
    transportAccess: 'ટ્રાન્સપોર્ટ વાહન પહોંચ માર્ગ ઉપલબ્ધ (Heavy Truck Accessible)',
    weighmentAtFarm: true,
    weighmentLocation: 'ખેતરે તોલમાપ કાંટો ઉપલબ્ધ',
    instantLoading: true,
    priceChange: -20,
    oldPrice: 1740,
    daysListed: 2,
  },
  {
    id: 'GND-4081',
    nameGu: 'જામનગરી જી-૨૦ બોલ્ડ મગફળી',
    nameEn: 'Jamnagari G-20 Bold Peanuts',
    commodity: 'groundnut',
    variety: 'G-20 Bold',
    grade: 'Grade A (ઉત્તમ)',
    gradeTag: 'Grade A (ઉત્તમ)',
    farmer: {
      name: 'મનજીભાઈ આહિર',
      nameEn: 'Manjibhai Aahir',
      verified: true,
      landVerified: '૭/૧૨ વેરિફાઇડ ખેડૂત',
      village: 'જામજોધપુર',
      taluka: 'જામજોધપુર',
      district: 'જામનગર',
      highwayDist: '૧.૨ કિમી',
      memberSince: '૨ વર્ષથી (૨૬ સોદા)',
      rating: 4.8,
      phone: '+91 98254 66789',
      avatar: 'મઆ',
    },
    sampleLocation: 'જામજોધપુર યાર્ડ',
    images: ['/crops/groundnut.jpg'],
    quality: {
      grade: 'Grade A બોલ્ડ',
      oilContent: '૪૮.૫% હાઇ ઓઇલ કન્ટેન્ટ',
      moisture: '૬.૫%',
      size: '૪૦-૫૦ કાઉન્ટ મોટા દાણા',
      trash: '< ૧.૫%',
      labReportNo: '#JMD-LAB-9921',
    },
    volumeQtl: 500,
    volumeMan: 2500,
    farmerAskMan: 1380,
    farmerAskQtl: 6900,
    apmcPriceMan: 1370,
    harvestDate: '૧૮ જાન્યુઆરી ૨૦૨૫',
    harvestType: 'તાજો પાક',
    transportAccess: 'ટ્રાન્સપોર્ટ વાહન સીધા ખેતરે ઉપલબ્ધ',
    weighmentAtFarm: false,
    weighmentLocation: 'APMC કાંટો જામજોધપુર યાર્ડ',
    instantLoading: true,
    priceChange: 0,
    daysListed: 3,
  },
  {
    id: 'UNJ-9124',
    nameGu: 'ઊંઝા સ્પેશિયલ બોલ્ડ જીરૂ (Machine Clean)',
    nameEn: 'Unjha Special Bold Cumin (Machine Clean)',
    commodity: 'cumin',
    variety: 'Machine Clean Jeera',
    grade: 'Machine Clean 99.5%',
    gradeTag: 'Machine Clean',
    farmer: {
      name: 'ઇશ્વરભાઈ પટેલ / મહેશભાઈ પટેલ',
      nameEn: 'Ishwarbhai Patel',
      verified: true,
      landVerified: 'સિંગલ ફાર્મ ડાયરેક્ટ',
      village: 'ઊંઝા',
      taluka: 'ઊંઝા',
      district: 'મહેસાણા',
      highwayDist: '૦.૫ કિમી (યાર્ડ નજીક)',
      memberSince: '૪ વર્ષથી (૫૮ સોદા)',
      rating: 4.95,
      phone: '+91 98254 33211',
      avatar: 'ઇપ',
    },
    sampleLocation: 'ઊંઝા APMC ગોડાઉન નં. ૪',
    images: ['/crops/cumin.jpg'],
    quality: {
      grade: 'સોર્ટેક્સ મશીન ક્લીન',
      purity: '૯૯.૫% પ્યોરિટી',
      moisture: '૭.૦%',
      packing: '૫૦ Kg ગની બેગ નવા બારદાન',
      certification: 'Export Quality (FSSAI અનુરૂપ)',
      labReportNo: '#UNJ-LAB-3310',
    },
    volumeQtl: 160,
    volumeMan: 800,
    volumeBags: 200,
    farmerAskMan: 5550,
    farmerAskQtl: 27750,
    apmcPriceMan: 5450,
    harvestDate: '૫ ફેબ્રુઆરી ૨૦૨૫',
    harvestType: 'રેડી સ્ટોક',
    transportAccess: 'ઊંઝા યાર્ડ પાસે રેડી ડિસ્પેચ',
    weighmentAtFarm: false,
    weighmentLocation: 'ઊંઝા APMC સરકારી કાંટો',
    instantLoading: true,
    priceChange: 65,
    daysListed: 1,
  },
  {
    id: 'BHL-7712',
    nameGu: 'ભાલિયા ટુકડા ઘઉં (GI Tagged Organic)',
    nameEn: 'Bhalia Tukda Wheat (GI Tagged Organic)',
    commodity: 'wheat',
    variety: 'Bhalia Dawoodkhani',
    grade: 'GI Tagged Organic',
    gradeTag: 'GI Tagged Organic',
    farmer: {
      name: 'વિક્રમસિંહ ગોહિલ',
      nameEn: 'Vikramsinh Gohil',
      verified: true,
      landVerified: 'NPOP ઓર્ગેનિક સર્ટિફાઇડ લોટ',
      village: 'ધંધૂકા',
      taluka: 'ધંધૂકા',
      district: 'અમદાવાદ',
      highwayDist: '૩ કિમી',
      memberSince: '૨ વર્ષથી (૧૪ સોદા)',
      rating: 4.85,
      phone: '+91 98254 11223',
      avatar: 'વિગો',
    },
    sampleLocation: 'ધંધૂકા ગોડાઉન',
    images: ['/crops/wheat.jpg'],
    quality: {
      grade: 'NPOP INDIA સંપૂર્ણ સેન્દ્રીય',
      protein: '૧૪.૨% પ્રીમિયમ આટા ગ્રેડ',
      moisture: '૮.૦%',
      packing: '૫૦ Kg બેગ',
      labReportNo: '#BHL-ORG-4401',
    },
    volumeQtl: 150,
    volumeMan: 750,
    volumeBags: 300,
    farmerAskMan: 980,
    farmerAskQtl: 4900,
    apmcPriceMan: 960,
    harvestDate: '૧૦ જાન્યુઆરી ૨૦૨૫',
    harvestType: 'ગોડાઉન સ્ટોક (Dry Stored)',
    transportAccess: 'ટ્રેક્ટર/ટ્રક સીધા લોડિંગની સુવિધા ઉપલબ્ધ',
    weighmentAtFarm: true,
    weighmentLocation: 'વજન કાંટો હાજર',
    instantLoading: true,
    priceChange: 0,
    daysListed: 5,
  },
  {
    id: 'SES-3190',
    nameGu: 'કાળા તલ એક્સપોર્ટ ગ્રેડ (Black Sesame Export Grade)',
    nameEn: 'Black Sesame Export Grade (Z-Black)',
    commodity: 'sesame',
    variety: 'Z-Black Export',
    grade: 'Z-Black Export Grade',
    gradeTag: 'ઝેડ-બ્લેક',
    farmer: {
      name: 'બાલુભાઈ કોળી',
      nameEn: 'Balubhai Koli',
      verified: true,
      landVerified: '૭/૧૨ પ્રમાણિત',
      village: 'તળાજા',
      taluka: 'તળાજા',
      district: 'ભાવનગર',
      highwayDist: '૧ કિમી',
      memberSince: '૧ વર્ષથી',
      rating: 4.7,
      phone: '+91 98254 99887',
      avatar: 'બાકો',
    },
    sampleLocation: 'ભાવનગર માર્કેટ યાર્ડ',
    images: ['/crops/sesame.jpg'],
    quality: {
      grade: '૯૯.૮% સોર્ટેક્સ ક્લીન',
      purity: '૯૯.૮%',
      moisture: '૬.૨%',
      packing: 'નવી ગની બેગ',
    },
    volumeQtl: 80,
    volumeMan: 400,
    farmerAskMan: 2950,
    farmerAskQtl: 14750,
    apmcPriceMan: 2900,
    harvestDate: '૨૮ જાન્યુઆરી ૨૦૨૫',
    harvestType: 'સ્ટોક સક્રિય',
    transportAccess: 'તળાજા હાઇવે પાસે',
    weighmentAtFarm: false,
    weighmentLocation: 'તળાજા માર્કેટ યાર્ડ કાંટો',
    instantLoading: true,
    priceChange: 0,
    daysListed: 4,
  },
  {
    id: 'WHT-5501',
    nameGu: 'દેશી ટુકડા ઘઉં (Desi Tukda Wheat)',
    nameEn: 'Desi Tukda Wheat',
    commodity: 'wheat',
    variety: 'Tukda',
    grade: 'Grade B (સામાન્ય)',
    gradeTag: 'વેચાઈ ગયો (Sold Out)',
    farmer: {
      name: 'શામજીભાઈ ભરવાડ',
      nameEn: 'Shamjibhai Bharwad',
      verified: true,
      landVerified: '૭/૧૨ પ્રમાણિત',
      village: 'ધંધૂકા',
      taluka: 'ધંધૂકા',
      district: 'અમદાવાદ',
      phone: '+91 98254 00112',
      avatar: 'શાભ',
    },
    sampleLocation: 'ધંધૂકા યાર્ડ',
    images: ['/crops/wheat.jpg'],
    volumeQtl: 200,
    volumeMan: 1000,
    volumeBags: 400,
    farmerAskMan: 585,
    farmerAskQtl: 2925,
    apmcPriceMan: 580,
    soldOut: true,
    soldPrice: 585,
    priceChange: 0,
    daysListed: 8,
  },
];

// --- INITIAL WATCHLIST ---
export const INITIAL_WATCHLIST = [
  {
    id: 'COT-7729',
    cropId: 'LOT-KB-9042',
    nameGu: 'સૌરાષ્ટ્ર શંકર-૬ કપાસ',
    nameEn: 'Saurashtra Shankar-6 Cotton',
    commodity: 'cotton',
    farmerGu: 'રમેશભાઈ પટેલ',
    locationGu: 'જેતપુર (રાજકોટ APMC અંતર્ગત)',
    volumeGu: '૩૫૦ ક્વિન્ટલ (આશરે ૧,૭૫૦ મણ)',
    currentPrice: 1720,
    oldPrice: 1740,
    priceDrop: -20,
    totalValLakh: '₹૩૦.૧૦ લાખ',
    statusTag: 'ભાવ ઘટાડો: -₹૨૦/મણ (PRICE SLASHED)',
    statusType: 'drop',
    quickInfo: 'તુરંત ડિલિવરી રેડી • સ્ટેપલ લંબાઈ: ૨૯.૫ mm',
    verified: true,
    phone: '+91 98254 78210',
    dateAdded: '૧૫ ફેબ્રુઆરી ૨૦૨૫',
  },
  {
    id: 'GND-4081',
    cropId: 'GND-4081',
    nameGu: 'જી-૨૦ મગફળી બોલ્ડ (G-20 Bold Peanuts)',
    nameEn: 'G-20 Bold Peanuts',
    commodity: 'groundnut',
    farmerGu: 'કાનજીભાઈ આહિર',
    locationGu: 'ગોંડલ (ગોંડલ માર્કેટ યાર્ડ)',
    volumeGu: '૨૫૦ ક્વિન્ટલ (૧,૨૫૦ મણ)',
    currentPrice: 1350,
    oldPrice: 1350,
    priceDrop: 0,
    totalValLakh: '₹૧૭.૦૦ લાખ',
    statusTag: '૧ ઑફર અંડર નેગોશિએશન',
    statusType: 'negotiation',
    quickInfo: 'ઓઇલ કન્ટેન્ટ: ૪૮% • યાર્ડ ડિલિવરી',
    verified: true,
    phone: '+91 98254 66789',
    dateAdded: '૧૪ ફેબ્રુઆરી ૨૦૨૫',
  },
  {
    id: 'UNJ-9124',
    cropId: 'UNJ-9124',
    nameGu: 'ઊંઝા દેશી જીરૂ (Unjha Desi Cumin Seed)',
    nameEn: 'Unjha Desi Cumin Seed',
    commodity: 'cumin',
    farmerGu: 'મહેશભાઈ પટેલ',
    locationGu: 'ઊંઝા (મહેસાણા)',
    volumeGu: '૧૨૦ ગુણી (૬૦ ક્વિન્ટલ / ૩૦૦ મણ)',
    currentPrice: 5450,
    oldPrice: 5385,
    priceDrop: +65,
    totalValLakh: '₹૨૬.૩૫ લાખ',
    statusTag: 'સ્ટોક સક્રિય • ૯૯.૫% મશીન ક્લીન',
    statusType: 'active',
    quickInfo: 'લેબ ટેસ્ટિંગ રિપોર્ટ ઉપલબ્ધ',
    verified: true,
    phone: '+91 98254 33211',
    dateAdded: '૧૩ ફેબ્રુઆરી ૨૦૨૫',
  },
  {
    id: 'WHT-5501',
    cropId: 'WHT-5501',
    nameGu: 'દેશી ટુકડા ઘઉં (Desi Tukda Wheat)',
    nameEn: 'Desi Tukda Wheat',
    commodity: 'wheat',
    farmerGu: 'શામજીભાઈ ભરવાડ',
    locationGu: 'ધંધૂકા (અમદાવાદ જિલ્લો)',
    volumeGu: '૪૦૦ બોરી (૨૦૦ ક્વિન્ટલ)',
    currentPrice: 585,
    oldPrice: 585,
    priceDrop: 0,
    totalValLakh: '₹૫.૮૫ લાખ',
    statusTag: 'વેચાઈ ગયો (Sold Out)',
    statusType: 'sold',
    quickInfo: 'આજે સવારે ૧૧:૩૦ કલાકે સોદો પૂર્ણ',
    verified: true,
    phone: '+91 98254 00112',
    dateAdded: '૧૦ ફેબ્રુઆરી ૨૦૨૫',
  },
  {
    id: 'SES-3190',
    cropId: 'SES-3190',
    nameGu: 'કાળા તલ એક્સપોર્ટ ગ્રેડ (Black Sesame Export Grade)',
    nameEn: 'Black Sesame Export Grade',
    commodity: 'other',
    farmerGu: 'બાલુભાઈ કોળી',
    locationGu: 'ભાવનગર (તળાજા માર્કેટ યાર્ડ)',
    volumeGu: '૮૦ ક્વિન્ટલ (૪૦૦ મણ)',
    currentPrice: 2950,
    oldPrice: 2950,
    priceDrop: 0,
    totalValLakh: '₹૧૧.૮૦ લાખ',
    statusTag: 'સ્ટોક સક્રિય • ઝેડ-બ્લેક',
    statusType: 'active',
    quickInfo: 'શુદ્ધતા: ૯૯.૮% સોર્ટેક્સ ક્લીન',
    verified: true,
    phone: '+91 98254 99887',
    dateAdded: '૧૧ ફેબ્રુઆરી ૨૦૨૫',
  },
];

// --- INITIAL DEALS & NEGOTIATIONS ---
export const INITIAL_DEALS = [
  {
    id: 'APMC-AGR-8812',
    cropId: 'LOT-KB-9042',
    lotId: '#KBN-8842',
    cropGu: 'સૌરાષ્ટ્ર શંકર-૬ કપાસ',
    cropEn: 'Saurashtra Shankar-6 Cotton',
    commodity: 'cotton',
    grade: 'Grade A (ઉત્તમ)',
    volumeQtl: 350,
    volumeMan: 1750,
    agreedPriceMan: 1720,
    marketRateMan: 1690,
    totalDealValue: 3010000,
    totalValueWordsGu: 'ત્રીસ લાખ દસ હજાર પૂરા',
    farmer: {
      name: 'રમેશભાઈ કાનજીભાઈ પટેલ',
      nameEn: 'Rameshbhai Kanjibhai Patel',
      village: 'નવાગઢ (જેતપુર-ધોરાજી હાઇવે, રાજકોટ)',
      district: 'રાજકોટ',
      rating: '૪.૯ ★ (૪૮ સોદા)',
      phone: '+91 98254 78210',
      landVerified: '૭/૧૨ & ૮-અ વેરિફાઇડ ખેડૂત',
      avatar: 'ર',
    },
    trader: {
      company: 'શ્રી જીનિંગ એન્ડ પ્રોસેસિંગ ઇન્ડસ્ટ્રીઝ (Shree Ginning)',
      proprietor: 'હસમુખભાઈ પટેલ / ગણેશ ટ્રેડિંગ કુ.',
      license: '#RJT-421',
      mandis: 'રાજકોટ & ગોંડલ યાર્ડ માન્ય',
    },
    status: 'accepted', // accepted, counter, pending, completed
    statusGu: 'સ્વીકારેલ (Accepted)',
    badgeType: 'green',
    locked: true,
    deliveryTermsGu: 'ખેડૂતના ગોડાઉનથી સીધો ઉપાડ (જેતપુર-ધોરાજી હાઇવે, રાજકોટ). વાહન ભાડું: વેપારી પક્ષે.',
    weighmentCenter: 'શ્રી ખોડિયાર ધર્મકાંટો (તોલમાપ કેન્દ્ર) જેતપુર બાયપાસ, સર્વે નં. ૪૪',
    milestones: [
      { step: 1, label: 'ભાવ સંમતિ', time: '૧૦:૧૦ AM', done: true },
      { step: 2, label: 'ડીલ કન્ફર્મ (ઈ-સહી થયેલ)', time: '૧૦:૩૪ AM', done: true },
      { step: 3, label: 'વાહન રવાના & તોલમાપ', time: 'આવતીકાલે સવારે ૦૯:૦૦', done: false, active: true },
      { step: 4, label: 'RTGS ચૂકવણી', time: 'તોલ બાદ ત્વરિત', done: false },
    ],
    weighSlipUploaded: false,
    weighSlipUrl: null,
    rtgsProcessed: false,
    contractSigned: true,
    lastUpdate: 'આજે ૧૧:૧૫ AM',
  },
  {
    id: 'APMC-AGR-8813',
    cropId: 'UNJ-9124',
    lotId: '#UNJ-7720',
    cropGu: 'દેશી જીરૂ સ્પેશિયલ (૧૨૦ બોરી - આશરે ૨૪૦ મણ)',
    cropEn: 'Special Desi Cumin Seeds',
    commodity: 'cumin',
    grade: 'Grade A+ (યુરોપ ક્વોલિટી - ૯૯.૫% પ્યોરિટી)',
    volumeQtl: 120,
    volumeMan: 240,
    volumeBags: 120,
    farmerAskMan: 5450,
    traderBidMan: 5350,
    farmerCounterMan: 5420,
    totalDealValue: 1300800,
    farmer: {
      name: 'કાનજીભાઈ ચૌધરી',
      nameEn: 'Kanjibhai Chaudhari',
      village: 'ઊંઝા',
      district: 'મહેસાણા',
      rating: '૪.૮ ★ (૩૪ સોદા)',
      phone: '+91 98254 33211',
      landVerified: '૭/૧૨ પ્રમાણિત ખેડૂત',
      avatar: 'કા',
    },
    status: 'counter',
    statusGu: 'ખેડૂત કાઉન્ટર (Counter Offer)',
    badgeType: 'orange',
    counterDiff: '+₹૭૦ નો તફાવત',
    expiryTime: 'આજે સાંજે ૦૫:૦૦ વાગ્યા સુધી',
    lastUpdate: 'ગઈકાલે સાંજે ૦૬:૨૦',
  },
  {
    id: 'APMC-AGR-8814',
    cropId: 'GND-4081',
    lotId: '#JAM-5510',
    cropGu: 'જામનગરી G-20 મગફળી (૫૦૦ ક્વિન્ટલ - મોટા દાણા)',
    cropEn: 'Jamnagari G-20 Groundnut Bold',
    commodity: 'groundnut',
    grade: 'Grade A બોલ્ડ',
    volumeQtl: 500,
    volumeMan: 2500,
    farmerAskMan: 1390,
    traderBidMan: 1370,
    totalDealValue: 3425000,
    farmer: {
      name: 'મનસુખભાઈ વઘાસિયા',
      nameEn: 'Mansukhbhai Vaghasiya',
      village: 'કાલાવડ',
      district: 'જામનગર',
      rating: '૪.૭ ★ (૧૯ સોદા)',
      phone: '+91 98254 66789',
      landVerified: '૭/૧૨ વેરિફાઇડ ખેડૂત',
      avatar: 'મ',
    },
    status: 'pending',
    statusGu: 'ઓફર પેન્ડિંગ (Pending Response)',
    badgeType: 'blue',
    submittedAt: 'ગઈકાલે સાંજે ૫:૩૦ કલાકે',
    dispatchPoint: 'ગોંડલ વેરહાઉસ નં. ૪',
    lastUpdate: '૧૨ ઓગસ્ટ',
  },
  {
    id: 'APMC-AGR-8815',
    cropId: 'TUVER-112',
    lotId: '#JAM-2219',
    cropGu: 'તુવેર દેશી (Tuver Dal Stock)',
    cropEn: 'Tuver Dal',
    commodity: 'other',
    grade: 'Grade A',
    volumeQtl: 200,
    volumeMan: 1000,
    agreedPriceMan: 1850,
    totalDealValue: 1850000,
    farmer: {
      name: 'ભરતભાઈ આહિર',
      nameEn: 'Bharatbhai Aahir',
      village: 'ધ્રોલ',
      district: 'જામનગર',
      rating: '૪.૯ ★ (૩૧ સોદા)',
      phone: '+91 98254 44556',
      avatar: 'ભ',
    },
    status: 'completed',
    statusGu: 'સોદો સંપન્ન (Completed)',
    badgeType: 'gray',
    lastUpdate: '૧૦ ઓગસ્ટ',
  },
];

// --- INITIAL MESSAGES FOR DEAL ROOM ---
export const INITIAL_CHAT_MESSAGES = {
  'APMC-AGR-8812': [
    {
      id: 'm1',
      sender: 'farmer',
      senderName: 'રમેશભાઈ પટેલ',
      time: '10:12 AM',
      date: 'આજે, ૧૨ ઓગસ્ટ ૨૦૨૫',
      text: 'નમસ્તે શેઠ, મારી પાસે શંકર-૬ કપાસનો ૩૫૦ ક્વિન્ટલનો ચોખ્ખો લોટ તૈયાર છે. ગોડાઉનમાં ભેજ ૮% થી ઓછો છે. અમારો ભાવ ₹૧,૭૫૦/મણ રહેશે.',
    },
    {
      id: 'm2',
      sender: 'trader',
      senderName: 'ગણેશ ટ્રેડિંગ (તમે)',
      time: '10:20 AM',
      text: 'રામ રામ રમેશભાઈ. રાજકોટ માર્કેટમાં આજે ઊંચો ભાવ ₹૧,૭૦૦ છે. અમે રોકડેથી માલ ઉપાડીશું અને વાહન પણ મોકલીએ છીએ. આપણને ₹૧,૭૧૦ માં મેળ પડે તો બોલો.',
      offerBadge: '📋 કાઉન્ટર ઓફર મોકલી: ₹૧,૭૧૦ / મણ',
    },
    {
      id: 'm3',
      sender: 'farmer',
      senderName: 'રમેશભાઈ પટેલ',
      time: '10:28 AM',
      text: 'શેઠ, માલની ગુણવત્તા એક નંબર છે. આ જુઓ આજ સવારનો લેબ મોઇશ્ચર (ભેજ) ટેસ્ટ રિપોર્ટ અને કપાસના ઢગલાનો ફોટો. ₹૧,૭૨૦ કરી આપો તો સોદો પાકો કરીએ.',
      attachments: [
        {
          type: 'image',
          label: 'મોઇશ્ચર રીડિંગ: ૭.૮% (ઉત્તમ ગ્રેડ)',
          fileName: 'cotton_quality_test_12aug.jpg',
          imgUrl: '/crops/cotton.jpg',
        },
        {
          type: 'map',
          centerName: 'શ્રી ખોડિયાર ધર્મકાંટો (તોલમાપ કેન્દ્ર)',
          sub: 'જેતપુર બાયપાસ, સર્વે નં. ૪૪',
          actionText: 'નકશો',
        },
      ],
    },
    {
      id: 'm4',
      sender: 'trader',
      senderName: 'ગણેશ ટ્રેડિંગ (તમે)',
      time: '10:34 AM',
      text: 'મંજૂર છે રમેશભાઈ! લેબ રિપોર્ટ ઉત્તમ છે, ₹૧,૭૨૦ ના ભાવે ૩૫૦ ક્વિન્ટલનો સોદો કન્ફર્મ કરીએ છીએ. ડિજિટલ ખરીદ કરાર અહીં સિસ્ટમમાં જનરેટ થઈ ગયો છે.',
      digitalSign: '✅ વેપારી ડિજિટલ સહી મંજૂર થયેલ (Digital Signed by Ganesh Trading)',
    },
  ],
};

// --- INITIAL ACTIVE DEMANDS ---
export const INITIAL_DEMANDS = [
  {
    id: 'DEM-9901',
    cropGu: 'શંકર-૬ કપાસ (બલ્ક)',
    cropEn: 'Shankar-6 Cotton (Bulk)',
    commodity: 'cotton',
    variety: 'Shankar-6 Hybrid',
    grade: 'Grade A (સુપર વ્હાઇટ)',
    qtyQtl: 1000,
    minLotQtl: 100,
    targetPriceMinMan: 1700,
    targetPriceMaxMan: 1750,
    targetPriceDisplay: '₹૧,૭૦૦ - ₹૧,૭૫૦/મણ',
    districts: ['રાજકોટ', 'ગોંડલ ડિલિવરી'],
    districtCount: 2060,
    logistics: 'ગોંડલ મિલ/ગોડાઉન પર ડિલિવરી (Mill Delivery)',
    paymentTerm: 'ડિજિટલ કાંટા વજન બાદ ૨૪ કલાકમાં RTGS',
    validityDays: 5,
    daysLeft: 2,
    status: 'Active',
    statusGu: 'સક્રિય / ACTIVE',
    responsesCount: 4,
    responsesNote: '૪ ખેડૂતોએ અરજી કરી',
    urgent: true,
  },
  {
    id: 'DEM-9902',
    cropGu: 'G-20 મગફળી (સુપર ક્વોલિટી)',
    cropEn: 'G-20 Groundnut Bold',
    commodity: 'groundnut',
    variety: 'G-20 Bold',
    grade: 'Grade A (બોલ્ડ ૪૦-૫૦ કાઉન્ટ)',
    qtyQtl: 800,
    minLotQtl: 50,
    targetPriceMinMan: 1350,
    targetPriceMaxMan: 1380,
    targetPriceDisplay: '₹૧,૩૫૦ - ₹૧,૩૮૦/મણ',
    districts: ['જામનગર', 'જૂનાગઢ બેલ્ટ'],
    districtCount: 1680,
    logistics: 'ખેતરેથી સીધો ઉપાડ (Farm Gate Pickup)',
    paymentTerm: 'કાંટા રસીદ બાદ એસ્ક્રો દ્વારા તુરંત',
    validityDays: 7,
    daysLeft: 4,
    status: 'Active',
    statusGu: 'સક્રિય / ACTIVE',
    responsesCount: 7,
    responsesNote: '૭ ખેડૂતોએ અરજી કરી',
    urgent: false,
  },
  {
    id: 'DEM-9903',
    cropGu: 'જીરૂ (Cumin Seed - Unjha)',
    cropEn: 'Unjha Cumin Seeds',
    commodity: 'cumin',
    variety: 'Machine Clean 99%',
    grade: 'Export Quality',
    qtyQtl: 200,
    minLotQtl: 20,
    targetPriceMinMan: 5500,
    targetPriceMaxMan: 5500,
    targetPriceDisplay: 'ભાવ: ₹૫,૫૦૦/મણ',
    districts: ['ઊંઝા', 'મહેસાણા'],
    districtCount: 950,
    logistics: 'ઊંઝા યાર્ડ ગોડાઉન ડિલિવરી',
    paymentTerm: '૨૪ કલાકમાં RTGS',
    validityDays: 3,
    daysLeft: 3,
    status: 'Active',
    statusGu: 'સક્રિય / ACTIVE',
    responsesCount: 5,
    responsesNote: '૫ ખેડૂતો સંપર્કમાં (Farmers Connected)',
    urgent: false,
  },
];

// --- INITIAL TRADER PROFILE ---
export const INITIAL_TRADER_PROFILE = {
  companyNameGu: 'શ્રી જીનિંગ એન્ડ પ્રોસેસિંગ ઇન્ડસ્ટ્રીઝ',
  companyNameEn: 'Shree Ginning & Processing Industries',
  proprietor: 'હસમુખભાઈ પુનીતભાઈ પટેલ',
  tagline: 'ગુજરાત સરકાર APMC માન્ય લાયસન્સ ધારક (#RJT-421) - ગોંડલ કિંગ્સ વેપારી',
  gstin: '24AAACS1234F1Z8',
  gstinStatus: 'સક્રિય',
  address: 'ગોંડલ માર્કેટ યાર્ડ સામે, જેતપુર રોડ, ગોંડલ (રાજકોટ જિલ્લો) - ૩૬૦૩૧૧',
  panNo: 'AAACP****K',
  panVerified: true,
  gstinCert: 'Form REG-06 (Verified)',
  businessConstitution: 'પ્રાઇવેટ લિમિટેડ / પાર્ટનરશીપ પેઢી',
  licensedMandis: 'ગોંડલ યાર્ડ અને રાજકોટ યાર્ડ (Multi-mandi licensed)',
  apmcValidity: '૩૧ માર્ચ ૨૦૨૭ સુધી માન્ય (Valid through 31-03-2027) • ૨ વર્ષ શેષ',
  commodities: ['કપાસ (Cotton)', 'મગફળી (Groundnut)', 'જીરૂ (Cumin)'],
  infrastructure: {
    weighbridge50T: true,
    moistureLab: true,
    restLounge: true,
  },
  dailyCapacityQtl: 1500,
  dailyCapacityTag: 'હાઇ-વોલ્યુમ વેપારી',
  bank: {
    name: 'HDFC Bank - ગોંડલ શાખા',
    accountMasked: '************૬૧૮૨',
    ifsc: 'HDFC0000421',
    status: 'વેરિફાઇડ કરંટ ખાતું',
  },
  escrowBalance: 2500000,
  escrowBalanceText: '₹૨૫,૦૦,૦૦૦',
  alerts: {
    whatsappInstant: true,
    smsOnAccept: true,
    primaryPhone: '+૯૧ ૯૮૨૫૦ *****',
    fullPhone: '+91 98254 99999',
  },
};

// ============================================================
// LocalStorage Persistence Helpers
// ============================================================

function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error loading ${key} from localStorage:`, err);
    return fallback;
  }
}

function saveData(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

// ============================================================
// Service Export Methods
// ============================================================

export const traderService = {
  // --- Crops ---
  getCrops: () => loadData(STORAGE_KEYS.CROPS, INITIAL_CROPS),
  getCropById: (id) => {
    const crops = loadData(STORAGE_KEYS.CROPS, INITIAL_CROPS);
    return crops.find((c) => c.id === id) || crops[0];
  },

  // --- Watchlist ---
  getWatchlist: () => loadData(STORAGE_KEYS.WATCHLIST, INITIAL_WATCHLIST),
  addToWatchlist: (crop) => {
    const list = loadData(STORAGE_KEYS.WATCHLIST, INITIAL_WATCHLIST);
    const existing = list.find((item) => item.cropId === crop.id || item.id === crop.id);
    if (existing) return list;

    const newItem = {
      id: crop.id || `WATCH-${Date.now()}`,
      cropId: crop.id,
      nameGu: crop.nameGu,
      nameEn: crop.nameEn,
      commodity: crop.commodity || 'cotton',
      farmerGu: crop.farmer?.name || 'ખેડૂત મિત્ર',
      locationGu: `${crop.farmer?.taluka || ''} (${crop.farmer?.district || ''})`,
      volumeGu: `${crop.volumeQtl || 100} ક્વિન્ટલ (${crop.volumeMan || 500} મણ)`,
      currentPrice: crop.farmerAskMan || 1720,
      oldPrice: crop.oldPrice || crop.farmerAskMan || 1720,
      priceDrop: crop.priceChange || 0,
      totalValLakh: `₹${(((crop.volumeMan || 500) * (crop.farmerAskMan || 1720)) / 100000).toFixed(2)} લાખ`,
      statusTag: crop.grade || 'સ્ટોક સક્રિય',
      statusType: 'active',
      quickInfo: 'તાજો ઉમેરેલ પાક',
      verified: true,
      phone: crop.farmer?.phone || '+91 98254 XXXXX',
      dateAdded: 'આજે',
    };

    const updated = [newItem, ...list];
    saveData(STORAGE_KEYS.WATCHLIST, updated);
    return updated;
  },
  removeFromWatchlist: (id) => {
    const list = loadData(STORAGE_KEYS.WATCHLIST, INITIAL_WATCHLIST);
    const updated = list.filter((item) => item.id !== id && item.cropId !== id);
    saveData(STORAGE_KEYS.WATCHLIST, updated);
    return updated;
  },
  isInWatchlist: (cropId) => {
    const list = loadData(STORAGE_KEYS.WATCHLIST, INITIAL_WATCHLIST);
    return list.some((item) => item.cropId === cropId || item.id === cropId);
  },

  // --- Deals & Negotiations ---
  getDeals: () => loadData(STORAGE_KEYS.DEALS, INITIAL_DEALS),
  getDealById: (id) => {
    const deals = loadData(STORAGE_KEYS.DEALS, INITIAL_DEALS);
    return deals.find((d) => d.id === id) || deals[0];
  },
  createDealOffer: (offerData) => {
    const deals = loadData(STORAGE_KEYS.DEALS, INITIAL_DEALS);
    const newDeal = {
      id: `APMC-AGR-${Date.now().toString().slice(-4)}`,
      cropId: offerData.cropId || 'LOT-KB-9042',
      lotId: offerData.lotId || '#LOT-KB-9042',
      cropGu: offerData.cropGu || 'સૌરાષ્ટ્ર શંકર-૬ સુપર કપાસ',
      cropEn: offerData.cropEn || 'Shankar-6 Cotton',
      commodity: offerData.commodity || 'cotton',
      grade: offerData.grade || 'Grade A (ઉત્તમ)',
      volumeQtl: Number(offerData.volumeQtl) || 350,
      volumeMan: Number(offerData.volumeQtl) * 5 || 1750,
      agreedPriceMan: Number(offerData.offerPriceMan) || 1700,
      farmerAskMan: Number(offerData.farmerAskMan) || 1720,
      totalDealValue: (Number(offerData.volumeQtl) * 5) * (Number(offerData.offerPriceMan) || 1700),
      deliveryTermsGu: offerData.deliveryTerms === 'farm_gate'
        ? 'ખેતરેથી સીધો ઉપાડ (Farm Gate Pickup)'
        : 'જીનિંગ મિલ પર પહોંચ (Mill Gate Delivery)',
      expectedDeliveryDate: offerData.expectedDeliveryDate || '16-02-2025',
      paymentCondition: 'ડિજિટલ વજન સ્લિપ બાદ ૨૪ કલાકમાં RTGS બેંક ટ્રાન્સફર',
      status: 'pending',
      statusGu: 'ઓફર મોકલેલ (Offer Sent)',
      badgeType: 'blue',
      farmer: offerData.farmer || {
        name: 'રમેશભાઈ કાનજીભાઈ પટેલ',
        district: 'રાજકોટ',
        phone: '+91 98254 78210',
        avatar: 'ર',
      },
      milestones: [
        { step: 1, label: 'ભાવ પ્રસ્તાવ સબમિટ', time: 'હમણાં', done: true },
        { step: 2, label: 'ખેડૂત સમીક્ષા & સ્વીકૃતિ', time: 'પ્રતીક્ષામાં', done: false, active: true },
        { step: 3, label: 'વાહન રવાના & તોલમાપ', time: '-', done: false },
        { step: 4, label: 'RTGS ચૂકવણી', time: '-', done: false },
      ],
      lastUpdate: 'હમણાં',
    };
    const updated = [newDeal, ...deals];
    saveData(STORAGE_KEYS.DEALS, updated);
    return newDeal;
  },
  updateDealStatus: (dealId, updates) => {
    const deals = loadData(STORAGE_KEYS.DEALS, INITIAL_DEALS);
    const updated = deals.map((d) => (d.id === dealId ? { ...d, ...updates } : d));
    saveData(STORAGE_KEYS.DEALS, updated);
    return updated.find((d) => d.id === dealId);
  },

  // --- Messages & Chat ---
  getChatMessages: (dealId = 'APMC-AGR-8812') => {
    const all = loadData(STORAGE_KEYS.MESSAGES, INITIAL_CHAT_MESSAGES);
    return all[dealId] || INITIAL_CHAT_MESSAGES['APMC-AGR-8812'] || [];
  },
  sendChatMessage: (dealId = 'APMC-AGR-8812', text, extra = {}) => {
    const all = loadData(STORAGE_KEYS.MESSAGES, INITIAL_CHAT_MESSAGES);
    const currentList = all[dealId] || INITIAL_CHAT_MESSAGES['APMC-AGR-8812'] || [];
    const newMsg = {
      id: `m_${Date.now()}`,
      sender: 'trader',
      senderName: 'ગણેશ ટ્રેડિંગ (તમે)',
      time: new Date().toLocaleTimeString('gu-IN', { hour: '2-digit', minute: '2-digit' }),
      text,
      ...extra,
    };
    const updatedList = [...currentList, newMsg];
    all[dealId] = updatedList;
    saveData(STORAGE_KEYS.MESSAGES, all);
    return updatedList;
  },

  // --- Demands ---
  getDemands: () => loadData(STORAGE_KEYS.DEMANDS, INITIAL_DEMANDS),
  createDemand: (demandData) => {
    const demands = loadData(STORAGE_KEYS.DEMANDS, INITIAL_DEMANDS);
    const newDemand = {
      id: `DEM-${Date.now().toString().slice(-4)}`,
      cropGu: demandData.cropGu || 'નવો પાક',
      cropEn: demandData.cropEn || 'New Crop',
      commodity: demandData.commodity || 'cotton',
      variety: demandData.variety || 'Grade A',
      grade: demandData.grade || 'Grade A',
      qtyQtl: Number(demandData.qtyQtl) || 500,
      minLotQtl: Number(demandData.minLotQtl) || 20,
      targetPriceMinMan: Number(demandData.targetPrice) || 1400,
      targetPriceMaxMan: Number(demandData.targetPrice) || 1400,
      targetPriceDisplay: `ભાવ: ₹${demandData.targetPrice || 1400}/મણ`,
      districts: demandData.districts || ['રાજકોટ', 'જૂનાગઢ'],
      districtCount: demandData.districtCount || 2060,
      logistics: demandData.logistics || 'ગોંડલ મિલ/ગોડાઉન પર ડિલિવરી (Mill Delivery)',
      paymentTerm: demandData.paymentTerm || 'ડિજિટલ કાંટા વજન બાદ ૨૪ કલાકમાં RTGS',
      validityDays: Number(demandData.validityDays) || 5,
      daysLeft: Number(demandData.validityDays) || 5,
      status: 'Active',
      statusGu: 'સક્રિય / ACTIVE',
      responsesCount: 0,
      responsesNote: 'નવી મૂકેલ માંગણી (બ્રોડકાસ્ટ સક્રિય)',
      urgent: demandData.urgent || false,
    };
    const updated = [newDemand, ...demands];
    saveData(STORAGE_KEYS.DEMANDS, updated);
    return newDemand;
  },
  deleteDemand: (id) => {
    const demands = loadData(STORAGE_KEYS.DEMANDS, INITIAL_DEMANDS);
    const updated = demands.filter((d) => d.id !== id);
    saveData(STORAGE_KEYS.DEMANDS, updated);
    return updated;
  },

  // --- Profile ---
  getProfile: () => loadData(STORAGE_KEYS.PROFILE, INITIAL_TRADER_PROFILE),
  updateProfile: (updates) => {
    const current = loadData(STORAGE_KEYS.PROFILE, INITIAL_TRADER_PROFILE);
    const updated = { ...current, ...updates };
    saveData(STORAGE_KEYS.PROFILE, updated);
    return updated;
  },
};

export default traderService;
