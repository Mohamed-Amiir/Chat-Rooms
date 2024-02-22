"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function formatMessage(userName, text) {
    return {
        userName,
        text,
        time: (0, moment_1.default)().format('h:mm a'),
    };
}
exports.default = formatMessage;
//# sourceMappingURL=message.js.map