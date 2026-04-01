import { Avatar, Badge, Tag, Button, StarRating } from './UI';

// ── RideCard ───────────────────────────────────────────────────────────────────
export function RideCard({ ride, booked, onBook, onDetail, isOwn }) {
  const co2Color = ride.co2 < 1.2 ? 'var(--green)' : ride.co2 < 1.6 ? '#b87a10' : 'var(--red)';

  return (
    <div
      onClick={onDetail}
      className="fade-up"
      style={{
        background: 'var(--white)',
        borderRadius: 16,
        padding: '18px 20px',
        border: `1.5px solid ${booked ? 'rgba(13,185,122,0.35)' : 'var(--border)'}`,
        boxShadow: 'var(--shadow-sm)',
        display: 'grid',
        gridTemplateColumns: '50px 1fr auto',
        gap: 16,
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: booked ? '#fafffe' : 'var(--white)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,108,245,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = '';
      }}
    >
      {/* Driver col */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
        <Avatar user={ride.driver} size={40} />
        <StarRating value={ride.driver.rating} small />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center' }}>
          {ride.driver.trips} trajets
        </span>
      </div>

      {/* Info col */}
      <div style={{ minWidth: 0 }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: 'var(--navy)' }}>
            {ride.driver.name}
          </span>
          <Badge variant="blue">{ride.driver.promo}</Badge>
          {ride.recurring && <Badge variant="yellow">🔁 Régulier</Badge>}
          {booked && <Badge variant="green">✅ Réservé</Badge>}
        </div>

        {/* Route */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: '10px' }}>📍</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text)', fontWeight: 500 }}>
            {ride.from}
          </span>
          <span style={{ color: 'var(--border)', fontSize: '12px' }}>→</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--blue)', fontWeight: 600 }}>
            {ride.to.replace('EFREI Paris – ', '')}
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {ride.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>

      {/* Price & Action col */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '22px',
            color: 'var(--navy)',
            lineHeight: 1,
          }}>
            {ride.price}€
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-muted)', marginTop: 2 }}>
            🕐 {ride.time} · {ride.available} place{ride.available > 1 ? 's' : ''}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: co2Color, fontWeight: 600, marginTop: 3 }}>
            🌱 −{ride.co2} kg CO₂
          </div>
        </div>

        <button
          onClick={e => { e.stopPropagation(); if (!booked && !isOwn && ride.available > 0) onBook(); }}
          style={{
            background: booked ? '#e8faf2' : isOwn ? '#f6f8fd' : 'var(--blue)',
            color: booked ? 'var(--green)' : isOwn ? 'var(--text-muted)' : '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 10,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '12px',
            cursor: booked || isOwn ? 'default' : 'pointer',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            if (!booked && !isOwn) e.currentTarget.style.filter = 'brightness(1.07)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = '';
          }}
        >
          {booked ? '✓ Réservé' : isOwn ? 'Mon trajet' : 'Réserver'}
        </button>
      </div>
    </div>
  );
}

// ── RideModal ──────────────────────────────────────────────────────────────────
export function RideModal({ ride, booked, onBook, onClose, isOwn }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(15,27,53,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--white)',
          borderRadius: 24,
          padding: 28,
          maxWidth: 520,
          width: '100%',
          boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
          animation: 'scaleIn 0.22s ease',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--navy)', margin: 0 }}>
            Détail du trajet
          </h3>
          <button
            onClick={onClose}
            style={{
              background: '#f0f4ff',
              border: 'none',
              width: 32,
              height: 32,
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: '16px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >✕</button>
        </div>

        {/* Driver */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '16px 0',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 18,
        }}>
          <Avatar user={ride.driver} size={52} />
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '16px', color: 'var(--navy)', marginBottom: 3 }}>
              {ride.driver.name}
            </div>
            <StarRating value={ride.driver.rating} />
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)', marginTop: 3 }}>
              {ride.driver.trips} trajets effectués · Promo {ride.driver.promo}
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          {[
            { label: 'Départ', value: ride.from, icon: '📍' },
            { label: 'Arrivée', value: ride.to, icon: '🏁' },
            { label: 'Date', value: new Date(ride.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }), icon: '📅' },
            { label: 'Heure', value: ride.time, icon: '🕐' },
            { label: 'Places', value: `${ride.available} / ${ride.seats} disponibles`, icon: '💺' },
            { label: 'Prix', value: `${ride.price} €/pers.`, icon: '💶' },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--bg)', borderRadius: 12, padding: '12px 14px' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-muted)', marginBottom: 3 }}>
                {item.icon} {item.label}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--navy)' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        {ride.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            {ride.tags.map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        )}

        {/* CO2 bar */}
        <div style={{ background: '#e8faf2', borderRadius: 12, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
          <span>🌱</span>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--green)' }}>
              Impact carbone
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#0a7a50' }}>
              Ce trajet partagé économise ~{ride.co2} kg CO₂ vs. trajet solo
            </div>
          </div>
        </div>

        {/* Comments */}
        {ride.comments.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--navy)', marginBottom: 10 }}>
              Avis passagers ({ride.comments.length})
            </div>
            {ride.comments.map((c, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 10,
                padding: '12px 0',
                borderTop: '1px solid var(--border)',
              }}>
                <Avatar user={c.user} size={30} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 600, color: 'var(--navy)' }}>
                      {c.user.name}
                    </span>
                    <StarRating value={c.stars} small />
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text)', lineHeight: 1.5 }}>
                    {c.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={!booked && !isOwn && ride.available > 0 ? onBook : undefined}
          style={{
            width: '100%',
            background: booked ? '#e8faf2' : isOwn ? '#f6f8fd' : 'var(--blue)',
            color: booked ? 'var(--green)' : isOwn ? 'var(--text-muted)' : '#fff',
            border: 'none',
            padding: '14px',
            borderRadius: 14,
            fontFamily: 'var(--font-body)',
            fontWeight: 700,
            fontSize: '15px',
            cursor: booked || isOwn ? 'default' : 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            if (!booked && !isOwn) e.currentTarget.style.filter = 'brightness(1.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.filter = '';
          }}
        >
          {booked ? '✓ Place déjà réservée' : isOwn ? "C'est ton trajet" : '🚗 Réserver cette place'}
        </button>
      </div>
    </div>
  );
}
