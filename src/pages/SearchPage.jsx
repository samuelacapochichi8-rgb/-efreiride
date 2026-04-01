import { useState } from 'react';
import { STATIONS } from '../data/mockData';
import { RideCard, RideModal } from '../components/RideCard';
import { Toast, EmptyState, Button, Select, Input } from '../components/UI';

const SORT_OPTIONS = [
  { value: 'time', label: '🕐 Horaire' },
  { value: 'price', label: '💶 Prix' },
  { value: 'rating', label: '⭐ Note' },
  { value: 'co2', label: '🌱 Eco' },
];

export default function SearchPage({ rides, currentUser, setPage }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('EFREI Paris – Villejuif');
  const [date, setDate] = useState('2026-04-02');
  const [results, setResults] = useState(rides);
  const [booked, setBooked] = useState([]);
  const [toast, setToast] = useState({ visible: false, msg: '', type: 'success' });
  const [selectedRide, setSelectedRide] = useState(null);
  const [sortBy, setSortBy] = useState('time');
  const [hasSearched, setHasSearched] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ visible: true, msg, type });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleSearch = () => {
    const filtered = rides.filter(r => {
      const matchFrom = !from || r.from.toLowerCase().includes(from.toLowerCase());
      const matchTo = !to || r.to.toLowerCase().includes(to.toLowerCase());
      const matchDate = !date || r.date === date;
      return matchFrom && matchTo && matchDate;
    });
    setResults(filtered);
    setHasSearched(true);
  };

  const handleBook = ride => {
    if (booked.includes(ride.id)) return;
    setBooked([...booked, ride.id]);
    setSelectedRide(null);
    showToast(`✅ Place réservée chez ${ride.driver.name.split(' ')[0]} !`);
  };

  const sorted = [...results].sort((a, b) => {
    if (sortBy === 'time')   return a.time.localeCompare(b.time);
    if (sortBy === 'price')  return a.price - b.price;
    if (sortBy === 'rating') return b.driver.rating - a.driver.rating;
    if (sortBy === 'co2')    return a.co2 - b.co2;
    return 0;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 62 }}>
      <Toast message={toast.msg} type={toast.type} visible={toast.visible} />

      {/* ── Search bar ── */}
      <div style={{
        background: 'var(--white)',
        borderBottom: '1px solid var(--border)',
        padding: '20px 28px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {/* From */}
            <div style={{ flex: 1, minWidth: 150 }}>
              <label style={labelStyle}>Départ</label>
              <select value={from} onChange={e => setFrom(e.target.value)} style={selectStyle}>
                <option value="">Toutes les villes</option>
                {STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Swap icon */}
            <div style={{
              display: 'flex', alignItems: 'flex-end', paddingBottom: 10,
            }}>
              <div style={{ fontSize: '16px', color: 'var(--text-muted)' }}>⇄</div>
            </div>

            {/* To */}
            <div style={{ flex: 1, minWidth: 150 }}>
              <label style={labelStyle}>Destination</label>
              <select value={to} onChange={e => setTo(e.target.value)} style={selectStyle}>
                <option value="">Toutes destinations</option>
                <option value="EFREI Paris – Villejuif">EFREI Paris – Villejuif</option>
                {STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Date */}
            <div style={{ minWidth: 150 }}>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={selectStyle}
              />
            </div>

            {/* Button */}
            <button
              onClick={handleSearch}
              style={{
                background: 'var(--blue)',
                color: '#fff',
                border: 'none',
                padding: '11px 26px',
                borderRadius: 11,
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                boxShadow: '0 3px 14px rgba(26,108,245,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.07)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; }}
            >
              🔍 Rechercher
            </button>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 28px' }}>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>
            <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>{sorted.length}</strong>{' '}
            trajet{sorted.length > 1 ? 's' : ''} trouvé{sorted.length > 1 ? 's' : ''}
          </div>

          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Trier par
            </span>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                style={{
                  background: sortBy === opt.value ? 'var(--blue)' : 'var(--white)',
                  color: sortBy === opt.value ? '#fff' : 'var(--text)',
                  border: `1px solid ${sortBy === opt.value ? 'var(--blue)' : 'var(--border)'}`,
                  padding: '5px 12px',
                  borderRadius: 8,
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty */}
        {sorted.length === 0 && (
          <EmptyState
            icon="🔍"
            title="Aucun trajet trouvé"
            subtitle="Essaie de modifier tes critères, ou propose toi-même un trajet !"
            action={
              <button
                onClick={() => setPage('offer')}
                style={{
                  background: 'var(--blue)',
                  color: '#fff',
                  border: 'none',
                  padding: '10px 22px',
                  borderRadius: 10,
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                Proposer un trajet
              </button>
            }
          />
        )}

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sorted.map((ride, i) => (
            <div key={ride.id} style={{ animationDelay: `${i * 0.06}s` }}>
              <RideCard
                ride={ride}
                booked={booked.includes(ride.id)}
                onBook={() => handleBook(ride)}
                onDetail={() => setSelectedRide(ride)}
                isOwn={ride.driver.id === currentUser.id}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedRide && (
        <RideModal
          ride={selectedRide}
          booked={booked.includes(selectedRide.id)}
          onBook={() => handleBook(selectedRide)}
          onClose={() => setSelectedRide(null)}
          isOwn={selectedRide.driver.id === currentUser.id}
        />
      )}
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--text-muted)',
  marginBottom: 5,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};
const selectStyle = {
  width: '100%',
  border: '1.5px solid var(--border)',
  borderRadius: 10,
  padding: '9px 12px',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  color: 'var(--navy)',
  background: 'var(--white)',
  outline: 'none',
  cursor: 'pointer',
  transition: 'border-color 0.15s',
};
