const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require('express')();

admin.initializeApp();


app.get("/posts", (req, res) => {
  admin
    .firestore()
    .collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          text: doc.data().text,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});



app.post("/createPost", (req, res) => {
  const newPost = {
    text: req.body.text,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };
  admin
    .firestore()
    .collection("posts")
    .add(newPost)
    .then((doc) => {
      return res.json({ message: `document ${doc.id} created succesfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.code });
    });
});


//https://baseurl.com/api/posts or https://baseurl.com/api/createPost

exports.api = functions.region("europe-west3").https.onRequest(app);
