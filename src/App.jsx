import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Public Pages
import HomePage from './pages/public/HomePage';
import MarketplacePage from './pages/public/MarketplacePage';
import CropDetailPage from './pages/public/CropDetailPage';
import PricesPage from './pages/public/PricesPage';
import LoginPage from './pages/public/LoginPage';
import AboutPage from './pages/public/AboutPage';

// Farmer Pages
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import AddCropPage from './pages/farmer/AddCropPage';
import MyCropsPage from './pages/farmer/MyCropsPage';
import EditCropPage from './pages/farmer/EditCropPage';
import NearbyTradersPage from './pages/farmer/NearbyTradersPage';
import TraderProfilePage from './pages/farmer/TraderProfilePage';
import FarmerMessagesPage from './pages/farmer/FarmerMessagesPage';
import FarmerProfilePage from './pages/farmer/FarmerProfilePage';

// Trader Pages
import TraderDashboard from './pages/trader/TraderDashboard';
import BrowseMarketPage from './pages/trader/BrowseMarketPage';
import CropOfferPage from './pages/trader/CropOfferPage';
import SavedCropsPage from './pages/trader/SavedCropsPage';
import PostDemandPage from './pages/trader/PostDemandPage';
import TraderMessagesPage from './pages/trader/TraderMessagesPage';
import TraderProfileSettings from './pages/trader/TraderProfileSettings';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserVerificationPage from './pages/admin/UserVerificationPage';
import ApmcModerationPage from './pages/admin/ApmcModerationPage';

import './index.css';

function AppContent() {
  const { user, isAuthenticated } = useAuth();

  // If farmer is logged in, their Home is FarmerDashboard; if trader, TraderDashboard; else public HomePage
  const getHomeRouteElement = () => {
    if (isAuthenticated && user?.role === 'farmer') {
      return <Navigate to="/farmer/dashboard" replace />;
    }
    if (isAuthenticated && user?.role === 'trader') {
      return <Navigate to="/buyer/dashboard" replace />;
    }
    return <HomePage />;
  };

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={getHomeRouteElement()} />
        <Route path="/listings" element={<MarketplacePage />} />
        <Route path="/listings/:id" element={<CropDetailPage />} />
        <Route path="/prices" element={<PricesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Farmer Routes */}
        <Route path="/farmer/dashboard" element={<ProtectedRoute role="farmer"><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/farmer/add-crop" element={<ProtectedRoute role="farmer"><AddCropPage /></ProtectedRoute>} />
        <Route path="/farmer/my-crops" element={<ProtectedRoute role="farmer"><MyCropsPage /></ProtectedRoute>} />
        <Route path="/farmer/edit-crop" element={<ProtectedRoute role="farmer"><EditCropPage /></ProtectedRoute>} />
        <Route path="/farmer/edit-crop/:id" element={<ProtectedRoute role="farmer"><EditCropPage /></ProtectedRoute>} />
        <Route path="/farmer/traders" element={<ProtectedRoute role="farmer"><NearbyTradersPage /></ProtectedRoute>} />
        <Route path="/farmer/traders/:id" element={<ProtectedRoute role="farmer"><TraderProfilePage /></ProtectedRoute>} />
        <Route path="/farmer/messages" element={<ProtectedRoute role="farmer"><FarmerMessagesPage /></ProtectedRoute>} />
        <Route path="/farmer/profile" element={<ProtectedRoute role="farmer"><FarmerProfilePage /></ProtectedRoute>} />

        {/* Trader Routes */}
        <Route path="/buyer/dashboard" element={<ProtectedRoute role="trader"><TraderDashboard /></ProtectedRoute>} />
        <Route path="/buyer/browse" element={<ProtectedRoute role="trader"><BrowseMarketPage /></ProtectedRoute>} />
        <Route path="/buyer/crop/:id" element={<ProtectedRoute role="trader"><CropOfferPage /></ProtectedRoute>} />
        <Route path="/buyer/saved" element={<ProtectedRoute role="trader"><SavedCropsPage /></ProtectedRoute>} />
        <Route path="/buyer/post-demand" element={<ProtectedRoute role="trader"><PostDemandPage /></ProtectedRoute>} />
        <Route path="/buyer/messages" element={<ProtectedRoute role="trader"><TraderMessagesPage /></ProtectedRoute>} />
        <Route path="/buyer/profile" element={<ProtectedRoute role="trader"><TraderProfileSettings /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><UserVerificationPage /></ProtectedRoute>} />
        <Route path="/admin/apmc-rates" element={<ProtectedRoute role="admin"><ApmcModerationPage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
