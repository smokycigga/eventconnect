import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FeaturedOrganizers = () => {
  const featuredOrganizers = [
    {
      id: 1,
      name: "Kalinga Events Co.",
      thumbnail: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=400&h=300&fit=crop&crop=center",
      location: "Bhubaneswar, Odisha",
      rating: 4.9,
      reviewCount: 127,
      tagline: "Creating unforgettable moments with Odia elegance and style",
      specialties: ["Weddings", "Corporate Events", "Cultural Galas"],
      verified: true
    },
    {
      id: 2,
      name: "Utkal Celebration Masters",
      thumbnail: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?w=400&h=300&fit=crop&crop=center",
      location: "Cuttack, Odisha",
      rating: 4.8,
      reviewCount: 89,
      tagline: "Bringing your celebration dreams to life with traditional Odia touch",
      specialties: ["Birthday Parties", "Anniversaries", "Baby Showers"],
      verified: true
    },
    {
      id: 3,
      name: "Odisha Premier Party Planners",
      thumbnail: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?w=400&h=300&fit=crop&crop=center",
      location: "Puri, Odisha",
      rating: 4.7,
      reviewCount: 156,
      tagline: "Professional event planning with personal Odia hospitality",
      specialties: ["Corporate Events", "Product Launches", "Religious Ceremonies"],
      verified: false
    },
    {
      id: 4,
      name: "Jagannath Dream Day Events",
      thumbnail: "https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?w=400&h=300&fit=crop&crop=center",
      location: "Berhampur, Odisha",
      rating: 4.9,
      reviewCount: 203,
      tagline: "Making every day your dream day with divine blessings",
      specialties: ["Weddings", "Engagement Parties", "Bridal Showers"],
      verified: true
    },
    {
      id: 5,
      name: "Sambalpuri Festive Functions",
      thumbnail: "https://images.pexels.com/photos/1190299/pexels-photo-1190299.jpeg?w=400&h=300&fit=crop&crop=center",
      location: "Sambalpur, Odisha",
      rating: 4.6,
      reviewCount: 74,
      tagline: "Fun, festive, and flawlessly executed events with folk traditions",
      specialties: ["Birthday Parties", "Graduations", "Festival Celebrations"],
      verified: true
    },
    {
      id: 6,
      name: "Konark Luxury Event Designers",
      thumbnail: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=400&h=300&fit=crop&crop=center",
      location: "Konark, Odisha",
      rating: 4.8,
      reviewCount: 91,
      tagline: "Luxury events with impeccable attention to Odia cultural details",
      specialties: ["Luxury Weddings", "VIP Events", "Cultural Galas"],
      verified: true
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<Icon key="half" name="Star" size={16} className="text-yellow-400 fill-current opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />);
    }

    return stars;
  };

  return (
    <section className="py-16 lg:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Featured Event Organizers in Odisha
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discover top-rated professionals across Bhubaneswar and Odisha who have consistently delivered exceptional events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredOrganizers.map((organizer) => (
            <div
              key={organizer.id}
              className="bg-surface border border-gray-200 rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition-smooth hover-lift group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={organizer.thumbnail}
                  alt={organizer.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-layout"
                />
                {organizer.verified && (
                  <div className="absolute top-4 right-4 bg-secondary text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Icon name="CheckCircle" size={12} />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-text-primary group-hover:text-primary transition-smooth">
                    {organizer.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="MapPin" size={16} className="text-text-muted" />
                  <span className="text-text-secondary text-sm">{organizer.location}</span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(organizer.rating)}
                  </div>
                  <span className="text-text-primary font-medium">{organizer.rating}</span>
                  <span className="text-text-muted text-sm">({organizer.reviewCount} reviews)</span>
                </div>

                <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                  {organizer.tagline}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {organizer.specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary text-xs font-medium rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                  {organizer.specialties.length > 2 && (
                    <span className="px-3 py-1 bg-gray-100 text-text-muted text-xs font-medium rounded-full">
                      +{organizer.specialties.length - 2} more
                    </span>
                  )}
                </div>

                <Link
                  to={`/organizer-profile?id=${organizer.id}`}
                  className="w-full bg-primary text-white py-3 px-4 rounded-xl font-medium text-center hover:bg-primary-700 transition-smooth hover-lift flex items-center justify-center space-x-2"
                >
                  <span>View Details</span>
                  <Icon name="ArrowRight" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/search-results"
            className="inline-flex items-center space-x-2 bg-white border-2 border-primary text-primary px-8 py-3 rounded-xl font-semibold hover:bg-primary hover:text-white transition-smooth hover-lift"
          >
            <span>View All Organizers</span>
            <Icon name="ArrowRight" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOrganizers;