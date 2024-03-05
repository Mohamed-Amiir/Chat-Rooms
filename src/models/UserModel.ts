import mongoose, { Schema, Document, Model } from "mongoose";
import jwt from "jsonwebtoken";
import config from "config";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: string;
  genAuthToken: () => string;
}

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

userSchema.methods.genAuthToken = function (): string {
  const token = jwt.sign(
    {
      usrid: this._id,
    },
    config.get("jwtsec")
  );
  return token;
};

const User: Model<IUser> = mongoose.model<IUser>("users", userSchema);

export default User;
