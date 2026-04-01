import { useState } from 'react';
import { Avatar, Badge } from './UI';

const NAV_ITEMS = [
  { id: 'search', label: 'Trouver', icon: '🔍' },
  { id: 'offer', label: 'Proposer', icon: '🚗' },
  { id: 'myrides', label: 'Mes trajets', icon: '📍' },
  { id: 'chat', label: 'Messages', icon: '💬' },
];

export default function Navbar({ page, setPage, currentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      height: 62,
      boxShadow: '0 1px 24px rgba(26,108,245,0.06)',
    }}>

      {/* ── Logo ── */}
      <div
        onClick={() => setPage('home')}
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #1a6cf5 0%, #0db97a 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          boxShadow: '0 2px 10px rgba(26,108,245,0.3)',
          flexShrink: 0,
        }}>
          🚗
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 17,
            color: 'var(--navy)',
            lineHeight: 1,
            letterSpacing: '-0.3px',
          }}>
            EFREI<span style={{ color: 'var(--blue)' }}>Ride</span>
          </div>
          <div style={{
            fontSize: '9px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            letterSpacing: '1.2px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            Covoiturage Campus
          </div>
        </div>
      </div>

      {/* ── Nav items (desktop) ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {NAV_ITEMS.map(item => {
          const isActive = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                background: isActive ? '#e8f0fe' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '7px 15px',
                borderRadius: 10,
                fontFamily: 'var(--font-body)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '13px',
                color: isActive ? 'var(--blue)' : 'var(--text)',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!isActive) e.currentTarget.style.background = '#f5f8ff';
              }}
              onMouseLeave={e => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              {item.label}
              {item.id === 'chat' && (
                <span style={{
                  position: 'absolute',
                  top: 4,
                  right: 8,
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--red)',
                  border: '1.5px solid white',
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Right side ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Eco badge */}
        <div style={{
          background: '#e8faf2',
          border: '1px solid rgba(13,185,122,0.25)',
          borderRadius: 20,
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}>
          <span style={{ fontSize: '12px' }}>🌱</span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--green)',
          }}>
            12.4 kg CO₂
          </span>
        </div>

        {/* User */}
        <div
          onClick={() => setPage('profile')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 10px 4px 4px',
            borderRadius: 30,
            border: page === 'profile' ? '1.5px solid var(--blue)' : '1.5px solid transparent',
            background: page === 'profile' ? '#e8f0fe' : 'transparent',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            if (page !== 'profile') e.currentTarget.style.background = '#f5f8ff';
          }}
          onMouseLeave={e => {
            if (page !== 'profile') e.currentTarget.style.background = 'transparent';
          }}
        >
          <Avatar user={currentUser} size={32} />
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>
              {currentUser.name.split(' ')[0]}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-muted)', lineHeight: 1 }}>
              {currentUser.promo}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
