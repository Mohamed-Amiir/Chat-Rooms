import fs from "fs";
import path from "path";

// Define the path to the users JSON file
const usersFilePath = path.join(__dirname, "../../data/users.json");

interface UserRecord {
  name: string;
  email: string;
  password: string;
  id: string;
}

class User {
  static getAllUsers(): UserRecord[] {
    try {
      const usersData = fs.readFileSync(usersFilePath, "utf-8");
      return JSON.parse(usersData);
    } catch (error) {
      console.error("Error reading users from file:", error);
      return [];
    }
  }

  static saveUser(newUser: UserRecord): void {
    try {
      const users = User.getAllUsers();
      users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing user to file:", error);
    }
  }

  static getUser(id: string): UserRecord | undefined {
    const users = User.getAllUsers();
    return users.find((user) => user.id === id);
  }

  static deleteUser(id: string): UserRecord | undefined {
    let users = User.getAllUsers();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser = users.splice(index, 1)[0];
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
      return deletedUser;
    }
    return undefined;
  }
}

export default User;
