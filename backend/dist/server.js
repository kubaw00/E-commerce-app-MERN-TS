"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_js_1 = require("./middleware/errorMiddleware.js");
const productRoutes_js_1 = __importDefault(require("./routes/productRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const orderRoutes_js_1 = __importDefault(require("./routes/orderRoutes.js"));
const uploadRoutes_js_1 = __importDefault(require("./routes/uploadRoutes.js"));
dotenv_1.default.config();
(0, db_js_1.default)();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
app.use(express_1.default.json());
app.use('/api/products', productRoutes_js_1.default);
app.use('/api/users', userRoutes_js_1.default);
app.use('/api/orders', orderRoutes_js_1.default);
app.use('/api/upload', uploadRoutes_js_1.default);
app.get('/api/config/paypal', (_, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '/uploads')));
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/build')));
    app.get('*', (_, res) => res.sendFile(path_1.default.resolve(path_1.default.resolve(), 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (_, res) => {
        res.send('API is running....');
    });
}
app.use(errorMiddleware_js_1.notFound);
app.use(errorMiddleware_js_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});
//# sourceMappingURL=server.js.map