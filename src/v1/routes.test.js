const {getDocument, getDocuments, updateDocument, createDocument} = require("./routes");
const DBClient = require("../apis/__mocks__/DBClient");

const client = new DBClient();

const mockRequest = () => {
    const res = {};
    res.app = {
        get: key => client
    }
    return res;
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn(x => x);
    res.json = jest.fn(x => x);
    return res;
};

test("fetches documents", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await getDocuments(req, res);

    expect(Array.isArray(res.json.mock.calls[0])).toEqual(true);
    expect(res.json.mock.calls[0][0].length).toEqual(0);
});

test("creates documents", async () => {
    const req = mockRequest();
    const res = mockResponse();

    const name = "Untitled";
    const contents = "<p>Test</p>";

    req.body = {
        name,
        contents
    };

    await createDocument(req, res);

    expect(res.json.mock.calls[0][0]._id.length).toBe(24);
    expect(res.json.mock.calls[0][0].name).toEqual(name);
    expect(res.json.mock.calls[0][0].contents).toEqual(contents);
});

test("updates documents", async () => {
    let req = mockRequest();
    let res = mockResponse();

    req.body = {
        name: "Untitled",
        contents: "<p>Test</p>"
    };

    await createDocument(req, res);
    const _id = res.json.mock.calls[0][0]._id;

    // Update
    const name = "Untitled 2";
    const contents = "<p>Test 2</p>";

    req.params = {
        id: _id
    };
    req.body = {
        _id,
        name,
        contents
    };

    await updateDocument(req, res);
    expect(res.json.mock.calls[1][0]._id).toEqual(_id);
    expect(res.json.mock.calls[1][0].name).toEqual(name);
    expect(res.json.mock.calls[1][0].contents).toEqual(contents);
});
