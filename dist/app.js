"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/app.ts
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../src/app/modules/user/user.route")); // আপনার রাউট ফাইলের অবস্থান
const protected_route_1 = __importDefault(require("../src/routes/protected.route"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/api/protected", protected_route_1.default);
// API রুট
app.use("/api/users", user_route_1.default);
