import React, { useState, useEffect } from "react";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import Web3 from "web3";
import { useNavigate, useParams } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";

const ViewDoctorProfile = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(DoctorRegistration.abi, DoctorRegistration.networks[networkId]?.address);
        try {
          const result = await contract.methods.getDoctorDetails(hhNumber).call();
          setDoctorDetails(result);
        } catch (e) { console.error("Error:", e); }
      }
    };
    init();
  }, [hhNumber]);

  const fields = doctorDetails ? [
    { label: "Full Name", value: doctorDetails[1] },
    { label: "Hospital", value: doctorDetails[2] },
    { label: "Date of Birth", value: doctorDetails[3] },
    { label: "Gender", value: doctorDetails[4] },
    { label: "Email", value: doctorDetails[5] },
    { label: "Specialization", value: doctorDetails[6] },
    { label: "Department", value: doctorDetails[7] },
    { label: "Designation", value: doctorDetails[8] },
    { label: "Experience", value: `${doctorDetails[9]} years` },
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
                <h1 className="text-2xl font-display font-bold text-white">Doctor Profile</h1>
                <p className="text-gray-500 text-sm mt-1">Your professional credentials</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-white">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            {doctorDetails && (
              <div className="space-y-0 rounded-xl overflow-hidden border border-white/5">
                {fields.map((f, i) => (
                  <div key={i} className="data-row">
                    <span className="text-gray-500 text-sm font-medium">{f.label}</span>
                    <span className="text-white text-sm font-medium text-right max-w-[60%] truncate">{f.value}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => navigate(`/doctor/${hhNumber}`)} className="btn-secondary w-full mt-8 py-3">
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDoctorProfile;
