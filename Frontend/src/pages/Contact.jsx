import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = ({ theme }) => {
  const isColor = theme === 'color';
  const formRef = useRef();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    
    const name = form.user_name.value.trim();
    const email = form.user_email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all fields before dispatching!");
      return;
    }

    setSending(true);

    const SERVICE_ID = 'service_o6ohv3w';
    const TEMPLATE_ID = 'template_32xpzjb';
    const PUBLIC_KEY = 'p2n_NyZdpuuLgRplm';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        setSending(false);
        toast.success("Message successfully landed in Palak's inbox! 🚀", {
          style: {
            borderRadius: '12px',
            background: isColor ? '#0a0e29' : '#000',
            color: '#fff',
            border: '1px solid #00f0ff'
          }
        });
        form.reset();
      })
      .catch((error) => {
        setSending(false);
        console.warn("EmailJS token error (412 / Invalid grant). Reconnect account in EmailJS dashboard. Redirecting to Gmail web compose:", error);
        
        // FORCED GMAIL WEB COMPOSE REDIRECT (Strictly Gmail, Never Outlook)
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=palakgupta425@gmail.com&su=${encodeURIComponent(`Portfolio Message from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.open(gmailUrl, '_blank');
        
        toast.success("Opened Gmail compose with your message ready! ✉️", {
          style: {
            borderRadius: '12px',
            background: isColor ? '#0a0e29' : '#000',
            color: '#fff',
            border: '1px solid #00f0ff'
          }
        });
        form.reset();
      });
  };

  return (
    <section id="contact" className="w-full min-h-screen flex items-center justify-center relative z-20 pt-32 pb-28 px-6 md:px-12 pointer-events-auto">
      
      {isColor && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-center items-center">
          <div className="w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto w-full flex flex-col items-center relative z-10"
      >
        <span className={`text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block ${
          isColor ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-black/5 text-black border border-black/10'
        }`}>
          Get In Touch
        </span>

        <h2 className={`text-5xl md:text-7xl font-black font-sans tracking-tighter leading-none text-center ${isColor ? 'text-white' : 'text-black'}`}>
          LET'S BUILD <br/> <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">SOMETHING EPIC.</span>
        </h2>
        
        <p className={`text-base md:text-lg mt-4 text-center font-mono max-w-lg ${isColor ? 'text-gray-400' : 'text-neutral-600'}`}>
          Have an AI engineering role, collaboration idea, or project query? Send a direct dispatch below.
        </p>

        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=palakgupta425@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 px-6 py-3 font-mono text-xs md:text-sm font-bold rounded-full transition-all hover:scale-105 border flex items-center gap-2.5 ${
            isColor 
              ? 'bg-white/5 text-white border-white/20 hover:border-[#00f0ff]' 
              : 'bg-black text-white border-black hover:bg-[#ff00ea]'
          }`}
        >
          <span>📫</span> palakgupta425@gmail.com ↗
        </a>

        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className={`w-full mt-12 p-8 md:p-12 rounded-3xl border transition-all shadow-2xl backdrop-blur-2xl flex flex-col gap-6 ${
            isColor 
              ? 'bg-[#0b0f19]/90 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' 
              : 'bg-white border-black/10 shadow-[16px_16px_0px_0px_rgba(0,0,0,0.06)]'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col gap-2">
              <label className={`font-mono text-xs uppercase font-bold tracking-wider ${isColor ? 'text-gray-300' : 'text-neutral-700'}`}>
                Your Name
              </label>
              <input 
                type="text" 
                name="user_name"
                required
                placeholder="Palak or Recruiter Name" 
                className={`px-4 py-3.5 rounded-xl border text-sm outline-none transition-all ${
                  isColor 
                    ? 'bg-white/5 border-white/10 focus:border-[#00f0ff] text-white placeholder-gray-500' 
                    : 'bg-neutral-50 border-black/15 focus:border-black text-black placeholder-neutral-400'
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className={`font-mono text-xs uppercase font-bold tracking-wider ${isColor ? 'text-gray-300' : 'text-neutral-700'}`}>
                Your Email
              </label>
              <input 
                type="email" 
                name="user_email"
                required
                placeholder="name@company.com" 
                className={`px-4 py-3.5 rounded-xl border text-sm outline-none transition-all ${
                  isColor 
                    ? 'bg-white/5 border-white/10 focus:border-[#00f0ff] text-white placeholder-gray-500' 
                    : 'bg-neutral-50 border-black/15 focus:border-black text-black placeholder-neutral-400'
                }`}
              />
            </div>

          </div>

          <div className="flex flex-col gap-2">
            <label className={`font-mono text-xs uppercase font-bold tracking-wider ${isColor ? 'text-gray-300' : 'text-neutral-700'}`}>
              Message
            </label>
            <textarea 
              name="message"
              required
              rows={5}
              placeholder="Write your message here... Let's collaborate!"
              className={`px-4 py-3.5 rounded-xl border text-sm outline-none resize-none transition-all ${
                isColor 
                  ? 'bg-white/5 border-white/10 focus:border-[#00f0ff] text-white placeholder-gray-500' 
                  : 'bg-neutral-50 border-black/15 focus:border-black text-black placeholder-neutral-400'
              }`}
            />
          </div>

          <motion.button
            type="submit"
            disabled={sending}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`mt-2 py-4 rounded-xl font-mono text-sm font-black uppercase tracking-widest border transition-all cursor-pointer shadow-lg ${
              isColor 
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-transparent hover:opacity-90 shadow-cyan-500/20' 
                : 'bg-black text-white border-black hover:bg-neutral-800 shadow-black/10'
            }`}
          >
            {sending ? 'DISPATCHING INBOX BEACON...' : 'SEND MESSAGE 🚀'}
          </motion.button>
        </form>

      </motion.div>
    </section>
  );
};

export default Contact;