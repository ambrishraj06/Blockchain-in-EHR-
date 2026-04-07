import React from "react";
import NavBar from "./NavBar";
import heroBg from "../images/hero_bg.png";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
      ),
      title: "Blockchain Security",
      desc: "Tamper-proof records on Ethereum blockchain with smart contract access control.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
      ),
      title: "IPFS File Storage",
      desc: "Decentralized medical file storage via Pinata IPFS for permanent data availability.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
      ),
      title: "Patient Control",
      desc: "Patients own their data — grant and revoke doctor access with one click.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
      ),
      title: "Diagnostic Reports",
      desc: "Labs upload EHR reports directly — visible to patients and authorized doctors.",
    },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/80 to-dark" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-dark/60" />
        </div>

        {/* Animated accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-cyan/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-fadeInUp">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-primary-500 text-sm font-medium">Powered by Ethereum & IPFS</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-fadeInUp" style={{ animationDelay: "0.15s" }}>
              <span className="text-white">Your Health Data,</span>
              <br />
              <span className="gradient-text">Secured Forever</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              A decentralized Electronic Health Records platform built on blockchain technology. Patient-controlled, doctor-accessible, and diagnostic-integrated — with tamper-proof security.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: "0.45s" }}>
              <button
                onClick={() => navigate("/register")}
                className="btn-primary text-lg px-8 py-4 rounded-xl font-semibold"
              >
                Get Started →
              </button>
              <button
                onClick={() => navigate("/login")}
                className="btn-secondary text-lg px-8 py-4 rounded-xl font-semibold"
              >
                Sign In
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
              {[
                { value: "256-bit", label: "Encryption" },
                { value: "100%", label: "Decentralized" },
                { value: "3 Roles", label: "Supported" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-dark-100">
        <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-100" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Why <span className="gradient-text">SecureEHR</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built with cutting-edge decentralized technology to give patients full control
              over their medical records while enabling seamless healthcare collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-card p-6 animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 flex items-center justify-center text-primary-500 mb-5">
                  {f.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Register & Connect", desc: "Create your account as a Patient, Doctor, or Diagnostic Center and connect your MetaMask wallet.", color: "from-primary-500 to-emerald-500" },
              { step: "02", title: "Upload & Manage", desc: "Patients upload medical files to IPFS. Doctors write prescriptions. Diagnostics create EHR reports.", color: "from-accent-cyan to-accent-blue" },
              { step: "03", title: "Control Access", desc: "Patients grant or revoke doctor access at any time. All permissions are managed on-chain.", color: "from-accent-blue to-accent-purple" },
            ].map((item, i) => (
              <div key={i} className="relative glass-card p-8 text-center animate-fadeInUp" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} text-white text-2xl font-display font-bold mb-5`}>
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;