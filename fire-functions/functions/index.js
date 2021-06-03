const functions = require("firebase-functions")
const app = require("express")()

const {
  getAllPosts,
  getPost,
  createPost,
  deletePost,
} = require("./routes/posts")
const { likePost, undoLike } = require("./routes/likes")
const { signup, login, getAuthenticatedUser } = require("./routes/users")
const isAuthenticated = require("./middlewares/isAuthenticated")
const { db } = require("./utils/admin")

//Auth Routes
app.post("/signup", signup)
app.post("/login", login)
app.get("/user", isAuthenticated, getAuthenticatedUser)

//Post Routes
app.get("/posts", getAllPosts)
app.post("/post", isAuthenticated, createPost)
app.get("/posts/:postId", getPost)
app.delete("/posts/:postId", isAuthenticated, deletePost)
app.get("/posts/:postId/like", isAuthenticated, likePost)
app.get("/posts/:postId/undoLike", isAuthenticated, undoLike)

exports.api = functions.https.onRequest(app)
