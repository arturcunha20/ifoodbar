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
const tsoa_1 = require("tsoa");
const response = __importStar(require("../responses"));
const OrdersService_1 = require("../service/OrdersService");
let OrdersController = class OrdersController {
    /**
     * Create a new order
     * @summary
     */
    addNewOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, products, price, description } = req.body;
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [token] is required." })));
                if (!products)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Products] is required." })));
                if (typeof products != "object")
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Products] is not correct." })));
                if (!price)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [price] is required." })));
                if (typeof price != "number" || price < 0)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [price] is not correct." })));
                if (!description)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [description] is required." })));
                const result = yield new OrdersService_1.OrdersService().create({ price: price, description: description, products: products, token: token });
                res.status(200).send({ status: "Success", message: "Create Order", data: result });
            }
            catch (error) {
            }
        });
    }
    /**
   * Get all orders
   * @summary
   */
    getOrders(res, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })));
                const data = yield new OrdersService_1.OrdersService().getOrders(token);
                if (data) {
                    res.status(200).send({ status: "Success", message: "All Orders", data: data });
                }
                else {
                    res.status(403).json(response.success("Error", [], res.statuscode));
                }
            }
            catch (e) { }
        });
    }
    /**
   * Get details from order
   * @summary
   */
    getOrderDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { OrderUID } = req.body;
                if (!OrderUID)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [OrderUID] is required." })));
                const data = yield new OrdersService_1.OrdersService().getDetails(OrderUID);
                if (data) {
                    res.status(200).send({ status: "Success", message: "Orders Details", data: data });
                }
                else {
                    res.status(403).json(response.success("Error", [], res.statuscode));
                }
            }
            catch (e) { }
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/create"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addNewOrder", null);
__decorate([
    (0, tsoa_1.Get)("/all"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrders", null);
__decorate([
    (0, tsoa_1.Post)("/details"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "getOrderDetails", null);
OrdersController = __decorate([
    (0, tsoa_1.Route)("addOrder")
], OrdersController);
exports.default = OrdersController;
