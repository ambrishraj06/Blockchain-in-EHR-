import React, { useState, useEffect } from "react";
import Web3 from "web3";
import DoctorRegistration from "../build/contracts/DoctorRegistration.json";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const DoctorRegistry = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [doctorAddress, setDoctorAddress] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalLocation, setHospitalLocation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [hhNumber, sethhNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [workExperience, setWorkExperience] = useState("");
  const [hhNumberError, sethhNumberError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
          const deployedNetwork = DoctorRegistration.networks[networkId];
          const contractInstance = new web3Instance.eth.Contract(DoctorRegistration.abi, deployedNetwork && deployedNetwork.address);
          setContract(contractInstance);
          
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setDoctorAddress(accounts[0]);
          }
        } catch (error) { console.error("User denied access to accounts."); }
      }
    };
    init();
  }, []);

  const handleRegister = async () => {
    if (!doctorAddress || !doctorName || !hospitalName || !hospitalLocation || !dateOfBirth || !gender || !email || !hhNumber || !specialization || !department || !designation || !workExperience || !password || !confirmPassword) {
      alert("Please fill in all required fields."); return;
    }
    if (hhNumber.length !== 6) { alert("Please enter a 6-digit HH Number."); return; }
    if (password.length < 8) { setPassword(""); setConfirmPassword(""); setPasswordError("Password must be at least 8 characters long."); return; }
    if (password !== confirmPassword) { setConfirmPassword(""); setConfirmPasswordError("Passwords do not match."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { setEmailError("Please enter a valid email address."); return; } else { setEmailError(""); }

    setIsLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DoctorRegistration.networks[networkId];
      if (!deployedNetwork) {
        alert("Contract not deployed on the current network. Please switch MetaMask to the Ganache network (127.0.0.1:7546, Chain ID 1337 or 5777).");
        setIsLoading(false);
        return;
      }
      const contract = new web3.eth.Contract(DoctorRegistration.abi, deployedNetwork.address);
      const isRegDoc = await contract.methods.isRegisteredDoctor(hhNumber).call();
      if (isRegDoc) { alert("Doctor already exists"); setIsLoading(false); return; }
      await contract.methods.registerDoctor(doctorName, hospitalName, dateOfBirth, gender, email, hhNumber, specialization, department, designation, workExperience, password).send({ from: doctorAddress });
      alert("Doctor registered successfully!");
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

  const specializationOptions = ["Cardiology","Dermatology","Endocrinology","Gastroenterology","General Surgery","Neurology","Oncology","Ophthalmology","Orthopedics","Pediatrics","Psychiatry","Radiology","Urology","Other"];
  const departmentOptions = ["Emergency","ICU","OPD","Surgery","Pharmacy","Laboratory","Radiology","Other"];
  const designationOptions = ["Junior Doctor","Senior Doctor","Consultant","HOD","Professor","Surgeon","Other"];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center pt-24 pb-16 px-4">
        <div className="w-full max-w-3xl animate-fadeInUp">
          <div className="glass-card p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-blue flex items-center justify-center text-white shrink-0">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white">Doctor Registration</h2>
                <p className="text-gray-500 text-sm">Register as a healthcare professional</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Wallet Address</label>
                <input type="text" placeholder="0x..." value={doctorAddress} onChange={(e) => setDoctorAddress(e.target.value)} className="input-premium font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input type="text" placeholder="Dr. Full Name" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Hospital Name</label>
                <input type="text" placeholder="Hospital name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Hospital Location</label>
                <input type="text" placeholder="Location" value={hospitalLocation} onChange={(e) => setHospitalLocation(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date of Birth</label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="input-premium">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
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
                <label className="block text-sm font-medium text-gray-400 mb-2">Specialization</label>
                <select value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="input-premium">
                  <option value="">Select</option>
                  {specializationOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Department</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} className="input-premium">
                  <option value="">Select</option>
                  {departmentOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Designation</label>
                <select value={designation} onChange={(e) => setDesignation(e.target.value)} className="input-premium">
                  <option value="">Select</option>
                  {designationOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Work Experience</label>
                <input type="text" placeholder="e.g., 5 years" value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} className="input-premium" />
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
                {isLoading ? <span className="flex items-center justify-center gap-2"><span className="spinner w-5 h-5 border-2" />Registering...</span> : "Register Doctor"}
              </button>
              <button onClick={() => navigate("/")} className="btn-secondary px-6 py-3">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistry;
