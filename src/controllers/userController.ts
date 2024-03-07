import { Request, Response } from "express";
import User, { IUser } from "../models/UserModel";
import config from "config";
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // console.log("Request Body:", req.body.name); // Log the entire request body

    // if (req.body.email) {
    //   console.log("Email:", req.body.email); // Log the email property specifically
    // } else {
    //   console.log("Email is missing from request body");
    // }

    // Check if the user already exists
    const user: IUser | null = await User.findOne({
      email: req.body.email,
    }).exec();
    if (user) {
      res.status(400).send("User Already registered !!!");
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
      // res.send("Registration done successfully...WELCOME!!");
      // JSON WEB TOKEN
      if (!config.get("jwtsec")) {
        res
          .status(500)
          .send("Request can not be fulfilled ... token is not defined !!");
      }
      const token = newUser.genAuthToken();
      res.status(200).json({ status: "success", token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    //Check Email
    const user: IUser | null = await User.findOne({ email: email }).exec();
    if (!user) res.status(400).send("Invaild Email!!");
    else {
      //Check Password
      let validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) res.status(400).send("Invalid Password !!");
      else {
        // Successfully logged in
        // JWT
        if (!config.get("jwtsec"))
          res.status(500).send("Token is NOT defined !!!");
        else {
          const token = user.genAuthToken();
          res.status(200).json({ status: "success", token });
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

export default { registerUser, loginUser };
