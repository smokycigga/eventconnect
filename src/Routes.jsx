import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import Homepage from "pages/homepage";
import SearchResults from "pages/search-results";
import OrganizerProfile from "pages/organizer-profile";
import BookingForm from "pages/booking-form";
import BookingConfirmation from "pages/booking-confirmation";
import UserDashboard from "pages/user-dashboard";
import ContactUs from "pages/contact-us";
import LoginRegister from "pages/login-register";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Header />
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/organizer-profile" element={<OrganizerProfile />} />
          <Route path="/booking-form" element={<BookingForm />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login-register" element={<LoginRegister />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;