import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="relative bg-dark-100 border-t border-white/5">
      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <div className="max-w-md">
            <h3 className="text-xl font-display font-bold mb-4">
              <span className="gradient-text">Secure</span><span className="text-white">EHR</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Decentralized Electronic Health Records powered by Ethereum blockchain and IPFS technology.
            </p>
            <div className="flex justify-center gap-3">
              {[
                { icon: faInstagram, href: "https://instagram.com" },
                { icon: faFacebookF, href: "https://facebook.com" },
                { icon: faLinkedinIn, href: "https://linkedin.com" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 transition-all duration-300 hover:bg-primary-500/10 hover:border-primary-500/30 hover:text-primary-500 hover:scale-110"
                >
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2026 SecureEHR. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Built with Ethereum • IPFS • React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
