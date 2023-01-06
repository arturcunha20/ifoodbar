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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const ProductsTypeService_1 = require("./../service/ProductsTypeService");
const tsoa_1 = require("tsoa");
const response = __importStar(require("../responses"));
const ProductsService_1 = require("../service/ProductsService");
const UserService_1 = require("../service/UserService");
let ProductsController = class ProductsController extends tsoa_1.Controller {
    /**
   * Get all Products
   * @summary
   */
    getProducts(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield new ProductsService_1.ProductsService().getProductsAll();
            if (data.length > 0) {
                res.send({ status: "Success", message: "All data", data: data });
            }
            else {
                res.send({ status: "Error", message: "No data found", data: [] });
            }
        });
    }
    /**
   * Create a new product
   * @summary
   */
    create(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, type, token } = _req.body;
                if (!name)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Name] is required." })));
                if (!price)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Price] is required." })));
                if (!type)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Type] is required." })));
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Token] is required." })));
                if (!_req.file)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Imagem] is required." })));
                const data = yield new UserService_1.UserService().verifyAdmin(token);
                if (data) {
                    const resultType = yield new ProductsTypeService_1.ProductsTypeService().verifyType(type);
                    if (resultType == false)
                        throw new Error(res.status(403).json(response.error("Could not find Product Type", res.statusCode)));
                    let url = yield new ProductsService_1.ProductsService().uploadImage(_req.file, name);
                    const result = yield new ProductsService_1.ProductsService().create(name, price, type, url);
                    res.status(200).send({ status: "Success", message: "Create Product", data: result });
                }
                else
                    throw new Error(res.status(401).json(response.error("User Not Authenticated", res.statusCode)));
            }
            catch (e) { }
        });
    }
    /**
   * Show product by type
   * @summary A concise summary.
   */
    byType(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = _req.body;
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Token] is required." })));
                const resultType = yield new ProductsTypeService_1.ProductsTypeService().verifyType(token);
                if (resultType == false)
                    throw new Error(res.status(403).json(response.error("Could not find Product Type", res.statusCode)));
                const result = yield new ProductsService_1.ProductsService().queryByType(token);
                if (result == false)
                    throw new Error(res.status(404).json(response.error("Could not find Products", res.statusCode)));
                res.status(200).send({ status: "Success", message: "Product By Type", data: result });
            }
            catch (e) { }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/all"),
    __param(0, (0, tsoa_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, tsoa_1.Post)("/create"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Post)("/byType"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "byType", null);
ProductsController = __decorate([
    (0, tsoa_1.Route)("products")
], ProductsController);
exports.default = ProductsController;
