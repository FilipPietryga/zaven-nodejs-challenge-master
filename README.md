# Recruitment task

This is a recruitment task for NodeJS Junior Backend Developer.
It will check your skills in:

* using and understanding code and libraries documentation;
* using and understanding basic JavaScript patterns;
* understanding already written code;
* knowledge of basic security cases;
* writing clean code based on previously written samples.

## Requirements

Before you start contributing, make sure that you have installed:

* [Docker](https://docs.docker.com/install/)
* [Docker compose](https://docs.docker.com/compose/install/)
* [NodeJS](https://nodejs.org/en/) (8.9.0)
* [NPM](https://nodejs.org/en/) (5.0.3)


## Development

To run an API script you have to type the following command in your terminal

```bash
npm run start-dev
```

To stop the API server you need to press `crtl+c`.

## Architecture description

### DTO
Data transfer objects are objects with all user input properties. 
DTOs should contain a static `validate` method which returns an array of `express-validator`
rules for validating user input.

### Response models
Response models are objects which are representations of response data.

### Database entities
Database entities are sequelize models which are used to connect with the database.

### Controllers
Controllers are objects with methods for handling user requests. 
Controllers should process user input and transfer it to the service layer and output data from services to user.
Also, controllers should have a static `registerRoutes` method for registering used by controller routes.

### Services
Services are objects with business logic. They should return a `ServiceResult` model with database
entities.

