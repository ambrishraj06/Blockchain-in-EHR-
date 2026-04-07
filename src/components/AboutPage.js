import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import hospitalImage from "../images/hospital.png";

const AboutUs = () => {
  const navigate = useNavigate();

  const features = [
    { icon: "🔐", title: "Blockchain Security", desc: "All records are stored on Ethereum blockchain, making them tamper-proof and immutable." },
    { icon: "🌐", title: "Decentralized Storage", desc: "Medical files are stored on IPFS via Pinata Cloud — no single point of failure." },
    { icon: "🔑", title: "Patient Control", desc: "Patients fully own their data. Grant or revoke doctor access with one click." },
    { icon: "📋", title: "EHR Reports", desc: "Diagnostic centers upload structured EHR reports directly visible to patients and doctors." },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
                <span className="text-primary-500 text-sm font-medium">About SecureEHR</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Revolutionizing <span className="gradient-text">Healthcare Data</span> Management
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                We are a dedicated team of healthcare professionals and technologists committed to
                revolutionizing Electronic Health Records management. Our platform leverages
                Ethereum blockchain for secure data storage and smart contracts for access control.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Using key technologies — blockchain for transparency, Ganache for development,
                MetaMask for seamless interaction, and IPFS for decentralized file storage —
                we ensure enhanced security, improved accessibility, and complete patient control.
              </p>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              <div className="glass-card overflow-hidden">
                <img src={hospitalImage} alt="Hospital" className="w-full h-auto opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
            Who We <span className="gradient-text">Serve</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { role: "Doctors", desc: "Access patient lists, view medical records and history, write treatment plans and prescriptions for patients.", icon: "🩺" },
              { role: "Patients", desc: "View your medical records, upload new documents to IPFS, and grant or revoke doctor access at any time.", icon: "❤️" },
              { role: "Diagnostic Centers", desc: "Create EHR reports with uploaded diagnostic files, visible to both patients and authorized doctors.", icon: "🔬" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 text-center animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-4xl block mb-4">{item.icon}</span>
                <h3 className="text-xl font-display font-semibold text-white mb-3">For {item.role}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">
            Key <span className="gradient-text">Features</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-5 animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-3xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="text-lg font-display font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-2xl mx-auto text-center px-4">

          <div className="mt-10">
            <button onClick={() => navigate("/")} className="btn-primary px-8 py-3">
              ← Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
