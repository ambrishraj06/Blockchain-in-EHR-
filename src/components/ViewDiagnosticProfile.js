import React, { useState, useEffect } from "react";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewDiagnosticProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(DiagnosticRegistration.abi, DiagnosticRegistration.networks[networkId]?.address);
        try {
          const result = await contract.methods.getDiagnosticDetails(hhNumber).call();
          setDetails(result);
        } catch (e) { console.error("Error:", e); }
      }
    };
    init();
  }, [hhNumber]);

  const fields = details ? [
    { label: "Center Name", value: details[1] },
    { label: "Hospital", value: details[2] },
    { label: "Location", value: details[3] },
    { label: "Email", value: details[4] },
    { label: "HH Number", value: hhNumber },
  ] : [];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-2xl animate-fadeInUp">
          <div className="glass-card p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-display font-bold text-white">Diagnostic Profile</h1>
                <p className="text-gray-500 text-sm mt-1">Center information and details</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
            </div>
            {details && (
              <div className="space-y-0 rounded-xl overflow-hidden border border-white/5">
                {fields.map((f, i) => (
                  <div key={i} className="data-row">
                    <span className="text-gray-500 text-sm font-medium">{f.label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%] truncate">{f.value}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => navigate(`/diagnostic/${hhNumber}`)} className="btn-secondary w-full mt-8 py-3">
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDiagnosticProfile;
