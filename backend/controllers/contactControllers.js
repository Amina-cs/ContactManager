const { contact } = require('../models');

// 1. GET ALL contactS (For a specific user)
const getcontacts = async (req, res) => {
  try {
    // In a real app, userId would come from a JWT token. 
    // For now, we'll take it from a query parameter: /api/contacts?userId=1
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required to fetch contacts" });
    }

    const contacts = await contact.findAll({ 
      where: { UserId: userId },
      order: [['name', 'ASC']] // Sorts alphabetically
    });
    
    res.json(contacts);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 2. CREATE contact
const createcontact = async (req, res) => {
  try {
    const { name, num, email, userId } = req.body;

    if (!name || !num || !userId) {
      return res.status(400).json({ error: "Name, number, and userId are required" });
    }

    const newcontact = await contact.create({
      name,
      num,
      email,
      UserId: userId
    });

    res.status(201).json(newcontact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 3. UPDATE contact
const updatecontact = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL: /api/contacts/5
    const { name, num, email } = req.body;

    const contact = await contact.findByPk(id);
    if (!contact) return res.status(404).json({ error: "contact not found" });

    await contact.update({ name, num, email });
    res.json(contact);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 4. DELETE contact
const deletecontact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await contact.destroy({ where: { id } });
    
    if (deleted) {
      res.json({ message: "contact deleted successfully" });
    } else {
      res.status(404).json({ error: "contact not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  getcontacts,
  createcontact,
  updatecontact,
  deletecontact
};