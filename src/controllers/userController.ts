import User from "../models/UserModel";

interface UserRecord {
  name: string;
  email: string;
  password: string;
  id: string;
}
const registerCustomer = async (req: any, res: any): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = User.getAllUsers().find(user => user.email === email);

    if (existingUser) {
      res.status(400).send("User already registered!");
    } else {
      // Create a new user object
      const newUser: UserRecord = {
        name,
        email,
        password,
        id: Math.random().toString(36).substring(7) // Generate a random ID
      };

      // Save the new user
      User.saveUser(newUser);

      res.status(200).send("User registered successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export default registerCustomer;
