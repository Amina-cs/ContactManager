const express = require('express');
const router = express.Router();
const { 
  getcontacts, 
  createcontact, 
  updatecontact, 
  deletecontact 
} = require('../controllers/contactControllers');

router.get('/', getcontacts);          // GET /api/contacts?userId=1
router.post('/', createcontact);       // POST /api/contacts
router.put('/:id', updatecontact);    // PUT /api/contacts/ID
router.delete('/:id', deletecontact); // DELETE /api/contacts/ID

module.exports = router;