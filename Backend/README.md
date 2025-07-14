
# Uber Backend API Documentation

> This document serves as the official API documentation for the Uber backend. All available endpoints will be documented here as they are added to the system.

---

## Table of Contents

- [User Endpoints](#user-endpoints)
  - [Register User](#register-user)
  - _More endpoints coming soon_

---

## User Endpoints

### Register User

**Endpoint:**

`POST /users/register`

**Description:**

Registers a new user in the Uber system. On success, returns the created user object and a JWT authentication token.

**Request Body:**

Send a JSON object:

```json
{
  "fullName": {
    "firstName": "<First Name>",
    "lastName": "<Last Name>" // Optional, min 2 characters if provided
  },
  "email": "<user@example.com>",
  "password": "<password>"
}
```

**Field Requirements:**

- `fullName.firstName` (string, required): Minimum 2 characters
- `fullName.lastName` (string, optional): Minimum 2 characters if provided
- `email` (string, required): Must be a valid email address
- `password` (string, required): Minimum 8 characters

**Responses:**

- **201 Created**
  - Returns the created user and JWT token.
  - Example:
    ```json
    {
      "user": {
        "_id": "<userId>",
        "fullName": {
          "firstName": "<First Name>",
          "lastName": "<Last Name>"
        },
        "email": "<user@example.com>"
        // ...other user fields
      },
      "token": "<JWT Token>"
    }
    ```

- **400 Bad Request**
  - Validation failed. Example:
    ```json
    {
      "errors": [
        {
          "msg": "<Validation error message>",
          "param": "<field>",
          "location": "body"
        }
        // ...more errors
      ]
    }
    ```

**Example Request:**

```
POST /users/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Notes:**
- The endpoint returns a JWT token for authentication.
- All required fields must be provided and valid, or the request will fail with a 400 status and error details.

---

_More endpoints and documentation will be added as the Uber backend evolves._
