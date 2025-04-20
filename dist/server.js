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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("../src/app/modules/user/user.route")); // Adjust the path to your file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use("/api", user_route_1.default); // Example: prefixed with /api
app.use(express_1.default.json()); // Ensure the app can parse JSON request bodies
// Add a simple route for the root URL
app.get("/", (req, res) => {
    res.send("Welcome to the Smart Payroll API!");
});
// Your existing database connection and server start code
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.DATABASE_URL);
            console.log("✅ Database connected");
            app.listen(port, () => {
                console.log(`🚀 Server is running on port ${port}`);
            });
        }
        catch (err) {
            console.error("❌ Error connecting to DB:", err);
        }
    });
}
main();
