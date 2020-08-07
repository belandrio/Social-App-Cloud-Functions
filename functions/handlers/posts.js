
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
      userHandle: req.user.userHandle, 
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

  // Fetch one Post
exports.getPost = (req, res) => {
  let postData = {};
  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post not found' });
      }
      postData = doc.data();
      postData.postId = doc.id;
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('postId', '==', req.params.postId)
        .get()
    })
    .then((data) => {
      postData.comments = [];
      data.forEach((doc) => {
        postData.comments.push(doc.data());
      });
      return res.json(postData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Comment on a post
exports.commentOnPost = (req, res) => {
  if (req.body.text.trim() === '')
    return res.status(400).json({ error: 'Must not be empty' });

  const newComment = {
    text: req.body.text,
    createdAt: new Date().toISOString(),
    postId: req.params.postId,
    userHandle: req.user.userHandle,
    userImage: req.user.imageUrl
  };

  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post not found' });
      }
      return db.collection('comments').add(newComment);
    })
    .then(() => {
     return  res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};