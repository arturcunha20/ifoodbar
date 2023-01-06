const requestOrder = require('supertest');

const UserTokenOrders = "eyJhbGciOiJSUzI1NiIsImtpZCI6InRCME0yQSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9pYmFyaXBjYSIsImF1ZCI6ImliYXJpcGNhIiwiYXV0aF90aW1lIjoxNjcyNjkwNTkxLCJ1c2VyX2lkIjoiWjI1bnR6S0NKV1VKYUMxTXk0TlJWZ1ZpOGZ1MSIsInN1YiI6IloyNW50ektDSldVSmFDMU15NE5SVmdWaThmdTEiLCJpYXQiOjE2NzI2OTA1OTEsImV4cCI6MTY3Mjg2MzM5MSwiZW1haWwiOiJpdXJpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJpdXJpQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.DbfUjkaJaLOAnLwvzDIf7dIs1kBs2jNsfMsigaxJzqiMLnW18ExuJrOkfxgGDpdnYU_77jgUePS2xnzwkL1sNc4k2iRkwlwvYJaU_PjW6zu4odV_v63AyGCaINRV1qZf7Ic0be5vTV_I3XTtgVbvc0bsrDc2N-g8eYRne7uc9wSFYpb9HOHUdUoFTwGFcFdK23tcgB6vHAf00Y-u0SSj17SiIGdVEo_owhuzgpoffHQPmqxm4RCa_hV2nwPu-cXBINpplMM181n7ROSBc_a-P99hXn5xIZpIYCBllA80NGvODKHdWzbPfn8lRmqedtRZmQbzFUKbiwp76BXrjhh1gg"
let uidOrder = ""

describe("Order", () => {
    it("Create a Order", async () => {
        const response = await requestOrder("http://localhost:8000").post("/orders/create")
        .send({
            token: UserTokenOrders,
            products:[{"Products_uID":"39526e74-43fb-468f-9388-9adacae0e15a","Quantity":99}],
            price: 118.8,
            description: "Teste do Teste"
        })
        .expect(200);

        uidOrder = response.body.data[0].data.uid;
    })


    it("Get Orders", async () => {
        const response = await requestOrder("http://localhost:8000").get("/orders/all")
        .send({
            token: UserTokenOrders
        })
        .expect(200);

        console.log(response.body.data)
    })


    it("Get Orders Details", async () => {
        const response = await requestOrder("http://localhost:8000").post("/orders/details")
        .send({
            token: UserTokenOrders,
            OrderUID: "5c9f92b0-30f2-4cfd-a280-c83683247814"
        })
        .expect(200);

        console.log(response.body.data)
    })
})