import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import toast from 'react-hot-toast';
import './FarmerMessagesPage.css';

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv_1',
    traderGu: 'શ્રી જીનિંગ ઇન્ડસ્ટ્રીઝ',
    traderEn: 'Shreeji Ginning Industries',
    subGu: 'રાજકોટ • હસમુખભાઈ વેપારી',
    cropGu: 'સૌરાષ્ટ્ર શંકર-૬ કપાસ (૩૫૦ ક્વિ.)',
    time: '10:22 AM',
    badgeText: 'નવી ઑફર ₹૧,૭૨૦',
    badgeType: 'orange',
    previewGu: 'વેપારી: ₹૧,૭૨૦ ભાવે સોદો કરીએ તો આજે જ ગાડી મોકલીએ.',
    avatar: 'જી',
    rating: '૪.૯ ★ (૧૪૨ સફળ સોદા)',
    phone: '+91 98254 78210',
    proposal: {
      id: '#PROP-8812',
      crop: 'સૌરાષ્ટ્ર શંકર-૬ કપાસ ૩૫૦ ક્વિન્ટલ (૧,૭૫૦ મણ)',
      farmerAsk: '₹૧,૭૪૦ / મણ',
      traderBid: '₹૧,૭૨૦ / મણ',
      totalVal: '₹૩૦,૧૦,૦૦૦',
      token: '૧૦% એડવાન્સ ટોકન સામેલ',
      delivery: 'ખેતરેથી ઉપાડ (Farm Gate)',
      weighment: 'ગોંડલ યાર્ડ સરકારી કાંટો',
      status: 'pending', // pending, accepted, rejected, countered
    },
    messages: [
      { id: 1, sender: 'trader', name: 'હસમુખભાઈ (શ્રી જીનિંગ)', time: '10:15 AM', text: 'જય શ્રી કૃષ્ણ રમેશભાઈ, તમારા કપાસના ફોટા અને લેબ રિપોર્ટ જોયા. ક્વોલિટી સરસ છે.' },
      { id: 2, sender: 'farmer', name: 'તમે (ખેડૂત)', time: '10:18 AM', text: 'નમસ્તે હસમુખભાઈ, માલ એકદમ સૂકો અને ૨૯mm સ્ટેપલ લંબાઈ છે.' },
      { id: 3, sender: 'trader', name: 'હસમુખભાઈ (શ્રી જીનિંગ)', time: '10:22 AM', text: 'અમે ૨૦૦ થી ૩૫૦ ક્વિન્ટલ આખો લોટ લેવા તૈયાર છીએ. ₹૧,૭૨૦ ભાવે સોદો કરીએ તો આજે જ ગાડી મોકલીએ.' },
      { id: 4, sender: 'system', text: '📋 વેપારીએ ₹૧,૭૨૦ નો ડીલ પ્રસ્તાવ મૂક્યો છે.', time: '10:23 AM' },
    ],
  },
  {
    id: 'conv_2',
    traderGu: 'કિસાન ટ્રેડિંગ કંપની',
    traderEn: 'Kishan Trading Company',
    subGu: 'ઊંઝા • કનુભાઈ પટેલ',
    cropGu: 'જીરૂ મશીન ક્લીન (૫૦ બોરી)',
    time: 'ગઈકાલે',
    badgeText: '✓ ડીલ સ્વીકારાઈ',
    badgeType: 'green',
    previewGu: 'ભાવ ₹૫,૧૫૦/મણ પર સોદો મંજૂર થયો છે. ટોકન જમા.',
    avatar: 'કિ',
    rating: '૪.૮ ★ (૬૮ સોદા)',
    phone: '+91 98254 22334',
    proposal: null,
    messages: [
      { id: 1, sender: 'trader', name: 'કનુભાઈ', time: 'ગઈકાલે ૧૧:૦૦ AM', text: 'નમસ્તે રમેશભાઈ, જીરૂની ગુણવત્તા ઉત્તમ છે.' },
      { id: 2, sender: 'farmer', name: 'તમે', time: 'ગઈકાલે ૧૧:૧૦ AM', text: 'હા કનુભાઈ, પૂરો સર્ટિફાઇડ માલ છે.' },
      { id: 3, sender: 'system', text: '✓ ડીલ સ્વીકારાઈ: ₹૫,૧૫૦/મણ (૫૦ બોરી). ટોકન ₹૧,૦૦,૦૦૦ જમા થયેલ છે.', time: 'ગઈકાલે ૦૨:૩૦ PM' },
    ],
  },
  {
    id: 'conv_3',
    traderGu: 'પટેલ એગ્રો મિલ',
    traderEn: 'Patel Agro Mill',
    subGu: 'અમદાવાદ • પરેશભાઈ શાહ',
    cropGu: 'ટુકડા પ્રીમિયમ ઘઉં (૧૨૦ બોરી)',
    time: '૧૨ એપ્રિલ',
    badgeText: 'ચેટ ચાલુ',
    badgeType: 'gray',
    previewGu: 'તમે: અમે કાલ સાંજ સુધીમાં સેમ્પલ મોકલી આપીશું.',
    avatar: 'પ',
    rating: '૪.૭ ★ (૨૧૦ સોદા)',
    phone: '+91 98254 33445',
    proposal: null,
    messages: [
      { id: 1, sender: 'trader', name: 'પરેશભાઈ શાહ', time: '૧૨ એપ્રિલ', text: 'શું ઘઉંનો સેમ્પલ અમદાવાદ ઓફિસ મોકલી શકશો?' },
      { id: 2, sender: 'farmer', name: 'તમે', time: '૧૨ એપ્રિલ', text: 'હા, અમે કાલ સાંજ સુધીમાં સેમ્પલ મોકલી આપીશું.' },
    ],
  },
];

