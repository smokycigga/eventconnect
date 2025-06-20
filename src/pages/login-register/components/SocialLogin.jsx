// src/pages/login-register/components/SocialLogin.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const SocialLogin = ({ onSuccess }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      const userData = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'googleuser@gmail.com',
        token: 'google-auth-token-' + Date.now(),
        location: 'Bhubaneswar, Odisha',
        provider: 'google',
        avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?w=100&h=100&fit=crop&crop=face'
      };
      
      setIsGoogleLoading(false);
      onSuccess(userData);
    }, 2000);
  };

  const handleFacebookLogin = () => {
    setIsFacebookLoading(true);
    
    // Simulate Facebook OAuth flow
    setTimeout(() => {
      const userData = {
        id: 'facebook_' + Date.now(),
        name: 'Facebook User',
        email: 'facebookuser@facebook.com',
        token: 'facebook-auth-token-' + Date.now(),
        location: 'Cuttack, Odisha',
        provider: 'facebook',
        avatar: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?w=100&h=100&fit=crop&crop=face'
      };
      
      setIsFacebookLoading(false);
      onSuccess(userData);
    }, 2000);
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-muted">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading || isFacebookLoading}
          className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-200 rounded-xl bg-white text-text-primary font-medium hover:bg-gray-50 transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGoogleLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-text-primary border-t-transparent"></div>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285f4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34a853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#fbbc05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#ea4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Google</span>
            </>
          )}
        </button>

        {/* Facebook Login */}
        <button
          onClick={handleFacebookLogin}
          disabled={isGoogleLoading || isFacebookLoading}
          className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-200 rounded-xl bg-white text-text-primary font-medium hover:bg-gray-50 transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFacebookLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-text-primary border-t-transparent"></div>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="#1877f2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </>
          )}
        </button>
      </div>

      {/* Social Login Benefits */}
      <div className="mt-4 text-center">
        <p className="text-xs text-text-muted leading-relaxed">
          By signing in with social accounts, you agree to our{' '}
          <a href="#" className="text-primary hover:text-primary-700 transition-smooth">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:text-primary-700 transition-smooth">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* Benefits of Social Login */}
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-blue-800 text-sm font-medium mb-1">
              Quick & Secure Login
            </p>
            <p className="text-blue-700 text-xs">
              Use your existing social accounts for faster access without creating a new password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;