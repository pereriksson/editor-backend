# Editor Backend

[![Build Status](https://app.travis-ci.com/pereriksson/editor-backend.svg?branch=master)](https://app.travis-ci.com/pereriksson/editor-backend)

## Purpose

The purpose of this repo is to provide a REST API for storing documents in a MongoDB database. This is an application made as part of the course DV1612 JavaScript based web frameworks at Blekinge Institute of Technology.

## Installation

To install all prerequisites needed for this application, run:

```shell
npm install
```

## Start

To start this application, simply run:

```shell
npm start
```

## Routes

This REST API provides the following routes:

| Route                  | Description                             |
|------------------------|-----------------------------------------|
| POST /login            | Login as a user in the users collection |
| POST /register         | Register as a new user                  |
| POST /invite           | Invite a user to collaborate            |
| POST /acceptInvitation | Accept an invitation by invitation id and register a new user. |
| GET /documents         | Fetch all documents                     |
| GET /documents/:id     | Fetch a single document by its id       |
| POST /documents        | Create a document                       |
| PUT /documents/:id     | Update an existing document             |

## Configuration

This app needs the following configured environment variables. They can be configured by creating a `.env.production` file.

| Environment variable          | Example                    | Description                                             |
|-------------------------------|----------------------------|---------------------------------------------------------|
| DATABASE_PROTOCOL             | mongodb+srv                | The protocol as indicated by the MongoDB instance.      |
| DATABASE_HOSTNAME             | cluster0.zp46i.mongodb.net | The hostname for the connection.                        |
| DATABASE_DATABASE             | editor                     | The MongoDB database name.                              |
| DATABASE_USER                 | user                       | The MongoDB username.                                   |
| DATABASE_PASSWORD             | 38IjSUubHIu3KI             | A MongoDB password.                                     |
| DATABASE_DOCUMENTS_COLLECTION | documents                  | The name of the documents collection.                   |
| DATABASE_USERS_COLLECTION     | users                      | The name of the users collection.                       |
| DATABASE_INVITES_COLLECTION   | invites                    | The name of the invites collection.                     |
| WEBSOCKET_CORS_HOSTNAMES      | https://app.azure.net      | The CORS hostnames to be returned to the client.        |
| JWT_SECRET                    | pL5zW5cL8...               | The JWT secret that is used for hashing and validating. |
| GRAPHQL_GRAPHIQL              | true                       | If the GRAPHIQL UI should be served, e g in development.|
| SENDGRID_API_KEY              | SG.CDvuEIv3RN60SfIF4jXP... | The API key as given by the Sendgrid account.           |
| SENDGRID_TEMPLATE_ID          | d-de204326fd254e8ab692b... | The ID of the Sendgrid template used for emails.        |

## A typical document

A typical document consist of the following NoSQL document structure:

```text
{
    "_id": ObjectId("6127eecec049b10bc281598d"),
    "contents": "<p>Document text.</p>",
    "name": "Untitled",
    "type": "text",
    "comments": [
        {
            "node": 3,
            "comment": "This is a comment."
        }
    ],
    "collaborators": [
        ObjectId("613f31c615ec7901526cb079")
    ]
}
```