import React, { useState } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import UploadEhr from "../build/contracts/UploadEhr.json";
import { uploadToPinata, isPinataConfigured } from "../pinata";

const DiagnosticForm = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recordId: "", doctorName: "", patientName: "", patientHH: "", age: "",
    gender: "", bloodGroup: "", patientAddress: "",
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const { recordId, doctorName, patientName, patientHH, age, gender, bloodGroup, patientAddress } = formData;
    if (!recordId || !doctorName || !patientName || !patientHH || !age || !gender || !bloodGroup || !patientAddress) {
      alert("Please fill in all fields."); return;
    }
    if (patientHH.length !== 6) { alert("Please enter a valid 6-digit Patient HH Number."); return; }
    if (!file) { alert("Please upload a diagnostic report file."); return; }
    if (!isPinataConfigured()) { alert("Please configure Pinata API keys in .env file."); return; }

    setSubmitting(true);
    setStatus("Uploading report to IPFS via Pinata...");
    try {
      const cid = await uploadToPinata(file);
      setStatus("Saving record on blockchain...");
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();

      // Save to UploadEhr contract so patient can view it
      if (UploadEhr.networks[networkId]) {
        const uploadContract = new web3.eth.Contract(UploadEhr.abi, UploadEhr.networks[networkId].address);
        const timestamp = new Date().toISOString();
        await uploadContract.methods.addRecord(patientHH, timestamp, cid).send({ from: accounts[0] });
      } else {
        throw new Error("UploadEhr contract not deployed on this network.");
      }

      setStatus("✓ EHR Report created and linked to patient successfully!");
      setFormData({ recordId: "", doctorName: "", patientName: "", patientHH: "", age: "", gender: "", bloodGroup: "", patientAddress: "" });
      setFile(null);
    } catch (e) {
      console.error("Error:", e);
      setStatus("✗ Failed: " + e.message);
    }
    setSubmitting(false);
  };

  const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]); };

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="max-w-3xl mx-auto pt-28 pb-16 px-4">
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Create EHR Report</h1>
          <p className="text-gray-400">Upload a diagnostic report to IPFS and store the record on blockchain</p>
        </div>

        <div className="glass-card p-8 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "Record ID", name: "recordId", placeholder: "e.g., RPT-001", type: "text" },
              { label: "Doctor Name", name: "doctorName", placeholder: "Referring doctor name", type: "text" },
              { label: "Patient Name", name: "patientName", placeholder: "Patient full name", type: "text" },
              { label: "Patient HH Number", name: "patientHH", placeholder: "6-digit HH Number", type: "text", maxLength: 6 },
              { label: "Age", name: "age", placeholder: "Patient age", type: "number" },
            ].map((f) => (
              <div key={f.name}>
                <label className="block text-sm font-medium text-gray-400 mb-2">{f.label}</label>
                <input type={f.type} name={f.name} placeholder={f.placeholder} value={formData[f.name]} onChange={handleChange} maxLength={f.maxLength} className="input-premium" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="input-premium">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Blood Group</label>
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input-premium">
                <option value="">Select Blood Group</option>
                {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Patient Wallet Address</label>
              <input type="text" name="patientAddress" placeholder="0x..." value={formData.patientAddress} onChange={handleChange} className="input-premium font-mono text-sm" />
            </div>
          </div>

          {/* File Upload */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Diagnostic Report File</label>
            <div className={`dropzone ${dragActive ? "active" : ""}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => document.getElementById("diag-file").click()}>
              <input id="diag-file" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
              {file ? (
                <div><p className="text-white font-medium">{file.name}</p><p className="text-gray-500 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</p></div>
              ) : (
                <div>
                  <svg className="w-10 h-10 mx-auto text-primary-500/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <p className="text-gray-400 text-sm">Drop report file or <span className="text-primary-500">browse</span></p>
                </div>
              )}
            </div>
          </div>

          {status && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${status.includes("✓") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : status.includes("✗") ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"}`}>
              {status}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            <button onClick={handleSubmit} disabled={submitting} className="btn-primary flex-1 py-3 text-base disabled:opacity-50">
              {submitting ? <span className="flex items-center justify-center gap-2"><span className="spinner w-5 h-5 border-2" />Processing...</span> : "Create EHR Report"}
            </button>
            <button onClick={() => navigate(`/diagnostic/${hhNumber}`)} className="btn-secondary px-6 py-3">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticForm;
