// src/pages/contact-us/components/ContactForm.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Icon from 'components/AppIcon';

const ContactForm = ({ isSubmitting, setIsSubmitting, submitSuccess, setSubmitSuccess }) => {
  const [messageLength, setMessageLength] = useState(0);
  const maxMessageLength = 500;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const watchMessage = watch('message', '');

  React.useEffect(() => {
    setMessageLength(watchMessage?.length || 0);
  }, [watchMessage]);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      reset();
      setMessageLength(0);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 2000);
  };

  const subjectOptions = [
    { value: '', label: 'Select a subject' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'complaint', label: 'Complaint/Feedback' }
  ];

  if (submitSuccess) {
    return (
      <div className="bg-surface border border-gray-200 rounded-2xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-text-secondary mb-6">
            Thank you for contacting EventConnect Odisha. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-smooth hover-lift"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-gray-200 rounded-2xl p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Send us a Message
        </h2>
        <p className="text-text-secondary">
          Fill out the form below and we'll respond to your inquiry promptly.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone', {
                pattern: {
                  value: /^[0-9+\-\s\(\)]+$/,
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

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
            Subject *
          </label>
          <select
            id="subject"
            {...register('subject', {
              required: 'Please select a subject'
            })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
              errors?.subject ? 'border-red-300' : 'border-gray-200'
            }`}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors?.subject && (
            <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
              <Icon name="AlertCircle" size={14} />
              <span>{errors.subject.message}</span>
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters'
              },
              maxLength: {
                value: maxMessageLength,
                message: `Message cannot exceed ${maxMessageLength} characters`
              }
            })}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth resize-none ${
              errors?.message ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="Please describe your inquiry in detail..."
          />
          <div className="flex justify-between items-center mt-2">
            <div>
              {errors?.message && (
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{errors.message.message}</span>
                </p>
              )}
            </div>
            <p className={`text-sm ${
              messageLength > maxMessageLength * 0.9 ? 'text-red-600' : 'text-text-muted'
            }`}>
              {messageLength}/{maxMessageLength}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 px-6 rounded-xl font-medium hover:bg-primary-700 transition-smooth hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Icon name="Send" size={20} />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;