import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import CreatePost from "../post/CreatePost"
import MyButton from "../../utils/MyButton"

// Material UI
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import HomeIcon from "@material-ui/icons/Home"

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {isAuthenticated ? (
            <Fragment>
              <CreatePost />
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/'>
                Home
              </Button>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>
              <Button color='inherit' component={Link} to='/signup'>
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    )
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(Navbar)
