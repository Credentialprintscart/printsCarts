import jwt from 'jsonwebtoken';
import User from '@/models/User';
import connectDB from '@/lib/db';

export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const protect = async (req) => {
  let token;
  const authHeader = req.headers.get('authorization');

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      await connectDB();
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        throw new Error('Not authorized, user not found');
      }
      
      return user;
    } catch (error) {
      console.error('Auth protect error:', error.message);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    throw new Error('Not authorized, no token');
  }
};

export const admin = (user) => {
  if (user && user.isAdmin) {
    return true;
  } else {
    throw new Error('Not authorized as an admin');
  }
};
