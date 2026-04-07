import React, { useState } from "react";
import Web3 from "web3";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DoctorLogin = () => {
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
      const contract = new web3.eth.Contract(DoctorRegistration.abi, DoctorRegistration.networks[networkId].address);
      const isReg = await contract.methods.isRegisteredDoctor(hhNumber).call();
      if (isReg) {
        const valid = await contract.methods.validatePassword(hhNumber, password).call();
        if (valid) { navigate("/doctor/" + hhNumber); }
        else { alert("Incorrect password"); }
      } else { alert("Doctor not registered"); }
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
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-white text-center mb-8">Doctor Login</h2>
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
            <button onClick={() => navigate("/doctor_registration")} className="text-primary-500 hover:text-primary-400 font-medium">Register</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
