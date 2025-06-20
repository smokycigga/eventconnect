import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Breadcrumb from 'components/ui/Breadcrumb';
import ProfileHeader from './components/ProfileHeader';
import ImageGallery from './components/ImageGallery';
import ProfileInfo from './components/ProfileInfo';
import ReviewsSection from './components/ReviewsSection';
import BookingButton from './components/BookingButton';

const OrganizerProfile = () => {
  const [searchParams] = useSearchParams();
  const organizerId = searchParams.get('id') || '1';
  const [activeSection, setActiveSection] = useState('overview');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock organizer data based on ID
  const organizerDatabase = {
    '1': {
      id: '1',
      name: "Kalinga Events Co.",
      location: "Bhubaneswar, Odisha",
      rating: 4.9,
      reviewCount: 127,
      coverImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      tagline: "Creating unforgettable moments with Odia elegance and style",
      verified: true,
      responseTime: "Within 2 hours",
      completedEvents: 89,
      yearsExperience: 6,
      priceRange: "₹25,000 - ₹2,50,000",
      availability: "Available for next 3 months",
      bio: `With over 6 years of experience in event planning and management across Odisha, we specialize in creating elegant and memorable experiences for weddings, corporate events, and cultural celebrations. Our deep understanding of Odia traditions combined with modern event management ensures that every celebration is executed flawlessly.\n\nWe believe that every celebration should be unique and reflect the cultural richness of Odisha while meeting the personal preferences of our clients. From intimate gatherings to grand celebrations, we work closely with you to bring your vision to life while managing every aspect of the planning process.`,
      services: [
        "Wedding Planning",
        "Corporate Events",
        "Birthday Parties",
        "Anniversary Celebrations",
        "Cultural Ceremonies",
        "Religious Functions"
      ],
      specialties: [
        "Traditional Odia Weddings",
        "Cultural Events",
        "Corporate Conferences",
        "Product Launches",
        "Religious Ceremonies",
        "Award Ceremonies"
      ]
    },
    '2': {
      id: '2',
      name: "Utkal Celebration Masters",
      location: "Cuttack, Odisha",
      rating: 4.8,
      reviewCount: 89,
      coverImage: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      tagline: "Bringing your celebration dreams to life with traditional touch",
      verified: true,
      responseTime: "Within 3 hours",
      completedEvents: 67,
      yearsExperience: 4,
      priceRange: "₹20,000 - ₹1,80,000",
      availability: "Available for next 2 months",
      bio: `Specializing in traditional Odia celebrations and modern party planning, we bring the perfect blend of culture and contemporary style to your events. Based in the cultural heart of Cuttack, we understand the significance of preserving traditions while embracing new trends.\n\nOur team is passionate about creating memorable experiences that honor your heritage while delivering modern convenience and style. Whether it's a traditional puja, a milestone birthday, or a corporate gathering, we ensure every detail reflects your vision.`,
      services: [
        "Birthday Parties",
        "Anniversary Celebrations",
        "Baby Showers",
        "Cultural Programs",
        "Family Gatherings",
        "Festival Celebrations"
      ],
      specialties: [
        "Traditional Celebrations",
        "Family Functions",
        "Cultural Programs",
        "Festival Events",
        "Baby Naming Ceremonies",
        "Anniversary Parties"
      ]
    },
    '3': {
      id: '3',
      name: "Odisha Premier Party Planners",
      location: "Puri, Odisha",
      rating: 4.7,
      reviewCount: 156,
      coverImage: "https://images.pixabay.com/photo/2017/07/21/23/57/concert-2527495_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      tagline: "Professional event planning with personal Odia hospitality",
      verified: false,
      responseTime: "Within 4 hours",
      completedEvents: 134,
      yearsExperience: 8,
      priceRange: "₹30,000 - ₹3,00,000",
      availability: "Available for next 4 months",
      bio: `With the sacred city of Puri as our base, we bring divine blessings and professional excellence to your corporate and religious events. Our extensive experience in managing large-scale events combined with the spiritual ambiance of Puri creates truly memorable occasions.\n\nWe specialize in corporate conferences, product launches, and religious ceremonies, offering a unique blend of professional service and spiritual significance. Our team understands the importance of both business objectives and cultural values.`,
      services: [
        "Corporate Events",
        "Product Launches",
        "Religious Ceremonies",
        "Conferences",
        "Business Meetings",
        "Spiritual Gatherings"
      ],
      specialties: [
        "Corporate Conferences",
        "Religious Functions",
        "Business Events",
        "Spiritual Ceremonies",
        "Product Launches",
        "Professional Meetings"
      ]
    },
    '4': {
      id: '4',
      name: "Jagannath Dream Day Events",
      location: "Berhampur, Odisha",
      rating: 4.9,
      reviewCount: 203,
      coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      tagline: "Making every day your dream day with divine blessings",
      verified: true,
      responseTime: "Within 1 hour",
      completedEvents: 178,
      yearsExperience: 7,
      priceRange: "₹35,000 - ₹4,00,000",
      availability: "Available for next 5 months",
      bio: `Named after Lord Jagannath, we bring divine blessings to your most precious moments. Specializing in weddings and engagement ceremonies, we understand that these are once-in-a-lifetime events that deserve perfection.\n\nOur team combines traditional Odia wedding customs with contemporary elegance, ensuring that your special day reflects both your cultural heritage and personal style. From traditional rituals to modern celebrations, we handle every detail with devotion and precision.`,
      services: [
        "Weddings",
        "Engagement Parties",
        "Bridal Showers",
        "Pre-wedding Events",
        "Reception Planning",
        "Honeymoon Planning"
      ],
      specialties: [
        "Traditional Odia Weddings",
        "Engagement Ceremonies",
        "Bridal Events",
        "Wedding Receptions",
        "Pre-wedding Shoots",
        "Destination Weddings"
      ]
    },
    '5': {
      id: '5',
      name: "Sambalpuri Festive Functions",
      location: "Sambalpur, Odisha",
      rating: 4.6,
      reviewCount: 74,
      coverImage: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      tagline: "Fun, festive, and flawlessly executed events with folk traditions",
      verified: true,
      responseTime: "Within 3 hours",
      completedEvents: 52,
      yearsExperience: 3,
      priceRange: "₹15,000 - ₹1,20,000",
      availability: "Available for next 3 months",
      bio: `Celebrating the rich folk culture of Western Odisha, we specialize in events that showcase the vibrant Sambalpuri traditions. Our young and energetic team brings fresh ideas while respecting age-old customs.\n\nWe excel in birthday parties, graduation celebrations, and festival events that capture the joy and vibrancy of Sambalpuri culture. Our events are known for their colorful decorations, traditional music, and authentic folk performances.`,
      services: [
        "Birthday Parties",
        "Graduations",
        "Festival Celebrations",
        "Folk Events",
        "Cultural Programs",
        "Youth Events"
      ],
      specialties: [
        "Sambalpuri Folk Events",
        "Birthday Celebrations",
        "Cultural Programs",
        "Festival Functions",
        "Traditional Dance Events",
        "Youth Gatherings"
      ]
    },
    '6': {
      id: '6',
      name: "Konark Luxury Event Designers",
      location: "Konark, Odisha",
      rating: 4.8,
      reviewCount: 91,
      coverImage: "https://images.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
      tagline: "Luxury events with impeccable attention to Odia cultural details",
      verified: true,
      responseTime: "Within 2 hours",
      completedEvents: 67,
      yearsExperience: 5,
      priceRange: "₹50,000 - ₹5,00,000",
      availability: "Available for next 6 months",
      bio: `Inspired by the architectural grandeur of the Sun Temple, we create luxury events that reflect the magnificence of Odia heritage. Our attention to cultural details and commitment to excellence sets us apart in the industry.\n\nWe specialize in high-end weddings, VIP events, and cultural galas that require sophisticated planning and flawless execution. Our events are known for their grandeur, cultural authenticity, and impeccable service standards.`,
      services: [
        "Luxury Weddings",
        "VIP Events",
        "Cultural Galas",
        "High-end Parties",
        "Exclusive Events",
        "Premium Celebrations"
      ],
      specialties: [
        "Luxury Event Design",
        "VIP Functions",
        "Cultural Galas",
        "High-end Weddings",
        "Exclusive Parties",
        "Premium Services"
      ]
    }
  };

  const organizerData = organizerDatabase[organizerId] || organizerDatabase['1'];

  // Common gallery images for all organizers
  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Elegant Wedding Reception",
      category: "Wedding"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Corporate Gala Event",
      category: "Corporate"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Birthday Celebration",
      category: "Birthday"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Anniversary Party",
      category: "Anniversary"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Cultural Celebration",
      category: "Cultural"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      title: "Religious Gathering",
      category: "Religious"
    }
  ];

  // Sample reviews with Odia names
  const reviews = [
    {
      id: 1,
      userName: "Priya Patel",
      userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5,
      date: "2024-01-15",
      eventType: "Wedding",
      review: `${organizerData.name} exceeded all our expectations for our Odia wedding. Every traditional ritual was perfectly coordinated, and the cultural elements were beautifully incorporated. The team's understanding of our customs made our special day truly memorable. Highly recommend for anyone looking for authentic Odia wedding planning.`
    },
    {
      id: 2,
      userName: "Rajesh Mohanty",
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5,
      date: "2024-01-08",
      eventType: "Corporate Event",
      review: `Professional service from start to finish. The team understood our corporate requirements perfectly and delivered an event that impressed all our stakeholders from across Odisha. The attention to detail and timely execution made our product launch a huge success.`
    },
    {
      id: 3,
      userName: "Meera Nayak",
      userImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 4,
      date: "2023-12-20",
      eventType: "Birthday Party",
      review: `Amazing work on my daughter's sweet sixteen celebration. The cultural theme decoration was exactly what we envisioned, and the coordination with local vendors was excellent. The team made sure everything ran smoothly so we could enjoy the celebration.`
    },
    {
      id: 4,
      userName: "Amit Sahoo",
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5,
      date: "2023-12-10",
      eventType: "Anniversary",
      review: `${organizerData.name} helped us celebrate our 25th wedding anniversary in traditional Odia style. Their creative ideas and flawless execution made it a memorable evening for our family and friends. Worth every rupee!`
    },
    {
      id: 5,
      userName: "Kavya Das",
      userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
      rating: 5,
      date: "2023-11-28",
      eventType: "Family Function",
      review: `Exceptional service for our family reunion. The team coordinated with multiple vendors across Bhubaneswar and managed logistics perfectly. The cultural program they organized was the highlight of our gathering. Everyone had a wonderful time.`
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/homepage' },
    { label: 'Search Results', path: '/search-results' },
    { label: organizerData.name, path: `/organizer-profile?id=${organizerId}`, isLast: true }
  ];

  const handleBookingClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleBookingClose = () => {
    setIsBookingModalOpen(false);
  };

  const handleBookingSubmit = () => {
    setIsBookingModalOpen(false);
    window.location.href = '/booking-confirmation';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb customItems={breadcrumbItems} />
        
        {/* Profile Header */}
        <ProfileHeader 
          organizer={organizerData}
          onBookingClick={handleBookingClick}
        />

        {/* Navigation Tabs */}
        <div className="sticky top-16 z-40 bg-background border-b border-gray-200 mb-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: 'Info' },
              { id: 'gallery', label: 'Gallery', icon: 'Image' },
              { id: 'reviews', label: 'Reviews', icon: 'Star' },
              { id: 'contact', label: 'Contact', icon: 'MessageCircle' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                  activeSection === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeSection === 'overview' && (
              <ProfileInfo organizer={organizerData} />
            )}
            
            {activeSection === 'gallery' && (
              <ImageGallery images={galleryImages} />
            )}
            
            {activeSection === 'reviews' && (
              <ReviewsSection 
                reviews={reviews}
                rating={organizerData.rating}
                reviewCount={organizerData.reviewCount}
              />
            )}
            
            {activeSection === 'contact' && (
              <div className="bg-surface rounded-xl shadow-card p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={20} className="text-primary" />
                    <span className="text-text-secondary">{organizerData.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" size={20} className="text-primary" />
                    <span className="text-text-secondary">Response time: {organizerData.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={20} className="text-primary" />
                    <span className="text-text-secondary">{organizerData.availability}</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={20} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-text-primary mb-1">How it works</h4>
                      <p className="text-sm text-text-secondary">
                        Click "Book This Organizer" to submit your requirements. We'll connect you directly with {organizerData.name.split(' ')[0]} to discuss your event details and finalize the booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Quick Stats */}
              <div className="bg-surface rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Events Completed</span>
                    <span className="font-semibold text-text-primary">{organizerData.completedEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Years Experience</span>
                    <span className="font-semibold text-text-primary">{organizerData.yearsExperience}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Response Time</span>
                    <span className="font-semibold text-text-primary">{organizerData.responseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Price Range</span>
                    <span className="font-semibold text-text-primary">{organizerData.priceRange}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-surface rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {organizerData.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary text-sm rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="bg-surface rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {organizerData.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary-50 text-secondary text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Desktop Booking Button */}
              <div className="hidden lg:block">
                <BookingButton 
                  organizerName={organizerData.name}
                  onBookingClick={handleBookingClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 p-4 z-50">
        <BookingButton 
          organizerName={organizerData.name}
          onBookingClick={handleBookingClick}
          isMobile={true}
        />
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-100 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl shadow-modal max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-text-primary">Book {organizerData.name}</h3>
                <button
                  onClick={handleBookingClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
                >
                  <Icon name="X" size={20} className="text-text-secondary" />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleBookingSubmit(); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Event Location *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="Enter event location in Odisha"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Event Type *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                  >
                    <option value="">Select event type</option>
                    {organizerData.services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Additional Message
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                    placeholder="Tell us more about your event requirements..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleBookingClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-text-secondary rounded-lg font-medium hover:bg-gray-50 transition-smooth"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 transition-smooth"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerProfile;