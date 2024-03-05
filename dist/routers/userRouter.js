"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userMwValidator_1 = __importDefault(require("../middlewares/userMwValidator"));
const router = express_1.default.Router();
// Customer registration
router.post("/signup", userMwValidator_1.default, userController_1.default);
exports.default = router;
//# sourceMappingURL=userRouter.js.map