# Backend for to-do application

## Create .env file

Values for .env file:

- DB_NAME
- DB_USERNAME
- DB_PASSWORD
- DB_HOST
- DB_PORT
- JWT_EXPIRES_IN
- JWT_SECRET
- PORT

## What I used

- ExpressJS web application framework
- Sequelize ORM for easy database querying from Postgres
- JWT authentication (Create JWT token and pass to frontend where it is stored and required to be passed in Authorization header for every query)
