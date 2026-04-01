import { useState } from 'react';
import { MOCK_USERS, INITIAL_RIDES } from './data/mockData';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import OfferPage from './pages/OfferPage';
import MyRidesPage from './pages/MyRidesPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

const currentUser = MOCK_USERS[0];

export default function App() {
  const [page, setPage] = useState('home');
  const [rides, setRides] = useState(INITIAL_RIDES);

  const addRide = ride => setRides(r => [ride, ...r]);

  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar page={page} setPage={setPage} currentUser={currentUser} />

      {page === 'home'    && <HomePage    setPage={setPage} />}
      {page === 'search'  && <SearchPage  rides={rides} currentUser={currentUser} setPage={setPage} />}
      {page === 'offer'   && <OfferPage   currentUser={currentUser} onAddRide={addRide} />}
      {page === 'myrides' && <MyRidesPage rides={rides} currentUser={currentUser} />}
      {page === 'chat'    && <ChatPage    currentUser={currentUser} />}
      {page === 'profile' && <ProfilePage currentUser={currentUser} />}
    </div>
  );
}
