import { Button, Badge } from '../components/UI';

const STATS = [
  { label: 'Étudiants inscrits', value: '1 248', icon: '👥' },
  { label: 'Trajets ce mois', value: '3 891', icon: '🗺️' },
  { label: 'CO₂ économisé', value: '2.1 t', icon: '🌿' },
  { label: 'Note moyenne', value: '4.8/5', icon: '⭐' },
];

const STEPS = [
  {
    step: '01', icon: '🔍', title: 'Cherche',
    desc: "Indique ton point de départ et l'heure souhaitée. On trouve les trajets disponibles vers l'EFREI.",
  },
  {
    step: '02', icon: '✋', title: 'Réserve',
    desc: "Choisis un conducteur, consulte son profil et ses avis, et réserve ta place en un clic.",
  },
  {
    step: '03', icon: '⭐', title: 'Évalue',
    desc: "Rejoins ton conducteur et partagez le trajet. Note ensuite l'expérience pour la communauté.",
  },
];

export default function HomePage({ setPage }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0a1428 0%, #0f1b35 35%, #1a3a7a 70%, #1a6cf5 100%)',
        padding: '120px 28px 90px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        {[
          { w: 500, h: 500, top: '-180px', left: '-150px', dur: 70 },
          { w: 280, h: 280, top: '-40px', left: '58%', dur: 45 },
          { w: 200, h: 200, top: '55%', left: '-60px', dur: 55 },
          { w: 360, h: 360, top: '20%', left: '68%', dur: 80 },
          { w: 140, h: 140, top: '72%', left: '30%', dur: 40 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: c.w,
            height: c.h,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            top: c.top,
            left: c.left,
            animation: `spin ${c.dur}s linear infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Gradient blob */}
        <div style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,108,245,0.15) 0%, transparent 70%)',
          top: '50%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
            <Badge variant="navy">🎓 EFREI Paris – Villejuif</Badge>
            <Badge variant="navy">✅ Vérifiés par l'école</Badge>
            <Badge variant="navy">🔒 Communauté privée</Badge>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 5.5vw, 58px)',
            color: '#fff',
            margin: '0 0 20px',
            lineHeight: 1.08,
            letterSpacing: '-1px',
            maxWidth: 620,
          }}>
            Le covoiturage
            <br />
            <span style={{
              background: 'linear-gradient(90deg, #4da8ff, #7de8c0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              entre Efreiiens
            </span>
            <span style={{ marginLeft: 10 }}>🚗</span>
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 480,
            lineHeight: 1.75,
            marginBottom: 36,
            fontWeight: 400,
          }}>
            Rejoins la communauté de covoiturage d'EFREI Paris. Partage tes trajets, réduis ton empreinte carbone, et arrives à Villejuif avec des camarades de promo.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => setPage('search')}
              style={{
                background: 'var(--blue)',
                color: '#fff',
                border: 'none',
                padding: '14px 30px',
                borderRadius: 14,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(26,108,245,0.45)',
                transition: 'all 0.18s',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 32px rgba(26,108,245,0.55)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(26,108,245,0.45)';
              }}
            >
              🔍 Trouver un trajet
            </button>
            <button
              onClick={() => setPage('offer')}
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.2)',
                padding: '14px 30px',
                borderRadius: 14,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              🚗 Proposer un trajet
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div style={{ maxWidth: 960, margin: '-34px auto 0', padding: '0 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}>
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`fade-up delay-${i + 1}`}
              style={{
                background: 'var(--white)',
                borderRadius: 16,
                padding: '22px 16px',
                boxShadow: '0 6px 28px rgba(0,0,0,0.07)',
                border: '1px solid var(--border)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: 8 }}>{s.icon}</div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '24px',
                color: 'var(--navy)',
                lineHeight: 1,
                marginBottom: 5,
              }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── How it works ── */}
      <div style={{ maxWidth: 960, margin: '60px auto 0', padding: '0 28px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 10 }}>
            Simple & rapide
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--navy)', margin: '0 0 8px' }}>
            Comment ça marche ?
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text)', fontSize: '14px', maxWidth: 440 }}>
            100% entre Efreiiens vérifiés — en 3 étapes simples.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {STEPS.map((item, i) => (
            <div
              key={i}
              className={`fade-up delay-${i + 1}`}
              style={{
                background: 'var(--white)',
                borderRadius: 18,
                padding: '26px 24px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: 'var(--bg)',
                opacity: 0.7,
              }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '11px',
                  color: 'var(--blue)',
                  letterSpacing: '1px',
                }}>
                  {item.step}
                </span>
                <div style={{ height: 1, flex: 1, background: 'var(--border)' }} />
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '16px', color: 'var(--navy)', marginBottom: 8 }}>
                {item.title}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)', lineHeight: 1.65 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <div style={{ maxWidth: 960, margin: '60px auto 0', padding: '0 28px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0f1b35 0%, #1a3a7a 100%)',
          borderRadius: 24,
          padding: '40px 36px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 28,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -40, bottom: -40, width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: '#fff', margin: '0 0 14px' }}>
              Conçu pour EFREI Paris
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 24 }}>
              Chaque compte est lié à une adresse EFREI. Tous les membres sont des étudiants ou alumni vérifiés — une communauté de confiance.
            </p>
            <button
              onClick={() => setPage('search')}
              style={{
                background: 'var(--blue)',
                color: '#fff',
                border: 'none',
                padding: '11px 24px',
                borderRadius: 12,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'filter 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={e => e.currentTarget.style.filter = ''}
            >
              Commencer →
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🔒', label: 'Communauté vérifiée' },
              { icon: '🌱', label: 'Bilan carbone live' },
              { icon: '💬', label: 'Messagerie intégrée' },
              { icon: '⭐', label: 'Système de notation' },
            ].map((f, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '16px 14px',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ fontSize: '22px', marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                  {f.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer spacer ── */}
      <div style={{ height: 80 }} />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
