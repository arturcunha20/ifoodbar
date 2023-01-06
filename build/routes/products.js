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
const products_1 = __importDefault(require("../controllers/products"));
const auth_1 = require("../Auth/auth");
const fireabase_1 = require("../fireabase");
const router = (0, express_1.Router)();
router.route("/products/all")
    .get((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new products_1.default();
    const response = yield controller.getProducts(res);
    return res.send(response);
}));
router.route("/products/create")
    .post(fireabase_1.upload.single('imagem'), auth_1.CheckToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new products_1.default();
    const response = yield controller.create(req, res);
    return res.send(response);
}));
router.route("/products/byType")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new products_1.default();
    const response = yield controller.byType(req, res);
    return res.send(response);
}));
exports.default = router;
