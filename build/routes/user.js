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
const User_1 = __importDefault(require("../controllers/User"));
const auth_1 = require("../Auth/auth");
const router = (0, express_1.Router)();
router.route("/user")
    .get(auth_1.CheckToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.getUser(res, req.body.token);
    return res.send(response);
}));
router.route("/user/update")
    .put(auth_1.CheckToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.updateUser(req, res);
    return res.send(response);
}));
router.route("/user/login")
    .post((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.LogIn(_req, res);
    return res.send(response);
}));
router.route("/user/changeDevice")
    .post(auth_1.CheckToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.deviceChange(_req, res);
    return res.send(response);
}));
router.route("/user/signin")
    .post((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.signIn(_req, res);
    return res.send(response);
}));
router.route("/user/signOut")
    .post((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.signOut(_req, res);
    return res.send(response);
}));
router.route("/user/addFavorites")
    .post(auth_1.CheckToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.addFavorites(_req, res);
    return res.send(response);
}));
router.route("/user/delFavorites")
    .delete(auth_1.CheckToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.delFavorites(_req, res);
    return res.send(response);
}));
router.route("/user/allFavorites")
    .get(auth_1.CheckToken, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new User_1.default();
    const response = yield controller.getAllFavorites(res, _req.body.token);
    return res.send(response);
}));
exports.default = router;
