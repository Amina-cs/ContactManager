const { User } = require('../models');

const getAllUsernames = async (req, res) => {
  try {
    // Only fetch the username and id, don't send passwords!
    const users = await User.findAll({
      attributes: ['id', 'username', 'role', 'createdAt']
    });
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getAllUsernames };