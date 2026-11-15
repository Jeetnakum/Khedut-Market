import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { traderService } from '../../services/traderService';
import toast from 'react-hot-toast';
import './TraderProfileSettings.css';

export default function TraderProfileSettings() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(traderService.getProfile());

  // Form editable states
  const [infraWeighbridge, setInfraWeighbridge] = useState(
    profile.infrastructure?.weighbridge50T ?? true
  );
  const [infraMoistureLab, setInfraMoistureLab] = useState(
    profile.infrastructure?.moistureLab ?? true
  );
  const [infraRestLounge, setInfraRestLounge] = useState(
    profile.infrastructure?.restLounge ?? true
  );

  const [whatsappAlert, setWhatsappAlert] = useState(
    profile.alerts?.whatsappInstant ?? true
  );
  const [smsAlert, setSmsAlert] = useState(
    profile.alerts?.smsOnAccept ?? true
  );

  // Escrow deposit modal
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  const [escrowDepositAmt, setEscrowDepositAmt] = useState('500000');
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const p = traderService.getProfile();
    setProfile(p);
  }, []);

  const handleSaveProfile = () => {
    const updated = traderService.updateProfile({
      infrastructure: {
        weighbridge50T: infraWeighbridge,
        moistureLab: infraMoistureLab,
        restLounge: infraRestLounge,
      },
      alerts: {
        ...profile.alerts,
        whatsappInstant: whatsappAlert,
        smsOnAccept: smsAlert,
      },
    });

    setProfile(updated);
    toast.success('તમારી વેપારી પ્રોફાઇલ અને APMC સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવ્યા!', {
      icon: '💾',
      duration: 3500,
    });
  };

  const handleDepositEscrow = (e) => {
    e.preventDefault();
    const amt = Number(escrowDepositAmt) || 0;
    const newBal = (profile.escrowBalance || 2500000) + amt;
    const updated = traderService.updateProfile({
      escrowBalance: newBal,
      escrowBalanceText: `₹${(newBal / 100000).toFixed(2)} લાખ`,
    });
    setProfile(updated);
    setShowEscrowModal(false);
    toast.success(`₹${amt.toLocaleString('en-IN')} એસ્કો ગેરંટી બેલેન્સમાં સફળતાપૂર્વક જમા થયા!`, {
      icon: '🏛️',
    });
  };

  return (
    <div className="trader-profile-page">
      {/* Top Breadcrumb Strip */}
      <div className="profile-breadcrumb-strip">
        <div className="profile-breadcrumb-container">
          <span className="profile-breadcrumb-text">
            બજાર પેજ &gt; વેપારી પેનલ &gt; બિઝનેસ પ્રોફાઇલ અને APMC વેરિફિકેશન
          </span>
          <span className="profile-live-sync-badge">
            ● APMC પોર્ટલ સર્વર સક્રિય (2025 Live Sync)
          </span>
        </div>
      </div>

      <div className="profile-main-container">
        {/* Page Header Bar */}
        <div className="profile-header-bar">
          <div className="profile-header-left">
            <h1 className="profile-main-title">
              વેપારી બિઝનેસ પ્રોફાઇલ અને વેરિફિકેશન (Trader Business Profile & APMC Settings)
            </h1>
            <p className="profile-main-subtitle">
              તમારી પેઢીની માહિતી, સરકારી APMC લાયસન્સ, જીએસટી અને બેંક વિગતોનું સંચાલન.
            </p>
          </div>
          <div className="profile-header-right">
            <span className="license-status-badge">
              🛡️ લાયસન્સ સ્ટેટસ: સત્તાવાર માન્ય
            </span>
          </div>
        </div>

        {/* Company Main Banner Card */}
        <div className="company-banner-card">
          <div className="company-banner-left">
            <div className="company-avatar-box">
              <span className="company-factory-icon">🏭</span>
            </div>
            <div className="company-banner-info">
              <h2 className="company-name">
                {profile.companyNameGu} ({profile.companyNameEn})
              </h2>
              <div className="proprietor-name">
                👤 સંચાલક / પ્રોપરાઇટર: <strong>{profile.proprietor}</strong>
              </div>
              <div className="license-tagline-badge">
                ✓ {profile.tagline}
              </div>
            </div>
          </div>

          <div className="company-banner-right">
            <div className="gstin-box">
              <span className="gstin-label">GSTIN નંબર</span>
              <div className="gstin-val-row">
                <span className="gstin-number">{profile.gstin}</span>
                <span className="gstin-active-tag">સક્રિય</span>
              </div>
            </div>
            <div className="address-box">
              <span className="address-label">પ્રક્રિયા પ્લાન્ટ અને વેરહાઉસ સરનામું</span>
              <p className="address-text">
                📍 {profile.address}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Main Grid Sections (2x2) */}
        <div className="profile-grid-sections">
          {/* Section 1: Business & Legal Credentials */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <div className="section-header-title">
                <div className="section-icon-box green-icon-box">🏢</div>
                <h3>વિભાગ ૧: બિઝનેસ અને કાનૂની વિગતો (Company & Legal Credentials)</h3>
              </div>
              <span className="section-verified-badge">સંપૂર્ણ ચકાસાયેલ ✓</span>
            </div>

            <div className="section-card-body">
              <div className="info-field-row">
                <span className="field-title">પેઢીનો પ્રકાર (Business Constitution)</span>
                <div className="field-display-box">
                  <span>{profile.businessConstitution}</span>
                  <span className="field-meta-icon">📑</span>
                </div>
              </div>

              <div className="info-field-row">
                <span className="field-title">APMC મુખ્ય યાર્ડ અધિકારક્ષેત્ર (Licensed Mandis)</span>
                <div className="field-display-box highlight-mandi">
                  <span>🏛️ {profile.licensedMandis.split('(')[0]}</span>
                  <span className="multi-mandi-tag">Multi-mandi licensed</span>
                </div>
              </div>

              <div className="info-field-row">
                <span className="field-title">લાયસન્સ માન્યતા મુદત (APMC Validity Date)</span>
                <div className="field-display-box">
                  <span>📅 {profile.apmcValidity.split('•')[0]}</span>
                  <span className="years-left-tag">૨ વર્ષ શેષ</span>
                </div>
              </div>

              <div className="info-field-row">
                <span className="field-title">અપલોડ કરેલા સત્તાવાર કાગળો (Verified Documents)</span>
                <div className="verified-docs-list">
                  <div className="doc-item">
                    <span className="doc-icon">📄</span>
                    <div className="doc-text">
                      <strong>પેઢી પાન કાર્ડ</strong>
                      <span>{profile.panNo} (Verified)</span>
                    </div>
                    <span className="doc-check-icon">✓</span>
                  </div>

                  <div className="doc-item">
                    <span className="doc-icon">📄</span>
                    <div className="doc-text">
                      <strong>GSTIN પ્રમાણપત્ર</strong>
                      <span>{profile.gstinCert}</span>
                    </div>
                    <span className="doc-check-icon">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Procurement Preferences & Facilities */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <div className="section-header-title">
                <div className="section-icon-box orange-icon-box">⚙️</div>
                <h3>વિભાગ ૨: ખરીદી પસંદગીઓ અને યાર્ડ સુવિધાઓ (Procurement Preferences & Facilities)</h3>
              </div>
              <span className="section-verified-badge audit-badge">ઇન્ફ્રાસ્ટ્રક્ચર ઓડિટ ✓</span>
            </div>

            <div className="section-card-body">
              <div className="info-field-row">
                <span className="field-title">મુખ્ય ખરીદતા પાક (Commodities Procured)</span>
                <div className="commodities-chips-row">
                  {profile.commodities?.map((c, i) => (
                    <span key={i} className="comm-chip">
                      ✓ {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-field-row">
                <span className="field-title">ઇન-હાઉસ યાર્ડ સુવિધાઓ (Yard Infrastructure)</span>
                <div className="infra-checkboxes-list">
                  <label className="infra-checkbox-item">
                    <input
                      type="checkbox"
                      checked={infraWeighbridge}
                      onChange={(e) => setInfraWeighbridge(e.target.checked)}
                    />
                    <span className="checkbox-custom">✓</span>
                    <div className="checkbox-text">
                      <strong>૫૦ ટન કમ્પ્યુટરાઇઝ્ડ કાંટો (Digital Weighbridge)</strong>
                    </div>
                  </label>

                  <label className="infra-checkbox-item">
                    <input
                      type="checkbox"
                      checked={infraMoistureLab}
                      onChange={(e) => setInfraMoistureLab(e.target.checked)}
                    />
                    <span className="checkbox-custom">✓</span>
                    <div className="checkbox-text">
                      <strong>ઇન્સ્ટન્ટ ભેજ માપક લેબ (Moisture Testing Lab)</strong>
                    </div>
                  </label>

                  <label className="infra-checkbox-item">
                    <input
                      type="checkbox"
                      checked={infraRestLounge}
                      onChange={(e) => setInfraRestLounge(e.target.checked)}
                    />
                    <span className="checkbox-custom">✓</span>
                    <div className="checkbox-text">
                      <strong>ખેડૂત અને ડ્રાઇવર વિશ્રામ ભવન (Rest Lounge & Canteen)</strong>
                    </div>
                  </label>
                </div>
              </div>

              <div className="info-field-row">
                <span className="field-title">દૈનિક સરેરાશ ખરીદ ક્ષમતા (Daily Intake Capacity)</span>
                <div className="capacity-display-row">
                  <span className="capacity-val">
                    {(profile.dailyCapacityQtl || 1500).toLocaleString('en-IN')} ક્વિન્ટલ / દિવસ
                  </span>
                  <span className="capacity-badge">
                    {profile.dailyCapacityTag || 'હાઇ-વોલ્યુમ વેપારી'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Bank Account & Escrow Wallet */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <div className="section-header-title">
                <div className="section-icon-box blue-icon-box">🏦</div>
                <h3>વિભાગ ૩: બેંક ખાતું અને એસ્કો વૉલેટ સેટિંગ્સ (Bank Account & Settlement)</h3>
              </div>
              <span className="section-verified-badge rtgs-badge">RTGS સક્ષમ</span>
            </div>

            <div className="section-card-body">
              <div className="bank-account-card">
                <div className="bank-name-row">
                  <span className="bank-title">{profile.bank?.name}</span>
                  <span className="bank-verified-tag">{profile.bank?.status}</span>
                </div>
                <div className="bank-details-grid">
                  <div>
                    <span className="bank-label">કરંટ એકાઉન્ટ નંબર:</span>
                    <span className="bank-val masked-acc">•••••••••••૯૧૮૨</span>
                  </div>
                  <div>
                    <span className="bank-label">IFSC કોડ:</span>
                    <span className="bank-val">{profile.bank?.ifsc}</span>
                  </div>
                </div>
              </div>

              <div className="escrow-balance-card">
                <div className="escrow-header-row">
                  <div>
                    <h4 className="escrow-title">એસ્કો ડિપોઝિટ ગેરંટી બેલેન્સ (Escrow Guarantee Balance)</h4>
                    <p className="escrow-desc">
                      ખેડૂતોને ૨૪ કલાકમાં ઝડપી અને સુરક્ષિત ચૂકવણી માટે અનામત ભંડોળ
                    </p>
                  </div>
                  <span className="gov-safe-badge">સરકારી સુરક્ષિત હોલ્ડિંગ</span>
                </div>

                <div className="escrow-amount-row">
                  <span className="escrow-big-num">
                    ₹{(profile.escrowBalance || 2500000).toLocaleString('en-IN')}
                  </span>
                  <button
                    className="topup-escrow-btn"
                    onClick={() => setShowEscrowModal(true)}
                  >
                    + ભંડોળ ઉમેરો (Deposit)
                  </button>
                </div>

                <p className="escrow-guarantee-note">
                  ✓ આ બેલેન્સ ખેડૂતોમાં વિશ્વાસ અને સોદાના ૧૦૦% પેમેન્ટની ખાતરી આપે છે.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Alert Channels & Notifications */}
          <div className="profile-section-card">
            <div className="section-card-header">
              <div className="section-header-title">
                <div className="section-icon-box red-icon-box">🔔</div>
                <h3>વિભાગ ૪: એલર્ટ અને સંપર્ક પ્રાથમિકતા (Alert Channels & Notifications)</h3>
              </div>
              <span className="section-verified-badge realtime-badge">રીઅલ-ટાઇમ ચેનલ્સ</span>
            </div>

            <div className="section-card-body">
              <div className="notification-toggle-item">
                <div className="toggle-text-col">
                  <div className="toggle-title">
                    <span className="wa-icon-green">💬</span>
                    <strong>નવો પાક લિસ્ટ થતાં તાત્કાલિક WhatsApp એલર્ટ</strong>
                  </div>
                  <p className="toggle-desc">
                    જથ્થો &gt; ૨૦૦ ક્વિન્ટલ હોય ત્યારે રજિસ્ટર્ડ મોબાઈલ પર સીધો મેસેજ મોકલો.
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={whatsappAlert}
                    onChange={(e) => setWhatsappAlert(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="notification-toggle-item">
                <div className="toggle-text-col">
                  <div className="toggle-title">
                    <span className="sms-icon-yellow">📱</span>
                    <strong>ખેડૂત દ્વારા ઓફર સ્વીકારાતા SMS નોટિફિકેશન</strong>
                  </div>
                  <p className="toggle-desc">
                    જ્યારે ખેડૂત તમારો બિડ/દર સ્વીકારે ત્યારે ત્વરિત કન્ફર્મેશન SMS.
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={smsAlert}
                    onChange={(e) => setSmsAlert(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div className="phone-security-info-box">
                <span className="shield-info-icon">ℹ️</span>
                <span>
                  પ્રાથમિક નંબર: <strong>+૯૧ ૯૮૨૫૦ •••••</strong> (OTP વેરિફિકેશન સાથે સુરક્ષિત લિંક કરેલ).
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Security Protocol & Save Bar */}
        <div className="profile-bottom-action-bar">
          <div className="security-protocol-text">
            <span className="lock-icon">🔒</span>
            <span>બધા ડેટા APMC ઇ-માર્કેટ સિક્યોરિટી પ્રોટોકોલ હેઠળ એન્ક્રિપ્ટ કરેલા છે.</span>
          </div>

          <div className="bottom-actions-group">
            <button
              className="support-desk-btn"
              onClick={() => setShowHelpModal(true)}
            >
              🎧 સહાયતા ડેસ્ક
            </button>
            <button className="save-changes-btn" onClick={handleSaveProfile}>
              💾 ફેરફારો સેવ કરો (Save Profile Changes)
            </button>
          </div>
        </div>
      </div>

      {/* --- ESCROW DEPOSIT MODAL --- */}
      {showEscrowModal && (
        <div className="modal-backdrop" onClick={() => setShowEscrowModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🏛️ એસ્કો ડિપોઝિટ ગેરંટી બેલેન્સ વધારો</h3>
              <button className="modal-close-btn" onClick={() => setShowEscrowModal(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleDepositEscrow} className="modal-form">
              <p>
                એસ્કો બેલેન્સ વધારવાથી તમારા તમામ ખરીદ સોદા માટે ખેડૂતોને ત્વરિત ચૂકવણી ગેરંટી મળે છે.
              </p>
              <div className="form-group">
                <label>જમા કરાવવાની રકમ (₹) *</label>
                <input
                  type="number"
                  value={escrowDepositAmt}
                  onChange={(e) => setEscrowDepositAmt(e.target.value)}
                  placeholder="દા.ત. 500000"
                  step="50000"
                  required
                />
              </div>

              <div className="escrow-modal-calc">
                <span>નવું કુલ બેલેન્સ:</span>
                <strong>
                  ₹{((profile.escrowBalance || 2500000) + (Number(escrowDepositAmt) || 0)).toLocaleString('en-IN')}
                </strong>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowEscrowModal(false)}
                >
                  રદ કરો
                </button>
                <button type="submit" className="modal-submit-btn">
                  નેટ બેંકિંગ / RTGS દ્વારા જમા કરો ▷
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SUPPORT HELP MODAL --- */}
      {showHelpModal && (
        <div className="modal-backdrop" onClick={() => setShowHelpModal(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎧 APMC વેપારી સહાયતા ડેસ્ક</h3>
              <button className="modal-close-btn" onClick={() => setShowHelpModal(false)}>
                ✕
              </button>
            </div>
            <div className="modal-call-body">
              <p>
                ગોંડલ અને રાજકોટ માર્કેટ યાર્ડ વેપારી સહાયતા ડેસ્ક પર આપનું સ્વાગત છે.
              </p>
              <div className="phone-display-box">
                <span className="phone-label">ટોલ-ફ્રી હેલ્પલાઇન (સવારે ૮ થી રાત્રે ૮):</span>
                <span className="phone-number">1800-543-388</span>
              </div>
              <p className="support-email-text">
                📧 ઇમેઇલ: support@kisanbazaar.gujarat.gov.in
              </p>
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="modal-submit-btn"
                  onClick={() => setShowHelpModal(false)}
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
