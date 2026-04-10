const { User } = require('../models');


 const register=async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password required' });
  try {
    const existing = await User.findOne({ where: { username } });
    if (existing) return res.status(409).json({ error: 'Username already taken' });
    const user = await User.create({ username, pwd:password }); 
    res.json({ id: user.id, username: user.username });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

 const login=async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, pwd:password } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ id: user.id, username: user.username });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { 
    register,
    login 
};