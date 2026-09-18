import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Chatbot = ({ theme }) => {
  const isColor = theme === 'color';
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "SYSTEM ONLINE: Initialized Palak's Neural Digital Clone. Query my knowledge base regarding projects, architecture, or full-stack engineering." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userQuery = input.trim();
    if (!userQuery || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery })
      });

      if (!res.ok) throw new Error("API offline");

      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      toast("AI inference backend offline — fallback neural simulation active.", {
        icon: '⚡',
        style: {
          borderRadius: '10px',
          background: isColor ? '#0a0e29' : '#000',
          color: '#fff',
          border: '1px solid #00f0ff'
        }
      });
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: `[SIMULATION MODE]: Acknowledged query "${userQuery}". My live backend port is currently sleeping, but my core expertise includes full-stack React, Node, LangChain agents, and custom UI engineering!` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split('\n').map((line, i) => {
      const parts = line.split(urlRegex);
      return (
        <div key={i} className="min-h-[20px]">
          {parts.map((part, j) => 
            urlRegex.test(part) ? (
              <a 
                key={j} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-cyan-400 underline font-bold hover:text-white transition-colors"
              >
                {part}
              </a>
            ) : part
          )}
        </div>
      );
    });
  };

  return (
    <div className={`w-full h-screen pt-24 pb-12 px-4 md:px-8 flex justify-center items-center overflow-hidden pointer-events-auto transition-colors duration-500 ${isColor ? 'bg-transparent text-white' : 'bg-transparent text-black'}`}>
      
      {/* Locked Centered Sci-Fi Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-3xl h-[78vh] rounded-3xl border-4 flex flex-col overflow-hidden shadow-2xl backdrop-blur-2xl ${
          isColor 
            ? 'bg-[#060919]/95 border-white/20 shadow-[0_0_50px_rgba(0,240,255,0.15)] text-white' 
            : 'bg-white border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-black'
        }`}
      >
        
        {/* TERMINAL HEADER */}
        <div className={`px-6 py-3 border-b-4 flex justify-between items-center shrink-0 ${isColor ? 'bg-black/40 border-white/20' : 'bg-[#F4F4F0] border-black'}`}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            </div>
            <span className="font-mono text-xs font-black tracking-widest uppercase opacity-80">
              // PALAK_CLONE_V2.0.AI
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="hidden sm:inline">CORE ACTIVE</span>
          </div>
        </div>

        {/* MESSAGES SCREEN (Scrollable Internally) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 font-mono text-sm">
          {messages.filter(msg => msg.text && msg.text.trim() !== '').map((msg, index) => (
            <div 
              key={index}
              className={`flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-50 px-1">
                {msg.sender === 'user' ? 'GUEST_USER' : 'DIGITAL_CLONE'}
              </span>
              <div className={`p-3.5 md:p-4 rounded-2xl border-2 leading-relaxed ${
                msg.sender === 'user' 
                  ? (isColor ? 'bg-cyan-500 text-black border-cyan-400 font-bold' : 'bg-black text-white border-black font-bold shadow-[4px_4px_0px_0px_#ff00ea]')
                  : (isColor ? 'bg-white/5 border-white/15 text-gray-200' : 'bg-[#F4F4F0] border-black/20 text-neutral-900')
              }`}>
                {renderFormattedText(msg.text)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="font-mono text-xs px-2 py-1 flex items-center gap-2 text-cyan-400 animate-pulse">
              <span>⚡</span> SYNTHESIZING RESPONSE FROM NEURAL REGISTRY...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* TERMINAL INPUT PROMPT */}
        <form onSubmit={handleSendMessage} className={`p-3 md:p-5 border-t-4 flex gap-3 items-center shrink-0 ${isColor ? 'bg-black/60 border-white/20' : 'bg-[#F4F4F0] border-black'}`}>
          <span className="font-mono font-bold text-lg px-2 text-cyan-400 hidden sm:inline">&gt;</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Query about tech stack, experience, or projects..."
            className={`flex-1 px-4 py-3 rounded-xl border-2 font-mono text-sm outline-none transition-all ${
              isColor 
                ? 'bg-black/50 border-white/25 focus:border-cyan-400 text-white placeholder-gray-500' 
                : 'bg-white border-black focus:border-[#ff00ea] text-black placeholder-neutral-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            }`}
          />
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-widest border-2 cursor-pointer transition-all ${
              isColor 
                ? 'bg-cyan-400 text-black border-cyan-400 hover:bg-white' 
                : 'bg-[#ff00ea] text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black'
            }`}
          >
            TRANSMIT ⚡
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
};

export default Chatbot;