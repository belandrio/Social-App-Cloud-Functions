const functions = require("firebase-functions");
const app = require("express")();
const { db } = require('./util/admin');

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
  getUserDetails,
  markNotificationsRead
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
app.get('/user/:userHandle', getUserDetails);
app.post('/notifications', AuthMiddleware, markNotificationsRead);

//https://baseurl.com/api/posts or https://baseurl.com/api/createPost

exports.api = functions.region("europe-west3").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region('europe-west3')
  .firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    db.doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            postId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

  exports.createNotificationOnComment = functions
  .region('europe-west3')
  .firestore.document('comments/{id}')
  .onCreate((snapshot) => {
    db.doc(`/posts/${snapshot.data().postId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            postId: doc.id
          });
        }
      })
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

  exports.deleteNotificationOnUnLike = functions
  .region('europe-west3')
  .firestore.document('likes/{id}')
  .onDelete((snapshot) => {
    db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });