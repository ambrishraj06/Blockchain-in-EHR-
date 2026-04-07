import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const LoginPage = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Doctor",
      desc: "Access patient list, view records, write prescriptions",
      path: "/doctor_login",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
      gradient: "from-accent-cyan to-accent-blue",
    },
    {
      title: "Patient",
      desc: "View your records, upload files, manage access",
      path: "/patient_login",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      ),
      gradient: "from-primary-500 to-emerald-500",
    },
    {
      title: "Diagnostic",
      desc: "Upload EHR reports and diagnostic test results",
      path: "/diagnostic_login",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
      ),
      gradient: "from-accent-blue to-accent-purple",
    },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <NavBar />
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl font-display font-bold text-white mb-3">Welcome Back</h1>
            <p className="text-gray-400">Select your role to sign in</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <button
                key={role.title}
                onClick={() => navigate(role.path)}
                className="glass-card p-8 text-center group animate-fadeInUp cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${role.gradient} bg-opacity-20 flex items-center justify-center text-white mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow`}>
                  {role.icon}
                </div>
                <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-primary-500 transition-colors">{role.title}</h3>
                <p className="text-gray-500 text-sm">{role.desc}</p>
              </button>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-10 text-sm animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")} className="text-primary-500 hover:text-primary-400 font-medium transition-colors">
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
