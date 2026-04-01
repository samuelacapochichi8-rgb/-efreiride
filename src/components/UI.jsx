import { AVATAR_COLORS } from '../data/mockData';

// ── Avatar ─────────────────────────────────────────────────────────────────────
export function Avatar({ user, size = 38 }) {
  const color = AVATAR_COLORS[user.id % AVATAR_COLORS.length];
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: size * 0.35,
      color: '#fff',
      flexShrink: 0,
      border: '2px solid rgba(255,255,255,0.2)',
      letterSpacing: '-0.5px',
      userSelect: 'none',
    }}>
      {user.avatar}
    </div>
  );
}

// ── StarRating ─────────────────────────────────────────────────────────────────
export function StarRating({ value, small = false }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{
          color: '#f5a623',
          fontSize: small ? '10px' : '12px',
          opacity: i <= Math.round(value) ? 1 : 0.2,
        }}>★</span>
      ))}
      {!small && (
        <span style={{ color: 'var(--text-muted)', fontSize: '11px', marginLeft: 4 }}>
          {value}
        </span>
      )}
    </span>
  );
}

// ── Badge ──────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'blue' }) {
  const variants = {
    blue:   { bg: '#e8f0fe', color: '#1a6cf5' },
    green:  { bg: '#e8faf2', color: '#0db97a' },
    yellow: { bg: '#fff8e8', color: '#b87a10' },
    navy:   { bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' },
    red:    { bg: '#fde8ef', color: '#c0284d' },
  };
  const v = variants[variant] || variants.blue;
  return (
    <span style={{
      background: v.bg,
      color: v.color,
      fontSize: '10px',
      fontWeight: 600,
      padding: '3px 9px',
      borderRadius: 20,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontFamily: 'var(--font-body)',
      letterSpacing: '0.2px',
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

// ── Tag ────────────────────────────────────────────────────────────────────────
export function Tag({ children }) {
  return (
    <span style={{
      background: '#f0f4ff',
      color: '#4a6fa5',
      fontSize: '10px',
      fontWeight: 500,
      padding: '3px 9px',
      borderRadius: 20,
      display: 'inline-block',
      fontFamily: 'var(--font-body)',
      border: '1px solid #dde8ff',
    }}>
      {children}
    </span>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Button ─────────────────────────────────────────────────────────────────────
export function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, style = {}, fullWidth = false }) {
  const variants = {
    primary: {
      background: disabled ? '#c8d6f5' : 'var(--blue)',
      color: '#fff',
      border: 'none',
    },
    secondary: {
      background: 'var(--blue-light)',
      color: 'var(--blue)',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1.5px solid var(--border)',
    },
    danger: {
      background: disabled ? '#f8d0dc' : 'var(--red)',
      color: '#fff',
      border: 'none',
    },
    success: {
      background: disabled ? '#c8f0e0' : 'var(--green)',
      color: '#fff',
      border: 'none',
    },
  };
  const sizes = {
    sm: { padding: '6px 14px', fontSize: '12px', borderRadius: '8px' },
    md: { padding: '10px 20px', fontSize: '13px', borderRadius: '10px' },
    lg: { padding: '13px 28px', fontSize: '15px', borderRadius: '12px' },
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...v,
        ...s,
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all var(--transition)',
        width: fullWidth ? '100%' : undefined,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        opacity: disabled ? 0.75 : 1,
        ...style,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          e.currentTarget.style.filter = 'brightness(1.06)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.filter = '';
        e.currentTarget.style.transform = '';
      }}
    >
      {children}
    </button>
  );
}

// ── Input ──────────────────────────────────────────────────────────────────────
export function Input({ label, value, onChange, type = 'text', placeholder, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          border: '1.5px solid var(--border)',
          borderRadius: 10,
          padding: '9px 12px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--navy)',
          background: 'var(--white)',
          outline: 'none',
          transition: 'border-color var(--transition)',
          ...style,
        }}
        onFocus={e => e.target.style.borderColor = 'var(--blue)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  );
}

// ── Select ─────────────────────────────────────────────────────────────────────
export function Select({ label, value, onChange, children, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {label && (
        <label style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        style={{
          border: '1.5px solid var(--border)',
          borderRadius: 10,
          padding: '9px 12px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          color: 'var(--navy)',
          background: 'var(--white)',
          outline: 'none',
          cursor: 'pointer',
          transition: 'border-color var(--transition)',
          ...style,
        }}
        onFocus={e => e.target.style.borderColor = 'var(--blue)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      >
        {children}
      </select>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────────
export function Toast({ message, type = 'success', visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 76,
      right: 20,
      zIndex: 3000,
      background: type === 'success' ? 'var(--green)' : type === 'error' ? 'var(--red)' : 'var(--navy)',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: 12,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: '13px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.18)',
      animation: 'slideIn 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      maxWidth: 320,
    }}>
      {message}
    </div>
  );
}

// ── EmptyState ─────────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 20px',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
    }}>
      <div style={{ fontSize: 48, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 6 }}>{title}</div>
      {subtitle && <div style={{ fontSize: 13, marginBottom: action ? 20 : 0 }}>{subtitle}</div>}
      {action}
    </div>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────────
export function Divider({ style = {} }) {
  return <div style={{ height: 1, background: 'var(--border)', ...style }} />;
}
