// src/pages/login-register/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from 'components/AppIcon';

const ForgotPassword = ({ onBackToLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const emailValue = watch('email');

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call for password reset
    setTimeout(() => {
      console.log('Password reset requested for:', data.email);
      setIsSubmitting(false);
      setIsEmailSent(true);
      setCountdown(60); // 60 second countdown
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleResendEmail = () => {
    if (countdown === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setCountdown(60);
        
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1000);
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Mail" size={32} className="text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Check Your Email
        </h2>
        
        <p className="text-text-secondary mb-6">
          We've sent password reset instructions to{' '}
          <span className="font-medium text-text-primary">{emailValue}</span>
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div className="text-left">
              <p className="text-blue-800 text-sm font-medium mb-2">
                What to do next:
              </p>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Check your email inbox</li>
                <li>• Look for an email from EventConnect Odisha</li>
                <li>• Click the reset link in the email</li>
                <li>• Check your spam folder if you don't see it</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleResendEmail}
            disabled={countdown > 0 || isSubmitting}
            className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-primary-700 transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Sending...</span>
              </>
            ) : countdown > 0 ? (
              <>
                <Icon name="Clock" size={20} />
                <span>Resend in {countdown}s</span>
              </>
            ) : (
              <>
                <Icon name="RefreshCw" size={20} />
                <span>Resend Email</span>
              </>
            )}
          </button>
          
          <button
            onClick={onBackToLogin}
            className="w-full bg-white border-2 border-gray-200 text-text-primary py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-smooth hover-lift flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Lock" size={32} className="text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Reset Your Password
        </h2>
        
        <p className="text-text-secondary">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
      </div>
      
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          {...register('email', {
            required: 'Email address is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
            errors?.email ? 'border-red-300' : 'border-gray-200'
          }`}
          placeholder="Enter your registered email address"
        />
        {errors?.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email.message}</span>
          </p>
        )}
      </div>
      
      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
          <div>
            <p className="text-yellow-800 text-sm font-medium mb-2">
              Important Notes:
            </p>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• Reset links expire after 1 hour</li>
              <li>• Check your spam folder if you don't receive the email</li>
              <li>• Contact support if you continue having issues</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium hover:bg-primary-700 transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Sending Reset Link...</span>
          </>
        ) : (
          <>
            <Icon name="Send" size={20} />
            <span>Send Reset Link</span>
          </>
        )}
      </button>
      
      {/* Back to Login */}
      <button
        type="button"
        onClick={onBackToLogin}
        className="w-full bg-white border-2 border-gray-200 text-text-primary py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-smooth hover-lift flex items-center justify-center space-x-2"
      >
        <Icon name="ArrowLeft" size={20} />
        <span>Back to Sign In</span>
      </button>
    </form>
  );
};

export default ForgotPassword;