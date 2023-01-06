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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const _crud = __importStar(require("../CloudFirestoreCRUD"));
class UserService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { name: data.name, uid: data.uid, email: data.email, password: data.password, userType: data.type };
            const result = yield _crud.post_user({ collection: "user", data: user, uid: true }, data.uid);
            return result;
        });
    }
    verifyType(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.get({ collection: "UserType", token: token });
            if (result.status == "Success")
                return true;
            else
                return false;
        });
    }
    verifyAdmin(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.get({ collection: "user", token: token });
            if (result.status == "Success" && result.data.userType == "2")
                return true;
            else
                return false;
        });
    }
    getUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.get({ collection: "user", token: uid });
            let user = [];
            if (result.status == "Success") {
                user = result.data;
            }
            return user;
        });
    }
    updateUser(uid, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(uid);
            user.name = name;
            const result = yield _crud.update({ collection: "user", token: uid, data: user });
            if (result.status == "Success")
                return true;
            else
                return false;
        });
    }
    addFavorites(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.post({ collection: "favorites", data: data });
            return result;
        });
    }
    delFavorite(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.DeleteDoc({ collection: "favorites", token: uid });
            return result;
        });
    }
    getFavorite(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.getAllQuery({ collection: "favorites", token: uid, parameter: "uidUser" });
            let favorites = [];
            if (result.status == "Success") {
                favorites = result.data;
            }
            return favorites;
        });
    }
}
exports.UserService = UserService;
