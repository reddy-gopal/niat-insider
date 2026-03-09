import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleUser } from 'lucide-react';

export const BOOK_SLOT_URL =
  'https://docs.google.com/forms/d/14VcKHM6JR_8I3u51IxcbPRRH9siwtLyOH3A21BpWTnE/viewform?edit_requested=true';

// ─── PERSPECTIVE: Student / Visitor ──────────────────────────────────────────
//   type: 'sent'     → RIGHT  green bubble  (student = "you", no avatar)
//   type: 'received' → LEFT   white bubble  (Senior, avatar on left)
// ─────────────────────────────────────────────────────────────────────────────
const initialMessages = [
  {
    id: 1, type: 'sent',
    time: '10:02 AM', status: 'read',
    text: "🙋 Hi Senior! What's the single most important thing to focus on in the final year of college?",
  },
  {
    id: 2, type: 'received',
    sender: 'Senior', time: '10:04 AM',
    text: "Great question! 🎯 Focus on <strong>building real projects</strong> and your <strong>network</strong>. Grades matter, but what you've built and who you know will open more doors than a GPA alone. Start one meaningful project today.",
  },
  {
    id: 3, type: 'sent',
    time: '10:07 AM', status: 'read',
    text: 'How do I get my first internship with zero experience? 😅',
  },
  {
    id: 4, type: 'received',
    sender: 'Senior', time: '10:09 AM',
    text: "Everyone starts at zero! 🚀 Here's the hack:<br/><br/>1. Build a tiny portfolio (even 2–3 projects on GitHub)<br/>2. Cold email 20 startups directly — skip the big portals<br/>3. Offer to work for free for 2 weeks to prove yourself<br/><br/>You'll land something. I promise. 💪",
  },
  {
    id: 5, type: 'sent',
    time: '10:12 AM', status: 'read',
    text: 'Should I go for higher studies or start working right after graduation?',
  },
  {
    id: 6, type: 'received',
    sender: 'Senior', time: '10:14 AM',
    text: "There's no universal answer — but here's my filter:<br/>- If you want <strong>research, academia, or highly technical roles</strong> → higher studies first 🎓<br/>- If you want <strong>entrepreneurship or industry</strong> → work first, study later if needed<br/><br/>Don't do a Masters just to delay deciding. Work for 2 years, THEN decide with real-world clarity. 🧠",
  },
  {
    id: 7, type: 'sent',
    time: '10:18 AM', status: 'read',
    text: 'What soft skills actually matter in the real world? 🤔',
  },
  {
    id: 8, type: 'received',
    sender: 'Senior', time: '10:20 AM',
    text: "The Big 3 that nobody teaches you:<br/>✅ <strong>Communication</strong> — writing clear emails, speaking in meetings<br/>✅ <strong>Ownership</strong> — doing things without being asked twice<br/>✅ <strong>Adaptability</strong> — embracing change without panicking<br/><br/>Everything else is secondary. Master these and you'll outshine 90% of your peers. 🌟",
  },
  {
    id: 9, type: 'sent',
    time: '10:25 AM', status: 'read',
    text: 'Any advice on handling failure and rejection? It hits hard 😔',
  },
  {
    id: 10, type: 'received',
    sender: 'Senior', time: '10:27 AM',
    text: "I was rejected from 34 companies before my first offer. Thirty. Four. 😅<br/><br/>Here's what I learned: <strong>rejection is data, not verdict</strong>. Every no tells you something — your CV, your pitch, your timing, your fit. Fix the signal, not your self-worth.<br/><br/>You're not behind. You're loading. 🔥",
  },
];

// ─── TICK ICON ────────────────────────────────────────────────────────────────
const TickIcon = ({ status }) => {
  if (status === 'single') return (
    <svg viewBox="0 0 16 15" width="14" height="14" fill="#999"
      style={{ marginLeft: 3, verticalAlign: 'middle', display: 'inline-block', flexShrink: 0 }}>
      <path d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
    </svg>
  );
  if (status === 'read') return (
    <svg viewBox="0 0 16 15" width="14" height="14" fill="#53BDEB"
      style={{ marginLeft: 3, verticalAlign: 'middle', display: 'inline-block', flexShrink: 0 }}>
      <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
    </svg>
  );
  return null;
};

// ─── DR. PRIYA AVATAR (left side, received messages only) ────────────────────
const SeniorAvatar = () => (
  <div style={{
    width: 34, height: 34, borderRadius: '50%',
    background: 'linear-gradient(135deg, #075E54, #25D366)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, color: '#fff', fontSize: 18,
  }}>
    <CircleUser size={22} strokeWidth={2} color="#fff" />
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function FAQ({ faqRef }) {
  const chatRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!document.getElementById('roboto-font')) {
      const link = document.createElement('link');
      link.id = 'roboto-font';
      link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  // ── Submit: visitor types → RIGHT green, then Senior replies LEFT white ──
  const handleSubmit = () => {
    const value = inputValue.trim();
    if (!value) return;

    // Visitor's question → RIGHT (sent, green)
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'sent',
      time: 'just now',
      status: 'single',
      text: value,
      isNew: true,
    }]);
    setInputValue('');
    setIsTyping(true);

    // Typing indicator → LEFT (received, white)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: 'typing-indicator',
        type: 'received',
        isTypingBubble: true,
        isNew: true,
      }]);
    }, 800);

    // Senior's reply → LEFT (received, white) with CTA
    setTimeout(() => {
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== 'typing-indicator');
        return [...filtered, {
          id: Date.now() + 2,
          type: 'received',
          sender: 'Senior',
          time: 'just now',
          text: "That's a great question! 🙌 Book a 1-on-1 session with a Senior and get everything answered personally.",
          isNew: true,
          showCTA: true,
        }];
      });
      setIsTyping(false);
    }, 2800);
  };

  const styles = `
    .faq-chat-area::-webkit-scrollbar { width: 4px; }
    .faq-chat-area::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 4px; }

    /* SENT — student, RIGHT side, green bubble, no avatar */
    .msg-row-sent {
      display: flex;
      flex-direction: row-reverse;
      align-items: flex-end;
      margin-bottom: 4px;
      padding-left: 52px;
    }

    /* RECEIVED — Senior, LEFT side, white bubble, avatar on far left */
    .msg-row-received {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 6px;
      margin-bottom: 4px;
      padding-right: 52px;
    }

    .bubble-sent {
      background: #DCF8C6;
      border-radius: 8px 0 8px 8px;
      padding: 6px 10px 6px 10px;
      box-shadow: 0 1px 1px rgba(0,0,0,0.1);
      position: relative;
      max-width: 100%;
      word-wrap: break-word;
      font-size: 14px;
      line-height: 1.45;
      color: #111b21;
    }
    .bubble-sent .tail {
      position: absolute; top: 0; right: -7px;
      width: 0; height: 0;
      border-top: 8px solid #DCF8C6;
      border-right: 8px solid transparent;
    }

    .bubble-received {
      background: #FFFFFF;
      border-radius: 0 8px 8px 8px;
      padding: 6px 10px 6px 10px;
      box-shadow: 0 1px 1px rgba(0,0,0,0.1);
      position: relative;
      max-width: 100%;
      word-wrap: break-word;
      font-size: 14px;
      line-height: 1.45;
      color: #111b21;
    }
    .bubble-received .tail {
      position: absolute; top: 0; left: -7px;
      width: 0; height: 0;
      border-top: 8px solid #FFFFFF;
      border-left: 8px solid transparent;
    }

    .sender-name {
      font-size: 12.5px;
      font-weight: 600;
      color: #075E54;
      margin-bottom: 3px;
      line-height: 16px;
    }

    .msg-meta {
      font-size: 11px;
      color: #999;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 4px;
      gap: 1px;
      white-space: nowrap;
    }

    .typing-dots { display: flex; align-items: center; gap: 4px; padding: 4px 2px; height: 22px; }
    .typing-dots span {
      width: 6px; height: 6px; border-radius: 50%; background: #aaa;
      animation: tdBounce 1.2s infinite ease-in-out;
    }
    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes tdBounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }

    .cta-btn {
      display: inline-block;
      margin-top: 10px;
      background: #075E54;
      color: #fff !important;
      text-decoration: none;
      padding: 8px 18px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: background 0.2s;
      font-family: 'Roboto', sans-serif;
    }
    .cta-btn:hover { background: #054d44; }

    .wa-input-wrap {
      flex: 1; background: #fff; border-radius: 24px;
      padding: 9px 14px; display: flex; align-items: center;
      transition: box-shadow 0.2s;
    }
    .wa-input-wrap.focused { box-shadow: 0 0 0 2px #25D366; }
    .wa-input-wrap input {
      border: none; outline: none; background: transparent;
      font-size: 14px; font-family: 'Roboto', sans-serif;
      color: #111b21; width: 100%;
    }
    .wa-input-wrap input::placeholder { color: #999; }

    .send-btn {
      width: 44px; height: 44px; border-radius: 50%; background: #25D366;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      transition: transform 0.1s, background 0.2s; border: none;
    }
    .send-btn:hover { background: #20b85a; }
    .send-btn:active { transform: scale(0.92); }
  `;

  return (
    <section
      ref={faqRef}
      style={{
        width: '100vw', minHeight: isMobile ? '100vh' : 'auto',
        backgroundColor: isMobile ? '#ECE5DD' : '#0d1117',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Roboto', sans-serif",
        padding: isMobile ? 0 : '80px 5%',
        marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)',
        zIndex: 10, gap: isMobile ? 0 : 60,
      }}
    >
      <style>{styles}</style>

      {/* Desktop glow */}
      {!isMobile && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)', width: 800, height: 800,
          background: 'radial-gradient(circle, #128C7E 0%, transparent 65%)',
          opacity: 0.07, pointerEvents: 'none', zIndex: 0,
        }} />
      )}

      {/* Flanking text — desktop only */}
      {!isMobile && (
        <div style={{ flex: 1, maxWidth: 480, zIndex: 2 }}>
          <span style={{
            color: '#fff', fontSize: 12, textTransform: 'uppercase', letterSpacing: 3,
            fontWeight: 700, display: 'inline-block', marginBottom: 18,
            background: 'rgba(255,255,255,0.08)', padding: '6px 16px', borderRadius: 20,
          }}>REAL ADVICE</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", color: '#fff', fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 16,
          }}>
            Clear all your doubts<br />
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-1, #F9A826)' }}>
              in one session.
            </em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 17, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif" }}>
            Ask anything. Get real answers directly from seniors who have been in your shoes.
            No mentors, no counselors — just raw, unfiltered advice.
          </p>
        </div>
      )}

      {/* Phone frame */}
      <div style={{
        position: 'relative',
        width: isMobile ? '100%' : 390, height: isMobile ? '100vh' : 720,
        borderRadius: isMobile ? 0 : 32,
        border: isMobile ? 'none' : '6px solid #1f2937',
        boxShadow: isMobile ? 'none' : '0 30px 60px rgba(0,0,0,0.55)',
        backgroundColor: '#ECE5DD',
        display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 2, flexShrink: 0,
      }}>

        {/* Wallpaper tile */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.83v58.34h-58.34l-.83-.83.83-.83h56.68v-56.68l.83-.83z' fill='%23000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px', backgroundRepeat: 'repeat', opacity: 0.035,
        }} />

        {/* Header */}
        <div style={{
          height: 60, backgroundColor: '#075E54',
          display: 'flex', alignItems: 'center',
          padding: '0 16px', color: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
          position: 'relative', zIndex: 10, flexShrink: 0, gap: 10,
        }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #075E54, #25D366)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>🎓</div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Ask Me Anything – Seniors Q&amp;A
            </div>
            <div style={{
              fontSize: 12.5,
              color: isTyping ? '#7DEFA1' : 'rgba(255,255,255,0.78)',
              fontStyle: isTyping ? 'italic' : 'normal',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', transition: 'color 0.3s',
            }}>
              {isTyping ? 'Senior is typing…' : 'Senior + 247 participants'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 18, flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1C10.39 21.01 3 13.62 3 4.01c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.19z" />
            </svg>
          </div>
        </div>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #128C7E, #075E54)', flexShrink: 0, zIndex: 10 }} />

        {/* Chat area */}
        <div
          ref={chatRef}
          className="faq-chat-area"
          style={{
            flex: 1, overflowY: 'auto', padding: '16px 12px 8px',
            position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <span style={{
              background: '#E1F3FB', color: '#333', fontSize: 11.5,
              padding: '4px 14px', borderRadius: 8, fontWeight: 500,
              boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
            }}>TODAY</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span style={{
              background: '#FCF4CB', color: '#555', fontSize: 11.5,
              padding: '6px 14px', borderRadius: 8, display: 'inline-block',
              boxShadow: '0 1px 1px rgba(0,0,0,0.07)', lineHeight: 1.5,
            }}>
              🔒 Messages and calls are end-to-end encrypted.
            </span>
          </div>

          <AnimatePresence>
            {messages.map((msg, idx) => {
              const isSent = msg.type === 'sent';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 14, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '0px 0px -10px 0px' }}
                  transition={{ duration: 0.25, delay: msg.isNew ? 0 : idx * 0.07, ease: 'easeOut' }}
                  className={isSent ? 'msg-row-sent' : 'msg-row-received'}
                >
                  {/* Avatar only on received (Senior), on the LEFT */}
                  {!isSent && <SeniorAvatar />}

                  <div className={isSent ? 'bubble-sent' : 'bubble-received'}>
                    <div className="tail" />

                    {/* Sender name only on received bubbles */}
                    {!isSent && msg.sender && !msg.isTypingBubble && (
                      <div className="sender-name">{msg.sender}</div>
                    )}

                    {msg.isTypingBubble ? (
                      <div className="typing-dots"><span /><span /><span /></div>
                    ) : (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                        {msg.showCTA && (
                          <a href={BOOK_SLOT_URL} target="_blank" rel="noopener noreferrer" className="cta-btn">
                            Book Your Session →
                          </a>
                        )}
                        <div className="msg-meta">
                          <span>{msg.time}</span>
                          {/* Blue ticks only on sent messages */}
                          {isSent && <TickIcon status={msg.status || 'read'} />}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div style={{ height: 8 }} />
        </div>

        {/* Input bar */}
        <div style={{
          backgroundColor: '#F0F0F0', padding: '8px 10px',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 -1px 3px rgba(0,0,0,0.06)',
          position: 'relative', zIndex: 10, flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="#54656F" style={{ cursor: 'pointer', flexShrink: 0 }}>
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          <div className={`wa-input-wrap${isFocused ? ' focused' : ''}`}>
            <input
              type="text" value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              placeholder="Ask your question… we'll connect you with a senior 🎓"
            />
          </div>
          <button className="send-btn" onClick={handleSubmit} aria-label="Send">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" style={{ transform: 'translateX(1px)' }}>
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}