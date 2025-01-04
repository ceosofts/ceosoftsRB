const express = require('express');
const router = express.Router();
const login = require('../controllers/middlewaresControllers/createAuthMiddleware/login');

// เส้นทางสำหรับการเข้าสู่ระบบ
router.post('/login', login);

module.exports = router;