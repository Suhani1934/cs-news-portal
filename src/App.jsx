import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import MainNavbar from "./components/MainNavbar";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <MainNavbar />

      {/* full width layout */}
      <div className="flex-grow-1 container-fluid mt-4 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
