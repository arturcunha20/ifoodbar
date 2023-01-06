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
exports.ProductsService = void 0;
const _crud = __importStar(require("../CloudFirestoreCRUD"));
const uuid_1 = require("uuid");
const fireabase_1 = require("../fireabase");
class ProductsService {
    create(name, preco, type, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = { name: name, uid: (0, uuid_1.v4)(), price: preco, type: type, urlImage: url };
            const result = yield _crud.post({ collection: "products", data: product });
            return result;
        });
    }
    getProductsAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.getAll({ collection: "products" });
            let productsType = [];
            if (result.status == "Success") {
                productsType = result.data;
            }
            return productsType;
        });
    }
    verifyProduct(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.get({ collection: "products", token: token });
            if (result.status == "Success")
                return true;
            else
                return false;
        });
    }
    queryByType(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield _crud.getAllQuery({ collection: "products", token: token, parameter: "type" });
            if (result.status == "Success")
                return result;
            else
                return false;
        });
    }
    uploadImage(image, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const FileName = name + "_" + Date.now() + "." + image.originalname.split(".").pop();
            const file = fireabase_1.admin.storage().bucket().file(FileName);
            const steam = file.createWriteStream({
                metadata: {
                    contentType: image.mimetype
                },
            });
            steam.on("error", () => {
                return "error";
            });
            steam.on("finish", () => __awaiter(this, void 0, void 0, function* () {
                yield file.makePublic();
            }));
            steam.end(image.buffer);
            return "https://storage.googleapis.com/" + fireabase_1.Bucket + "/" + FileName;
        });
    }
}
exports.ProductsService = ProductsService;
