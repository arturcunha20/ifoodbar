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
const requestFavorito = require('supertest');
let uidFavorito = "";
const UserTokenFavorites = "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9pYmFyaXBjYSIsImF1ZCI6ImliYXJpcGNhIiwiYXV0aF90aW1lIjoxNjcyNjkwNTkxLCJ1c2VyX2lkIjoiWjI1bnR6S0NKV1VKYUMxTXk0TlJWZ1ZpOGZ1MSIsInN1YiI6IloyNW50ektDSldVSmFDMU15NE5SVmdWaThmdTEiLCJpYXQiOjE2NzI2OTA1OTEsImV4cCI6MTY3Mjg2MzM5MSwiZW1haWwiOiJpdXJpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJpdXJpQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.DbfUjkaJaLOAnLwvzDIf7dIs1kBs2jNsfMsigaxJzqiMLnW18ExuJrOkfxgGDpdnYU_77jgUePS2xnzwkL1sNc4k2iRkwlwvYJaU_PjW6zu4odV_v63AyGCaINRV1qZf7Ic0be5vTV_I3XTtgVbvc0bsrDc2N-g8eYRne7uc9wSFYpb9HOHUdUoFTwGFcFdK23tcgB6vHAf00Y-u0SSj17SiIGdVEo_owhuzgpoffHQPmqxm4RCa_hV2nwPu-cXBINpplMM181n7ROSBc_a-P99hXn5xIZpIYCBllA80NGvODKHdWzbPfn8lRmqedtRZmQbzFUKbiwp76BXrjhh1gg";
const uidProduct = "26464247-473b-40c4-bc22-b8ee57aea887";
describe("Favorites", () => {
    it("Create a Favorite", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requestFavorito("http://localhost:8000").post("/user/addFavorites")
            .send({
            token: UserTokenFavorites,
            uidProduct: uidProduct,
        })
            .expect(200);
        uidFavorito = response.body.data.uid;
        console.log(uidFavorito);
    }));
    it("Get Favorites", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requestFavorito("http://localhost:8000").get("/user/allFavorites")
            .send({
            token: UserTokenFavorites
        })
            .expect(200);
        console.log(response.body.data);
    }));
    it("Delete a Favorite", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requestFavorito("http://localhost:8000").delete("/user/delFavorites")
            .send({
            token: UserTokenFavorites,
            uidFavorites: uidFavorito
        })
            .expect(200);
    }));
    it("Get Favorites without the new Favorite", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield requestFavorito("http://localhost:8000").get("/user/allFavorites")
            .send({
            token: UserTokenFavorites
        })
            .expect(200);
        console.log(response.body.data);
    }));
});
