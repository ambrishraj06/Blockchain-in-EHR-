import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";

const DoctorDashBoardPage = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          const networkId = await web3.eth.net.getId();
          const contract = new web3.eth.Contract(DoctorRegistration.abi, DoctorRegistration.networks[networkId]?.address);
          const result = await contract.methods.getDoctorDetails(hhNumber).call();
          setDoctorDetails(result);
        } catch (e) { console.error("Error:", e); }
      }
    };
    init();
  }, [hhNumber]);

  const cards = [
    { title: "View Profile", desc: "See your professional information and credentials", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>), path: `/doctor/${hhNumber}/viewdoctorprofile`, gradient: "from-accent-cyan to-accent-blue" },
    { title: "Patient List", desc: "View patients who have granted you access", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>), path: `/doctor/${hhNumber}/patientlist`, gradient: "from-primary-500 to-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="min-h-screen flex flex-col items-center pt-28 pb-16 px-4">
        <div className="text-center mb-14 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-accent-cyan text-sm font-medium">Doctor Portal</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Welcome{doctorDetails ? <>, <span className="gradient-text">{doctorDetails[1]}</span></> : ""}!
          </h1>
          <p className="text-gray-400">Access patient records and manage your practice</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
          {cards.map((card, i) => (
            <button key={i} onClick={() => navigate(card.path)}
              className="glass-card p-8 text-left group animate-fadeInUp cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-primary-500 transition-colors">{card.title}</h3>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashBoardPage;
