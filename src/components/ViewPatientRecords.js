import React, { useState, useEffect, useCallback } from "react";
import Web3 from "web3";
import { useParams, useNavigate } from "react-router-dom";
import NavBar_Logout from "./NavBar_Logout";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import UploadEhr from "../build/contracts/UploadEhr.json";
import { uploadToPinata, getIPFSUrl, isPinataConfigured } from "../pinata";

const ViewPatientRecords = () => {
  const { hhNumber } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [doctorHH, setDoctorHH] = useState("");
  const [grantLoading, setGrantLoading] = useState(false);
  const [patientDetails, setPatientDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("records");
  const [dragActive, setDragActive] = useState(false);

  const loadRecords = useCallback(async () => {
    try {
      if (!window.ethereum) return;
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      if (UploadEhr.networks[networkId]) {
        const contract = new web3.eth.Contract(UploadEhr.abi, UploadEhr.networks[networkId].address);
        const recs = await contract.methods.getRecords(hhNumber).call();
        setRecords(recs);
      }
      const patientContract = new web3.eth.Contract(PatientRegistration.abi, PatientRegistration.networks[networkId].address);
      const details = await patientContract.methods.getPatientDetails(hhNumber).call();
      setPatientDetails(details);
    } catch (e) { console.error("Error loading records:", e); }
  }, [hhNumber]);

  useEffect(() => { loadRecords(); }, [loadRecords]);

  const handleUpload = async () => {
    if (!file) { alert("Please select a file first."); return; }
    if (!isPinataConfigured()) { alert("Please configure Pinata API keys in your .env file."); return; }
    setUploading(true);
    setUploadStatus("Uploading to IPFS via Pinata...");
    try {
      const cid = await uploadToPinata(file);
      setUploadStatus("Saving record on blockchain...");
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      if (UploadEhr.networks[networkId]) {
        const contract = new web3.eth.Contract(UploadEhr.abi, UploadEhr.networks[networkId].address);
        const timestamp = new Date().toISOString();
        await contract.methods.addRecord(hhNumber, timestamp, cid).send({ from: accounts[0] });
      }
      setUploadStatus("✓ File uploaded successfully!");
      setFile(null);
      loadRecords();
      setTimeout(() => setUploadStatus(""), 3000);
    } catch (e) {
      console.error("Upload error:", e);
      setUploadStatus("✗ Upload failed: " + e.message);
    }
    setUploading(false);
  };

  const handleGrantAccess = async () => {
    if (!doctorHH || doctorHH.length !== 6) { alert("Please enter a valid 6-digit Doctor HH Number."); return; }
    setGrantLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const name = patientDetails ? patientDetails.name : "Patient";
      // Grant on DoctorRegistration so doctor can see patient in their list
      const doctorContract = new web3.eth.Contract(DoctorRegistration.abi, DoctorRegistration.networks[networkId].address);
      await doctorContract.methods.grantPermission(hhNumber, doctorHH, name).send({ from: accounts[0] });
      alert("Access granted to doctor " + doctorHH + " successfully!");
      setDoctorHH("");
    } catch (e) {
      console.error("Grant error:", e);
      alert("Failed to grant access: " + (e.message || "Unknown error"));
    }
    setGrantLoading(false);
  };

  const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(e.type === "dragenter" || e.type === "dragover"); };
  const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]); };

  const tabs = [
    { id: "records", label: "Medical Records", icon: "📋" },
    { id: "upload", label: "Upload Files", icon: "📤" },
    { id: "access", label: "Grant Access", icon: "🔑" },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar_Logout />
      <div className="max-w-5xl mx-auto pt-28 pb-16 px-4">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-3xl font-display font-bold text-white mb-2">Health Records</h1>
          <p className="text-gray-400">View, upload, and manage your medical records</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary-500/15 text-primary-500 border border-primary-500/30"
                  : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
              }`}>
              <span className="mr-2">{tab.icon}</span>{tab.label}
            </button>
          ))}
        </div>

        {/* Records Tab */}
        {activeTab === "records" && (
          <div className="glass-card p-8 animate-fadeInUp">
            <h2 className="text-xl font-display font-semibold text-white mb-6">
              Your Medical Records
              <span className="ml-3 badge badge-success">{records.length} files</span>
            </h2>
            {records.length === 0 ? (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="text-gray-500 mb-2">No records uploaded yet</p>
                <button onClick={() => setActiveTab("upload")} className="text-primary-500 text-sm hover:text-primary-400">Upload your first file →</button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date & Time</th>
                      <th>IPFS CID</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i}>
                        <td className="font-mono text-primary-500">{i + 1}</td>
                        <td>{r.timeStamp || "N/A"}</td>
                        <td className="font-mono text-xs max-w-[200px] truncate">{r.medicalRecordHash}</td>
                        <td>
                          <a href={getIPFSUrl(r.medicalRecordHash)} target="_blank" rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-400 text-sm font-medium transition-colors">
                            View File ↗
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="glass-card p-8 animate-fadeInUp">
            <h2 className="text-xl font-display font-semibold text-white mb-6">Upload Medical File</h2>
            <div
              className={`dropzone ${dragActive ? "active" : ""}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => document.getElementById("file-input").click()}
            >
              <input id="file-input" type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
              <svg className="w-12 h-12 mx-auto text-primary-500/50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              {file ? (
                <div>
                  <p className="text-white font-medium">{file.name}</p>
                  <p className="text-gray-500 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-400 mb-1">Drag & drop your file here, or <span className="text-primary-500">browse</span></p>
                  <p className="text-gray-600 text-xs">PDF, JPG, PNG, DOC (Max 100MB)</p>
                </div>
              )}
            </div>

            {uploadStatus && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${uploadStatus.includes("✓") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : uploadStatus.includes("✗") ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"}`}>
                {uploadStatus}
              </div>
            )}

            <button onClick={handleUpload} disabled={!file || uploading}
              className="btn-primary w-full mt-6 py-3 text-base disabled:opacity-50">
              {uploading ? <span className="flex items-center justify-center gap-2"><span className="spinner w-5 h-5 border-2" />Uploading...</span> : "Upload to IPFS"}
            </button>

            {!isPinataConfigured() && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-400 text-sm font-medium mb-1">⚠ Pinata Not Configured</p>
                <p className="text-amber-400/70 text-xs">Create a free account at pinata.cloud, then add your API keys to the .env file.</p>
              </div>
            )}
          </div>
        )}

        {/* Grant Access Tab */}
        {activeTab === "access" && (
          <div className="glass-card p-8 animate-fadeInUp">
            <h2 className="text-xl font-display font-semibold text-white mb-2">Grant Doctor Access</h2>
            <p className="text-gray-400 text-sm mb-6">Allow a doctor to view your medical records by entering their HH Number.</p>
            <div className="flex gap-3">
              <input type="text" placeholder="Enter Doctor's 6-digit HH Number" value={doctorHH}
                onChange={(e) => setDoctorHH(e.target.value)} className="input-premium flex-1" maxLength={6} />
              <button onClick={handleGrantAccess} disabled={grantLoading}
                className="btn-primary px-6 whitespace-nowrap disabled:opacity-50">
                {grantLoading ? "Granting..." : "Grant Access"}
              </button>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-sm font-medium text-gray-400 mb-2">How it works:</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> Enter the doctor's 6-digit HH Number</li>
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> Confirm the transaction in MetaMask</li>
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> The doctor can now view your records in their patient list</li>
                <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">•</span> You can revoke access at any time</li>
              </ul>
            </div>
          </div>
        )}

        <button onClick={() => navigate(`/patient/${hhNumber}`)} className="btn-secondary mt-8 py-3 px-6">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ViewPatientRecords;
