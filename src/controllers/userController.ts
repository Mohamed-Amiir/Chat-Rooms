import User from "../../dist/models/UserModel.js"

const registerCustomer = async (req: any, res: any): Promise<void> => {
  try {
    // Check if the customer already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).send("User Already registered !!!");
    } else {
      const { name, email, password, address } = req.body;

      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password,
        address,
      });

      // Save the new user to the database
      await newUser.save();

      res.status(200).send("User registered successfully!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export default registerCustomer;
