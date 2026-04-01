import { useState } from 'react';
import { Avatar, StarRating, Badge } from '../components/UI';

const ACHIEVEMENTS = [
  { icon: '🌱', label: 'Éco-conducteur', desc: '10 trajets économes', earned: true },
  { icon: '⭐', label: 'Top conducteur', desc: 'Note ≥ 4.8', earned: true },
  { icon: '🔁', label: 'Régulier', desc: '5 trajets récurrents', earned: true },
  { icon: '🤝', label: 'Communauté', desc: '20 passagers transportés', earned: true },
  { icon: '🚀', label: 'Early adopter', desc: 'Parmi les 100 premiers', earned: false },
  { icon: '💯', label: 'Parfait', desc: 'Note 5/5 pendant 1 mois', earned: false },
  { icon: '🌍', label: 'Champion vert', desc: '50 kg CO₂ économisés', earned: false },
  { icon: '🏆', label: 'Top 10', desc: 'Dans le classement EFREI', earned: false },
];

const PREFS_INITIAL = [
  { label: 'Notifications de nouveaux trajets', checked: true },
  { label: 'Rappels 30 min avant le départ', checked: true },
  { label: 'Partager mon profil sur l\'annuaire EFREI', checked: false },
  { label: 'Recevoir les récapitulatifs hebdomadaires', checked: true },
];

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      style={{
        width: 42,
        height: 24,
        borderRadius: 12,
        background: checked ? 'var(--blue)' : '#dde3f0',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: 3,
        left: checked ? 21 : 3,
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: '#fff',
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

export default function ProfilePage({ currentUser }) {
  const [prefs, setPrefs] = useState(PREFS_INITIAL);
  const [saved, setSaved] = useState(false);

  const togglePref = i => setPrefs(prev => prev.map((p, j) => j === i ? { ...p, checked: !p.checked } : p));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 62 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>

        {/* ── Profile card ── */}
        <div style={{
          background: 'linear-gradient(135deg, #0a1428 0%, #0f1b35 40%, #1a3a7a 100%)',
          borderRadius: 22,
          padding: '28px 28px 24px',
          marginBottom: 20,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative rings */}
          {[280, 180, 100].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: s,
              height: s,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.05)',
              right: -(s / 3),
              top: -(s / 3),
            }} />
          ))}

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Avatar user={currentUser} size={72} />
              <div style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#0db97a',
                border: '3px solid transparent',
                boxSizing: 'border-box',
              }} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: '#fff', marginBottom: 4, letterSpacing: '-0.3px' }}>
                {currentUser.name}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
                Promo {currentUser.promo} · EFREI Paris
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <StarRating value={currentUser.rating} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                  {currentUser.trips} trajets
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 22, position: 'relative' }}>
            {[
              { label: 'Trajets', value: currentUser.trips },
              { label: 'Note', value: `${currentUser.rating}/5` },
              { label: 'CO₂ éco.', value: '12.4 kg' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '14px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#7eb8ff' }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Badges ── */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 18,
          padding: '24px',
          border: '1px solid var(--border)',
          marginBottom: 16,
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '15px', color: 'var(--navy)', marginBottom: 5 }}>
            Badges & Récompenses
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginBottom: 18 }}>
            {ACHIEVEMENTS.filter(a => a.earned).length}/{ACHIEVEMENTS.length} badges débloqués
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '16px 10px',
                background: a.earned ? 'var(--bg)' : '#fafafa',
                borderRadius: 14,
                border: `1px solid ${a.earned ? 'var(--border)' : '#ececec'}`,
                opacity: a.earned ? 1 : 0.45,
                transition: 'transform 0.15s',
                cursor: a.earned ? 'pointer' : 'default',
              }}
                onMouseEnter={e => { if (a.earned) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{ fontSize: '26px', marginBottom: 7 }}>{a.icon}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>
                  {a.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {a.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Preferences ── */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 18,
          padding: '24px',
          border: '1px solid var(--border)',
          marginBottom: 16,
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '15px', color: 'var(--navy)', marginBottom: 18 }}>
            Préférences & notifications
          </div>
          {prefs.map((pref, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: i < prefs.length - 1 ? '1px solid var(--bg)' : 'none',
              gap: 12,
            }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)', lineHeight: 1.4 }}>
                {pref.label}
              </span>
              <Toggle checked={pref.checked} onChange={() => togglePref(i)} />
            </div>
          ))}

          <button
            onClick={handleSave}
            style={{
              marginTop: 18,
              background: saved ? 'var(--green)' : 'var(--blue)',
              color: '#fff',
              border: 'none',
              padding: '10px 22px',
              borderRadius: 10,
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {saved ? '✓ Enregistré !' : 'Sauvegarder'}
          </button>
        </div>

        {/* ── Danger zone ── */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 18,
          padding: '24px',
          border: '1px solid #fde8ef',
        }}>
          <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: 'var(--red)', marginBottom: 14 }}>
            Zone de danger
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button style={{
              background: '#fde8ef', color: 'var(--red)',
              border: '1px solid #f5b8ca',
              padding: '8px 16px', borderRadius: 10,
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px',
              cursor: 'pointer',
            }}>
              Se déconnecter
            </button>
            <button style={{
              background: 'transparent', color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              padding: '8px 16px', borderRadius: 10,
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '12px',
              cursor: 'pointer',
            }}>
              Supprimer mon compte
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
