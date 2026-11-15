import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { traderService } from '../../services/traderService';
import toast from 'react-hot-toast';
import './TraderMessagesPage.css';

export default function TraderMessagesPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();

  const [deals, setDeals] = useState([]);
  const [selectedDealId, setSelectedDealId] = useState('APMC-AGR-8812');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all'); // all, counter, accepted, completed
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Modals
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [showRtgsModal, setShowRtgsModal] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showFarmerProfileModal, setShowFarmerProfileModal] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadDeals();
  }, []);

  useEffect(() => {
    if (selectedDealId) {
      loadMessages(selectedDealId);
    }
  }, [selectedDealId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const loadDeals = () => {
    const d = traderService.getDeals();
    setDeals(d);
    if (d.length > 0 && !selectedDealId) {
      setSelectedDealId(d[0].id);
    }
  };

  const loadMessages = (dealId) => {
    const msgs = traderService.getChatMessages(dealId);
    setChatMessages(msgs);
  };

  const activeDeal =
    deals.find((d) => d.id === selectedDealId) ||
    deals[0] || {
      id: 'APMC-AGR-8812',
      cropGu: 'સૌરાષ્ટ્ર શંકર-૬ કપાસ',
      grade: 'Grade A (ઉત્તમ)',
      volumeQtl: 350,
      volumeMan: 1750,
      agreedPriceMan: 1720,
      marketRateMan: 1680,
      totalDealValue: 3010000,
      farmer: {
        name: 'રમેશભાઈ કાનજીભાઈ પટેલ',
        rating: '★ ૪.૯ (૪૮ સોદા સફળ)',
        village: 'જેતપુર, જિ. રાજકોટ',
        phone: '+91 98254 78210',
        landVerified: '૭/૧૨ & ૮-અ વેરિફાઇડ ખેડૂત',
        avatar: 'ર',
      },
      deliveryTermsGu:
        'ખેડૂતના ગોડાઉનથી સીધો ઉપાડ (જેતપુર-ધોરાજી હાઇવે, રાજકોટ). વાહન ભાડું: વેપારી પક્ષે.',
      milestones: [
        { step: 1, label: 'ભાવ સંમતિ ૧૦:૩૦ AM', done: true },
        { step: 2, label: 'ડીલ કન્ફર્મ ઇ-સહી થયેલ', done: true },
        { step: 3, label: 'વાહન રવાના & તોલમાપ વેઇટ સ્લિપ બાકી', active: true },
        { step: 4, label: 'RTGS ચૂકવણી તોલ બાદ ત્વરિત', done: false },
      ],
      locked: true,
      status: 'accepted',
    };

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text || !text.trim()) return;

    const newMsg = traderService.sendChatMessage(selectedDealId, {
      sender: 'trader',
      senderName: 'ગણેશ ટ્રેડિંગ (તમે)',
      text: text.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    });

    setChatMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulate farmer reply after 1.5s
    setTimeout(() => {
      const farmerReplies = [
        'હા શેઠ, ડ્રાઇવરનો નંબર અને ગાડીનો નંબર નોંધી લીધો છે. માલ લોડિંગ માટે મજૂરો હાજર છે.',
        'બરાબર છે શેઠ, તોલમાપ શ્રી ખોડિયાર ધર્મકાંટા પર જ કરાવીશું.',
        'કાંટાની ડિજિટલ સ્લિપ WhatsApp અને અહીં પોર્ટલ બંને પર મોકલી આપીશ.',
      ];
      const randomReply = farmerReplies[Math.floor(Math.random() * farmerReplies.length)];
      const fMsg = traderService.sendChatMessage(selectedDealId, {
        sender: 'farmer',
        senderName: activeDeal.farmer?.name || 'ખેડૂત',
        text: randomReply,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      });
      setChatMessages((prev) => [...prev, fMsg]);
      toast.success('ખેડૂત તરફથી નવો સંદેશ આવ્યો!', { icon: '💬' });
    }, 1500);
  };

  const handleDownloadContract = () => {
    const contractText = `=====================================================
ગુજરાત રાજ્ય કૃષિ માર્કેટિંગ બોર્ડ (APMC)
સત્તાવાર ડિજિટલ ખરીદ કરાર (DIGITAL AGREEMENT)
કરાર ક્રમાંક: ${activeDeal.id}
તારીખ: ${new Date().toLocaleDateString('gu-IN')}
=====================================================

૧. ખરીદનાર (વેપારી પેઢી):
શ્રી જીનિંગ એન્ડ પ્રોસેસિંગ ઇન્ડસ્ટ્રીઝ / ગણેશ ટ્રેડિંગ કું.
APMC લાયસન્સ નં: #RJT-421 (ગોંડલ & રાજકોટ માન્ય)
GSTIN: 24AAACS1234F1Z8

૨. વેચનાર (ખેડૂત):
નામ: ${activeDeal.farmer?.name}
સરનામું: ${activeDeal.farmer?.village}
જમીન ચકાસણી: ૭/૧૨ & ૮-અ e-Dhara પ્રમાણિત

૩. સોદાની વિગત:
- પાકનું નામ: ${activeDeal.cropGu} (${activeDeal.grade})
- કુલ જથ્થો: ${activeDeal.volumeQtl} ક્વિન્ટલ (${activeDeal.volumeMan} મણ)
- સંમત થયેલ ભાવ: ₹${activeDeal.agreedPriceMan} / ૨૦ કિગ્રા (મણ)
- કુલ કરાર મૂલ્ય: ₹${activeDeal.totalDealValue?.toLocaleString('en-IN')}

૪. ડિલિવરી અને તોલમાપ શરતો:
${activeDeal.deliveryTermsGu}
તોલમાપ કેન્દ્ર: શ્રી ખોડિયાર ધર્મકાંટો, જેતપુર બાયપાસ.

૫. ચૂકવણી ગેરંટી:
APMC સુરક્ષિત એસ્કો ગેરંટી હેઠળ વજન સ્લિપ મળ્યાના ૨૪ કલાકમાં સીધા RTGS ખાતામાં.

ડિજિટલ ઈ-સહી: Verified & Sealed by APMC Digital System.
=====================================================`;

    const blob = new Blob([contractText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Contract_${activeDeal.id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('ડિજિટલ ખરીદ કરાર ડાઉનલોડ થઈ ગયો છે!', { icon: '📄' });
  };

  const handleUploadSlip = () => {
    traderService.updateDealStatus(selectedDealId, { weighSlipUploaded: true });
    setShowSlipModal(false);
    loadDeals();
    toast.success('૫૦ ટન કમ્પ્યુટરાઇઝ્ડ કાંટાની વેઇટ સ્લિપ સફળતાપૂર્વક અપલોડ થઈ!', { icon: '⚖️' });
  };

  const handleProcessRtgs = () => {
    traderService.updateDealStatus(selectedDealId, { rtgsProcessed: true, status: 'completed' });
    setShowRtgsModal(false);
    loadDeals();
    toast.success('RTGS ચૂકવણી ₹30,10,000 સફળતાપૂર્વક પ્રોસેસ થઈ ગઈ!', { icon: '🏛️' });
  };

  // Filter threads
  const filteredDeals = deals.filter((d) => {
    if (filterTab === 'counter' && d.status !== 'counter') return false;
    if (filterTab === 'accepted' && d.status !== 'accepted') return false;
    if (filterTab === 'completed' && d.status !== 'completed') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchFarmer = (d.farmer?.name || '').toLowerCase().includes(q);
      const matchCrop = (d.cropGu || '').toLowerCase().includes(q);
      if (!matchFarmer && !matchCrop) return false;
    }
    return true;
  });

  return (
    <div className="trader-messages-page">
      {/* Top Breadcrumb Strip */}
      <div className="deal-breadcrumb-strip">
        <div className="deal-breadcrumb-container">
          <span className="deal-breadcrumb-text">
            વેપારી ડેસ્કબોર્ડ (Trader Desk) &gt; સક્રિય સોદા વાટાઘાટ &gt; સોદો #{activeDeal.id}
          </span>
          <span className="deal-verified-firm-badge">
            🛡️ સત્તાવાર વેપારી મંડી ખાતું: ગણેશ ટ્રેડિંગ કું. (શ્રી જીનિંગ)
          </span>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="deal-room-container">
        {/* Left Sidebar: Conversations / Deals List */}
        <div className="deal-sidebar-panel">
          <div className="sidebar-search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="ખેડૂત અથવા પાક શોધો..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="mic-icon">🎙️</span>
          </div>

          {/* Filter Tabs */}
          <div className="deal-filter-tabs">
            <button
              className={`deal-tab-btn ${filterTab === 'all' ? 'active' : ''}`}
              onClick={() => setFilterTab('all')}
            >
              બધા ({deals.length})
            </button>
            <button
              className={`deal-tab-btn ${filterTab === 'counter' ? 'active' : ''}`}
              onClick={() => setFilterTab('counter')}
            >
              કાઉન્ટર ઓફર (૧)
            </button>
            <button
              className={`deal-tab-btn ${filterTab === 'accepted' ? 'active' : ''}`}
              onClick={() => setFilterTab('accepted')}
            >
              સ્વીકારેલ ડીલ (૨)
            </button>
            <button
              className={`deal-tab-btn ${filterTab === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterTab('completed')}
            >
              પૂર્ણ થયેલ
            </button>
          </div>

          {/* Thread Cards List */}
          <div className="deal-threads-scroll">
            {filteredDeals.map((deal) => {
              const isSelected = deal.id === selectedDealId;
              const isAccepted = deal.status === 'accepted';
              const isCounter = deal.status === 'counter';

              return (
                <div
                  key={deal.id}
                  className={`deal-thread-item ${isSelected ? 'selected-thread' : ''}`}
                  onClick={() => setSelectedDealId(deal.id)}
                >
                  <div className="thread-avatar-col">
                    <div
                      className={`thread-avatar ${
                        isAccepted ? 'avatar-green' : isCounter ? 'avatar-orange' : 'avatar-blue'
                      }`}
                    >
                      {deal.farmer?.avatar || deal.farmer?.name?.slice(0, 1) || 'ખે'}
                    </div>
                  </div>

                  <div className="thread-content-col">
                    <div className="thread-top-line">
                      <span className="thread-farmer-name">
                        {deal.farmer?.name?.split(' ')[0] || deal.farmer?.name} પટેલ ✓
                      </span>
                      <span className="thread-time">{deal.lastUpdate || '૧૧:૪૫ AM'}</span>
                    </div>

                    <div className="thread-sub-location">
                      {deal.farmer?.village?.split('(')[0] || 'જેતપુર, રાજકોટ'}
                    </div>

                    <div className="thread-crop-line">
                      <span className="crop-title">{deal.cropGu?.split('(')[0]}</span>
                      <span className="crop-vol">{deal.volumeQtl} ક્વિન્ટલ</span>
                    </div>

                    <div className="thread-badge-line">
                      {isAccepted && (
                        <span className="thread-status-badge badge-accepted">
                          ✓ ડીલ સ્વીકારેલ: ₹{deal.agreedPriceMan}/મણ
                        </span>
                      )}
                      {isCounter && (
                        <span className="thread-status-badge badge-counter">
                          💬 ખેડૂતનો પ્રત્યુત્તર: ₹{deal.farmerCounterMan || 5420}
                        </span>
                      )}
                      {deal.status === 'pending' && (
                        <span className="thread-status-badge badge-sample">
                          🧪 નમૂનો જોઈ લીધો છે
                        </span>
                      )}
                      {deal.status === 'completed' && (
                        <span className="thread-status-badge badge-completed">
                          સોદો સંપન્ન ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Main Deal Room & Chat Panel */}
        <div className="deal-main-panel">
          {/* 1. Farmer Header Bar */}
          <div className="deal-farmer-header">
            <div className="farmer-header-info">
              <div className="farmer-big-avatar">
                {activeDeal.farmer?.avatar || 'ર'}
              </div>
              <div className="farmer-header-details">
                <div className="farmer-title-row">
                  <h2 className="farmer-main-name">
                    {activeDeal.farmer?.name || 'રમેશભાઈ કાનજીભાઈ પટેલ'}
                  </h2>
                  <span className="farmer-land-verified-tag">
                    🛡️ ૭/૧૨ & ૮-અ વેરિફાઇડ ખેડૂત
                  </span>
                </div>
                <div className="farmer-meta-row">
                  <span className="farmer-rating">
                    ★ ૪.૯ (૪૮ સોદા સફળ)
                  </span>
                  <span className="meta-sep">•</span>
                  <span className="farmer-address">
                    {activeDeal.farmer?.village || 'જેતપુર, જિ. રાજકોટ'}
                  </span>
                  <span className="meta-sep">•</span>
                  <span className="farmer-phone-masked">
                    {activeDeal.farmer?.phone || '+91 98254 XXXXX'}
                  </span>
                </div>
              </div>
            </div>

            <div className="farmer-header-actions">
              <a
                href={`tel:${activeDeal.farmer?.phone || '+919825478210'}`}
                className="header-action-btn call-btn"
              >
                📞 કોલ કરો
              </a>
              <button
                className="header-action-btn profile-btn"
                onClick={() => setShowFarmerProfileModal(true)}
              >
                👤 ખેડૂત પ્રોફાઇલ જુઓ
              </button>
            </div>
          </div>

          {/* 2. Confirmed Digital Deal Agreement Card */}
          <div className="deal-agreement-card">
            <div className="agreement-top-row">
              <div className="agreement-title-group">
                <span className="agreement-icon">📋</span>
                <div>
                  <h3 className="agreement-title">સત્તાવાર ડિજિટલ ખરીદ કરાર</h3>
                  <span className="agreement-sub">
                    Confirmed Digital Deal Agreement #{activeDeal.id}
                  </span>
                </div>
              </div>
              <div className="agreement-locked-badge">
                <span>🛡️ સ્વીકારેલ ડીલ (DEAL LOCKED)</span>
              </div>
            </div>

            {/* 4 Columns Stats Grid */}
            <div className="agreement-grid-4cols">
              <div className="agreement-col">
                <span className="col-label">પાક વિગત (Crop)</span>
                <span className="col-main-val">{activeDeal.cropGu}</span>
                <span className="col-sub-pill">{activeDeal.grade || 'Grade A (ઉત્તમ)'}</span>
              </div>

              <div className="agreement-col">
                <span className="col-label">કુલ જથ્થો (Quantity)</span>
                <span className="col-main-val">{activeDeal.volumeQtl} ક્વિન્ટલ</span>
                <span className="col-sub-text">({activeDeal.volumeMan || activeDeal.volumeQtl * 5} મણ)</span>
              </div>

              <div className="agreement-col">
                <span className="col-label">સંમત ભાવ (Agreed Rate)</span>
                <span className="col-main-val price-gold">
                  ₹{activeDeal.agreedPriceMan?.toLocaleString('en-IN')} <span className="rate-unit">/ ૨૦ કિગ્રા</span>
                </span>
                <span className="col-sub-text">બજાર દર: ₹{activeDeal.marketRateMan || 1680}</span>
              </div>

              <div className="agreement-col">
                <span className="col-label">કુલ સોદા મૂલ્ય (Total Deal Value)</span>
                <span className="col-main-val total-green">
                  ₹{activeDeal.totalDealValue?.toLocaleString('en-IN')}
                </span>
                <span className="col-sub-pill escrow-pill">એસ્કો ગેરંટી ઉપલબ્ધ</span>
              </div>
            </div>

            {/* Delivery Route Info */}
            <div className="agreement-delivery-row">
              <span className="truck-icon">🚛</span>
              <span className="delivery-text">
                {activeDeal.deliveryTermsGu ||
                  'ખેડૂતના ગોડાઉનથી સીધો ઉપાડ (જેતપુર-ધોરાજી હાઇવે, રાજકોટ). વાહન ભાડું: વેપારી પક્ષે.'}
              </span>
            </div>

            {/* Execution Milestones */}
            <div className="agreement-milestones-row">
              <span className="milestone-title">સોદા પ્રક્રિયા સ્થિતિ (EXECUTION MILESTONES):</span>
              <div className="milestones-steps-bar">
                <div className="milestone-step done">
                  <div className="step-circle">✓</div>
                  <div className="step-text">
                    <strong>ભાવ સંમતિ</strong>
                    <span>૧૦:૩૦ AM</span>
                  </div>
                </div>
                <div className="step-connector done"></div>

                <div className="milestone-step done">
                  <div className="step-circle">✓</div>
                  <div className="step-text">
                    <strong>ડીલ કન્ફર્મ</strong>
                    <span>ઇ-સહી થયેલ</span>
                  </div>
                </div>
                <div className="step-connector active"></div>

                <div className="milestone-step active">
                  <div className="step-circle">৩</div>
                  <div className="step-text">
                    <strong>વાહન રવાના & તોલમાપ</strong>
                    <span>વેઇટ સ્લિપ બાકી</span>
                  </div>
                </div>
                <div className="step-connector"></div>

                <div className="milestone-step pending">
                  <div className="step-circle">৪</div>
                  <div className="step-text">
                    <strong>RTGS ચૂકવણી</strong>
                    <span>તોલ બાદ ત્વરિત</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Actions Bar */}
            <div className="agreement-actions-bar">
              <button
                className="agreement-btn download-contract-btn"
                onClick={handleDownloadContract}
              >
                📥 ડિજિટલ કરાર ડાઉનલોડ (Download Contract PDF)
              </button>
              <button
                className="agreement-btn upload-slip-btn"
                onClick={() => setShowSlipModal(true)}
              >
                📄 વેઇટ સ્લિપ અપલોડ કરો (Upload Weighbridge Slip)
              </button>
              <button
                className="agreement-btn process-rtgs-btn"
                onClick={() => setShowRtgsModal(true)}
              >
                🏛️ ચૂકવણી પ્રોસેસ કરો (Process RTGS)
              </button>
            </div>
          </div>

          {/* 3. Live Chat Messages Area */}
          <div className="deal-chat-feed">
            <div className="chat-date-separator">
              <span>આજે, ૧૨ ઓગસ્ટ ૨૦૨૫</span>
            </div>

            {chatMessages.length === 0 ? (
              <div className="chat-welcome-notice">
                <span>💬 ખેડૂત સાથે સીધી વાતચીત શરૂ કરો...</span>
              </div>
            ) : (
              chatMessages.map((msg, index) => {
                const isTrader = msg.sender === 'trader';
                return (
                  <div
                    key={msg.id || index}
                    className={`chat-bubble-row ${isTrader ? 'bubble-trader-row' : 'bubble-farmer-row'}`}
                  >
                    {!isTrader && (
                      <div className="chat-avatar-mini">
                        {activeDeal.farmer?.avatar || 'ર'}
                      </div>
                    )}

                    <div className={`chat-bubble ${isTrader ? 'trader-bubble' : 'farmer-bubble'}`}>
                      <div className="bubble-header-row">
                        <span className="bubble-sender-name">
                          {isTrader ? 'ગણેશ ટ્રેડિંગ (તમે)' : activeDeal.farmer?.name || 'રમેશભાઈ પટેલ'}
                        </span>
                        <span className="bubble-timestamp">{msg.time || '૧૦:૧૨ AM'}</span>
                      </div>

                      <p className="bubble-message-text">{msg.text}</p>

                      {/* Sub-badge if present */}
                      {msg.badge && (
                        <div className="bubble-status-tag">
                          <span>{msg.badge}</span>
                        </div>
                      )}

                      {/* Attachments preview if specific cotton test message */}
                      {msg.attachment && (
                        <div className="chat-attachment-card">
                          <div
                            className="attachment-preview-box"
                            onClick={() => setShowImagePreview(true)}
                          >
                            <img
                              src="/crops/cotton.jpg"
                              alt="Cotton Quality Test"
                              onError={(e) => {
                                e.target.src =
                                  'https://images.unsplash.com/photo-1595855759920-86582396756a?w=400&auto=format&fit=crop&q=80';
                              }}
                            />
                            <span className="attachment-reading-pill">
                              🧪 મોઇશ્ચર રીડિંગ: ૭.૮% (ઉત્તમ ગ્રેડ)
                            </span>
                          </div>
                          <div className="attachment-meta-line">
                            <span className="file-name">cotton_quality_test_12aug.jpg</span>
                            <button
                              className="view-large-btn"
                              onClick={() => setShowImagePreview(true)}
                            >
                              મોટું જુઓ 🔍
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Weighbridge location pin if attached */}
                      {msg.locationPin && (
                        <div className="chat-weighbridge-pin">
                          <div className="pin-text">
                            <span className="pin-icon">📍</span>
                            <strong>શ્રી ખોડિયાર ધર્મકાંટો (તોલમાપ કેન્દ્ર)</strong>
                            <p>જેતપુર બાયપાસ, સર્વે નં. ૪૪</p>
                          </div>
                          <a
                            href="https://maps.google.com/?q=Jetpur,Gujarat"
                            target="_blank"
                            rel="noreferrer"
                            className="pin-map-btn"
                          >
                            🗺️ નકશો
                          </a>
                        </div>
                      )}
                    </div>

                    {isTrader && (
                      <div className="chat-avatar-mini trader-avatar-mini">
                        ગ
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 4. Quick Suggestion Chips */}
          <div className="deal-quick-replies-bar">
            <span className="quick-label">ત્વરિત સંદેશા:</span>
            <div className="quick-chips-scroll">
              <button
                className="quick-chip"
                onClick={() => handleSendMessage('કાલે સવારે ગાડી મોકલીએ છીએ')}
              >
                કાલે સવારે ગાડી મોકલીએ છીએ
              </button>
              <button
                className="quick-chip"
                onClick={() => handleSendMessage('લેબ રિપોર્ટ મંજૂર છે')}
              >
                લેબ રિપોર્ટ મંજૂર છે
              </button>
              <button
                className="quick-chip"
                onClick={() => handleSendMessage('રૂબરૂ તોલમાપ કરાવીશું')}
              >
                રૂબરૂ તોલમાપ કરાવીશું
              </button>
              <button
                className="quick-chip"
                onClick={() => handleSendMessage('ડ્રાઇવરનો મોબાઇલ નંબર મોકલો')}
              >
                ડ્રાઇવરનો મોબાઇલ નંબર મોકલો
              </button>
            </div>
          </div>

          {/* 5. Chat Input Bar */}
          <div className="deal-chat-input-bar">
            <button
              className="chat-attach-btn"
              title="કાગળ અથવા ફોટો જોડો"
              onClick={() => {
                toast.info('ફાઇલ એટેચમેન્ટ: લેબ રિપોર્ટ અથવા બિલ જોડો');
              }}
            >
              📎
            </button>
            <input
              type="text"
              placeholder={`ભાવ ઓફર લખો અથવા ${activeDeal.farmer?.name?.split(' ')[0] || 'ખેડૂત'}ને સંદેશો મોકલો...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              className="chat-mic-btn"
              title="વૉઇસ ટાઇપિંગ"
              onClick={() => toast('માઇક્રોફોન સક્રિય થયું', { icon: '🎙️' })}
            >
              🎙️
            </button>
            <button
              className="chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
            >
              મોકલો ▷
            </button>
          </div>

          {/* Bottom Logistics Note */}
          <div className="deal-bottom-logistics-strip">
            <span className="truck-mini-icon">🚛</span>
            <span>APMC લોજિસ્ટિક્સ સહાય ઉપલબ્ધ -</span>
            <button
              className="logistics-details-link"
              onClick={() =>
                toast('ગોંડલ-જેતપુર રૂટ પર 25T અને 50T ટ્રક ટ્રાન્સપોર્ટ સુવિધા ઉપલબ્ધ છે.')
              }
            >
              વિગતો
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL 1: UPLOAD WEIGHBRIDGE SLIP --- */}
      {showSlipModal && (
        <div className="modal-backdrop" onClick={() => setShowSlipModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📄 ૫૦ ટન કમ્પ્યુટરાઇઝ્ડ વેઇટ સ્લિપ અપલોડ કરો</h3>
              <button className="modal-close-btn" onClick={() => setShowSlipModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-form">
              <div className="weigh-center-preview">
                <p>
                  <strong>તોલમાપ કેન્દ્ર:</strong> શ્રી ખોડિયાર ધર્મકાંટો (જેતપુર બાયપાસ)
                </p>
                <p>
                  <strong>લૉટ / વાહન:</strong> GJ-03-BW-9942 &nbsp;|&nbsp; <strong>અંદાજિત જથ્થો:</strong>{' '}
                  ૩૫૦ ક્વિન્ટલ
                </p>
              </div>

              <div className="form-group">
                <label>નેટ વજન (Net Weight in Quintal) *</label>
                <input type="number" defaultValue="350.25" placeholder="દા.ત. 350.25" />
              </div>

              <div className="form-group">
                <label>ધર્મકાંટા સ્લિપ નંબર *</label>
                <input type="text" defaultValue="WB-RJT-88421" placeholder="દા.ત. WB-12345" />
              </div>

              <div className="file-upload-dropzone">
                <span className="dropzone-icon">📤</span>
                <p>વેઇટ સ્લિપનો ફોટો અથવા સ્કેન PDF અહીં ડ્રેગ કરો અથવા બ્રાઉઝ કરો</p>
                <span className="dropzone-hint">JPG, PNG, PDF (મહત્તમ ૫ MB)</span>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowSlipModal(false)}
                >
                  રદ કરો
                </button>
                <button
                  type="button"
                  className="modal-submit-btn"
                  onClick={handleUploadSlip}
                >
                  સ્લિપ કન્ફર્મ કરો ▷
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: PROCESS RTGS PAYMENT --- */}
      {showRtgsModal && (
        <div className="modal-backdrop" onClick={() => setShowRtgsModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🏛️ ખેડૂતના ખાતામાં RTGS ચૂકવણી પ્રોસેસ કરો</h3>
              <button className="modal-close-btn" onClick={() => setShowRtgsModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-form">
              <div className="rtgs-account-box">
                <span className="rtgs-label">ખેડૂત બેંક વિગત (ચકાસાયેલ APMC ખાતું):</span>
                <h4>{activeDeal.farmer?.name}</h4>
                <p>બેંક ઓફ બરોડા - જેતપુર શાખા</p>
                <p className="account-masked">ખાતા નં: •••••••••••૪૪૧૨ &nbsp;|&nbsp; IFSC: BARB0JETPUR</p>
              </div>

              <div className="rtgs-amount-box">
                <span>કુલ ચૂકવણી રકમ:</span>
                <strong className="rtgs-big-amount">
                  ₹{activeDeal.totalDealValue?.toLocaleString('en-IN')}
                </strong>
                <span className="rtgs-words">ત્રીસ લાખ દસ હજાર રૂપિયા પૂરા</span>
              </div>

              <div className="rtgs-escrow-note">
                <span className="shield-icon">🛡️</span>
                <p>
                  તમારા એસ્કો ડિપોઝિટ ગેરંટી બેલેન્સમાંથી રકમ ખેડૂતના ખાતામાં તુરંત ક્રેડિટ થશે.
                </p>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowRtgsModal(false)}
                >
                  બંધ કરો
                </button>
                <button
                  type="button"
                  className="modal-submit-btn"
                  onClick={handleProcessRtgs}
                >
                  RTGS રવાના કરો ▷
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: IMAGE PREVIEW MODAL --- */}
      {showImagePreview && (
        <div className="modal-backdrop" onClick={() => setShowImagePreview(false)}>
          <div className="image-preview-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔬 લેબ મોઇશ્ચર ટેસ્ટ & કપાસ ક્વોલિટી વિઝ્યુઅલ</h3>
              <button className="modal-close-btn" onClick={() => setShowImagePreview(false)}>
                ✕
              </button>
            </div>
            <div className="modal-preview-body">
              <img src="/crops/cotton.jpg" alt="Cotton Full Inspection" />
              <div className="preview-caption">
                <strong>રિપોર્ટ સ્પેક્સ:</strong> સ્ટેપલ ૨૯.૫ mm • મોઇશ્ચર ૭.૮% • માઇક્રોનેર ૪.૧ • કચરો ૧.૫% થી ઓછો.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 4: FARMER PROFILE MODAL --- */}
      {showFarmerProfileModal && (
        <div className="modal-backdrop" onClick={() => setShowFarmerProfileModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>👤 ખેડૂત અધિકૃત પ્રોફાઇલ</h3>
              <button
                className="modal-close-btn"
                onClick={() => setShowFarmerProfileModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-call-body">
              <div className="farmer-badge-card">
                <div className="farmer-avatar-circle">
                  {activeDeal.farmer?.avatar || 'ર'}
                </div>
                <div>
                  <h4>{activeDeal.farmer?.name}</h4>
                  <p>{activeDeal.farmer?.village}</p>
                  <span className="verified-pill">🛡️ ૭/૧૨ & ૮-અ e-Dhara પ્રમાણિત</span>
                </div>
              </div>

              <div className="farmer-profile-stats">
                <div className="p-stat">
                  <span>કુલ સફળ સોદા:</span>
                  <strong>૪૮ સફળ સોદા</strong>
                </div>
                <div className="p-stat">
                  <span>વેપારી રેટિંગ:</span>
                  <strong className="green-txt">★ ૪.૯ / ૫.૦</strong>
                </div>
                <div className="p-stat">
                  <span>જમીન ધારણ:</span>
                  <strong>૧૮ વીઘા</strong>
                </div>
              </div>

              <div className="phone-display-box">
                <span className="phone-label">સંપર્ક નંબર:</span>
                <span className="phone-number">{activeDeal.farmer?.phone || '+91 98254 78210'}</span>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-submit-btn"
                  onClick={() => setShowFarmerProfileModal(false)}
                >
                  બંધ કરો
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
