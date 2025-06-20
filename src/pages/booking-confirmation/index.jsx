import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Breadcrumb from 'components/ui/Breadcrumb';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock booking confirmation data
  const mockBookingData = {
    referenceNumber: "EVT-2024-001234",
    status: "Submitted",
    submittedAt: new Date(),
    expectedResponse: "24-48 hours",
    organizer: {
      name: "Elite Event Planners",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop",
      location: "Mumbai, Maharashtra"
    },
    eventDetails: {
      date: "2024-02-15",
      time: "6:00 PM",
      location: "Grand Ballroom, Hotel Taj",
      eventType: "Corporate Event",
      guestCount: "150-200 people"
    },
    userDetails: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 98765 43210"
    },
    message: "Looking for a professional corporate event setup with catering and entertainment arrangements for our annual company celebration."
  };

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      event: "Wedding Reception",
      rating: 5,
      comment: "EventConnect made finding the perfect wedding planner so easy! The mediated process gave me confidence that everything would be handled professionally.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Amit Patel",
      event: "Corporate Launch",
      rating: 5,
      comment: "The booking process was seamless and the admin team kept us updated throughout. Our product launch was executed flawlessly!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      event: "Birthday Party",
      rating: 5,
      comment: "From booking to execution, everything was perfect. The organizer they connected us with exceeded all our expectations!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    // Simulate loading and get booking data from location state or mock data
    const timer = setTimeout(() => {
      const bookingInfo = location.state?.bookingData || mockBookingData;
      setBookingData(bookingInfo);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.state]);

  const handleAddToCalendar = () => {
    if (!bookingData) return;
    
    const eventDate = new Date(bookingData.eventDetails.date);
    const startDate = eventDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(eventDate.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Event%20with%20${encodeURIComponent(bookingData.organizer.name)}&dates=${startDate}/${endDate}&details=Booking%20Reference:%20${bookingData.referenceNumber}&location=${encodeURIComponent(bookingData.eventDetails.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Booking Form', path: '/booking-form' },
    { label: 'Confirmation', path: '/booking-confirmation', isLast: true }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Processing your booking confirmation...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Icon name="AlertCircle" size={64} className="text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-text-primary mb-4">Booking Not Found</h2>
            <p className="text-text-secondary mb-8">We couldn't find your booking confirmation details.</p>
            <Link
              to="/homepage"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-smooth hover-lift"
            >
              <Icon name="Home" size={20} className="mr-2" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-secondary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={48} className="text-secondary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Booking Request Submitted!
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Thank you for choosing EventConnect. Your booking request has been successfully submitted and is now being processed by our team.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-surface rounded-xl shadow-card p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">Booking Reference</h2>
              <p className="text-2xl font-bold text-primary">{bookingData.referenceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-muted mb-1">Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-warning/10 text-warning">
                <Icon name="Clock" size={16} className="mr-1" />
                {bookingData.status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Organizer Info */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Selected Organizer</h3>
              <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-lg">
                <img
                  src={bookingData.organizer.image}
                  alt={bookingData.organizer.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-text-primary">{bookingData.organizer.name}</h4>
                  <p className="text-sm text-text-secondary flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    {bookingData.organizer.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Icon name="Calendar" size={16} className="text-text-muted mr-3" />
                  <span className="text-text-secondary">{new Date(bookingData.eventDetails.date).toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Clock" size={16} className="text-text-muted mr-3" />
                  <span className="text-text-secondary">{bookingData.eventDetails.time}</span>
                </div>
                <div className="flex items-center">
                  <Icon name="MapPin" size={16} className="text-text-muted mr-3" />
                  <span className="text-text-secondary">{bookingData.eventDetails.location}</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Users" size={16} className="text-text-muted mr-3" />
                  <span className="text-text-secondary">{bookingData.eventDetails.guestCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Your Contact Information</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Icon name="User" size={16} className="text-text-muted mr-3" />
                <span className="text-text-secondary">{bookingData.userDetails.name}</span>
              </div>
              <div className="flex items-center">
                <Icon name="Mail" size={16} className="text-text-muted mr-3" />
                <span className="text-text-secondary">{bookingData.userDetails.email}</span>
              </div>
              <div className="flex items-center">
                <Icon name="Phone" size={16} className="text-text-muted mr-3" />
                <span className="text-text-secondary">{bookingData.userDetails.phone}</span>
              </div>
            </div>
          </div>

          {/* Special Message */}
          {bookingData.message && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-text-primary mb-3">Your Message</h3>
              <p className="text-text-secondary bg-gray-50 p-4 rounded-lg">{bookingData.message}</p>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="bg-surface rounded-xl shadow-card p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6">What Happens Next?</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Admin Review</h3>
                <p className="text-text-secondary">Our team will review your booking request and verify all details within the next few hours.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Organizer Contact</h3>
                <p className="text-text-secondary">We'll connect you with {bookingData.organizer.name} within {bookingData.expectedResponse} to discuss your requirements in detail.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Booking Confirmation</h3>
                <p className="text-text-secondary">Once both parties agree on the terms, we'll send you the final booking confirmation with all details.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            to="/user-dashboard"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-smooth hover-lift"
          >
            <Icon name="User" size={20} className="mr-2" />
            View My Bookings
          </Link>
          <Link
            to="/search-results"
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-text-secondary rounded-lg font-medium hover:bg-gray-50 hover:text-text-primary transition-smooth"
          >
            <Icon name="Search" size={20} className="mr-2" />
            Book Another Organizer
          </Link>
          <button
            onClick={handleAddToCalendar}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-text-secondary rounded-lg font-medium hover:bg-gray-50 hover:text-text-primary transition-smooth"
          >
            <Icon name="Calendar" size={20} className="mr-2" />
            Add to Calendar
          </button>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6 mb-12">
          <div className="flex items-start space-x-3">
            <Icon name="Mail" size={20} className="text-secondary mt-1" />
            <div>
              <h3 className="font-semibold text-text-primary mb-2">Email Confirmation Sent</h3>
              <p className="text-text-secondary mb-3">
                We've sent a confirmation email to <strong>{bookingData.userDetails.email}</strong> with all the booking details and your reference number.
              </p>
              <p className="text-sm text-text-muted">
                Please check your spam folder if you don't see the email within a few minutes.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="bg-surface rounded-xl shadow-card p-6 md:p-8">
          <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
            What Our Customers Say About EventConnect
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
                  ))}
                </div>
                <p className="text-text-secondary text-sm mb-3 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-text-primary text-sm">{testimonial.name}</p>
                  <p className="text-text-muted text-xs">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Contact */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-text-secondary mb-4">
            Need help or have questions about your booking?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@eventconnect.com"
              className="inline-flex items-center text-primary hover:text-primary-700 transition-smooth"
            >
              <Icon name="Mail" size={16} className="mr-2" />
              support@eventconnect.com
            </a>
            <a
              href="tel:+911234567890"
              className="inline-flex items-center text-primary hover:text-primary-700 transition-smooth"
            >
              <Icon name="Phone" size={16} className="mr-2" />
              +91 12345 67890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;