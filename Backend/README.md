
# Uber Backend API Documentation

> This document serves as the official API documentation for the Uber backend. All available endpoints will be documented here as they are added to the system.

---


## Table of Contents

- [User Endpoints](#user-endpoints)
  - [Register User](#register-user)
  - [Login User](#login-user)
  - [Get User Profile](#get-user-profile)
  - [Logout User](#logout-user)
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

### Login User

**Endpoint:**

`POST /users/login`

**Description:**

Authenticates an existing user with email and password. On success, returns the user object and a JWT authentication token.

**Request Body:**

Send a JSON object:

```json
{
  "email": "<user@example.com>",
  "password": "<password>"
}
```

**Field Requirements:**

- `email` (string, required): Must be a valid email address
- `password` (string, required): Minimum 8 characters

**Responses:**

- **200 OK**
  - Authentication successful. Returns user and JWT token.
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

- **401 Unauthorized**
  - Invalid credentials. Example:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

**Example Request:**

```
POST /users/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Notes:**
- The endpoint returns a JWT token for authentication.
- Both email and password must be valid, or the request will fail with appropriate error messages.

---


### Get User Profile

**Endpoint:**

`GET /users/profile`

**Description:**

Returns the authenticated user's profile. Requires a valid JWT token (sent as a cookie or in the Authorization header).

**Authentication:**

- Requires JWT token (cookie `token` or `Authorization: Bearer <token>` header)

**Responses:**

- **200 OK**
  - Returns the user profile.
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
      }
    }
    ```
- **401 Unauthorized**
  - Missing or invalid token.
  - Example:
    ```json
    { "message": "Access denied. No token provided." }
    ```

---

### Logout User

**Endpoint:**

`GET /users/logout`

**Description:**

Logs out the authenticated user by clearing the JWT cookie and blacklisting the token. Requires a valid JWT token.

**Authentication:**

- Requires JWT token (cookie `token` or `Authorization: Bearer <token>` header)

**Responses:**

- **200 OK**
  - Logout successful.
  - Example:
    ```json
    { "message": "Logged out successfully" }
    ```
- **401 Unauthorized**
  - Missing or invalid token.
  - Example:
    ```json
    { "message": "Access denied. No token provided." }
    ```

---

_More endpoints and documentation will be added as the Uber backend evolves._
