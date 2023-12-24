import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Middleware to protect the routes of userProfile
const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(id).select('-password');

      if (!user) {
        let error = new Error('User not found');
        error.statusCode = 404;
        console.error('User not found:', { id }); // Log user not found
        return next(error);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error); // Log authentication error
      let err = new Error('Not authorized, Token is not valid');
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error('Not authorized, No token');
    error.statusCode = 401;
    next(error);
  }
};

export { authGuard };
