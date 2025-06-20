// src/pages/contact-us/components/FAQSection.jsx
import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      question: 'How does the mediated booking process work?',
      answer: 'EventConnect Odisha acts as a trusted intermediary between clients and event organizers. We verify all organizers, handle booking arrangements, secure payments, and ensure quality service delivery. This protects both parties and guarantees professional service standards.'
    },
    {
      id: 2,
      question: 'Which areas in Odisha do you serve?',
      answer: 'We provide services across all major cities and towns in Odisha, including Bhubaneswar, Cuttack, Puri, Konark, Berhampur, Sambalpur, Rourkela, and surrounding areas. Our network of verified organizers covers the entire state, ensuring quality service wherever your event is planned.'
    },
    {
      id: 3,
      question: 'What types of events can you help organize?',
      answer: 'Our platform connects you with organizers specializing in weddings, corporate events, birthday parties, anniversaries, religious ceremonies, cultural programs, conferences, product launches, and more. We have organizers experienced in both traditional Odia ceremonies and modern event formats.'
    },
    {
      id: 4,
      question: 'How do you ensure the quality of event organizers?',
      answer: 'All organizers on our platform go through a rigorous verification process including background checks, portfolio reviews, client testimonials, and quality assessments. We continuously monitor performance and maintain high standards through regular audits and client feedback.'
    },
    {
      id: 5,
      question: 'What are your platform fees and payment terms?',
      answer: 'Our platform charges a small mediation fee for our services, which covers booking facilitation, quality assurance, and customer support. Payment terms vary by event type and organizer, but we typically require a booking deposit with the balance due before the event. All payments are processed securely through our platform.'
    },
    {
      id: 6,
      question: 'Do you provide emergency support during events?',
      answer: 'Yes, we offer 24/7 emergency support during ongoing events. Our team is available to resolve any issues that may arise, coordinate with organizers, and ensure your event proceeds smoothly. Emergency support contact details are provided with every confirmed booking.'
    },
    {
      id: 7,
      question: 'Can organizers from outside Odisha use your platform?',
      answer: 'Currently, we focus exclusively on serving clients within Odisha with local organizers who understand regional preferences, traditions, and logistics. This ensures authentic cultural representation and better coordination for events across the state.'
    },
    {
      id: 8,
      question: 'How far in advance should I book an event organizer?',
      answer: 'We recommend booking at least 2-4 weeks in advance for smaller events and 2-3 months for larger events like weddings or corporate functions. Popular dates during festival seasons or wedding seasons may require even earlier booking to ensure availability of your preferred organizers.'
    }
  ];

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary">
            Find answers to common questions about EventConnect Odisha's services and booking process
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div key={faq.id} className="bg-surface border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-smooth focus:outline-none focus:bg-gray-50"
              >
                <h3 className="text-lg font-medium text-text-primary pr-4">
                  {faq.question}
                </h3>
                <div className={`transform transition-transform duration-200 flex-shrink-0 ${
                  expandedFAQ === faq.id ? 'rotate-180' : ''
                }`}>
                  <Icon name="ChevronDown" size={20} className="text-text-muted" />
                </div>
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="MessageCircle" size={32} color="white" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">
              Still Have Questions?
            </h3>
            <p className="text-text-secondary mb-6">
              Can't find what you're looking for? Our support team is here to help with any specific questions about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+918765432109"
                className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-smooth hover-lift"
              >
                <Icon name="Phone" size={20} />
                <span>Call Support</span>
              </a>
              <a
                href="mailto:support@eventconnect.odisha.in"
                className="inline-flex items-center justify-center space-x-2 bg-white border-2 border-primary text-primary px-6 py-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-smooth hover-lift"
              >
                <Icon name="Mail" size={20} />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;