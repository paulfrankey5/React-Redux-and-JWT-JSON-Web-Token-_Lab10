// src/App.jsx
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './authSlice';
import LoginForm from './LoginForm';
import Profile from './Profile';

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Redux + JWT Demo</h1>

      {auth.user ? (
        <>
          <p>
            Logged in as: <strong>{auth.user.username}</strong>
          </p>
          <button onClick={handleLogout}>Logout</button>
          <hr />
          <Profile />
        </>
      ) : (
        <>
          <LoginForm />
          {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
        </>
      )}
    </div>
  );
}

export default App;