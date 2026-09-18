import React from 'react';

const Footer = ({ theme }) => {
  const isColor = theme === 'color';

  const navigate = (path, label) => {
    window.dispatchEvent(new CustomEvent('pageTransition', { detail: { path, label } }));
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Experience', path: '/experience' },
    { label: 'Projects', path: '/projects' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="w-full relative overflow-hidden bg-gradient-to-b from-[#001038] to-[#000511] text-white border-t border-white/10 pt-12 pb-16 px-6 md:px-16 z-30 pointer-events-auto">
      
      {/* Background Watermark properly padded and positioned to avoid overlap */}
      <div className="absolute bottom-4 left-[22%] text-[16vw] font-sans font-black tracking-widest text-white/[0.05] select-none pointer-events-none leading-none z-0">
        PALAK
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        
        {/* Left Column: Brand & Details */}
        <div className="flex flex-col align-top gap-4 max-w-sm">
          <div className="font-black text-4xl tracking-tighter border-4 border-[#00f0ff] px-4 py-1 w-max text-[#ccff00] bg-black/60 shadow-[4px_4px_0px_0px_#00f0ff]">
            PG.
          </div>
          <p className="font-mono text-sm text-gray-300 leading-relaxed">
            Information Technology undergraduate student & AI Software Engineering Intern building intelligent, high-impact web architectures.
          </p>
          <span className="font-mono text-xs uppercase tracking-widest text-[#00f0ff]">
            NEW DELHI // India
          </span>
        </div>

        {/* Center/Right Column: Distinct Vertical Stack Navigation */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-2">
            // Quick Navigation
          </span>
          <div className="flex flex-col gap-2.5 font-sans font-bold uppercase tracking-wider text-base">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path, link.label.toUpperCase())}
                className="group flex items-center gap-2 w-max text-left cursor-pointer transition-colors hover:text-[#00f0ff]"
                data-hoverable="true"
              >
                <span className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Far Right Column: Credits */}
        <div className="flex flex-col items-start md:items-end gap-2 text-left md:text-right">
          <span className="font-mono text-xs text-gray-400">DESIGNED & ENGINEERED BY</span>
          <span className="font-sans font-black text-xl tracking-tight text-white">PALAK GUPTA</span>
          <span className="font-mono text-xs text-[#00f0ff]/80">© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;