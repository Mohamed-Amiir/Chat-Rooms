"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../models/UserModel"));
const registerCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Check if the user already exists
        const existingUser = UserModel_1.default.getAllUsers().find(user => user.email === email);
        if (existingUser) {
            res.status(400).send("User already registered!");
        }
        else {
            // Create a new user object
            const newUser = {
                name,
                email,
                password,
                id: Math.random().toString(36).substring(7) // Generate a random ID
            };
            // Save the new user
            UserModel_1.default.saveUser(newUser);
            res.status(200).send("User registered successfully!");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});
exports.default = registerCustomer;
//# sourceMappingURL=userController.js.map