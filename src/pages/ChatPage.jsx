import { useState, useRef, useEffect } from 'react';
import { MOCK_USERS } from '../data/mockData';
import { Avatar } from '../components/UI';

const INITIAL_CONVERSATIONS = [
  {
    user: MOCK_USERS[1],
    lastMsg: 'OK je serai là à 7h40 !',
    time: '09:32',
    unread: 2,
    messages: [
      { from: 'them', text: 'Salut ! Tu prends le trajet de demain matin ?', time: '09:20' },
      { from: 'me', text: 'Oui, je suis partant ! Gare de Lyon à 7h45 ?', time: '09:25' },
      { from: 'them', text: 'Parfait, je confirme. Je serai dans la voiture bleue 🚙', time: '09:30' },
      { from: 'them', text: 'OK je serai là à 7h40 !', time: '09:32' },
    ],
  },
  {
    user: MOCK_USERS[2],
    lastMsg: 'Super, à demain alors 👍',
    time: 'Hier',
    unread: 0,
    messages: [
      { from: 'them', text: 'Hello ! Est-ce que tu fais le trajet Nation → EFREI demain ?', time: '18:05' },
      { from: 'me', text: 'Oui, vers 8h10 comme d\'habitude !', time: '18:12' },
      { from: 'them', text: 'Super, à demain alors 👍', time: '18:14' },
    ],
  },
  {
    user: MOCK_USERS[3],
    lastMsg: 'Le trajet de mercredi est confirmé ?',
    time: 'Lun.',
    unread: 1,
    messages: [
      { from: 'me', text: 'Salut Karim, ta place est dispo pour mercredi ?', time: '10:00' },
      { from: 'them', text: 'Oui bien sûr ! Départ Évry à 7h30.', time: '10:15' },
      { from: 'them', text: 'Le trajet de mercredi est confirmé ?', time: '11:30' },
    ],
  },
];

const AUTO_REPLIES = [
  "Vu ! À demain 👋",
  "Parfait, je confirme la réservation 🚗",
  "Ok super, j'arrive à l'heure !",
  "Merci pour le trajet d'hier 😊",
  "Notif reçue, on se retrouve au point de départ !",
];

export default function ChatPage({ currentUser }) {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeIdx, setActiveIdx] = useState(0);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const active = conversations[activeIdx];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [activeIdx, active?.messages?.length]);

  const handleSelectConv = (idx) => {
    setActiveIdx(idx);
    setConversations(prev => prev.map((c, i) => i === idx ? { ...c, unread: 0 } : c));
  };

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg = { from: 'me', text: input.trim(), time: timeStr };

    setConversations(prev => prev.map((c, i) =>
      i === activeIdx
        ? { ...c, messages: [...c.messages, newMsg], lastMsg: input.trim(), time: 'À l\'instant' }
        : c
    ));
    setInput('');

    // Auto reply
    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const replyTime = `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, '0')}`;
      setConversations(prev => prev.map((c, i) =>
        i === activeIdx
          ? { ...c, messages: [...c.messages, { from: 'them', text: reply, time: replyTime }], lastMsg: reply, time: replyTime }
          : c
      ));
    }, 1400);
  };

  return (
    <div style={{
      height: 'calc(100vh - 62px)',
      marginTop: 62,
      display: 'flex',
      background: 'var(--bg)',
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 300,
        background: 'var(--white)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div style={{
          padding: '18px 16px 14px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--navy)' }}>
            Messages
          </div>
          <div style={{
            background: 'var(--blue)',
            color: '#fff',
            borderRadius: '50%',
            width: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 700,
          }}>
            {conversations.reduce((acc, c) => acc + c.unread, 0)}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map((conv, i) => (
            <div
              key={i}
              onClick={() => handleSelectConv(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '13px 16px',
                background: activeIdx === i ? '#f0f5ff' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.15s',
                borderLeft: `3px solid ${activeIdx === i ? 'var(--blue)' : 'transparent'}`,
              }}
              onMouseEnter={e => { if (activeIdx !== i) e.currentTarget.style.background = '#f8f9fd'; }}
              onMouseLeave={e => { if (activeIdx !== i) e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Avatar user={conv.user} size={40} />
                <div style={{
                  position: 'absolute',
                  bottom: 1,
                  right: 1,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: '#0db97a',
                  border: '2px solid white',
                }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '13px', color: 'var(--navy)' }}>
                    {conv.user.name}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-muted)' }}>
                    {conv.time}
                  </span>
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: conv.unread > 0 ? 'var(--navy)' : 'var(--text-muted)',
                  fontWeight: conv.unread > 0 ? 600 : 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {conv.lastMsg}
                </div>
              </div>

              {conv.unread > 0 && (
                <div style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--blue)',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {conv.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Chat header */}
        <div style={{
          background: 'var(--white)',
          borderBottom: '1px solid var(--border)',
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        }}>
          <div style={{ position: 'relative' }}>
            <Avatar user={active.user} size={38} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#0db97a',
              border: '2px solid white',
            }} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '15px', color: 'var(--navy)' }}>
              {active.user.name}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--green)', fontWeight: 500 }}>
              ● En ligne · Promo {active.user.promo}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: 'var(--bg)',
        }}>
          {active.messages.map((m, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                gap: 8,
                animation: 'fadeUp 0.2s ease',
              }}
            >
              {m.from === 'them' && <Avatar user={active.user} size={28} />}

              <div style={{
                maxWidth: '65%',
                background: m.from === 'me' ? 'var(--blue)' : 'var(--white)',
                color: m.from === 'me' ? '#fff' : 'var(--navy)',
                padding: '10px 14px',
                borderRadius: m.from === 'me'
                  ? '18px 18px 4px 18px'
                  : '18px 18px 18px 4px',
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                lineHeight: 1.55,
                boxShadow: m.from === 'them'
                  ? '0 2px 10px rgba(0,0,0,0.06)'
                  : '0 3px 14px rgba(26,108,245,0.25)',
                border: m.from === 'them' ? '1px solid var(--border)' : 'none',
              }}>
                <div>{m.text}</div>
                <div style={{
                  fontSize: '10px',
                  opacity: m.from === 'me' ? 0.7 : 0.5,
                  marginTop: 4,
                  textAlign: 'right',
                }}>
                  {m.time}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          background: 'var(--white)',
          borderTop: '1px solid var(--border)',
          padding: '14px 22px',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`Message à ${active.user.name.split(' ')[0]}…`}
            style={{
              flex: 1,
              border: '1.5px solid var(--border)',
              borderRadius: 14,
              padding: '11px 16px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              outline: 'none',
              color: 'var(--navy)',
              background: 'var(--bg)',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--blue)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            style={{
              background: input.trim() ? 'var(--blue)' : '#c8d6f5',
              color: '#fff',
              border: 'none',
              width: 44,
              height: 44,
              borderRadius: 13,
              fontSize: '18px',
              cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { if (input.trim()) e.currentTarget.style.filter = 'brightness(1.07)'; }}
            onMouseLeave={e => e.currentTarget.style.filter = ''}
          >
            ↑
          </button>
        </div>
      </div>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
