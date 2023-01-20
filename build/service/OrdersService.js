"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const _crud = __importStar(require("../CloudFirestoreCRUD"));
const axios_1 = __importDefault(require("axios"));
class OrdersService {
    create(_data) {
        return __awaiter(this, void 0, void 0, function* () {
            const Order = { uid: "0", datetime: "" + new Date().toLocaleString(), price: _data.price, description: _data.description, state: 0, UserUid: _data.token };
            let result = [];
            let res;
            res = yield _crud.post({ collection: "orders", data: Order });
            result.push(res);
            yield _data.products.forEach((orderProduct) => __awaiter(this, void 0, void 0, function* () {
                res = yield _crud.post({ collection: "orderProduct", data: { Orders_uID: result[0].data.uid, Products_uID: orderProduct.Products_uID, Quantity: orderProduct.Quantity } });
                result.push(res);
            }));
            return result;
        });
    }
    getOrdersUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.getAllQuery({ collection: "orders", token: uid, parameter: "UserUid" });
            let orders = [];
            if (result.status == "Success")
                orders = result.data;
            return orders;
        });
    }
    getOrdersById(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.getAllQuery({ collection: "orders", token: uid, parameter: "uid" });
            let orders = [];
            if (result.status == "Success")
                orders = result.data;
            return orders;
        });
    }
    verifyOrder(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.get({ collection: "orders", token: uid });
            if (result.status == "Success")
                return true;
            return false;
        });
    }
    updateState(_uid, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getOrdersById(order);
            result[0].state = 1;
            const resultUpdate = yield _crud.update({ collection: "orders", token: order, data: result[0] });
            if (resultUpdate)
                return result[0];
            return false;
        });
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.getAll({ collection: "orders" });
            let orders = [];
            if (result.status == "Success")
                orders = result.data;
            return orders;
        });
    }
    getDetails(uid) {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.getAllQuery({ collection: "orderProduct", token: uid, parameter: "Orders_uID" });
            let orders = [];
            try {
                for (var _d = true, _e = __asyncValues(result.data), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const res = _c;
                        const product = yield _crud.get({ collection: "products", token: res.Products_uID });
                        res.Products_uID = product.data.name;
                        orders.push(res);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return orders;
        });
    }
    notification(device, order) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Authorization': 'Bearer AAAA1OK4ayk:APA91bH1qmqQoC3KtS18HJtUjTxbq1uOzFIyB_5SZBQvuy3xqtdczJhtKu1SEXXtvWDdj8RsJjHuI3ebrICGoTOtmP8Jz_QSY8Ikjz-uJf28MWu-t0Ta0lm4HErziiROQ_Sag4M_Owlj',
                'Content-Type': 'application/json'
            };
            const data = {
                to: device.tokendevice,
                collapse_key: "type_a",
                notification: {
                    body: "Pedido N" + order.description + " esta pronto",
                    title: "IFoodBar"
                }
            };
            yield axios_1.default.post('https://fcm.googleapis.com/fcm/send', data, { headers: headers })
                .then(response => {
                console.log(response.data);
                return true;
            })
                .catch(error => {
                console.log(error);
                return false;
            });
        });
    }
}
exports.OrdersService = OrdersService;
