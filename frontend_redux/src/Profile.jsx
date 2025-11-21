import { useSelector } from 'react-redux';

function Profile() {
  const auth = useSelector((state) => state.auth);

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h2>User Info (from Redux)</h2>
      <p>
        Username: <strong>{auth.user.username}</strong>
      </p>
      <p>
        Name: <strong>{auth.user.name}</strong>
      </p>
      <p>
        Token (first 30 chars):{' '}
        <code>{auth.token ? auth.token.slice(0, 30) + '...' : '-'}</code>
      </p>
    </div>
  );
}

export default Profile;
