import { Avatar } from '../components/UI';
import { EmptyState } from '../components/UI';

function MiniRideCard({ ride, isDriver }) {
  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 14,
      padding: '14px 16px',
      border: '1px solid var(--border)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(26,108,245,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>
            {ride.from.replace('EFREI Paris – ', '')} → {ride.to.replace('EFREI Paris – ', '')}
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: 6 }}>
            📅 {new Date(ride.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} · 🕐 {ride.time}
          </div>
          {isDriver && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', background: '#e8f0fe', color: 'var(--blue)', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
                {ride.available}/{ride.seats} places
              </span>
              {ride.recurring && (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', background: '#fff8e8', color: '#b87a10', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>
                  🔁 Régulier
                </span>
              )}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '18px', color: 'var(--blue)' }}>
            {ride.price}€
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-muted)' }}>
            {isDriver ? 'conducteur' : 'passager'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MyRidesPage({ rides, currentUser }) {
  const myRides = rides.filter(r => r.driver.id === currentUser.id);
  const upcoming = rides.filter(r => r.driver.id !== currentUser.id).slice(0, 3);

  const totalCO2 = myRides.reduce((acc, r) => acc + r.co2, 0).toFixed(1);
  const totalKm = myRides.length * 18;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 62 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: 'var(--navy)', margin: '0 0 6px' }}>
            Mes trajets
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>
            Tes trajets proposés et vos réservations à venir
          </p>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
          {/* My drives */}
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: 'var(--navy)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              🚗 Trajets proposés
              <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', fontSize: '11px', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>
                {myRides.length}
              </span>
            </div>
            {myRides.length === 0 ? (
              <EmptyState
                icon="🚗"
                title="Aucun trajet proposé"
                subtitle="Propose ton premier trajet à tes camarades !"
              />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {myRides.map(r => <MiniRideCard key={r.id} ride={r} isDriver />)}
              </div>
            )}
          </div>

          {/* My bookings */}
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', color: 'var(--navy)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              📍 Prochains trajets
              <span style={{ background: '#e8faf2', color: 'var(--green)', fontSize: '11px', padding: '2px 8px', borderRadius: 20, fontWeight: 700 }}>
                {upcoming.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {upcoming.map(r => <MiniRideCard key={r.id} ride={r} />)}
            </div>
          </div>
        </div>

        {/* Eco dashboard */}
        <div style={{
          background: 'linear-gradient(135deg, #0b2417 0%, #0a4028 50%, #0d5e3a 100%)',
          borderRadius: 22,
          padding: '32px 28px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative */}
          <div style={{ position: 'absolute', right: -60, top: -60, width: 240, height: 240, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', right: 40, bottom: -80, width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />

          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: '#fff', marginBottom: 22, position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>🌱</span> Ton bilan écologique
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, position: 'relative' }}>
            {[
              { label: 'CO₂ économisé', value: `${totalCO2} kg`, sub: 'ce mois-ci', icon: '♻️', color: '#5effc0' },
              { label: 'Trajets partagés', value: myRides.length.toString(), sub: 'au total', icon: '🗺️', color: '#7eb8ff' },
              { label: 'Km parcourus', value: `${totalKm}`, sub: 'en covoiturage', icon: '🛣️', color: '#ffd06e' },
              { label: 'Équivalent arbre', value: `${(totalCO2 / 21).toFixed(1)}`, sub: 'arbres préservés', icon: '🌳', color: '#5effc0' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '18px 14px',
                textAlign: 'center',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ fontSize: '28px', marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', color: item.color, lineHeight: 1 }}>
                  {item.value}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.55)', marginTop: 5 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: item.color, marginTop: 3, opacity: 0.8 }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 22, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                Objectif du mois : 20 kg CO₂ économisés
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#5effc0', fontWeight: 700 }}>
                {Math.min(100, Math.round((totalCO2 / 20) * 100))}%
              </span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (totalCO2 / 20) * 100)}%`,
                background: 'linear-gradient(90deg, #0db97a, #5effc0)',
                borderRadius: 8,
                transition: 'width 1s ease',
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
