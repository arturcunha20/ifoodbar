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
const requestProduct = require('supertest');
let uidType = " ";
let userTokenProduct = "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9pYmFyaXBjYSIsImF1ZCI6ImliYXJpcGNhIiwiYXV0aF90aW1lIjoxNjcyNjkzNTg5LCJ1c2VyX2lkIjoiWjI1bnR6S0NKV1VKYUMxTXk0TlJWZ1ZpOGZ1MSIsInN1YiI6IloyNW50ektDSldVSmFDMU15NE5SVmdWaThmdTEiLCJpYXQiOjE2NzI2OTM1OTAsImV4cCI6MTY3Mjg2NjM5MCwiZW1haWwiOiJpdXJpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJpdXJpQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Ng67oJ23XH41yobYv5L8S0VXC153dWIs7viZ7xfsKOxrrlSdpfOVcIRUJDRE_O-16AhyMgPUEC01qUnesKAPiZQB5IQnxDMUA0kYWZBP6uM3s1gJ3hhFNxALjEoVYYI_yIAuI06OfpXLK5-5Dro5Q0VvFGf9PPmyhHCISCGyyfndeVIiUgx0Q0umQmABkc3lMeiM6udSDt97URabePh6D_2zyOTy87gDLBfOEfQ0C3cei-7lUmQNDibudG106arYNFobuJwpQJB1zvOmmK3quJVcjqYxmzjarw7COhrKI_bUtvhPS1LIvySulvy8RhO3B9X-XWOo0pVpb1jQFKgoiQ";
describe("Type", () => {
    it("Create a type", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requestProduct("http://localhost:8000").post("/productsType/create")
            .send({
            token: userTokenProduct,
            name: "Bebida"
        })
            .expect(200);
        uidType = response.body.data.data.uid;
    }));
    it("Get types", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requestProduct("http://localhost:8000").get("/productsType/all")
            .expect(200);
        console.log(response.body.data);
    }));
});
describe("Products", () => {
    it("Create a product", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requestProduct("http://localhost:8000").post("/products/create")
            .send({
            name: "Coca-Cola",
            price: "1.3",
            type: uidType,
            token: userTokenProduct
        })
            .expect(200);
    }));
    it("Get products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requestProduct("http://localhost:8000").get("/products/all")
            .expect(200);
        console.log(response.body.data);
    }));
    it("Get products by type ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requestProduct("http://localhost:8000").post("/products/byType")
            .send({
            token: uidType
        })
            .expect(200);
        console.log(response.body.data);
    }));
});
