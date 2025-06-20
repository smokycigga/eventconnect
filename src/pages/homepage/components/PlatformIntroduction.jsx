import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PlatformIntroduction = () => {
  const features = [
    {
      icon: "Shield",
      title: "Mediated Booking",
      description: "We handle all communications between you and organizers, ensuring professional service and accountability."
    },
    {
      icon: "Users",
      title: "Verified Professionals",
      description: "All our event organizers are thoroughly vetted and verified for quality and reliability."
    },
    {
      icon: "Clock",
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist with your event planning needs."
    },
    {
      icon: "Star",
      title: "Quality Guarantee",
      description: "We guarantee the quality of service through our comprehensive review and rating system."
    }
  ];

  const trustIndicators = [
    { label: "Events Organized", value: "10,000+", icon: "Calendar" },
    { label: "Happy Customers", value: "8,500+", icon: "Heart" },
    { label: "Verified Organizers", value: "500+", icon: "CheckCircle" },
    { label: "Cities Covered", value: "50+", icon: "MapPin" }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Why Choose EventConnect?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              We're not just another booking platform. EventConnect acts as your trusted intermediary, ensuring every interaction is professional, secure, and results in the perfect event for your special occasion.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Icon name={feature.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop&crop=center"
                alt="Professional event planning"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Professional Event Planning</h3>
                <p className="text-white/90">Every detail matters in creating memorable experiences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-surface rounded-2xl shadow-card p-8">
          <h3 className="text-2xl font-bold text-text-primary text-center mb-8">
            Trusted by Thousands
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={indicator.icon} size={24} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-text-primary mb-2">
                  {indicator.value}
                </div>
                <div className="text-text-secondary text-sm">
                  {indicator.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-12">
            How EventConnect Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Search & Browse",
                description: "Find event organizers in your area using our smart search and filtering system.",
                icon: "Search"
              },
              {
                step: "2",
                title: "Submit Request",
                description: "Fill out our booking form with your event details and preferences.",
                icon: "FileText"
              },
              {
                step: "3",
                title: "We Handle the Rest",
                description: "Our team coordinates with organizers and keeps you updated throughout the process.",
                icon: "CheckCircle"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <Icon name={step.icon} size={32} color="white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                      <Icon name="ArrowRight" size={20} className="text-gray-400" />
                    </div>
                  </div>
                )}
                
                <h4 className="text-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h4>
                <p className="text-text-secondary">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformIntroduction;