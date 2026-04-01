import { useState } from 'react';
import { STATIONS } from '../data/mockData';
import { Avatar, Badge, Toast } from '../components/UI';

const TAG_OPTIONS = [
  'Musique OK', 'Silence apprécié', 'Non-fumeur',
  'Climatisé', 'Animaux OK', 'Café à bord', 'Podcast tech', 'Retour soir',
];

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
const fieldStyle = {
  width: '100%',
  border: '1.5px solid var(--border)',
  borderRadius: 10,
  padding: '10px 13px',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  color: 'var(--navy)',
  background: 'var(--white)',
  outline: 'none',
  transition: 'border-color 0.15s',
};

export default function OfferPage({ currentUser, onAddRide }) {
  const [form, setForm] = useState({
    from: '', to: 'EFREI Paris – Villejuif',
    date: '', time: '', seats: 2, price: 3,
    recurring: false, tags: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleTag = tag =>
    set('tags', form.tags.includes(tag)
      ? form.tags.filter(t => t !== tag)
      : [...form.tags, tag]);

  const validate = () => {
    const e = {};
    if (!form.from) e.from = true;
    if (!form.date) e.date = true;
    if (!form.time) e.time = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAddRide({
      id: Date.now(),
      driver: currentUser,
      ...form,
      available: form.seats,
      co2: +(form.seats * 0.4 + Math.random() * 0.5).toFixed(1),
      comments: [],
    });
    setSubmitted(true);
  };

  const isReady = form.from && form.date && form.time;

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        paddingTop: 62,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', animation: 'fadeUp 0.4s ease', padding: '20px' }}>
          <div style={{
            width: 90, height: 90,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8faf2, #c6f5e2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 42, margin: '0 auto 20px',
            boxShadow: '0 8px 28px rgba(13,185,122,0.2)',
          }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'var(--navy)', marginBottom: 10 }}>
            Trajet publié !
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text)', marginBottom: 10, fontSize: '14px', lineHeight: 1.6 }}>
            {form.from} → {form.to}<br />
            {new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })} à {form.time}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', marginBottom: 28, fontSize: '13px' }}>
            Tes camarades peuvent maintenant réserver une place.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                background: 'var(--blue)', color: '#fff', border: 'none',
                padding: '12px 24px', borderRadius: 12,
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px', cursor: 'pointer',
              }}
            >
              + Proposer un autre trajet
            </button>
          </div>
        </div>
        <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 62 }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <Avatar user={currentUser} size={48} />
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--navy)', margin: 0, lineHeight: 1.1 }}>
              Proposer un trajet
            </h1>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', marginTop: 3 }}>
              Tu conduis vers l'EFREI ? Partage et réduis tes frais 🚗
            </div>
          </div>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--white)',
          borderRadius: 20,
          padding: '28px',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow)',
        }}>

          {/* Route */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ ...labelStyle, color: errors.from ? 'var(--red)' : 'var(--text-muted)' }}>
                Point de départ {errors.from && '— requis'}
              </label>
              <select
                value={form.from}
                onChange={e => set('from', e.target.value)}
                style={{ ...fieldStyle, borderColor: errors.from ? 'var(--red)' : 'var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = errors.from ? 'var(--red)' : 'var(--border)'}
              >
                <option value="">Choisir une station…</option>
                {STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Destination</label>
              <select
                value={form.to}
                onChange={e => set('to', e.target.value)}
                style={fieldStyle}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              >
                <option value="EFREI Paris – Villejuif">EFREI Paris – Villejuif</option>
                {STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Date */}
            <div>
              <label style={{ ...labelStyle, color: errors.date ? 'var(--red)' : 'var(--text-muted)' }}>
                Date {errors.date && '— requise'}
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                style={{ ...fieldStyle, borderColor: errors.date ? 'var(--red)' : 'var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = errors.date ? 'var(--red)' : 'var(--border)'}
              />
            </div>

            {/* Time */}
            <div>
              <label style={{ ...labelStyle, color: errors.time ? 'var(--red)' : 'var(--text-muted)' }}>
                Heure de départ {errors.time && '— requise'}
              </label>
              <input
                type="time"
                value={form.time}
                onChange={e => set('time', e.target.value)}
                style={{ ...fieldStyle, borderColor: errors.time ? 'var(--red)' : 'var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = errors.time ? 'var(--red)' : 'var(--border)'}
              />
            </div>

            {/* Seats */}
            <div>
              <label style={labelStyle}>Nombre de places</label>
              <input
                type="number" min={1} max={7} value={form.seats}
                onChange={e => set('seats', +e.target.value)}
                style={fieldStyle}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Price */}
            <div>
              <label style={labelStyle}>Prix demandé (€/pers.)</label>
              <input
                type="number" min={0} max={20} step={0.5} value={form.price}
                onChange={e => set('price', +e.target.value)}
                style={fieldStyle}
                onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', margin: '6px 0 20px' }} />

          {/* Tags */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Ambiance du trajet</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              {TAG_OPTIONS.map(tag => {
                const active = form.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    style={{
                      padding: '6px 13px',
                      borderRadius: 20,
                      border: `1.5px solid ${active ? 'var(--blue)' : 'var(--border)'}`,
                      background: active ? '#e8f0fe' : 'var(--white)',
                      color: active ? 'var(--blue)' : 'var(--text)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recurring */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 20 }}>
            <input
              type="checkbox"
              checked={form.recurring}
              onChange={e => set('recurring', e.target.checked)}
              style={{ width: 16, height: 16, accentColor: 'var(--blue)', cursor: 'pointer' }}
            />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text)' }}>
              Trajet récurrent <span style={{ color: 'var(--text-muted)' }}>(tous les jours ouvrés)</span>
            </span>
          </label>

          {/* Eco preview */}
          {isReady && (
            <div style={{
              background: '#e8faf2',
              borderRadius: 12,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 20,
              border: '1px solid rgba(13,185,122,0.2)',
              animation: 'fadeUp 0.3s ease',
            }}>
              <span style={{ fontSize: '22px' }}>🌱</span>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--green)' }}>
                  Impact estimé
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#0a7a50' }}>
                  En remplissant {form.seats} place{form.seats > 1 ? 's' : ''}, tu économises ~{(form.seats * 0.4).toFixed(1)} kg CO₂ par trajet
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              background: 'var(--blue)',
              color: '#fff',
              border: 'none',
              padding: '14px',
              borderRadius: 13,
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'all 0.15s',
              boxShadow: '0 4px 18px rgba(26,108,245,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.06)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = ''; e.currentTarget.style.transform = ''; }}
          >
            🚗 Publier le trajet
          </button>
        </div>
      </div>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}
