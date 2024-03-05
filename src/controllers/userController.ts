import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel";
import config from "config";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: any): Promise<void> => {
  try {
    // Check if the user already exists
    const user: IUser | null = await User.findOne({
      email: req.body.email,
    }).exec();
    if (user) {
      return res.status(400).send("User Already registered !!!");
    } else {
      const { name, email, password, address } = req.body;

      // Hashing Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Add new user
      const newUser: IUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        address: address,
      });
      await newUser.save();
      res.send("Registration done successfully...WELCOME!!");
      // JSON WEB TOKEN
      if (!config.get('jwtsec')) {
        return res.status(500).send('Request can not be fulfilled ... token is not defined !!');
      }
      const token = newUser.genAuthToken();
      res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export default registerUser;
