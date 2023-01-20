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
const express_1 = require("express");
const auth_1 = require("../Auth/auth");
const orders_1 = __importDefault(require("../controllers/orders"));
const router = (0, express_1.Router)();
router.route("/orders/create")
    .post(auth_1.CheckToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new orders_1.default();
    const response = yield controller.addNewOrder(req, res);
    return res.send(response);
}));
router.route("/orders/allUser")
    .post(auth_1.CheckToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new orders_1.default();
    const response = yield controller.getOrdersUser(res, req.body.token);
    return res.send(response);
}));
router.route("/orders/all")
    .get((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new orders_1.default();
    const response = yield controller.getOrders(res);
    return res.send(response);
}));
router.route("/orders/details")
    .post(auth_1.CheckToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new orders_1.default();
    const response = yield controller.getOrderDetails(req, res);
    return res.send(response);
}));
router.route("/orders/stateChange")
    .put(auth_1.CheckToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new orders_1.default();
    const response = yield controller.changeStateOrder(req, res);
    return res.send(response);
}));
exports.default = router;
