const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 4000;

const JWT_SECRET = 'my-super-secret-key';

const fakeUser = {
  id: 1,
  username: 'testuser',
  passwordHash: bcrypt.hashSync('123456', 10),
  name: 'Test User'
};

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username !== fakeUser.username) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = bcrypt.compareSync(password, fakeUser.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { userId: fakeUser.id, username: fakeUser.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({
    token,
    user: {
      id: fakeUser.id,
      username: fakeUser.username,
      name: fakeUser.name
    }
  });
});

app.listen(PORT, () => {
  console.log(`JWT auth server running on http://localhost:${PORT}`);
});