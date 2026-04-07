import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo_new.jpg";

const NavBar_Logout = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 to-accent-cyan/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                className="h-12 w-auto rounded-lg relative z-10 transition-transform duration-300 group-hover:scale-105"
                src={logo}
                alt="SecureEHR Logo"
              />
            </div>
            <span className="text-xl font-display font-bold tracking-tight hidden md:block">
              <span className="gradient-text">Secure</span>
              <span className="text-white">EHR</span>
            </span>
          </div>

          {/* Title */}
          <div className="hidden lg:block">
            <span className="text-lg text-gray-400 font-medium">
              Secure Electronic Health Records
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-medium text-sm transition-all duration-300 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-300 hover:shadow-lg hover:shadow-red-500/10"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar_Logout;
