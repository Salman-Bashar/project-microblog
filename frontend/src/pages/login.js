import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

import AppIcon from "../images/icon.png"

//Material UI
import withStyles from "@material-ui/core/styles/withStyles"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

//Redux
import { connect } from "react-redux"
import { loginUser } from "../redux/actions/userAction"

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  button: {
    margin: "10px auto 10px auto",
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
}

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      errors: {},
    }
  }

  static getDerivedStateFromProps(props) {
    if (props.UI.errors) {
      return {
        errors: props.UI.errors,
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData, this.props.history)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props
    const { errors } = this.state

    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='Book Icon' className={classes.image} />
          <Typography variant='h4' className={classes.pageTitle}>
            Welcome Old Friend!
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
              fullWidth
            >
              Log In
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <small>
              Don't have an account? <Link to='/signup'>Join Us!</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
})

const mapActionsToProps = (state) => ({
  loginUser,
})

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login))
