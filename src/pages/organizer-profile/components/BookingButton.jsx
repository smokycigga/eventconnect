import React from 'react';
import Icon from 'components/AppIcon';

const BookingButton = ({ organizerName, onBookingClick, isMobile = false }) => {
  return (
    <button
      onClick={onBookingClick}
      className={`${
        isMobile ? 'w-full' : 'w-full'
      } bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-smooth hover-lift flex items-center justify-center space-x-2 shadow-lg`}
    >
      <Icon name="Calendar" size={20} />
      <span>Book {organizerName.split(' ')[0]}</span>
    </button>
  );
};

export default BookingButton;