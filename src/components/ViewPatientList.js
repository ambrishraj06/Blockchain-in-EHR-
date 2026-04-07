import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";

const ViewPatientList = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        if (!window.ethereum) return;
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(DoctorRegistration.abi, DoctorRegistration.networks[networkId]?.address);
        const list = await contract.methods.getPatientList(hhNumber).call();
        setPatients(list);
      } catch (e) { console.error("Error:", e); }
      setLoading(false);
    };
    load();
  }, [hhNumber]);

  const handleRevoke = async (patientNumber) => {
    if (!window.confirm(`Revoke access for patient ${patientNumber}?`)) return;
    setRevoking(patientNumber);
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(DoctorRegistration.abi, DoctorRegistration.networks[networkId]?.address);
      await contract.methods.revokePermission(patientNumber, hhNumber).send({ from: accounts[0] });
      setPatients((prev) => prev.filter((p) => p.patient_number !== patientNumber));
      alert("Access revoked successfully!");
    } catch (e) {
      console.error("Revoke error:", e);
      alert("Failed to revoke: " + e.message);
    }
    setRevoking(null);
  };

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="max-w-5xl mx-auto pt-28 pb-16 px-4">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Patient List</h1>
          <p className="text-gray-400">Patients who have granted you access to their records</p>
        </div>

        <div className="glass-card p-8 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <span className="spinner" />
            </div>
          ) : patients.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <p className="text-gray-500 mb-1">No patients have granted you access yet</p>
              <p className="text-gray-600 text-sm">Patients can grant access from their records page</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patients.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-primary-500/20 transition-all duration-300 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 flex items-center justify-center">
                      <span className="text-lg font-display font-bold text-primary-500">{p.patient_name?.[0] || "P"}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{p.patient_name || "Unknown"}</p>
                      <p className="text-gray-500 text-sm font-mono">HH: {p.patient_number}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => navigate(`/doctor/${hhNumber}/viewpatient/${p.patient_number}`)}
                      className="px-4 py-2 rounded-lg bg-primary-500/10 text-primary-500 text-sm font-medium border border-primary-500/20 hover:bg-primary-500/20 transition-all">
                      View Records
                    </button>
                    <button onClick={() => handleRevoke(p.patient_number)} disabled={revoking === p.patient_number}
                      className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm font-medium border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50">
                      {revoking === p.patient_number ? "..." : "Revoke"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => navigate(`/doctor/${hhNumber}`)} className="btn-secondary mt-8 py-3 px-6">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewPatientList;
