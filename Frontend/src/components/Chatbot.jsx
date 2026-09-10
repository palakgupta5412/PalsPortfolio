import React, { useState, useEffect, useRef } from 'react';

const Chatbot = ({ theme }) => {
  const isColor = theme === 'color';
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hey! I'm Palak's Vector RAG clone. Type your message below!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userQuery = input.trim();
    if (!userQuery || loading) return;

    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Error connecting to backend." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 2147483647, 
        backgroundColor: 'rgba(3, 5, 20, 0.95)', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '700px',
          height: '80vh',
          backgroundColor: '#0a0e29',
          border: '2px solid #22d3ee',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        
        {/* HEADER */}
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Palak's Vector RAG Clone</h2>
          <p style={{ color: '#22c55e', fontSize: '12px', margin: '4px 0 0 0' }}>● Connected to FastAPI</p>
        </div>

        {/* MESSAGES */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, index) => (
            <div 
              key={index}
              style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#ffffff',
                backgroundColor: msg.sender === 'user' ? '#7B5EFA' : 'rgba(255,255,255,0.08)',
                marginLeft: msg.sender === 'user' ? 'auto' : '0'
              }}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div style={{ color: '#94a3b8', fontSize: '12px', padding: '10px' }}>Thinking...</div>}
          <div ref={chatEndRef} />
        </div>

        {/* FORM & INPUT WITH LIVE PREVIEW */}
        <form 
          onSubmit={handleSendMessage} 
          style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(0,0,0,0.3)' }}
        >
          {/* Live Text Preview Box to verify state rendering */}
          <div style={{ padding: '6px 12px', backgroundColor: '#121838', borderRadius: '6px', color: '#00ffcc', fontSize: '13px', minHeight: '26px' }}>
            <span>Typing preview: </span><strong>{input || '(start typing...)'}</strong>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              style={{ 
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                border: '2px solid #22d3ee',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontSize: '16px',
                outline: 'none',
                cursor: 'text'
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                backgroundColor: '#7B5EFA',
                color: '#ffffff',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Chatbot;