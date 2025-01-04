const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, { user, databasePassword, password, UserPasswordModel }) => {
  // ตรวจสอบรหัสผ่าน
  const isMatch = await bcrypt.compare(password, databasePassword.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invalid credentials.',
    });
  }

  // สร้าง token
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) throw err;
      res.json({
        success: true,
        result: token,
        message: 'Logged in successfully.',
      });
    }
  );
};

module.exports = authUser;
