import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from './authSlice';

function LoginForm() {
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('123456');

  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart()); // Dispatch

    try {
      const res = await axios.post('http://localhost:4000/login', {
        username,
        password,
      });

      const { token, user } = res.data;

      dispatch(loginSuccess({ token, user })); // Dispatch
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      dispatch(loginFailure('Login failed'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>
          Username:{' '}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

export default LoginForm;