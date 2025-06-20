import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Breadcrumb from 'components/ui/Breadcrumb';

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventLocation: '',
    eventType: '',
    message: ''
  });

  // Mock organizer data from navigation state or default
  const organizerData = location.state?.organizer || {
    id: 1,
    name: "Elite Events & Celebrations",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
    location: "Mumbai, Maharashtra",
    rating: 4.8,
    tagline: "Creating unforgettable moments with precision and style"
  };

  const eventTypes = [
    "Wedding Ceremony",
    "Corporate Event",
    "Birthday Party",
    "Anniversary Celebration",
    "Product Launch",
    "Conference & Seminar",
    "Cultural Event",
    "Social Gathering",
    "Other"
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Search Results', path: '/search-results' },
    { label: 'Organizer Profile', path: '/organizer-profile' },
    { label: 'Book Service', path: '/booking-form', isLast: true }
  ];

  useEffect(() => {
    // Auto-focus on first input when component mounts
    const firstInput = document.querySelector('input[name="name"]');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Full name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = 'Email address is required';
        } else if (!emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          newErrors.phone = 'Please enter a valid phone number';
        } else {
          delete newErrors.phone;
        }
        break;

      case 'eventDate':
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!value) {
          newErrors.eventDate = 'Event date is required';
        } else if (selectedDate < today) {
          newErrors.eventDate = 'Event date cannot be in the past';
        } else {
          delete newErrors.eventDate;
        }
        break;

      case 'eventLocation':
        if (!value.trim()) {
          newErrors.eventLocation = 'Event location is required';
        } else if (value.trim().length < 3) {
          newErrors.eventLocation = 'Location must be at least 3 characters';
        } else {
          delete newErrors.eventLocation;
        }
        break;

      case 'eventType':
        if (!value) {
          newErrors.eventType = 'Please select an event type';
        } else {
          delete newErrors.eventType;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'phone', 'eventDate', 'eventLocation', 'eventType'];
    let isValid = true;

    requiredFields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to confirmation page with booking data
      navigate('/booking-confirmation', {
        state: {
          bookingData: {
            ...formData,
            organizer: organizerData,
            bookingId: `BK${Date.now()}`,
            submittedAt: new Date().toISOString()
          }
        }
      });
    } catch (error) {
      console.error('Booking submission failed:', error);
      setErrors({ submit: 'Failed to submit booking request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb customItems={breadcrumbItems} />

        {/* Header Section */}
        <div className="bg-surface rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={organizerData.image}
                alt={organizerData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/no_image.png";
                }}
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Book Service with {organizerData.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={16} />
                  <span>{organizerData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-yellow-500" />
                  <span>{organizerData.rating}</span>
                </div>
              </div>
              <p className="text-text-secondary mt-2">{organizerData.tagline}</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-surface rounded-lg shadow-card p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-2">
              Event Booking Request
            </h2>
            <p className="text-text-secondary">
              Fill in the details below and we'll connect you with the organizer to discuss your requirements.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-text-primary border-b border-gray-200 pb-2">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                      errors.name ? 'border-accent bg-accent-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-accent flex items-center">
                      <Icon name="AlertCircle" size={14} className="mr-1" />
                      {errors.name}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="+91 98765 43210"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                      errors.phone ? 'border-accent bg-accent-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-accent flex items-center">
                      <Icon name="AlertCircle" size={14} className="mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                    errors.email ? 'border-accent bg-accent-50' : 'border-gray-200'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-accent flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Event Information Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-text-primary border-b border-gray-200 pb-2">
                Event Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-text-primary mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    min={getMinDate()}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                      errors.eventDate ? 'border-accent bg-accent-50' : 'border-gray-200'
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-sm text-accent flex items-center">
                      <Icon name="AlertCircle" size={14} className="mr-1" />
                      {errors.eventDate}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-text-primary mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                      errors.eventType ? 'border-accent bg-accent-50' : 'border-gray-200'
                    }`}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-sm text-accent flex items-center">
                      <Icon name="AlertCircle" size={14} className="mr-1" />
                      {errors.eventType}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="eventLocation" className="block text-sm font-medium text-text-primary mb-2">
                  Event Location *
                </label>
                <input
                  type="text"
                  id="eventLocation"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  placeholder="Enter venue address or location"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth ${
                    errors.eventLocation ? 'border-accent bg-accent-50' : 'border-gray-200'
                  }`}
                />
                {errors.eventLocation && (
                  <p className="mt-1 text-sm text-accent flex items-center">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    {errors.eventLocation}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  Additional Requirements
                  <span className="text-text-muted font-normal ml-1">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your specific requirements, budget range, guest count, or any special requests..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth resize-vertical"
                />
                <p className="mt-1 text-xs text-text-muted">
                  This information helps us match you with the right organizer for your needs.
                </p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-text-secondary rounded-lg font-medium hover:bg-gray-50 hover:text-text-primary transition-smooth"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 sm:flex-none px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth hover-lift flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={18} className="mr-2" />
                    Submit Request
                  </>
                )}
              </button>
            </div>

            {errors.submit && (
              <div className="p-4 bg-accent-50 border border-accent-200 rounded-lg">
                <p className="text-accent flex items-center">
                  <Icon name="AlertCircle" size={16} className="mr-2" />
                  {errors.submit}
                </p>
              </div>
            )}
          </form>

          {/* Information Box */}
          <div className="mt-8 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <h4 className="font-medium text-primary mb-1">How it works</h4>
                <p className="text-primary-700">
                  After submitting your request, our team will review your requirements and connect you with the organizer. 
                  You'll receive a confirmation email with next steps and the organizer's contact details within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;