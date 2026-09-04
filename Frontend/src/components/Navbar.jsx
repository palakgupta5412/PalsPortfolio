// import React from 'react';
// import { motion } from 'framer-motion';

// function Navbar({ theme, activeSection }) {
//   const isColor = theme === 'color';
//   const links = ['home', 'about', 'experience', 'contact'];

//   return (
//     <nav className="fixed top-0 w-full p-6 px-12 flex justify-between items-center z-[110] pointer-events-auto">
//       <a href="#home" className={`text-4xl font-black uppercase tracking-tighter border-4 border-black px-3 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-none transition-transform hover:-translate-y-1 ${isColor ? 'bg-black text-[#ccff00]' : 'bg-white text-black'}`}>
//         PG.
//       </a>

//       <div className="flex items-center gap-6">
//         {links.map((link) => {
//           const isActive = activeSection === link;
//           return (
//             <a 
//               key={link} href={`#${link}`} 
//               className={`relative font-sans text-lg font-black uppercase px-4 py-2 border-2 border-black transition-all cursor-none ${
//                 isActive 
//                   ? (isColor ? 'bg-black text-[#ccff00] shadow-[4px_4px_0px_0px_#ccff00]' : 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]') 
//                   : (isColor ? 'bg-transparent text-black hover:bg-black hover:text-[#ccff00]' : 'bg-white text-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]')
//               }`}
//             >
//               {link}
//             </a>
//           );
//         })}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';

function Navbar({ theme, activeSection }) {
  const isColor = theme === 'color';
  const links = ['home', 'about', 'experience', 'contact'];

  return (
    <nav className="fixed top-0 w-full p-6 px-12 flex justify-between items-center z-[110] pointer-events-auto">
      <a href="#home" data-hoverable="true" className={`text-4xl font-black uppercase tracking-tighter border-4 px-3 py-1 cursor-none transition-transform hover:-translate-y-1 ${
        isColor ? 'bg-white text-black border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)]' : 'bg-black text-[#ccff00] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
      }`}>
        PG.
      </a>

      <div className="flex items-center gap-6">
        {links.map((link) => {
          const isActive = activeSection === link;
          return (
            <a 
              key={link} href={`#${link}`} data-hoverable="true"
              className={`relative font-sans text-lg font-black uppercase px-4 py-2 border-2 transition-all cursor-none ${
                isActive 
                  ? (isColor ? 'bg-white text-black border-white' : 'bg-black text-[#00f0ff] border-black shadow-[4px_4px_0px_0px_#00f0ff]') 
                  : (isColor ? 'bg-transparent text-white border-white hover:bg-white hover:text-black' : 'bg-white text-black border-black hover:bg-black hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]')
              }`}
            >
              {link}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;