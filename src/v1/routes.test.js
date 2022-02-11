const {getDocument, getDocuments, updateDocument, createDocument, login} = require("./routes");
const DBClient = require("../apis/DBClient");

const client = new DBClient();

let userId;

beforeAll(async () => {
    await client.connect();
    await client.createCollection("documents");
    await client.createCollection("users");
    const user = await client.createUser({
        username: "per",
        password: "$2a$12$S/gnU./CeqECvMwN6LEeQuGny6z7cDhEarwe0nnPELTlULMDT8OSy"
    });
    userId = user._id;
});

afterAll(async () => {
    await client.dropCollection("documents");
    await client.dropCollection("users");
    await client.disconnect();
});

test("creates documents", async () => {
    let document = await client.createDocument({
        name: "name",
        content: "content",
        collaborators: [
            client.getEntityReference(userId)
        ]
    });

    document = await client.getDocument(document._id.toString(), userId);
    expect(document.name).toEqual("name");
    expect(document.content).toEqual("content");

    let documents = await client.getDocuments(userId);
    expect(documents.length).toEqual(1);
});

test("updates documents", async () => {
    let document = await client.createDocument({
        name: "name",
        content: "content",
        collaborators: [
            client.getEntityReference(userId)
        ]
    });

    await client.updateDocument(document._id.toString(), {
        name: "name2",
        content: "content2"
    })

    document = await client.getDocument(document._id.toString(), userId);
    expect(document.name).toEqual("name2");
    expect(document.content).toEqual("content2");
})
