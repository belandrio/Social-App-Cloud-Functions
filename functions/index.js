const functions = require("firebase-functions");
const app = require("express")();

const AuthMiddleware = require('./util/AuthMiddleware');

const { getPosts, createPost } = require('./handlers/posts');
const { signup, login } = require('./handlers/users');

//Posts routes
app.get("/posts", getPosts);
app.post("/createPost", AuthMiddleware, createPost);

//Users routes
app.post("/signup", signup);
app.post('/login', login);

//https://baseurl.com/api/posts or https://baseurl.com/api/createPost

exports.api = functions.region("europe-west3").https.onRequest(app);