const FarmerMessagesPage = () => {
  const { lang } = useLanguage();

  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('conv_1');
  const [activeFilter, setActiveFilter] = useState('all'); // all, new_offer, accepted, closed
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'farmer',
      name: lang === 'gu' ? 'તમે (ખેડૂત)' : 'You (Farmer)',
      time: 'Just now',
      text: inputText.trim(),
    };

    setConversations(prev =>
      prev.map(c =>
        c.id === activeConvId
          ? { ...c, messages: [...c.messages, newMsg], previewGu: `તમે: ${inputText.trim()}` }
          : c
      )
    );
    setInputText('');
  };

  const handleAcceptProposal = () => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === activeConvId && c.proposal) {
          return {
            ...c,
            badgeText: '✓ ડીલ સ્વીકારાઈ',
            badgeType: 'green',
            proposal: { ...c.proposal, status: 'accepted' },
            messages: [
              ...c.messages,
              {
                id: Date.now(),
                sender: 'system',
                text: `🎉 રમેશભાઈએ ₹૧,૭૨૦/મણ ની ઓફર સ્વીકારી છે! APMC લીગલ કોન્ટ્રાક્ટ જનરેટ થયો છે. કાલે સવારે ગાડી ખેતરે પહોંચશે.`,
                time: 'Just now',
              },
            ],
          };
        }
        return c;
      })
    );
    toast.success(lang === 'gu' ? 'ઑફર સ્વીકારાઈ! APMC ડિજિટલ કોન્ટ્રાક્ટ જનરેટ થયો. 🎉' : 'Offer accepted! Legal APMC Contract created.');
  };

  const handleRejectProposal = () => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === activeConvId && c.proposal) {
          return {
            ...c,
            proposal: { ...c.proposal, status: 'rejected' },
            messages: [
              ...c.messages,
              { id: Date.now(), sender: 'system', text: '✕ આ ઑફર નામંજૂર કરવામાં આવી છે.', time: 'Just now' },
            ],
          };
        }
        return c;
      })
    );
    toast.error(lang === 'gu' ? 'ઑફર નામંજૂર કરવામાં આવી' : 'Offer rejected');
  };

  const handleCounterChip = (rate) => {
    setInputText(`અમને ${rate} ભાવે સોદો માન્ય છે. કૃપા કરીને પુષ્ટિ કરો.`);
  };

  const filteredConversations = conversations.filter(c => {
    if (activeFilter === 'new_offer' && c.badgeType !== 'orange') return false;
    if (activeFilter === 'accepted' && c.badgeType !== 'green') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return c.traderGu.toLowerCase().includes(q) || c.cropGu.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="farmer-messages-page">
      <div className="fm-container">

        {/* Top Header Bar */}
        <div className="fm-top-header">
          <div className="fm-th-left">
            <Link to="/farmer/dashboard" className="fm-back-btn">←</Link>
            <div>
              <div className="fm-th-title-row">
                <h1 className="fm-th-title">
                  {lang === 'gu' ? 'ડીલ રૂમ અને વાતચીત (Deal Room & Negotiation Center)' : 'Deal Room & Negotiation Center'}
                </h1>
                <span className="fm-active-deals-badge">{lang === 'gu' ? 'સક્રિય સોદા: ૦૩' : 'Active Deals: 03'}</span>
              </div>
              <p className="fm-th-sub">
                {lang === 'gu'
                  ? 'વેપારી સાથે સીધો ભાવ-તાલ, ઓર્ડર પુષ્ટિ અને એપીએમસી માન્ય કરાર સુરક્ષા.'
                  : 'Direct negotiation with verified mandi millers, legal purchase contracts & escrow guarantee.'}
              </p>
            </div>
          </div>

          <div className="fm-th-right">
            <span className="fm-secure-pill">
              🛡️ {lang === 'gu' ? '૧૦૦% ચૂકવણી સુરક્ષા: ડિલિવરી બાદ ૨૪ કલાકમાં બેંક ખાતામાં જમા' : '100% Payment Guarantee: Direct RTGS within 24h'}
            </span>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="fm-chat-layout">
          
          {/* LEFT SIDEBAR: Conversations List */}
          <div className="fm-sidebar">
            
            {/* Search Box */}
            <div className="fm-search-wrap">
              <input
                type="text"
                placeholder={lang === 'gu' ? 'વેપારી અથવા પાક શોધો...' : 'Search trader or crop...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="fm-search-input"
              />
              <button type="button" className="fm-mic-btn">🎙️</button>
            </div>

            {/* Filter Pills */}
            <div className="fm-filter-pills-row">
              <button
                type="button"
                className={`f-pill ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                {lang === 'gu' ? 'બધા (3)' : 'All (3)'}
              </button>
              <button
                type="button"
                className={`f-pill ${activeFilter === 'new_offer' ? 'active' : ''}`}
                onClick={() => setActiveFilter('new_offer')}
              >
                {lang === 'gu' ? 'નવી ઑફર (1)' : 'New Bid (1)'}
              </button>
              <button
                type="button"
                className={`f-pill ${activeFilter === 'accepted' ? 'active' : ''}`}
                onClick={() => setActiveFilter('accepted')}
              >
                {lang === 'gu' ? 'સ્વીકારેલ (1)' : 'Accepted'}
              </button>
            </div>

            {/* Conversation Threads List */}
            <div className="fm-threads-list">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  className={`fm-thread-item ${conv.id === activeConvId ? 'selected' : ''}`}
                  onClick={() => setActiveConvId(conv.id)}
                >
                  <div className="ti-avatar">{conv.avatar}</div>

                  <div className="ti-info">
                    <div className="ti-top">
                      <strong className="ti-name">{lang === 'gu' ? conv.traderGu : conv.traderEn}</strong>
                      <span className="ti-time">{conv.time}</span>
                    </div>

                    <span className="ti-sub">{conv.subGu}</span>
                    <span className="ti-crop">{conv.cropGu}</span>

                    <div className="ti-bottom">
                      <span className={`ti-badge ${conv.badgeType}`}>
                        {conv.badgeText}
                      </span>
                    </div>

                    <p className="ti-preview">{conv.previewGu}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT CHAT & NEGOTIATION PANEL */}
          <div className="fm-chat-panel">
            
            {/* Header of Active Thread */}
            <div className="fm-cp-header">
              <div className="cph-left">
                <div className="cph-avatar">{activeConv.avatar}</div>
                <div>
                  <div className="cph-name-row">
                    <strong className="cph-title">{lang === 'gu' ? activeConv.traderGu : activeConv.traderEn}</strong>
                    <span className="cph-verified-badge">🛡️ {lang === 'gu' ? 'ખરીદદાર પ્રમાણિત (Verified)' : 'Verified Buyer'}</span>
                  </div>
                  <span className="cph-sub-text">
                    {activeConv.subGu} • રેટિંગ: {activeConv.rating}
                  </span>
                </div>
              </div>

              <div className="cph-right">
                <a href={`tel:${activeConv.phone}`} className="cph-btn-call">
                  📞 {activeConv.phone}
                </a>
                <button type="button" className="cph-btn-menu">⋮</button>
              </div>
            </div>

            {/* STICKY DEAL PROPOSAL CARD (If active) */}
            {activeConv.proposal && activeConv.proposal.status !== 'rejected' && (
              <div className={`fm-proposal-card ${activeConv.proposal.status === 'accepted' ? 'accepted' : ''}`}>
                <div className="pr-top-strip">
                  <div className="pr-ts-left">
                    <span className="pr-icon">🤝</span>
                    <div>
                      <strong>
                        {lang === 'gu' ? `વેપારી દ્વારા મોકલેલ તાજી ઓફર ${activeConv.proposal.id}` : `Fresh Offer from Buyer ${activeConv.proposal.id}`}
                      </strong>
                      <span className="pr-sub-valid">
                        {lang === 'gu' ? 'આ ઓફર આગામી ૩ કલાક માટે માન્ય રહેશે (Valid for 3 hrs)' : 'Offer valid for next 3 hours'}
                      </span>
                    </div>
                  </div>

                  <span className={`pr-status-pill ${activeConv.proposal.status === 'accepted' ? 'accepted' : 'review'}`}>
                    {activeConv.proposal.status === 'accepted'
                      ? (lang === 'gu' ? '✓ ઓફર સ્વીકૃત • સોદો મંજૂર' : '✓ Deal Accepted')
                      : (lang === 'gu' ? 'ઓફર વિચારણા હેઠળ' : 'Under Review')}
                  </span>
                </div>

                {/* 4 Data Columns in Proposal */}
                <div className="pr-data-grid">
                  <div className="pr-d-col">
                    <span className="pr-lbl">{lang === 'gu' ? 'સંબંધિત પાક / જથ્થો:' : 'Crop & Quantity:'}</span>
                    <strong className="pr-val">{activeConv.proposal.crop}</strong>
                  </div>

                  <div className="pr-d-col">
                    <span className="pr-lbl">{lang === 'gu' ? 'તમે મુકેલ ભાવ:' : 'Your Asking Price:'}</span>
                    <span className="pr-ask">{activeConv.proposal.farmerAsk}</span>
                    <div className="pr-bid-highlight">
                      <span>{lang === 'gu' ? 'વેપારીની ઓફર:' : 'Buyer Bid:'}</span>
                      <strong>{activeConv.proposal.traderBid}</strong>
                    </div>
                  </div>

                  <div className="pr-d-col">
                    <span className="pr-lbl">{lang === 'gu' ? 'કુલ ડીલ રકમ (Total Amount):' : 'Total Deal Value:'}</span>
                    <strong className="pr-val-total">{activeConv.proposal.totalVal}</strong>
                    <span className="pr-token">{activeConv.proposal.token}</span>
                  </div>

                  <div className="pr-d-col">
                    <span className="pr-lbl">{lang === 'gu' ? 'ડિલિવરી શરત:' : 'Delivery Terms:'}</span>
                    <strong className="pr-val">{activeConv.proposal.delivery}</strong>
                    <span className="pr-weigh">{activeConv.proposal.weighment}</span>
                  </div>
                </div>

                {/* Proposal Decision Buttons */}
                {activeConv.proposal.status !== 'accepted' && (
                  <div className="pr-actions-row">
                    <button
                      type="button"
                      className="pr-btn-reject"
                      onClick={handleRejectProposal}
                    >
                      ✕ {lang === 'gu' ? 'ના મંજૂર કરો (Reject)' : 'Reject'}
                    </button>
                    <button
                      type="button"
                      className="pr-btn-counter"
                      onClick={() => handleCounterChip('₹૧,૭૩૫/મણ')}
                    >
                      ⇄ {lang === 'gu' ? 'સામે નવો ભાવ આપો (Counter Offer)' : 'Counter Offer'}
                    </button>
                    <button
                      type="button"
                      className="pr-btn-accept"
                      onClick={handleAcceptProposal}
                    >
                      ✓ {lang === 'gu' ? 'ઓફર સ્વીકારો (Accept Deal)' : 'Accept Deal'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Chat Messages Stream */}
            <div className="fm-messages-stream">
              <div className="fm-date-divider">
                <span>{lang === 'gu' ? 'આજે, ૧૪ એપ્રિલ ૨૦૨૫' : 'Today, 14 April 2025'}</span>
              </div>

              {activeConv.messages.map((msg) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={msg.id} className="msg-system-bubble">
                      <span>{msg.text}</span>
                      <span className="msg-sys-time">{msg.time}</span>
                    </div>
                  );
                }

                const isFarmer = msg.sender === 'farmer';

                return (
                  <div key={msg.id} className={`msg-bubble-wrap ${isFarmer ? 'farmer' : 'trader'}`}>
                    <div className="msg-bubble">
                      <span className="msg-sender-name">{msg.name}</span>
                      <p className="msg-text">{msg.text}</p>
                      <span className="msg-time">{msg.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Counter Chips */}
            <div className="fm-quick-counter-bar">
              <span className="qc-label">{lang === 'gu' ? 'ઝડપી કાઉન્ટર ભાવ:' : 'Quick Counter:'}</span>
              <button type="button" className="qc-chip" onClick={() => handleCounterChip('₹૧,૭૩૫ / મણ')}>
                ₹૧,૭૩૫ / મણ
              </button>
              <button type="button" className="qc-chip" onClick={() => handleCounterChip('₹૧,૭૩૦ / મણ')}>
                ₹૧,૭૩૦ / મણ
              </button>
              <button type="button" className="qc-chip" onClick={() => handleCounterChip('₹૧,૭૨૫ / મણ')}>
                ₹૧,૭૨૫ / મણ
              </button>
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="fm-input-bar">
              <button
                type="button"
                className="btn-attach"
                onClick={() => toast.success('Attachment modal')}
                title="Attach"
              >
                📎
              </button>
              <input
                type="text"
                placeholder={lang === 'gu' ? 'સંદેશ લખો અથવા કાઉન્ટર ભાવ મોકલો...' : 'Type message or counter offer...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="fm-chat-input"
              />
              <button type="submit" className="btn-send">
                {lang === 'gu' ? 'મોકલો / Send →' : 'Send →'}
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default FarmerMessagesPage;
