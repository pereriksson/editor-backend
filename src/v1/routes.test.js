const {getDocument, getDocuments, updateDocument, createDocument, login} = require("./routes");
const DBClient = require("../apis/DBClient");

const client = new DBClient();

beforeAll(async () => {
    await client.connect();
    await client.createCollection("documents");
    await client.createCollection("users");
});

afterAll(async () => {
    await client.dropCollection("documents");
    await client.dropCollection("users");
    await client.disconnect();
});

test("creates documents", async () => {
    let document = await client.createDocument({
        name: "name",
        content: "content"
    });

    document = await client.getDocument(document._id.toString());
    expect(document.name).toEqual("name");
    expect(document.content).toEqual("content");

    let documents = await client.getDocuments();
    expect(documents.length).toEqual(1);
});

test("updates documents", async () => {
    let document = await client.createDocument({
        name: "name",
        content: "content"
    });

    await client.updateDocument(document._id.toString(), {
        name: "name2",
        content: "content2"
    })

    document = await client.getDocument(document._id.toString());
    expect(document.name).toEqual("name2");
    expect(document.content).toEqual("content2");
})
