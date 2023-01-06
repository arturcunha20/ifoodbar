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
exports.DeleteDoc = exports.update = exports.post = exports.post_user = exports.getAllQuery = exports.getAll = exports.get = void 0;
const firestore_1 = require("firebase/firestore");
const fireabase_1 = require("./fireabase");
const uuid_1 = require("uuid");
/**
 *
 * @param req
 * @returns
 */
const get = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield fireabase_1.db.collection(req.collection);
        const data = yield collection.doc(req.token).get();
        if (!data.data()) {
            return ({ status: "404", message: "No records found", data: data.data() });
        }
        else {
            return ({ status: "Success", data: data.data() });
        }
    }
    catch (error) {
        return ({ status: "404", message: error.message });
    }
});
exports.get = get;
/**
 *
 * @param req
 * @returns
 */
const getAll = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield fireabase_1.db.collection(req.collection).get();
        const data = yield collection.docs.map((doc) => doc.data());
        if (data.length > 0) {
            return ({ status: "Success", data: data });
        }
        else {
            return ({ status: "404", message: "No records found" });
        }
    }
    catch (error) {
        return ({ status: "404", message: error.message });
    }
});
exports.getAll = getAll;
/**
 *
 * @param req
 * @returns
 */
const getAllQuery = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collections = (0, firestore_1.collection)(fireabase_1.db_firestore, req.collection);
        const result = (0, firestore_1.query)(collections, (0, firestore_1.where)(req.parameter, "==", req.token));
        const querySnapshot = yield (0, firestore_1.getDocs)(result);
        const data = yield querySnapshot.docs.map((doc) => doc.data());
        if (querySnapshot.docs.length > 0)
            return ({ status: "Success", data: data });
        else {
            return ({ status: "404", message: "No records found" });
        }
    }
    catch (error) {
        return ({ status: "404", message: error.message });
    }
});
exports.getAllQuery = getAllQuery;
/**
 *
 * @param req
 * @param uid
 * @returns
 */
const post_user = (req, uid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var ref = yield (0, firestore_1.doc)(fireabase_1.db_firestore, req.collection, uid);
        const res = yield (0, firestore_1.setDoc)(ref, req.data)
            .then(() => __awaiter(void 0, void 0, void 0, function* () { return ({ status: "Success", message: "Document added with success.", data: req.data }); }))
            .catch(error => { throw new Error(error.message); });
        return res;
    }
    catch (error) {
        return ({ status: "404", message: error.message });
    }
});
exports.post_user = post_user;
/**
 *
 * @param req
 * @returns
 */
const post = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = (0, uuid_1.v4)();
        if (req.data.uid == undefined)
            req.data.uid = uid;
        if (req.data.uid != null)
            req.data.uid = uid;
        var ref = yield (0, firestore_1.doc)(fireabase_1.db_firestore, req.collection, uid);
        const res = yield (0, firestore_1.setDoc)(ref, req.data)
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            return ({ status: "Success", message: "Document added with success.", data: req.data });
        }))
            .catch(error => { throw new Error(error.message); });
        return res;
    }
    catch (error) {
        return ({ status: "404", message: error.message });
    }
});
exports.post = post;
/**
 *
 * @param req
 * @returns
 */
const update = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fireabase_1.db.collection(req.collection).doc(req.token).set(req.data)
            .then(() => {
            return ({ status: "Success", message: "Record Updated successfully" });
        })
            .catch((err) => {
            throw new Error(err.message);
        });
        return res;
    }
    catch (error) {
        return ({ status: "404", message: error.message });
    }
});
exports.update = update;
/**
 *
 * @param req
 * @returns
 */
const DeleteDoc = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fireabase_1.db.collection(req.collection).doc(req.token).delete()
            .then(() => {
            return ({ status: "200", message: "Record deleted successfully" });
        })
            .catch((err) => {
            throw new Error(err.message);
        });
        return result;
    }
    catch (error) {
        return ({ status: "404", message: error.message });
    }
});
exports.DeleteDoc = DeleteDoc;
