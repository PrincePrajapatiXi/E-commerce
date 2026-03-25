import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized access - No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Decode token and attach to req
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-12345');
    req.user = decoded; // Object containing { id }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized access - Invalid token' });
  }
};
