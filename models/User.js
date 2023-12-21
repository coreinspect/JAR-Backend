import { Schema, model } from "mongoose";
import pkg from "bcryptjs";
import pkg2 from "jsonwebtoken";
const { hash, compare } = pkg;
const { sign } = pkg2;

// Create user schema
const UserSchema = new Schema(
   {
      avatar: { type: String, default: "" },
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      verified: { type: Boolean, default: false },
      verificationCode: { type: String, required: false },
      admin: { type: Boolean, default: false },
   },
   { timestamps: true }
);

// Hash password before saving to database
UserSchema.pre("save", async function (next) {
   if (this.isModified("password")) {
      this.password = await hash(this.password, 10);
      return next();
   }
   return next();
});

// Generate JWT
UserSchema.methods.getJWTToken = async function () {
   return await sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
   });
};

//Comparing the password entered by the user if match from the database
UserSchema.methods.comparePassword = async function (enteredPassword) {
   return await compare(enteredPassword, this.password);
};

// Create user model

const User = model("User", UserSchema);

export default User;
