import User from "../models/User.js";
const registerUser = async (req, res, next) => {
   try {
      const { name, email, password } = req.body;

      // Check if user already exists or not
      let user = await User.findOne({ email });
      if (user) {
         throw new Error("User already exists");
      }
      // Creating a new user
      user = await User.create({ name, email, password });
      return res.status(201).json({
         _id: user._id,
         avatar: user.avatar,
         name: user.name,
         email: user.email,
         verified: user.verified,
         admin: user.admin,
         token: await user.getJWTToken(),
      });
   } catch (error) {
      // res.status(500).json({ message: error.message });
      next(error);
   }
};

// Login User
const loginUser = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      // Condition for the user
      if (!user) {
         throw new Error("Email Credentials do not match");
      }

      if (await user.comparePassword(password)) {
         return res.status(200).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.getJWTToken(),
         });
      } else {
         throw new Error("Password Credentials do not match");
      }
   } catch (error) {
      next(error);
   }
};

// User Profile
const userProfile = async (req, res, next) => {
   try {
      let user = await User.findById(req.user._id);

      if (user) {
         return res.status(201).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
         });
      } else {
         let error = new Error("User not found");
         error.statusCode = 404;
         next(error);
      }
   } catch (error) {
      next(error);
   }
};
export { registerUser, loginUser, userProfile };
