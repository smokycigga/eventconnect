// src/pages/login-register/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPassword from './components/ForgotPassword';
import SocialLogin from './components/SocialLogin';
import SecurityBadges from './components/SecurityBadges';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get return path from location state or default to dashboard
  const returnPath = location.state?.from?.pathname || '/user-dashboard';

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      navigate(returnPath, { replace: true });
    }
  }, [navigate, returnPath]);

  const handleSuccessfulAuth = (userData) => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate(returnPath, { replace: true });
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setShowForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setActiveTab('login');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Already Logged In</h2>
          <p className="text-text-secondary mb-6">You are already authenticated. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {showForgotPassword ? 'Reset Password' : 'Welcome to EventConnect Odisha'}
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              {showForgotPassword
                ? 'Enter your email address and we\'ll send you instructions to reset your password' :'Access your account to manage bookings and connect with trusted event organizers across Odisha'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface border border-gray-200 rounded-2xl shadow-card overflow-hidden">
            {!showForgotPassword ? (
              <>
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  <button
                    onClick={() => handleTabSwitch('login')}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-smooth ${
                      activeTab === 'login' ?'bg-primary text-white border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleTabSwitch('register')}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-smooth ${
                      activeTab === 'register' ?'bg-primary text-white border-b-2 border-primary' :'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-6 lg:p-8">
                  {activeTab === 'login' ? (
                    <LoginForm 
                      onSuccess={handleSuccessfulAuth}
                      onForgotPassword={handleForgotPassword}
                    />
                  ) : (
                    <RegisterForm 
                      onSuccess={handleSuccessfulAuth}
                      onSwitchToLogin={() => setActiveTab('login')}
                    />
                  )}

                  {/* Social Login */}
                  <SocialLogin onSuccess={handleSuccessfulAuth} />
                </div>
              </>
            ) : (
              <div className="p-6 lg:p-8">
                <ForgotPassword onBackToLogin={handleBackToLogin} />
              </div>
            )}
          </div>

          {/* Security & Trust */}
          <SecurityBadges />
        </div>
      </section>

      {/* Credits Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold">EventConnect Odisha</span>
            </div>
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} EventConnect Odisha. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Platform developed by <span className="text-primary font-medium">Gorakhnath Samal</span> and <span className="text-primary font-medium">Sumit Kumar Jena</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginRegister;