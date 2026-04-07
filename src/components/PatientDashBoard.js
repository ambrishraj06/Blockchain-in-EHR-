import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";

const PatientDashBoard = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(PatientRegistration.abi, PatientRegistration.networks[networkId]?.address);
        try {
          const result = await contract.methods.getPatientDetails(hhNumber).call();
          setPatientDetails(result);
        } catch (e) { console.error("Error:", e); }
      }
    };
    init();
  }, [hhNumber]);

  const cards = [
    { title: "View Profile", desc: "See your personal information and medical details", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>), path: `/patient/${hhNumber}/viewprofile`, gradient: "from-primary-500 to-emerald-500" },
    { title: "My Records", desc: "View uploaded medical records and IPFS files", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>), path: `/patient/${hhNumber}/viewrecords`, gradient: "from-accent-cyan to-accent-blue" },
    { title: "Upload Records", desc: "Upload new medical files to IPFS storage", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>), path: `/patient/${hhNumber}/viewrecords`, gradient: "from-accent-blue to-accent-purple" },
    { title: "Grant Access", desc: "Manage which doctors can view your records", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>), path: `/patient/${hhNumber}/viewrecords`, gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="min-h-screen flex flex-col items-center pt-28 pb-16 px-4">
        {/* Welcome */}
        <div className="text-center mb-14 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-primary-500 text-sm font-medium">Patient Portal</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Welcome{patientDetails ? <>, <span className="gradient-text">{patientDetails.name}</span></> : ""}!
          </h1>
          <p className="text-gray-400">Manage your health records securely on the blockchain</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl w-full">
          {cards.map((card, i) => (
            <button key={i} onClick={() => navigate(card.path)}
              className="glass-card p-6 text-left group animate-fadeInUp cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-display font-semibold text-white mb-1 group-hover:text-primary-500 transition-colors">{card.title}</h3>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashBoard;
