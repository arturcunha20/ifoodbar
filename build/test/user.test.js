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
const request = require('supertest');
let tokenUser = "";
const nome = "Teste123";
const email = "teste123@gmail.com";
const password = "123123";
describe("User", () => {
    it("Register a User", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request("http://localhost:8000").post("/user/signin")
            .send({
            name: nome,
            email: email,
            password: password
        })
            .expect(200);
    }));
    it("Login a User", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request("http://localhost:8000").post("/user/login")
            .send({
            email: email,
            password: password
        })
            .expect(200);
        tokenUser = response.body.results[0];
        console.log(tokenUser);
    }));
    it("Get user credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request("http://localhost:8000").get("/user")
            .send({
            token: tokenUser
        })
            .expect(200);
        console.log(response.body);
    }));
    it("SignOut a User", () => __awaiter(void 0, void 0, void 0, function* () {
        yield request("http://localhost:8000").post("/user/signout")
            .expect(200);
        console.log("User SignOut");
    }));
});
