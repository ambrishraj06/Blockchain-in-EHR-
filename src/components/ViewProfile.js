import React, { useState, useEffect } from "react";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewProfile = () => {
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

  const fields = patientDetails ? [
    { label: "Full Name", value: patientDetails.name },
    { label: "Date of Birth", value: patientDetails.dateOfBirth },
    { label: "Gender", value: patientDetails.gender },
    { label: "Blood Group", value: patientDetails.bloodGroup },
    { label: "Address", value: patientDetails.homeAddress },
    { label: "Email", value: patientDetails.email },
    { label: "Wallet", value: patientDetails.walletAddress },
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
                <h1 className="text-2xl font-display font-bold text-white">Patient Profile</h1>
                <p className="text-gray-500 text-sm mt-1">Your personal health information</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
            </div>
            {patientDetails && (
              <div className="space-y-0 rounded-xl overflow-hidden border border-white/5">
                {fields.map((f, i) => (
                  <div key={i} className="data-row">
                    <span className="text-gray-500 text-sm font-medium">{f.label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%] truncate">{f.value}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => navigate(`/patient/${hhNumber}`)} className="btn-secondary w-full mt-8 py-3">
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
