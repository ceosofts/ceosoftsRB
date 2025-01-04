require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const Joi = require('joi');

const mongoose = require('mongoose');

const authUser = require('./authUser');
const bcrypt = require('bcryptjs');

const password = 'B00Nchalerm';
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log(hashedPassword);

const login = async (req, res) => {
  const { userModel, email, password } = req.body; // ดึง userModel, email, password จาก req.body

  if (!userModel || !email || !password) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Missing required fields.',
    });
  }

  const UserPasswordModel = mongoose.model(userModel + 'Password');
  const UserModel = mongoose.model(userModel);

  // validate
  const objectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    password: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({ email, password });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: 'Invalid/Missing credentials.',
      errorMessage: error.message,
    });
  }

  const user = await UserModel.findOne({ email: email, removed: false });

  if (!user)
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No account with this email has been registered.',
    });

  const databasePassword = await UserPasswordModel.findOne({ email: email, removed: false });

  if (!user.enabled)
    return res.status(409).json({
      success: false,
      result: null,
      message: 'Your account is disabled, contact your account adminstrator',
    });

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

module.exports = login;