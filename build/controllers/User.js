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
const fireabase_1 = require("../fireabase");
const auth_1 = require("firebase/auth");
const UserService_1 = require("../service/UserService");
const ProductsService_1 = require("../service/ProductsService");
let UserController = class UserController extends tsoa_1.Controller {
    getUser(res, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })));
                const data = yield new UserService_1.UserService().getUser(token);
                if (data)
                    res.status(200).json(response.success("User Data", [data], res.statusCode));
                else
                    res.status(403).json(response.success("Error", [], res.statuscode));
            }
            catch (e) { }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, token } = req.body;
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })));
                if (!name)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [Name] is required." })));
                const result = yield new UserService_1.UserService().updateUser(token, name);
                if (result)
                    res.status(200).json(response.success("Update", [result], res.statusCode));
                else
                    res.status(403).json(response.success("Error", [], res.statuscode));
            }
            catch (e) { }
        });
    }
    /**
     * Login a user
     *
     * @summary
     */
    LogIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const expiresIn = 60 * 60 * 24 * 2 * 1000; //segundos * minutos * horas * dias * ms
            try {
                if (!email)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [email] is required." })));
                if (!password)
                    throw new Error(res.status(422).json(response.validation({ type: "Field [password] is required." })));
                yield (0, auth_1.signInWithEmailAndPassword)(fireabase_1.auth, email, password)
                    .then(({ user }) => __awaiter(this, void 0, void 0, function* () {
                    yield user.getIdToken()
                        .then((idToken) => __awaiter(this, void 0, void 0, function* () {
                        yield fireabase_1.admin.auth().createSessionCookie(idToken, { expiresIn })
                            .then((sessionCookie) => __awaiter(this, void 0, void 0, function* () {
                            const options = { maxAge: expiresIn, httpOnly: true };
                            const userGet = yield new UserService_1.UserService().getUser(user.uid);
                            res.cookie("session", sessionCookie, options);
                            res.status(200).json(response.success("Session Created", [sessionCookie, userGet], res.statusCode));
                        }), (error) => {
                            res.status(403).json(response.error(error.message, res.statusCode));
                        });
                    }))
                        .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)); });
                }))
                    .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)); })
                    .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)); });
            }
            catch (e) { }
        });
    }
    /**
     * Create a user
     *
     * @summary y.
     */
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = req.body;
            try {
                if (!email)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [email] is required." })));
                if (!password)
                    throw new Error(res.status(422).json(response.validation({ type: "Field [password] is required." })));
                if (!name)
                    throw new Error(res.status(422).json(response.validation({ type: "Field [name] is required." })));
                if (req.body.type == undefined)
                    req.body.type = "1";
                else {
                    const resultType = yield new UserService_1.UserService().verifyType(req.body.type);
                    if (resultType == false)
                        throw new Error(res.status(403).json(response.error("Could not find User Type", res.statusCode)));
                }
                yield (0, auth_1.createUserWithEmailAndPassword)(fireabase_1.auth, email, password)
                    .then((usercredentials) => __awaiter(this, void 0, void 0, function* () {
                    req.body.uid = usercredentials.user.uid;
                    const result = yield new UserService_1.UserService().create(req.body);
                    if (result.status == 'Success') {
                        res.status(200).send({ status: "Success", message: "Account created successfully.", data: result.data });
                    }
                    else {
                        res.status(403).json(response.error("Some error occurred while creating the user", res.statusCode));
                    }
                }))
                    .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)); });
            }
            catch (e) { }
        });
    }
    /**
    * Logout a user
    *
    * @summary
    */
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("session");
            console.log(req.body);
            fireabase_1.auth.signOut().catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return errorCode + errorMessage;
            });
            return "Sucesso";
        });
    }
    /**
     * Add a product to fuser favorites
     * @summary A concise summary.
     */
    addFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, uidProduct } = req.body;
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })));
                if (!uidProduct)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uidProduct] is required." })));
                const resultType = yield new ProductsService_1.ProductsService().verifyProduct(uidProduct);
                if (resultType == false)
                    throw new Error(res.status(403).json(response.error("Could not find Product", res.statusCode)));
                const result = yield new UserService_1.UserService().addFavorites({ uidProduct: uidProduct, uidUser: token });
                if (result.status == 'Success') {
                    res.status(200).send({ status: "Success", message: "Product added to favorites successfully.", data: result.data });
                }
                else {
                    res.status(403).json(response.error("An error occurred while adding the product to favorites", res.statusCode));
                }
            }
            catch (err) { }
        });
    }
    /**
     * Delete a product from user favorites
     * @summary
     */
    delFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, uidFavorites } = req.body;
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })));
                if (!uidFavorites)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uidFavorites] is required." })));
                const result = yield new UserService_1.UserService().delFavorite(uidFavorites);
                res.send(result);
            }
            catch (err) { }
        });
    }
    /**
    * Get all the favorites from a user
    * @summary
    */
    getAllFavorites(res, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [uid] is required." })));
                const data = yield new UserService_1.UserService().getFavorite(token);
                if (data.length > 0) {
                    res.send({ status: "Success", message: "All data", data: data });
                }
                else {
                    res.send({ status: "Error", message: "No data found", data: [] });
                }
            }
            catch (e) { }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/")
    /**
     * Get a user
     * @summary
     */
    ,
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, tsoa_1.Put)("/update")
    /**
     * Update a user
     * @summary
     */
    ,
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "LogIn", null);
__decorate([
    (0, tsoa_1.Post)("/signin"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
__decorate([
    (0, tsoa_1.Post)("/signOut"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signOut", null);
__decorate([
    (0, tsoa_1.Post)("/addFavorites"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addFavorites", null);
__decorate([
    (0, tsoa_1.Delete)("/delFavorites"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delFavorites", null);
__decorate([
    (0, tsoa_1.Get)("/allFavorites"),
    __param(0, (0, tsoa_1.Request)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Hidden)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllFavorites", null);
UserController = __decorate([
    (0, tsoa_1.Route)("user")
], UserController);
exports.default = UserController;
