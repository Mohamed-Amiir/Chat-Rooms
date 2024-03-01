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
const UserModel_js_1 = __importDefault(require("../../dist/models/UserModel.js"));
const registerCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if the customer already exists
        const existingUser = yield UserModel_js_1.default.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(400).send("User Already registered !!!");
        }
        else {
            const { name, email, password, address } = req.body;
            // Create a new user instance
            const newUser = new UserModel_js_1.default({
                name,
                email,
                password,
                address,
            });
            // Save the new user to the database
            yield newUser.save();
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