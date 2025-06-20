// src/pages/contact-us/components/ContactInfo.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: 'MapPin',
      title: 'Office Address',
      details: [
        'EventFul',
        'Plot No. 123, Saheed Nagar',
        'Bhubaneswar, Odisha 751007',
        'India'
      ],
      action: {
        label: 'Get Directions',
        href: 'https://maps.google.com/?q=Saheed+Nagar+Bhubaneswar+Odisha'
      }
    },
    {
      icon: 'Phone',
      title: 'Phone Numbers',
      details: [
        '+91 674 XXX XXXX (Office)',
        '+91 98765 43210 (Support)',
        '+91 87654 32109 (Emergency)'
      ],
      action: {
        label: 'Call Now',
        href: 'tel:+916747654321'
      }
    },
    {
      icon: 'Mail',
      title: 'Email Addresses',
      details: [
        'info@eventful.odisha.in',
        'support@eventful.odisha.in',
        'partnerships@eventful.odisha.in'
      ],
      action: {
        label: 'Send Email',
        href: 'mailto:info@eventful.odisha.in'
      }
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: 10:00 AM - 4:00 PM',
        'Emergency Support: 24/7'
      ]
    }
  ];

  const serviceAreas = [
    'Bhubaneswar',
    'Cuttack',
    'Puri',
    'Konark',
    'Khordha',
    'Berhampur',
    'Sambalpur',
    'Rourkela'
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Contact Information
        </h2>
        <p className="text-text-secondary mb-6">
          Reach out to us through any of the following channels. We're here to help with all your event planning needs across Odisha.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-6">
        {contactDetails.map((contact, index) => (
          <div key={index} className="bg-surface border border-gray-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name={contact.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {contact.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {contact.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-text-secondary text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {contact.action && (
                  <a
                    href={contact.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium text-sm transition-smooth"
                  >
                    <span>{contact.action.label}</span>
                    <Icon name="ExternalLink" size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Areas */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="MapPin" size={20} className="text-primary" />
          <span>Service Areas in Odisha</span>
        </h3>
        <p className="text-text-secondary text-sm mb-4">
          We provide event planning and coordination services across major cities and towns in Odisha:
        </p>
        <div className="flex flex-wrap gap-2">
          {serviceAreas.map((area, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white text-primary text-sm font-medium rounded-full border border-primary-200"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Emergency Support */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800">
            Emergency Support
          </h3>
        </div>
        <p className="text-red-700 text-sm mb-3">
          For urgent event-related issues or emergencies during ongoing events, contact our 24/7 emergency support line.
        </p>
        <a
          href="tel:+918765432109"
          className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-smooth text-sm"
        >
          <Icon name="Phone" size={16} />
          <span>Call Emergency Line</span>
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;