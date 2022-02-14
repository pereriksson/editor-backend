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