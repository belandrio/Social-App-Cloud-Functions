const functions = require("firebase-functions");
const app = require("express")();

const AuthMiddleware = require("./util/AuthMiddleware");

const {
  getPosts,
  createPost,
  getPost,
  commentOnPost,
  deletePost,
  likePost,
  unlikePost
} = require("./handlers/posts");

const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

//Posts routes
app.get("/posts", getPosts);
app.get("/post/:postId", getPost);
app.post("/createPost", AuthMiddleware, createPost);
app.delete("/post/:postId", AuthMiddleware, deletePost);
app.post("/post/:postId/comment", AuthMiddleware, commentOnPost);
app.get('/post/:postId/like', AuthMiddleware, likePost);
app.get('/post/:postId/unlike', AuthMiddleware, unlikePost);

//Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", AuthMiddleware, uploadImage);
app.post("/user", AuthMiddleware, addUserDetails);
app.get("/user", AuthMiddleware, getAuthenticatedUser);

//https://baseurl.com/api/posts or https://baseurl.com/api/createPost

exports.api = functions.region("europe-west3").https.onRequest(app);
