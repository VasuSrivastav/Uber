<!-- create a readme.md file to docs the /users/register endpoint with description and status code , also write the how the data is required in endpoint, create readme.md file in backend folder -->

# API Documentation

## `/users/register`

### Description

Registers a new user in the system. Return User and jwt Token.

### Method

`POST`

### EndPoint

`/users/login`

### Request Body

The request body must be a JSON object containing the following fields:

- `email` (string, required): User's email address. Must be a valid email format.
- `password` (string, required): User's password. Must be at least 6 characters long.
- `fullname` (object, required):
  - `firstname` (string, required): User's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): User's last name. If provided, must be at least 3 characters long.

#### Example

### Request Body Example

The request body must be a JSON object containing the following fields:

- `email` (string, required): User's email address. Must be a valid email format.
- `password` (string, required): User's password.

#### Example

```json
{
  "fullname": {
    "firstname": "test_firstname",
    "lastname": "test_lastname"
  },
  "email": "user@example.com",
  "password": "password123"
}
```

## `/users/login`

### Description

Authenticates a user and returns a JWT token upon successful login.

### Method

`POST`

### EndPoint

`/users/login`

### Request Body

The request body must be a JSON object containing the following fields:

- `email` (string, required): User's email address. Must be a valid email format.
- `password` (string, required): User's password. Must be at least 6 characters long.

#### Example

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

The response will be a JSON object containing the following fields:

- `user` (object): User's data.
  - `email` (string): User's email address.
  - `fullname` (object):
    - `firstname` (string): User's first name.
    - `lastname` (string): User's last name.
- `token` (string): JWT token for authentication.

#### Example

```json
{
  "user": {
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  },
  "token": "jwt_token_here"
}
```

## `/users/profile`

### Description

Retrieves the authenticated user's profile information.

### Method

`GET`

### Endpoint

`/users/profile`

### Authentication

This endpoint requires a valid JWT token provided in the `Authorization` header or as a cookie.

### Response

The response will be a JSON object containing the user's profile data.

#### Example

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

## `/users/logout`

### Description

Logs out the authenticated user by invalidating the JWT token.

### Method

`GET`

### Endpoint

`/users/logout`

### Authentication

This endpoint requires a valid JWT token provided in the `Authorization` header or as a cookie.

### Token Blacklisting

When a user logs out, their JWT token is added to a blacklist. This ensures that the token cannot be used again for authentication, even if it hasn't expired yet. By storing the token in a blacklist, the server can check incoming requests against this list and deny access if the token has been invalidated. This enhances security by preventing unauthorized access using old tokens.

### Response

The response will be a JSON object confirming the logout action.

#### Example

```json
{
  "message": "Logged out successfully"
}
```

## `/captains/register`

### Description

Registers a new captain in the system. Returns Captain and JWT token.

### Method

`POST`

### Endpoint

`/captains/register`

### Request Body

The request body must be a JSON object containing the following fields:

- `email` (string, required): Captain's email address. Must be a valid email format.
- `password` (string, required): Captain's password. Must be at least 6 characters long.
- `fullname` (object, required):
  - `firstname` (string, required): Captain's first name. Must be at least 3 characters long.
  - `lastname` (string, optional): Captain's last name. If provided, must be at least 3 characters long.
- `vehicle` (object, required):
  - `color` (string, required): Vehicle color. Must be at least 3 characters long.
  - `plate` (string, required): Vehicle plate number. Must be at least 3 characters long.
  - `capacity` (number, required): Vehicle capacity. Must be at least 1.
  - `vehicleType` (string, required): Type of vehicle. Must be one of `'car'`, `'motorcycle'`, or `'auto'`.

#### Example

```json
{
  "fullname": {
    "firstname": "test_firstname",
    "lastname": "test_lastname"
  },
  "email": "captain@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## `/captains/login`

### Description

Authenticates a captain and returns a JWT token upon successful login.

### Method

`POST`

### Endpoint

`/captains/login`

### Request Body

The request body must be a JSON object containing the following fields:

- `email` (string, required): Captain's email address. Must be a valid email format.
- `password` (string, required): Captain's password. Must be at least 6 characters long.

#### Example

```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

### Response

The response will be a JSON object containing the following fields:

- `captain` (object): Captain's data.
  - `email` (string): Captain's email address.
  - `fullname` (object):
    - `firstname` (string): Captain's first name.
    - `lastname` (string): Captain's last name.
- `token` (string): JWT token for authentication.

#### Example

```json
{
  "captain": {
    "email": "captain@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  },
  "token": "jwt_token_here"
}
```

## `/captains/profile`

### Description

Retrieves the authenticated captain's profile information.

### Method

`GET`

### Endpoint

`/captains/profile`

### Authentication

This endpoint requires a valid JWT token provided in the `Authorization` header or as a cookie.

### Response

The response will be a JSON object containing the captain's profile data.

#### Example

```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

## `/captains/logout`

### Description

Logs out the authenticated captain by invalidating the JWT token.

### Method

`GET`

### Endpoint

`/captains/logout`

### Authentication

This endpoint requires a valid JWT token provided in the `Authorization` header or as a cookie.

### Token Blacklisting

When a captain logs out, their JWT token is added to a blacklist. This ensures that the token cannot be used again for authentication, even if it hasn't expired yet. By storing the token in a blacklist, the server can check incoming requests against this list and deny access if the token has been invalidated. This enhances security by preventing unauthorized access using old tokens.

### Response

The response will be a JSON object confirming the logout action.

#### Example

```json
{
  "message": "Logged out successfully"
}
```

## `/maps/get-coordinates`

### Description

Retrieves the coordinates (latitude and longitude) for a given address.

### Method

`GET`

### Request Parameters

- `address` (string, required): The address for which to retrieve coordinates.

### Example Request

GET `/maps/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA`

### Example Response
```json
{
  "latitude": 37.4224764,
  "longitude": -122.0842499
}
```
