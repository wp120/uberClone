# Backend API Documentation

## Endpoint

`/users/register`

### HTTP Method

`POST`

## Description

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password. The password will be hashed before storing it in the database.

## Request Data

The request body should be a JSON object containing the following fields:

- `fullName.firstName` (string, required): The first name of the user. Must be at least 2 characters long.
- `fullName.lastName` (string, optional): The last name of the user. Must be at least 2 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4aWJm1J3yQW5Zf5Zf5G",
    "__v": 0
  }
}
```
