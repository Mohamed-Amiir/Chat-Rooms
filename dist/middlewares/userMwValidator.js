"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userValidatior_1 = __importDefault(require("../util/userValidatior"));
const validate = (req, res, next) => {
    let valid = userValidatior_1.default.validate(req.body);
    if (valid) {
        req.valid = 1;
        next();
    }
    else {
        res.status(403).send('Forbidden command !!');
    }
};
exports.default = validate;
//# sourceMappingURL=userMwValidator.js.map