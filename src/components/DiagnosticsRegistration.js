import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DiagnosticRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [diagnosticAddress, setDiagnosticAddress] = useState("");
  const [diagnosticName, setDiagnosticName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [diagnosticLocation, setDiagnosticLocation] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = DiagnosticRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(DiagnosticRegistration.abi, deployedNetwork && deployedNetwork.address);
          setContract(contractInstance);
          
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setDiagnosticAddress(accounts[0]);
          }
        } catch (error) { console.error("User denied access to accounts."); }
      }
    };
    init();
  }, []);

  const handleRegister = async () => {
    if (!diagnosticAddress || !diagnosticName || !hospitalName || !diagnosticLocation || !email || !hhNumber || !password || !confirmPassword) {
      alert("Please fill in all required fields."); return;
    }
    if (password.length < 8) { setPassword(""); setConfirmPassword(""); setPasswordError("Password must be at least 8 characters long."); return; }
    if (password !== confirmPassword) { setConfirmPassword(""); setConfirmPasswordError("Passwords do not match."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setEmailError("Please enter a valid email address."); return; } else { setEmailError(""); }

    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DiagnosticRegistration.networks[networkId];
      if (!deployedNetwork) {
        alert("Contract not deployed on the current network. Please switch MetaMask to the Ganache network (127.0.0.1:7546, Chain ID 1337 or 5777).");
        setIsLoading(false);
        return;
      }
      const contract = new web3.eth.Contract(DiagnosticRegistration.abi, deployedNetwork.address);
      const isRegDoc = await contract.methods.isRegisteredDiagnostic(hhNumber).call();
      if (isRegDoc) { alert("Diagnostic center already exists"); setIsLoading(false); return; }
      await contract.methods.registerDiagnostic(diagnosticName, hospitalName, diagnosticLocation, email, hhNumber, password).send({ from: diagnosticAddress });
      alert("Diagnostic center registered successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed: " + (error.message || "Unknown error"));
    }
    setIsLoading(false);
  };

  const handlehhNumberChange = (e) => {
    const val = e.target.value;
    sethhNumber(val);
    sethhNumberError(/^\d{6}$/.test(val) ? "" : "Please enter a 6-digit HH Number.");
  };

  return (
    <div className="min-h-screen bg-dark">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-2xl animate-fadeInUp">
          <div className="glass-card p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Diagnostic Registration</h2>
                <p className="text-gray-500 text-sm">Register your diagnostic center</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Wallet Address</label>
                <input type="text" placeholder="0x..." value={diagnosticAddress} onChange={(e) => setDiagnosticAddress(e.target.value)} className="input-premium font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Center Name</label>
                <input type="text" placeholder="Diagnostic center name" value={diagnosticName} onChange={(e) => setDiagnosticName(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Hospital Name</label>
                <input type="text" placeholder="Hospital name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
                <input type="text" placeholder="Center location" value={diagnosticLocation} onChange={(e) => setDiagnosticLocation(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" placeholder="Email address" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  className={`input-premium ${emailError ? "border-red-500/50" : ""}`} />
                {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">HH Number</label>
                <input type="text" placeholder="6-digit number" value={hhNumber} onChange={handlehhNumberChange} maxLength={6}
                  className={`input-premium ${hhNumberError ? "border-red-500/50" : ""}`} />
                {hhNumberError && <p className="text-red-400 text-xs mt-1">{hhNumberError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                <input type="password" placeholder="Min 8 characters" value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                  className={`input-premium ${passwordError ? "border-red-500/50" : ""}`} />
                {passwordError && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password</label>
                <input type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setConfirmPasswordError(""); }}
                  className={`input-premium ${confirmPasswordError ? "border-red-500/50" : ""}`} />
                {confirmPasswordError && <p className="text-red-400 text-xs mt-1">{confirmPasswordError}</p>}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={handleRegister} disabled={isLoading} className="btn-primary flex-1 py-3 text-base disabled:opacity-50">
                {isLoading ? <span className="flex items-center justify-center gap-2"><span className="spinner w-5 h-5 border-2" />Registering...</span> : "Register Center"}
              </button>
              <button onClick={() => navigate("/")} className="btn-secondary px-6 py-3">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticRegistry;
