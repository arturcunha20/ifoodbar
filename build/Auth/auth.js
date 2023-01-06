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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckToken = void 0;
const fireabase_1 = require("../fireabase");
const CheckToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        if (!token) {
            throw new Error("Please authenticate");
        }
        yield fireabase_1.admin.auth().verifySessionCookie(token, true)
            .then((UserData) => {
            req.headers['authorization'] = UserData.uid;
        }).catch((err) => {
            throw new Error(err.message);
        });
        next();
    }
    catch (err) {
        res.status(401).send(err);
    }
});
exports.CheckToken = CheckToken;
