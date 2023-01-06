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
const firestore_1 = require("firebase/firestore");
let UserController = class UserController extends tsoa_1.Controller {
    getUser(res, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token)
                    throw new Error(res.status(422).json(response.validation({ label: "Field [token] is required." })));
                const collection = fireabase_1.db.collection('user');
                const user = yield collection.doc(token).get();
                if (user.exists)
                    res.status(200).json(response.success("User details. ", [user.data()], res.statusCode));
                else
                    throw new Error(res.status(403).json(response.error("Could not find user", res.statusCode)));
            }
            catch (e) { }
        });
    }
    /**
     * Retrieves the details of an existing user.
     * Supply the unique user ID from either and receive corresponding user details.
     * @summary A concise summary.
     */
    LogIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const expiresIn = 60 * 60 * 24 * 2 * 1000; //segundos * minutos * horas * dias * ms
            try {
                //const { email, password } = req;    
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
                            res.cookie("session", sessionCookie, options);
                            res.status(200).json(response.success("Session created. ", ["session", sessionCookie, options], res.statusCode));
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
     * Retrieves the details of an existing user.
     * Supply the unique user ID from either and receive corresponding user details.
     * @summary A concise summary.
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
                yield (0, auth_1.createUserWithEmailAndPassword)(fireabase_1.auth, email, password)
                    .then((usercredentials) => __awaiter(this, void 0, void 0, function* () {
                    var uid = usercredentials.user.uid;
                    var user = { email: email, password: password, uid: uid, nome: name };
                    yield (0, firestore_1.setDoc)((0, firestore_1.doc)(fireabase_1.db, "user", uid), user)
                        .then(() => __awaiter(this, void 0, void 0, function* () { res.status(200).json(response.success("Account created successfully. ", [uid], res.statusCode)); }))
                        .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)); });
                }))
                    .catch(error => { res.status(403).json(response.error(error.message, res.statusCode)); });
            }
            catch (e) { }
        });
    }
    /**
    * Retrieves the details of an existing user.
    * Supply the unique user ID from either and receive corresponding user details.
    * @summary A concise summary.
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
};
__decorate([
    (0, tsoa_1.Get)("/")
    /**
     * Retrieves the details of an existing user.
     * Supply the unique user ID from either and receive corresponding user details.
     * @summary A concise summary.
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
UserController = __decorate([
    (0, tsoa_1.Route)("user")
], UserController);
exports.default = UserController;
