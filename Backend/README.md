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
    "__v": 0
  }
}
```

## Endpoint

`/users/login`

### HTTP Method

`POST`

## Description

This endpoint is used to log in an existing user. It requires the user's email and password.

## Request Data

The request body should be a JSON object containing the following fields:

- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Example Request

```json
{
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

## Endpoint

`/users/profile`

### HTTP Method

`GET`

## Description

This endpoint is used to get the profile of the currently logged-in user. It requires the user to be authenticated.

## Request Data

No request body is required. The user must be authenticated via a valid token.

### Example Response

```json
{
  "user": {
    "_id": "60d0fe4f5311236168a109ca",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "__v": 0
  }
}
```

## Endpoint

`/users/logout`

### HTTP Method

`GET`

## Description

This endpoint is used to log out the currently logged-in user. It requires the user to be authenticated. It also blacklists the token provided in cookie or headers.

## Request Data

No request body is required. The user must be authenticated via a valid token.

### Example Response

```json
{
  "message": "Logged out successfully"
}
```

## Endpoint

`/captains/register`

### HTTP Method

`POST`

## Description

This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

## Request Data

The request body should be a JSON object containing the following fields:

- `fullName.firstName` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullName.lastName` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of "car", "motorcycle", or "auto".

### Example Request

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "60d0fe4f5311236168a109cb",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "XYZ123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "__v": 0
  }
}
```
