import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";

const DiagnosticDashBoard = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [diagnosticDetails, setDiagnosticDetails] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const web3 = new Web3(window.ethereum);
          const networkId = await web3.eth.net.getId();
          const contract = new web3.eth.Contract(DiagnosticRegistration.abi, DiagnosticRegistration.networks[networkId]?.address);
          const result = await contract.methods.getDiagnosticDetails(hhNumber).call();
          setDiagnosticDetails(result);
        } catch (e) { console.error("Error:", e); }
      }
    };
    init();
  }, [hhNumber]);

  const cards = [
    { title: "View Profile", desc: "See your diagnostic center details and credentials", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>), path: `/diagnostic/${hhNumber}/viewdiagnosticprofile`, gradient: "from-accent-blue to-accent-purple" },
    { title: "Create Report", desc: "Upload a new EHR diagnostic report to IPFS", icon: (<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>), path: `/diagnostic/${hhNumber}/diagnosticform`, gradient: "from-primary-500 to-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="min-h-screen flex flex-col items-center pt-28 pb-16 px-4">
        <div className="text-center mb-14 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-purple/10 border border-accent-purple/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
            <span className="text-accent-purple text-sm font-medium">Diagnostic Portal</span>
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Welcome{diagnosticDetails ? <>, <span className="gradient-text">{diagnosticDetails[1]}</span></> : ""}!
          </h1>
          <p className="text-gray-400">Upload diagnostic reports and manage EHR documents</p>
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

export default DiagnosticDashBoard;
