// src/pages/contact-us/index.jsx
import React, { useState } from 'react';

import Icon from 'components/AppIcon';

import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import LocationMap from './components/LocationMap';
import FAQSection from './components/FAQSection';

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Connect with EventConnect Odisha for professional event planning services across Bhubaneswar and surrounding areas. We're here to help make your special moments unforgettable.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span>Serving Bhubaneswar & Odisha</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>Mediated Bookings</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <ContactForm 
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                submitSuccess={submitSuccess}
                setSubmitSuccess={setSubmitSuccess}
              />
            </div>

            {/* Contact Information */}
            <div className="order-1 lg:order-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <LocationMap />

      {/* FAQ Section */}
      <FAQSection />

      {/* Credits Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold">EventConnect Odisha</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Your trusted platform for connecting with professional event organizers across Odisha. We mediate every booking to ensure quality service and peace of mind.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-smooth">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/homepage" className="text-gray-400 hover:text-white transition-smooth">Home</a></li>
                <li><a href="/search-results" className="text-gray-400 hover:text-white transition-smooth">Find Organizers</a></li>
                <li><a href="/contact-us" className="text-gray-400 hover:text-white transition-smooth">Contact Us</a></li>
                <li><a href="/user-dashboard" className="text-gray-400 hover:text-white transition-smooth">My Dashboard</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-smooth">Become an Organizer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} EventConnect Odisha. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Platform developed by <span className="text-primary font-medium">Gorakhnath Samal</span> and <span className="text-primary font-medium">Sumit Kumar Jena</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;