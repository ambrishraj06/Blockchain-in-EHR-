import React, { useState, useEffect } from "react";
import Web3 from "web3";
import PatientRegistration from "../build/contracts/PatientRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const PatientRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bg, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const networkId = await web3Instance.eth.net.getId();
          const deployedNetwork = PatientRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(PatientRegistration.abi, deployedNetwork && deployedNetwork.address);
          setContract(contractInstance);
          
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) { console.error("User denied access to accounts."); }
      }
    };
    init();
  }, []);

  const handleRegister = async () => {
    if (!walletAddress || !name || !dateOfBirth || !homeAddress || !hhNumber || !gender || !bg || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields."); return;
    }
    if (hhNumber.length !== 6) { alert("Please enter a 6-digit HH Number."); return; }
    if (password.length < 8) { setPassword(""); setConfirmPassword(""); setPasswordError("Password must be at least 8 characters long."); return; }
    if (password !== confirmPassword) { setConfirmPassword(""); setConfirmPasswordError("Passwords do not match."); return; }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(dateOfBirth)) { alert("Please enter a valid date."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setEmailError("Please enter a valid email address."); return; } else { setEmailError(""); }

    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PatientRegistration.networks[networkId];
      if (!deployedNetwork) {
        alert("Contract not deployed on the current network. Please switch MetaMask to the Ganache network (127.0.0.1:7546, Chain ID 1337 or 5777).");
        setIsLoading(false);
        return;
      }
      const contract = new web3.eth.Contract(PatientRegistration.abi, deployedNetwork.address);
      const isRegPatient = await contract.methods.isRegisteredPatient(hhNumber).call();
      if (isRegPatient) { alert("Patient already exists"); setIsLoading(false); return; }
      await contract.methods.registerPatient(walletAddress, name, dateOfBirth, gender, bg, homeAddress, email, hhNumber, password).send({ from: walletAddress });
      alert("Patient registered successfully!");
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
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 flex items-center justify-center text-white shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Patient Registration</h2>
                <p className="text-gray-500 text-sm">Create your healthcare account</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Wallet Address</label>
                <input type="text" placeholder="0x..." value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} className="input-premium font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date of Birth</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-premium">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Blood Group</label>
                <select value={bg} onChange={(e) => setBloodGroup(e.target.value)} className="input-premium">
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Home Address</label>
                <input type="text" placeholder="Enter your home address" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  className={`input-premium ${emailError ? "border-red-500/50" : ""}`} />
                {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">HH Number</label>
                <input type="text" placeholder="6-digit HH Number" value={hhNumber} onChange={handlehhNumberChange} maxLength={6}
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
                {isLoading ? <span className="flex items-center justify-center gap-2"><span className="spinner w-5 h-5 border-2" />Registering...</span> : "Register Patient"}
              </button>
              <button onClick={() => navigate("/")} className="btn-secondary px-6 py-3">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRegistry;
