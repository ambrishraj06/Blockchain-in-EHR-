import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import UploadEhr from "../build/contracts/UploadEhr.json";
import { getIPFSUrl } from "../pinata";

const DoctorViewPatient = () => {
  const { hhNumber, patientHH } = useParams();
  const navigate = useNavigate();
  const [patientDetails, setPatientDetails] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) return;
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      try {
        const patientContract = new web3.eth.Contract(PatientRegistration.abi, PatientRegistration.networks[networkId]?.address);
        const details = await patientContract.methods.getPatientDetails(patientHH || hhNumber).call();
        setPatientDetails(details);
        if (UploadEhr.networks[networkId]) {
          const uploadContract = new web3.eth.Contract(UploadEhr.abi, UploadEhr.networks[networkId].address);
          const recs = await uploadContract.methods.getRecords(patientHH || hhNumber).call();
          setRecords(recs);
        }
      } catch (e) { console.error("Error:", e); }
    };
    init();
  }, [hhNumber, patientHH]);

  const fields = patientDetails ? [
    { label: "Name", value: patientDetails.name },
    { label: "DOB", value: patientDetails.dateOfBirth },
    { label: "Gender", value: patientDetails.gender },
    { label: "Blood Group", value: patientDetails.bloodGroup },
    { label: "Email", value: patientDetails.email },
  ] : [];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="max-w-5xl mx-auto pt-28 pb-16 px-4">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Patient Record View</h1>
          <p className="text-gray-400">Viewing medical records for authorized patient</p>
        </div>

        {/* Patient Info */}
        {patientDetails && (
          <div className="glass-card p-6 mb-6 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-lg font-display font-semibold text-white mb-4">Patient Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {fields.map((f, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/[0.03]">
                  <p className="text-gray-500 text-xs mb-1">{f.label}</p>
                  <p className="text-white text-sm font-medium">{f.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Records */}
        <div className="glass-card p-6 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-display font-semibold text-white mb-4">
            Medical Records <span className="ml-2 badge badge-success">{records.length}</span>
          </h2>
          {records.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No records available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="premium-table">
                <thead><tr><th>#</th><th>Date</th><th>IPFS CID</th><th>Action</th></tr></thead>
                <tbody>
                  {records.map((r, i) => (
                    <tr key={i}>
                      <td className="font-mono text-primary-500">{i + 1}</td>
                      <td>{r.timeStamp}</td>
                      <td className="font-mono text-xs max-w-[200px] truncate">{r.medicalRecordHash}</td>
                      <td><a href={getIPFSUrl(r.medicalRecordHash)} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 text-sm font-medium">View ↗</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <button onClick={() => navigate(-1)} className="btn-secondary mt-8 py-3 px-6">← Back</button>
      </div>
    </div>
  );
};

export default DoctorViewPatient;
