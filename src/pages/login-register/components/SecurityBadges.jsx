// src/pages/login-register/components/SecurityBadges.jsx
import React from 'react';
import Icon from 'components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted and protected'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by thousands across Odisha'
    }
  ];

  const trustSignals = [
    {
      icon: 'Users',
      stat: '5,000+',
      label: 'Active Users'
    },
    {
      icon: 'Calendar',
      stat: '10,000+',
      label: 'Events Organized'
    },
    {
      icon: 'Star',
      stat: '4.8/5',
      label: 'Average Rating'
    }
  ];

  return (
    <div className="space-y-6 mt-8">
      {/* Security Features */}
      <div className="bg-surface border border-gray-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
          Your Security is Our Priority
        </h3>
        
        <div className="space-y-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={feature.icon} size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {feature.title}
                </p>
                <p className="text-xs text-text-muted">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Signals */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
          Trusted Across Odisha
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {trustSignals.map((signal, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={signal.icon} size={20} color="white" />
              </div>
              <p className="text-lg font-bold text-text-primary">
                {signal.stat}
              </p>
              <p className="text-xs text-text-muted">
                {signal.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Policy Links */}
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="#" className="text-text-muted hover:text-primary transition-smooth">
            Privacy Policy
          </a>
          <span className="text-text-muted">•</span>
          <a href="#" className="text-text-muted hover:text-primary transition-smooth">
            Terms of Service
          </a>
          <span className="text-text-muted">•</span>
          <a href="#" className="text-text-muted hover:text-primary transition-smooth">
            Cookie Policy
          </a>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Icon name="MapPin" size={16} className="text-text-muted" />
          <span className="text-xs text-text-muted">
            Proudly serving Bhubaneswar and all of Odisha
          </span>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <Icon name="HelpCircle" size={16} className="text-yellow-600" />
          </div>
          <div className="flex-1">
            <p className="text-yellow-800 text-sm font-medium">
              Need Help?
            </p>
            <p className="text-yellow-700 text-xs">
              Contact our support team for assistance with your account
            </p>
          </div>
          <a
            href="/contact-us"
            className="text-yellow-600 hover:text-yellow-800 transition-smooth"
          >
            <Icon name="ArrowRight" size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;