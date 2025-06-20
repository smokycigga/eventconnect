// src/pages/login-register/components/RegisterForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Icon from 'components/AppIcon';

const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm();

  const watchPassword = watch('password', '');

  // Odisha cities for location dropdown
  const odishaCities = [
    { value: '', label: 'Select your city' },
    { value: 'bhubaneswar', label: 'Bhubaneswar' },
    { value: 'cuttack', label: 'Cuttack' },
    { value: 'puri', label: 'Puri' },
    { value: 'konark', label: 'Konark' },
    { value: 'khordha', label: 'Khordha' },
    { value: 'berhampur', label: 'Berhampur' },
    { value: 'sambalpur', label: 'Sambalpur' },
    { value: 'rourkela', label: 'Rourkela' },
    { value: 'balasore', label: 'Balasore' },
    { value: 'baripada', label: 'Baripada' },
    { value: 'jharsuguda', label: 'Jharsuguda' },
    { value: 'other', label: 'Other (Please specify in phone field)' }
  ];

  React.useEffect(() => {
    if (watchPassword) {
      const strength = calculatePasswordStrength(watchPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
    }
  }, [watchPassword]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score += 1;
    else feedback.push('at least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('lowercase letter');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('uppercase letter');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('number');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('special character');

    const strengthLevels = {
      0: { label: 'Very Weak', color: 'bg-red-500', textColor: 'text-red-600' },
      1: { label: 'Weak', color: 'bg-red-400', textColor: 'text-red-600' },
      2: { label: 'Fair', color: 'bg-yellow-400', textColor: 'text-yellow-600' },
      3: { label: 'Good', color: 'bg-blue-500', textColor: 'text-blue-600' },
      4: { label: 'Strong', color: 'bg-green-500', textColor: 'text-green-600' },
      5: { label: 'Very Strong', color: 'bg-green-600', textColor: 'text-green-600' }
    };

    return {
      score,
      ...strengthLevels[score],
      feedback: feedback.length > 0 ? `Needs: ${feedback.join(', ')}` : 'Great password!'
    };
  };

  const getPasswordStrengthWidth = () => {
    return `${(passwordStrength.score / 5) * 100}%`;
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate successful registration
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        token: 'new-user-auth-token-' + Date.now(),
        avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?w=100&h=100&fit=crop&crop=face'
      };
      
      // Store authentication data
      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      onSuccess(userData);
      setIsSubmitting(false);
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Create Your Account
        </h2>
        <p className="text-text-secondary text-sm">
          Join EventFul and start booking trusted event organizers
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          {...register('name', {
            required: 'Full name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'Name can only contain letters and spaces'
            }
          })}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
            errors?.name ? 'border-red-300' : 'border-gray-200'
          }`}
          placeholder="Enter your full name"
        />
        {errors?.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.name.message}</span>
          </p>
        )}
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
              errors?.email ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="your.email@example.com"
          />
          {errors?.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9+\-\s\(\)]{10,15}$/,
                message: 'Invalid phone number format'
              }
            })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
              errors?.phone ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="+91 98765 43210"
          />
          {errors?.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.phone.message}</span>
            </p>
          )}
        </div>
      </div>

      {/* Location (Odisha Cities) */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-text-primary mb-2">
          Location in Odisha *
        </label>
        <select
          id="location"
          {...register('location', {
            required: 'Please select your location'
          })}
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
            errors?.location ? 'border-red-300' : 'border-gray-200'
          }`}
        >
          {odishaCities.map((city) => (
            <option key={city.value} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>
        {errors?.location && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.location.message}</span>
          </p>
        )}
      </div>

      {/* Password */}
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
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            })}
            className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
              errors?.password ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Create a strong password"
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
        
        {/* Password Strength Indicator */}
        {watchPassword && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-xs font-medium ${passwordStrength.textColor}`}>
                {passwordStrength.label}
              </span>
              <span className="text-xs text-text-muted">
                {passwordStrength.score}/5
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                style={{ width: getPasswordStrengthWidth() }}
              ></div>
            </div>
            <p className="text-xs text-text-muted mt-1">
              {passwordStrength.feedback}
            </p>
          </div>
        )}
        
        {errors?.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password.message}</span>
          </p>
        )}
      </div>

      {/* Terms Agreement */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('agreeToTerms', {
              required: 'You must agree to the terms and conditions'
            })}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 mt-0.5"
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            I agree to the{' '}
            <a href="#" className="text-primary hover:text-primary-700 font-medium transition-smooth">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary-700 font-medium transition-smooth">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors?.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.agreeToTerms.message}</span>
          </p>
        )}
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
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <Icon name="UserPlus" size={20} />
            <span>Create Account</span>
          </>
        )}
      </button>

      {/* Switch to Login */}
      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-text-secondary text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary hover:text-primary-700 font-medium transition-smooth"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;