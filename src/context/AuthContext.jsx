import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const DEFAULT_FARMER_USER = {
  _id: 'farmer_1',
  name: 'રમેશભાઈ કાનજીભાઈ પટેલ',
  nameEn: 'Rameshbhai K. Patel',
  role: 'farmer',
  mobile: '9825478210',
  district: 'Rajkot',
  taluka: 'Jetpur',
  village: 'નવાગઢ (Navagadh)',
  surveyNo: '૧૨૪/૨ (124/2)',
  farmerId: '#KB-GUJ-8841',
  verified712: true,
  rating: 4.9,
  memberSince: 'જાન્યુઆરી ૨૦૨૪ (Jan 2024)',
  primaryApmc: 'જેતપુર & ગોંડલ APMC',
  landVigha: 15,
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('km_token') || 'demo_farmer_token');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('km_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return DEFAULT_FARMER_USER;
  });
  const [loading, setLoading] = useState(false);

  // Axios base URL
  axios.defaults.baseURL = 'http://localhost:5000';
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const login = (tokenVal, userData) => {
    localStorage.setItem('km_token', tokenVal);
    localStorage.setItem('km_user', JSON.stringify(userData));
    setToken(tokenVal);
    setUser(userData);
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenVal}`;
  };

  const logout = () => {
    localStorage.removeItem('km_token');
    localStorage.removeItem('km_user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const switchRole = (newRole) => {
    let updated;
    if (newRole === 'farmer') {
      updated = { ...DEFAULT_FARMER_USER };
    } else if (newRole === 'trader') {
      updated = {
        _id: 'trader_1',
        name: 'શ્રી જીનિંગ એન્ડ પ્રોસેસિંગ ઇન્ડસ્ટ્રીઝ',
        nameEn: 'Shree Ginning & Processing Industries',
        proprietor: 'હસમુખભાઈ પુનીતભાઈ પટેલ',
        role: 'trader',
        mobile: '9825499999',
        district: 'Rajkot',
        taluka: 'Gondal',
        address: 'ગોંડલ માર્કેટ યાર્ડ સામે, જેતપુર રોડ, ગોંડલ (રાજકોટ જિલ્લો) - ૩૬૦૩૧૧',
        licenseNo: '#RJT-421',
        gstin: '24AAACS1234F1Z8',
        verified: true,
      };
    } else {
      updated = {
        _id: 'admin_1',
        name: 'APMC એડમિનિસ્ટ્રેટર',
        role: 'admin',
      };
    }
    setUser(updated);
    localStorage.setItem('km_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, switchRole, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
