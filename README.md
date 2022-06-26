# About

This application is an API built for a training management system which uses Express.js (Node.js) and Moongoose (MongoDB) as the tech stack.

# Getting started

To get the Node server running locally:
- Clone this repo
-  `npm install` to install all required dependencies
- Create .env file on root folder and add following values
```
DB_CONNECTION=
JWT_SECRET=
```
- `DB_CONNECTION` can be a locally hosted server via MongoDB or a cloud server using MongoDB Atlas
- `JWT_SECRET` can be any random string value which will be used by JWT to issue a encrypted token for the users
-  `npm start` to start the local server

# Using the API

- For the API Documentation visit: https://documenter.getpostman.com/view/11080443/UzBsH4AX
- After starting the local server, use Postman to send requests to the local server
- For authenticated routes, input the JWT token issued upon login in the Authorization tab (API Key) of the request

# Application Structure

- `index.js` - The entry point to our application. This file defines the express server and connects it to MongoDB using mongoose.
- `validation/` - This folder contains the validation functions for API routes using the Joi package.
- `routes/` - This folder contains the route definitions for the API.
- `models/` - This folder contains the schema definitions for the Mongoose models.

# Authentication

Requests are authenticated using the `Authorization` header with a valid JWT token issued upon login. The API will return a 401 status code if the request cannot be authenticated.

# Authorization

A middleware function is written in `roleAccess.js` to check for admin or non-admin users via a defined field in the User model.

# Application Design

For flowcharts of the API flow visit: https://1drv.ms/b/s!AixfRRPyNdAtmhjMuLTwutk2zEoT