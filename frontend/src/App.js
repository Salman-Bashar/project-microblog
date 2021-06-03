import "./App.css"
import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import jwtDecode from "jwt-decode"
import axios from "axios"

//Redux
import { Provider } from "react-redux"
import store from "./redux/store"
import { SET_AUTHENTICATED } from "./redux/types"
import { logoutUser, getUserData } from "./redux/actions/userAction"

//Material UI
import { MuiThemeProvider } from "@material-ui/core/styles"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

//Components
import Navbar from "./components/layout/Navbar"
import AuthRoute from "./utils/AuthRoute"

//Pages
import home from "./pages/home"
import signup from "./pages/signup"
import login from "./pages/login"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
})

//axios.defaults.baseURL = "http://127.0.0.1:5001/oiiu-blog/us-central1/api"

const token = localStorage.FBIdToken
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = "/login"
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common["Authorization"] = token
    store.dispatch(getUserData())
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={home} />
                <AuthRoute exact path='/signup' component={signup} />
                <AuthRoute exact path='/login' component={login} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
