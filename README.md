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

This REST API provides the following routes to manipulate documents:

| Route              | Description                       |
|--------------------|-----------------------------------|
| GET /documents     | Fetch all documents               |
| GET /documents/:id | Fetch a single document by its id |
| POST /documents    | Create a document                 |
| PUT /documents/:id | Update an existing document       |

## A typical document

A document can have any fields that describe it (except "_id"). However for this demo the following structure is used:

```json
{
  "_id": "6127eecec049b10bc281598d",
  "contents": "<p>This is text.</p>",
  "name": "Untitled"
}
```