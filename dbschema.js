let db = {
  users: [
    {
      userId: "dh23ggj5h32g543j5gf43",
      email: "user@email.com",
      userHandle: "user",
      createdAt: "2019-03-15T10:59:52.798Z",
      imageUrl: "image/dsfsdkfghskdfgs/dgfdhfgdh",
      bio: "Hello, my name is user, nice to meet you",
      website: "https://user.com",
      location: "Lonodn, UK",
    },
  ],
  posts: [
    {
      useruserHandle: "user",
      text: "This is a sample post",
      createdAt: "2019-03-15T10:59:52.798Z",
      likeCount: 5,
      commentCount: 3,
    },
  ],
  comments: [
    {
      userHandle: "user",
      postId: "kdjsfgdksuufhgkdsufky",
      text: "nice one mate!",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "kdjsfgdksuufhgkdsufky",
      type: "like | comment",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ],
};
const userDetails = {
  // Redux data
  credentials: {
    userId: "N43KJ5H43KJHREW4J5H3JWMERHB",
    email: "user@email.com",
    userHandle: "user",
    createdAt: "2019-03-15T10:59:52.798Z",
    imageUrl: "image/dsfsdkfghskdfgs/dgfdhfgdh",
    bio: "Hello, my name is user, nice to meet you",
    website: "https://user.com",
    location: "Lonodn, UK",
  },
  likes: [
    {
      useruserHandle: "user",
      postId: "hh7O5oWfWucVzGbHH2pa",
    },
    {
      useruserHandle: "user",
      postId: "3IOnFoQexRcofs5OhBXO",
    },
  ],
};
