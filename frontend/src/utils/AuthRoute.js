import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated === true ? <Redirect to='/' /> : <Component {...props} />
    }
  />
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
})

AuthRoute.propTypes = {
  user: PropTypes.object,
}

export default connect(mapStateToProps)(AuthRoute)
