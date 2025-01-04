const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      success: false,
      result: null,
      message: 'No authentication token, authorization denied.',
      jwtExpired: true,
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      result: null,
      message: 'Token verification failed, authorization denied.',
      jwtExpired: true,
    });
  }
};

module.exports = authMiddleware;