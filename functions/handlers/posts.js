
const { db } = require('../util/admin');

exports.getPosts =  (req, res) => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((data) => {
        let posts = [];
        data.forEach((doc) => {
          posts.push({
            postId: doc.id,
            text: doc.data().text,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
          });
        });
        return res.json(posts);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };

exports.createPost = (req, res) => {
    const newPost = {
      text: req.body.text,
      userHandle: req.user.userHandle, // We dont need this line anymore
      createdAt: new Date().toISOString(),
    };
    db.collection("posts")
      .add(newPost)
      .then((doc) => {
        return res.json({ message: `document ${doc.id} created succesfully` });
      })
      .catch((err) => {
        res.status(500).json({ error: err.code });
      });
  }