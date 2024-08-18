const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authenticate = async (req, res, next) => {
  // الحصول على رأس Authorization
  const authHeader = req.header('Authorization');

  // التحقق من وجود الرأس
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  // استخراج التوكن من الرأس
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  try {
    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    
    // البحث عن المستخدم
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // تعيين المستخدم في الطلب
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;
