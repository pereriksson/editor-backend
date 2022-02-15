const supertest = require("supertest");
const createServer = require("../server");
const {
    DATABASE_DOCUMENTS_COLLECTION,
    DATABASE_USERS_COLLECTION,
    DATABASE_INVITES_COLLECTION
} = require("../constants");

let app;
let token;
let documentId;
const incorrectDocumentId = "612810ba64dc6e39e746f1ec";

beforeAll(async () => {
    return app = await createServer();
});

afterAll(async () => {
    await app.get("db").deleteAllDocuments(DATABASE_DOCUMENTS_COLLECTION);
    await app.get("db").deleteAllDocuments(DATABASE_USERS_COLLECTION);
    await app.get("db").deleteAllDocuments(DATABASE_INVITES_COLLECTION);
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

test("Check there are no documents", async () => {
    const res = await supertest(app)
        .get("/v1/documents")
        .set("Authorization", "Bearer "+token)
        .expect(200);
    expect(res.body.length).toBe(0);
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
    documentId = res.body._id;
});

test("Fetch a document", async () => {
    const res = await supertest(app)
        .get("/v1/documents/"+documentId)
        .set("Authorization", "Bearer "+token)
        .expect(200);
    expect(res.body.name).toBe("Name");
});

test("Fetch a document with an incorrect id", async () => {
    await supertest(app)
        .get("/v1/documents/"+incorrectDocumentId)
        .set("Authorization", "Bearer "+token)
        .expect(400);
});

test("Update a document", async () => {
    const res = await supertest(app)
        .put("/v1/documents/"+documentId)
        .set("Authorization", "Bearer "+token)
        .send({
            contents: "<p>This is text2.</p>",
            name: "Name2",
            type: "text",
            comments: []
        })
        .expect(200);
    expect(res.body.name).toBe("Name2");
});

test("Update a document with an incorrect id", async () => {
    const res = await supertest(app)
        .put("/v1/documents/"+incorrectDocumentId)
        .set("Authorization", "Bearer "+token)
        .send({
            contents: "<p>This is text2.</p>",
            name: "Name2",
            type: "text",
            comments: []
        })
        .expect(400);
});

test("Check there is one document", async () => {
    const res = await supertest(app)
        .get("/v1/documents")
        .set("Authorization", "Bearer "+token)
        .expect(200);
    expect(res.body.length).toBe(1);
});

test("Send an invite for a document with an incorrect id", async () => {
    const res = await supertest(app)
        .post("/v1/invite")
        .set("Authorization", "Bearer "+token)
        .send({
            documentId: incorrectDocumentId,
            email: "user@example.com"
        })
        .expect(400);
});