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
const config_1 = __importDefault(require("config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("Request Body:", req.body.name); // Log the entire request body
        // if (req.body.email) {
        //   console.log("Email:", req.body.email); // Log the email property specifically
        // } else {
        //   console.log("Email is missing from request body");
        // }
        // Check if the user already exists
        const user = yield UserModel_1.default.findOne({
            email: req.body.email,
        }).exec();
        if (user) {
            res.status(400).send("User Already registered !!!");
        }
        else {
            const { name, email, password, address } = req.body;
            // Hashing Password
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            // Add new user
            const newUser = new UserModel_1.default({
                name: name,
                email: email,
                password: hashedPassword,
                address: address,
            });
            yield newUser.save();
            // res.send("Registration done successfully...WELCOME!!");
            // JSON WEB TOKEN
            if (!config_1.default.get("jwtsec")) {
                res
                    .status(500)
                    .send("Request can not be fulfilled ... token is not defined !!");
            }
            const token = newUser.genAuthToken();
            res.status(200).json({ status: "success", token });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Registration failed" });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //Check Email
        const user = yield UserModel_1.default.findOne({ email: email }).exec();
        if (!user)
            res.status(400).send("Invaild Email!!");
        else {
            //Check Password
            let validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                res.status(400).send("Invalid Password !!");
            else {
                // Successfully logged in
                // JWT
                if (!config_1.default.get("jwtsec")) {
                    res.status(500).send("Token is NOT defined !!!");
                }
                else {
                    const token = user.genAuthToken();
                    res.status(200).json({ status: "success", token, user });
                }
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
});
exports.default = { registerUser, loginUser };
//# sourceMappingURL=userController.js.map