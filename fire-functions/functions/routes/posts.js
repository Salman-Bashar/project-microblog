const { db } = require("../utils/admin")

//Get All Posts  =>  /api/posts
exports.getAllPosts = (req, res) => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let posts = []

      data.forEach((doc) => {
        posts.push({
          postId: doc.id,
          postedBy: doc.data().postedBy,
          title: doc.data().title,
          body: doc.data().body,
          likeCount: doc.data().likeCount,
          createdAt: doc.data().createdAt,
        })
      })

      res.json(posts)
    })
    .catch((err) => {
      console.error(err)
      res
        .status(500)
        .json({ error: "Something went wrong. Please try again later." })
    })
}

//Get a Single Post  =>  /api/posts/:postId
exports.getPost = (req, res) => {
  let postData = {}

  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) return res.status(404).json({ error: "Post not found" })

      postData = doc.data()
      postData.postId = doc.id
      res.json(postData)
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

//Create a New Post  =>  /api/post
exports.createPost = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ body: "All fields are required" })
  }

  const newPost = {
    postedBy: req.user.username,
    title: req.body.title,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    likeCount: 0,
  }

  db.collection("posts")
    .add(newPost)
    .then((doc) => {
      const resPost = newPost
      resPost.postId = doc.id
      res.json(resPost)
    })
    .catch((err) => {
      console.error(err)
      res
        .status(500)
        .json({ error: "Something went wrong! Please try again later" })
    })
}

//Delete a Post  =>  /api/posts/:postId
exports.deletePost = (req, res) => {
  const document = db.doc(`/posts/${req.params.postId}`)
  document
    .get()
    .then((doc) => {
      if (!doc.exists) return res.status(404).json({ error: "Post not found" })

      if (doc.data().postedBy !== req.user.username) {
        return res.status(403).json({ error: "Unauthorized access denied!" })
      } else {
        return document.delete()
      }
    })
    .then(() => {
      res.json({ message: "Document deleted successfully" })
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}
