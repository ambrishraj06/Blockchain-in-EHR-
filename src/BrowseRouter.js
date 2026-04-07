import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import PatientRegistry from "./components/PatientRegistration";
import LoginPage from "./components/LoginPage";
import PatientDashBoard from "./components/PatientDashBoard";
import DoctorDashBoard from "./components/DoctorDashBoard";
import DiagnosticDashBoard from "./components/DiagnosticDashBoard";
import RegisterPage from "./components/RegisterPage";
import DoctorLogin from "./components/DoctorLogin";
import DiagnosticLogin from "./components/DiagnosticLogin";
import PatientLogin from "./components/PatientLogin";
import DiagnosticForm from "./components/DiagnosticForm";
import DoctorRegistry from "./components/DoctorRegistration";
import DiagnosticRegistry from "./components/DiagnosticsRegistration";
import Footer from "./components/Footer";
import LandingPage_1 from "./components/LandingPage_1";
import ViewPatientRecords from "./components/ViewPatientRecords";
import ViewPatientList from "./components/ViewPatientList";
import ViewProfile from "./components/ViewProfile";
import ViewDoctorProfile from "./components/ViewDoctorProfile";
import ViewDiagnosticProfile from "./components/ViewDiagnosticProfile";
import DoctorViewPatient from "./components/DoctorViewRecords";
import AboutUs from "./components/AboutPage";

const BrowseRouter = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);
          const fetchedAccounts = await web3Instance.eth.getAccounts();
          setAccounts(fetchedAccounts);
        } catch (error) {
          console.error("User denied access to accounts.");
        }
      } else {
        console.log("Please install MetaMask extension");
      }
    };
    init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage_1 />} />
        <Route path="/AboutPage" element={<AboutUs />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Registration */}
        <Route path="/patient_registration" element={<PatientRegistry />} />
        <Route path="/doctor_registration" element={<DoctorRegistry />} />
        <Route path="/diagnostic_registration" element={<DiagnosticRegistry />} />

        {/* Login */}
        <Route path="/patient_login" element={<PatientLogin />} />
        <Route path="/doctor_login" element={<DoctorLogin />} />
        <Route path="/diagnostic_login" element={<DiagnosticLogin />} />

        {/* Dashboards */}
        <Route path="/patient/:hhNumber" element={<PatientDashBoard />} />
        <Route path="/doctor/:hhNumber" element={<DoctorDashBoard />} />
        <Route path="/diagnostic/:hhNumber" element={<DiagnosticDashBoard />} />

        {/* Profiles */}
        <Route path="/patient/:hhNumber/viewprofile" element={<ViewProfile />} />
        <Route path="/doctor/:hhNumber/viewdoctorprofile" element={<ViewDoctorProfile />} />
        <Route path="/diagnostic/:hhNumber/viewdiagnosticprofile" element={<ViewDiagnosticProfile />} />

        {/* Patient Records & IPFS Upload */}
        <Route path="/patient/:hhNumber/viewrecords" element={<ViewPatientRecords />} />

        {/* Doctor Features */}
        <Route path="/doctor/:hhNumber/patientlist" element={<ViewPatientList />} />
        <Route path="/doctor/:hhNumber/viewpatient/:patientHH" element={<DoctorViewPatient />} />

        {/* Diagnostic Features */}
        <Route path="/diagnostic/:hhNumber/diagnosticform" element={<DiagnosticForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default BrowseRouter;
