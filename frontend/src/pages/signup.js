import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import AppIcon from "../images/icon.png"

import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

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

class signup extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      username: "",
      loading: false,
      errors: {},
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      loading: true,
    })

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    }

    axios
      .post("/signup", newUserData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`)
        this.setState({
          loading: false,
        })
        this.props.history.push("/")
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { classes } = this.props
    const { loading, errors } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt='Book Icon' className={classes.image} />
          <Typography variant='h4' className={classes.pageTitle}>
            Welcome New Friend!
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
            <TextField
              id='username'
              name='username'
              type='text'
              label='Username'
              className={classes.textField}
              helperText={errors.username}
              error={errors.username ? true : false}
              value={this.state.username}
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
              Sign Up
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <small>
              Already have an account? <Link to='/login'>Get In!</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(signup)
