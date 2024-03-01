"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Define the path to the users JSON file
const usersFilePath = path_1.default.join(__dirname, "../../data/users.json");
class User {
    static getAllUsers() {
        try {
            const usersData = fs_1.default.readFileSync(usersFilePath, "utf-8");
            return JSON.parse(usersData);
        }
        catch (error) {
            console.error("Error reading users from file:", error);
            return [];
        }
    }
    static saveUser(newUser) {
        try {
            const users = User.getAllUsers();
            users.push(newUser);
            fs_1.default.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
        }
        catch (error) {
            console.error("Error writing user to file:", error);
        }
    }
    static getUser(id) {
        const users = User.getAllUsers();
        return users.find((user) => user.id === id);
    }
    static deleteUser(id) {
        let users = User.getAllUsers();
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            const deletedUser = users.splice(index, 1)[0];
            fs_1.default.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
            return deletedUser;
        }
        return undefined;
    }
}
exports.default = User;
//# sourceMappingURL=UserModel.js.map