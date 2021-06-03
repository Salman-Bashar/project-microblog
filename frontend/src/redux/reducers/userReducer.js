import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  LOADING_USER,
  LIKE_POST,
  UNLIKE_POST,
} from "../types"

const initialState = {
  isAuthenticated: false,
  loading: false,
  credentials: {},
  likes: [],
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      }

    case SET_UNAUTHENTICATED:
      return initialState

    case SET_USER:
      return {
        isAuthenticated: true,
        loading: false,
        ...action.payload,
      }

    case LOADING_USER:
      return {
        ...state,
        loading: true,
      }

    case LIKE_POST:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            likedBy: state.credentials.username,
            postId: action.payload.postId,
          },
        ],
      }

    case UNLIKE_POST:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.postId !== action.payload.postId
        ),
      }

    default:
      return state
  }
}

export default userReducer
