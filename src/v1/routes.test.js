const supertest = require("supertest");
const createServer = require("../server");
const {
    DATABASE_DOCUMENTS_COLLECTION,
    DATABASE_USERS_COLLECTION,
    DATABASE_INVITES_COLLECTION
} = require("../constants");

let app;
let token;

beforeAll(async () => {
    return app = await createServer();
});

afterAll(async () => {
    await app.get("db").disconnect();
});

test("Register user with bad credentials", async () => {
    await supertest(app)
        .post("/v1/register")
        .send({
            password: "password"
        })
        .expect(400);
    await supertest(app)
        .post("/v1/register")
        .send({
            username: "username"
        })
        .expect(400);
});

test("Register a user", async () => {
    await supertest(app)
        .post("/v1/register")
        .send({
            username: "username",
            password: "password"
        })
        .expect(200);
});

test("Register a user with a taken username", async () => {
    await supertest(app)
        .post("/v1/register")
        .send({
            username: "username",
            password: "password"
        })
        .expect(400);
});

test("Login with incorrect credentials", async () => {
    await supertest(app)
        .post("/v1/login")
        .send({
            username: "username2",
            password: "password2"
        })
        .expect(400);
});

test("Login with correct credentials", async () => {
    const res = await supertest(app)
        .post("/v1/login")
        .send({
            username: "username",
            password: "password"
        })
        .expect(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
});

test("Create a document", async () => {
    const res = await supertest(app)
        .post("/v1/documents")
        .set("Authorization", "Bearer "+token)
        .send({
            contents: "<p>This is text.</p>",
            name: "Name",
            type: "text",
            comments: []
        })
        .expect(200);
    expect(res.body.name).toBe("Name");
});