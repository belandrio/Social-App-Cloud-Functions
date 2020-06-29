const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.getPosts = functions.https.onRequest((request, response) => {
  admin
    .firestore()
    .collection("posts")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        posts.push(doc.data());
      });
      return res.json(posts);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
});

exports.createPosts = functions.https.onRequest((request, response) => {
  const newPost = {
    body: req.body.text,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
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