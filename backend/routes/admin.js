const express = require('express');
const router = express.Router();
const { getAllUsernames } = require('../controllers/adminController');

router.get('/users', getAllUsernames);

module.exports = router;