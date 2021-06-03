const { db } = require("../utils/admin")

//Like a Post  ==>  /api/posts/:postId/likePost
exports.likePost = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("likedBy", "==", req.user.username)
    .where("postId", "==", req.params.postId)
    .limit(1)

  const postDocument = db.doc(`/posts/${req.params.postId}`)

  let postData = {}

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data()
        postData.postId = doc.id
        return likeDocument.get()
      } else {
        return res.status(404).json({ error: "Post not found" })
      }
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            postId: req.params.postId,
            likedBy: req.user.username,
          })
          .then(() => {
            postData.likeCount++
            return postDocument.update({ likeCount: postData.likeCount })
          })
          .then(() => {
            return res.json(postData)
          })
      } else {
        return res.status(400).json({ error: "Post already liked" })
      }
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}

//Undo Like for a Post  ==>  /api/posts/:postId/undoLike
exports.undoLike = (req, res) => {
  const likeDocument = db
    .collection("likes")
    .where("likedBy", "==", req.user.username)
    .where("postId", "==", req.params.postId)
    .limit(1)

  const postDocument = db.doc(`/posts/${req.params.postId}`)

  let postData = {}

  postDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        postData = doc.data()
        postData.postId = doc.id
        return likeDocument.get()
      } else {
        return res.status(404).json({ error: "Post not found" })
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Post not liked yet" })
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            postData.likeCount--
            return postDocument.update({ likeCount: postData.likeCount })
          })
          .then(() => {
            res.json(postData)
          })
      }
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}
