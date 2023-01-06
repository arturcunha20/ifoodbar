const request = require('supertest');

let tokenUser = ""
const nome="Teste123"
const email="teste123@gmail.com"
const password="123123"

describe("User", () => {
  it("Register a User", async () => {
    await request("http://localhost:8000").post("/user/signin")
    .send({
      name: nome,
      email:email,
      password:password
    })
    .expect(200);
  })

  it("Login a User", async () => {
    const response = await request("http://localhost:8000").post("/user/login")
    .send({
      email:email,
      password:password
    })
    .expect(200);

    tokenUser = response.body.results[0]

    console.log(tokenUser)
  })

  it("Get user credentials", async () => {
    const response = await request("http://localhost:8000").get("/user")
    .send({
      token : tokenUser
    })
    .expect(200);

    console.log(response.body)
  })

  it("SignOut a User", async () => {
    await request("http://localhost:8000").post("/user/signout")
    .expect(200);

    console.log("User SignOut")
  })
})