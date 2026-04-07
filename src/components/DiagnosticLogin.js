import React, { useState } from "react";
import Web3 from "web3";
import DiagnosticRegistration from "../build/contracts/DiagnosticRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DiagnosticLogin = () => {
  const navigate = useNavigate();
  const [hhNumberError, sethhNumberError] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlehhNumberChange = (e) => {
    const val = e.target.value;
    sethhNumber(val);
    sethhNumberError(/^\d{6}$/.test(val) ? "" : "Please enter a 6-digit HH Number.");
  };

  const handleCheckRegistration = async () => {
    if (!hhNumber || !password) { alert("Please fill in all fields."); return; }
    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(DiagnosticRegistration.abi, DiagnosticRegistration.networks[networkId].address);
      const isReg = await contract.methods.isRegisteredDiagnostic(hhNumber).call();
      if (isReg) {
        const valid = await contract.methods.validatePassword(hhNumber, password).call();
        if (valid) { navigate("/diagnostic/" + hhNumber); }
        else { alert("Incorrect password"); }
      } else { alert("Diagnostic not registered"); }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while checking registration.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="w-full max-w-md animate-fadeInUp">
          <div className="glass-card p-10">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-white text-center mb-8">Diagnostic Login</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">HH Number</label>
                <input type="text" placeholder="Enter 6-digit HH Number" value={hhNumber} onChange={handlehhNumberChange}
                  className={`input-premium ${hhNumberError ? "border-red-500/50" : ""}`} />
                {hhNumberError && <p className="text-red-400 text-xs mt-1">{hhNumberError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-premium" />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={handleCheckRegistration} disabled={isLoading} className="btn-primary flex-1 py-3 text-base disabled:opacity-50">
                {isLoading ? <span className="flex items-center justify-center gap-2"><span className="spinner w-5 h-5 border-2" />Verifying...</span> : "Login"}
              </button>
              <button onClick={() => navigate("/")} className="btn-secondary px-6 py-3">Cancel</button>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            Don't have an account?{" "}
            <button onClick={() => navigate("/diagnostic_registration")} className="text-primary-500 hover:text-primary-400 font-medium">Register</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticLogin;
