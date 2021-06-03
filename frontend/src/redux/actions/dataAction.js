import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  CREATE_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  STOP_LOADING_UI,
} from "../types"
import axios from "axios"

// Get all Posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios
    .get("/posts")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      })
    })
}

//Get a Single Post
export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .get(`/posts/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data,
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch((err) => console.log(err))
}

// Create Post
export const createPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI })
  axios
    .post("/post", newPost)
    .then((res) => {
      dispatch({
        type: CREATE_POST,
        payload: res.data,
      })
      dispatch(clearErrors())
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      })
    })
}

// Like Post
export const likePost = (postId) => (dispatch) => {
  axios
    .get(`/posts/${postId}/likePost`)
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data,
      })
    })
    .catch((err) => console.log(err))
}

// Undo Liked Post
export const unlikePost = (postId) => (dispatch) => {
  axios
    .get(`/posts/${postId}/undoLike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: res.data,
      })
    })
    .catch((err) => console.log(err))
}

//Delete Post
export const deletePost = (postId) => (dispatch) => {
  axios
    .delete(`/posts/${postId}`)
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId })
    })
    .catch((err) => console.log(err))
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
