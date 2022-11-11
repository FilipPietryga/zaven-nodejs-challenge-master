'use strict';
const Express = require('express');
const BodyParser = require('body-parser');
const Lusca = require('lusca');
const Cors = require('cors');

const ExpressUtilities = require('./utilities/express');
const UsersController = require('./controllers/users-controller');
const PostsController = require('./controllers/posts-controller');

// initialize controllers
let usersController = new UsersController();
let postsController = new PostsController();

// register router
let router = Express.Router();

usersController.registerRoutes(router);
postsController.registerRoutes(router);

// configure application
const app = Express();

app.use(ExpressUtilities);
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(Lusca.xframe('SAMEORIGIN'));
app.use(Lusca.xssProtection(true));
app.use(Lusca.xssProtection(true));

// routes
app.use(router);

module.exports = app;
