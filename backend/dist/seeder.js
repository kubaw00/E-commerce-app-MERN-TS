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
const dotenv_1 = __importDefault(require("dotenv"));
require("colors");
const users_js_1 = __importDefault(require("./data/users.js"));
const products_js_1 = __importDefault(require("./data/products.js"));
const userModel_js_1 = __importDefault(require("./models/userModel.js"));
const productModel_js_1 = __importDefault(require("./models/productModel.js"));
const orderModel_js_1 = __importDefault(require("./models/orderModel.js"));
const db_js_1 = __importDefault(require("./config/db.js"));
dotenv_1.default.config();
(0, db_js_1.default)();
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield orderModel_js_1.default.deleteMany();
        yield productModel_js_1.default.deleteMany();
        yield userModel_js_1.default.deleteMany();
        const createdUsers = yield userModel_js_1.default.insertMany(users_js_1.default);
        const adminUser = createdUsers[0]._id;
        const createdProducts = products_js_1.default.map((product) => {
            return Object.assign(Object.assign({}, product), { user: adminUser });
        });
        yield productModel_js_1.default.insertMany(createdProducts);
        console.log('Data Imported'.green.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield orderModel_js_1.default.deleteMany();
        yield productModel_js_1.default.deleteMany();
        yield userModel_js_1.default.deleteMany();
        console.log('Data Destroyed'.red.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
});
if (process.argv[2] === '-d') {
    destroyData();
}
else {
    importData();
}
//# sourceMappingURL=seeder.js.map