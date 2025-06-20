// src/pages/login-register/components/LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Icon from 'components/AppIcon';

const LoginForm = ({ onSuccess, onForgotPassword }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock authentication logic
      if (data.emailOrPhone === 'demo@example.com' && data.password === 'demo123') {
        const userData = {
          id: 1,
          name: 'Demo User',
          email: data.emailOrPhone,
          token: 'demo-auth-token-' + Date.now(),
          location: 'Bhubaneswar, Odisha'
        };
        onSuccess(userData);
      } else {
        setError('root', {
          type: 'manual',
          message: 'Invalid email/phone or password. Try demo@example.com / demo123'
        });
      }
      setIsSubmitting(false);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Sign In to Your Account
        </h2>
        <p className="text-text-secondary text-sm">
          Access your EventConnect Odisha dashboard and manage your bookings
        </p>
      </div>

      {/* Global Error */}
      {errors?.root && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-red-600" />
            <p className="text-red-700 text-sm">{errors.root.message}</p>
          </div>
        </div>
      )}

      {/* Demo Credentials Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-blue-800 text-sm font-medium mb-1">Demo Credentials</p>
            <p className="text-blue-700 text-xs">
              Email: demo@example.com<br />
              Password: demo123
            </p>
          </div>
        </div>
      </div>

      {/* Email/Phone Field */}
      <div>
        <label htmlFor="emailOrPhone" className="block text-sm font-medium text-text-primary mb-2">
          Email Address or Phone Number *
        </label>
        <input
          type="text"
          id="emailOrPhone"
          {...register('emailOrPhone', {
            required: 'Email or phone number is required',
            validate: (value) => {
              const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
              const phoneRegex = /^[0-9+\-\s\(\)]{10,}$/;
              
              if (!emailRegex.test(value) && !phoneRegex.test(value)) {
                return 'Please enter a valid email address or phone number';
              }
              return true;
            }
          })}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
            errors?.emailOrPhone ? 'border-red-300' : 'border-gray-200'
          }`}
          placeholder="Enter your email or phone number"
        />
        {errors?.emailOrPhone && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.emailOrPhone.message}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password *
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
              errors?.password ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-primary transition-smooth"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} className="text-text-muted" />
          </button>
        </div>
        {errors?.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password.message}</span>
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-700 font-medium transition-smooth"
        >
          Forgot password?
        </button>
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
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <Icon name="LogIn" size={20} />
            <span>Sign In</span>
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;