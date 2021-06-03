const { db } = require("../utils/admin")
const firebaseConfig = require("../config/firebaseConfig")
const {
  validateSignUpData,
  validateLogInData,
} = require("../validators/authValidators")

const firebase = require("firebase")
firebase.initializeApp(firebaseConfig)

//User Sign Up  =>  /api/signup
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  }

  const { valid, errors } = validateSignUpData(newUser)

  if (!valid) return res.status(400).json(errors)

  let token, userId

  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "This username is already taken" })
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then((data) => {
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then((idToken) => {
      token = idToken

      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      }
      return db.doc(`/users/${newUser.username}`).set(userCredentials)
    })
    .then(() => {
      return res.status(201).json({ token })
    })
    .catch((err) => {
      console.error(err)
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email already in use" })
      } else {
        console.error(err)
        return res
          .status(500)
          .json({ general: "Something went wrong. Please try again" })
      }
    })
}

//User Log In  =>  /api/login
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  }

  const { valid, errors } = validateLogInData(user)

  if (!valid) return res.status(400).json(errors)

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken()
    })
    .then((token) => {
      return res.json({ token })
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ general: "Invalid Email or Password" })
    })
}

// Get Own User Details  =>  /api/user
exports.getAuthenticatedUser = (req, res) => {
  let userData = {}
  db.doc(`/users/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data()
        return db
          .collection("likes")
          .where("username", "==", req.user.username)
          .get()
      }
    })
    .then((data) => {
      userData.likes = []
      data.forEach((doc) => {
        userData.likes.push(doc.data())
      })
      return res.json(userData)
    })
    .catch((err) => {
      console.error(err)
      return res.status(500).json({ error: err.code })
    })
}
